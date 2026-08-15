// All content data sourced from the real SQLite / JSON exports described in the brief.

export type SpeciesSeed = {
  slug: string;
  kingdom: "fish" | "plant";
  scientificName: string;
  commonNames: string;
  discoverer: string;
  discoveredYear: number | null;
  temperature?: string;
  phRange?: string;
  nativeRange?: string;
  biotope?: string;
  diet?: string;
  maxSize?: string;
  etymology?: string;
  conservation?: string;
  gpsLat?: string;
  gpsLng?: string;
};

export const fishSpecies: SpeciesSeed[] = [
  {
    slug: "tetraodon-mbu",
    kingdom: "fish",
    scientificName: "Tetraodon mbu",
    commonNames: "Giant Puffer, Mbu Puffer",
    discoverer: "Boulenger",
    discoveredYear: 1899,
    temperature: "24–26°C",
    phRange: "7.0–8.0",
    nativeRange: "Central African Rep., Congo, DR Congo, Tanzania",
    biotope: "Congo Basin — large slow rivers & Lake Tanganyika margins",
    diet: "Piscivore",
    maxSize: '670mm (26")',
    etymology: '"mbu" from the local Congolese name for the fish',
    conservation: "Least Concern",
    gpsLat: "-4.32",
    gpsLng: "15.31",
  },
  {
    slug: "carinotetraodon-travancoricus",
    kingdom: "fish",
    scientificName: "Carinotetraodon travancoricus",
    commonNames: "Dwarf Puffer, Pea Puffer",
    discoverer: "Hora & Nair",
    discoveredYear: 1941,
    temperature: "22–28°C",
    phRange: "6.8–8.0",
    nativeRange: "India (Kerala, Karnataka)",
    biotope: "Indian subcontinent stream — soft, acidic, slow-moving",
    diet: "Carnivore (snails, worms)",
    maxSize: '25mm (1")',
    etymology: '"travancoricus" = from Travancore, the former princely state of the Pamba River',
    conservation: "Endangered — endemic to Kerala",
    gpsLat: "9.356655",
    gpsLng: "76.470033",
  },
  {
    slug: "tetraodon-lineatus",
    kingdom: "fish",
    scientificName: "Tetraodon lineatus",
    commonNames: "Fahaka Puffer, Nile Puffer",
    discoverer: "Linnaeus",
    discoveredYear: 1758,
    temperature: "24–26°C",
    phRange: "7.0–8.0",
    nativeRange: "Nile, Niger, Volta, Gambia, Senegal basins",
    biotope: "Nile River — open water, vegetated banks",
    diet: "Molluscivore",
    maxSize: '450mm (18")',
    etymology: '"lineatus" = lined, for its yellow body stripes',
    conservation: "Least Concern",
    gpsLat: "15.50",
    gpsLng: "32.56",
  },
  {
    slug: "carinotetraodon-irrubesco",
    kingdom: "fish",
    scientificName: "Carinotetraodon irrubesco",
    commonNames: "Red-tailed Red-eye Puffer",
    discoverer: "Tan",
    discoveredYear: 1999,
    temperature: "23–28°C",
    phRange: "6.0–7.5",
    nativeRange: "Sumatra & Borneo, Indonesia",
    biotope: "SE Asian blackwater stream",
    diet: "Carnivore",
    maxSize: '45mm (1.8")',
    conservation: "Data Deficient",
    gpsLat: "1.48",
    gpsLng: "103.75",
  },
  {
    slug: "carinotetraodon-lorteti",
    kingdom: "fish",
    scientificName: "Carinotetraodon lorteti",
    commonNames: "Redeye Puffer",
    discoverer: "Tirant",
    discoveredYear: 1885,
    temperature: "23–27°C",
    phRange: "5.5–7.5",
    nativeRange: "Mekong basin — Thailand, Cambodia, Vietnam",
    biotope: "Mekong — slow vegetated tributaries",
    diet: "Micropredator",
    maxSize: '60mm (2.4")',
    gpsLat: "13.36",
    gpsLng: "103.86",
  },
  {
    slug: "colomesus-asellus",
    kingdom: "fish",
    scientificName: "Colomesus asellus",
    commonNames: "Amazon Puffer, South American Puffer",
    discoverer: "Müller & Troschel",
    discoveredYear: 1849,
    temperature: "22–26°C",
    phRange: "5.5–7.5",
    nativeRange: "Amazon & Orinoco basins",
    biotope: "Rio Negro / Amazon — schooling, whitewater & blackwater",
    diet: "Molluscivore",
    maxSize: '150mm (6")',
    conservation: "Least Concern",
    gpsLat: "-3.13",
    gpsLng: "-60.02",
  },
  {
    slug: "colomesus-psittacus",
    kingdom: "fish",
    scientificName: "Colomesus psittacus",
    commonNames: "Banded Puffer, Parrot Puffer",
    discoverer: "Bloch & Schneider",
    discoveredYear: 1801,
    temperature: "24–28°C",
    phRange: "7.0–8.5",
    nativeRange: "Coastal N. South America — Orinoco to Amazon estuaries",
    biotope: "Orinoco basin — brackish estuary",
    diet: "Molluscivore",
    maxSize: '300mm (12")',
    gpsLat: "4.75",
    gpsLng: "-51.53",
  },
  {
    slug: "pao-baileyi",
    kingdom: "fish",
    scientificName: "Pao baileyi",
    commonNames: "Hairy Puffer",
    discoverer: "Sontirat",
    discoveredYear: 1989,
    temperature: "24–28°C",
    phRange: "6.0–7.5",
    nativeRange: "Mekong basin — Laos, Thailand",
    biotope: "Mekong — fast rocky runs, ambush predator",
    diet: "Piscivore",
    maxSize: '120mm (4.7")',
    gpsLat: "17.96",
    gpsLng: "102.63",
  },
  {
    slug: "tetraodon-miurus",
    kingdom: "fish",
    scientificName: "Tetraodon miurus",
    commonNames: "Congo Puffer, Potato Puffer",
    discoverer: "Boulenger",
    discoveredYear: 1902,
    temperature: "24–26°C",
    phRange: "6.5–7.5",
    nativeRange: "Congo River basin",
    biotope: "Congo Basin — sandy substrate ambush predator",
    diet: "Piscivore (ambush)",
    maxSize: '150mm (6")',
    etymology: '"miurus" = short-tailed',
    gpsLat: "-1.61",
    gpsLng: "16.10",
  },
  {
    slug: "tetraodon-pustulatus",
    kingdom: "fish",
    scientificName: "Tetraodon pustulatus",
    commonNames: "Cross River Puffer",
    discoverer: "Murray",
    discoveredYear: 1857,
    temperature: "24–27°C",
    phRange: "6.5–7.5",
    nativeRange: "Cross River, Nigeria/Cameroon",
    biotope: "West African river — endemic",
    diet: "Molluscivore",
    maxSize: '110mm (4.3")',
    conservation: "Data Deficient",
    gpsLat: "5.76",
    gpsLng: "8.60",
  },
  {
    slug: "sphoeroides-greeleyi",
    kingdom: "fish",
    scientificName: "Sphoeroides greeleyi",
    commonNames: "Greeley's Puffer",
    discoverer: "Gilbert",
    discoveredYear: 1900,
    temperature: "22–27°C",
    phRange: "7.5–8.4",
    nativeRange: "W. Atlantic — Brazil to Argentina estuaries",
    biotope: "Atlantic coastal estuary — brackish/marine",
    diet: "Carnivore",
    maxSize: '170mm (6.7")',
    gpsLat: "-25.50",
    gpsLng: "-48.51",
  },
  {
    slug: "abramites-hypselonotus",
    kingdom: "fish",
    scientificName: "Abramites hypselonotus",
    commonNames: "Marbled Headstander",
    discoverer: "Günther",
    discoveredYear: 1868,
    temperature: "23–27°C",
    phRange: "6.0–7.5",
    nativeRange: "Amazon & Orinoco basins",
    biotope: "Rio Negro / Orinoco — vegetated margins",
    diet: "Omnivore",
    maxSize: '140mm (5.5")',
    gpsLat: "-32.91",
    gpsLng: "-60.67",
  },
  {
    slug: "acanthicus-hystrix",
    kingdom: "fish",
    scientificName: "Acanthicus hystrix",
    commonNames: "Lyre Tail Pleco",
    discoverer: "Spix & Agassiz",
    discoveredYear: 1829,
    temperature: "23–28°C",
    phRange: "6.0–7.5",
    nativeRange: "Amazon basin",
    biotope: "Amazon — deep river channels, driftwood",
    diet: "Omnivore",
    maxSize: '1000mm (39")',
    gpsLat: "2.58",
    gpsLng: "-72.87",
  },
  {
    slug: "chromobotia-macracanthus",
    kingdom: "fish",
    scientificName: "Chromobotia macracanthus",
    commonNames: "Clown Loach",
    discoverer: "Bleeker",
    discoveredYear: 1852,
    temperature: "25–30°C",
    phRange: "6.0–7.5",
    nativeRange: "Borneo & Sumatra, Indonesia",
    biotope: "SE Asian river — schooling in flooded forest",
    diet: "Omnivore",
    maxSize: '300mm (12")',
    gpsLat: "-0.50",
    gpsLng: "101.44",
  },
  {
    slug: "betta-splendens",
    kingdom: "fish",
    scientificName: "Betta splendens",
    commonNames: "Siamese Fighting Fish",
    discoverer: "Regan",
    discoveredYear: 1910,
    temperature: "24–30°C",
    phRange: "6.0–8.0",
    nativeRange: "Mekong basin — Thailand, Cambodia",
    biotope: "Mekong floodplain — rice paddies, still water",
    diet: "Carnivore",
    maxSize: '70mm (2.8")',
    conservation: "Vulnerable (wild)",
    gpsLat: "14.60",
    gpsLng: "100.98",
  },
  {
    slug: "dario-dario",
    kingdom: "fish",
    scientificName: "Dario dario",
    commonNames: "Scarlet Badis",
    discoverer: "Hamilton",
    discoveredYear: 1822,
    temperature: "22–28°C",
    phRange: "6.5–7.5",
    nativeRange: "India — West Bengal, Assam",
    biotope: "Indian subcontinent stream — shallow, vegetated",
    diet: "Micropredator",
    maxSize: '20mm (0.8")',
    gpsLat: "26.72",
    gpsLng: "89.38",
  },
];

