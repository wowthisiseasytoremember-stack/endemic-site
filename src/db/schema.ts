import { pgTable, text, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  leadMagnet: text("lead_magnet").default("newsletter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fishSpecies = pgTable("fish_species", {
  slug: text("slug").primaryKey(),
  scientificName: text("scientific_name").notNull(),
  commonNames: text("common_names"),
  discoverer: text("discoverer"),
  discoveredYear: integer("discovered_year"),
  temperature: text("temperature"),
  phRange: text("ph_range"),
  nativeRange: text("native_range"),
  biotope: text("biotope"),
  diet: text("diet"),
  maxSize: text("max_size"),
  etymology: text("etymology"),
  conservation: text("conservation"),
  gpsLat: text("gps_lat"),
  gpsLng: text("gps_lng"),
  data: jsonb("data"),
});

export const plantSpecies = pgTable("plant_species", {
  slug: text("slug").primaryKey(),
  scientificName: text("scientific_name").notNull(),
  commonNames: text("common_names"),
  discoverer: text("discoverer"),
  discoveredYear: integer("discovered_year"),
  temperature: text("temperature"),
  phRange: text("ph_range"),
  nativeRange: text("native_range"),
  biotope: text("biotope"),
  etymology: text("etymology"),
  conservation: text("conservation"),
  data: jsonb("data"),
});

export const discoverers = pgTable("discoverers", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  born: integer("born"),
  died: integer("died"),
  nationality: text("nationality"),
  keySpecies: text("key_species"),
  story: text("story"),
  speciesCount: integer("species_count"),
});

export const collectors = pgTable("collectors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species"),
  countries: text("countries"),
  countryCount: integer("country_count"),
  notes: text("notes"),
});

export const heroStats = pgTable("hero_stats", {
  id: text("id").primaryKey(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  sub: text("sub"),
});

export const genusBreakdown = pgTable("genus_breakdown", {
  id: text("id").primaryKey(),
  genus: text("genus").notNull(),
  count: integer("count").notNull(),
  note: text("note"),
});

export const controversies = pgTable("controversies", {
  id: text("id").primaryKey(),
  cultivar: text("cultivar").notNull(),
  theories: jsonb("theories").notNull(),
  verdict: text("verdict"),
});

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  read: text("read").notNull(),
  accent: text("accent").notNull(),
  content: text("content"),
  publishedAt: timestamp("published_at"),
});

export const videos = pgTable("videos", {
  id: text("id").primaryKey(),
  channel: text("channel").notNull(),
  title: text("title").notNull(),
  views: text("views"),
  tag: text("tag"),
});

export const gearBiotope = pgTable("gear_biotope", {
  id: text("id").primaryKey(),
  match: text("match").notNull(),
  score: integer("score").notNull(),
  items: jsonb("items").notNull(),
});

export const crossKingdom = pgTable("cross_kingdom", {
  id: text("id").primaryKey(),
  discoverer: text("discoverer").notNull(),
  fish: text("fish").notNull(),
  plant: text("plant").notNull(),
});
