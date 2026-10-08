"""
Build the website videos from MAEVEN's raw behind-the-scenes footage (former Studio X material).

  python scripts/build-videos.py "D:/MAEVEN-raw/studio X"

Needs ffmpeg on PATH. Outputs (committed to Git, served by Next.js):
  public/video/hero-landscape.mp4   16:9 loop for wide screens   (4K camera clips, cut + crossfaded)
  public/video/hero-portrait.mp4    9:16 loop for phones         (vertically shot clips, rotated)
  public/video/studio-reel.mp4      4:5 behind-the-scenes reel   (logo-free middle of Videos/1.mov)
  public/video/*-poster.jpg         first frame of each, shown while the video loads

Rules: real footage only (edited, never generated); no audio; the old Studio X logo never appears
(the reel is cut to 2.9 s - 16.0 s, which excludes the logo intro and outro; the camera clips have none).
To replace a video with final client footage later, overwrite the file at the same path.
"""
import subprocess
import sys
from pathlib import Path

RAW = Path(sys.argv[1] if len(sys.argv) > 1 else 'D:/MAEVEN-raw/studio X')
OUT = Path(__file__).resolve().parent.parent / 'public' / 'video'
FADE = 0.6  # crossfade between clips, seconds

# (file, start, duration). Landscape clips are native 16:9; portrait clips were shot vertically
# but stored sideways, so they are rotated 90 degrees counter-clockwise.
LANDSCAPE = [('footage/DSC_6243.MOV', 0.0, 5.0), ('footage/DSC_6262.MOV', 0.0, 4.8), ('footage/DSC_6063.MOV', 0.0, 2.1)]
PORTRAIT = [
    ('footage/DSC_5958.MOV', 0.4, 3.6),
    ('footage/DSC_5941.MOV', 0.6, 3.4),
    ('footage/DSC_6261.MOV', 0.5, 3.4),
    ('footage/DSC_5955.MOV', 0.0, 3.0),
    ('footage/DSC_6108.MOV', 0.0, 1.8),
]
REEL = ('Videos/1.mov', 2.9, 13.1)


def run(args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)


def montage(clips, out, size, rotate):
    w, h = size
    inputs, chains = [], []
    for i, (f, start, dur) in enumerate(clips):
        inputs += ['-ss', str(start), '-t', str(dur), '-i', str(RAW / f)]
        rot = 'transpose=2,' if rotate else ''
        chains.append(f'[{i}:v]{rot}scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},fps=30,format=yuv420p,setsar=1[v{i}]')
    # chain crossfades
    last, offset = 'v0', clips[0][2] - FADE
    for i in range(1, len(clips)):
        tag = f'x{i}'
        chains.append(f'[{last}][v{i}]xfade=transition=fade:duration={FADE}:offset={offset:.3f}[{tag}]')
        last, offset = tag, offset + clips[i][2] - FADE
    run([*inputs, '-filter_complex', ';'.join(chains), '-map', f'[{last}]', '-an',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
         '-movflags', '+faststart', str(out)])


def poster(video, out):
    run(['-i', str(video), '-frames:v', '1', '-q:v', '2', str(out)])  # frame 0 = seamless start


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    montage(LANDSCAPE, OUT / 'hero-landscape.mp4', (1920, 1080), rotate=False)
    montage(PORTRAIT, OUT / 'hero-portrait.mp4', (720, 1280), rotate=True)
    f, start, dur = REEL
    run(['-ss', str(start), '-t', str(dur), '-i', str(RAW / f), '-map', '0:v:0', '-an', '-dn', '-map_metadata', '-1', '-vf', 'scale=864:1080,fps=30,format=yuv420p',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-movflags', '+faststart', str(OUT / 'studio-reel.mp4')])
    for name in ('hero-landscape', 'hero-portrait', 'studio-reel'):
        poster(OUT / f'{name}.mp4', OUT / f'{name}-poster.jpg')
        print(name, round((OUT / f'{name}.mp4').stat().st_size / 1e6, 2), 'MB')


main()
