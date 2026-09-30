import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import JustifiedRows from '@/components/ui/JustifiedRows';
import Placeholder from '@/components/ui/Placeholder';
import ContinueExploring from '@/components/ui/ContinueExploring';
import { about } from '@/data/about';

export const metadata = {
  title: 'About',
  description: about.hero.text,
  alternates: { canonical: '/about' },
};

/**
 * About follows GoPackshot's About rhythm: statement hero > visuals > story > what sets us apart >
 * continue exploring. Each section has one job; the service pillars are not repeated here (Home,
 * Services and the footer already carry them), and there is no separate CTA band because
 * Continue exploring already leads to Contact.
 */
export default function AboutPage() {
  const [wide, square] = about.images;

  return (
    <>
      {/* Hero: small label, statement headline, one line (centred, like GoPackshot's About) */}
      <Section className="!pt-24 !pb-16 text-center md:!pt-36 md:!pb-24">
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
      <Section className="!pt-0 !pb-20 md:!pb-28">
        <JustifiedRows
          need="Studio image"
          rows={[[wide, square]]}
          mobileRows={[[wide], [square]]}
          priority
        />
      </Section>

      {/* Our story */}
      <Section tone="surface" className="md:!py-32">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3" data-reveal="up">
            <Eyebrow>Our story</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <p
              data-reveal="up"
              style={{ '--d': '100ms' }}
              className="font-heading text-[2rem] leading-[1.14] text-white md:text-5xl md:leading-[1.12]"
            >
              {about.story.lead}
            </p>
            <div className="mt-12 max-w-2xl" data-reveal="up" style={{ '--d': '200ms' }}>
              {about.story.body ? (
                <p className="text-paper/80 text-base leading-relaxed">{about.story.body}</p>
              ) : (
                <Placeholder block label="Company story: founding, team and studio" />
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* What sets us apart */}
      <Section tone="ink" className="md:!py-32">
        <div data-reveal="up">
          <Eyebrow>Why MAEVEN</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-5xl md:text-7xl">What sets the work apart</h2>
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
              <h3 className="mt-8 text-3xl md:text-4xl">{p.title}</h3>
              <p className="text-paper/75 mt-4 max-w-sm text-base leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ContinueExploring
        tone="surface"
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
