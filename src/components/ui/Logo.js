import Image from 'next/image';
import Link from 'next/link';

/**
 * Official MAEVEN logo (cropped from the supplied JPEG, which has a black background).
 * `mix-blend-lighten` lets the black drop out on any dark surface.
 * TODO: replace with a vector / transparent asset when the client supplies one.
 */
export default function Logo({ className = 'h-9', priority = false }) {
  return (
    <Link href="/" aria-label="MAEVEN Productions, home" className="inline-block">
      <Image
        src="/brand/maeven-logo.png"
        alt="MAEVEN Productions"
        // Display-size dimensions (1140x320 source) so it can never render huge before CSS loads.
        width={142}
        height={40}
        priority={priority}
        className={`${className} w-auto mix-blend-lighten`}
      />
    </Link>
  );
}
