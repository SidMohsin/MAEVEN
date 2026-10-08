import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import T from '@/components/ui/T';
import ContinueExploring from '@/components/ui/ContinueExploring';
import ContactForm from '@/components/contact/ContactForm';
import { contact } from '@/data/site';
import { getPillars } from '@/lib/services';

export const metadata = {
  title: 'Contact',
  description: 'Start a project with MAEVEN Productions.',
  alternates: { canonical: '/contact' },
};

// draft: a generic outline of what happens after an inquiry. No response-time or pricing claims.
const steps = [
  { title: 'Your inquiry', text: 'Tell us what you need and roughly when.' },
  { title: 'A conversation', text: 'We follow up to understand the scope in detail.' },
  { title: 'Next steps', text: 'An outline of how the project could run.' },
];

const details = [
  { label: 'Email', value: contact.email },
  { label: 'Phone', value: contact.phone },
  { label: 'Studio', value: contact.address },
  { label: 'Hours', value: { text: 'Mon–Fri, 09:00–17:00', placeholder: true } },
];

/**
 * Contact flow (GoPackshot's Contact rhythm; no booking calendar):
 *   Hero + what to expect .... ink
 *   Form + contact details ... surface
 *   Not ready yet? ........... ink
 */
export default function ContactPage() {
  return (
    <>
      <Section className="!pt-20 !pb-14 md:!pt-28 md:!pb-20">
        <div className="rise">
          <Eyebrow>Contact</Eyebrow>
        </div>
        <h1
          className="rise mt-6 max-w-5xl text-6xl leading-[0.98] md:text-8xl lg:text-[8.5rem] lg:leading-[0.95]"
          style={{ '--d': '90ms' }}
        >
          Let’s work together
        </h1>
        <p className="rise text-muted mt-6 max-w-xl text-lg" style={{ '--d': '200ms' }}>
          Tell us about your project, and we’ll take it from there.
        </p>

        <ol
          className="rise border-line mt-16 grid border-t md:mt-24 md:grid-cols-3"
          style={{ '--d': '300ms' }}
        >
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`border-line border-b py-6 md:border-b-0 md:py-8 ${
                i > 0 ? 'md:border-l md:pl-8' : 'md:pr-8'
              }`}
            >
              <span className="text-olive-hi text-xs tracking-[0.2em]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-4 text-2xl">{s.title}</h2>
              <p className="text-muted mt-2 text-sm">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" id="inquiry" className="md:!py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7" data-reveal="up">
            <h2 className="text-4xl md:text-5xl">Send an inquiry</h2>
            <p className="text-muted mt-4 mb-12 max-w-md">
              Fields marked optional can be left blank.
            </p>
            <ContactForm pillars={getPillars()} />
          </div>

          <aside
            className="lg:col-span-4 lg:col-start-9"
            data-reveal="up"
            style={{ '--d': '140ms' }}
          >
            <div className="lg:sticky lg:top-32">
              <h2 className="font-body text-muted text-xs font-medium tracking-[0.22em] uppercase">
                Contact details
              </h2>
              <dl className="border-line mt-6 border-t">
                {details.map((d) => (
                  <div key={d.label} className="border-line border-b py-6">
                    <dt className="text-paper/60 text-xs tracking-[0.16em] uppercase">{d.label}</dt>
                    <dd className="mt-3 text-white">
                      <T v={d.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <ContinueExploring
        tone="ink"
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
        ]}
      />
    </>
  );
}
