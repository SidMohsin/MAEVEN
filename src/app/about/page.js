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

/** Team card photo: the real portrait when supplied, otherwise a quiet silhouette frame. */
function MemberPhoto({ id, name }) {
  if (isVisible(id ? getAsset(id) : null)) {
    return (
      <MediaImage id={id} need={name} aspect="aspect-[4/5]" sizes="(min-width: 768px) 25vw, 50vw" />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="from-surface-2 to-ink border-line flex aspect-[4/5] items-end justify-center overflow-hidden border bg-gradient-to-b"
    >
      <svg viewBox="0 0 100 100" className="text-line w-3/4" fill="currentColor">
        <circle cx="50" cy="38" r="18" />
        <path d="M14 100c0-22 16-36 36-36s36 14 36 36z" />
      </svg>
    </div>
  );
}

/**
 * About follows GoPackshot's About order, in MAEVEN's design: statement hero > visuals > numbers >
 * mission > team > founder quote > what sets us apart > brands > continue exploring.
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
          priority
        />
      </Section>

      <StatsBar stats={about.stats} tone="olive" />

      {/* Mission (real wording from MAEVEN's own designs) */}
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
              <p>
                <T v={about.mission.story} />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section tone="light" className="md:!py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div data-reveal="up" className="flex justify-center">
            <Eyebrow>{about.team.eyebrow}</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
            {about.team.title}
          </SplitText>
        </div>
        <ul
          data-reveal="stagger"
          style={{ '--d': '150ms' }}
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-20 md:grid-cols-4 md:gap-x-6"
        >
          {about.team.members.map((m) => (
            <li key={m.id}>
              <MemberPhoto id={m.photo} name={m.name.text ?? m.name} />
              <p className="mt-4 text-lg text-white">
                <T v={m.name} />
              </p>
              <p className="text-muted mt-1 text-sm">
                <T v={m.role} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Founder quote */}
      <Section tone="ink" atmos={2} className="md:!py-32">
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
            <Icon name="quote" className="text-olive-hi size-10" />
            <blockquote
              data-reveal="up"
              style={{ '--d': '150ms' }}
              className="font-heading mt-6 text-3xl leading-[1.2] text-white md:text-4xl"
            >
              <T v={about.quote.text} />
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

      {/* What sets us apart */}
      <Section tone="light" className="md:!py-32">
        <div data-reveal="up">
          <Eyebrow>Why MAEVEN</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-5xl md:text-7xl">What sets us apart</h2>
        </div>
        <ol className="mt-14 grid gap-x-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
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
