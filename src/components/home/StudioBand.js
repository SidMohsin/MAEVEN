import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';
import SplitText from '@/components/ui/SplitText';

/**
 * Studio: a full-width editorial image at its own proportions, with the production process laid
 * over its lower edge as an information graphic: a hairline draws across and the stages pop in one
 * after another (the MAEVEN take on GoPackshot's informational pop-outs). On phones, where the
 * image is short, the process sits directly below it. Then a heading and two source paragraphs.
 *
 * The stages come from the service data (Video & Film: "pre-production through post-production").
 */
function Process({ steps, overlay }) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        data-reveal="draw"
        style={{ '--d': '350ms' }}
        className={`absolute inset-x-0 top-0 h-px ${overlay ? 'bg-paper/40' : 'bg-line'}`}
      />
      <ol data-reveal="stagger" style={{ '--d': '550ms' }} className="grid grid-cols-3">
        {steps.map((step, i) => (
          <li key={step} className="relative pt-4 pr-2 md:pt-5">
            <span
              aria-hidden="true"
              className="bg-olive-hi absolute top-0 left-0 size-2 -translate-y-1/2 rounded-full"
            />
            <span className="text-olive-hi block text-[0.6rem] tracking-[0.2em] tabular-nums md:text-xs">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`font-heading mt-1 block text-sm md:mt-2 md:text-2xl ${
                overlay ? 'text-white' : 'text-paper'
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function StudioBand({ studio, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="relative">
        <MediaImage
          id={studio.image}
          need="Studio image"
          aspect="natural"
          fallbackRatio={2.5}
          sizes="(min-width: 1280px) 1184px, 100vw"
          reveal="wipe"
        />
        {/* Desktop: process over the image's lower edge */}
        <div className="from-ink/90 via-ink/40 pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t to-transparent px-8 pt-24 pb-7 md:block lg:px-10 lg:pb-9">
          <Process steps={studio.process} overlay />
        </div>
      </div>
      {/* Phones: process below the image */}
      <div className="mt-8 md:hidden">
        <Process steps={studio.process} />
      </div>

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-6">
          <div data-reveal="up">
            <Eyebrow>The studio</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl leading-[1.05] md:text-6xl">
            {studio.title}
          </SplitText>
        </div>
        <div
          className="text-paper/80 space-y-5 text-base leading-relaxed md:col-span-5 md:col-start-8 md:self-end"
          data-reveal="up"
          style={{ '--d': '160ms' }}
        >
          {studio.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
