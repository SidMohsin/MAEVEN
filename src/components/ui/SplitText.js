import { Children, isValidElement } from 'react';

/**
 * Renders text as masked words so a heading can rise into view word by word, reading as a
 * line-by-line reveal. Rendered on the server; no DOM rewriting after load.
 *
 *   <SplitText as="h2" className="…">Tell us about your project</SplitText>
 *   <SplitText as="h1" play>…</SplitText>          plays on load (CSS only, for the first screen)
 *
 * Children may mix strings and elements; an element (e.g. an accent <span>) counts as one word.
 * Without `play`, the reveal is scroll-triggered via data-reveal="lines" (RevealObserver).
 * `reveal={false}` renders the same markup with no motion. `delay` is in ms.
 */
export default function SplitText({
  as: Tag = 'span',
  children,
  className = '',
  play = false,
  reveal = true,
  delay = 0,
  style,
  ...props
}) {
  let w = 0;
  const words = [];

  Children.toArray(children).forEach((child, ci) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child)
        .split(/(\s+)/)
        .forEach((part, pi) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            words.push(' ');
            return;
          }
          words.push(
            <span key={`${ci}-${pi}`} className="split-word">
              <span style={{ '--w': w++ }}>{part}</span>
            </span>,
          );
        });
    } else if (isValidElement(child)) {
      words.push(
        <span key={`${ci}-el`} className="split-word">
          <span style={{ '--w': w++ }}>{child}</span>
        </span>,
      );
    }
  });

  const motion = !reveal ? {} : play ? { className: 'lines-rise' } : { 'data-reveal': 'lines' };

  return (
    <Tag
      className={`${className} ${motion.className ?? ''}`}
      data-reveal={motion['data-reveal']}
      style={{ ...style, '--d': `${delay}ms` }}
      {...props}
    >
      {words}
    </Tag>
  );
}
