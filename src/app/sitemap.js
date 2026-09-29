import { site } from '@/data/site';
import { getDetailTopics } from '@/lib/services';

export default function sitemap() {
  const paths = [
    '/',
    '/services',
    '/about',
    '/contact',
    ...getDetailTopics().map((t) => `/services/${t.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
