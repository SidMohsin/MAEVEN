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

_args = [a for a in sys.argv[1:] if not a.startswith('--')]
RAW = Path(_args[0] if _args else 'D:/MAEVEN-raw/studio X')
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

# Services page: video only for the two services that are video themselves. One continuous take
# each (no cuts), normal speed, 4:5, looped seamlessly (the end cross-fades into the start).
# (slug, file, first frame, last frame, frames to drop). Both clips were shot vertically but stored
# sideways (rotated here). Dropped frames are single-frame camera-flash spikes (measured brightness
# jumps), which would otherwise flicker; removing one frame is invisible as motion.
SERVICE_VIDEOS = [
    ('video-film', 'footage/DSC_6075.MOV', 2, 146, [55, 101]),            # model turning on set
]
LOOP_FADE = 0.6

# AI work supplied for the website ("WEBSITE ASSETS" folder): (slug, file, start, duration, fit, arg)
# fit 'crop' fills the 4:5 frame with the window at height `arg` (0 = top, 1 = bottom);
# 'pad' keeps the whole frame on a background colour `arg`. Looped with a crossfade.
WA = 'WEBSITE ASSETS/'
SERVICE_SUPPLIED = [
    ('ai-video-film', WA + 'AI VIDEO & FILM.mp4', 0.3, 10.0, 'crop', 0.5),        # shoe ad film
    ('ai-content-creation', WA + 'AI CONTENT CREATIOPN.mp4', 1.2, 10.0, 'crop', 0.12),  # AI model; keep the head in frame
    ('product-retail-video', WA + 'PRODUCT VIDEO.mp4', 0.0, 10.0, 'pad', 'black'),  # jeans 360 on black
]

# Smart Tech renders supplied by the client (AR_3D folder): whole clip, looped with a crossfade.
# fit 'crop' fills the 4:5 frame (centre, away from the corner badge); 'pad' keeps the object
# whole on its own background colour.
SERVICE_RENDERS = [
    ('ar-vr-immersive', 'AR_3D/3D visuals.mp4', 'crop', None),   # virtual store walkthrough
    ('3d-visualization', 'AR_3D/Bag.mp4', 'pad', '0xC8D5DF'),    # 3D bag turntable
]


def service_video(slug, f, first, last, drop, out_dir):
    out = out_dir / f'{slug}.mp4'
    keep = f"between(n,{first},{last})" + ''.join(f'*not(eq(n,{n}))' for n in drop)
    d = (last - first + 1 - len(drop)) / 30
    x = LOOP_FADE
    chain = (f"[0:v]select='{keep}',setpts=N/30/TB,transpose=2,"
             f'scale=720:900:force_original_aspect_ratio=increase,crop=720:900,'
             f'fps=30,format=yuv420p,setsar=1,split[a][b];'
             f'[b]trim=0:{x},setpts=PTS-STARTPTS[head];'
             f'[a]trim={x}:{d:.3f},setpts=PTS-STARTPTS[body];'
             f'[body][head]xfade=transition=fade:duration={x}:offset={d - 2 * x:.3f}[v]')
    run(['-i', str(RAW / f), '-filter_complex', chain, '-map', '[v]', '-an', '-map_metadata', '-1',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-movflags', '+faststart', str(out)])
    return out


def service_render(slug, f, fit, color, out_dir):
    out = out_dir / f'{slug}.mp4'
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
                              str(RAW / f)], capture_output=True, text=True).stdout)
    x = LOOP_FADE
    size = ('scale=720:900:force_original_aspect_ratio=increase,crop=720:900' if fit == 'crop' else
            f'scale=720:900:force_original_aspect_ratio=decrease,pad=720:900:(ow-iw)/2:(oh-ih)/2:color={color}')
    chain = (f'[0:v]{size},fps=30,format=yuv420p,setsar=1,split[a][b];'
             f'[b]trim=0:{x},setpts=PTS-STARTPTS[head];'
             f'[a]trim={x}:{d:.3f},setpts=PTS-STARTPTS[body];'
             f'[body][head]xfade=transition=fade:duration={x}:offset={d - 2 * x:.3f}[v]')
    run(['-i', str(RAW / f), '-filter_complex', chain, '-map', '[v]', '-an', '-map_metadata', '-1',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-movflags', '+faststart', str(out)])
    return out


def service_supplied(slug, f, start, dur, fit, arg, out_dir):
    out = out_dir / f'{slug}.mp4'
    x = LOOP_FADE
    size = (f'scale=720:900:force_original_aspect_ratio=increase,crop=720:900:(iw-720)/2:(ih-900)*{arg}'
            if fit == 'crop' else
            f'scale=720:900:force_original_aspect_ratio=decrease,pad=720:900:(ow-iw)/2:(oh-ih)/2:color={arg}')
    chain = (f'[0:v]{size},fps=30,format=yuv420p,setsar=1,split[a][b];'
             f'[b]trim=0:{x},setpts=PTS-STARTPTS[head];'
             f'[a]trim={x}:{dur:.3f},setpts=PTS-STARTPTS[body];'
             f'[body][head]xfade=transition=fade:duration={x}:offset={dur - 2 * x:.3f}[v]')
    run(['-ss', str(start), '-t', f'{dur:.3f}', '-i', str(RAW / f), '-filter_complex', chain, '-map', '[v]',
         '-an', '-map_metadata', '-1', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24',
         '-movflags', '+faststart', str(out)])
    return out


def build_service_videos():
    out_dir = OUT / 'services'
    out_dir.mkdir(parents=True, exist_ok=True)
    for c in SERVICE_SUPPLIED:
        out = service_supplied(*c, out_dir)
        poster(out, out_dir / f'{c[0]}-poster.jpg')
        print('services/' + out.name, round(out.stat().st_size / 1e3), 'KB')
    for c in SERVICE_RENDERS:
        out = service_render(*c, out_dir)
        poster(out, out_dir / f'{c[0]}-poster.jpg')
        print('services/' + out.name, round(out.stat().st_size / 1e3), 'KB')
    for c in SERVICE_VIDEOS:
        out = service_video(*c, out_dir)
        poster(out, out_dir / f'{c[0]}-poster.jpg')
        print('services/' + out.name, round(out.stat().st_size / 1e3), 'KB')


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
    build_service_videos()
    if '--services' in sys.argv:  # only the Services page videos
        return
    montage(LANDSCAPE, OUT / 'hero-landscape.mp4', (1920, 1080), rotate=False)
    montage(PORTRAIT, OUT / 'hero-portrait.mp4', (720, 1280), rotate=True)
    f, start, dur = REEL
    run(['-ss', str(start), '-t', str(dur), '-i', str(RAW / f), '-map', '0:v:0', '-an', '-dn', '-map_metadata', '-1', '-vf', 'scale=864:1080,fps=30,format=yuv420p',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-movflags', '+faststart', str(OUT / 'studio-reel.mp4')])
    for name in ('hero-landscape', 'hero-portrait', 'studio-reel'):
        poster(OUT / f'{name}.mp4', OUT / f'{name}-poster.jpg')
        print(name, round((OUT / f'{name}.mp4').stat().st_size / 1e6, 2), 'MB')


main()
