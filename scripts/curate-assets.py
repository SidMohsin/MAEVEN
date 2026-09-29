"""
Curate MAEVEN assets from the client zip into a git-ignored folder + a generated manifest.

  python scripts/curate-assets.py "<path to Maeven-assets.zip>"

Outputs:
  public/_pending/*.jpg   processed images (git-ignored: NOT deployed until permission is confirmed)
  src/data/assets.js      manifest, every asset `cleared: false`

To publish an image: confirm permission, move it out of public/_pending, set cleared: true.

Selection rules: no AI-generated images, no Studio X branding, no test/duplicate folders, and no
frames with prominent third-party brand marks or street signage.
"""
import io
import json
import sys
import zipfile
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ZIP = sys.argv[1] if len(sys.argv) > 1 else 'Source_Materials/Maeven-assets.zip'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / '_pending'
MAX_W = 2400
CO = 'Creatives+On-Model'
PS = 'Packshots'

# (id, folder, source file, role, topic slug, alt text, note)
PICKS = [
    ('shadow-walk-banner', CO, 'Copy of 2026.03.23_WTN_model_packshot2429 kopiaa.jpg', 'banner', 'content-production',
     'Model in dark clothing walking across a studio backdrop with a hard diagonal shadow', 'Wide 2.47:1. Best pillar banner.'),
    ('pink-ball-banner', CO, 'Copy of 2026.03.23_WTN_model_packshot2275 kopiaa.jpg', 'banner', 'photography',
     'Model in dark activewear reclining against a magenta exercise ball on a white studio set', 'Wide 2.47:1.'),
    ('brick-wall-banner', CO, 'Copy of BANNER 2 (2000_800).jpg', 'banner', 'photography',
     'Two models in light grey loungewear leaning against a brick wall', 'Wide 2.5:1. Flash-lit lifestyle look.'),
    ('night-street-hero', CO, 'Copy of High res.jpg', 'hero', 'home',
     'Two models in light grey loungewear standing in a neon-lit street at night', 'Only true hi-res landscape (8115x5410). Neon shop signage visible: confirm OK to show.'),
    ('ball-pose', CO, 'Copy of 2026.03.23_WTN_model_packshot2259 kopia.jpg', 'topic', 'photography',
     'Model in dark activewear balancing on a magenta exercise ball with one leg raised', '1000x1250: low-res, use small.'),
    ('pair-back-front', CO, 'Copy of 2025.12.23_WTN_e-com15516 kopia.jpg', 'topic', 'photography',
     'Two models in black tops and trousers, one seen from behind, one from the front', '1000x1250: low-res, use small.'),
    ('pair-light-set', CO, 'Copy of 2025.12.23_WTN_e-com15299 kopia.jpg', 'topic', 'photography',
     'Two models in light grey co-ordinated sets on a neutral studio backdrop', '1000x1250: low-res, use small.'),
    ('shadow-portrait', CO, 'Copy of 2026.03.23_WTN_model_packshot2429 kopia.jpg', 'topic', 'photography',
     'Model in a black hooded jacket striding across a studio set with strong shadow', '1000x1250: low-res, use small.'),
    ('rain-editorial', CO, 'Copy of 1080x1920b.jpg', 'topic', 'photography',
     'Model in a dark technical jacket standing in a dark set with falling white particles', '1080x1920 vertical.'),
    ('rain-square', CO, 'Copy of 2025.12.23_WTN_e-com15656 kopia 3.jpg', 'topic', 'photography',
     'Model in a dark jacket against a dark, particle-filled backdrop', '1200x1200.'),
    ('packshot-quilted-tote', PS, '1-1 back.jpg', 'topic', 'e-com-production',
     'Black quilted tote bag photographed on a light grey background', 'Hi-res. Small brand mark may be visible.'),
    ('packshot-jeans', PS, '1-2.jpg', 'topic', 'e-com-production',
     'Wide-leg blue jeans photographed flat on a light background', 'Hi-res.'),
    ('packshot-dress', PS, '5-2.jpg', 'topic', 'e-com-production',
     'Pale blue satin slip dress photographed on a light background', 'Hi-res.'),
    ('packshot-shirt', PS, '2026.03.04_WAD_1463.jpg', 'topic', 'e-com-production',
     'Yellow checked overshirt photographed flat on a white background', '1600x2400.'),
    ('packshot-jacket', PS, '2026.03.04_WAD_1509.jpg', 'topic', 'e-com-production',
     'Olive utility jacket photographed on a light background', '1600x2400.'),
    ('packshot-knit-polo', PS, '2026.03.04_WAD_1413.jpg', 'topic', 'e-com-production',
     'Black knit polo sweater photographed on a light background', '1600x2400.'),
    ('packshot-bag-shoulder', PS, '2-1(1).jpg', 'topic', 'e-com-production',
     'Dark brown leather shoulder bag photographed on a light background', 'Hi-res. Small brand mark may be visible.'),
    ('packshot-bag-taupe', PS, '3-1 kopia.jpg', 'topic', 'e-com-production',
     'Taupe leather shoulder bag photographed on a light background', 'Hi-res. Small brand mark may be visible.'),
    ('detail-bag-interior', PS, '2-3(2).jpg', 'detail', 'e-com-production',
     'Close-up of a leather bag interior with a brass zip', 'Hi-res detail shot.'),
    ('detail-knit-collar', PS, '2026.03.04_WAD_1415.jpg', 'detail', 'e-com-production',
     'Close-up of a black knit collar with small buttons and a woven label', '1600x2400.'),
]

