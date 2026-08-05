#!/usr/bin/env python3
"""Prepare a voice reference: ASR-extract ref_text and cache it.

The cache key is the SHA-256 of the ref_audio file contents (not just the
text), so the same audio with the same transcript and a different audio
file (different speaker) are kept distinct.

Output JSON schema (cached at /tmp/byclaw-omlx-tts-cache/voices/<hash>.json):
    {
        "audio_path": "<absolute path>",
        "audio_sha256": "<hex>",
        "ref_text": "...",
        "model": "<asr model>",
        "prepared_at": "<iso8601>"
    }

Usage:
    python prepare_voice.py <ref-audio>            # print cache JSON path
    python prepare_voice.py <ref-audio> --print-text   # also print ref_text
    python prepare_voice.py <ref-audio> --force    # re-run even if cached
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


DEFAULT_CACHE_DIR = Path("/tmp/byclaw-omlx-tts-cache/voices")


def sha256_of_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def cache_path(cache_dir: Path, audio_sha: str) -> Path:
    return cache_dir / f"{audio_sha}.json"


def prepare_voice(audio_path: Path, cache_dir: Path, force: bool) -> dict:
    cache_dir.mkdir(parents=True, exist_ok=True)
    audio_sha = sha256_of_file(audio_path)
    target = cache_path(cache_dir, audio_sha)

    if target.exists() and not force:
        return json.loads(target.read_text(encoding="utf-8"))

    script_dir = Path(__file__).parent
    transcribe_script = script_dir / "transcribe.py"
    if not transcribe_script.exists():
        raise RuntimeError(f"transcribe.py not found at {transcribe_script}")

    result = subprocess.run(
        [sys.executable, str(transcribe_script), str(audio_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    text = result.stdout.strip()
    if not text:
        raise RuntimeError("ASR returned empty text for reference audio")

    payload = {
        "audio_path": str(audio_path),
        "audio_sha256": audio_sha,
        "ref_text": text,
        "model": os.environ.get("OMLX_ASR_MODEL", "Qwen3-ASR-1.7B-bf16"),
        "prepared_at": datetime.now(timezone.utc).isoformat(),
    }
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return payload


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare voice reference (ASR + cache)")
    parser.add_argument("audio", help="Path to reference audio file")
    parser.add_argument(
        "--cache-dir",
        type=Path,
        default=Path(os.environ.get("OMLX_VOICE_CACHE", str(DEFAULT_CACHE_DIR))),
    )
    parser.add_argument("--force", action="store_true", help="Re-run ASR even if cached")
    parser.add_argument("--print-text", action="store_true", help="Print ref_text on stdout")
    args = parser.parse_args()

    audio_path = Path(args.audio).expanduser().resolve()
    if not audio_path.exists():
        print(f"ERROR: audio file not found: {audio_path}", file=sys.stderr)
        sys.exit(2)

    payload = prepare_voice(audio_path, args.cache_dir, args.force)
    if args.print_text:
        print(payload["ref_text"])
    else:
        print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
