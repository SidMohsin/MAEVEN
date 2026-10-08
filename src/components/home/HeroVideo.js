'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed hero video. The first paint is the video's own first frame (a <picture> poster with
 * a landscape and a portrait version), so there is no switch from a different photo to the video.
 * The browser picks the landscape or portrait clip via <source media>.
 *
 * Playback starts after hydration unless the visitor prefers reduced motion or has data saving on
 * (then the first frame simply stays). It pauses off-screen / in a hidden tab, and the info card
 * offers a pause control (WCAG 2.2.2) and a progress line that follows the loop.
 */
const PORTRAIT = '(max-aspect-ratio: 1/1)';

function PauseButton({ paused, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={paused ? 'Play background video' : 'Pause background video'}
      className="border-paper/30 text-paper hover:border-olive-hi hover:text-olive-hi flex size-9 shrink-0 items-center justify-center border transition-colors duration-300"
    >
      <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
        {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
      </svg>
    </button>
  );
}

export default function HeroVideo({ video }) {
  const ref = useRef(null);
  const progress = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const conn = navigator.connection;
    const check = () => {
      const slow = Boolean(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
      setAllowed(!reduce.matches && !slow);
    };
    check();
    reduce.addEventListener('change', check);
    return () => reduce.removeEventListener('change', check);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && !document.hidden));
    const onVis = () => setInView(!document.hidden && el.getBoundingClientRect().bottom > 0);
    io.observe(el);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const running = allowed && !userPaused && inView;
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (running) v.play().catch(() => {});
    else v.pause();
  }, [running]);

  const onTimeUpdate = (e) => {
    const v = e.currentTarget;
    if (progress.current && v.duration) {
      progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    }
  };

  return (
    <>
      <div className="bg-ink absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* First frame of the video: identical to where playback starts. */}
        <picture>
          <source media={PORTRAIT} srcSet={video.portrait.poster} />
          <img
            src={video.landscape.poster}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={onTimeUpdate}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source media={PORTRAIT} src={video.portrait.src} type="video/mp4" />
          <source src={video.landscape.src} type="video/mp4" />
        </video>
        {/* Readability: darken behind the text (bottom/left) and keep the footage bright above. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/0.92)_0%,rgb(10_10_10/0.6)_35%,rgb(10_10_10/0.15)_70%,rgb(10_10_10/0.35)_100%)]" />
        <div className="from-ink/60 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        {/* Phones: text covers most of the frame, over a light studio wall; darken evenly. */}
        <div className="bg-ink/45 absolute inset-0 md:hidden" />
      </div>

      {/* Info card: what is on screen, loop progress, pause */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-10 md:top-28">
        <div className="container-page flex justify-end">
          <div
            className="pop-in border-olive bg-ink/75 pointer-events-auto flex w-60 items-center gap-4 border-l py-3 pr-3 pl-4 md:w-72"
            style={{ '--d': '900ms' }}
          >
            <div className="min-w-0 flex-1">
              <p className="text-paper/60 text-[0.6rem] tracking-[0.22em] uppercase">
                {video.label}
              </p>
              <p className="mt-2 truncate text-sm text-white">{video.detail}</p>
              <div className="bg-paper/15 mt-3 h-px overflow-hidden">
                <div
                  ref={progress}
                  className="bg-olive-hi h-px origin-left transition-transform duration-300 ease-linear"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </div>
            {allowed && (
              <PauseButton paused={userPaused} onClick={() => setUserPaused((p) => !p)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
