"""
Curate MAEVEN assets from the client zip into public/images + a generated manifest.

  python scripts/curate-assets.py "<path to Maeven-assets.zip>" "<path to studio X folder>"

Sources: the first client zip (PICKS) and the later "studio X" folder from Kamil (STUDIO_PICKS;
Studio X is MAEVEN's former brand name). Neither source is committed to Git.

Outputs:
  public/images/*.jpg     processed images (committed to Git, served by Next.js)
  src/data/assets.js      manifest, every asset `cleared: true` (client-approved)

Only run this with images the client has approved for the website. The raw zip itself is never
committed (see .gitignore).

Selection rules: no AI-generated images, no Studio X branding, no test/duplicate folders, and no
frames with prominent third-party brand marks or street signage.
"""
import io
import json
import subprocess
import sys
import zipfile
from pathlib import Path

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
ZIP = sys.argv[1] if len(sys.argv) > 1 else 'Source_Materials/Maeven-assets.zip'
STUDIO = Path(sys.argv[2] if len(sys.argv) > 2 else 'D:/MAEVEN-raw/studio X')
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'images'
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
    ('onmodel-floral', CO, 'Copy of 2026.03.23_WTN_model_packshot2114.jpg', 'topic', 'home',
     'Model with glasses in a black hoodie and joggers with a white floral print, on a grey studio backdrop', 'On-model, studio. Home "What we do".'),
]

