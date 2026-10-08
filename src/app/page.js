import ContinueExploring from '@/components/ui/ContinueExploring';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import ClientMarquee from '@/components/home/ClientMarquee';
import Experts from '@/components/home/Experts';
import CaseStudies from '@/components/home/CaseStudies';
import PortfolioMosaic from '@/components/home/PortfolioMosaic';
import Results from '@/components/home/Results';
import Testimonials from '@/components/home/Testimonials';
import ProcessSteps from '@/components/home/ProcessSteps';
import HomeContact from '@/components/home/HomeContact';
import { home } from '@/data/home';
import { site } from '@/data/site';

export const metadata = {
  title: { absolute: 'MAEVEN Productions' },
  description: home.hero.text,
  alternates: { canonical: '/' },
};

/**
 * Home follows GoPackshot's section order, in MAEVEN's design:
 *   video hero + trusted by · stats bar · brands strip · what we do (3 blocks) · case studies ·
 *   portfolio · results · testimonials · how we work (5 steps) · contact · continue exploring.
 * All content lives in data/home.js; placeholders are marked ph('...').
 */
export default function HomePage() {
  return (
    <>
      <Hero hero={home.hero} />
      <StatsBar stats={home.stats} />
      <ClientMarquee eyebrow={home.partners.eyebrow} />
      <Experts experts={home.experts} tone="ink" />
      <CaseStudies cases={home.cases} />
      <PortfolioMosaic portfolio={home.portfolio} />
      <Results results={home.results} tone="surface" />
      <Testimonials testimonials={home.testimonials} />
      <ProcessSteps process={home.process} tone="ink" />
      <HomeContact data={home.contact} tone="surface" />
      <ContinueExploring
        tone="ink"
        items={[
          {
            title: 'Services',
            text: 'Content & Production, Smart Tech, and Creative & Brand.',
            href: '/services',
            cta: 'View services',
          },
          {
            title: 'About',
            text: `Who ${site.shortName} is and how we work.`,
            href: '/about',
            cta: 'About us',
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
