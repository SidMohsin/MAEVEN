import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';
import ContactForm from '@/components/contact/ContactForm';
import { contact } from '@/data/site';
import { getPillars } from '@/lib/services';

/** Contact on Home (GoPackshot puts the form on the homepage): form + direct details. */
export default function HomeContact({ data, tone }) {
  const details = [
    { label: 'Email', value: contact.email },
    { label: 'Phone', value: contact.phone },
    { label: 'Studio', value: contact.city },
  ];
  return (
    <Section tone={tone} id="contact" className="md:!py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div data-reveal="up">
            <Eyebrow>{data.eyebrow}</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
            {data.title}
          </SplitText>
          <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
            Tell us about your project. We get back to you <T v={data.response} />.
          </p>
          <dl
            data-reveal="stagger"
            style={{ '--d': '350ms' }}
            className="border-line mt-10 border-t"
          >
            {details.map((d) => (
              <div
                key={d.label}
                className="border-line flex items-baseline justify-between gap-6 border-b py-5"
              >
                <dt className="text-muted text-xs tracking-[0.16em] uppercase">{d.label}</dt>
                <dd className="text-right text-white">
                  <T v={d.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="border-line bg-surface-2/40 border p-6 md:p-10 lg:col-span-7"
          data-reveal="up"
          style={{ '--d': '150ms' }}
        >
          <ContactForm pillars={getPillars()} />
        </div>
      </div>
    </Section>
  );
}
