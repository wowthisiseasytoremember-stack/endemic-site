export type EntityType = 'species' | 'discoverer' | 'biotope' | 'cultivar' | 'video' | 'product';

export interface BaseEntity {
  slug: string;
  name: string;
  type: EntityType;
  route: string;
  articleSlug?: string;
  description?: string;
}

export interface VideoEntity extends BaseEntity {
  type: 'video';
  videoId: string;
}

export interface ProductEntity extends BaseEntity {
  type: 'product';
  price: string;
  thumbnail: string;
}

export type Entity = BaseEntity | VideoEntity | ProductEntity;

export const ENTITIES: Entity[] = [
  // Species
  { slug: 'tetraodon-mbu', name: 'Mbu Puffer', type: 'species', route: '/aquatrack/species/tetraodon-mbu', articleSlug: 'a-puffer', description: 'Giant Puffer — 670mm, Congo Basin. pH 7.0–8.0, 24–26°C.' },
  { slug: 'carinotetraodon-travancoricus', name: 'Pea Puffer', type: 'species', route: '/aquatrack/species/carinotetraodon-travancoricus', articleSlug: 'a-puffer', description: 'Dwarf Puffer — 25mm, Kerala backwaters. pH 6.8–8.0, 22–28°C.' },
  { slug: 'colomesus-asellus', name: 'Amazon Puffer', type: 'species', route: '/aquatrack/species/colomesus-asellus', articleSlug: 'a-puffer', description: 'Amazon Puffer — 75mm, Amazon/Orinoco. Schools in whitewater channels.' },
  { slug: 'tetraodon-lineatus', name: 'Fahaka Puffer', type: 'species', route: '/aquatrack/species/tetraodon-lineatus', articleSlug: 'a-puffer', description: 'Nile Puffer — 450mm, Nile basin. Named by Linnaeus, 1758.' },
  { slug: 'tetraodon-miurus', name: 'Potato Puffer', type: 'species', route: '/aquatrack/species/tetraodon-miurus', articleSlug: 'a-puffer', description: 'Congo Puffer — 150mm, Congo basin. True ambush predator.' },
  { slug: 'dichotomyctere-nigroviridis', name: 'Green Spotted Puffer', type: 'species', route: '/aquatrack/species/dichotomyctere-nigroviridis', articleSlug: 'a-puffer', description: 'GSP — 150mm, SE Asian estuarine. Smallest vertebrate genome (340M bp).' },
  { slug: 'dichotomyctere-ocellatus', name: 'Figure 8 Puffer', type: 'species', route: '/aquatrack/species/dichotomyctere-ocellatus', articleSlug: 'a-puffer', description: 'Figure 8 Puffer — 75mm, SE Asian brackish. Maze-solving intelligence.' },
  { slug: 'dichotomyctere-fluviatilis', name: 'Ceylon Puffer', type: 'species', route: '/aquatrack/species/dichotomyctere-fluviatilis', articleSlug: 'a-puffer', description: 'Ceylon Puffer — 150mm+, Sri Lanka/SE Asia. Brackish specialist.' },
  { slug: 'carinotetraodon-lorteti', name: 'Redeye Puffer', type: 'species', route: '/aquatrack/species/carinotetraodon-lorteti', articleSlug: 'a-puffer', description: 'Red-tailed Puffer — 60mm, Mekong basin. Softwater specialist.' },
  { slug: 'carinotetraodon-irrubesco', name: 'Red-tailed Red-eye Puffer', type: 'species', route: '/aquatrack/species/carinotetraodon-irrubesco', articleSlug: 'a-puffer', description: 'Red-tail Puffer — 45mm, Sumatra/Borneo blackwater streams.' },
  { slug: 'pao-palembangensis', name: 'Dragon Puffer', type: 'species', route: '/aquatrack/species/pao-palembangensis', articleSlug: 'a-puffer', description: 'Dragon Puffer — 200mm, Thailand/Laos/Malaysia/Indonesia. Leaf-mimic ambush forager.' },
  { slug: 'pao-baileyi', name: 'Hairy Puffer', type: 'species', route: '/aquatrack/species/pao-baileyi', articleSlug: 'a-puffer', description: 'Hairy Puffer — 120mm, Mekong basin. Fast rocky runs, ambush predator.' },
  { slug: 'chromobotia-macracanthus', name: 'Clown Loach', type: 'species', route: '/aquatrack/species/chromobotia-macracanthus', articleSlug: 'b-bleeker', description: 'Clown Loach — 300mm, Borneo/Sumatra. Schooling in flooded forest.' },
  { slug: 'balantiocheilos-melanopterus', name: 'Bala Shark', type: 'species', route: '/aquatrack/species/balantiocheilos-melanopterus', articleSlug: 'b-bleeker', description: 'Bala Shark — 350mm, SE Asia. Black-tipped fins (melanopterus).' },
  { slug: 'barbonymus-schwanenfeldii', name: 'Tinfoil Barb', type: 'species', route: '/aquatrack/species/barbonymus-schwanenfeldii', articleSlug: 'b-bleeker', description: 'Tinfoil Barb — 350mm, SE Asia. Common large community fish.' },
  { slug: 'trichopodus-leerii', name: 'Pearl Gourami', type: 'species', route: '/aquatrack/species/trichopodus-leerii', articleSlug: 'b-bleeker', description: 'Pearl Gourami — 120mm, SE Asia. One of the most beautiful labyrinth fish.' },
  { slug: 'acanthicus-hystrix', name: 'Lyre Tail Pleco', type: 'species', route: '/aquatrack/species/acanthicus-hystrix', articleSlug: 'f-rio-negro', description: 'Lyre Tail Pleco — 1000mm, Amazon basin. Deep river channels, driftwood.' },
  { slug: 'abramites-hypselonotus', name: 'Marbled Headstander', type: 'species', route: '/aquatrack/species/abramites-hypselonotus', articleSlug: 'f-rio-negro', description: 'Marbled Headstander — 140mm, Amazon/Orinoco. Vegetated margins.' },
  { slug: 'paracheirodon-axelrodi', name: 'Cardinal Tetra', type: 'species', route: '/aquatrack/species/paracheirodon-axelrodi', articleSlug: 'f-rio-negro', description: 'Cardinal Tetra — 30mm, Rio Negro floodplain. Structural coloration (guanine crystals).' },
  { slug: 'apistogramma-agassizii', name: 'Agassiz Dwarf Cichlid', type: 'species', route: '/aquatrack/species/apistogramma-agassizii', articleSlug: 'f-rio-negro', description: 'Apistogramma agassizii — Rio Negro. Cave spawner, pH 4.5-5.5.' },
  { slug: 'nannostomus-eques', name: 'Brown Pencilfish', type: 'species', route: '/aquatrack/species/nannostomus-eques', articleSlug: 'f-rio-negro', description: 'Nannostomus eques — Head-standing behavior for surface prey ambush.' },

  // Discoverers
  { slug: 'pieter-bleeker', name: 'Pieter Bleeker', type: 'discoverer', route: '/read/discoverer/pieter-bleeker', articleSlug: 'b-bleeker', description: 'Dutch army surgeon who described 1,925 fish species from Batavia fish markets (1842–1860).' },
  { slug: 'george-albert-boulenger', name: 'George Albert Boulenger', type: 'discoverer', route: '/read/discoverer/george-albert-boulenger', articleSlug: 'b-bleeker', description: 'Belgian-British ichthyologist at British Museum. Described 1,096 fish species without ever traveling.' },
  { slug: 'louis-agassiz', name: 'Louis Agassiz', type: 'discoverer', route: '/read/discoverer/louis-agassiz', articleSlug: 'b-bleeker', description: 'Swiss-American naturalist. Founded Harvard Museum of Comparative Zoology. Discovered ice ages.' },
  { slug: 'charles-tate-regan', name: 'Charles Tate Regan', type: 'discoverer', route: '/read/discoverer/charles-tate-regan', articleSlug: 'b-bleeker', description: 'British ichthyologist who named Betta splendens (1910) and hundreds of cichlids.' },
  { slug: 'johann-natterer', name: 'Johann Natterer', type: 'discoverer', route: '/read/discoverer/johann-natterer', articleSlug: 'b-bleeker', description: 'Austrian naturalist. 18 years (1817–1835) in Brazil. 60,000+ specimens. nattereri epithets.' },
  { slug: 'sundar-lal-hora', name: 'Sundar Lal Hora', type: 'discoverer', route: '/read/discoverer/sundar-lal-hora', articleSlug: 'b-bleeker', description: 'Indian ichthyologist. Named Carinotetraodon travancoricus (1941) from Kerala Pamba River.' },
  { slug: 'achille-valenciennes', name: 'Achille Valenciennes', type: 'discoverer', route: '/read/discoverer/achille-valenciennes', articleSlug: 'b-bleeker', description: 'French zoologist. Co-authored 22-volume Histoire Naturelle des Poissons with Cuvier.' },
  { slug: 'heinrich-wilhelm-schott', name: 'Heinrich Wilhelm Schott', type: 'discoverer', route: '/read/discoverer/heinrich-wilhelm-schott', articleSlug: 'd-schott', description: 'Austrian botanist. Director of Imperial Gardens at Schönbrunn. 126+ Anthurium species — one man, one genus, 40-year career.' },
  { slug: 'thomas-lobb', name: 'Thomas Lobb', type: 'discoverer', route: '/read/discoverer/thomas-lobb', articleSlug: 'd-schott', description: 'English plant collector for Veitch Nurseries. First domesticated Monstera introduced to Europe.' },
  { slug: 'john-lindley', name: 'John Lindley', type: 'discoverer', route: '/read/discoverer/john-lindley', articleSlug: 'd-schott', description: 'English botanist. First professor of botany at UCL. Secretary of RHS. lindleyi epithet on dozens of species.' },

  // Biotopes
  { slug: 'congo-basin', name: 'Congo Basin', type: 'biotope', route: '/aquatrack/biotope/congo-basin', articleSlug: 'f-rio-negro', description: 'Large slow rivers & Lake Tanganyika margins. Home to Tetraodon mbu, T. miurus.' },
  { slug: 'rio-negro', name: 'Rio Negro', type: 'biotope', route: '/aquatrack/biotope/rio-negro', articleSlug: 'f-rio-negro', description: 'Largest blackwater river on Earth. pH 4.5–5.5, <1°dGH, 5–30 µS/cm. Cardinal tetras, Apistogramma, pencilfish.' },
  { slug: 'orinoco-basin', name: 'Orinoco Basin', type: 'biotope', route: '/aquatrack/biotope/orinoco-basin', articleSlug: 'f-rio-negro', description: 'Blackwater & whitewater mix. Marbled Headstander + Banded Puffer + Lyre Tail Pleco share this system. 83% biotope match.' },
  { slug: 'pamba-river', name: 'Pamba River', type: 'biotope', route: '/aquatrack/biotope/pamba-river', articleSlug: 'a-puffer', description: 'Kerala, Western Ghats. Slow vegetated backwaters. Endemic home of Carinotetraodon travancoricus (Pea Puffer).' },
  { slug: 'mekong-river', name: 'Mekong River', type: 'biotope', route: '/aquatrack/biotope/mekong-river', articleSlug: 'a-puffer', description: 'SE Asia. Fast rocky runs (Pao baileyi) to slow vegetated tributaries (Carinotetraodon lorteti).' },
  { slug: 'nile-river', name: 'Nile River', type: 'biotope', route: '/aquatrack/biotope/nile-river', articleSlug: 'a-puffer', description: 'Nile, Chad, Senegal, Gambia, Volta basins. Open water, vegetated banks. Tetraodon lineatus (Linnaeus, 1758).' },
  { slug: 'amazon-basin', name: 'Amazon Basin', type: 'biotope', route: '/aquatrack/biotope/amazon-basin', articleSlug: 'a-puffer', description: 'Amazon, Orinoco, Essequibo. Sandbars, floodplain lakes, rapids. Colomesus asellus schools in whitewater channels.' },
  { slug: 'kerala-streams', name: 'Kerala Streams', type: 'biotope', route: '/aquatrack/biotope/kerala-streams', articleSlug: 'a-puffer', description: 'Western Ghats biodiversity hotspot. Fast tannin-rich streams. Carinotetraodon lorteti, C. travancoricus.' },
  { slug: 'se-asian-estuarine', name: 'SE Asian Estuarine', type: 'biotope', route: '/aquatrack/biotope/se-asian-estuarine', articleSlug: 'a-puffer', description: 'Brackish transition zones. Dichotomyctere nigroviridis (GSP) needs SG 1.015–1.022 as adult. Ontogenetic salinity shift.' },
  { slug: 'sri-lanka-estuaries', name: 'Sri Lanka Estuaries', type: 'biotope', route: '/aquatrack/biotope/sri-lanka-estuaries', articleSlug: 'a-puffer', description: 'Dichotomyctere fluviatilis (Ceylon Puffer) — robust, personable, brackish specialist.' },
  { slug: 'borneo-blackwater', name: 'Borneo Blackwater', type: 'biotope', route: '/aquatrack/biotope/borneo-blackwater', articleSlug: 'a-puffer', description: 'Peat-stained streams. Carinotetraodon irrubesco — males flash red tail and ventral keel during display.' },

  // Cultivars
  { slug: 'pink-princess', name: 'Pink Princess', type: 'cultivar', route: '/floratrack/cultivar/pink-princess', articleSlug: 'e-pink-princess', description: 'Philodendron erubescens var. — Periclinal chimera (L1/L2/L3 layer rearrangement). Unstable variegation. USPP31149.' },
  { slug: 'thai-constellation', name: 'Thai Constellation', type: 'cultivar', route: '/floratrack/cultivar/thai-constellation', articleSlug: 'e-pink-princess', description: 'Monstera deliciosa — Three competing origin theories. Costa Farms patent on file, expiry unverified.' },
  { slug: 'white-princess', name: 'White Princess', type: 'cultivar', route: '/floratrack/cultivar/white-princess', articleSlug: 'e-pink-princess', description: 'Philodendron — Patent application exists for "White Ice Philodendron" from self-pollination in Umatilla, Florida.' },
  { slug: 'white-knight', name: 'White Knight', type: 'cultivar', route: '/floratrack/cultivar/white-knight', articleSlug: 'e-pink-princess', description: 'Philodendron — H. Lincoln Foster introduced to US (1948). Parentage disputed: P. squamiferum × P. corrugatum vs P. erubescens mutation.' },
  { slug: 'florida-ghost', name: 'Florida Ghost', type: 'cultivar', route: '/floratrack/cultivar/florida-ghost', articleSlug: 'e-pink-princess', description: 'Philodendron — Robert McColley, 1950s. P. pedatum × P. squamiferum. 1958 photo of McColley with original hybrid exists.' },
  { slug: 'prince-of-orange', name: 'Prince of Orange', type: 'cultivar', route: '/floratrack/cultivar/prince-of-orange', articleSlug: 'e-pink-princess', description: 'Philodendron — Robert McColley, ~1970s. USPP3958P. Complex hybrid: P. domesticum, P. erubescens, P. wendlandii, P. imbe.' },
  { slug: 'mccolleys-finale', name: "McColley's Finale", type: 'cultivar', route: '/floratrack/cultivar/mccolleys-finale', articleSlug: 'e-pink-princess', description: "Philodendron — Robert McColley, ~1970s. Patented hybrid." },
  { slug: 'anthurium-crystallinum', name: 'Anthurium crystallinum', type: 'cultivar', route: '/floratrack/cultivar/anthurium-crystallinum', articleSlug: 'd-schott', description: 'Crystal Anthurium — Linden & André, 1873. Colombian rainforest epiphyte. Schott described 126+ Anthurium species at Schönbrunn.' },
  // Videos
  { slug: 'yt-blackwater-setup', name: 'Setting up a Rio Negro Biotope', type: 'video', route: 'https://youtube.com/watch?v=XYZ', videoId: 'XYZ', articleSlug: 'f-rio-negro', description: 'Step by step guide to tannin-stained waters.' },
  
  // Products
  { slug: 'ada-amazonia', name: 'ADA Aqua Soil Amazonia', type: 'product', route: 'https://store.link/ada', price: '$45.00', thumbnail: '/images/products/ada-amazonia.jpg', articleSlug: 'f-rio-negro', description: 'Premium substrate for acidic environments.' },
  { slug: 'catappa-leaves', name: 'Indian Almond Leaves', type: 'product', route: 'https://store.link/leaves', price: '$12.99', thumbnail: '/images/products/leaves.jpg', articleSlug: 'f-rio-negro', description: 'Natural tannin release and microfauna grazing.' }
];

export function getEntity(slug: string): Entity | undefined {
  return ENTITIES.find(e => e.slug === slug);
}

export function getEntityByRoute(route: string): Entity | undefined {
  return ENTITIES.find(e => e.route === route);
}

export function getEntitiesByType(type: EntityType): Entity[] {
  return ENTITIES.filter(e => e.type === type);
}

export function getEntitiesByArticle(articleSlug: string): Entity[] {
  return ENTITIES.filter(e => e.articleSlug === articleSlug);
}