export const plantSpecies: SpeciesSeed[] = [
  {
    slug: "anthurium-crystallinum",
    kingdom: "plant",
    scientificName: "Anthurium crystallinum",
    commonNames: "Crystal Anthurium",
    discoverer: "Linden & André",
    discoveredYear: 1873,
    temperature: "18–27°C",
    phRange: "5.5–6.5",
    nativeRange: "Colombia, Panama — rainforest understory",
    biotope: "Neotropical rainforest — epiphytic on trees",
    etymology: '"crystallinum" = crystalline, for the sparkling silver veins',
    conservation: "Not Evaluated",
  },
  {
    slug: "monstera-deliciosa",
    kingdom: "plant",
    scientificName: "Monstera deliciosa",
    commonNames: "Swiss Cheese Plant, Thai Constellation (cv.)",
    discoverer: "Liebmann",
    discoveredYear: 1849,
    temperature: "18–27°C",
    phRange: "5.5–7.0",
    nativeRange: "Southern Mexico to Panama",
    biotope: "Central American rainforest — hemiepiphyte",
    etymology: '"deliciosa" = for its edible ripe fruit',
  },
  {
    slug: "philodendron-mccolleys-finale",
    kingdom: "plant",
    scientificName: "Philodendron 'McColley's Finale'",
    commonNames: "McColley's Finale",
    discoverer: "McColley",
    discoveredYear: 1988,
    temperature: "18–27°C",
    phRange: "5.5–7.0",
    nativeRange: "Cultivar (American hybridizer)",
    biotope: "Cultivar — parent stock Neotropical",
  },
  {
    slug: "nepenthes-rajah",
    kingdom: "plant",
    scientificName: "Nepenthes rajah",
    commonNames: "Giant Montane Pitcher Plant",
    discoverer: "Hooker",
    discoveredYear: 1859,
    temperature: "10–25°C",
    phRange: "3.0–5.0",
    nativeRange: "Borneo — Mount Kinabalu, Sabah",
    biotope: "Montane cloud forest — ultramafic soils",
    conservation: "Endangered",
  },
  {
    slug: "dionaea-muscipula",
    kingdom: "plant",
    scientificName: "Dionaea muscipula",
    commonNames: "Venus Flytrap",
    discoverer: "Ellis",
    discoveredYear: 1768,
    temperature: "5–35°C",
    phRange: "3.5–5.0",
    nativeRange: "USA — Carolinas, coastal bog",
    biotope: "North American bog — nutrient-poor, acidic",
    conservation: "Vulnerable",
  },
];

