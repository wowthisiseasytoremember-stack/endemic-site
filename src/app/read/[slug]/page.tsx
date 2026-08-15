import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ClientArticleContent } from '@/components/blog/ClientArticleContent';
import { Nav } from '@/components/Nav';
import { db } from '@/lib/endemic-db';
import { getEntitiesByArticle, getEntityByRoute, ProductEntity, VideoEntity } from '@/data/entities';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CrossKingdomCard, DiscovererCard, BiotopeCard, MythBustRow, FigureImage, SpeciesLink, DiscovererLink, BiotopeLink, CultivarLink, VideoEmbed, ProductCard, DataTable } from '@/components/mdx/ServerArticleComponents';
import { Hero, FeatureGrid, FeatureCard, Callout, Timeline, TimelineStep, RankedList, RankItem, SpeciesCard, FeaturedSpecies, StatStrip, Figure, Sources, ProfileGrid, RelatedGrid, BentoGrid } from '@/components/mdx/EditorialComponents';
import { notFound } from 'next/navigation';
import Head from 'next/head';

export const dynamicParams = false;

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(contentDir);
  
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}
const components = {
  CrossKingdomCard,
  DiscovererCard,
  BiotopeCard,
  MythBustRow,
  FigureImage,
  SpeciesLink,
  DiscovererLink,
  BiotopeLink,
  CultivarLink,
  VideoEmbed,
  ProductCard,
  Hero,
  FeatureGrid,
  FeatureCard,
  Callout,
  DataTable,
  Timeline,
  TimelineStep,
  RankedList,
  RankItem,
  SpeciesCard,
  FeaturedSpecies,
  StatStrip,
  BentoGrid,
  Figure,
  Sources,
  ProfileGrid,
  RelatedGrid,
  h2: ({ children, ...props }: any) => (
    <h2 {...props} id={props.id || children.toString().toLowerCase().replace(/\s+/g, '-')} className="mt-16 mb-8 text-2xl md:text-3xl font-display font-medium text-brand-accent border-b border-brand-raised pb-4 max-w-[70ch] mx-auto w-full">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 {...props} id={props.id || children.toString().toLowerCase().replace(/\s+/g, '-')} className="mt-12 mb-6 text-xl md:text-2xl font-display font-medium text-brand-text max-w-[70ch] mx-auto w-full">
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => <p className="mb-6 text-brand-muted leading-[1.75] text-lg max-w-[70ch] mx-auto w-full" {...props}>{children}</p>,
  blockquote: ({ children, ...props }: any) => <blockquote className="my-8 border-l-4 border-brand-accent bg-brand-surface/50 py-6 px-6 text-brand-text rounded-r-lg max-w-[70ch] mx-auto w-full" {...props}>{children}</blockquote>,
  ul: ({ children, ...props }: any) => <ul className="mb-6 ml-6 list-disc text-brand-muted text-lg marker:text-brand-accent max-w-[70ch] mx-auto w-full" {...props}>{children}</ul>,
  ol: ({ children, ...props }: any) => <ol className="mb-6 ml-6 list-decimal text-brand-muted text-lg marker:text-brand-accent max-w-[70ch] mx-auto w-full" {...props}>{children}</ol>,
  li: ({ children, ...props }: any) => <li className="mb-2" {...props}>{children}</li>,
  table: ({ children, ...props }: any) => <div className="my-10 overflow-x-auto max-w-[88rem] mx-auto w-full"><table className="w-full text-left border-collapse" {...props}>{children}</table></div>,
  tr: ({ children, ...props }: any) => <tr className="border-b border-brand-raised last:border-0" {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => <th className="border-b border-brand-raised py-4 px-2 text-xs font-bold uppercase tracking-widest text-brand-muted" {...props}>{children}</th>,
  td: ({ children, ...props }: any) => <td className="py-4 px-2 text-brand-text tabular-nums" {...props}>{children}</td>,
  a: ({ children, href, ...props }: any) => {
    return <a href={href} className="text-brand-accent underline underline-offset-4 hover:text-brand-accent/70 font-medium transition-colors" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} {...props}>{children}</a>;
  },
};


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  db.init();
  
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return <NotFoundPage slug={slug} />;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  
  // Get related entities from frontmatter
  const relatedEntities = getEntitiesByArticle(slug);
  const relatedSpecies = relatedEntities.filter(e => e.type === 'species');
  const relatedDiscoverers = relatedEntities.filter(e => e.type === 'discoverer');
  const relatedBiotopes = relatedEntities.filter(e => e.type === 'biotope');
  const relatedCultivars = relatedEntities.filter(e => e.type === 'cultivar');
  const relatedVideos = relatedEntities.filter(e => e.type === 'video') as VideoEntity[];
  const relatedProducts = relatedEntities.filter(e => e.type === 'product') as ProductEntity[];
  
  const categoryColor = CATEGORY_COLORS[frontmatter.category] || 'aqua';
  
  // Get cross-kingdom data for related species
  const crossKingdomData = relatedSpecies
    .map(species => {
      const connections = db.getCrossKingdomForFish(species.slug);
      if (connections.length > 0) {
        return {
          species: { slug: species.slug, common_name: species.name, scientific_name: '' },
          connections
        };
      }
      return null;
    })
    .filter((item): item is { species: { slug: string; common_name: string; scientific_name: string }; connections: Array<{ pn: string; c: number }> } => item !== null);
  
  // Pass only serializable data to client component
  const articleData = {
    frontmatter,
    title: frontmatter.title,
    category: frontmatter.category,
    publishDate: frontmatter.publishDate,
    readTime: frontmatter.readTime,
    heroImage: frontmatter.heroImage,
    heroAlt: frontmatter.heroAlt,
    leadMagnet: frontmatter.leadMagnet,
    series: frontmatter.series,
    seriesOrder: frontmatter.seriesOrder,
    categoryColor,
    slug,
    content,
    crossKingdomData: crossKingdomData.map(({ species, connections }) => ({
      species: { slug: species.slug, common_name: species.common_name },
      connections: connections.map(conn => ({ pn: conn.pn, c: conn.c }))
    })),
    relatedSpecies: relatedSpecies.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route })),
    relatedDiscoverers: relatedDiscoverers.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route })),
    relatedBiotopes: relatedBiotopes.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route })),
    relatedCultivars: relatedCultivars.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route })),
    relatedVideos: relatedVideos.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route, videoId: e.videoId })),
    relatedProducts: relatedProducts.map(e => ({ slug: e.slug, name: e.name, description: e.description, route: e.route, price: e.price, thumbnail: e.thumbnail })),
  };

  return (
    <main className="min-h-screen bg-[#040908] text-white selection:bg-[#7fe3ec] selection:text-[#040908]">
      <Nav />
      <ClientArticleContent {...articleData}>
        <MDXRemote source={content} components={components} />
      </ClientArticleContent>
    </main>
  );
}

function NotFoundPage({ slug }: { slug: string }) {
  return (
    <main className="min-h-screen bg-[#040908] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl font-medium mb-4">Article not found</h1>
        <p className="text-white/60 mb-8">The article <code className="bg-white/10 px-2 py-1 rounded">{slug}</code> doesn't exist.</p>
        <a href="/read" className="inline-flex items-center gap-2 text-aqua hover:text-aqua/70">
          <span className="h-px w-8 bg-aqua" /> Back to Field Notes
        </a>
      </div>
    </main>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  'Species Spotlight': 'aqua',
  'Discoverer Dossiers': 'amber',
  'Biotope Guides': 'emerald',
  'Cultivar Controversies': 'red',
  'Expedition Logs': 'purple',
};
