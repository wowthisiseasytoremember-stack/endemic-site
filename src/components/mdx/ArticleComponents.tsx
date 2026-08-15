"use client";

import Link from "next/link";
import { ENTITIES, getEntity, Entity } from "@/data/entities";

interface SpeciesLinkProps {
  slug: string;
  children?: React.ReactNode;
  className?: string;
}

export function SpeciesLink({ slug, children, className = "" }: SpeciesLinkProps) {
  const entity = getEntity(slug);
  const name = entity?.name || slug;
  const route = entity?.route || `/aquatrack/species/${slug}`;
  
  return (
    <Link
      href={route}
      className={`text-aqua underline-offset-2 hover:text-aqua/70 transition-colors ${className}`}
    >
      {children ?? name}
    </Link>
  );
}

interface DiscovererLinkProps {
  slug: string;
  children?: React.ReactNode;
  className?: string;
}

export function DiscovererLink({ slug, children, className = "" }: DiscovererLinkProps) {
  const entity = getEntity(slug);
  const name = entity?.name || slug;
  const route = entity?.route || `/read/discoverer/${slug}`;
  
  return (
    <Link
      href={route}
      className={`text-amber underline-offset-2 hover:text-amber/70 transition-colors ${className}`}
    >
      {children ?? name}
    </Link>
  );
}

interface BiotopeLinkProps {
  slug: string;
  children?: React.ReactNode;
  className?: string;
}

export function BiotopeLink({ slug, children, className = "" }: BiotopeLinkProps) {
  const entity = getEntity(slug);
  const name = entity?.name || slug;
  const route = entity?.route || `/aquatrack/biotope/${slug}`;
  
  return (
    <Link
      href={route}
      className={`text-emerald underline-offset-2 hover:text-emerald/70 transition-colors ${className}`}
    >
      {children ?? name}
    </Link>
  );
}

interface CultivarLinkProps {
  slug: string;
  children?: React.ReactNode;
  className?: string;
}

export function CultivarLink({ slug, children, className = "" }: CultivarLinkProps) {
  const entity = getEntity(slug);
  const name = entity?.name || slug;
  const route = entity?.route || `/floratrack/cultivar/${slug}`;
  
  return (
    <Link
      href={route}
      className={`text-emerald underline-offset-2 hover:text-emerald/70 transition-colors ${className}`}
    >
      {children ?? name}
    </Link>
  );
}

interface FigureImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function FigureImage({ src, alt, caption, className = "" }: FigureImageProps) {
  return (
    <figure className={`my-12 ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-white/10">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-white/50 text-center font-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface CalloutProps {
  type: "myth-bust" | "provenance" | "warning" | "note" | "key-fact";
  children: React.ReactNode;
  title?: string;
}

const CALLOUT_STYLES: Record<CalloutProps["type"], { border: string; bg: string; icon: string; titleColor: string }> = {
  "myth-bust": { border: "border-aqua/50", bg: "bg-aqua/10", icon: "🎯", titleColor: "text-aqua" },
  "provenance": { border: "border-amber/50", bg: "bg-amber/10", icon: "📜", titleColor: "text-amber" },
  "warning": { border: "border-red/50", bg: "bg-red/10", icon: "⚠️", titleColor: "text-red-400" },
  "note": { border: "border-white/20", bg: "bg-white/5", icon: "💡", titleColor: "text-white/80" },
  "key-fact": { border: "border-emerald/50", bg: "bg-emerald/10", icon: "🔬", titleColor: "text-emerald" },
};

export function Callout({ type, children, title }: CalloutProps) {
  const style = CALLOUT_STYLES[type];
  return (
    <div className={`relative my-8 p-6 rounded-xl border ${style.border} ${style.bg}`}>
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0" aria-hidden="true">{style.icon}</span>
        <div className="flex-1">
          {title && <h4 className={`font-semibold mb-2 ${style.titleColor}`}>{title}</h4>}
          <div className="text-white/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
  className?: string;
}

export function DataTable({ headers, rows, caption, className = "" }: DataTableProps) {
  return (
    <div className={`overflow-x-auto my-8 ${className}`}>
      <table className="w-full border-collapse">
        {caption && <caption className="mb-4 text-left text-sm text-white/60 font-medium">{caption}</caption>}
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((h, i) => (
              <th key={i} className="text-left pb-4 text-xs font-bold uppercase tracking-widest text-white/50 border-b border-white/10">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`${ri % 2 === 1 ? 'bg-white/5' : ''} border-b border-white/5`}>
              {row.map((cell, ci) => (
                <td key={ci} className="py-4 text-white/70">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface MythBustRowProps {
  myth: string;
  reality: string;
  species?: string;
  className?: string;
}

export function MythBustRow({ myth, reality, species, className = "" }: MythBustRowProps) {
  return (
    <div className={`my-4 p-4 bg-[#080d0b] rounded-xl border border-white/10 ${className}`}>
      {species && <p className="text-xs font-semibold text-aqua mb-2">{species}</p>}
      <div className="grid gap-2 md:grid-cols-2">
        <div className="p-3 bg-red/10 rounded-lg border border-red/20">
          <p className="text-xs font-semibold text-red-400 mb-1">Myth</p>
          <p className="text-white/70 text-sm">{myth}</p>
        </div>
        <div className="p-3 bg-emerald/10 rounded-lg border border-emerald/20">
          <p className="text-xs font-semibold text-emerald mb-1">Reality</p>
          <p className="text-white/70 text-sm">{reality}</p>
        </div>
      </div>
    </div>
  );
}

interface CrossKingdomCardProps {
  fish: { name: string; slug: string; common_name: string };
  plant: { name: string; confidence: number };
  biotope: string;
}

export function CrossKingdomCard({ fish, plant, biotope }: CrossKingdomCardProps) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10 group hover:border-aqua/50 transition-colors">
      <div className="flex items-center gap-3">
        <SpeciesLink slug={fish.slug} className="font-medium text-white">
          {fish.common_name || fish.name}
        </SpeciesLink>
        <span className="text-white/30">↔</span>
        <CultivarLink slug={plant.name.toLowerCase().replace(/ /g, '-')} className="font-medium text-emerald">
          {plant.name}
        </CultivarLink>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
        <BiotopeLink slug={biotope} className="hover:text-emerald">
          {biotope}
        </BiotopeLink>
        <span>•</span>
        <span>Confidence: {Math.round(plant.confidence * 100)}%</span>
      </div>
    </div>
  );
}

