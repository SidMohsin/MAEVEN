'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Official MAEVEN logo (cropped from the supplied JPEG, which has a black background).
 * Uses a transparent version (black keyed out by luminance) so it sits cleanly on video/photos.
 * Links home; on the home page itself it scrolls smoothly back to the very top.
 * TODO: replace with a vector / transparent asset when the client supplies one.
 */
export default function Logo({ className = 'h-9', priority = false }) {
  const pathname = usePathname();

  const onClick = (e) => {
    if (pathname !== '/') return; // other pages: normal navigation to home (starts at the top)
    e.preventDefault();
    if (window.location.hash) window.history.pushState(window.history.state, '', '/');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: calm ? 'instant' : 'smooth' });
  };

  return (
    <Link href="/" onClick={onClick} aria-label="MAEVEN Productions, home" className="inline-block">
      <Image
        src="/brand/maeven-logo-transparent.png"
        alt="MAEVEN Productions"
        // Display-size dimensions (1140x320 source) so it can never render huge before CSS loads.
        width={142}
        height={40}
        priority={priority}
        className={`${className} w-auto`}
      />
    </Link>
  );
}
