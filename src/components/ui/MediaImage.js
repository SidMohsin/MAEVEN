import Image from 'next/image';
import { getAsset } from '@/data/assets';
import { isVisible } from '@/lib/assets';

/**
 * Renders a curated asset by id inside a fixed-aspect frame.
 *  - approved asset           -> the image
 *  - no approved asset        -> labelled "asset required" placeholder (e.g. topics with no photo yet)
 *
 * `aspect`  Tailwind aspect class, e.g. "aspect-[4/5]", or "natural" to use the asset's own
 *           proportions (no cropping at any screen size). Placeholders in natural mode use
 *           `fallbackRatio` (width / height).
 * `sizes`   feeds next/image srcset.
 * `reveal`  optional scroll reveal: 'wipe' | 'up' | 'left' | 'right' | 'fade' (globals.css). `delay` in ms.
 * `caption` optional { label, text }: an information overlay that rises in on hover (always shown
 *           on touch screens, which have no hover).
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
  fallbackRatio = 4 / 5,
  caption,
}) {
  const asset = id ? getAsset(id) : null;
  const visible = isVisible(asset);
  const natural = aspect === 'natural';
  const ratio = natural ? (asset ? asset.width / asset.height : fallbackRatio) : null;
  const frameClass = natural ? '' : aspect;
  const frameStyle = {
    ...(natural ? { aspectRatio: String(ratio) } : {}),
    ...(reveal ? { '--d': `${delay}ms` } : {}),
  };
  // Placeholders never get the image wipe (nothing real to reveal): they simply fade in.
  const motion = reveal ? { 'data-reveal': !visible && reveal === 'wipe' ? 'fade' : reveal } : {};

  if (visible) {
    return (
      <div
        className={`group/media relative overflow-hidden ${frameClass} ${className}`}
        style={frameStyle}
        {...motion}
      >
        <div data-wipe className="bg-surface-2 absolute inset-0">
          <div data-reveal-scale className="absolute inset-0">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes={sizes}
              // priority="eager": load immediately but without a preload hint (React adds a
              // preload for fetchPriority="high", which warns when the image is in a hidden layout)
              priority={priority === true}
              {...(priority === 'eager' ? { loading: 'eager' } : {})}
              style={asset.focus ? { objectPosition: asset.focus } : undefined}
              className={`object-cover ${position} transition-transform duration-[1200ms] ease-[var(--ease-expo)] [@media(hover:hover)]:group-hover/media:scale-[1.05]`}
            />
          </div>
          {caption && <MediaCaption {...caption} />}
        </div>
      </div>
    );
  }

  const status = 'Asset required';
  return (
    <div
      role="img"
      aria-label={`${need}: ${status.toLowerCase()}`}
      className={`from-surface-2 to-ink relative isolate overflow-hidden bg-gradient-to-br ${frameClass} ${className}`}
      style={frameStyle}
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

/** Hover information overlay: dark gradient + small label that rises into view. */
export function MediaCaption({ label, text }) {
  return (
    <div className="from-ink/95 via-ink/55 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-16 pb-4 transition-all duration-700 ease-[var(--ease-expo)] md:px-5 md:pb-5 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/media:translate-y-0 [@media(hover:hover)]:group-hover/media:opacity-100">
      {label && (
        <p className="text-olive-hi flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.2em] uppercase">
          <span aria-hidden="true" className="bg-olive-hi h-px w-4" />
          {label}
        </p>
      )}
      {text && <p className="mt-1.5 text-sm text-white">{text}</p>}
    </div>
  );
}
