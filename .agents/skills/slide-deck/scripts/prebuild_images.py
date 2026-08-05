#!/usr/bin/env python3
"""prebuild_images.py — generate per-slide PNGs via gpt-image CLI from slide-outline.json.

Usage:
    python prebuild_images.py <slide-outline.json>

Behavior:
- Reads slides[*].visual (or slides[*].id for slide number) from the outline
- For each visual.enabled slide, shells out to `gpt-image` CLI
- Writes PNGs to <project>/_build/imgs/slide-NN.png (NN = slide number, zero-padded)
- Skips already-generated files (idempotent, safe to re-run)
- Exits non-zero on any failure (upstream Step 4 retry picks it up)

Required:
- `gpt-image` on PATH (install with: pipx install git+https://github.com/wuyoscar/gpt_image_2_skill)
- OPENAI_API_KEY in env or ~/.env
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: prebuild_images.py <slide-outline.json>", file=sys.stderr)
        return 2

    outline = Path(sys.argv[1]).resolve()
    if not outline.is_file():
        print(f"outline not found: {outline}", file=sys.stderr)
        return 2

    img_dir = outline.parent / "_build" / "imgs"
    img_dir.mkdir(parents=True, exist_ok=True)

    data = json.loads(outline.read_text(encoding="utf-8"))
    slides = data.get("slides", [])
    if not slides:
        print("no slides in outline; nothing to do", file=sys.stderr)
        return 0

    plan = []
    for s in slides:
        v = s.get("visual") or {}
        if not v.get("enabled"):
            continue
        # tolerate both `id` and `slide` field names
        slide_num = s.get("id") or s.get("slide")
        if not isinstance(slide_num, int):
            print(f"[skip] slide without numeric id: {s.get('title','')}", file=sys.stderr)
            continue
        prompt_parts = []
        if v.get("style_anchor"):
            prompt_parts.append(str(v["style_anchor"]).rstrip(".") + ".")
        if v.get("prompt"):
            prompt_parts.append(str(v["prompt"]))
        if not prompt_parts:
            print(f"[skip] slide {slide_num}: empty visual.prompt", file=sys.stderr)
            continue
        plan.append({
            "id": slide_num,
            "prompt": " ".join(prompt_parts),
            "size": v.get("size", "1024x1024"),
            "quality": v.get("quality", "low"),
            "out": img_dir / f"slide-{slide_num:02d}.png",
        })

    if not plan:
        print("OK: no visual-enabled slides; nothing to do")
        return 0

    print(f"plan: {len(plan)} image(s) → {img_dir}")
    for item in plan:
        if item["out"].exists() and item["out"].stat().st_size > 10_000:
            print(f"[skip] {item['out'].name} (exists, {item['out'].stat().st_size} bytes)")
            continue

        cmd = [
            "gpt-image",
            "-p", item["prompt"],
            "-f", str(item["out"]),
            "--size", item["size"],
            "--quality", item["quality"],
        ]
        print(f"[gen ] {item['out'].name}  size={item['size']}  quality={item['quality']}")
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(f"  !! exit {r.returncode}", file=sys.stderr)
            print((r.stderr or r.stdout).strip(), file=sys.stderr)
            return 1
        if not item["out"].exists() or item["out"].stat().st_size < 10_000:
            print(f"  !! output missing or too small: {item['out']}", file=sys.stderr)
            return 1
        print(f"  -> {item['out'].stat().st_size} bytes")

    generated = [p for p in img_dir.glob("slide-*.png") if p.stat().st_size > 10_000]
    print(f"OK: {len(generated)} image(s) in {img_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
