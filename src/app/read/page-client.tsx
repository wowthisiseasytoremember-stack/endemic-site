"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Nav } from "@/components/Nav";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  publishDate: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Species Spotlight': 'aqua',
  'Discoverer Dossiers': 'amber',
  'Biotope Guides': 'emerald',
  'Cultivar Controversies': 'red',
  'Expedition Logs': 'purple',
};

export default function FieldNotesPageClient() {
  const [isExiting, setIsExiting] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [0.3, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  useEffect(() => {
    const handleNavOut = () => setIsExiting(true);
    window.addEventListener("navigating-out", handleNavOut);
    return () => window.removeEventListener("navigating-out", handleNavOut);
  }, []);

  useEffect(() => {
    fetch('/blog-index.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', 'Species Spotlight', 'Discoverer Dossiers', 'Biotope Guides', 'Cultivar Controversies', 'Expedition Logs'];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const seriesPosts = posts.filter(p => p.series).sort((a, b) => (a.seriesOrder || 99) - (b.seriesOrder || 99));

  return (
    <main className="min-h-screen bg-[#040908] text-white relative">
      {/* Immersive Bleeker Hero Backdrop */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity, scale }}
        className="fixed top-0 left-0 right-0 h-[85vh] w-full z-0 pointer-events-none overflow-hidden"
      >
        <img 
          src="/images/bleeker/goramensis.jpg" 
          alt="Historical Atlas Plate" 
          className="w-full h-full object-cover mix-blend-luminosity sepia-[0.3] hue-rotate-180 contrast-125 object-center"
        />
        {/* Gradients to fade smoothly into the dark canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-[#040908]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040908]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#040908]/20 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10">
        <Nav />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          
          {/* Header */}
          <AnimatePresence>
            {!isExiting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="mb-6 flex items-center gap-4 text-aqua uppercase tracking-widest text-xs font-bold drop-shadow-[0_0_8px_rgba(31,184,196,0.5)]">
                  <span className="w-12 h-px bg-aqua shadow-[0_0_10px_rgba(31,184,196,1)]" />
                  Endemic Editorial
                </div>
                <h1 className="font-display text-6xl font-medium tracking-tight md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
                  Field Notes
                </h1>
                <p className="mt-8 text-xl text-white/70 max-w-2xl leading-relaxed backdrop-blur-md bg-[#040908]/20 p-6 rounded-2xl border border-white/10 shadow-2xl">
                  Dispatches from the wild. Dive into historical plates, cultivar controversies, expedition logs, and biotope parameter guides.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Filter */}
          <Reveal delay={200}>
            <div className="mt-16 flex flex-wrap gap-3" role="tablist">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-md border ${
                    activeCategory === cat
                      ? 'bg-aqua/10 text-aqua border-aqua/50 shadow-[0_0_20px_rgba(31,184,196,0.3)]'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
                  }`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Series Strip */}
          {seriesPosts.length > 0 && (
            <Reveal delay={300}>
              <div className="mt-20">
                <h2 className="font-display text-3xl font-medium text-white mb-8 flex items-center gap-4">
                  Ongoing Series
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 snap-x hide-scrollbar">
                  {seriesPosts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/read/${post.slug}`}
                      className="flex-shrink-0 w-80 group snap-start"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl glass border border-white/10 group-hover:border-aqua/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(31,184,196,0.2)]">
                        <img
                          src={post.heroImage || '/images/bleeker/gymnothorax.jpg'}
                          alt={post.heroAlt}
                          className="h-full w-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-[#040908]/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-xs font-bold text-aqua uppercase tracking-widest drop-shadow-[0_0_5px_rgba(31,184,196,0.5)]">{post.series}</span>
                          <h3 className="mt-2 font-display text-xl font-medium text-white line-clamp-2 group-hover:text-aqua transition-colors">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-xs font-medium text-white/50 flex items-center gap-2 uppercase tracking-wider">
                            <span>{post.readTime}</span>
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            <span>Part {post.seriesOrder}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Featured Post (latest) */}
          {filteredPosts.length > 0 && (
            <Reveal delay={400}>
              <div className="mt-20">
                {(() => {
                  const featured = filteredPosts[0];
                  const categoryColor = CATEGORY_COLORS[featured.category] || 'aqua';
                  return (
                    <Link
                      href={`/read/${featured.slug}`}
                      className="group relative block overflow-hidden rounded-3xl glass border border-white/10 hover:border-aqua/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(31,184,196,0.15)] hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                        <img
                          src={featured.heroImage || '/images/bleeker/hemigymnus.jpg'}
                          alt={featured.heroAlt}
                          className="h-full w-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-[#040908]/80 to-transparent" />
                        
                        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                          <div className="flex items-center gap-3 text-white/50 mb-6 drop-shadow-md">
                            <span className={`h-px w-12 bg-${categoryColor} shadow-[0_0_8px_var(--${categoryColor})]`} />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">{featured.category}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-${categoryColor}/20 text-${categoryColor} border border-${categoryColor}/30`}>
                              Latest
                            </span>
                          </div>
                          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white group-hover:text-aqua transition-colors line-clamp-2 leading-tight">
                            {featured.title}
                          </h2>
                          <p className="mt-4 text-xl text-white/70 line-clamp-2 max-w-2xl font-light">
                            {featured.excerpt}
                          </p>
                          <div className="mt-8 flex items-center gap-6 text-sm font-medium text-white/50 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {featured.readTime}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <time dateTime={featured.publishDate}>
                              {new Date(featured.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })()}
              </div>
            </Reveal>
          )}

          {/* Post Grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(1).map((post, i) => (
              <Reveal key={post.slug} delay={200 + (i % 3) * 150}>
                <Link
                  href={`/read/${post.slug}`}
                  className="group block h-full flex flex-col overflow-hidden rounded-2xl glass border border-white/10 hover:border-emerald/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={post.heroImage || '/images/bleeker/goramensis.jpg'}
                      alt={post.heroAlt}
                      className="h-full w-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040908] to-transparent" />
                    
                    {/* Glowing Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#040908]/80 backdrop-blur-md border border-${CATEGORY_COLORS[post.category] || 'aqua'}/30 text-${CATEGORY_COLORS[post.category] || 'aqua'} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-medium text-white group-hover:text-emerald transition-colors line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-3 mb-6 font-light leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-widest border-t border-white/10 pt-4">
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                      <span className="flex items-center gap-1">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="mt-24 text-center py-16 glass rounded-2xl border border-white/10">
              <p className="text-xl text-white/50 font-display">No field notes found in this category.</p>
            </div>
          )}

          {/* Epic Newsletter CTA */}
          <Reveal delay={400}>
            <div className="mt-32 text-center flex justify-center">
              <div className="relative flex flex-col items-center gap-6 glass rounded-[3rem] p-10 md:p-20 border border-white/10 max-w-4xl w-full overflow-hidden group">
                
                {/* Subtle Bleeker Watermark Background */}
                <img 
                  src="/images/bleeker/plate-ccxxiv.jpg" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-1000 grayscale pointer-events-none" 
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-16 h-16 rounded-full glass border border-aqua/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(31,184,196,0.2)]">
                    <svg className="w-6 h-6 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="font-display text-4xl md:text-5xl font-medium text-white">Get the Field Notes dispatch</h3>
                  <p className="text-xl text-white/60 font-light mt-4 max-w-xl">
                    Provenance, rare biotopes, and cultivar controversies — delivered directly to your inbox.
                  </p>
                  
                  <form className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mt-10" action="/api/subscribe" method="POST">
                    <input 
                      type="hidden" 
                      name="leadMagnet" 
                      value="field-notes-dispatch" 
                    />
                    <div className="relative flex-1 group/input">
                      <div className="absolute inset-0 bg-aqua/20 blur-xl rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500" />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email address" 
                        required
                        className="relative w-full px-6 py-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-aqua focus:ring-1 focus:ring-aqua transition-all font-medium backdrop-blur-md shadow-inner"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="relative px-8 py-4 rounded-xl bg-aqua text-[#040908] font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(31,184,196,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-0.5"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mt-6">No spam. Unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}