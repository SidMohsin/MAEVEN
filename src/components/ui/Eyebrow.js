/**
 * Small tracked-caps label with a short olive rule (GoPackshot section-eyebrow pattern).
 * `light` switches to off-white for use over photography, where olive text has too little contrast.
 */
export default function Eyebrow({ children, className = '', light = false }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.9rem] font-semibold tracking-[0.2em] uppercase md:text-[1.05rem] ${
        light ? 'text-paper' : 'text-olive-hi'
      } ${className}`}
    >
      <span aria-hidden="true" className={`h-px w-10 ${light ? 'bg-paper/70' : 'bg-olive'}`} />
      {children}
    </p>
  );
}
