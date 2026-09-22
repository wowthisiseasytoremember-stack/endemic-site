import fs from "fs";
import path from "path";
import matter from "gray-matter";
import FieldNotesPageClient, { type BlogPost } from "./page-client";

export const revalidate = 3600;

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function getFieldNotesPosts(): BlogPost[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      const slug = asString(data.slug, filename.replace(/\.md$/, ""));

      return {
        slug,
        title: asString(data.title),
        excerpt: asString(data.excerpt),
        category: asString(data.category),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        series: typeof data.series === "string" && data.series.length > 0 ? data.series : undefined,
        seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
        publishDate: asString(data.publishDate),
        readTime: asString(data.readTime),
        heroImage: asString(data.heroImage),
        heroAlt: asString(data.heroAlt, asString(data.title)),
      } satisfies BlogPost;
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export default function FieldNotesPage() {
  return <FieldNotesPageClient initialPosts={getFieldNotesPosts()} />;
}
