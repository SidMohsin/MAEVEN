import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';
import HeroVideo from '@/components/home/HeroVideo';
import { clients } from '@/data/clients';

/**
 * First screen (GoPackshot structure): full-bleed video, headline with an accent line, one line of
 * copy, calls to action, and a "Trusted by" row of client names along the bottom.
 */
export default function Hero({ hero }) {
  const [line1, line2] = hero.title;
  const trusted = clients.slice(0, hero.trustedCount);
  return (
    <section className="relative isolate -mt-[4.25rem] flex min-h-svh flex-col justify-end overflow-hidden">
      <HeroVideo video={hero.video} />

      <div className="container-page pt-56 pb-10 md:pt-60 md:pb-14">
        <div className="rise">
          <Eyebrow light>Production studio</Eyebrow>
        </div>
        <SplitText
          as="h1"
          play
          delay={120}
          className="mt-6 max-w-5xl text-[2.9rem] leading-[1.06] min-[420px]:text-[3.3rem] md:text-7xl lg:text-[6.5rem] lg:leading-[1.06]"
        >
          {line1} <span className="text-olive-hi">{line2}</span>
        </SplitText>
        <div className="mt-7 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="rise text-paper/85 max-w-lg text-lg md:text-xl" style={{ '--d': '420ms' }}>
            {hero.text}
          </p>
          <div className="rise flex flex-wrap gap-3" style={{ '--d': '560ms' }}>
            <Button href="/services" arrow className="!px-7 !py-4">
              Explore services
            </Button>
            <Button href="/contact" variant="outline" className="!px-7 !py-4">
              Get in touch
            </Button>
          </div>
        </div>

        <div
          className="rise border-paper/15 mt-10 border-t pt-5 md:mt-14 md:flex md:items-center md:gap-8 md:pt-6"
          style={{ '--d': '700ms' }}
        >
          <span className="text-paper/55 block text-[0.65rem] tracking-[0.24em] uppercase">
            {hero.trustedLabel}
          </span>
          {/* Phones: one gently moving line (a wrapped list of names reads as clutter). */}
          <div className="marquee mt-3 overflow-hidden md:hidden">
            <div className="marquee-track [--marquee-dur:28s]">
              {[false, true].map((copy) => (
                <ul key={String(copy)} className="flex shrink-0" aria-hidden={copy || undefined}>
                  {trusted.map((c) => (
                    <li
                      key={c.name}
                      className="font-heading text-paper/80 shrink-0 pr-8 text-base tracking-wide whitespace-nowrap uppercase"
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <ul className="hidden flex-wrap items-center gap-x-8 gap-y-3 md:flex">
            {trusted.map((c) => (
              <li
                key={c.name}
                className="font-heading text-paper/80 text-lg tracking-wide uppercase"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
