#!/usr/bin/env python3
"""Audit a PPTX for video-subtitle-safe layout.

When PPTX is rendered to 1920x1080 PNG and burned with subtitles at the
bottom (y >= 4.85" / 521px from top), every non-cover element's
`y + height` must fit in the content safe area (y <= 4.65"). This script
walks every slide's position+extent and reports any element that crosses
the boundary.

The cover slide (slide 1) is exempt — it shows for only a few seconds and
podcast-video does not place subtitles on top of the cover image.

Usage:
    python layout_audit.py presentation.pptx
    python layout_audit.py presentation.pptx --max-bottom 4.50  # stricter
    python layout_audit.py presentation.pptx --include-cover    # check cover too

Exit codes:
    0 - all non-cover elements within safe area
    1 - elements found that violate the safe area; report printed
"""
from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path

EMU_PER_INCH = 914400

# Safe area defaults match podcast-video subtitle footprint (y >= 4.85")
DEFAULT_MAX_BOTTOM = 4.65


def audit(pptx_path: Path, max_bottom: float, include_cover: bool) -> tuple[int, list[str]]:
    """Return (violation_count, list_of_warnings)."""
    if not pptx_path.exists():
        print(f"ERROR: {pptx_path} not found", file=sys.stderr)
        return 1, [f"missing file: {pptx_path}"]

    violations: list[str] = []

    slide_pattern = re.compile(r"ppt/slides/slide(\d+)\.xml$")
    off_pattern = re.compile(
        r'<a:off x="(-?\d+)" y="(-?\d+)"/>\s*<a:ext cx="(\d+)" cy="(\d+)"/>'
    )

    with zipfile.ZipFile(pptx_path) as z:
        for name in sorted(z.namelist()):
            m = slide_pattern.match(name)
            if not m:
                continue
            slide_num = int(m.group(1))
            # Cover slide is exempt by default — subtitles are not overlaid
            if slide_num == 1 and not include_cover:
                continue
            content = z.read(name).decode("utf-8")
            for off_match in off_pattern.finditer(content):
                x = int(off_match.group(1)) / EMU_PER_INCH
                y = int(off_match.group(2)) / EMU_PER_INCH
                w = int(off_match.group(3)) / EMU_PER_INCH
                h = int(off_match.group(4)) / EMU_PER_INCH
                # Skip zero-size placeholders that pptxgenjs emits
                if w == 0 or h == 0:
                    continue
                bottom = y + h
                if bottom > max_bottom:
                    msg = (
                        f"slide {slide_num}: element bottom={bottom:.2f}\" "
                        f"(y={y:.2f}\" h={h:.2f}\") exceeds {max_bottom:.2f}\""
                    )
                    violations.append(msg)

    return len(violations), violations


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", type=Path, help="path to presentation.pptx")
    parser.add_argument(
        "--max-bottom",
        type=float,
        default=DEFAULT_MAX_BOTTOM,
        help="max y+height in inches (default: 4.65 for video subtitle safety)",
    )
    parser.add_argument(
        "--include-cover",
        action="store_true",
        help="also audit slide 1 (the cover); default skips it",
    )
    args = parser.parse_args()

    count, violations = audit(args.pptx, args.max_bottom, args.include_cover)
    if count == 0:
        print(f"OK: all non-cover elements fit within bottom <= {args.max_bottom:.2f}\"")
        return 0

    print(f"FAIL: {count} element(s) exceed the {args.max_bottom:.2f}\" safe area:")
    for v in violations:
        print(f"  - {v}")
    print()
    print("These elements will be covered by burned-in subtitles in podcast-video.")
    print("Move their `y` up or shrink `h` so `y + h <= %.2f\"." % args.max_bottom)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
