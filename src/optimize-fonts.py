#!/usr/bin/env python3
"""Réduit les fichiers DM Sans avec fontTools, en conservant les caractères.

Prérequis : python3 -m pip install 'fonttools[woff]'
"""

import argparse
import json
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "docs/assets/fonts",
    )
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    output = args.output or args.source
    output.mkdir(parents=True, exist_ok=True)

    for source in sorted(args.source.glob("dm-sans-*.woff2")):
        destination = output / source.name
        font = TTFont(source, recalcTimestamp=False)
        axes = {axis.axisTag: axis for axis in font["fvar"].axes}
        original_bytes = source.stat().st_size
        already_optimized = (
            set(axes) == {"wght"}
            and axes["wght"].minValue == 400
            and axes["wght"].defaultValue == 400
            and axes["wght"].maxValue == 500
        )
        if already_optimized:
            if destination.resolve() != source.resolve():
                destination.write_bytes(source.read_bytes())
        else:
            limits = {"wght": (400, 500)}
            if "opsz" in axes:
                limits["opsz"] = 14
            result = instantiateVariableFont(font, limits, inplace=False, optimize=True)
            result.recalcTimestamp = False
            assert result.getGlyphOrder() == font.getGlyphOrder()
            assert result.getBestCmap() == font.getBestCmap()
            result.save(destination)
        print(json.dumps({
            "fichier": source.name,
            "octets_avant": original_bytes,
            "octets_apres": destination.stat().st_size,
            "graisses": [400, 500],
            "taille_optique_fixe": 14,
            "glyphes_conserves": True,
        }, ensure_ascii=False))


if __name__ == "__main__":
    main()
