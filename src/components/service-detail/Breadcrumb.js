import Link from 'next/link';

/** Breadcrumb trail: Services / pillar / topic. `items`: { label, href? } (last item is the current page). */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.18em] uppercase">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-3">
              {item.href && !last ? (
                <Link href={item.href} className="transition-colors duration-200 hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-paper' : ''}>
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="bg-line h-px w-4">
                  {/* separator */}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
