import { Inter, Jost } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RevealObserver from '@/components/ui/RevealObserver';
import ScrollManager from '@/components/layout/ScrollManager';
import { site } from '@/data/site';
import './globals.css';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  // TODO: replace with client-approved positioning line (site.description is null until supplied)
  ...(site.description ? { description: site.description } : {}),
  openGraph: { siteName: site.name, type: 'website' },
};

export const viewport = { themeColor: '#0a0a0a' };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint so scroll reveals never flash. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="focus:bg-olive sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col overflow-x-clip pt-[4.25rem]">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <ScrollManager />
      </body>
    </html>
  );
}
