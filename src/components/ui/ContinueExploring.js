import Link from 'next/link';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';

/**
 * "Continue exploring" (GoPackshot's end-of-page cards): centred heading and 2-3 cards, each with
 * an icon, title, one line and a link. `items`: { title, text, href, cta, icon }.
 * Default icons per destination when `icon` is omitted.
 */
const ICONS = { '/services': 'camera', '/about': 'studio', '/contact': 'chat' };

export default function ContinueExploring({ items, tone = 'surface' }) {
  return (
    <Section tone={tone} className="md:!py-28">
      <SplitText as="h2" className="text-center text-4xl md:text-5xl">
        Continue exploring MAEVEN
      </SplitText>
      <ul
        data-reveal="stagger"
        style={{ '--d': '150ms' }}
        className={`mx-auto mt-12 grid gap-5 ${
          items.length > 2 ? 'max-w-5xl md:grid-cols-3' : 'max-w-3xl md:grid-cols-2'
        }`}
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="lift group border-line bg-surface-2/60 flex h-full flex-col items-center border px-7 py-10 text-center hover:border-[var(--color-olive-hi)]"
            >
              <span className="border-line text-olive-hi group-hover:border-olive-hi flex size-12 items-center justify-center rounded-full border transition-colors duration-500">
                <Icon name={item.icon ?? ICONS[item.href] ?? 'arrow'} className="size-5" />
              </span>
              <h3 className="mt-6 text-2xl">{item.title}</h3>
              <p className="text-muted mt-3 max-w-xs flex-1 text-sm leading-relaxed">{item.text}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white">
                {item.cta}
                <Icon
                  name="arrow"
                  className="text-olive-hi size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
