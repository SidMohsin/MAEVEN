import ContinueExploring from '@/components/ui/ContinueExploring';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import ClientMarquee from '@/components/home/ClientMarquee';
import Experts from '@/components/home/Experts';
import PortfolioMosaic from '@/components/home/PortfolioMosaic';
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
 *   video hero · stats bar · brand logos · what we do (3 blocks) · portfolio · process (6 steps,
 *   wording from thestudiox.pl) · contact · continue exploring.
 * (Case studies, results and testimonials were removed at the client's request.)
 * All content lives in data/home.js; placeholders are marked ph('...').
 */
export default function HomePage() {
  return (
    <>
      <Hero hero={home.hero} />
      <StatsBar stats={home.stats} tone="olive" />
      <ClientMarquee eyebrow={home.partners.eyebrow} atmos={1} />
      <Experts experts={home.experts} tone="ink" atmos={2} />
      <PortfolioMosaic portfolio={home.portfolio} />
      <ProcessSteps process={home.process} tone="light" />
      <HomeContact data={home.contact} tone="ink" atmos={2} />
      <ContinueExploring
        tone="light"
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
