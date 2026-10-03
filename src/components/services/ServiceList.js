import { visibleGroups } from '@/lib/services';

/**
 * Service items for a topic. Hidden items are filtered out by `visibleGroups`.
 * Groups with a title (e.g. AI Video & Film) get a sub-heading; long lists split into two columns.
 * Items stagger in when scrolled into view; on hover the marker extends and the item nudges right.
 */
export default function ServiceList({ topic, delay = 0 }) {
  const groups = visibleGroups(topic);
  return (
    <div className="space-y-8">
      {groups.map((group, gi) => (
        <div key={group.title ?? gi}>
          {group.title && (
            <h4 className="font-body text-olive-hi mb-3 text-xs font-medium tracking-[0.22em] uppercase">
              {group.title}
            </h4>
          )}
          <ul
            data-reveal="stagger"
            style={{ '--d': `${delay + gi * 120}ms` }}
            className={`grid gap-x-10 ${group.items.length > 4 ? 'lg:grid-cols-2' : ''}`}
          >
            {group.items.map((item) => (
              <li
                key={item.name}
                className="group border-line text-paper flex items-baseline gap-3 border-b py-3 text-sm break-words transition-colors duration-300 hover:text-white md:text-[0.95rem]"
              >
                <span
                  aria-hidden="true"
                  className="bg-olive group-hover:bg-olive-hi h-px w-3 shrink-0 translate-y-[-0.25em] transition-all duration-500 ease-[var(--ease-expo)] group-hover:w-5"
                />
                <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5">
                  {item.name.split('/').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <>
                          /<wbr />
                        </>
                      )}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
