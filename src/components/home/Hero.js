import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import HeroMedia from '@/components/home/HeroMedia';
import { getAsset } from '@/data/assets';

/**
 * First screen: full-viewport visual (video-ready, poster fallback), a large headline anchored to
 * the bottom, one positioning line and two calls to action. Deliberately no service list here.
 */
export default function Hero({ hero }) {
  const asset = hero.image ? getAsset(hero.image) : null;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.25rem)] flex-col justify-end overflow-hidden">
      <HeroMedia asset={asset} video={hero.video} />

      <div className="container-page pt-24 pb-14 md:pb-24">
        <div className="rise">
          <Eyebrow light>Production studio</Eyebrow>
        </div>
        <h1
          className="rise mt-6 max-w-6xl text-[3.4rem] leading-[0.98] min-[420px]:text-6xl md:text-8xl lg:text-[9rem] lg:leading-[0.92]"
          style={{ '--d': '100ms' }}
        >
          {hero.title}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="rise text-paper/85 max-w-md text-lg md:text-xl" style={{ '--d': '220ms' }}>
            {hero.text}
          </p>
          <div className="rise flex flex-wrap gap-3" style={{ '--d': '340ms' }}>
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
