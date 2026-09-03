#!/usr/bin/env python3
"""Cut the backgrounds out of the product photos in public/images/img.

Reads `<stem>.jpg` and writes `<stem>.png` with a transparent background, so a
figurine sits on the card instead of on Isabel's workbench. Re-runnable: pass
specific stems to redo just those.

    pip install rembg onnxruntime pillow

    python scripts/remove-backgrounds.py              # every .jpg not yet done
    python scripts/remove-backgrounds.py is13 is25    # just these
    python scripts/remove-backgrounds.py --force      # redo, overwriting PNGs

`is2` / `is4` are skipped: they are the brand illustrations (`brandAssets` in
lib/media-catalog.ts) used as full-bleed hero backgrounds, with the brand title
baked into the artwork. Cutting them out would destroy them.

The model is u2net with `post_process_mask`, which beat isnet-general-use and
silueta on this photo set (isnet left fine detail semi-transparent). Once the
PNGs exist, point the database at them with:

    npx tsx lib/migrate-images-to-png.ts --dry-run
"""
import argparse
import os
import re
import sys
import time

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(REPO, "public", "images", "img")

# Brand illustrations: keep their backgrounds, keep them as .jpg.
SKIP = {"is2", "is4"}

# Wide room shots where the product is a small part of the frame. Saliency
# models keep half the couch, so crop to the product first. (left, top, right,
# bottom) in source pixels, chosen to hold the original 3:4 aspect ratio.
PRECROP = {"is45": (600, 330, 1330, 1303)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("stems", nargs="*", help="e.g. is13 is25 (default: all)")
    parser.add_argument("--force", action="store_true", help="overwrite existing PNGs")
    args = parser.parse_args()

    from rembg import new_session, remove
    from PIL import Image

    if args.stems:
        stems = [s.removesuffix(".jpg") for s in args.stems]
    else:
        stems = sorted(
            (f[:-4] for f in os.listdir(IMG_DIR) if f.lower().endswith(".jpg")),
            key=lambda s: int(re.search(r"\d+", s).group()),
        )

    session = new_session("u2net")
    converted = skipped = 0

    for stem in stems:
        src = os.path.join(IMG_DIR, stem + ".jpg")
        dst = os.path.join(IMG_DIR, stem + ".png")

        if stem in SKIP:
            print(f"skip  {stem} (brand asset)")
            skipped += 1
            continue
        if not os.path.exists(src):
            print(f"skip  {stem} (no {stem}.jpg — originals live in assets/originals-jpg/)")
            skipped += 1
            continue
        if os.path.exists(dst) and not args.force:
            print(f"skip  {stem} ({stem}.png exists; --force to redo)")
            skipped += 1
            continue

        started = time.time()
        with Image.open(src) as image:
            image.load()
            source = image.convert("RGB")
        if stem in PRECROP:
            source = source.crop(PRECROP[stem])
        cutout = remove(source, session=session, post_process_mask=True)
        cutout.save(dst, "PNG", optimize=True, compress_level=9)

        size_kb = os.path.getsize(dst) // 1024
        print(f"ok    {stem}.jpg -> {stem}.png  {size_kb}KB  ({time.time() - started:.1f}s)")
        converted += 1

    print(f"\nconverted {converted}, skipped {skipped}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
