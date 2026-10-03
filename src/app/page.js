import ContinueExploring from '@/components/ui/ContinueExploring';
import Hero from '@/components/home/Hero';
import IntroBand from '@/components/home/IntroBand';
import StudioBand from '@/components/home/StudioBand';
import ServicesPreview from '@/components/home/ServicesPreview';
import WorkMosaic from '@/components/home/WorkMosaic';
import ApproachBand from '@/components/home/ApproachBand';
import HomeCta from '@/components/home/HomeCta';
import { home } from '@/data/home';
import { getPillars } from '@/lib/services';

export const metadata = {
  title: { absolute: 'MAEVEN Productions' },
  description:
    'Content & Production, Smart Tech, and Creative & Brand services from MAEVEN Productions.',
  alternates: { canonical: '/' },
};

/**
 * Home introduces the studio and leads to Services or Contact. The Services page owns the full
 * catalogue, so the pillars appear on Home exactly once (ServicesPreview).
 *
 *   Hero (image, video-ready) .......... headline, one line, two CTAs
 *   Intro .............. ink ........... positioning statement
 *   Studio ............. surface ....... how the studio works (image + text)
 *   Services preview ... paper ......... the three pillars, once
 *   Production ......... ink ........... image mosaic
 *   How we work ........ surface ....... generic four-step workflow
 *   CTA ................ ink
 *   Continue exploring . surface
 *   Footer
 */
export default function HomePage() {
  return (
    <>
      <Hero hero={home.hero} />
      <IntroBand intro={home.intro} tone="ink" />
      <StudioBand studio={home.studio} tone="surface" />
      <ServicesPreview pillars={getPillars()} show={home.servicesPreview.topics} tone="paper" />
      <WorkMosaic items={home.work.items} tone="ink" />
      <ApproachBand steps={home.approach} tone="surface" />
      <HomeCta tone="ink" />
      <ContinueExploring
        tone="surface"
        variant="editorial"
        items={[
          {
            title: 'Services',
            text: 'The three pillars and everything within them.',
            href: '/services',
            cta: 'View services',
          },
          {
            title: 'About',
            text: 'Who MAEVEN is and how we work.',
            href: '/about',
            cta: 'About MAEVEN',
          },
          {
            title: 'Contact',
            text: 'Send an inquiry to the team.',
            href: '/contact',
            cta: 'Contact us',
          },
        ]}
      />
    </>
  );
}
