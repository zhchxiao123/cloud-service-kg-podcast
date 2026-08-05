#!/usr/bin/env python3
"""Generate podcast audio with local omlx TTS (Qwen3-TTS Base).

This is the local / free counterpart to volcengine-podcast-tts. It reads
podcast-script-generator JSON (a list of turns with role+text+slide),
clones two voices (host and guest) from short reference wav files, and
writes a single concatenated mp3 plus a *_durations.json timing file.

Differences from the Volcengine version:
  - No `voice_id` field. Each role maps to a ref_audio file path. The
    ref_text is ASR-extracted once and cached under
    /tmp/byclaw-omlx-tts-cache/voices/.
  - omlx returns 24 kHz mono wav. We convert to mp3 (or keep wav) via
    ffmpeg for downstream podcast-video-composer compatibility.
  - No native `speed` control. We apply ffmpeg `atempo` after concat.

Usage:
    python generate_audio.py \\
        --script work/script/podcast-script.json \\
        --output work/audio/podcast.mp3 \\
        --host-ref-audio refs/voice_a.wav \\
        --guest-ref-audio refs/voice_b.wav

First-run hint: pass --auto-asr to invoke prepare_voice.py for any
ref_audio whose ref_text is not yet cached.
"""

from __future__ import annotations

import argparse
import base64
import concurrent.futures
import fcntl
import json
import os
import random
import re
import shutil
import subprocess
import sys
import time
import requests
import urllib.error
import urllib.request
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator, TextIO


# === Defaults ===
DEFAULT_BASE_URL = "http://192.168.2.140:18000"
DEFAULT_TTS_MODEL = "Qwen3-TTS-12Hz-1.7B-Base-bf16"
DEFAULT_ASR_MODEL = "Qwen3-ASR-1.7B-bf16"
DEFAULT_SAMPLE_RATE = 24000
DEFAULT_WORK_ROOT = Path("/tmp/byclaw-omlx-tts")
DEFAULT_CACHE_DIR = Path("/tmp/byclaw-omlx-tts-cache")
DEFAULT_VOICE_CACHE_DIR = DEFAULT_CACHE_DIR / "voices"
DEFAULT_SEGMENT_CACHE_DIR = DEFAULT_CACHE_DIR / "segments"
DEFAULT_LOCK_FILE = Path("/tmp/byclaw-omlx-tts.lock")
DEFAULT_CONCURRENCY = 1


# === Errors ===
class TTSFailure(RuntimeError):
    pass


class RateLimited(TTSFailure):
    pass


@contextmanager
def global_tts_slot(lock_file: Path, timeout: float) -> Iterator[None]:
    """Serialize omlx TTS calls across threads and processes on this Mac."""
    lock_file.parent.mkdir(parents=True, exist_ok=True)
    with lock_file.open("a+", encoding="utf-8") as handle:
        _acquire_lock(handle, lock_file, timeout)
        try:
            yield
        finally:
            fcntl.flock(handle.fileno(), fcntl.LOCK_UN)


def _acquire_lock(handle: TextIO, lock_file: Path, timeout: float) -> None:
    deadline = time.monotonic() + timeout
    while True:
        try:
            fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
            return
        except BlockingIOError as err:
            if time.monotonic() >= deadline:
                raise TTSFailure(
                    f"Timed out after {timeout:.1f}s waiting for global TTS lock: {lock_file}"
                ) from err
            time.sleep(0.1)


# === Shell helpers ===
def run(cmd: list[str]) -> subprocess.CompletedProcess:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        tail = (result.stderr or result.stdout)[-1200:]
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{tail}")
    return result


def require_tool(name: str) -> None:
    if shutil.which(name) is None:
        raise RuntimeError(f"Missing required command: {name}")


# === Script parsing ===
def split_sentences(text: str) -> list[str]:
    text = text.strip()
    if not text:
        return []
    parts = re.split(r"(?<=[。？！；….!?;])\s*", text)
    return [part.strip() for part in parts if part.strip()]