export type DiscovererSeed = {
  slug: string;
  name: string;
  born: number;
  died: number;
  nationality: string;
  keySpecies: string;
  story: string;
  speciesCount: number | null;
};

export const discovererSeeds: DiscovererSeed[] = [
  {
    slug: "pieter-bleeker",
    name: "Pieter Bleeker",
    born: 1819,
    died: 1878,
    nationality: "Dutch",
    keySpecies: "Chromobotia macracanthus (Clown Loach), Betta spp., 500+ SE Asian fish",
    story:
      "Dutch army doctor stationed in Indonesia (then the Dutch East Indies), who described over 500 fish from dinner-market specimens — he'd buy fish at local markets, sketch them, and publish a new species paper by night. One army doctor named half your Southeast Asian tank.",
    speciesCount: 511,
  },
  {
    slug: "george-albert-boulenger",
    name: "George Albert Boulenger",
    born: 1858,
    died: 1937,
    nationality: "Belgian-British",
    keySpecies: "Tetraodon mbu (Giant Puffer), T. miurus (Congo Puffer)",
    story:
      "Belgian-British herpetologist and ichthyologist at the British Museum who described 1,096 fish species — more than any other person — despite never traveling. He worked from specimens sent to London by colonial collectors.",
    speciesCount: 1096,
  },
  {
    slug: "louis-agassiz",
    name: "Louis Agassiz",
    born: 1807,
    died: 1873,
    nationality: "Swiss-American",
    keySpecies: "Acanthicus hystrix (Lyre Tail Pleco, with Spix)",
    story:
      "Swiss-American naturalist who founded the Museum of Comparative Zoology at Harvard. Discovered ice ages. His son Alexander discovered more. The fish davidi (after Father David) and agassizii (after him) are in your tank.",
    speciesCount: null,
  },
  {
    slug: "charles-tate-regan",
    name: "Charles Tate Regan",
    born: 1878,
    died: 1943,
    nationality: "British",
    keySpecies: "Betta splendens (Siamese Fighting Fish)",
    story:
      "British ichthyologist who named the Siamese Fighting Fish in 1910 from specimens sent from Thailand. Also named hundreds of cichlids. The epithet regani appears on fish in your tank.",
    speciesCount: null,
  },
  {
    slug: "johann-natterer",
    name: "Johann Natterer",
    born: 1787,
    died: 1843,
    nationality: "Austrian",
    keySpecies: "Multiple Amazonian catfish, tetras",
    story:
      "Austrian naturalist who spent 18 years (1817–1835) traveling through Brazil, collecting 60,000+ specimens. His name appears as nattereri on fish discovered during that expedition. The entire Brazilian expedition was one man on muleback for nearly two decades.",
    speciesCount: null,
  },
  {
    slug: "sundar-lal-hora",
    name: "Sundar Lal Hora",
    born: 1896,
    died: 1955,
    nationality: "Indian",
    keySpecies: "Carinotetraodon travancoricus (Dwarf Puffer, with Nair, 1941)",
    story:
      "Indian ichthyologist who named the Dwarf Puffer — now the most popular puffer in the aquarium trade — from specimens collected in Kerala's Pamba River. The fish is endemic to that single Indian state.",
    speciesCount: null,
  },
  {
    slug: "achille-valenciennes",
    name: "Achille Valenciennes",
    born: 1794,
    died: 1865,
    nationality: "French",
    keySpecies: "Hundreds of species across 22 volumes of Histoire Naturelle des Poissons",
    story:
      "French zoologist who co-authored the 22-volume encyclopedia of fish with Cuvier. Every time you see valenciennesi in a fish name, that's the dedication.",
    speciesCount: null,
  },
  {
    slug: "heinrich-wilhelm-schott",
    name: "Heinrich Wilhelm Schott",
    born: 1794,
    died: 1865,
    nationality: "Austrian",
    keySpecies: "126 Anthurium species attributed in the FloraTrack database",
    story:
      "Austrian botanist and director of the Imperial Gardens at Vienna's Schönbrunn Palace. 126 Anthurium species trace back to him — one man, one genus, a 40-year career. Every Anthurium crystallinum you buy leads back to Schott.",
    speciesCount: 126,
  },
  {
    slug: "thomas-lobb",
    name: "Thomas Lobb",
    born: 1817,
    died: 1894,
    nationality: "English",
    keySpecies: "First domesticated Monstera introduced to Europe",
    story:
      "English plant collector and plant hunter for Veitch Nurseries who introduced the first domesticated Monstera to Europe. Collected in the Philippines, Indonesia, and Myanmar.",
    speciesCount: null,
  },
  {
    slug: "john-lindley",
    name: "John Lindley",
    born: 1799,
    died: 1865,
    nationality: "English",
    keySpecies: "Named the first orchid; lindleyi appears on dozens of species",
    story:
      "English botanist, the first professor of botany at University College London and Secretary of the Royal Horticultural Society. He named the first orchid — lindleyi appears on dozens of species.",
    speciesCount: null,
  },
];

