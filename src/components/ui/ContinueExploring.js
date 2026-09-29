import Link from 'next/link';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';

/**
 * "Continue exploring". `items`: { title, text, href, cta }.
 *  - default    : a centred row of 2 or 3 cards (used on Services).
 *  - "editorial": large heading on the left, big typographic link rows on the right (used on Home).
 */
export default function ContinueExploring({ items, tone = 'surface', variant = 'cards' }) {
  if (variant === 'editorial') {
    return (
      <Section tone={tone} className="md:!py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4" data-reveal="up">
            <span aria-hidden="true" className="bg-olive mb-8 block h-px w-16" />
            <h2 className="text-5xl md:text-7xl">Continue exploring</h2>
          </div>

          <ul className="border-line border-t md:col-span-8">
            {items.map((item, i) => (
              <li
                key={item.href}
                data-reveal="up"
                style={{ '--d': `${i * 100}ms` }}
                className="border-line border-b"
              >
                <Link
                  href={item.href}
                  className="group hover:bg-surface-2/60 -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-6 px-3 py-8 transition-colors duration-300 md:py-11"
                >
                  <span>
                    <span className="font-heading group-hover:text-olive-hi block text-4xl text-white transition-colors duration-300 md:text-6xl">
                      {item.title}
                    </span>
                    <span className="text-muted mt-3 block max-w-md text-sm leading-relaxed">
                      {item.text}
                    </span>
                  </span>
                  <span className="text-olive-hi flex items-center gap-3 text-sm font-medium">
                    <span className="hidden md:inline">{item.cta}</span>
                    <Icon
                      name="arrow"
                      className="size-7 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  return (
    <Section tone={tone}>
      <h2 data-reveal="up" className="text-center text-3xl md:text-4xl">
        Continue exploring
      </h2>
      <ul
        className={`mx-auto mt-10 grid gap-4 ${
          items.length > 2 ? 'max-w-5xl md:grid-cols-3' : 'max-w-3xl md:grid-cols-2'
        }`}
      >
        {items.map((item, i) => (
          <li key={item.href} data-reveal="up" style={{ '--d': `${120 + i * 90}ms` }}>
            <Link
              href={item.href}
              className="group border-line bg-surface-2 hover:border-olive-hi flex h-full flex-col border p-8 transition-colors duration-300"
            >
              <h3 className="text-2xl">{item.title}</h3>
              <p className="text-muted mt-3 flex-1 text-sm">{item.text}</p>
              <span className="text-olive-hi mt-6 inline-flex items-center gap-2 text-sm font-medium">
                {item.cta}
                <Icon
                  name="arrow"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
