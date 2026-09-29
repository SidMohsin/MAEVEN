import Image from 'next/image';
import { getAsset } from '@/data/assets';
import { isVisible } from '@/lib/assets';

/**
 * Renders a curated asset by id inside a fixed-aspect frame.
 *  - cleared asset            -> the image
 *  - uncleared asset          -> labelled placeholder (unless NEXT_PUBLIC_SHOW_PENDING_ASSETS=1, local preview)
 *  - no asset (id is null)    -> labelled "asset required" placeholder
 *
 * `aspect`  Tailwind aspect class, e.g. "aspect-[4/5]".
 * `sizes`   feeds next/image srcset.
 * `reveal`  optional scroll reveal: 'left' | 'right' | 'up' | 'fade' (see globals.css). `delay` is in ms.
 * `position` object-position class for cropping, e.g. 'object-left'. An asset's own `focus`
 *           (set in the curation script) takes precedence.
 * `mark`    optional large outlined numeral shown on placeholders (e.g. "01.02").
 */
export default function MediaImage({
  id,
  need = 'Image',
  aspect = 'aspect-[4/5]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className = '',
  reveal,
  delay = 0,
  mark,
  position = 'object-center',
}) {
  const asset = id ? getAsset(id) : null;
  const visible = isVisible(asset);
  const motion = reveal ? { 'data-reveal': reveal, style: { '--d': `${delay}ms` } } : {};

  if (visible) {
    return (
      <div className={`bg-surface-2 relative overflow-hidden ${aspect} ${className}`} {...motion}>
        <div data-reveal-scale className="absolute inset-0">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            style={asset.focus ? { objectPosition: asset.focus } : undefined}
            className={`object-cover ${position} transition-transform duration-[900ms] ease-out md:hover:scale-[1.03]`}
          />
        </div>
      </div>
    );
  }

  const status = asset ? 'Permission pending' : 'Asset required';
  return (
    <div
      role="img"
      aria-label={`${need}: ${status.toLowerCase()}`}
      className={`from-surface-2 to-ink relative isolate overflow-hidden bg-gradient-to-br ${aspect} ${className}`}
      {...motion}
    >
      {/* Inset hairline frame with olive corner ticks */}
      <span aria-hidden="true" className="border-line absolute inset-3 border" />
      <span
        aria-hidden="true"
        className="border-olive absolute top-3 left-3 size-3 border-t border-l"
      />
      <span
        aria-hidden="true"
        className="border-olive absolute top-3 right-3 size-3 border-t border-r"
      />
      <span
        aria-hidden="true"
        className="border-olive absolute bottom-3 left-3 size-3 border-b border-l"
      />
      <span
        aria-hidden="true"
        className="border-olive absolute right-3 bottom-3 size-3 border-r border-b"
      />

      <span className="text-muted absolute top-6 left-6 max-w-[70%] text-[0.65rem] tracking-[0.22em] uppercase">
        {need}
      </span>
      {mark && (
        <span
          aria-hidden="true"
          className="text-stroke-faint font-heading absolute right-6 bottom-9 text-6xl leading-none md:text-7xl"
        >
          {mark}
        </span>
      )}
      <span className="text-olive-hi absolute bottom-6 left-6 text-[0.65rem] tracking-[0.22em] uppercase">
        {status}
      </span>
    </div>
  );
}
