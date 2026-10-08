'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Icon from '@/components/ui/Icon';

const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (cb) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const motionAllowed = () => !window.matchMedia(REDUCE).matches;

/**
 * Interactive part of a Services block (GoPackshot's services section):
 *  - the media frame: a photo with a label; pointing at a service card (desktop) or swiping to it
 *    (phone) cross-fades to that service's photo or clip, and the label shows the service name;
 *  - the service cards: a 2-column grid on desktop, a swipeable row directly under the frame on
 *    phones (the frame follows the card in view; tapping a card selects it too).
 * Only the selected clip plays (muted, looping); with reduced motion clips stay on their first frame.
 * Nothing changes on its own. `media[0]` is the block's resting photo.
 */
export default function ServiceShowcase({ media, cards, label, imageLeft, header }) {
  const [sel, setSel] = useState(null); // slug of the selected card (null = resting photo)
  const motion = useSyncExternalStore(subscribeMotion, motionAllowed, () => false);
  const row = useRef(null);
  const videos = useRef({});

  const selected = cards.find((c) => c.slug === sel);
  const active = selected?.media ?? 0; // index into media
  // Label: the service name when a card with its own media is selected, else what the photo shows.
  const shownLabel = selected && selected.media != null ? selected.name : label;

  // Play only the selected clip; others pause and rewind.
  useEffect(() => {
    Object.entries(videos.current).forEach(([i, v]) => {
      if (!v) return;
      if (Number(i) === active && motion) v.play().catch(() => {});
      else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [active, motion]);

  // Phones: the card scrolled into place in the row selects its media.
  const onRowScroll = () => {
    const el = row.current;
    if (!el || window.matchMedia('(min-width: 768px)').matches) return;
    const first = el.firstElementChild;
    if (!first) return;
    // At the start of the row nothing is chosen yet: keep the block photo and its own label.
    if (el.scrollLeft < 8) return setSel(null);
    const step = first.getBoundingClientRect().width + 12; // card width + gap-3
    const i = Math.max(0, Math.round(el.scrollLeft / step));
    setSel(cards[i]?.slug ?? null); // past the last card (the "talk to us" card): resting photo
  };

  const pick = (c) => setSel(c.slug);

  return (
    <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
      {/* Heading block (phones: first, so the photo sits right above the swipe row) */}
      <div
        className={`min-w-0 md:col-span-7 md:row-start-1 ${imageLeft ? 'md:col-start-6' : 'md:col-start-1'}`}
      >
        {header}
      </div>

      {/* Media frame */}
      <div
        className={`tone-dark relative md:col-span-5 md:row-span-2 md:row-start-1 md:self-center ${
          imageLeft ? 'md:col-start-1' : 'md:col-start-8'
        }`}
      >
        <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden">
          <div data-wipe className="bg-surface-2 absolute inset-0">
            {media.map((m, i) =>
              m.type === 'video' ? (
                <video
                  key={m.key}
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={m.src}
                  poster={m.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-out)] ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ) : (
                <Image
                  key={m.key}
                  src={m.src}
                  alt={i === active ? m.alt : ''}
                  aria-hidden={i === active ? undefined : true}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  style={m.focus ? { objectPosition: m.focus } : undefined}
                  className={`object-cover transition-opacity duration-700 ease-[var(--ease-out)] ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ),
            )}
          </div>
          <div className="from-ink/50 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
        </div>
        <span className="bg-ink/85 text-paper absolute bottom-4 left-4 border-l-2 border-[var(--color-olive-hi)] px-4 py-2.5 text-xs font-medium tracking-[0.14em] uppercase md:bottom-6 md:left-6">
          {shownLabel}
        </span>
      </div>

      {/* Service cards: swipe row on phones, 2-column grid from md */}
      <div
        className={`min-w-0 md:col-span-7 md:row-start-2 ${imageLeft ? 'md:col-start-6' : 'md:col-start-1'}`}
      >
        <ul
          ref={row}
          onScroll={onRowScroll}
          tabIndex={0}
          aria-label={`${label}: services`}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setSel(null)}
          data-reveal="stagger"
          style={{ '--d': '300ms' }}
          className="focus-visible:outline-olive-hi -mx-5 flex snap-x snap-mandatory scroll-px-5 scrollbar-none gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0"
        >
          {cards.map((c) => (
            <li
              key={c.slug}
              id={c.slug}
              onPointerEnter={(e) => e.pointerType === 'mouse' && pick(c)}
              onClick={() => pick(c)}
              className={`bg-surface-2/70 hover:bg-surface-2 w-[82%] shrink-0 snap-start border-l-2 p-6 transition-colors duration-500 md:w-auto md:p-7 ${
                c.slug === sel
                  ? 'bg-surface-2 border-[var(--color-olive-hi)]'
                  : 'border-[var(--color-olive)] hover:border-[var(--color-olive-hi)]'
              }`}
            >
              <h3 className="text-xl leading-snug text-white md:text-[1.35rem]">{c.name}</h3>
              <p className="text-paper/70 mt-2.5 text-sm leading-relaxed">{c.summary}</p>
              {c.href && (
                <Link
                  href={c.href}
                  className="group text-olive-hi mt-4 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white"
                >
                  Explore {c.name}
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
                  />
                </Link>
              )}
            </li>
          ))}
          {cards.length % 2 === 1 && (
            <li className="flex w-[82%] shrink-0 snap-start md:w-auto">
              <Link
                href="/contact"
                className="group border-line hover:border-olive-hi flex flex-1 flex-col justify-between border p-6 transition-colors duration-500 md:p-7"
              >
                <span>
                  <span className="block text-xl leading-snug text-white md:text-[1.35rem]">
                    Something else in mind?
                  </span>
                  <span className="text-paper/70 mt-2.5 block text-sm leading-relaxed">
                    Tell us what you need and we will shape it with you.
                  </span>
                </span>
                <span className="text-olive-hi mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  Get in touch
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          )}
        </ul>
        {/* Phones: swipe hint */}
        <p
          aria-hidden="true"
          className="text-muted mt-4 text-xs tracking-[0.14em] uppercase md:hidden"
        >
          Swipe for more →
        </p>
      </div>
    </div>
  );
}
