'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import { nav } from '@/data/site';

const isActive = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

export default function Header() {
  const pathname = usePathname();
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

  return (
    <header className="border-line bg-ink fixed inset-x-0 top-0 z-50 border-b">
      <div className="container-page flex h-[4.25rem] items-center justify-between">
        <Logo priority className="h-8 md:h-9" />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-200 hover:text-white ${
                isActive(pathname, item.href) ? 'text-white' : 'text-muted'
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
              className="bg-olive hover:bg-olive-hi hover:text-ink ml-3 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200"
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
        <nav
          id="mobile-menu"
          aria-label="Primary mobile"
          className="bg-ink fixed inset-x-0 top-[4.25rem] bottom-0 flex flex-col px-5 pt-6 md:hidden"
        >
          <ul className="border-line border-t">
            {links.map((item) => (
              <li key={item.href} className="border-line border-b">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={`font-heading block py-5 text-3xl ${
                    isActive(pathname, item.href) ? 'text-olive-hi' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {cta && (
            <Link
              href={cta.href}
              className="bg-olive mt-8 py-4 text-center text-base font-medium text-white"
            >
              {cta.label}
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
