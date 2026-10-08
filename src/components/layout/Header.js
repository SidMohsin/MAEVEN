'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import { nav } from '@/data/site';

const isActive = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

// "At the top of the page": the bar is transparent there (over the hero) and turns solid on scroll.
const subscribeScroll = (cb) => {
  window.addEventListener('scroll', cb, { passive: true });
  return () => window.removeEventListener('scroll', cb);
};
const atTop = () => window.scrollY < 12;

export default function Header() {
  const pathname = usePathname();
  const top = useSyncExternalStore(subscribeScroll, atTop, () => true);
  // The menu is "open" only for the path it was opened on, so navigating closes it.
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;
  const setOpen = (next) => setOpenPath(next ? pathname : null);

  // Lock scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpenPath(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const links = nav.filter((i) => !i.cta);
  const cta = nav.find((i) => i.cta);

  const clear = top && !open; // transparent: at the top and the mobile menu closed

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        clear
          ? 'border-transparent bg-transparent'
          : open
            ? // Menu open: solid, and no backdrop-filter (it would make the fixed menu panel
              // position against the header instead of the screen, leaving it see-through).
              'border-line bg-ink'
            : 'border-line bg-ink/90 backdrop-blur-md'
      }`}
    >
      {/* Over a bright hero frame, a soft shade keeps the logo and links readable. */}
      <span
        aria-hidden="true"
        className={`from-ink/70 pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b to-transparent transition-opacity duration-500 ${
          clear ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="container-page flex h-[4.25rem] items-center justify-between">
        <Logo priority className="h-8 md:h-9" />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-200 hover:text-white ${
                isActive(pathname, item.href)
                  ? 'text-white'
                  : clear
                    ? 'text-paper/85'
                    : 'text-muted'
              }`}
            >
              {item.label}
              {isActive(pathname, item.href) && (
                <span
                  aria-hidden="true"
                  className="bg-olive-hi absolute inset-x-4 -bottom-px h-px"
                />
              )}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              aria-current={isActive(pathname, cta.href) ? 'page' : undefined}
              className="sweep bg-olive hover:text-ink ml-3 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-500"
            >
              {cta.label}
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="text-paper -mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} className="size-7" />
        </button>
      </div>

      {open && (
        <>
          {/* Dimmed page behind the menu; tapping it closes the menu. */}
          <div
            aria-hidden="true"
            onClick={() => setOpenPath(null)}
            className="menu-fade bg-ink/60 fixed inset-x-0 top-[4.25rem] bottom-0 md:hidden"
          />
          {/* Compact drop-down panel (GoPackshot pattern), only as tall as its contents. */}
          <nav
            id="mobile-menu"
            aria-label="Primary mobile"
            className="menu-drop border-line bg-ink absolute inset-x-0 top-full border-b px-5 pt-3 pb-6 shadow-[0_24px_48px_rgb(0_0_0/0.5)] md:hidden"
          >
            <ul className="space-y-1">
              {links.map((item) => {
                const here = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={here ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 text-base transition-colors duration-300 ${
                        here
                          ? 'bg-olive/20 border-l-2 border-[var(--color-olive-hi)] font-medium text-white'
                          : 'text-paper/80 hover:bg-surface-2 border-l-2 border-transparent hover:text-white'
                      }`}
                    >
                      {item.label}
                      <Icon
                        name="arrow"
                        className={`size-4 ${here ? 'text-olive-hi' : 'text-muted'}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {cta && (
              <Link
                href={cta.href}
                aria-current={isActive(pathname, cta.href) ? 'page' : undefined}
                className="hover:bg-olive mt-5 block border border-[var(--color-olive-hi)] py-3.5 text-center text-base font-medium text-white transition-colors duration-300"
              >
                {cta.label}
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