interface SpeciesCardProps {
  species: {
    scientific_name: string;
    common_name: string;
    max_size_cm: number;
    ph_min: number | null;
    ph_max: number | null;
    temp_min_c: number | null;
    temp_max_c: number | null;
    biotope_type: string;
    discoverer_name: string;
  };
  slug: string;
}

export function SpeciesCard({ species, slug }: SpeciesCardProps) {
  return (
    <Link href={`/aquatrack/species/${slug}`} className="glass rounded-xl p-4 border border-white/10 group hover:border-aqua/50 transition-colors">
      <SpeciesLink slug={slug} className="font-medium text-white group-hover:text-aqua">
        {species.common_name}
      </SpeciesLink>
      <p className="mt-1 text-sm text-white/50 italic">{species.scientific_name}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
        <span>{species.max_size_cm}cm max</span>
        {species.ph_min && species.ph_max && <span>pH {species.ph_min}–{species.ph_max}</span>}
        {species.temp_min_c && species.temp_max_c && <span>{species.temp_min_c}–{species.temp_max_c}°C</span>}
        <span className="text-emerald">{species.biotope_type}</span>
      </div>
    </Link>
  );
}

interface DiscovererCardProps {
  discoverer: {
    name: string;
    slug: string;
    species_count: number;
    nationality: string;
    birth_year: number | null;
    death_year: number | null;
  };
}

export function DiscovererCard({ discoverer }: DiscovererCardProps) {
  return (
    <Link href={`/read/discoverer/${discoverer.slug}`} className="glass rounded-xl p-4 border border-white/10 group hover:border-amber/50 transition-colors">
      <DiscovererLink slug={discoverer.slug} className="font-medium text-white group-hover:text-amber">
        {discoverer.name}
      </DiscovererLink>
      <p className="mt-1 text-sm text-white/50">{discoverer.nationality}</p>
      <div className="mt-2 text-sm text-amber font-medium">
        {discoverer.species_count} species described
      </div>
      {discoverer.birth_year && discoverer.death_year && (
        <p className="mt-1 text-xs text-white/40">{discoverer.birth_year}–{discoverer.death_year}</p>
      )}
    </Link>
  );
}

interface BiotopeCardProps {
  biotope: {
    name: string;
    slug: string;
    description: string;
    confidence: number;
  };
}

export function BiotopeCard({ biotope }: BiotopeCardProps) {
  return (
    <Link href={`/aquatrack/biotope/${biotope.slug}`} className="glass rounded-xl p-4 border border-white/10 group hover:border-emerald/50 transition-colors">
      <BiotopeLink slug={biotope.slug} className="font-medium text-white group-hover:text-emerald">
        {biotope.name}
      </BiotopeLink>
      <p className="mt-2 text-sm text-white/60 line-clamp-2">{biotope.description}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
        <span className="px-2 py-0.5 bg-emerald/20 text-emerald rounded-full">
          {Math.round(biotope.confidence * 100)}% confidence
        </span>
      </div>
    </Link>
  );
}