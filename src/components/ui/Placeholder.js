/**
 * Visible marker for content the client still has to supply.
 * Keeps missing information obvious instead of inventing plausible-looking copy.
 */
export default function Placeholder({ label, block = false }) {
  const cls = `border border-dashed border-olive/60 text-sm text-olive-hi ${
    block ? 'block p-4' : 'inline-block px-2 py-0.5'
  }`;
  return <span className={cls}>[ {label} — client to supply ]</span>;
}
