import fs from 'fs';
import path from 'path';

const DATA_ROOT = path.join(process.cwd(), 'src', 'data');

export interface FishSpecies {
  spec_code: number;
  scientific_name: string;
  common_name: string;
  genus: string;
  family: string;
  max_size_cm: number;
  ph_min: number | null;
  ph_max: number | null;
  temp_min_c: number | null;
  temp_max_c: number | null;
  gh_min: number | null;
  gh_max: number | null;
  diet_type: string;
  bioload_multiplier: number;
  lifespan_years: number | null;
  temperament: string;
  min_school_size: number;
  swimming_level: string;
  min_tank_size_l: number;
  data_tier: string;
  author: string;
  year_described: number;
  species_type: string;
  dangerous_classification: string;
  discoverer_name: string;
  discoverer_birth: number | null;
  discoverer_death: number | null;
  discoverer_nationality: string;
  discoverer_specialization: string;
  discoverer_bio: string;
  expedition_name: string;
  expedition_year: number;
  expedition_region: string;
  discovery_locality_lat: number;
  discovery_locality_lon: number;
  coord_confidence: string;
  biotope_type: string;
  biotope_description: string;
  biotope_confidence: number;
  native_range: string[];
  native_region_summary: string;
  discovery_locality: string;
  etymology_text: string | null;
  biotope_similarity_tank: string | null;
  biotope: string;
  provenance_json: string | null;
  controversy_json: string | null;
  order: string;
  max_size_source: string;
  ph_source: string;
  temp_source: string;
  gh_source: string;
  hardness_kh_min: number | null;
  hardness_kh_max: number | null;
  activity_level: string;
  lifespan_source: string;
  schooling: boolean;
  territory_level: string;
  conspecific_tolerance: string;
  min_tank_size_source: string;
  enriched_at: string;
  data_version: number;
  schema_version: number;
}

export interface Biotope {
  species_id: string;
  spec_code: number;
  scientific_name: string;
  primary_biotope: string;
  biotope_description: string;
  confidence: number;
  native_range: string[];
  native_region_summary: string;
  original_ph_min: number | null;
  original_ph_max: number | null;
  original_temp_min_c: number | null;
  original_temp_max_c: number | null;
  evidence: string[];
  sources: string[];
  discovery_locality: string;
  etymology_text?: string;
  wikispecies_tl?: string;
}

export interface CrossKingdomConnection {
  version: string;
  threshold: number;
  plant_count: number;
  fish_count: number;
  total_links: number;
  plant_connections: Record<string, Array<{ pn: string; c: number }>>;
}

export interface Discoverer {
  name: string;
  slug: string;
  birth_year: number | null;
  death_year: number | null;
  nationality: string;
  specialization: string;
  bio: string;
  species_described: string[];
  species_count: number;
  metadata: Record<string, unknown>;
}

export interface Collector {
  collector_name: string;
  normalized_name: string;
  species_count: number;
  occurrence_count: number;
  year_range: string;
  countries: string[];
  co_collectors: string[];
  gbif_co_collectors: string[];
  families_covered: string[];
  summary_narrative: string;
  species: Array<{
    scientific_name: string;
    family: string | null;
    common_name: string | null;
  }>;
}

export interface Cultivar {
  assignee: string;
  confidence_score: number;
  cultivar_name: string;
  genus: string;
  inventor: string[];
  is_high_confidence: boolean;
  originator: string;
  patent_id: string;
  source_type: string;
  source_url: string[];
  title: string;
}

export interface CultivarDetail {
  cultivar_name: string;
  genus: string;
  originator: string;
  introduced: string;
  patent: string;
  parentage: string;
  notes: string;
  disputes: string;
}

export interface ControversyIndex {
  generated: string;
  source: string;
  total_records: number;
  total_controversies: number;
  unresolved_count: number;
  by_topic: Record<string, unknown>;
  by_genus: Record<string, unknown>;
}

class EndemicDB {
  private initialized = false;
  
  fishSpecies = new Map<string, FishSpecies>();
  biotopes = new Map<string, Biotope>();
  crossKingdom: CrossKingdomConnection | null = null;
  discoverers = new Map<string, Discoverer>();
  collectors: Collector[] = [];
  cultivars = new Map<string, Cultivar>();
  cultivarDetails: CultivarDetail[] = [];
  controversies: ControversyIndex | null = null;
  wikipediaArticles: Record<string, string> = {};
  etyfishPages: Array<Record<string, unknown>> = [];

