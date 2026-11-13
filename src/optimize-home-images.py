#!/usr/bin/env python3
"""Build responsive homepage card images without changing their originals.

Requires Pillow (``python3 -m pip install Pillow``).
Run from any directory: ``python3 src/optimize-home-images.py``.
"""

from pathlib import Path
import re

from PIL import Image


IMAGE_DIRECTORY = Path(__file__).resolve().parents[1] / "docs/assets/images"
WIDTHS = (480, 680)
QUALITY = 85


def main():
    originals = sorted(
        image
        for image in IMAGE_DIRECTORY.glob("home-*.webp")
        if not re.search(r"-\d+$", image.stem)
    )
    for original in originals:
        with Image.open(original) as image:
            for width in WIDTHS:
                if width >= image.width:
                    continue
                height = round(image.height * width / image.width)
                resized = image.resize((width, height), Image.Resampling.LANCZOS)
                destination = original.with_stem(f"{original.stem}-{width}")
                resized.save(
                    destination,
                    format="WEBP",
                    quality=QUALITY,
                    method=6,
                    exact=True,
                )
                print(
                    f"{destination.name}: {width} × {height}, "
                    f"{destination.stat().st_size:,} bytes"
                )


if __name__ == "__main__":
    main()
