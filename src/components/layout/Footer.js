import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Placeholder from '@/components/ui/Placeholder';
import Button from '@/components/ui/Button';
import { contact, footerGroups, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="border-line bg-surface border-t">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo className="h-10" />
          <p className="text-muted mt-6 max-w-xs text-sm">
            Content &amp; Production, Smart Tech, and Creative &amp; Brand.
          </p>
          <Button href="/contact" arrow className="mt-8">
            Start a project
          </Button>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="md:col-span-2">
            <h2 className="font-body text-muted text-xs font-medium tracking-[0.22em] uppercase">
              {group.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper hover:text-olive-hi text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-line border-t">
        <div className="container-page text-muted flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Placeholder label={contact.email.label} />
        </div>
      </div>
    </footer>
  );
}
