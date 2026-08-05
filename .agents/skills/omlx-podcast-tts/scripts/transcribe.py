#!/usr/bin/env python3
"""Transcribe a reference audio file via omlx /v1/audio/transcriptions.

Returns the recognized text on stdout, full JSON on stderr. Exits non-zero
on transport or API errors.

Usage:
    python transcribe.py <audio-file>
    python transcribe.py <audio-file> --model Qwen3-ASR-1.7B-bf16
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


DEFAULT_BASE_URL = "http://192.168.2.140:18000"
DEFAULT_MODEL = "Qwen3-ASR-1.7B-bf16"


def transcribe(audio_path: Path, base_url: str, api_key: str, model: str, timeout: int) -> dict:
    boundary = "----byclaw-omlx-boundary"
    file_bytes = audio_path.read_bytes()

    # Build multipart/form-data body manually (no extra dep on requests).
    parts: list[bytes] = []
    for name, value, filename, content_type in [
        ("model", model, None, None),
        ("file", file_bytes, audio_path.name, "audio/wav"),
    ]:
        parts.append(f"--{boundary}\r\n".encode())
        if filename:
            parts.append(
                f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'
                f"Content-Type: {content_type}\r\n\r\n".encode()
            )
            parts.append(value)
        else:
            parts.append(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
            parts.append(value.encode())
        parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    body = b"".join(parts)

    req = urllib.request.Request(
        f"{base_url.rstrip('/')}/v1/audio/transcriptions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"ASR HTTP {e.code}: {e.read().decode('utf-8', errors='replace')[:400]}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"ASR connection error: {e.reason}") from e


def main() -> None:
    parser = argparse.ArgumentParser(description="Transcribe audio via omlx ASR")
    parser.add_argument("audio", help="Path to audio file (wav/mp3/m4a...)")
    parser.add_argument("--base-url", default=os.environ.get("OMLX_BASE_URL", DEFAULT_BASE_URL))
    parser.add_argument("--api-key", default=os.environ.get("OMLX_API_KEY", ""))
    parser.add_argument("--model", default=os.environ.get("OMLX_ASR_MODEL", DEFAULT_MODEL))
    parser.add_argument("--timeout", type=int, default=120)
    args = parser.parse_args()

    if not args.api_key:
        print(
            "ERROR: OMLX_API_KEY is not set. Export it or pass --api-key.",
            file=sys.stderr,
        )
        sys.exit(2)

    audio_path = Path(args.audio).expanduser().resolve()
    if not audio_path.exists():
        print(f"ERROR: audio file not found: {audio_path}", file=sys.stderr)
        sys.exit(2)

    result = transcribe(audio_path, args.base_url, args.api_key, args.model, args.timeout)
    text = result.get("text", "").strip()
    print(json.dumps(result, ensure_ascii=False), file=sys.stderr)
    print(text)


if __name__ == "__main__":
    main()