export const collectors = [
  {
    name: "Tyson R. Roberts",
    species: "272 species / 809 occurrences",
    countries:
      "Bangladesh, Cambodia, Cameroon, Congo, Ghana, India, Indonesia, Laos, Malaysia, Myanmar, Nepal, Thailand, Vietnam",
    countryCount: 13,
    notes:
      "Most prolific modern tropical fish collector. His personal collection forms the backbone of SE Asian ichthyology.",
  },
  {
    name: "Lawrence Page",
    species: "217 species / 2,630 occurrences",
    countries: "Cambodia, Indonesia, Chinese Taipei",
    countryCount: 3,
    notes: "Modern American ichthyologist, specialist in catfishes and loaches.",
  },
  {
    name: "SO Kullander",
    species: "157 species / 816 occurrences",
    countries: "Brazil, Colombia, China, Peru",
    countryCount: 4,
    notes: "Described most South American cichlids. If you keep cichlids, Kullander named them.",
  },
  {
    name: "Albert W. Herre",
    species: "135 species / 379 occurrences",
    countries: "Argentina, China, Hong Kong, Philippines, Singapore",
    countryCount: 5,
    notes:
      "American ichthyologist who spent decades in the Philippines and Asia. Herrei is a common epithet.",
  },
];

export const heroStats = [
  { value: "1,669", label: "aquarium fish species cataloged", sub: "77 data columns per species" },
  { value: "3,066", label: "tropical plants with provenance", sub: "22 genera" },
  { value: "2,593", label: "cultivar patents & origin stories", sub: "35 genera" },
  { value: "757", label: "collectors tracked", sub: "21,152 species links" },
  { value: "533,422", label: "cross-kingdom connections", sub: "fish + plants, same biotope" },
  { value: "20,602", label: "biotope stories", sub: "from real GBIF field notes" },
  { value: "313", label: "tests passing", sub: "0 failing" },
  { value: "33", label: "medication safety warnings", sub: '"Copper kills Amano shrimp"' },
];

