const tones = {
  ink: 'bg-ink text-paper',
  surface: 'bg-surface text-paper',
  paper: 'bg-paper text-ink [&_h1]:!text-ink [&_h2]:!text-ink [&_h3]:!text-ink',
  light: 'tone-light', // warm off-white band (globals.css)
  olive: 'tone-olive', // deep olive band (globals.css)
};

/**
 * Full-width band with the standard vertical rhythm.
 * `tone`  ink | surface (dark) · light (off-white) · olive (deep olive). See globals.css.
 * `atmos` 1 | 2 | 3 on a dark band: faint olive light spill + fine grain (placement varies).
 */
export default function Section({ tone = 'ink', atmos, id, className = '', children, ...props }) {
  const air = atmos ? `atmos atmos-${atmos}` : '';
  return (
    <section id={id} className={`${tones[tone]} ${air} py-16 md:py-24 ${className}`} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}
