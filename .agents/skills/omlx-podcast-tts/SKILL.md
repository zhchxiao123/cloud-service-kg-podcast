---
name: omlx-podcast-tts
description: >
  Convert podcast-script-generator JSON into dual-voice podcast audio using
  the local omlx Qwen3-TTS HTTP API (voice cloning from a 10-15s reference
  wav). Use this as a free / no-API-key TTS provider for the AI podcast
  video workflow, especially when the user wants to avoid paying for Volcengine
  / MiniMax / ElevenLabs or wants to clone a specific voice. Each role
  (host/guest) requires a short reference audio file; ref_text is extracted
  via local omlx Qwen3-ASR and cached.
---

# omlx Podcast TTS (local, free)

Local counterpart to `volcengine-podcast-tts`. Same input/output contract, so
the `podcast-video-composer` downstream can use either provider without
changes.

```text
script.json  →  podcast.mp3  +  podcast_durations.json
```

## How it differs from the Volcengine skill

| | Volcengine | omlx (this skill) |
|---|---|---|
| Auth | `X-Api-Key` (cloud) | `Authorization: Bearer` (local) |
| Voice identity | `speaker` name | `ref_audio` wav + `ref_text` |
| Cost | Per-character | **Free** (local GPU) |
| Output | mp3 (streamed) | wav 24kHz → converted to mp3 |
| Speed control | API `speech_rate` | ffmpeg `atempo` post-process |
| Quota | Concurrency throttling | Local GPU memory (serialize requests) |

## Environment

```bash
export OMLX_BASE_URL="http://192.168.2.140:18000"
export OMLX_API_KEY="<your-local-api-key>"
# Optional: defaults shown
export OMLX_TTS_MODEL="Qwen3-TTS-12Hz-1.7B-Base-bf16"
export OMLX_ASR_MODEL="Qwen3-ASR-1.7B-bf16"
export OMLX_REF_AUDIO_HOST="/path/to/host.wav"
export OMLX_REF_AUDIO_GUEST="/path/to/guest.wav"
```

If `OMLX_API_KEY` is missing, ask the user for it interactively. Do not
write the key into repository files.

Local tools:

```bash
ffmpeg -version && ffprobe -version
python -c "import urllib.request, json"  # stdlib only
```

If the omlx base URL is unreachable, surface the connection error — do not
fall back to a different provider silently.

## Run

First time, prepare the voice reference (ASR once, cache forever):

```bash
python scripts/prepare_voice.py references/voice_a.wav
python scripts/prepare_voice.py references/voice_b.wav
```

Then synthesize the podcast:

```bash
python scripts/generate_audio.py \
  --script work/script/podcast-script.json \
  --output work/audio/podcast.mp3 \
  --host-ref-audio references/voice_a.wav \
  --guest-ref-audio references/voice_b.wav \
  --auto-asr \
  --concurrency 1
```

Recommended flags:

- `--auto-asr` so the first run can extract `ref_text` automatically
  (without it, you must call `prepare_voice.py` manually first).
- Keep `--concurrency 1` for omlx Qwen3-TTS. Benchmarks on an M3 Max 64 GB
  showed no meaningful throughput gain at concurrency 2 or 4, while Metal
  memory increased substantially. The script also uses a cross-process lock
  (`/tmp/byclaw-omlx-tts.lock`) so separate podcast jobs cannot overlap live
  TTS requests. Override the path with `--lock-file` or
  `OMLX_TTS_LOCK_FILE` only when intentionally targeting different servers.
- `--sentence-mode` for accurate SRT subtitles (same as Volcengine skill).
- `--speed 1.1` to apply a 10% speed-up via `atempo` (range 0.5..2.0 per
  filter stage, chained for extremes).

## Reference audio requirements

For best voice cloning quality, the reference wav should be:

- 5–30 seconds (10–15 s is the sweet spot for Qwen3-TTS Base)
- Single speaker, no background music/noise
- Sample rate 16 kHz or higher (will be re-sampled)
- Mono or stereo (will be down-mixed)
- Reference text must be an accurate transcription of what is said — Qwen3
  uses it to time-align the clone

If you do not have a recording, `references/` ships with two demo voices
(voice_a / voice_b) cloned from the user's own samples. Replace them
with your own `host.wav` / `guest.wav` to use a different speaker.

## Output Contract

The timing JSON matches the Volcengine skill and the
`podcast-video-composer` expectation:

```json
[
  {
    "index": 0,
    "turn_index": 0,
    "sentence_index": 0,
    "role": "host",
    "slide": 1,
    "text": "欢迎收听今天的节目。",
    "duration": 2.18,
    "start": 0.0
  }
]
```

Without `--sentence-mode`, `sentence_index` is omitted and `text_preview`
is emitted instead (first 80 chars).

## Caching

Two cache layers live under `/tmp/byclaw-omlx-tts-cache/`:

- `voices/<sha256>.json` — ASR-extracted ref_text for each ref_audio
  (keyed by file hash, so two audio files with the same transcript are
  cached separately).
- `segments/<sha256>.wav` — Per-segment TTS output. If the script text
  and voice hash are unchanged, the cached wav is copied and re-used;
  no API call is made.

Clear with `rm -rf /tmp/byclaw-omlx-tts-cache`.

## Common Errors

| Error | Likely Cause | Fix |
|---|---|---|
| `ASR HTTP 401` | Wrong or missing `OMLX_API_KEY` | Check `.env` or interactive prompt. |
| `connection error: Connection refused` | omlx server not running or wrong `OMLX_BASE_URL` | Verify `curl http://$OMLX_BASE_URL/v1/models`. |
| `Voice cache miss for ...` | `--auto-asr` off and ref_text not yet extracted | Re-run with `--auto-asr`, or call `prepare_voice.py` first. |
| `rate limit / queue full` (HTTP 429/503) | Too many concurrent TTS requests | Use `--concurrency 1` and keep the global lock enabled. |
| `Timed out ... waiting for global TTS lock` | Another podcast job held the local GPU slot too long | Let the other job finish or raise `--lock-timeout`; do not disable locking for the same server. |
| Cloned voice sounds nothing like the ref | ref_text is wrong (mismatched audio) | Re-run `prepare_voice.py --force` and verify the transcript matches the audio. |
| Output mp3 is silent or clipped | ref_audio too short (<3s) or noisy | Use a longer, cleaner reference. |

## Architecture notes

- `transcribe.py` — thin wrapper around `POST /v1/audio/transcriptions`,
  multipart upload via stdlib. Stdout = the recognized text. Exits 2 on
  auth/config errors, 1 on transport errors.
- `prepare_voice.py` — calls `transcribe.py` once per ref_audio, writes a
  cached JSON keyed by SHA-256 of the audio file. Idempotent.
- `generate_audio.py` — main pipeline. Loads the script, splits into
  segments (turn or sentence mode), prepares both voices, serializes live
  `POST /v1/audio/speech` calls across processes with one bounded retry loop,
  concats wavs, optionally applies `atempo`, encodes mp3, and writes
  `*_durations.json`.
