/**
 * Safe import from AquaScrape's existing real-source CI artifact.
 * After extracting its ZIP: node scripts/import-biotrack-research.mjs
 *   --input /path/to/extracted --run-url https://github.com/.../actions/runs/ID
 *   --commit EXACT_40_CHARACTER_SHA --artifact-id ID --capture-date YYYY-MM-DD
 * Validation: node scripts/import-biotrack-research.mjs --check
 *
 * This deliberately strips all biological claims, localities and raw source
 * texts. It never creates an accepted BioTrack release.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
export const OUTPUT = path.join(ROOT, "src/data/biotrack/candidate-research.json");
const SHA = /^[a-f0-9]{64}$/i;
const FIELDS = new Set([
  "subject_id", "scientific_name", "status", "gbif_key",
  "taxon_source_sha256", "specimen_candidate_count", "gap_changes",
]);
const GAPS = new Set([
  "identity_taxonomy", "people_specimen_expedition_history",
  "historical_names_etymology_original_description", "environment_husbandry",
  "behavior_reproduction_natural_history", "locality_biotope_microhabitat",
  "local_community_knowledge", "cross_kingdom_ecological_relationships",
  "controversies_conflicting_claims", "cultivar_lineage_trade_history", "long_tail",
]);
function check(value, message) {
  if (!value) throw new Error(message);
}
function exactKeys(object, allowed, context) {
  check(object && typeof object === "object" && !Array.isArray(object), context + ": not an object");
  for (const key of Object.keys(object)) check(allowed.has(key), context + ": unexpected field " + key);
}
const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const json = (folder, name) => JSON.parse(fs.readFileSync(path.join(folder, name), "utf8"));
const jsonl = (folder, name) => fs.readFileSync(path.join(folder, name), "utf8")
  .split(/\r?\n/).filter(Boolean).map((s) => JSON.parse(s));

export function validateSnapshot(x) {
  exactKeys(x, new Set(["schema", "release_state", "source", "totals", "subjects"]), "snapshot");
  check(x.schema === "endemic.biotrack.candidate_research.v1", "Unknown research schema");
  check(x.release_state === "PRIVATE_RESEARCH_CANDIDATE_ONLY", "No accepted-release promotion permitted");
  exactKeys(x.source, new Set(["repo", "tested_commit", "run_url", "artifact_id", "captured_on"]), "source");
  check(x.source.repo === "wowthisiseasytoremember-stack/aquascrape", "Wrong source repository");
  check(/^[a-f0-9]{40}$/i.test(x.source.tested_commit), "Missing exact tested commit");
  check(/^https:\/\/github\.com\/wowthisiseasytoremember-stack\/aquascrape\/actions\/runs\/\d+$/.test(x.source.run_url), "Source run URL invalid");
  check(Number.isSafeInteger(x.source.artifact_id) && x.source.artifact_id > 0, "Missing evidence artifact ID");
  check(/^\d{4}-\d{2}-\d{2}$/.test(x.source.captured_on), "Missing capture date");
  exactKeys(x.totals, new Set(["subjects", "taxon_candidates", "specimen_candidates", "review_required", "partially_advanced"]), "totals");
  check(Array.isArray(x.subjects) && x.subjects.length === x.totals.subjects && x.subjects.length > 0 && x.subjects.length <= 100, "Corpus size mismatch");
  const seen = new Set();
  let taxa = 0, specimens = 0, held = 0, advanced = 0;
  for (const item of x.subjects) {
    exactKeys(item, FIELDS, "subject");
    check(typeof item.subject_id === "string" && /^[a-z]+:[a-z0-9-]+$/.test(item.subject_id), "Subject ID invalid");
    check(!seen.has(item.subject_id), "Duplicate organism: " + item.subject_id);
    seen.add(item.subject_id);
    check(typeof item.scientific_name === "string" && !!item.scientific_name.trim(), "Scientific name missing");
    check(Number.isSafeInteger(item.specimen_candidate_count) && item.specimen_candidate_count >= 0 && item.specimen_candidate_count <= 100, "Specimen count invalid");
    check(Array.isArray(item.gap_changes) && item.gap_changes.length <= 15, "Invalid gap count");
    const gapIds = new Set();
    for (const change of item.gap_changes) {
      exactKeys(change, new Set(["gap", "before", "after"]), "gap");
      check(GAPS.has(change.gap) && !gapIds.has(change.gap), "Invalid or repeated gap");
      gapIds.add(change.gap);
      check(change.before === "unknown_unsearched" && change.after === "known_partial_source_backed",
        "Only partial research progress allowed; never accepted fact promotion");
    }
    if (item.gap_changes.length) advanced++;
    if (item.status === "review_required") {
      held++;
      check(item.subject_id.startsWith("cultivar:"), "Unexpected held entity type");
      check(item.gbif_key === null && item.taxon_source_sha256 === null,
        "Cultivar cannot inherit its parent species' identity or source key");
      check(item.specimen_candidate_count === 0 && item.gap_changes.length === 0, "Held cultivar cannot gain source facts");
    } else {
      check(item.status === "taxon_candidate" && !item.subject_id.startsWith("cultivar:"), "Invalid taxon status");
      check(/^\d+$/.test(item.gbif_key) && SHA.test(item.taxon_source_sha256), "Missing taxon provenance");
      taxa++;
    }
    specimens += item.specimen_candidate_count;
  }
  check(taxa === x.totals.taxon_candidates && held === x.totals.review_required &&
    specimens === x.totals.specimen_candidates && advanced === x.totals.partially_advanced,
    "Summary totals differ from actual imported source rows");
  return x;
}

export function projectBundle(bundle, source) {
  const { acquisition, before, after, facts, sources, rawBySha } = bundle;
  check(acquisition.schema === "biotrack.real_gbif_ten_subject_canary.v1" &&
    acquisition.release === "PRIVATE_RESEARCH_CANDIDATE_ONLY", "Wrong or promoted source");
  check(Array.isArray(acquisition.results) &&
    acquisition.subjects_attempted === acquisition.results.length, "Acquisition corpus drift");
  const index = (state) => {
    check(Array.isArray(state.subjects), "Missing dossier state");
    const result = new Map(state.subjects.map((s) => [s.id, s]));
    check(result.size === state.subjects.length, "Duplicate dossier ID");
    return result;
  };
  const b = index(before), a = index(after);
  check(a.size === b.size && a.size === acquisition.results.length, "Dossier corpus mismatch");
  const evidenceKeys = new Set();
  for (const s of sources) {
    check(SHA.test(s.raw_sha256), "Source checksum absent");
    const raw = rawBySha.get(s.raw_sha256);
    check(raw && digest(raw) === s.raw_sha256, "Original source bytes fail SHA verification");
    evidenceKeys.add(s.subject_id + ":" + s.raw_sha256);
  }
  const factsBySubject = new Map();
  for (const fact of facts) {
    check(fact.evidence?.role === "external_structured" && SHA.test(fact.evidence.raw_sha256),
      "Fact lacks structured original-source provenance");
    check(evidenceKeys.has(fact.subject_id + ":" + fact.evidence.raw_sha256),
      "Fact source does not belong to the same organism");
    check(["taxonomy_authority_match", "preserved_specimen_occurrence"].includes(fact.fact_type),
      "Unsupported fact type");
    check(b.has(fact.subject_id), "Orphaned fact");
    const old = factsBySubject.get(fact.subject_id) ?? [];
    old.push(fact);
    factsBySubject.set(fact.subject_id, old);
  }
  const rows = acquisition.results.map((r) => {
    const old = b.get(r.subject_id), current = a.get(r.subject_id);
    check(old && current && old.accepted_name === current.accepted_name &&
      r.scientific_name === current.accepted_name, "Subject name/id mismatch");
    const currentFacts = factsBySubject.get(r.subject_id) ?? [];
    const speciesFacts = currentFacts.filter((f) => f.fact_type === "taxonomy_authority_match");
    const specimenFacts = currentFacts.filter((f) => f.fact_type === "preserved_specimen_occurrence");
    check(r.status === "verified_exact" || r.status === "review_required", "Unknown source match status");
    const status = r.status === "verified_exact" ? "taxon_candidate" : "review_required";
    check(status === "taxon_candidate"
      ? speciesFacts.length === 1 && r.match_type === "EXACT"
      : currentFacts.length === 0, "Unsupported taxon fact or false cultivar match");
    check(specimenFacts.length === (r.specimen_facts ?? 0), "Specimen count mismatch");
    if (status === "taxon_candidate") {
      const fact = speciesFacts[0];
      check(String(fact.values?.gbif_usage_key ?? "") === String(r.gbif_key ?? ""),
        "Reported GBIF taxon key differs from its actual source-backed fact");
      check(fact.evidence.raw_sha256 === r.source_sha256,
        "Reported source hash differs from the taxon fact's original source");
      check(String(fact.values?.canonical_name ?? "").trim().toLowerCase() ===
        r.scientific_name.trim().toLowerCase(),
        "Original taxonomy fact names a different organism");
    }
    const keys = new Set();
    for (const fact of specimenFacts) {
      check(typeof fact.fact_key === "string" && !keys.has(fact.fact_key),
        "Duplicate or unkeyed specimen fact");
      keys.add(fact.fact_key);
    }
    const changes = Object.entries(current.gaps).flatMap(([gap, value]) => {
      const previous = old.gaps[gap];
      if (previous === value) return [];
      check(previous === "unknown_unsearched" && value === "known_partial_source_backed",
        "Unexpected dossier transition");
      check(currentFacts.some((fact) => fact.gap_id === gap),
        "A dossier cannot advance without source-backed evidence for that gap");
      return [{ gap, before: previous, after: value }];
    });
    return {
      subject_id: r.subject_id,
      scientific_name: r.scientific_name,
      status,
      gbif_key: status === "taxon_candidate" ? r.gbif_key : null,
      taxon_source_sha256: status === "taxon_candidate" ? r.source_sha256 : null,
      specimen_candidate_count: specimenFacts.length,
      gap_changes: changes,
    };
  });
  check(rows.reduce((sum, item) => sum + item.specimen_candidate_count, 0) === acquisition.verified_specimen_facts &&
    facts.length === acquisition.exact_fact_rows, "Fact totals differ from source receipt");
  return validateSnapshot({
    schema: "endemic.biotrack.candidate_research.v1",
    release_state: "PRIVATE_RESEARCH_CANDIDATE_ONLY",
    source: { ...source, repo: "wowthisiseasytoremember-stack/aquascrape" },
    totals: {
      subjects: rows.length,
      taxon_candidates: rows.filter((x) => x.status === "taxon_candidate").length,
      specimen_candidates: acquisition.verified_specimen_facts,
      review_required: rows.filter((x) => x.status === "review_required").length,
      partially_advanced: rows.filter((x) => x.gap_changes.length).length,
    },
    subjects: rows,
  });
}

function readBundle(folder) {
  const rawBySha = new Map();
  for (const kind of ["taxonomy", "occurrence"]) {
    const directory = path.join(folder, "raw", kind);
    if (!fs.existsSync(directory)) continue;
    for (const filename of fs.readdirSync(directory)) {
      if (/^[a-f0-9]{64}\.json$/.test(filename)) {
        rawBySha.set(filename.slice(0, 64), fs.readFileSync(path.join(directory, filename)));
      }
    }
  }
  return {
    acquisition: json(folder, "acquisition.json"),
    before: json(folder, "before-state.json"),
    after: json(folder, "after-state.json"),
    facts: jsonl(folder, "verified-facts.jsonl"),
    sources: jsonl(folder, "source-rows.jsonl"),
    rawBySha,
  };
}
const flag = (args, name) => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
function main() {
  const args = process.argv.slice(2);
  if (args.includes("--check")) {
    const snapshot = validateSnapshot(JSON.parse(fs.readFileSync(OUTPUT, "utf8")));
    console.log("[biotrack] safe candidate snapshot PASS: " + snapshot.totals.subjects + " subjects; " + snapshot.totals.specimen_candidates + " specimen leads");
    return;
  }
  const folder = flag(args, "--input");
  const source = {
    tested_commit: flag(args, "--commit"),
    run_url: flag(args, "--run-url"),
    artifact_id: Number(flag(args, "--artifact-id")),
    captured_on: flag(args, "--capture-date"),
  };
  check(folder && source.tested_commit && source.run_url && source.artifact_id && source.captured_on,
    "Required --input --commit --run-url --artifact-id --capture-date");
  const snapshot = projectBundle(readBundle(path.resolve(folder)), source);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(snapshot, null, 2) + "\n");
  console.log("[biotrack] wrote source-verified candidate snapshot; never published a biological claim");
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