# From the "studio X" folder. (id, folder, file, role, topic slug, alt text, note). A file ending in
# ".MOV@<seconds>" is a still frame taken from that video at that time.
NEON, BTS, TFC, TEST, KAMIL = 'Neon Light Banner', '3rd shoot big studio', 'TFC', 'Test Packshots', 'Kaamil Photos'
STUDIO_PICKS = [
    ('neon-pink-street', NEON, 'DSC_4677.JPG', 'hero', 'home',
     'Two models in grey tracksuits on a cobbled street under pink and red neon signs at night', 'Neon night shoot.'),
    ('neon-montaz', NEON, 'DSC_4687.JPG', 'hero', 'home',
     'Two models in grey tracksuits standing under blue and orange neon shop signs at night', 'Neon night shoot.'),
    ('neon-modny-close', NEON, 'DSC_4622.JPG', 'topic', 'photography',
     'Two models in grey hoodies posing close together under a green neon sign at night', 'Neon night shoot.'),
    ('neon-cafe', NEON, 'DSC_4566.JPG', 'topic', 'photography',
     'Two models in grey tracksuits sitting in a dimly lit cafe with bookshelves', 'Neon night shoot, interior.'),
    ('neon-library', NEON, 'DSC_4570.JPG', 'topic', 'photography',
     'Model in a grey hoodie leaning against a wall of bookshelves', 'Portrait.'),
    ('neon-brick-step', NEON, 'DSC_4611.JPG', 'topic', 'photography',
     'Two models in grey tracksuits stepping out along a brick wall at night, lit by flash', 'Neon night shoot.'),
    ('neon-street-walk', NEON, 'DSC_4616.JPG', 'topic', 'photography',
     'Two models in grey tracksuits walking hand in hand past an old building at dusk', 'Neon night shoot.'),
    ('neon-modny-pair', NEON, 'DSC_4644.JPG', 'topic', 'photography',
     'Two models in grey tracksuits posing under a large neon sign in a narrow street', 'Neon night shoot.'),
    ('neon-window-pair', NEON, 'DSC_4583.JPG', 'topic', 'photography',
     'Two models in grey tracksuits sitting on a brick window ledge at night', 'Neon night shoot.'),
    ('bts-camera', BTS, 'IMG_0634.JPG', 'topic', 'video-film',
     'Close-up of hands holding a camera, its screen showing a model on set', 'Behind the scenes.'),
    ('bts-styling', BTS, 'IMG_0635.JPG', 'topic', 'about',
     "Stylist adjusting a model's jacket on set beside a clothing rail", 'Behind the scenes.'),
    ('studio-portrait-hood', BTS, 'IMG_0636.JPG', 'topic', 'photography',
     'Studio portrait of a young man in an oatmeal hoodie against a white wall', 'On-model, studio.'),
    ('studio-portrait-pose', BTS, 'IMG_0641.JPG', 'topic', 'photography',
     'Model in an oatmeal hoodie leaning on a white wall with one hand in his hair', 'On-model, studio.'),
    ('tfc-cami', TFC, 'EFC 7.jpg', 'topic', 'e-com-production',
     'Blue ribbed camisole photographed on a pink background', 'The Female Company.'),
    ('tfc-brief', TFC, 'EFC 2.jpg', 'topic', 'e-com-production',
     'Blue ribbed briefs photographed on a pink background', 'The Female Company.'),
    ('tfc-lace', TFC, 'EFC6.jpg', 'topic', 'e-com-production',
     'Black briefs with lace panels photographed on a pink background', 'The Female Company.'),
    ('tfc-detail', TFC, 'EFC 9.jpg', 'detail', 'e-com-production',
     'Close-up of the straps and scalloped edge of a blue ribbed camisole', 'The Female Company, detail.'),
    ('packshot-vest', TEST, '00000.jpg', 'topic', 'e-com-production',
     'Black quilted gilet photographed on a white background', 'Packshot.'),
    ('packshot-zip-knit', TEST, 'offwhite.jpg', 'topic', 'e-com-production',
     'Grey half-zip knit sweater photographed on an off-white background', 'Packshot.'),
    ('detail-zip-knit', TEST, 'detail.jpg', 'detail', 'e-com-production',
     'Close-up of the zip and ribbed collar of a grey knit sweater', 'Detail.'),
    ('studio-seated-denim', TEST, '2022-03-08 14.12.41.jpg', 'topic', 'photography',
     'Model in a white T-shirt and blue jeans sitting on a chrome chair in the studio', 'On-model, studio.'),
    ('studio-portrait-tee', TEST, '2022-03-08 14.20.50.jpg', 'topic', 'photography',
     'Studio portrait of a model in a white T-shirt looking to the side', 'On-model, studio.'),
    ('lifestyle-brick-close', KAMIL, 'Z70_0236.JPG', 'topic', 'photography',
     'Man in a dark jacket with sunglasses on his head in front of a brick wall with graffiti', 'Lifestyle.'),
    ('lifestyle-brick-full', KAMIL, 'Z70_0232.JPG', 'topic', 'photography',
     'Man in a dark jacket standing in the doorway of a red brick building', 'Lifestyle.'),
    ('post-retouch-screen', 'footage', 'DSC_6063.MOV@1.0', 'topic', 'post-production',
     'Laptop screen showing a fashion photo being retouched', 'Still frame from behind-the-scenes footage.'),
    # Behind-the-scenes stills for the Services page (frames checked: sharp, no Studio X mark;
    # Videos/1.mov is only used between its logo intro and outro).
    ('bts-retouch-laptop', 'Videos', '1.mov@11.5', 'topic', 'smart-tech',
     'Laptop showing a full-length fashion photo in editing software', 'Still frame from the behind-the-scenes reel.'),
    ('bts-profile', 'Videos', '1.mov@13.5', 'topic', 'about',
     'Model in a grey hoodie in profile, looking down, in soft window light', 'Still frame from the behind-the-scenes reel.'),
    ('bts-wardrobe', 'Videos', 'Sequence 02_1.MP4@2.6', 'topic', 'creative-brand',
     'Stylist choosing shirts from a clothing rail before a shoot', 'Still frame from the behind-the-scenes sequence (logo-free part).'),
    # Services page: photo shown when a service card is pointed at / swiped to (closest real material).
    ('bts-casting', 'Videos', 'Sequence 02_1.MP4@0.9', 'topic', 'enterprise-learning-video',
     'Model in a cream turtleneck talking during a casting', 'Still frame from the behind-the-scenes sequence.'),
    # "WEBSITE ASSETS" folder (supplied for the website, named by use).
    ('wa-detail', 'WEBSITE ASSETS', 'DETAIL.jpg', 'detail', 'home',
     'Close-up of a khaki shirt pocket with a dark button', 'Detail shot.'),
    ('wa-ecom', 'WEBSITE ASSETS', 'ECOM.jpg', 'topic', 'home',
     'Model in a navy hoodie and joggers with a light blue print on a light studio backdrop', 'E-commerce, on-model.'),
    ('wa-packshot', 'WEBSITE ASSETS', 'PACKSHOT.jpg', 'topic', 'home',
     'Beige double-breasted short coat photographed on a light background', 'Packshot.'),
    ('wa-editorial', 'WEBSITE ASSETS', 'EDITORIAL.jpg', 'topic', 'home',
     'Model in a dark technical jacket in a dark set with falling white particles', 'Editorial.'),
    ('packshot-print-back', TEST, 'offwhite back.jpg', 'topic', 'design',
     'Back of a black sweatshirt with a white script print', 'Packshot.'),
]

