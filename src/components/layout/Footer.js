import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import T from '@/components/ui/T';
import { contact, footerGroups, site } from '@/data/site';
import { getAsset } from '@/data/assets';

/**
 * Footer (GoPackshot structure): a full-bleed photo behind a dark overlay; logo, tagline and a
 * call to action; link columns; company details (legal name, address, tax ID); bottom bar.
 * Company details are placeholders until supplied (data/site.js).
 */
const BACKGROUND = 'neon-montaz';

export default function Footer() {
  const bg = getAsset(BACKGROUND);
  return (
    <footer className="relative isolate overflow-hidden border-t border-[var(--color-line)]">
      {bg && <Image src={bg.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />}
      <div className="bg-ink/90 absolute inset-0 -z-10" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Logo className="h-10" />
          <p className="text-paper/75 mt-6 max-w-xs text-base">{site.tagline}</p>
          <Button href="/contact" arrow className="mt-8">
            Start a project
          </Button>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="md:col-span-2">
            <h2 className="font-body text-paper/50 text-xs font-medium tracking-[0.22em] uppercase">
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

        <div className="md:col-span-3">
          <h2 className="font-body text-paper/50 text-xs font-medium tracking-[0.22em] uppercase">
            Studio
          </h2>
          <address className="text-paper/80 mt-5 space-y-2 text-sm not-italic">
            <p className="font-medium text-white">
              <T v={contact.legalName} />
            </p>
            <p>
              <T v={contact.address} />
            </p>
            <p>
              <T v={contact.email} />
            </p>
            <p>
              <T v={contact.phone} />
            </p>
            <p className="text-paper/50 text-xs">
              <T v={contact.taxId} />
            </p>
          </address>
        </div>
      </div>

      <div className="border-paper/10 border-t">
        <div className="container-page text-paper/50 flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {contact.social.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} className="hover:text-olive-hi transition-colors duration-200">
                    {s.label}
                  </a>
                ) : (
                  <T v={{ text: s.label, placeholder: true }} />
                )}
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-olive-hi transition-colors duration-200">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
