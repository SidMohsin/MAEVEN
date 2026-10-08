// Sanity-checks the service data before every build. Fails loudly on structural mistakes.
import { pillars } from '../src/data/services.js';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { assets } from '../src/data/assets.js';
import { home } from '../src/data/home.js';
import { about } from '../src/data/about.js';
import { SERVICE_BLOCKS } from '../src/data/servicesPage.js';
import { clients } from '../src/data/clients.js';

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
  ...home.portfolio.tiles.map((t) => t.image),
  ...about.images,
  about.quote.image,
  ...about.team.members.map((m) => m.photo),
].filter(Boolean);
for (const id of pageImages) {
  if (!assetIds.has(id)) errors.push(`Page content: unknown asset id ${id}`);
}
// About must not repeat a Home photo.
const homeImages = new Set([
  ...home.experts.blocks.map((b) => b.image),
  ...home.portfolio.tiles.map((t) => t.image),
]);
for (const id of [...about.images, about.quote.image].filter(Boolean)) {
  if (homeImages.has(id)) errors.push(`About: ${id} is also used on Home`);
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

// Every pillar needs an introduction (shown on the Services page).
for (const p of pillars) if (!p.intro) errors.push(`Pillar ${p.slug}: missing intro`);
// Services page blocks: every topic exactly once, inside its own pillar.
const placed = SERVICE_BLOCKS.flatMap((b) => b.topics);
for (const p of pillars) {
  for (const t of p.topics) {
    const n = placed.filter((s) => s === t.slug).length;
    if (n !== 1) errors.push(`Services page: ${t.slug} appears ${n} times (expected 1)`);
  }
}
// Services photos/clips: exist, are used nowhere on Home or About, and never twice on the page
// (a card may reuse its own block's resting photo).
const elsewhere = new Set(pageImages);
const svcSeen = new Map();
for (const b of SERVICE_BLOCKS) {
  const ids = new Set([b.image]);
  for (const [slug, m] of Object.entries(b.media ?? {})) {
    if (!b.topics.includes(slug)) errors.push(`Services page: media for ${slug} outside its block`);
    if (m === b.image) errors.push(`Services page: ${slug} shows the block's starting photo`);
    if (typeof m === 'string') ids.add(m);
    else {
      for (const f of [`/video/services/${m.video}.mp4`, `/video/services/${m.video}-poster.jpg`]) {
        if (!existsSync(fileURLToPath(new URL(`../public${f}`, import.meta.url)))) {
          errors.push(`Services page: missing public${f} (run scripts/build-videos.py --services)`);
        }
      }
    }
  }
  for (const id of ids) {
    if (!assetIds.has(id)) errors.push(`Services page: unknown asset id ${id}`);
    if (elsewhere.has(id)) errors.push(`Services page: ${id} is also used on Home/About`);
    if (svcSeen.has(id)) errors.push(`Services page: ${id} used in two blocks`);
    svcSeen.set(id, b.title);
  }
  const pillar = pillars.find((p) => p.slug === b.pillar);
  for (const slug of b.topics) {
    if (!pillar?.topics.some((t) => t.slug === slug))
      errors.push(`Services page: ${slug} not in ${b.pillar}`);
  }
}

// Service detail pages: hero and gallery photos are used nowhere on Home, About or Services.
const usedOnPages = new Set([
  ...pageImages,
  ...SERVICE_BLOCKS.flatMap((b) => [b.image, ...Object.values(b.media ?? {})]),
]);
for (const p of pillars) {
  for (const t of p.topics.filter((x) => x.detailPage)) {
    for (const id of [t.hero ?? t.image, ...(t.gallery ?? [])]) {
      if (usedOnPages.has(id))
        errors.push(`/services/${t.slug}: ${id} is also used on another page`);
    }
  }
}

// Client logos exist.
for (const c of clients) {
  if (c.logo && !existsSync(fileURLToPath(new URL(`../public${c.logo}`, import.meta.url)))) {
    errors.push(`Client ${c.name}: missing logo public${c.logo}`);
  }
}

if (pillars.length !== 3) errors.push(`Expected 3 pillars, found ${pillars.length}`);
if (slugs.size !== 18) errors.push(`Expected 18 topics, found ${slugs.size}`);

if (errors.length) {
  console.error('Service data validation failed:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log(`Service data OK: ${pillars.length} pillars, ${slugs.size} topics.`);