export const genusBreakdown = [
  { genus: "Anthurium", count: 1426, note: "Mostly described by Heinrich Schott" },
  { genus: "Nepenthes", count: 356, note: "Largest carnivorous genus in the DB" },
  { genus: "Philodendron", count: 301, note: "Second-most popular aroid genus" },
  { genus: "Begonia", count: 234, note: "Rex, cane, rhizomatous" },
  { genus: "Drosera", count: 232, note: "Sundews" },
  { genus: "Sarracenia", count: 190, note: "North American pitcher plants" },
  { genus: "Alocasia", count: 148, note: "Dragon Scale, Frydek, Cuprea, Jacklyn" },
  { genus: "Hoya", count: 118, note: "Wax plants" },
  { genus: "Pinguicula", count: 77, note: "Butterworts" },
  { genus: "Calathea", count: 68, note: "Prayer plants" },
  { genus: "Ficus", count: 59, note: "Rubber trees, fiddle-leaf figs" },
  { genus: "Dionaea", count: 55, note: "Venus flytraps — every named cultivar" },
  { genus: "Monstera", count: 50, note: "Deliciosa, adansonii, Thai Constellation, Albo" },
  { genus: "Colocasia", count: 46, note: "Taro, elephant ears" },
  { genus: "Aglaonema", count: 42, note: "Chinese evergreens" },
];

