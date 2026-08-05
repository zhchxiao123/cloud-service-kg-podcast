# Reference voices

This directory holds short voice samples used to clone the host and guest
voices via Qwen3-TTS. Two demo voices ship in the repo so the skill can
be smoke-tested without recording anything:

- `voice_a.wav` — user recording #1, ~12.0s (24kHz mono wav), "感恩角色" monologue
- `voice_b.wav` — user recording #2, ~11.5s (24kHz mono wav), same monologue, different take

Both were transcribed by `Qwen3-ASR-1.7B-bf16` as:

> 很感恩能遇到这么多优秀的角色，每个角色都让我有不同的感悟和成长。
> 演戏对我来说是一种享受，也是一种修行。希望通过自己的表演，
> 能够传递更多美好的故事给大家。

## Using your own voice

Replace `voice_a.wav` and/or `voice_b.wav` with your own recordings.
Guidelines:

- **Length:** 5–30 seconds (10–15s is the sweet spot)
- **Single speaker**, no music, no other voices
- **Quiet room**, phone/lavalier mic is fine
- Sample rate ≥ 16 kHz, mono or stereo
- File extension can be `.wav` or `.mp3`

Then point the skill at the new files:

```bash
python scripts/generate_audio.py \
  --host-ref-audio references/my_host.wav \
  --guest-ref-audio references/my_guest.wav \
  --auto-asr \
  ...
```

The ASR transcript is cached per-file (keyed by SHA-256 of the audio
bytes), so re-running with the same files is free; re-running with a
new file triggers a fresh ASR call.

## Why two files?

`generate_audio.py` needs a separate ref_audio for the **host** and the
**guest** role so the two speakers sound different. Qwen3-TTS does not
have a `voice_id` parameter — voice identity comes entirely from the
reference audio.
