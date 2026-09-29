import { pillars } from '@/data/services';

/** Visible service items for a topic, grouped. Hidden items are never returned. */
export function visibleGroups(topic) {
  return topic.groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !i.hidden) }))
    .filter((g) => g.items.length > 0);
}

export function getPillars() {
  return pillars;
}

export function getAllTopics() {
  return pillars.flatMap((p) => p.topics.map((t) => ({ ...t, pillar: p })));
}

export function getTopic(slug) {
  return getAllTopics().find((t) => t.slug === slug) ?? null;
}

/** Topics that have a public detail page (`detailPage: true`). */
export function getDetailTopics() {
  return getAllTopics().filter((t) => t.detailPage);
}

/** Sibling topics in the same pillar, for the "Related services" block. */
export function getRelatedTopics(slug, limit = 3) {
  const topic = getTopic(slug);
  if (!topic) return [];
  return topic.pillar.topics.filter((t) => t.slug !== slug).slice(0, limit);
}

/** Where a topic links to: its detail page when it has one, otherwise its row on /services. */
export function topicHref(topic) {
  return topic.detailPage ? `/services/${topic.slug}` : `/services#${topic.slug}`;
}