export const controversies = [
  {
    cultivar: "Monstera 'Thai Constellation'",
    theories: [
      "1970s roadside find in Thailand",
      "Late-1990s discovery",
      "~2020 tissue-culture development",
    ],
    verdict: "Costa Farms patent on file — expiry status unverified.",
  },
  {
    cultivar: "Philodendron 'Pink Princess'",
    theories: [
      "Real patent covering the variegated genetics",
      "Big-box store plants are a different clone",
      "Same name, different plant",
    ],
    verdict: "Patent real for the genetics — retail clone differs.",
  },
  {
    cultivar: "Hoya 'Compacta'",
    theories: [
      "Sport mutation of an existing species",
      "Separate species reclassification",
      "Botanical literature disagrees",
    ],
    verdict: "Unresolved in the literature — we present both.",
  },
];

export const testimonials = [
  {
    quote:
      "I kept puffers for 3 years and never knew the Mbu came from the Congo — AquaTrack showed me the exact river.",
    author: "Marcus D.",
    role: "Puffer keeper, 4 years",
  },
  {
    quote:
      "The cross-kingdom connection feature is addictive — Bleeker named my loach AND an orchid.",
    author: "Priya S.",
    role: "Aroid collector",
  },
  {
    quote:
      "Copper kills Amano shrimp. The app warned me before I dosed. That's a $60 clean-up crew saved.",
    author: "Devon R.",
    role: "Nano tank builder",
  },
];

