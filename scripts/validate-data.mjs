// Sanity-checks the service data before every build. Fails loudly on structural mistakes.
import { pillars } from '../src/data/services.js';
import { assets } from '../src/data/assets.js';

const assetIds = new Set(assets.map((a) => a.id));

const errors = [];
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

if (pillars.length !== 3) errors.push(`Expected 3 pillars, found ${pillars.length}`);
if (slugs.size !== 18) errors.push(`Expected 18 topics, found ${slugs.size}`);

if (errors.length) {
  console.error('Service data validation failed:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log(`Service data OK: ${pillars.length} pillars, ${slugs.size} topics.`);
