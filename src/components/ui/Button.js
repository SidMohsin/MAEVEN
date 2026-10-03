import Link from 'next/link';
import Icon from '@/components/ui/Icon';

// Hover: a fill sweeps in from the left behind the label (.sweep in globals.css) and the arrow
// moves. Primary sweeps to light olive; outline sweeps to logo olive.
const base =
  'sweep group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-500';
const variants = {
  primary: 'bg-olive text-white hover:text-ink',
  outline:
    'border border-paper/30 text-paper [--sweep:var(--color-olive)] hover:border-olive hover:text-white',
};

/** Link-styled button. Pass `href` for a link, otherwise renders a <button>. */
export default function Button({
  href,
  variant = 'primary',
  arrow = false,
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
        />
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}
