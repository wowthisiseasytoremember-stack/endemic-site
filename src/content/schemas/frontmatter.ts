import { z } from 'zod';

export const BlogFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string().min(5),
  excerpt: z.string().min(20),
  category: z.string(),
  tags: z.array(z.string()).min(1),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
  publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD").optional(),
  readTime: z.string().optional(),
  heroImage: z.string().startsWith('/images/'),
  heroAlt: z.string().min(10),
  ogImage: z.string().startsWith('/images/').optional(),
  author: z.string().default('Endemic Editorial'),
  leadMagnet: z.string().optional(),
  relatedSpecies: z.array(z.string()).default([]),
  relatedDiscoverers: z.array(z.string()).default([]),
  relatedBiotopes: z.array(z.string()).default([]),
  relatedCultivars: z.array(z.string()).default([]),
  seo: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    ogImage: z.string().optional(),
  }).optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
