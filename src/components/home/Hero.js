import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';
import HeroVideo from '@/components/home/HeroVideo';

/**
 * First screen (GoPackshot structure): full-bleed video, headline with an accent line, one line of
 * copy and calls to action. (Client brands appear in the logo strip below the numbers.)
 */
export default function Hero({ hero }) {
  const [line1, line2] = hero.title;
  return (
    <section className="relative isolate -mt-[4.25rem] flex min-h-svh flex-col justify-end overflow-hidden">
      <HeroVideo video={hero.video} />

      {/* pt reserves room for the video info card, so text never runs under it on short screens */}
      <div className="container-page pt-56 pb-12 md:pt-60 md:pb-16">
        <SplitText
          as="h1"
          play
          delay={120}
          className="max-w-6xl text-[2.25rem] leading-[1.08] min-[420px]:text-[2.6rem] md:text-6xl lg:text-[4.6rem] lg:leading-[1.06]"
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
      </div>
    </section>
  );
}
