const tones = {
  ink: 'bg-ink text-paper',
  surface: 'bg-surface text-paper',
  paper: 'bg-paper text-ink [&_h1]:!text-ink [&_h2]:!text-ink [&_h3]:!text-ink',
};

/** Full-width band with the standard vertical rhythm. Alternate `ink` / `surface` down a page. */
export default function Section({ tone = 'ink', id, className = '', children, ...props }) {
  return (
    <section id={id} className={`${tones[tone]} py-16 md:py-24 ${className}`} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}
