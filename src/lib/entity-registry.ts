import { ENTITIES, Entity } from '../data/entities';

export { ENTITIES };

export function getEntity(slug: string) {
  return ENTITIES.find(e => e.slug === slug.toLowerCase());
}

export function getEntitiesByType(type: string) {
  return ENTITIES.filter(e => e.type === type);
}

export function getEntitiesByArticle(articleSlug: string) {
  return ENTITIES.filter(e => e.articleSlug === articleSlug);
}

export function getSpecies(slug: string) {
  return ENTITIES.find(e => e.slug === slug.toLowerCase() && e.type === 'species');
}

export function getDiscoverer(slug: string) {
  return ENTITIES.find(e => e.slug === slug.toLowerCase() && e.type === 'discoverer');
}

export function getBiotope(slug: string) {
  return ENTITIES.find(e => e.slug === slug.toLowerCase() && e.type === 'biotope');
}

export function getCultivar(slug: string) {
  return ENTITIES.find(e => e.slug === slug.toLowerCase() && e.type === 'cultivar');
}

export function getEntityRoute(slug: string): string | null {
  const entity = getEntity(slug);
  return entity?.route || null;
}

export function getEntityName(slug: string): string | null {
  const entity = getEntity(slug);
  return entity?.name || null;
}

export const ENTITY_TYPES = ['species', 'discoverer', 'biotope', 'cultivar'] as const;

export type EntityType = typeof ENTITY_TYPES[number];

export function isValidEntityType(type: string): type is EntityType {
  return ENTITY_TYPES.includes(type as EntityType);
}