# Optional focal point (CSS object-position) so tight crops keep the subject in frame.
FOCUS = {
    'shadow-walk-banner': '14% 50%',
    'pink-ball-banner': '68% 50%',
    'brick-wall-banner': '40% 50%',
    'night-street-hero': '50% 45%',
    'neon-pink-street': '50% 55%',
    'neon-montaz': '50% 55%',
    'onmodel-floral': '50% 18%',
    'wa-ecom': '50% 12%',
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


def load_folder_image(folder, fname):
    if '.mov@' in fname.lower() or '.mp4@' in fname.lower():
        name, t = fname.split('@')
        frame = subprocess.run(['ffmpeg', '-v', 'error', '-ss', t, '-i', str(folder / name), '-frames:v', '1',
                                '-f', 'image2pipe', '-vcodec', 'png', '-'], check=True, capture_output=True).stdout
        return Image.open(io.BytesIO(frame)).convert('RGB')
    path = folder / fname
    if not path.exists():
        sys.exit(f'Not found: {path}')
    return ImageOps.exif_transpose(Image.open(path)).convert('RGB')


def save(im, aid, alt, role, topic, source, note):
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    im.save(OUT / f'{aid}.jpg', quality=84, optimize=True, progressive=True)  # EXIF dropped
    return {
        'id': aid, 'src': f'/images/{aid}.jpg', 'width': im.width, 'height': im.height,
        'alt': alt, 'role': role, 'topic': topic, 'cleared': True,
        'source': source, 'note': note,
        **({'focus': FOCUS[aid]} if aid in FOCUS else {}),
    }


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
            'id': aid, 'src': f'/images/{aid}.jpg', 'width': im.width, 'height': im.height,
            'alt': alt, 'role': role, 'topic': topic, 'cleared': True,
            'source': f'{folder}/{fname}', 'note': note,
            **({'focus': FOCUS[aid]} if aid in FOCUS else {}),
        })
        print(f'{aid:28s} {im.width}x{im.height}')
    for aid, folder, fname, role, topic, alt, note in STUDIO_PICKS:
        im = load_folder_image(STUDIO / folder, fname)
        manifest.append(save(im, aid, alt, role, topic, f'studio X/{folder}/{fname}', note))
        print(f"{aid:28s} {manifest[-1]['width']}x{manifest[-1]['height']}")
    body = json.dumps(manifest, indent=2, ensure_ascii=False)
    header = (
        '// GENERATED by scripts/curate-assets.py: edit PICKS there, not here.\n'
        '// Files live in public/images/<id>.jpg and are committed to Git. To replace a photo with a final\n'
        '// one, overwrite the file at the same path (keep the filename); update width/height/alt here if the\n'
        "// new picture's proportions or content differ. `cleared: true` = approved for the public site.\n\n"
    )
    (ROOT / 'src' / 'data' / 'assets.js').write_text(
        header + 'export const assets = ' + body + ';\n\n'
        'export const getAsset = (id) => assets.find((a) => a.id === id) ?? null;\n',
        encoding='utf-8',
    )


main()