export const blogPosts = [
  {
    category: "Species Spotlight",
    title: "11 Puffer Species You Can Keep in an Aquarium (and the River Each One Comes From)",
    excerpt:
      "From the 26-inch Mbu of the Congo to the thumbnail-sized Pea Puffer of Kerala's Pamba River — every species linked to real DB data.",
    read: "14 min",
    accent: "aqua",
  },
  {
    category: "Who Discovered Your Fish?",
    title: "Pieter Bleeker: The Army Doctor Who Named 500 Fish From Dinner-Market Sketches",
    excerpt:
      "How one Dutch physician in 1850s Indonesia described half your Southeast Asian tank between hospital shifts.",
    read: "9 min",
    accent: "aqua",
  },
  {
    category: "What Your Name Means",
    title: "Exsul, Davidi, Regani — What Your Fish's Name Actually Means",
    excerpt:
      "The etymology hidden in every scientific name: dedications, place-names, and the people behind the Latin.",
    read: "7 min",
    accent: "amber",
  },
  {
    category: "Provenance Investigation",
    title: "The Pink Princess Patent: Is the Plant You Bought the Plant on the Paper?",
    excerpt:
      "A real patent covers the genetics — but the big-box clone tells a different story. We follow the paper trail.",
    read: "11 min",
    accent: "emerald",
  },
  {
    category: "Biotope Guide",
    title: "Building a Rio Negro Blackwater Tank: Substrate, Light & Filter",
    excerpt:
      "83% biotope match starts with the right blackwater sand, tannin-stained lighting, and slow-flow filtration.",
    read: "12 min",
    accent: "aqua",
  },
  {
    category: "Who Discovered Your Plant?",
    title: "Heinrich Schott & the 126 Anthuriums: One Man, One Genus, a 40-Year Career",
    excerpt:
      "The director of Vienna's Schönbrunn gardens who is the primary describer behind nearly every Anthurium you own.",
    read: "10 min",
    accent: "emerald",
  },
];

export const videos = {
  tangleTrove: [
    { id: "puffer-mbu", title: "The 26-inch Mbu Puffer explained", views: "4.2K", tag: "Puffers" },
    { id: "dwarf-puffer", title: "Dwarf Puffer care in 60 seconds", views: "8.1K", tag: "Puffers" },
    { id: "crayfish", title: "Cambarellus dwarf crayfish setup", views: "3.4K", tag: "Crayfish" },
    { id: "killifish", title: "Nothobranchius: fish that live one season", views: "5.6K", tag: "Killifish" },
  ],
  dionaea: [
    { id: "nepenthes", title: "Nepenthes rajah: the giant pitcher", views: "6.9K", tag: "Nepenthes" },
    { id: "flytrap", title: "Venus flytrap: how the trap fires", views: "9.3K", tag: "Dionaea" },
    { id: "terrarium", title: "Bioactive carnivore terrarium build", views: "4.8K", tag: "Terrarium" },
    { id: "sarracenia", title: "Sarracenia dormancy without killing it", views: "3.1K", tag: "Sarracenia" },
  ],
};

export const gearBiotope = {
  match: "Rio Negro Blackwater",
  score: 83,
  items: [
    { name: "Amazonian blackwater sand", note: "Fine, dark substrate for tannin-stained water", price: "$24" },
    { name: "Low-output tannin light", note: "Dim, warm spectrum for blackwater", price: "$68" },
    { name: "Slow-flow canister filter", note: "Heavy biological media, gentle current", price: "$140" },
    { name: "Botanicals & leaf litter", note: "Catappa leaves, alder cones for tannins", price: "$18" },
  ],
};

export const crossKingdom = [
  {
    discoverer: "Pieter Bleeker",
    fish: "Chromobotia macracanthus, Betta spp.",
    plant: "Indonesian plant species from his postings",
  },
  {
    discoverer: "Louis Agassiz",
    fish: "Acanthicus hystrix (with Spix)",
    plant: "Amazonian flora from his Brazil expedition",
  },
  {
    discoverer: "Johann Natterer",
    fish: "Multiple Amazonian catfish",
    plant: "Thousands of plant specimens, 18-year Brazil expedition",
  },
];
