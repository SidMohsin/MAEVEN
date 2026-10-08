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

// client: what happens after an inquiry ("meeting, then test shoot"). Step 1 wording is the
// client's; steps 2 and 3 are short drafts of the same answer.
const steps = [
  {
    title: 'Tell us about your project',
    text: 'Share what you’re looking to create, your requirements and your approximate timeline.',
  },
  { title: 'A meeting', text: 'We meet to talk through the scope, style and deliverables.' },
  { title: 'A test shoot', text: 'We shoot a test to agree the look before production starts.' },
];

const details = [
  { label: 'Email', value: contact.email },
  { label: 'Phone / WhatsApp', value: contact.phone, href: contact.phoneHref },
  { label: 'Studio', value: contact.address },
  { label: 'Response time', value: 'Within 3 hours' },
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
      <Section atmos={3} className="!pt-20 !pb-14 md:!pt-28 md:!pb-20">
        <div className="rise">
          <Eyebrow>Contact</Eyebrow>
        </div>
        <h1
          className="rise mt-6 max-w-5xl text-6xl leading-[0.98] md:text-8xl lg:text-[8.5rem] lg:leading-[0.95]"
          style={{ '--d': '90ms' }}
        >
          Have something in mind?
        </h1>
        <p className="rise text-muted mt-6 max-w-xl text-lg" style={{ '--d': '200ms' }}>
          From the first idea to the final frame, let’s create it together.
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

      <Section tone="ink" atmos={1} id="inquiry" className="md:!py-28">
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
                      {d.href ? (
                        <a
                          href={d.href}
                          className="hover:text-olive-hi transition-colors duration-300"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <T v={d.value} />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

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
