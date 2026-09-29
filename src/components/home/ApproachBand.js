import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';

/**
 * How we work: a generic four-step workflow, labelled as such. It describes the shape of a typical
 * project, not specific internal processes, so it makes no operational claims.
 */
export default function ApproachBand({ steps, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div data-reveal="up" className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
        <div className="md:col-span-7">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-6 text-5xl md:text-7xl">From brief to delivery</h2>
        </div>
        <p className="text-muted text-sm leading-relaxed md:col-span-4 md:col-start-9">
          The shape of a typical project. Every brief is scoped individually.
        </p>
      </div>

      <ol className="mt-14 grid gap-x-8 md:mt-20 md:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.title}
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
            <h3 className="mt-8 text-2xl md:text-3xl">{step.title}</h3>
            <p className="text-paper/70 mt-3 max-w-xs text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
