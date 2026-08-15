import React, { ReactNode } from 'react';
import Image from 'next/image';

// --- Hero ---
export interface HeroProps {
  title: string;
  intro: string;
  image: string;
  tags?: string[];
}
export const Hero = ({ title, intro, image, tags }: HeroProps) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040908] via-[#040908]/70 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040908]/40 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 w-full max-w-[88rem] mx-auto px-6 pb-16 md:pb-24">
        {tags && tags.length > 0 && (
          <div className="flex gap-3 mb-6">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-bold uppercase tracking-widest text-aqua px-3 py-1.5 bg-[#040908]/80 backdrop-blur-md border border-aqua/30 rounded-full shadow-[0_0_15px_rgba(31,184,196,0.2)]">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-tight tracking-tight text-white max-w-[18ch]">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed font-light">
          {intro}
        </p>
      </div>
    </section>
  );
};

// --- FeatureGrid ---
export interface FeatureGridProps {
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}
export const FeatureGrid = ({ cols = 3, className = '', children }: FeatureGridProps) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[cols];
  return (
    <div className={`max-w-[88rem] mx-auto w-full grid ${colClasses} gap-6 my-12 px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

// --- FeatureCard ---
export interface FeatureCardProps {
  title: string;
  image?: string;
  colSpan?: 1 | 2 | 3 | 4;
  children: ReactNode;
}
export const FeatureCard = ({ title, image, colSpan = 1, children }: FeatureCardProps) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'md:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4'
  }[colSpan];
  return (
    <div className={`glass border-white/10 rounded-xl overflow-hidden border border-white/10 flex flex-col hover:-translate-y-1 transition-transform duration-300 ${spanClasses}`}>
      {image && (
        <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-display font-bold text-white mb-3">{title}</h3>
        <div className="text-white/60 leading-relaxed flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Callout ---
export interface CalloutProps {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
  type?: 'accent' | 'note' | 'warning';
}
export const Callout = ({ icon, label, children, type = 'accent' }: CalloutProps) => {
  const borderColors = {
    accent: 'border-aqua',
    note: 'border-brand-muted',
    warning: 'border-red-500'
  };
  
  return (
    <div className={`border-l-4 ${borderColors[type]} glass rounded-r-lg p-6 my-8 max-w-[70ch] mx-auto w-full px-4 md:px-8 flex gap-4 items-start`}>
      {icon && <div className="text-aqua glow-text-aqua text-2xl flex-shrink-0">{icon}</div>}
      <div>
        <strong className="block text-white font-bold mb-1">{label}</strong>
        <div className="text-white/60 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Timeline ---
export const Timeline = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[88rem] mx-auto my-12 w-full px-4 md:px-8">
      <div className="space-y-0">
        {children}
      </div>
    </div>
  );
};

// --- TimelineStep ---
export interface TimelineStepProps {
  title: string;
  duration?: string;
  index: number;
  children: ReactNode;
}
export const TimelineStep = ({ title, duration, index, children }: TimelineStepProps) => {
  const isEven = index % 2 === 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center w-full relative min-h-[8rem]">
      {/* Vertical Line for Desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-raised -translate-x-1/2 z-0" />
      
      {/* Left Column */}
      <div className={`w-full text-left md:text-right ${isEven ? 'md:order-3 md:text-left' : 'md:order-1'} z-10`}>
        <div className="glass border-white/10 p-6 rounded-xl border border-white/10 shadow-sm inline-block w-full">
          {duration && (
            <div className="text-xs font-bold text-aqua glow-text-aqua uppercase tracking-wider mb-2">{duration}</div>
          )}
          <h4 className="text-xl font-display font-bold text-white mb-3">{title}</h4>
          <div className="text-white/60 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
      
      {/* Center Node */}
      <div className="hidden md:flex order-2 w-8 h-8 rounded-full glass border-white/10 border-2 border-aqua items-center justify-center font-bold text-xs text-white z-10 shadow-lg mx-auto">
        {index}
      </div>
      
      {/* Empty Column for Layout */}
      <div className={`hidden md:block ${isEven ? 'md:order-1' : 'md:order-3'}`} />
    </div>
  );
};

// --- RankedList ---
export const RankedList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[70ch] mx-auto w-full my-12 px-4 space-y-12">
      {children}
    </div>
  );
};

// --- RankItem ---
export interface RankItemProps {
  number: string;
  title: string;
  verdict?: string;
  children: ReactNode;
}
export const RankItem = ({ number, title, verdict, children }: RankItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="text-4xl font-bold text-white/60/40 flex-shrink-0 w-16 pt-1 tabular-nums">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="border-b-2 border-aqua pb-3 mb-4 flex justify-between items-baseline flex-wrap gap-2">
          <h3 className="text-2xl font-display font-bold text-white m-0">{title}</h3>
          {verdict && <span className="text-sm font-semibold text-aqua glow-text-aqua bg-brand-accent/10 px-3 py-1 rounded-full uppercase tracking-wider">{verdict}</span>}
        </div>
        <div className="text-white/60 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- ProfileGrid ---
export const ProfileGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[88rem] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 px-4 md:px-8">
      {children}
    </div>
  );
};

// --- SpeciesCard ---
export interface SpeciesCardProps {
  name: string;
  latin: string;
  colSpan?: 1 | 2 | 3 | 4;
  children?: ReactNode;
}
export const SpeciesCard = ({ name, latin, colSpan = 1, children }: SpeciesCardProps) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'md:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4'
  }[colSpan];
  return (
    <div className={`border-l-4 border-aqua glass rounded-r-lg p-6 flex flex-col hover:bg-brand-raised/20 transition-colors ${spanClasses}`}>
      <h4 className="text-lg font-display font-bold text-white mb-1">{name}</h4>
      <span className="text-sm italic text-white/60 mb-3 block">{latin}</span>
      {children && (
        <div className="text-sm text-white leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

// --- FeaturedSpecies ---
export interface FeaturedSpeciesProps {
  name: string;
  latin: string;
  avatar: string;
  description: string;
}
export const FeaturedSpecies = ({ name, latin, avatar, description }: FeaturedSpeciesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center p-6 glass border-white/10 rounded-xl border border-white/10 gap-6">
      <div className="col-span-1 flex justify-center">
        <img src={avatar} alt={name} className="w-32 h-32 rounded-full object-cover border-4 border-aqua" />
      </div>
      <div className="col-span-1 md:col-span-2 text-left">
        <h4 className="text-2xl font-display font-bold text-white">{name}</h4>
        <span className="text-base italic text-white/60 mb-3 block">{latin}</span>
        <p className="text-white/60 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// --- StatStrip ---
export interface StatStripProps {
  items: { label: string; value: string }[];
}
export const StatStrip = ({ items }: StatStripProps) => {
  return (
    <div className="w-full glass border-white/10 border-y border-white/10 my-12">
      <div className="max-w-[88rem] mx-auto flex flex-wrap justify-center divide-x-0 sm:divide-x divide-brand-raised py-8 px-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center px-8 py-4 w-full sm:w-auto">
            <span className="text-4xl font-display font-extrabold text-aqua glow-text-aqua mb-2 tabular-nums">{item.value}</span>
            <span className="text-sm font-bold tracking-widest uppercase text-white/60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Figure ---
export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}
export const Figure = ({ src, alt, caption, credit }: FigureProps) => {
  return (
    <figure className="max-w-[100%] mx-auto my-12 w-full">
      <div className="w-full glass border-white/10">
        <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[70vh]" />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-4 text-sm text-white/60 flex flex-col sm:flex-row sm:justify-between px-4 max-w-[70ch] mx-auto">
          {caption && <span>{caption}</span>}
          {credit && <span className="italic mt-1 sm:mt-0 opacity-70">Credit: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};

// --- BentoGrid ---
export interface BentoGridProps {
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}
export const BentoGrid = ({ cols = 3, className = '', children }: BentoGridProps) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[cols];
  return (
    <div className={`max-w-[88rem] mx-auto w-full grid ${colClasses} gap-6 my-12 px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

// --- Sources ---
export const Sources = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[70ch] mx-auto w-full mt-24 mb-12 px-4 border-t border-white/10 pt-12">
      <h3 className="text-lg font-display font-bold text-white mb-4 uppercase tracking-wider">Sources & References</h3>
      <div className="text-sm text-white/60 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
};

// --- RelatedGrid ---
export const RelatedGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[88rem] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 px-4 md:px-8">
      {children}
    </div>
  );
};
