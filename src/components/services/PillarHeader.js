import MediaImage from '@/components/ui/MediaImage';
import Placeholder from '@/components/ui/Placeholder';

/**
 * Opening "chapter" band for a pillar. Each of the three uses a different composition so the page
 * reads as three distinct chapters, not one repeated block:
 *   full  : title left, intro right, wide banner beneath        (01)
 *   bleed : edge-to-edge banner first, title and intro below    (02)
 *   split : tall image left, title and intro right              (03)
 */
const VARIANTS = ['full', 'bleed', 'split'];

function Numeral({ children }) {
  return (
    <p
      aria-hidden="true"
      data-reveal="up"
      className="text-stroke font-heading text-[6.5rem] leading-[0.8] md:text-[11rem]"
    >
      {children}
    </p>
  );
}

function Title({ pillar, total }) {
  return (
    <div>
      <p
        data-reveal="up"
        className="text-muted mb-6 flex items-center gap-4 text-xs tracking-[0.22em] uppercase"
      >
        <span className="text-olive-hi">Pillar</span>
        <span aria-hidden="true" className="bg-line h-px w-10" />
        {pillar.number} / {total}
      </p>
      <Numeral>{pillar.number}</Numeral>
      <h2
        id={`${pillar.slug}-title`}
        data-reveal="up"
        style={{ '--d': '200ms' }}
        className="mt-5 text-4xl tracking-wide uppercase md:mt-7 md:text-6xl"
      >
        {pillar.name}
      </h2>
    </div>
  );
}

function Intro({ pillar }) {
  return (
    <div data-reveal="up" style={{ '--d': '320ms' }}>
      {pillar.intro ? (
        <p className="text-paper/80 text-base leading-relaxed">{pillar.intro}</p>
      ) : (
        <Placeholder block label={`${pillar.name} introduction`} />
      )}
    </div>
  );
}

function Divider() {
  // Plain hairline. (No olive segment: it read as a second underline beneath the pillar bar.)
  return (
    <div className="container-page">
      <div className="bg-line h-px" />
    </div>
  );
}

export default function PillarHeader({ pillar, index, total, tone }) {
  const variant = VARIANTS[index % VARIANTS.length];
  const bg = tone === 'surface' ? 'bg-surface' : 'bg-ink';
  const totalLabel = String(total).padStart(2, '0');
  const need = `${pillar.name} banner`;

  return (
    <section id={pillar.slug} aria-labelledby={`${pillar.slug}-title`} className={bg}>
      {variant === 'full' && (
        <>
          <Divider />
          <div className="container-page pt-16 pb-16 md:pt-28 md:pb-24">
            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
              <div className="md:col-span-7">
                <Title pillar={pillar} total={totalLabel} />
              </div>
              <div className="md:col-span-5">
                <Intro pillar={pillar} />
              </div>
            </div>
            <MediaImage
              id={pillar.banner}
              need={need}
              mark={pillar.number}
              aspect="aspect-[16/10] md:aspect-[5/2]"
              sizes="(min-width: 1280px) 1184px, 100vw"
              className="mt-12 md:mt-16"
              position="object-[12%_50%] md:object-center"
              reveal="fade"
              delay={120}
            />
          </div>
        </>
      )}

      {variant === 'bleed' && (
        <>
          <MediaImage
            id={pillar.banner}
            need={need}
            mark={pillar.number}
            aspect="aspect-[16/10] md:aspect-[21/9]"
            sizes="100vw"
            reveal="fade"
          />
          <div className="container-page pt-14 pb-16 md:pt-24 md:pb-28">
            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
              <div className="md:col-span-7">
                <Title pillar={pillar} total={totalLabel} />
              </div>
              <div className="md:col-span-5">
                <Intro pillar={pillar} />
              </div>
            </div>
          </div>
        </>
      )}

      {variant === 'split' && (
        <>
          <Divider />
          <div className="container-page pt-16 pb-16 md:pt-28 md:pb-28">
            <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
              <div className="md:col-span-5">
                <MediaImage
                  id={pillar.banner}
                  need={need}
                  mark={pillar.number}
                  aspect="aspect-[4/3] md:aspect-[4/5]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  reveal="left"
                />
              </div>
              <div className="space-y-10 md:col-span-7">
                <Title pillar={pillar} total={totalLabel} />
                <div className="max-w-xl">
                  <Intro pillar={pillar} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
