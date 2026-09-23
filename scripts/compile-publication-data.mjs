import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MAX_CONNECTIONS_PER_SPECIES = 12;
const OUTPUT = path.join(ROOT, "src", "data", "publication", "article-cross-kingdom.json");
const SPECIES_SOURCE = path.join(ROOT, "src", "data", "aquatrack", "species_traits_flat.json");
const CROSS_SOURCE = path.join(ROOT, "src", "data", "aquatrack", "cross_kingdom_connections.json");
const ENTITIES_SOURCE = path.join(ROOT, "src", "data", "entities.ts");

function readBuffer(file) {
  return fs.readFileSync(file);
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function slugifyScientificName(name) {
  return String(name).trim().toLowerCase().replace(/\s+/g, "-");
}

function publicationSpecies(sourceText) {
  const species = new Map();

  for (const line of sourceText.split(/\r?\n/)) {
    if (!/type:\s*['"]species['"]/.test(line)) continue;
    const slug = line.match(/slug:\s*['"]([^'"]+)['"]/)?.[1];
    const name = line.match(/name:\s*['"]([^'"]+)['"]/)?.[1] || "";
    if (slug) species.set(slug, name);
  }

  if (species.size === 0) {
    throw new Error("No publication species found in src/data/entities.ts");
  }

  return [...species.entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

const speciesBuffer = readBuffer(SPECIES_SOURCE);
const crossBuffer = readBuffer(CROSS_SOURCE);
const entitiesBuffer = readBuffer(ENTITIES_SOURCE);

const speciesRows = JSON.parse(speciesBuffer.toString("utf8"));
const crossKingdom = JSON.parse(crossBuffer.toString("utf8"));
const speciesBySlug = new Map();

for (const row of speciesRows) {
  const scientificName = row?.scientific_name;
  if (typeof scientificName !== "string" || scientificName.length === 0) continue;
  const slug = slugifyScientificName(scientificName);
  if (!speciesBySlug.has(slug)) speciesBySlug.set(slug, row);
}

const selected = {};
const missing = [];

const publicationEntries = publicationSpecies(entitiesBuffer.toString("utf8"));

for (const { slug, name } of publicationEntries) {
  const species = speciesBySlug.get(slug);
  if (!species) {
    missing.push(slug);
    selected[slug] = {
      scientificName: null,
      commonName: name,
      connections: [],
      unmatched: true,
    };
    continue;
  }

  const rawConnections = crossKingdom?.plant_connections?.[species.scientific_name];
  const connections = Array.isArray(rawConnections)
    ? rawConnections
        .filter((item) => item && typeof item.pn === "string" && Number.isFinite(item.c))
        .map((item) => ({ pn: item.pn, c: item.c }))
        .sort((a, b) => (b.c - a.c) || a.pn.localeCompare(b.pn))
        .slice(0, MAX_CONNECTIONS_PER_SPECIES)
    : [];

  selected[slug] = {
    scientificName: species.scientific_name,
    commonName: species.common_name || species.scientific_name,
    connections,
    unmatched: false,
  };
}

if (missing.length > 0) {
  console.warn(
    `[publication] unmatched editorial species retain empty connections: ${missing.join(", ")}`
  );
}

const artifact = {
  schemaVersion: 1,
  maxConnectionsPerSpecies: MAX_CONNECTIONS_PER_SPECIES,
  unmatchedSpecies: missing,
  sources: {
    speciesTraits: {
      path: "src/data/aquatrack/species_traits_flat.json",
      bytes: speciesBuffer.byteLength,
      sha256: sha256(speciesBuffer),
    },
    crossKingdom: {
      path: "src/data/aquatrack/cross_kingdom_connections.json",
      bytes: crossBuffer.byteLength,
      sha256: sha256(crossBuffer),
      version: crossKingdom?.version ?? null,
      threshold: crossKingdom?.threshold ?? null,
    },
    entities: {
      path: "src/data/entities.ts",
      bytes: entitiesBuffer.byteLength,
      sha256: sha256(entitiesBuffer),
    },
  },
  species: selected,
};

const json = JSON.stringify(artifact, null, 2) + "\n";
const args = new Set(process.argv.slice(2));

console.log(
  `[publication] raw bytes=${speciesBuffer.byteLength + crossBuffer.byteLength}; artifact bytes=${Buffer.byteLength(json)}; species=${Object.keys(selected).length}`
);

if (args.has("--check")) {
  if (!fs.existsSync(OUTPUT)) {
    throw new Error(`Missing generated artifact: ${path.relative(ROOT, OUTPUT)}`);
  }
  const existing = fs.readFileSync(OUTPUT, "utf8");
  if (existing !== json) {
    throw new Error("Publication artifact is stale. Run: node scripts/compile-publication-data.mjs");
  }
  console.log("[publication] artifact drift check PASS");
} else {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, json);
  console.log(`[publication] wrote ${path.relative(ROOT, OUTPUT)}`);
}

if (args.has("--stdout")) {
  console.log(`PUBLICATION_ARTIFACT_BASE64=${Buffer.from(json, "utf8").toString("base64")}`);
}