# Optional focal point (CSS object-position) so tight crops keep the subject in frame.
FOCUS = {
    'shadow-walk-banner': '14% 50%',
    'pink-ball-banner': '68% 50%',
    'brick-wall-banner': '40% 50%',
    'night-street-hero': '50% 45%',
}


def load_zip_index(z):
    idx = {}
    for e in z.infolist():
        if e.is_dir():
            continue
        rel = e.filename.split('/', 1)[1] if '/' in e.filename else e.filename
        parts = rel.rsplit('/', 1)
        folder = parts[0].strip() if len(parts) > 1 else ''
        idx[(folder, parts[-1])] = e
    return idx


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    z = zipfile.ZipFile(ZIP)
    idx = load_zip_index(z)
    manifest = []
    for aid, folder, fname, role, topic, alt, note in PICKS:
        e = idx.get((folder, fname))
        if e is None:
            sys.exit(f'Not found in zip: {folder}/{fname}')
        im = Image.open(io.BytesIO(z.read(e))).convert('RGB')
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        im.save(OUT / f'{aid}.jpg', quality=84, optimize=True, progressive=True)  # EXIF dropped
        manifest.append({
            'id': aid, 'src': f'/_pending/{aid}.jpg', 'width': im.width, 'height': im.height,
            'alt': alt, 'role': role, 'topic': topic, 'cleared': False,
            'source': f'{folder}/{fname}', 'note': note,
            **({'focus': FOCUS[aid]} if aid in FOCUS else {}),
        })
        print(f'{aid:28s} {im.width}x{im.height}')
    body = json.dumps(manifest, indent=2, ensure_ascii=False)
    header = (
        '// GENERATED by scripts/curate-assets.py: edit PICKS there, not here (except `cleared`).\n'
        '// `cleared: false` = client publishing permission NOT yet confirmed. Uncleared assets render\n'
        '// as labelled placeholders on the public site (see MediaImage).\n\n'
    )
    (ROOT / 'src' / 'data' / 'assets.js').write_text(
        header + 'export const assets = ' + body + ';\n\n'
        'export const getAsset = (id) => assets.find((a) => a.id === id) ?? null;\n',
        encoding='utf-8',
    )


main()
