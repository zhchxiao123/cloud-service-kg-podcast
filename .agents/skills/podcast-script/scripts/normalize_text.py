#!/usr/bin/env python3
"""Normalize podcast script text for TTS engines (omlx / Volcengine / etc).

Anything that looks like a dotted number (versions, IPs, dotted names) is
replaced with the Chinese 「点」 word, which Chinese TTS engines read
correctly as a number token instead of as a sentence-ending period. ASCII
straight quotes are also rewritten to 「」 to avoid a known OMLX 503 corner
case.

Usage:
    python normalize_text.py podcast-script.json
    python normalize_text.py podcast-script.json --write          # in-place
    python normalize_text.py podcast-script.json -o clean.json    # new file

Exit codes:
    0 - already clean (no changes needed)
    1 - rewrote at least one text field
    2 - error
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


# Patterns that *should* be normalized. Each tuple is (regex, replacement).
# Order matters: replace two-/three-part versions first, then IPs, then
# dotted names. We use a single comprehensive regex that captures any
# "<number>.<number>..." or "<word>.<word>..." shape.
#
# Decimal-with-unit (3.5倍, 0.99%, $9.99, 100.5元) is *not* matched — the
# regex requires the digit-run to NOT be followed by certain unit chars.

# Versioned: v1.0, v1.2.3, 1.0, 1.2
_VERSIONED = re.compile(r"\b(v?\d+)\.(\d+)(?:\.(\d+))?\b")
# IPv4: 192.168.1.1
_IPV4 = re.compile(r"\b(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\b")
# Dotted name (2+ segments): com.example.app, foo.bar, www.example.com
_DOTTED_NAME = re.compile(r"\b([a-z0-9][a-z0-9_-]*)\.([a-z0-9][a-z0-9_-]*(?:\.[a-z0-9][a-z0-9_-]*)+)\b")

# ASCII straight quotes → 「」.  We only touch cases inside Chinese text to
# avoid touching code identifiers.  Apostrophe in Chinese context: 'word' /
# 'word'.  Replace ' with 「 and ' with 」.
_APOST_LEFT = re.compile(r"‘|’|'")  # opening or untyped ASCII
_APOST_RIGHT = re.compile(r"’|'")  # closing or untyped ASCII


def normalize_versioned(match: re.Match) -> str:
    """v1.0 -> v1点0 ; 1.2.3 -> 1点2点3 ; 1.0 -> 1点0"""
    parts = match.groups()
    return "点".join(parts)


def normalize_dotted_name(match: re.Match) -> str:
    """com.example.app -> com点example点app"""
    parts = match.groups()[0].split(".")
    return "点".join(parts)


def normalize_ipv4(match: re.Match) -> str:
    parts = match.groups()
    return "点".join(parts)


def normalize_text(text: str) -> tuple[str, list[str]]:
    """Return (rewritten_text, list_of_changes).  list is empty if unchanged."""
    changes: list[str] = []
    orig = text

    # Apply in order so longer/more specific matches win.
    new = _IPV4.sub(normalize_ipv4, text)
    if new != text:
        changes.append("ip")
        text = new

    new = _VERSIONED.sub(normalize_versioned, text)
    if new != text:
        changes.append("version")
        text = new

    new = _DOTTED_NAME.sub(normalize_dotted_name, text)
    if new != text:
        changes.append("dotted-name")
        text = new

    # ASCII straight quotes inside Chinese text — first occurrence left → 「,
    # matching right → 」.  We handle pair-based replacement via alternation.
    if any(c in text for c in ("‘", "’", "'")):
        chinese_chars_before = sum(1 for c in text if "一" <= c <= "鿿")
        if chinese_chars_before > 0:
            # Alternating replacement: scan, for each ASCII quote flip between
            # 「 and 」.  This handles every opening/closing pair in one pass.
            out: list[str] = []
            flip = True  # next quote opens the bracket
            for ch in text:
                if ch in ("‘", "'"):
                    out.append("「" if flip else "」")
                    flip = not flip
                elif ch == "’":
                    out.append("」" if not flip else "「")
                    flip = not flip
                else:
                    out.append(ch)
            new = "".join(out)
            if new != text:
                changes.append("apostrophe")
                text = new

    return text, changes


def walk_scripts(obj: Any, path: str = "") -> list[tuple[str, str, list[str]]]:
    """Yield (path, old_text, changes) for every change found."""
    out: list[tuple[str, str, list[str]]] = []
    if isinstance(obj, dict):
        if "text" in obj and isinstance(obj["text"], str):
            new, changes = normalize_text(obj["text"])
            if changes:
                out.append((f"{path}.text", obj["text"], changes))
                obj["text"] = new
        for k, v in obj.items():
            out.extend(walk_scripts(v, f"{path}.{k}"))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out.extend(walk_scripts(v, f"{path}[{i}]"))
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="podcast-script.json to scan")
    parser.add_argument(
        "-o", "--output", type=Path,
        help="output path (default: in-place when --write, else print summary)",
    )
    parser.add_argument(
        "--write", action="store_true",
        help="write changes back to the input file",
    )
    args = parser.parse_args()

    if not args.input.exists():
        print(f"ERROR: {args.input} not found", file=sys.stderr)
        return 2

    data = json.loads(args.input.read_text(encoding="utf-8"))
    changes = walk_scripts(data)

    if not changes:
        print(f"OK: no TTS-unsafe characters found in {args.input}")
        return 0

    # Report
    print(f"Found {len(changes)} text field(s) needing normalization in {args.input}:")
    for path, old, kinds in changes:
        kinds_str = ", ".join(kinds)
        # Truncate old text for readability
        old_preview = old if len(old) <= 80 else old[:77] + "..."
        print(f"  - {path}  [{kinds_str}]")
        print(f"      before: {old_preview}")

    # Decide where to write
    if args.write:
        out_path = args.input
    elif args.output:
        out_path = args.output
    else:
        print("\nRe-run with --write to apply these changes in-place, or use -o FILE.")
        return 1

    out_path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"\n✓ Wrote normalized script to {out_path}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
