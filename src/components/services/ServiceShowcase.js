'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';

const ROTATE_MS = 4500;

/** "Services included (n)" disclosure: the topic's full item list, opened on request. */
function Included({ items, id }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="text-paper/70 flex items-center gap-2.5 text-xs font-medium tracking-[0.08em] transition-colors duration-300 hover:text-white"
      >
        <span
          aria-hidden="true"
          className={`border-line flex size-5 items-center justify-center rounded-full border transition-transform duration-500 ease-[var(--ease-expo)] ${
            open ? 'rotate-45' : ''
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            className="size-2.5 stroke-current"
            fill="none"
            strokeWidth="1.4"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
        Services included ({items.length})
      </button>
      <ul id={id} hidden={!open} className="border-line mt-4 border-t">
        {items.map((item) => (
          <li key={item} className="border-line text-paper/80 border-b py-2 text-[0.8rem]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A Services block, same composition as Home "What we do": a photo with a label beside a heading
 * and a 2-column grid of service cards. Every card has its own photo.
 *
 * The photo moves through the cards on its own while the block is on screen (desktop and phone
 * alike); the active card's top rule fills as a timer. Pointing at or tapping a card shows its photo
 * straight away. Reduced motion: no automatic change (pointing/tapping still works).
 */
export default function ServiceShowcase({ cards, cta, imageLeft, children }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false); // pointer over the cards: stop the timer
  const [auto, setAuto] = useState(false); // in view and motion allowed
  const frame = useRef(null);

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) return undefined;
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting), { threshold: 0.35 });
    io.observe(frame.current);
    return () => io.disconnect();
  }, []);

  const running = auto && !hold;
  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => setActive((i) => (i + 1) % cards.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [running, active, cards.length]);

  const current = cards[active];

  return (
    <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
      <div className={`md:sticky md:top-36 md:col-span-5 ${imageLeft ? '' : 'md:order-2'}`}>
        <div ref={frame} data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden">
          <div data-wipe className="bg-surface-2 absolute inset-0">
            {cards.map((c, i) => (
              <Image
                key={c.slug}
                src={c.photo.src}
                alt={i === active ? c.photo.alt : ''}
                aria-hidden={i === active ? undefined : true}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                style={c.photo.focus ? { objectPosition: c.photo.focus } : undefined}
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)] ${
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="from-ink/60 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
          <p
            aria-live="polite"
            className="bg-ink/85 text-paper absolute bottom-4 left-4 flex items-center gap-3 border-l-2 border-[var(--color-olive-hi)] px-4 py-2.5 text-xs font-medium tracking-[0.14em] uppercase md:bottom-6 md:left-6"
          >
            <span className="text-olive-hi tabular-nums">{current.number}</span>
            {current.name}
          </p>
        </div>
      </div>

      <div className="min-w-0 md:col-span-7">
        {children}
        <ul
          data-reveal="stagger"
          style={{ '--d': '250ms' }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHold(false)}
          className="bg-line border-line mt-10 grid gap-px border sm:grid-cols-2"
        >
          {cards.map((c, i) => {
            const on = i === active;
            return (
              <li
                key={c.slug}
                id={c.slug}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                onClick={() => setActive(i)}
                className={`relative flex cursor-default flex-col p-6 transition-colors duration-500 md:p-7 ${
                  on ? 'bg-surface-2' : 'bg-ink'
                }`}
              >
                {/* Top rule: fills over the photo's time on screen (static when held/reduced) */}
                <span aria-hidden="true" className="bg-paper/10 absolute inset-x-0 top-0 h-0.5">
                  <span
                    key={on ? `${active}-${running}` : 'off'}
                    className={`bg-olive-hi block h-full origin-left ${
                      on ? (running ? 'service-timer' : 'scale-x-100') : 'scale-x-0'
                    }`}
                    style={{ '--timer': `${ROTATE_MS}ms` }}
                  />
                </span>
                <p className="text-olive-hi font-heading text-xs tracking-[0.2em] tabular-nums">
                  {c.number}
                </p>
                <h3 className="mt-3 text-[1.4rem] leading-tight text-white md:text-2xl">
                  {c.name}
                </h3>
                <p className="text-paper/70 mt-2.5 text-sm leading-relaxed">{c.summary}</p>
                <Included items={c.items} id={`${c.slug}-items`} />
                {c.href && (
                  <Link
                    href={c.href}
                    className="text-olive-hi mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white"
                  >
                    Explore {c.name}
                    <Icon name="arrow" className="size-4" />
                  </Link>
                )}
              </li>
            );
          })}
          {cta && (
            <li className="bg-ink flex">
              <Link
                href="/contact"
                className="group hover:bg-olive/15 flex flex-1 flex-col justify-between p-6 transition-colors duration-500 md:p-7"
              >
                <span>
                  <span className="block text-[1.4rem] leading-tight text-white md:text-2xl">
                    {cta.title}
                  </span>
                  <span className="text-paper/70 mt-2.5 block text-sm leading-relaxed">
                    {cta.text}
                  </span>
                </span>
                <span className="text-olive-hi mt-6 inline-flex items-center gap-2 text-sm font-medium">
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
      </div>
    </div>
  );
}
