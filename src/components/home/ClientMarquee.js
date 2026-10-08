import Eyebrow from '@/components/ui/Eyebrow';
import { clients } from '@/data/clients';

/**
 * Slowly moving strip of the brands MAEVEN works with (GoPackshot's partner-logo strip). Shows a
 * client's logo when `logo` is set in data/clients.js, otherwise its name as a wordmark.
 * The set is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
 * Pauses on hover; stops with reduced motion (then wraps as a static list).
 */
export default function ClientMarquee({ eyebrow, atmos }) {
  // Optical sizing: wide wordmarks get less height, compact/stacked logos more, so all read evenly.
  const logoHeight = (c) => Math.round(Math.min(46, Math.max(20, 62 * Math.pow(c.w / c.h, -0.42))));
  const Item = ({ c }) => (
    <li className="flex shrink-0 items-center px-7 md:px-11">
      {c.logo ? (
        // Drawn as a background image (role="img"): logos load with the page's CSS and never get a
        // preload hint on other pages through route prefetching.
        <span
          role="img"
          aria-label={c.name}
          style={{
            height: logoHeight(c),
            aspectRatio: `${c.w} / ${c.h}`,
            backgroundImage: `url(${c.logo})`,
          }}
          className="block bg-contain bg-center bg-no-repeat opacity-60 transition-opacity duration-300 hover:opacity-100"
        />
      ) : (
        <span className="font-heading text-paper/60 hover:text-paper text-lg tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300 md:text-xl">
          {c.name}
        </span>
      )}
    </li>
  );
  return (
    <section
      aria-label={eyebrow}
      className={`bg-ink py-10 md:py-14 ${atmos ? `atmos atmos-${atmos}` : ''}`}
    >
      <div className="container-page flex justify-center">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <div className="marquee mt-8 overflow-hidden">
        <div className="marquee-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} className="flex shrink-0" aria-hidden={copy || undefined}>
              {clients.map((c) => (
                <Item key={c.name} c={c} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