def split_long_text(text: str, max_chars: int) -> list[str]:
    parts: list[str] = []
    for sentence in split_sentences(text) or [text]:
        if len(sentence) <= max_chars:
            parts.append(sentence)
            continue
        # Hard-split long sentences. Prefer to break right after a
        # punctuation mark so we don't leave a stray "。" (or other
        # single-char punctuation) as its own segment — omlx's Qwen3-TTS
        # sometimes emits no audio for those.
        cursor = 0
        while cursor < len(sentence):
            window = sentence[cursor:cursor + max_chars]
            if cursor + max_chars >= len(sentence):
                parts.append(window.strip())
                break
            # If the cut point lands on punctuation, extend the window
            # to include it so the next segment doesn't start with "。" .
            tail_punct = "。？！；….!?," + "".join(["，"])
            if window[-1] in tail_punct:
                parts.append(window)
                cursor += max_chars
            else:
                # Try to back up to the nearest punctuation within the
                # window; if none, hard-cut at max_chars.
                cut = max((i for i, ch in enumerate(window) if ch in tail_punct), default=None)
                if cut is not None:
                    parts.append(window[: cut + 1])
                    cursor += cut + 1
                else:
                    parts.append(window.strip())
                    cursor += max_chars
    return [part for part in parts if part]


