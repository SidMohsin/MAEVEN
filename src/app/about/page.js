import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import JustifiedRows from '@/components/ui/JustifiedRows';
import MediaImage from '@/components/ui/MediaImage';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';
import ContinueExploring from '@/components/ui/ContinueExploring';
import StatsBar from '@/components/home/StatsBar';
import ClientMarquee from '@/components/home/ClientMarquee';
import { about } from '@/data/about';
import { getAsset } from '@/data/assets';
import { isVisible } from '@/lib/assets';

export const metadata = {
  title: 'About',
  description: about.hero.text,
  alternates: { canonical: '/about' },
};

/**
 * About follows GoPackshot's About order, in MAEVEN's design: statement hero > visuals > numbers >
 * who we are > founder note > what sets us apart > brands > continue exploring.
 * Content lives in data/about.js; placeholders are marked ph('...').
 */
export default function AboutPage() {
  const [wide, square] = about.images;

  return (
    <>
      {/* Hero: small label, statement headline, one line (centred, like GoPackshot's About) */}
      <Section atmos={3} className="!pt-24 !pb-16 text-center md:!pt-36 md:!pb-24">
        <div className="rise flex justify-center">
          <Eyebrow>About</Eyebrow>
        </div>
        <h1
          className="rise mx-auto mt-8 max-w-5xl text-[2.6rem] leading-[1.04] min-[420px]:text-5xl md:text-7xl lg:text-[6.25rem] lg:leading-[1]"
          style={{ '--d': '90ms' }}
        >
          {about.hero.title.map((line, i) => (
            <span key={line} className={`block ${i === 1 ? 'text-olive-hi' : ''}`}>
              {line}
            </span>
          ))}
        </h1>
        <p
          className="rise text-paper/75 mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ '--d': '220ms' }}
        >
          {about.hero.text}
        </p>
      </Section>

      {/* Visuals: true proportions at every size (one row on desktop, stacked on phones) */}
      <Section className="!pt-0 !pb-16 md:!pb-24">
        <JustifiedRows
          need="Studio image"
          rows={[[wide, square]]}
          mobileRows={[[wide], [square]]}
        />
      </Section>

      <StatsBar stats={about.stats} tone="olive" />

      {/* Who we are (client wording) */}
      <Section tone="ink" atmos={1} className="md:!py-32">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3" data-reveal="up">
            <Eyebrow>{about.mission.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <p
              data-reveal="up"
              style={{ '--d': '100ms' }}
              className="font-heading text-[2rem] leading-[1.14] text-white md:text-5xl md:leading-[1.12]"
            >
              {about.mission.lead}
            </p>
            <div
              className="text-paper/80 mt-10 grid max-w-3xl gap-6 text-base leading-relaxed md:grid-cols-2"
              data-reveal="up"
              style={{ '--d': '200ms' }}
            >
              <p>{about.mission.text}</p>
              <p>{about.mission.story}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Founder note */}
      <Section tone="light" className="md:!py-32">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <MediaImage
              id={about.quote.image}
              need="Founder portrait"
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
              reveal="wipe"
            />
          </div>
          <figure className="md:col-span-7">
            <div data-reveal="up" className="flex items-center gap-4">
              <Icon name="quote" className="text-olive-hi size-9" />
              <Eyebrow>{about.quote.eyebrow}</Eyebrow>
            </div>
            <blockquote
              data-reveal="up"
              style={{ '--d': '150ms' }}
              className="font-heading mt-7 space-y-5 text-2xl leading-[1.3] text-white md:text-[1.85rem]"
            >
              {about.quote.text.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </blockquote>
            <figcaption data-reveal="up" style={{ '--d': '300ms' }} className="mt-8">
              <span className="block text-white">
                <T v={about.quote.name} />
              </span>
              <span className="text-muted mt-1 block text-sm">
                <T v={about.quote.role} />
              </span>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* What sets us apart (client wording) */}
      <Section tone="olive" className="md:!py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div data-reveal="up" className="md:col-span-6">
            <Eyebrow>Why MAEVEN</Eyebrow>
            <h2 className="mt-6 text-5xl md:text-7xl">What sets us apart</h2>
          </div>
          <div data-reveal="up" style={{ '--d': '150ms' }} className="md:col-span-6">
            <p className="font-heading text-2xl leading-snug text-white">{about.apart.lead}</p>
            <p className="text-paper/75 mt-4 text-base leading-relaxed">{about.apart.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {about.apart.tagline.map((t) => (
                <li
                  key={t}
                  className="border-line text-paper/85 rounded-full border px-3.5 py-1.5 text-xs tracking-[0.12em] uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ol className="mt-14 grid gap-x-10 md:mt-20 md:grid-cols-3">
          {about.principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal="up"
              style={{ '--d': `${i * 110}ms` }}
              className="border-line border-t py-8 md:py-10"
            >
              <span
                aria-hidden="true"
                className="text-stroke font-heading block text-6xl leading-none md:text-7xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-2xl md:text-3xl">{p.title}</h3>
              <p className="text-paper/75 mt-4 max-w-sm text-base leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClientMarquee eyebrow={about.partners.eyebrow} atmos={1} />

      <ContinueExploring
        tone="light"
        items={[
          {
            title: 'Services',
            text: 'The three pillars and everything within them.',
            href: '/services',
            cta: 'View services',
          },
          {
            title: 'Contact',
            text: 'Tell us about your project.',
            href: '/contact',
            cta: 'Get in touch',
          },
        ]}
      />
    </>
  );
}
