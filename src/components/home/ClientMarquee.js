/* eslint-disable @next/next/no-img-element */
import Eyebrow from '@/components/ui/Eyebrow';
import { clients } from '@/data/clients';

/**
 * Slowly moving strip of the brands MAEVEN works with (GoPackshot's partner-logo strip). Shows a
 * client's logo when `logo` is set in data/clients.js, otherwise its name as a wordmark.
 * The set is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
 * Pauses on hover; stops with reduced motion (then wraps as a static list).
 */
export default function ClientMarquee({ eyebrow, atmos }) {
  const Item = ({ c }) => (
    <li className="flex shrink-0 items-center px-8 md:px-12">
      {c.logo ? (
        <img src={c.logo} alt={c.name} className="h-7 w-auto opacity-70 grayscale md:h-8" />
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
