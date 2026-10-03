'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MediaCaption } from '@/components/ui/MediaImage';

/**
 * Slowly drifting rail of real MAEVEN stills. Every image keeps its own proportions (fixed row
 * height, natural width), with a hover caption. The set is rendered twice so the -50% loop is
 * seamless; the copy is hidden from assistive tech and never focusable.
 *
 * Pauses on hover and keyboard focus, and via the visible pause button (WCAG 2.2.2).
 * With reduced motion the rail stops and becomes a normal swipeable row (see globals.css).
 *
 * `items`: [{ asset, label, text }] (cleared assets only; the parent filters them).
 */
function Frame({ item, hidden }) {
  const { asset } = item;
  return (
    <figure
      className="group/media bg-surface-2 relative h-60 shrink-0 overflow-hidden md:h-[26rem]"
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
      aria-hidden={hidden || undefined}
    >
      <Image
        src={asset.src}
        alt={hidden ? '' : asset.alt}
        fill
        sizes="(min-width: 768px) 40vw, 60vw"
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] [@media(hover:hover)]:group-hover/media:scale-[1.05]"
      />
      <MediaCaption label={item.label} text={item.text} />
    </figure>
  );
}

export default function WorkRail({ items }) {
  const [paused, setPaused] = useState(false);
  // Roughly constant speed whatever the mix of wide and tall images.
  const sum = items.reduce((n, i) => n + i.asset.width / i.asset.height, 0);

  return (
    <div className="relative">
      <div className="container-page flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play image rail' : 'Pause image rail'}
          aria-pressed={paused}
          className="text-muted hover:text-olive-hi -mt-10 mb-4 flex items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 motion-reduce:hidden md:-mt-12"
        >
          <svg viewBox="0 0 24 24" className="size-3 fill-current" aria-hidden="true">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
          </svg>
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>

      {/* Focusable region: keyboard users can reach it (and scroll it when motion is reduced);
          focusing it also pauses the drift. */}
      <div
        className="rail overflow-hidden"
        role="region"
        aria-label="Production stills"
        tabIndex={0}
        data-paused={paused || undefined}
        style={{ '--rail-dur': `${Math.round(sum * 9)}s` }}
        data-reveal="fade"
      >
        <div className="rail-track">
          {[false, true].map((hidden) => (
            <div
              key={String(hidden)}
              className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4"
              aria-hidden={hidden || undefined}
            >
              {items.map((item) => (
                <Frame key={item.asset.id} item={item} hidden={hidden} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
