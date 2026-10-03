import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';
import HeroMedia from '@/components/home/HeroMedia';
import { getAsset } from '@/data/assets';

/**
 * First screen: full-viewport moving visual (video when supplied, otherwise a crossfade of real
 * stills), headline rising word by word from behind a mask, one positioning line, two calls to
 * action, and an information card showing what is on screen (see HeroMedia).
 */
export default function Hero({ hero }) {
  const slides = (hero.slides ?? [{ id: hero.image }])
    .map((s) => ({ ...s, asset: getAsset(s.id) }))
    .filter((s) => s.asset);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.25rem)] flex-col justify-end overflow-hidden">
      <HeroMedia slides={slides} video={hero.video} />

      <div className="container-page pt-24 pb-14 md:pb-24">
        <div className="rise">
          <Eyebrow light>Production studio</Eyebrow>
        </div>
        <SplitText
          as="h1"
          play
          delay={120}
          className="mt-6 max-w-6xl text-[3.4rem] leading-[0.98] min-[420px]:text-6xl md:text-8xl lg:text-[9rem] lg:leading-[0.92]"
        >
          {hero.title}
        </SplitText>
        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="rise text-paper/85 max-w-md text-lg md:text-xl" style={{ '--d': '420ms' }}>
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
      </div>
    </section>
  );
}
