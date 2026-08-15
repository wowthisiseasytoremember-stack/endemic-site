import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'blog-index.json');

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

function main() {
  console.log('[generate-blog-index] Reading blog posts...');
  
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    posts.push({
      slug: data.slug || file.replace('.md', ''),
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags || [],
      series: data.series,
      seriesOrder: data.seriesOrder,
      publishDate: data.publishDate,
      readTime: data.readTime,
      heroImage: data.heroImage,
      heroAlt: data.heroAlt,
    });
  }

  // Sort by publish date descending
  posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const output = { posts, generatedAt: new Date().toISOString() };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  
  console.log(`[generate-blog-index] Generated ${posts.length} posts to ${OUTPUT_PATH}`);
}

main();