  private loadJSON<T>(filepath: string): T {
    if (!fs.existsSync(filepath)) {
      console.warn(`[EndemicDB] File not found: ${filepath}`);
      return {} as T;
    }
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content) as T;
  }

  private loadCSV<T>(filepath: string): T[] {
    if (!fs.existsSync(filepath)) return [];
    const content = fs.readFileSync(filepath, 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    return lines.slice(1).map(line => {
      const values = this.parseCSVLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = (values[i] || '').replace(/"/g, '').trim(); });
      return obj as unknown as T;
    });
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  init() {
    if (this.initialized) return;
    
    console.log('[EndemicDB] Loading AquaTrack data...');
    
    const speciesData = this.loadJSON<FishSpecies[]>(
      path.join(DATA_ROOT, 'aquatrack', 'species_traits_flat.json')
    );
    for (const s of speciesData) {
      const slug = s.scientific_name.toLowerCase().replace(/ /g, '-');
      this.fishSpecies.set(slug, s);
    }
    console.log(`[EndemicDB] Loaded ${this.fishSpecies.size} fish species`);

    const biotopeData = this.loadJSON<Biotope[]>(
      path.join(DATA_ROOT, 'aquatrack', 'biotope_enriched.json')
    );
    for (const b of biotopeData) {
      this.biotopes.set(b.primary_biotope, b);
    }
    console.log(`[EndemicDB] Loaded ${this.biotopes.size} biotopes`);

    this.crossKingdom = this.loadJSON<CrossKingdomConnection>(
      path.join(DATA_ROOT, 'aquatrack', 'cross_kingdom_connections.json')
    );
    console.log(`[EndemicDB] Cross-kingdom: ${this.crossKingdom?.total_links} links`);

    const collectorData = this.loadJSON<{ _meta: unknown; collectors: Collector[] }>(
      path.join(DATA_ROOT, 'aquatrack', 'collector_stories.json')
    );
    this.collectors = collectorData.collectors || [];
    console.log(`[EndemicDB] Loaded ${this.collectors.length} collectors`);

    this.wikipediaArticles = this.loadJSON<Record<string, string>>(
      path.join(DATA_ROOT, 'aquatrack', 'wikipedia_articles.json')
    );
    console.log(`[EndemicDB] Wikipedia articles: ${Object.keys(this.wikipediaArticles).length}`);

    this.etyfishPages = this.loadJSON<Array<Record<string, unknown>>>(
      path.join(DATA_ROOT, 'aquatrack', 'etyfish_pages.json')
    );

    console.log('[EndemicDB] Loading discoverer pages...');
    this.loadDiscovererPages(path.join(DATA_ROOT, 'aquatrack', 'discoverer_pages'));
    console.log(`[EndemicDB] Loaded ${this.discoverers.size} discoverers`);

    console.log('[EndemicDB] Loading FloraTrack data...');
    this.loadFloraTrackData();
    
    this.initialized = true;
    console.log('[EndemicDB] Initialization complete');
  }

  private loadDiscovererPages(root: string) {
    if (!fs.existsSync(root)) return;
    
    const dirs = fs.readdirSync(root);
    for (const dir of dirs) {
      const metadataPath = path.join(root, dir, 'metadata.json');
      if (fs.existsSync(metadataPath)) {
        const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        const slug = dir.toLowerCase().replace(/ /g, '-').replace(/\(ichthyologist\)/g, '').trim();
        this.discoverers.set(slug, {
          name: dir.replace(/_/g, ' ').replace(/\(ichthyologist\)/g, '').trim(),
          slug,
          birth_year: meta.birth_year || null,
          death_year: meta.death_year || null,
          nationality: meta.nationality || '',
          specialization: meta.specialization || '',
          bio: meta.bio || '',
          species_described: meta.species_described || [],
          species_count: meta.species_count || 0,
          metadata: meta
        });
      }
    }
  }

  private loadFloraTrackData() {
    const cultivarsDir = path.join(DATA_ROOT, 'floratrack', 'cultivars');
    
    const cultivarCSV = path.join(cultivarsDir, 'cultivar_master_reconciled.csv');
    if (fs.existsSync(cultivarCSV)) {
      const cultivars = this.loadCSV<Cultivar>(cultivarCSV);
      for (const c of cultivars) {
        if (c.cultivar_name) {
          const slug = c.cultivar_name.toLowerCase().replace(/ /g, '-');
          this.cultivars.set(slug, c);
        }
      }
      console.log(`[EndemicDB] Loaded ${this.cultivars.size} cultivars`);
    }

    const controversyPath = path.join(cultivarsDir, 'controversy_index.json');
    if (fs.existsSync(controversyPath)) {
      this.controversies = this.loadJSON<ControversyIndex>(controversyPath);
    }

    const researchPath = path.join(cultivarsDir, 'Aroid Cultivar Research Findings.txt');
    if (fs.existsSync(researchPath)) {
      const content = fs.readFileSync(researchPath, 'utf-8');
      this.parseCultivarDetails(content);
    }
  }

  private parseCultivarDetails(content: string) {
    const lines = content.split('\n');
    let current: Partial<CultivarDetail> = {};
    for (const line of lines) {
      if (line.startsWith('---') || line.trim() === '') continue;
      if (line.match(/^[A-Z][a-z]+/)) {
        if (current.cultivar_name) this.cultivarDetails.push(current as CultivarDetail);
        const parts = line.split('\t');
        if (parts.length >= 4) {
          current = {
            cultivar_name: parts[0].trim(),
            genus: parts[1]?.trim() || '',
            originator: parts[2]?.trim() || '',
            introduced: parts[3]?.trim() || '',
            patent: parts[4]?.trim() || '',
            parentage: parts[5]?.trim() || '',
            notes: parts[6]?.trim() || '',
            disputes: parts[7]?.trim() || ''
          };
        }
      }
    }
    if (current.cultivar_name) this.cultivarDetails.push(current as CultivarDetail);
    console.log(`[EndemicDB] Parsed ${this.cultivarDetails.length} cultivar details`);
  }

  // Query methods
  getFishSpecies(slug: string): FishSpecies | undefined {
    return this.fishSpecies.get(slug.toLowerCase());
  }

  getFishSpeciesByScientificName(name: string): FishSpecies | undefined {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.fishSpecies.get(slug);
  }

  getFishSpeciesByGenus(genus: string): FishSpecies[] {
    return Array.from(this.fishSpecies.values()).filter(s => 
      s.genus.toLowerCase() === genus.toLowerCase()
    );
  }

  getFishSpeciesByBiotope(biotope: string): FishSpecies[] {
    return Array.from(this.fishSpecies.values()).filter(s => 
      s.biotope_type === biotope
    );
  }

  getBiotope(slug: string): Biotope | undefined {
    return this.biotopes.get(slug);
  }

  getAllBiotopes(): Biotope[] {
    return Array.from(this.biotopes.values());
  }

  getCrossKingdomForFish(speciesSlug: string): Array<{ pn: string; c: number }> {
    if (!this.crossKingdom) return [];
    const species = this.getFishSpecies(speciesSlug);
    if (!species) return [];
    return this.crossKingdom.plant_connections[species.scientific_name] || [];
  }

  getCrossKingdomForPlant(plantName: string): Array<{ pn: string; c: number }> {
    if (!this.crossKingdom) return [];
    return this.crossKingdom.plant_connections[plantName] || [];
  }

  getDiscoverer(slug: string): Discoverer | undefined {
    return this.discoverers.get(slug.toLowerCase());
  }

  getDiscovererByName(name: string): Discoverer | undefined {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.discoverers.get(slug);
  }

  getCollector(slug: string): Collector | undefined {
    const normalized = slug.toLowerCase().replace(/-/g, ' ');
    return this.collectors.find(c => 
      c.normalized_name.toLowerCase() === normalized
    );
  }

  getCultivar(slug: string): Cultivar | undefined {
    return this.cultivars.get(slug.toLowerCase());
  }

  getCultivarByName(name: string): Cultivar | undefined {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.cultivars.get(slug);
  }

  getCultivarDetail(name: string): CultivarDetail | undefined {
    return this.cultivarDetails.find(c => 
      c.cultivar_name.toLowerCase() === name.toLowerCase()
    );
  }

  getCultivarsByGenus(genus: string): CultivarDetail[] {
    return this.cultivarDetails.filter(c => 
      c.genus.toLowerCase() === genus.toLowerCase()
    );
  }

  getWikipediaArticle(title: string): string | undefined {
    return this.wikipediaArticles[title];
  }

  searchSpecies(query: string): FishSpecies[] {
    const q = query.toLowerCase();
    return Array.from(this.fishSpecies.values()).filter(s => 
      s.scientific_name.toLowerCase().includes(q) ||
      s.common_name.toLowerCase().includes(q) ||
      s.genus.toLowerCase().includes(q)
    );
  }
}

export const db = new EndemicDB();