import { MARK_PLACEHOLDERS, isPh } from '@/lib/content';

/**
 * Renders a content value. Plain strings render as-is; placeholders (`ph('...')`, see
 * lib/content.js) render the same text with a subtle dashed underline and a tooltip, so the page
 * looks finished while making every value that still needs client material easy to find.
 */
export default function T({ v, as: Tag = 'span', className = '' }) {
  if (v == null) return null;
  if (!isPh(v)) return Tag === 'span' && !className ? v : <Tag className={className}>{v}</Tag>;
  const mark = MARK_PLACEHOLDERS
    ? 'underline decoration-dashed decoration-olive/70 decoration-1 underline-offset-[0.2em]'
    : '';
  return (
    <Tag
      className={`${mark} ${className}`}
      title={MARK_PLACEHOLDERS ? 'Placeholder: to be replaced with client material' : undefined}
    >
      {v.text}
    </Tag>
  );
}
