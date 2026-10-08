// Sanity-checks the service data before every build. Fails loudly on structural mistakes.
import { pillars } from '../src/data/services.js';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { assets } from '../src/data/assets.js';
import { home } from '../src/data/home.js';
import { about } from '../src/data/about.js';
import { SERVICE_BLOCKS } from '../src/data/servicesPage.js';

const assetIds = new Set(assets.map((a) => a.id));

const errors = [];

// Every image the site references must exist under public/ (and therefore in Git and on the host).
for (const a of assets) {
  const file = fileURLToPath(new URL(`../public${a.src}`, import.meta.url));
  if (!existsSync(file)) errors.push(`Asset ${a.id}: missing file public${a.src}`);
}
const { landscape, portrait } = home.hero.video;
for (const src of [landscape?.src, landscape?.poster, portrait?.src, portrait?.poster]) {
  if (!src || !existsSync(fileURLToPath(new URL(`../public${src}`, import.meta.url)))) {
    errors.push(`Hero video: missing file public${src}`);
  }
}

// Image ids used by Home and About content must be curated assets.
const pageImages = [
  ...home.experts.blocks.map((b) => b.image),
  ...home.cases.items.map((c) => c.image),
  ...home.portfolio.tiles.map((t) => t.image),
  ...about.images,
  about.quote.image,
  ...about.team.members.map((m) => m.photo),
].filter(Boolean);
for (const id of pageImages) {
  if (!assetIds.has(id)) errors.push(`Page content: unknown asset id ${id}`);
}
const slugs = new Set();
const EXPECTED = { 'content-production': 5, 'smart-tech': 8, 'creative-brand': 5 };

for (const p of pillars) {
  if (EXPECTED[p.slug] !== p.topics.length) {
    errors.push(`Pillar ${p.slug}: expected ${EXPECTED[p.slug]} topics, found ${p.topics.length}`);
  }
  if (p.banner && !assetIds.has(p.banner))
    errors.push(`Pillar ${p.slug}: unknown banner ${p.banner}`);
  for (const t of p.topics) {
    if (slugs.has(t.slug)) errors.push(`Duplicate topic slug: ${t.slug}`);
    slugs.add(t.slug);
    for (const f of ['name', 'summary', 'description']) {
      if (!t[f]) errors.push(`Topic ${t.slug}: missing ${f}`);
    }
    for (const id of [t.image, t.hero, ...(t.gallery ?? [])].filter(Boolean)) {
      if (!assetIds.has(id)) errors.push(`Topic ${t.slug}: unknown asset id ${id}`);
    }
    if (!t.groups?.some((g) => g.items?.length)) errors.push(`Topic ${t.slug}: no service items`);
  }
}

// Services page: real studio reel and an introduction for every pillar.
for (const f of ['/video/studio-reel.mp4', '/video/studio-reel-poster.jpg']) {
  if (!existsSync(fileURLToPath(new URL(`../public${f}`, import.meta.url)))) {
    errors.push(`Services page: missing file public${f}`);
  }
}
for (const p of pillars) if (!p.intro) errors.push(`Pillar ${p.slug}: missing intro`);
// Services page blocks: every topic exactly once, inside its own pillar, and every topic has a photo.
const placed = SERVICE_BLOCKS.flatMap((b) => b.topics);
for (const p of pillars) {
  for (const t of p.topics) {
    const n = placed.filter((s) => s === t.slug).length;
    if (n !== 1) errors.push(`Services page: ${t.slug} appears ${n} times (expected 1)`);
    if (!t.image) errors.push(`Topic ${t.slug}: no photo for the Services page`);
  }
}
for (const b of SERVICE_BLOCKS) {
  const pillar = pillars.find((p) => p.slug === b.pillar);
  for (const slug of b.topics) {
    if (!pillar?.topics.some((t) => t.slug === slug))
      errors.push(`Services page: ${slug} not in ${b.pillar}`);
  }
}

if (pillars.length !== 3) errors.push(`Expected 3 pillars, found ${pillars.length}`);
if (slugs.size !== 18) errors.push(`Expected 18 topics, found ${slugs.size}`);

if (errors.length) {
  console.error('Service data validation failed:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log(`Service data OK: ${pillars.length} pillars, ${slugs.size} topics.`);