def load_script(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    turns = data if isinstance(data, list) else data.get("script", [])
    if not turns:
        raise ValueError("script JSON contains no turns")
    return turns


def build_segments(
    script_turns: list[dict[str, Any]],
    sentence_mode: bool,
    max_chars: int,
) -> list[dict[str, Any]]:
    segments: list[dict[str, Any]] = []
    for turn_idx, turn in enumerate(script_turns):
        role = turn.get("role", "host")
        voice_key = "host" if role in {"host", "主持人"} else "guest"
        slide = turn.get("slide")
        text = str(turn.get("text", "")).strip()
        if not text:
            continue
        units = split_sentences(text) if sentence_mode else split_long_text(text, max_chars)
        if sentence_mode:
            expanded: list[str] = []
            for unit in units:
                expanded.extend(split_long_text(unit, max_chars))
            units = expanded
        for sent_idx, unit in enumerate(units):
            segments.append({
                "text": unit,
                "voice_key": voice_key,
                "role": role,
                "slide": slide,
                "turn_index": turn_idx,
                "sentence_index": sent_idx if sentence_mode else None,
            })
    return segments


# === Voice preparation ===
def ensure_voice(
    ref_audio: Path,
    voice_cache_dir: Path,
    auto_asr: bool,
    api_key: str,
    base_url: str,
    asr_model: str,
) -> dict[str, str]:
    """Return {audio_b64, ref_text} for the given ref_audio.

    Cached by sha256 of the audio file. If auto_asr is False and the cache
    is missing, raise so the user can opt in explicitly.
    """
    import prepare_voice  # local module

    if not ref_audio.exists():
        raise FileNotFoundError(f"ref_audio not found: {ref_audio}")
    if auto_asr:
        payload = prepare_voice.prepare_voice(ref_audio, voice_cache_dir, force=False)
    else:
        try:
            payload = prepare_voice.prepare_voice(ref_audio, voice_cache_dir, force=False)
        except subprocess.CalledProcessError:
            raise RuntimeError(
                f"Voice cache miss for {ref_audio} and --auto-asr is off. "
                "Run prepare_voice.py manually or pass --auto-asr."
            )

    audio_b64 = base64.b64encode(ref_audio.read_bytes()).decode("ascii")
    return {"audio_b64": audio_b64, "ref_text": payload["ref_text"], "model": asr_model}


# === TTS request ===
def tts_request(
    text: str,
    voice: dict[str, str],
    base_url: str,
    api_key: str,
    tts_model: str,
    timeout: int,
    lock_file: Path,
    lock_timeout: float,
    max_retries: int,
    retry_base: float,
    retry_max: float,
    retry_jitter: float,
) -> bytes:
    """Call omlx with one bounded retry loop and a global GPU request lock."""
    payload = {
        "model": tts_model,
        "input": text,
        "ref_audio": voice["audio_b64"],
        "ref_text": voice["ref_text"],
    }
    url = f"{base_url.rstrip('/')}/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    last_err: Exception | None = None
    for attempt in range(1, max_retries + 1):
        try:
            with global_tts_slot(lock_file, lock_timeout):
                r = requests.post(url, json=payload, headers=headers, timeout=timeout)
            if r.status_code == 200 and r.content:
                return r.content
            body = r.text[:400] if r.text else ""
            if r.status_code in (429, 503) or "queue" in body.lower():
                last_err = RateLimited(f"HTTP {r.status_code}: {body}")
                if attempt >= max_retries:
                    break
                base = retry_base * (2 ** (attempt - 1))
                sleep_s = min(retry_max, base + random.uniform(0, retry_jitter))
                print(
                    f"    TTS attempt {attempt}/{max_retries} HTTP {r.status_code}; "
                    f"retrying in {sleep_s:.1f}s",
                    file=sys.stderr,
                )
                time.sleep(sleep_s)
                continue
            raise TTSFailure(f"HTTP {r.status_code}: {body}")
        except requests.exceptions.RequestException as e:
            last_err = TTSFailure(f"connection error: {e}")
            if attempt >= max_retries:
                break
            base = retry_base * (2 ** (attempt - 1))
            sleep_s = min(retry_max, base + random.uniform(0, retry_jitter))
            print(
                f"    TTS attempt {attempt}/{max_retries} failed: {e}; "
                f"retrying in {sleep_s:.1f}s",
                file=sys.stderr,
            )
            time.sleep(sleep_s)
            continue
    raise last_err if last_err else TTSFailure("exhausted retries")


# === Segment cache (so reruns don't re-synthesize) ===
def segment_cache_key(seg: dict[str, Any], voice_sha: str, tts_model: str) -> str:
    raw = json.dumps(
        {
            "text": seg["text"],
            "voice_sha": voice_sha,
            "tts_model": tts_model,
        },
        ensure_ascii=False,
        sort_keys=True,
    ).encode("utf-8")
    import hashlib
    return hashlib.sha256(raw).hexdigest()


def voice_sha_from_b64(audio_b64: str) -> str:
    import hashlib
    return hashlib.sha256(base64.b64decode(audio_b64)).hexdigest()


# === Audio processing ===
def measure_duration(audio_path: Path) -> float:
    result = run([
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(audio_path),
    ])
    return float(result.stdout.strip())


def ensure_24k_mono_wav(src: Path, dst: Path) -> None:
    """omlx returns 24kHz mono wav; this is a defensive normalization."""
    run([
        "ffmpeg", "-y", "-i", str(src),
        "-ac", "1", "-ar", "24000", "-sample_fmt", "s16",
        str(dst),
    ])


def to_mp3(src_wav: Path, dst_mp3: Path, bitrate: str = "128k") -> float:
    run([
        "ffmpeg", "-y", "-i", str(src_wav),
        "-codec:a", "libmp3lame", "-b:a", bitrate,
        str(dst_mp3),
    ])
    return measure_duration(dst_mp3)


def apply_speed(wav_in: Path, wav_out: Path, speed: float) -> None:
    """atempo accepts 0.5..2.0 in one filter. Chain for speed outside that range."""
    if abs(speed - 1.0) < 1e-3:
        shutil.copy2(wav_in, wav_out)
        return
    s = speed
    filters: list[str] = []
    while s < 0.5:
        filters.append("atempo=0.5")
        s /= 0.5
    while s > 2.0:
        filters.append("atempo=2.0")
        s /= 2.0
    filters.append(f"atempo={s:.4f}")
    run([
        "ffmpeg", "-y", "-i", str(wav_in),
        "-filter:a", ",".join(filters),
        str(wav_out),
    ])


def concat_wavs(files: list[Path], output: Path) -> None:
    """Concatenate wav files using the ffmpeg concat demuxer.

    All inputs must share the same codec/format — that's why we normalize
    everything to 24kHz mono s16 wav first.
    """
    list_file = output.parent / "concat_list.txt"
    with list_file.open("w", encoding="utf-8") as f:
        for path in files:
            f.write(f"file '{path}'\n")
    try:
        run([
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0",
            "-i", str(list_file),
            "-c", "copy",
            str(output),
        ])
    finally:
        list_file.unlink(missing_ok=True)


# === Synthesis ===
def synthesize_segment(
    idx: int,
    seg: dict[str, Any],
    voices: dict[str, dict[str, str]],
    args: argparse.Namespace,
    segments_dir: Path,
    seg_cache_dir: Path,
) -> dict[str, Any]:
    voice = voices[seg["voice_key"]]
    voice_sha = voice_sha_from_b64(voice["audio_b64"])
    out_file = segments_dir / f"seg_{idx:04d}.wav"
    key = segment_cache_key(seg, voice_sha, args.tts_model)
    cached = seg_cache_dir / f"{key}.wav"
    if cached.exists() and cached.stat().st_size > 0:
        shutil.copy2(cached, out_file)
        duration = measure_duration(out_file)
        result = dict(seg)
        result.update({"audio_path": str(out_file), "duration": duration, "cached": True})
        return result

    audio = tts_request(
        text=seg["text"],
        voice=voice,
        base_url=args.base_url,
        api_key=args.api_key,
        tts_model=args.tts_model,
        timeout=args.timeout,
        lock_file=Path(args.lock_file).expanduser().resolve(),
        lock_timeout=args.lock_timeout,
        max_retries=args.max_retries,
        retry_base=args.retry_base,
        retry_max=args.retry_max,
        retry_jitter=args.retry_jitter,
    )
    out_file.write_bytes(audio)
    duration = measure_duration(out_file)
    seg_cache_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(out_file, cached)
    result = dict(seg)
    result.update({"audio_path": str(out_file), "duration": duration, "cached": False})
    return result


def synthesize_all(
    segments: list[dict[str, Any]],
    voices: dict[str, dict[str, str]],
    args: argparse.Namespace,
    segments_dir: Path,
    seg_cache_dir: Path,
) -> list[dict[str, Any]]:
    # Cache check pass.
    results: list[dict[str, Any] | None] = [None] * len(segments)
    pending: list[tuple[int, dict[str, Any]]] = []
    for idx, seg in enumerate(segments):
        voice = voices[seg["voice_key"]]
        voice_sha = voice_sha_from_b64(voice["audio_b64"])
        out_file = segments_dir / f"seg_{idx:04d}.wav"
        key = segment_cache_key(seg, voice_sha, args.tts_model)
        cached = seg_cache_dir / f"{key}.wav"
        if cached.exists() and cached.stat().st_size > 0:
            shutil.copy2(cached, out_file)
            duration = measure_duration(out_file)
            result = dict(seg)
            result.update({"audio_path": str(out_file), "duration": duration, "cached": True})
            results[idx] = result
            print(f"  [{idx + 1}/{len(segments)}] {duration:.2f}s cached")
        else:
            pending.append((idx, seg))

    if not pending:
        return [r for r in results if r is not None]

    print(
        f"  Live TTS requests: {len(pending)} (concurrency={args.concurrency})",
        file=sys.stderr,
    )
    with concurrent.futures.ThreadPoolExecutor(
        max_workers=max(1, args.concurrency)
    ) as executor:
        futures = {
            executor.submit(
                synthesize_segment, idx, seg, voices, args, segments_dir, seg_cache_dir
            ): idx
            for idx, seg in pending
        }
        completed = 0
        for future in concurrent.futures.as_completed(futures):
            idx = futures[future]
            result = future.result()
            results[idx] = result
            completed += 1
            print(
                f"  [{completed}/{len(pending)} live] segment {idx + 1}/{len(segments)} "
                f"{result['duration']:.2f}s",
                file=sys.stderr,
            )

    return [r for r in results if r is not None]


# === Durations ===
def build_durations(results: list[dict[str, Any]]) -> list[dict[str, Any]]:
    durations = []
    elapsed = 0.0
    for idx, seg in enumerate(results):
        entry: dict[str, Any] = {
            "index": idx,
            "turn_index": seg["turn_index"],
            "role": seg["role"],
            "duration": round(float(seg["duration"]), 3),
            "start": round(elapsed, 3),
        }
        if seg.get("slide") is not None:
            entry["slide"] = seg["slide"]
        if seg.get("sentence_index") is not None:
            entry["sentence_index"] = seg["sentence_index"]
            entry["text"] = seg["text"]
        else:
            entry["text_preview"] = seg["text"][:80]
        durations.append(entry)
        elapsed += float(seg["duration"])
    return durations


# === Main ===
def main() -> None:
    parser = argparse.ArgumentParser(
        description="Podcast script JSON -> omlx TTS MP3 + durations JSON"
    )
    parser.add_argument("--script", required=True, help="Path to podcast script JSON")
    parser.add_argument("--output", required=True, help="Path to output audio (mp3 or wav)")
    parser.add_argument(
        "--host-ref-audio",
        default=os.environ.get("OMLX_REF_AUDIO_HOST"),
        help="Path to host voice reference wav (or mp3)",
    )
    parser.add_argument(
        "--guest-ref-audio",
        default=os.environ.get("OMLX_REF_AUDIO_GUEST"),
        help="Path to guest voice reference wav (or mp3)",
    )
    parser.add_argument(
        "--auto-asr",
        action="store_true",
        help="Run prepare_voice.py to extract ref_text if not cached",
    )
    parser.add_argument("--base-url", default=os.environ.get("OMLX_BASE_URL", DEFAULT_BASE_URL))
    parser.add_argument("--api-key", default=os.environ.get("OMLX_API_KEY", ""))
    parser.add_argument("--tts-model", default=os.environ.get("OMLX_TTS_MODEL", DEFAULT_TTS_MODEL))
    parser.add_argument("--asr-model", default=os.environ.get("OMLX_ASR_MODEL", DEFAULT_ASR_MODEL))
    parser.add_argument("--sentence-mode", action="store_true", help="Split by sentence for accurate subtitles")
    parser.add_argument("--max-chars", type=int, default=400)
    parser.add_argument("--speed", type=float, default=1.0, help="Post-process speed multiplier via atempo")
    parser.add_argument("--format", choices=["mp3", "wav"], default="mp3")
    parser.add_argument("--mp3-bitrate", default="128k")
    parser.add_argument("--concurrency", type=int, default=DEFAULT_CONCURRENCY)
    parser.add_argument("--max-retries", type=int, default=4)
    parser.add_argument("--retry-base", type=float, default=2.0)
    parser.add_argument("--retry-max", type=float, default=30.0)
    parser.add_argument("--retry-jitter", type=float, default=1.0)
    parser.add_argument("--timeout", type=int, default=180)
    parser.add_argument(
        "--lock-file",
        default=os.environ.get("OMLX_TTS_LOCK_FILE", str(DEFAULT_LOCK_FILE)),
        help="Cross-process lock that serializes live TTS API calls",
    )
    parser.add_argument(
        "--lock-timeout",
        type=float,
        default=600.0,
        help="Maximum seconds to wait for the global TTS lock",
    )
    parser.add_argument("--work-root", default=str(DEFAULT_WORK_ROOT))
    parser.add_argument(
        "--voice-cache-dir", default=str(DEFAULT_VOICE_CACHE_DIR),
    )
    parser.add_argument(
        "--segment-cache-dir", default=str(DEFAULT_SEGMENT_CACHE_DIR),
    )
    parser.add_argument("--job-name")
    parser.add_argument("--keep-work", action="store_true")
    args = parser.parse_args()

    if not args.api_key:
        print("ERROR: OMLX_API_KEY is not set. Export it or pass --api-key.", file=sys.stderr)
        sys.exit(2)
    if not args.host_ref_audio or not args.guest_ref_audio:
        print(
            "ERROR: --host-ref-audio and --guest-ref-audio are required (or set OMLX_REF_AUDIO_HOST/OMLX_REF_AUDIO_GUEST).",
            file=sys.stderr,
        )
        sys.exit(2)

    require_tool("ffmpeg")
    require_tool("ffprobe")

    script_path = Path(args.script).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if not script_path.exists():
        print(f"ERROR: script file not found: {script_path}", file=sys.stderr)
        sys.exit(2)

    turns = load_script(script_path)
    segments = build_segments(turns, args.sentence_mode, args.max_chars)
    if not segments:
        raise ValueError("No TTS segments generated from script")

    work_root = Path(args.work_root).expanduser().resolve()
    job_name = args.job_name or f"job-{int(time.time())}-{os.getpid()}"
    job_dir = work_root / job_name
    segments_dir = job_dir / "segments"
    segments_dir.mkdir(parents=True, exist_ok=True)
    voice_cache_dir = Path(args.voice_cache_dir).expanduser().resolve()
    seg_cache_dir = Path(args.segment_cache_dir).expanduser().resolve()
    seg_cache_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 56)
    print("omlx Podcast TTS (local)")
    print("=" * 56)
    print(f"base_url: {args.base_url}")
    print(f"tts_model: {args.tts_model}")
    print(f"asr_model: {args.asr_model}")
    print(f"host_ref_audio: {args.host_ref_audio}")
    print(f"guest_ref_audio: {args.guest_ref_audio}")
    print(f"script turns: {len(turns)}")
    print(f"segments: {len(segments)} ({'sentence' if args.sentence_mode else 'turn/long-text'} mode)")
    print(f"concurrency: {args.concurrency}, max_retries: {args.max_retries}")
    print(f"global_tts_lock: {args.lock_file} (timeout={args.lock_timeout:.0f}s)")
    print(f"speed: {args.speed} (post-process atempo)")
    print(f"work_dir: {job_dir}")

    voice_cache_dir.mkdir(parents=True, exist_ok=True)

    voices = {
        "host": ensure_voice(
            Path(args.host_ref_audio).expanduser().resolve(),
            voice_cache_dir,
            args.auto_asr,
            args.api_key,
            args.base_url,
            args.asr_model,
        ),
        "guest": ensure_voice(
            Path(args.guest_ref_audio).expanduser().resolve(),
            voice_cache_dir,
            args.auto_asr,
            args.api_key,
            args.base_url,
            args.asr_model,
        ),
    }
    for key, v in voices.items():
        preview = v["ref_text"][:50] + ("…" if len(v["ref_text"]) > 50 else "")
        print(f"  voice[{key}] ref_text: {preview}")

    results = synthesize_all(segments, voices, args, segments_dir, seg_cache_dir)

    # Concatenate all segment wavs into one.
    audio_files = [Path(item["audio_path"]) for item in results]
    concat_wav = job_dir / "concat.wav"
    concat_wavs(audio_files, concat_wav)
    print(f"  Concat duration: {measure_duration(concat_wav):.2f}s")

    # Optional speed adjustment.
    if abs(args.speed - 1.0) > 1e-3:
        speed_wav = job_dir / "concat_at_speed.wav"
        apply_speed(concat_wav, speed_wav, args.speed)
        final_wav = speed_wav
        print(f"  After atempo {args.speed}: {measure_duration(final_wav):.2f}s")
    else:
        final_wav = concat_wav

    # Emit final output in the requested format.
    if args.format == "mp3":
        if output_path.suffix.lower() != ".mp3":
            print(
                f"WARNING: --format mp3 but --output suffix is {output_path.suffix}; writing .mp3 anyway",
                file=sys.stderr,
            )
            output_path = output_path.with_suffix(".mp3")
        total_duration = to_mp3(final_wav, output_path, args.mp3_bitrate)
    else:
        if output_path.suffix.lower() != ".wav":
            output_path = output_path.with_suffix(".wav")
        shutil.copy2(final_wav, output_path)
        total_duration = measure_duration(output_path)

    durations = build_durations(results)
    # When atempo speed != 1.0, raw per-segment durations and elapsed start
    # times were measured on the pre-atempo concat. Scale them by 1/speed so
    # the JSON timeline matches the MP3 that was actually written.
    if abs(args.speed - 1.0) > 1e-3:
        inv = 1.0 / args.speed
        for entry in durations:
            entry["start"] = round(float(entry["start"]) * inv, 3)
            entry["duration"] = round(float(entry["duration"]) * inv, 3)
    durations_path = output_path.with_name(output_path.stem + "_durations.json")
    durations_path.write_text(
        json.dumps(durations, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    if not args.keep_work:
        shutil.rmtree(job_dir, ignore_errors=True)

    size_mb = output_path.stat().st_size / 1024 / 1024
    print("=" * 56)
    print(f"audio: {output_path} ({size_mb:.2f} MB, {total_duration:.2f}s)")
    print(f"timing: {durations_path} ({len(durations)} entries)")
    print("=" * 56)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
