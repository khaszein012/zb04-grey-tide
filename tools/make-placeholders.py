"""Generate flat placeholder art for Episode 4 so the build and tests run before real art exists.

Every file is written with the exact dimensions the layout expects, so swapping in Lovable
output later is a drop-in replacement. Run from anywhere; paths are resolved from this file.
"""
import pathlib

from PIL import Image, ImageDraw

ASSETS = pathlib.Path(__file__).resolve().parents[1] / "src" / "assets"

# Beach palette: sand, sea, sky, shell and storm.
PALETTE = {
    "sand": (233, 214, 178),
    "shell": (247, 239, 224),
    "sea": (86, 158, 176),
    "deepsea": (38, 96, 118),
    "sky": (168, 208, 224),
    "coral": (226, 122, 96),
    "teal": (74, 152, 142),
    "navy": (34, 54, 74),
    "storm": (108, 116, 128),
    "mustard": (214, 163, 70),
    "kelp": (108, 138, 106),
}


def gradient(size, top, bottom):
    """Vertical two-colour wash, roughly matching gouache-on-paper shading."""
    w, h = size
    img = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(1, h - 1)
        draw.line(
            [(0, y), (w, y)],
            fill=tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3)),
        )
    return img


def stamp(img, label):
    """Small corner tick so a placeholder is never mistaken for final art."""
    draw = ImageDraw.Draw(img)
    w, h = img.size
    pad = max(12, w // 60)
    draw.text((pad, h - pad - 12), f"{label}  {w}x{h}", fill=PALETTE["navy"])
    return img


def build(name, size, top, bottom):
    img = gradient(size, PALETTE[top], PALETTE[bottom])
    stamp(img, name)
    img.save(ASSETS / f"{name}.jpg", quality=88)
    print(f"{name}.jpg  {size[0]}x{size[1]}")


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)

    build("sandpiper", (1920, 1080), "sky", "sand")

    # Eleven chapter illustrations at 4:3 (intro, eight missions, boss, epilogue).
    moods = [
        ("storm", "sea"), ("sky", "sea"), ("sea", "sand"), ("mustard", "shell"),
        ("teal", "shell"), ("coral", "sand"), ("deepsea", "teal"), ("kelp", "sea"),
        ("storm", "deepsea"), ("navy", "storm"), ("sky", "sand"),
    ]
    for i, (top, bottom) in enumerate(moods):
        build(f"chapter-{i}", (1536, 1152), top, bottom)

    # Mission backdrops.
    for name, top, bottom in [
        ("cove", "sky", "sea"), ("watchers", "sea", "sand"), ("machine", "storm", "navy"),
        ("yesno", "teal", "shell"), ("allwords", "mustard", "shell"),
        ("dolphinbay", "deepsea", "sky"), ("cleansea", "teal", "sky"),
        ("reporter", "coral", "sand"),
    ]:
        build(name, (1536, 1024), top, bottom)

    # Eight water-sport cards.
    for name in ["sport-swim", "sport-sail", "sport-dive", "sport-surf",
                 "sport-kayak", "sport-windsurf", "sport-snorkel", "sport-waterski"]:
        build(name, (768, 768), "sky", "sea")

    # Spot-the-difference pairs (waterski/surf reuse the sport cards).
    for name in ["spot-ice-cream", "spot-sandwich", "spot-hat", "spot-sunglasses",
                 "spot-bird", "spot-fish"]:
        build(name, (768, 768), "shell", "sand")

    # Dolphin and sea-state diagrams.
    for name in ["dolphin-jump", "dolphin-family", "dolphin-sound", "sea-clean", "sea-polluted"]:
        build(name, (768, 768), "sea", "deepsea")


if __name__ == "__main__":
    main()