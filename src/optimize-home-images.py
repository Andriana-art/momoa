#!/usr/bin/env python3
"""Build responsive homepage images without changing their originals.

Requires Pillow with WebP and AVIF support (``python3 -m pip install Pillow``).
Run from any directory: ``python3 src/optimize-home-images.py``.
"""

from pathlib import Path
import re

from PIL import Image


IMAGE_DIRECTORY = Path(__file__).resolve().parents[1] / "docs/assets/images"
WIDTHS = (480, 680)
QUALITY = 85


def build_cards():
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


def build_mobile_hero():
    for suffix in ("-400", "-680", "-960", ""):
        source = IMAGE_DIRECTORY / f"hero-bust-plinth{suffix}.webp"
        with Image.open(source) as image:
            image.save(
                source.with_suffix(".avif"),
                quality=65,
                speed=4,
                subsampling="4:4:4",
            )

    with Image.open(IMAGE_DIRECTORY / "hero-gallery-640.webp") as image:
        # Bake the mobile hero's solid 87% ink overlay into the photo.
        scene = image.convert("RGB")
        ink = Image.new("RGB", scene.size, (16, 23, 34))
        Image.blend(scene, ink, 0.87).save(
            IMAGE_DIRECTORY / "hero-gallery-dark-640.webp", quality=90, method=6,
        )


if __name__ == "__main__":
    build_cards()
    build_mobile_hero()
