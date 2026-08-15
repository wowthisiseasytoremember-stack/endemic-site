#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { db } from '../src/lib/endemic-db';
import { getEntity, getEntitiesByArticle, ENTITIES } from '../src/lib/entity-registry';
import { Entity } from '../src/data/entities';

const OUTLINE_DIR = path.join(process.cwd(), 'src', 'data', 'outlines');
const OUTPUT_DIR = path.join(process.cwd(), 'content', 'blog');

interface OutlineData {
  title: string;
  sourceText: string;
  dataPack: string;
  instructions: string;
}

function parseOutline(content: string): OutlineData {
  const sections = content.split(/^##\s+/m).slice(1);
  const result: Partial<OutlineData> = {};
  
  for (const section of sections) {
    const [heading, ...body] = section.split('\n');
    const cleanHeading = heading.trim().toLowerCase();
    const bodyText = body.join('\n').trim();
    
    if (cleanHeading.includes('source article')) {
      result.sourceText = bodyText;
    } else if (cleanHeading.includes('research data') || cleanHeading.includes('data pack')) {
      result.dataPack = bodyText;
    } else if (cleanHeading.includes('instructions')) {
      result.instructions = bodyText;
    }
  }
  
  const titleMatch = content.match(/^#\s+(.+)$/m);
  result.title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  
  return result as OutlineData;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractEntitiesFromDataPack(dataPack: string): Entity[] {
  const entities: Entity[] = [];
  const seen = new Set<string>();
  
  for (const entity of ENTITIES) {
    const nameLower = entity.name.toLowerCase();
    if (dataPack.toLowerCase().includes(nameLower) && !seen.has(entity.slug)) {
      entities.push(entity);
      seen.add(entity.slug);
    }
  }
  
  return entities;
}

function generateFrontmatter(
  outline: OutlineData,
  filename: string,
  relatedEntities: Entity[]
): string {
  const slug = filename.replace('.md', '');
  const categoryMap: Record<string, string> = {
    'a-puffer': 'Species Spotlight',
    'b-bleeker': 'Discoverer Dossiers',
    'c-etymology': 'Species Spotlight',
    'd-schott': 'Discoverer Dossiers',
    'e-pink-princess': 'Cultivar Controversies',
    'f-rio-negro': 'Biotope Guides',
  };
  
  const seriesMap: Record<string, { series: string; order: number }> = {
    'a-puffer': { series: 'Puffer Profiles', order: 1 },
    'b-bleeker': { series: 'Discoverer Dossiers', order: 1 },
    'd-schott': { series: 'Discoverer Dossiers', order: 2 },
    'e-pink-princess': { series: 'Cultivar Controversies', order: 1 },
    'f-rio-negro': { series: 'Biotope Builds', order: 1 },
  };
  
  const tagMap: Record<string, string[]> = {
    'a-puffer': ['puffers', 'biotope', 'species-guide', 'congo', 'amazon', 'india', 'taxonomy', 'conservation'],
    'b-bleeker': ['discoverers', 'bleeker', 'southeast-asia', 'history', 'colonial-science', 'atlas-ichthyologique'],
    'c-etymology': ['etymology', 'scientific-names', 'latin', 'taxonomy', 'nomenclature'],
    'd-schott': ['discoverers', 'schott', 'anthurium', 'aroids', 'botanical-history', 'schonbrunn'],
    'e-pink-princess': ['cultivars', 'pink-princess', 'patents', 'chimeras', 'tissue-culture', 'philodendron'],
    'f-rio-negro': ['biotope', 'rio-negro', 'blackwater', 'amazon', 'cardinal-tetra', 'apistogramma'],
  };
  
  const category = categoryMap[slug] || 'Field Notes';
  const { series, order } = seriesMap[slug] || { series: '', order: 0 };
  const tags = tagMap[slug] || [];
  
  const relatedSpecies = relatedEntities.filter(e => e.type === 'species').map(e => e.slug);
  const relatedDiscoverers = relatedEntities.filter(e => e.type === 'discoverer').map(e => e.slug);
  const relatedBiotopes = relatedEntities.filter(e => e.type === 'biotope').map(e => e.slug);
  const relatedCultivars = relatedEntities.filter(e => e.type === 'cultivar').map(e => e.slug);
  
  const today = new Date().toISOString().split('T')[0];
  const publishDateMap: Record<string, string> = {
    'a-puffer': '2026-01-15',
    'b-bleeker': '2026-02-20',
    'c-etymology': '2026-03-10',
    'd-schott': '2026-04-05',
    'e-pink-princess': '2026-05-15',
    'f-rio-negro': '2026-06-01',
  };
  
  const fm = {
    slug,
    title: outline.title,
    excerpt: outline.sourceText.substring(0, 200).replace(/\n/g, ' ') + '...',
    category,
    tags,
    series,
    seriesOrder: order,
    publishDate: publishDateMap[slug] || today,
    updatedDate: today,
    readTime: estimateReadTime(outline.sourceText + outline.dataPack),
    heroImage: `/images/blog/${slug}-hero.webp`,
    heroAlt: `Hero image for ${outline.title}`,
    ogImage: `/images/blog/${slug}-og.webp`,
    author: 'Endemic Editorial',
    leadMagnet: getLeadMagnet(slug),
    relatedSpecies,
    relatedDiscoverers,
    relatedBiotopes,
    relatedCultivars,
    seo: {
      title: `${outline.title} | Endemic Field Notes`,
      description: outline.sourceText.substring(0, 155).replace(/\n/g, ' '),
      ogImage: `/images/blog/${slug}-og.webp`,
    },
  };
  
  return matter.stringify('', fm);
}

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

function getLeadMagnet(slug: string): string {
  const map: Record<string, string> = {
    'a-puffer': 'puffer-biotope-cheatsheet',
    'b-bleeker': 'bleeker-timeline-poster',
    'c-etymology': 'latin-name-decoder',
    'd-schott': 'anthurium-collectors-guide',
    'e-pink-princess': 'patent-tracker-spreadsheet',
    'f-rio-negro': 'rio-negro-shopping-list',
  };
  return map[slug] || 'field-notes-dispatch';
}

function generateArticleBody(outline: OutlineData, relatedEntities: Entity[]): string {
  let body = outline.sourceText;
  
  if (outline.dataPack) {
    body += '\n\n---\n\n## Research Appendix\n\n';
    body += outline.dataPack;
  }
  
  if (relatedEntities.length > 0) {
    body += '\n\n---\n\n## Related Entities\n\n';
    for (const entity of relatedEntities) {
      body += `- **${entity.type}**: [${entity.name}](${entity.route}) — ${entity.description}\n`;
    }
  }
  
  return body;
}

function main() {
  console.log('[generate-articles] Initializing database...');
  db.init();
  
  console.log('[generate-articles] Reading outlines...');
  const outlineFiles = fs.readdirSync(OUTLINE_DIR).filter(f => f.endsWith('.md'));
  
  for (const file of outlineFiles) {
    console.log(`\n[generate-articles] Processing ${file}...`);
    
    const content = fs.readFileSync(path.join(OUTLINE_DIR, file), 'utf-8');
    const outline = parseOutline(content);
    
    const relatedEntities = extractEntitiesFromDataPack(outline.dataPack || '');
    console.log(`  Found ${relatedEntities.length} related entities`);
    
    const frontmatter = generateFrontmatter(outline, file, relatedEntities);
    const body = generateArticleBody(outline, relatedEntities);
    
    const output = frontmatter + body;
    const outputPath = path.join(OUTPUT_DIR, file);
    
    fs.writeFileSync(outputPath, output);
    console.log(`  ✓ Written to ${outputPath}`);
  }
  
  console.log('\n[generate-articles] Done!');
}

main();