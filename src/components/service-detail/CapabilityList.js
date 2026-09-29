import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import { visibleGroups } from '@/lib/services';

/**
 * Capabilities / sub-services as large numbered rows. Groups (e.g. AI Video & Film) get sub-headings.
 * Items may carry an optional `description`; it renders only when the source data has one.
 * Hidden items are filtered by `visibleGroups`.
 */
export default function CapabilityList({ topic, tone }) {
  const groups = visibleGroups(topic);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section tone={tone} className="md:!py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-36" data-reveal="up">
            <Eyebrow>Capabilities</Eyebrow>
            <p className="font-heading text-olive-hi mt-6 text-6xl leading-none md:text-7xl">
              {String(total).padStart(2, '0')}
            </p>
            <p className="text-muted mt-3 text-sm tracking-[0.18em] uppercase">
              {total === 1 ? 'Service' : 'Services'}
            </p>
          </div>
        </div>

        <div className="space-y-12 md:col-span-8" data-reveal="up" style={{ '--d': '120ms' }}>
          {groups.map((group, gi) => (
            <div key={group.title ?? gi}>
              {group.title && (
                <h2 className="font-body text-olive-hi mb-2 text-xs font-medium tracking-[0.22em] uppercase">
                  {group.title}
                </h2>
              )}
              <ol className="border-line border-t">
                {group.items.map((item, i) => (
                  <li
                    key={item.name}
                    className="group border-line grid grid-cols-[3rem_1fr] items-baseline gap-x-2 border-b py-5 md:grid-cols-[4rem_1fr] md:py-6"
                  >
                    <span className="text-olive-hi text-xs tracking-[0.2em] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="font-heading block text-xl [overflow-wrap:anywhere] text-white transition-colors duration-200 group-hover:text-[var(--color-olive-hi)] md:text-2xl">
                        {item.name}
                      </span>
                      {item.description && (
                        <span className="text-muted mt-2 block max-w-xl text-sm leading-relaxed">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
