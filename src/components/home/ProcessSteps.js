import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';

/**
 * How we work (GoPackshot's five-step strip): one bordered panel split into five columns, each
 * with a large outlined number, title, short text and a highlighted fact; arrows between steps.
 * Steps appear one after another. Phones: a vertical list.
 */
export default function ProcessSteps({ process, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div data-reveal="up" className="flex justify-center">
          <Eyebrow>{process.eyebrow}</Eyebrow>
        </div>
        <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
          {process.title}
        </SplitText>
        <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
          {process.text}
        </p>
      </div>

      <ol data-reveal="stagger" className="border-line mt-14 grid border md:mt-20 lg:grid-cols-5">
        {process.steps.map((s, i) => (
          <li
            key={s.title}
            className={`group border-line relative flex flex-col p-6 md:p-7 ${
              i > 0 ? 'border-t lg:border-t-0 lg:border-l' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className="text-stroke font-heading text-6xl leading-none transition-colors duration-500 group-hover:text-[var(--color-olive)]"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-6 text-xl">{s.title}</h3>
            <p className="text-paper/70 mt-3 flex-1 text-sm leading-relaxed">{s.text}</p>
            <p className="border-line mt-6 flex items-center gap-3 border-t pt-4 text-xs font-medium tracking-wide text-white">
              <span aria-hidden="true" className="bg-olive-hi h-px w-4 shrink-0" />
              <T v={s.fact} />
            </p>
            {i < process.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="border-line bg-ink text-olive-hi absolute top-1/2 -right-3.5 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border lg:flex"
              >
                <Icon name="chevron-right" className="size-3.5" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
