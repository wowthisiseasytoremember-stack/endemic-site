"use client";

import { CrossKingdomCard, SpeciesCard, DiscovererCard, BiotopeCard, Callout, DataTable, MythBustRow, FigureImage, SpeciesLink, DiscovererLink, BiotopeLink, CultivarLink } from '@/components/mdx/ServerArticleComponents';
import { Hero } from '@/components/mdx/EditorialComponents';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { Reveal } from '@/components/Reveal';

interface ClientArticleContentProps {
  children: React.ReactNode;
  content: string;
  frontmatter: any;
  crossKingdomData: any[];
  relatedSpecies: any[];
  relatedDiscoverers: any[];
  relatedBiotopes: any[];
  relatedCultivars: any[];
  relatedVideos?: any[];
  relatedProducts?: any[];
  slug: string;
}

export function ClientArticleContent({
  children,
  content,
  frontmatter,
  crossKingdomData,
  relatedSpecies,
  relatedDiscoverers,
  relatedBiotopes,
  relatedCultivars,
  relatedVideos = [],
  relatedProducts = [],
  slug,
}: ClientArticleContentProps) {

  const { progress, activeHeading, headings } = useReadingProgress();

  return (
    <>
      <Hero 
        title={frontmatter.title} 
        intro={frontmatter.excerpt} 
        image={frontmatter.heroImage} 
        tags={frontmatter.tags} 
      />

      <div className="relative mx-auto max-w-[88rem] px-4 flex flex-col lg:flex-row gap-12 mt-16 mb-24 items-start">
        <article className="article-flow flex-1 w-full min-w-0">
          {children}
        </article>

        {/* Sticky Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-24 pt-8">
          <Reveal>
            <div className="relative w-12 h-12 mb-6">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="var(--aqua)" strokeWidth="6" strokeDasharray={`${progress * 2.827} 282.7`} className="transition-all duration-150 ease-out drop-shadow-[0_0_8px_rgba(31,184,196,0.5)]" />
              </svg>
            </div>
            
            <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">Contents</h4>
            <nav className="flex flex-col gap-3">
              {headings.map(h => (
                <a 
                  key={h.id} 
                  href={`#${h.id}`}
                  className={`text-sm transition-colors leading-snug ${h.level === 3 ? 'ml-4' : ''} ${activeHeading === h.id ? 'text-aqua font-bold glow-text-aqua' : 'text-white/50 hover:text-white'}`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </Reveal>
        </aside>
      </div>

      {crossKingdomData.length > 0 && (
        <Reveal>
          <section className="max-w-[88rem] mx-auto px-4 mt-20 pt-16 border-t border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-emerald shadow-[0_0_10px_rgba(47,174,107,1)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald">Cross-Kingdom</span>
            </div>
            <h2 className="font-display text-3xl font-medium text-white mb-8">Cross-Kingdom Connections</h2>
            <p className="text-white/60 mb-8 max-w-2xl text-lg leading-relaxed">
              These fish share their native waters with these plants. Replicating the biotope means getting both right.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {crossKingdomData.flatMap(({ species, connections }) => 
                connections.map((conn: any) => (
                  <a
                    key={`${species.slug}-${conn.pn}`}
                    href={`/floratrack/cultivar/${conn.pn.toLowerCase().replace(/ /g, '-')}`}
                    className="glass rounded-xl p-5 border border-white/10 group hover:border-emerald/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🐟</span>
                      <span className="font-medium text-white group-hover:text-emerald transition-colors">
                        {species.common_name || species.scientific_name}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
                      <span className="text-emerald">🌿</span>
                      <span className="hover:text-emerald transition-colors">
                        {conn.pn}
                      </span>
                      <span>•</span>
                      <span>Confidence: {Math.round(conn.c * 100)}%</span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>
        </Reveal>
      )}

      {(relatedSpecies.length > 0 || relatedDiscoverers.length > 0 || relatedBiotopes.length > 0 || relatedCultivars.length > 0) && (
        <Reveal>
          <section className="max-w-[88rem] mx-auto px-4 mt-20 pt-16 border-t border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-aqua shadow-[0_0_10px_rgba(31,184,196,1)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-aqua">Explore</span>
            </div>
            <h2 className="font-display text-3xl font-medium text-white mb-8">Explore Further</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedSpecies.slice(0, 4).map((entity: any) => (
                <a key={entity.slug} href={entity.route} className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 p-6 hover:border-aqua/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(31,184,196,0.15)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-aqua/10 border border-aqua/20 flex items-center justify-center text-aqua text-sm">🐟</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-aqua/70">Species</span>
                  </div>
                  <span className="font-display text-lg font-medium text-white group-hover:text-aqua transition-colors block mb-1">
                    {entity.name}
                  </span>
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{entity.description}</p>
                </a>
              ))}
              {relatedDiscoverers.slice(0, 4).map((entity: any) => (
                <a key={entity.slug} href={entity.route} className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 p-6 hover:border-amber/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center text-amber text-sm">🔍</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber/70">Discoverer</span>
                  </div>
                  <span className="font-display text-lg font-medium text-white group-hover:text-amber transition-colors block mb-1">
                    {entity.name}
                  </span>
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{entity.description}</p>
                </a>
              ))}
              {relatedBiotopes.slice(0, 4).map((entity: any) => (
                <a key={entity.slug} href={entity.route} className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 p-6 hover:border-emerald/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald text-sm">🌊</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald/70">Biotope</span>
                  </div>
                  <span className="font-display text-lg font-medium text-white group-hover:text-emerald transition-colors block mb-1">
                    {entity.name}
                  </span>
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{entity.description}</p>
                </a>
              ))}
              {relatedCultivars.slice(0, 4).map((entity: any) => (
                <a key={entity.slug} href={entity.route} className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 p-6 hover:border-emerald/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald text-sm">🌿</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald/70">Cultivar</span>
                  </div>
                  <span className="font-display text-lg font-medium text-white group-hover:text-emerald transition-colors block mb-1">
                    {entity.name}
                  </span>
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{entity.description}</p>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {relatedVideos.length > 0 && (
        <Reveal>
          <section className="max-w-[88rem] mx-auto px-4 mt-20 pt-16 border-t border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">Media</span>
            </div>
            <h2 className="font-display text-3xl font-medium text-white mb-8">Featured Media</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedVideos.map((video: any) => (
                <a key={video.slug} href={video.route} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className="aspect-video w-full rounded-lg bg-black/40 mb-4 overflow-hidden relative">
                     <img src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} alt={video.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-12 h-12 rounded-full bg-red-500/90 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                         <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-white ml-1"></div>
                       </div>
                     </div>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="font-display text-lg font-medium text-white group-hover:text-red-400 transition-colors">
                      {video.name}
                    </span>
                    <p className="mt-2 text-sm text-white/60 line-clamp-2 leading-relaxed">{video.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {relatedProducts.length > 0 && (
        <Reveal>
          <section className="max-w-[88rem] mx-auto px-4 mt-20 pt-16 border-t border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-emerald shadow-[0_0_10px_rgba(16,185,129,1)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald">Gear</span>
            </div>
            <h2 className="font-display text-3xl font-medium text-white mb-8">Essential Gear</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product: any) => (
                <a key={product.slug} href={product.route} target="_blank" rel="noopener nofollow sponsored" className="group relative overflow-hidden rounded-2xl bg-brand-surface/50 border border-white/10 hover:border-emerald/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className="aspect-square w-full rounded-lg bg-black/40 mb-4 overflow-hidden relative">
                    {product.thumbnail ? (
                      <img src={product.thumbnail} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-white/20">No Image</div>
                    )}
                  </div>
                  <div className="p-4 pt-0 flex flex-col flex-1">
                    <span className="font-medium text-white group-hover:text-emerald transition-colors line-clamp-2">
                      {product.name}
                    </span>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald">{product.price}</span>
                      <span className="text-[10px] uppercase tracking-wider text-white/30 font-bold bg-white/5 px-2 py-1 rounded">Affiliate</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <footer className="max-w-[88rem] mx-auto px-4 mt-20 pt-16 border-t border-white/10">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-medium text-white mb-4">Enjoyed this dispatch?</h3>
            <p className="text-white/60 max-w-md mx-auto mb-6 text-lg leading-relaxed">
              Get the next Field Notes article delivered — provenance, biotopes, and cultivar controversies.
            </p>
            <form action="/api/subscribe" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input type="hidden" name="leadMagnet" value={frontmatter.leadMagnet || 'field-notes-dispatch'} />
              <input 
                type="email" 
                name="email" 
                placeholder="your@email.com" 
                required
                className="flex-1 px-6 py-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-aqua focus:ring-1 focus:ring-aqua transition-all font-medium backdrop-blur-md"
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-xl bg-aqua text-[#040908] font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(31,184,196,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50 pb-16">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`https://endemic.app/read/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Share on X
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://endemic.app/read/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Share on LinkedIn
            </a>
            <button 
              onClick={() => navigator.clipboard.writeText(`https://endemic.app/read/${slug}`)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Copy Link
            </button>
          </div>
        </footer>
      </Reveal>
    </>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  'Species Spotlight': 'aqua',
  'Discoverer Dossiers': 'amber',
  'Biotope Guides': 'emerald',
  'Cultivar Controversies': 'red',
  'Expedition Logs': 'purple',
};
