import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const base =
  'group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200';
const variants = {
  primary: 'bg-olive text-white hover:bg-olive-hi hover:text-ink',
  outline: 'border border-paper/30 text-paper hover:border-olive-hi hover:text-olive-hi',
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
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
