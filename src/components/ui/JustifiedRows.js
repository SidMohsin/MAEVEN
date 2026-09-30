import MediaImage from '@/components/ui/MediaImage';
import { getAsset } from '@/data/assets';

/**
 * Justified image rows: every image keeps its own proportions (no cropping at any screen size) and
 * all images in a row share one height. Each item's flex-grow is its aspect ratio, so widths
 * split the row in proportion and heights come out equal, gaps included.
 *
 * `rows`        desktop rows (from md up), e.g. [['a', 'b'], ['c', 'd', 'e']]
 * `mobileRows`  optional regrouping for phones (fewer images per row), e.g. [['a'], ['b', 'c']]
 *               When omitted, `rows` is used at every size.
 * `fallbackRatio` proportions for missing assets (placeholders).
 */
const ratioOf = (id, fallback) => {
  const a = id ? getAsset(id) : null;
  return a ? a.width / a.height : fallback;
};

function Rows({ rows, className = '', need, fallbackRatio, reveal, priority }) {
  return (
    <div className={`space-y-3 md:space-y-4 ${className}`}>
      {rows.map((row, ri) => {
        const ratios = row.map((id) => ratioOf(id, fallbackRatio));
        const sum = ratios.reduce((a, b) => a + b, 0);
        return (
          <div key={row.join('|')} data-image-row className="flex gap-3 md:gap-4">
            {row.map((id, i) => (
              <div key={id ?? i} className="min-w-0" style={{ flex: `${ratios[i]} 1 0%` }}>
                <MediaImage
                  id={id}
                  need={need}
                  aspect="natural"
                  fallbackRatio={ratios[i]}
                  sizes={`${Math.ceil((ratios[i] / sum) * 100)}vw`}
                  reveal={reveal}
                  delay={i * 110}
                  priority={priority && ri === 0}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function JustifiedRows({
  rows,
  mobileRows,
  need = 'Image',
  fallbackRatio = 4 / 5,
  reveal = 'up',
  priority = false,
  className = '',
}) {
  const shared = { need, fallbackRatio, reveal, priority };
  if (!mobileRows) return <Rows rows={rows} className={className} {...shared} />;
  return (
    <div className={className}>
      <Rows rows={mobileRows} className="md:hidden" {...shared} />
      <Rows rows={rows} className="hidden md:block" {...shared} />
    </div>
  );
}

/** Split a flat list into rows of `size`. */
export function chunk(ids, size) {
  const rows = [];
  for (let i = 0; i < ids.length; i += size) rows.push(ids.slice(i, i + size));
  return rows;
}
