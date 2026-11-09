import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { projectBundle, validateSnapshot, OUTPUT } from "./import-biotrack-research.mjs";

const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const source = {
  tested_commit: "3b90a3695114c782c6b92a0393c9d15e6ce3a31a",
  run_url: "https://github.com/wowthisiseasytoremember-stack/aquascrape/actions/runs/42535399060",
  artifact_id: 13638892118,
  captured_on: "2026-11-08",
};

function specimenBundle() {
  const taxonBytes = Buffer.from('{"taxon":"Colomesus asellus"}');
  const specimenBytes = Buffer.from('{"basisOfRecord":"PRESERVED_SPECIMEN"}');
  const taxonHash = sha(taxonBytes);
  const specimenHash = sha(specimenBytes);
  const before = [
    { id: "aqua:amazon-puffer", accepted_name: "Colomesus asellus", gaps: { people_specimen_expedition_history: "unknown_unsearched" } },
    { id: "cultivar:pink-princess", accepted_name: "Philodendron erubescens 'Pink Princess'", gaps: { cultivar_lineage_trade_history: "unknown_unsearched" } },
  ];
  const after = structuredClone(before);
  after[0].gaps.people_specimen_expedition_history = "known_partial_source_backed";
  return {
    acquisition: {
      schema: "biotrack.real_gbif_ten_subject_canary.v1",
      release: "PRIVATE_RESEARCH_CANDIDATE_ONLY",
      subjects_attempted: 2,
      exact_fact_rows: 2,
      verified_specimen_facts: 1,
      results: [
        { subject_id: "aqua:amazon-puffer", scientific_name: "Colomesus asellus", status: "verified_exact", match_type: "EXACT", gbif_key: "2407613", source_sha256: taxonHash, specimen_facts: 1 },
        { subject_id: "cultivar:pink-princess", scientific_name: "Philodendron erubescens 'Pink Princess'", status: "review_required", match_type: "EXACT", gbif_key: "2871297", source_sha256: taxonHash },
      ],
    },
    before: { subjects: before },
    after: { subjects: after },
    sources: [
      { subject_id: "aqua:amazon-puffer", raw_sha256: taxonHash },
      { subject_id: "aqua:amazon-puffer", raw_sha256: specimenHash },
    ],
    facts: [
      { subject_id: "aqua:amazon-puffer", fact_type: "taxonomy_authority_match", evidence: { role: "external_structured", raw_sha256: taxonHash } },
      { subject_id: "aqua:amazon-puffer", fact_type: "preserved_specimen_occurrence", evidence: { role: "external_structured", raw_sha256: specimenHash } },
    ],
    rawBySha: new Map([[taxonHash, taxonBytes], [specimenHash, specimenBytes]]),
  };
}

test("the pinned real-source candidate receipt remains content-minimal and held", () => {
  const snapshot = validateSnapshot(JSON.parse(fs.readFileSync(OUTPUT, "utf8")));
  assert.deepEqual(snapshot.totals, {
    subjects: 10, taxon_candidates: 8, specimen_candidates: 20,
    review_required: 2, partially_advanced: 7,
  });
  for (const row of snapshot.subjects) {
    assert.equal("facts" in row, false);
    assert.equal("locality" in row, false);
    assert.equal("latitude" in row, false);
    assert.equal("longitude" in row, false);
    assert.equal("source_text" in row, false);
  }
  const pink = snapshot.subjects.find((x) => x.subject_id === "cultivar:pink-princess");
  assert.equal(pink.status, "review_required");
  assert.equal(pink.gbif_key, null);
  assert.equal(pink.specimen_candidate_count, 0);
});

test("import from verified raw bytes produces only candidate status and partial gaps", () => {
  const projected = projectBundle(specimenBundle(), source);
  assert.deepEqual(projected.totals, {
    subjects: 2, taxon_candidates: 1, specimen_candidates: 1,
    review_required: 1, partially_advanced: 1,
  });
  assert.deepEqual(projected.subjects[0].gap_changes, [{
    gap: "people_specimen_expedition_history",
    before: "unknown_unsearched",
    after: "known_partial_source_backed",
  }]);
  assert.equal(projected.subjects[1].gbif_key, null);
});

test("missing original source bytes fail closed", () => {
  const bundle = specimenBundle();
  bundle.rawBySha.clear();
  assert.throws(() => projectBundle(bundle, source), /Original source bytes fail/);
});

test("facts never attach to an unrelated subject", () => {
  const bundle = specimenBundle();
  bundle.facts[0].subject_id = "cultivar:pink-princess";
  assert.throws(() => projectBundle(bundle, source), /does not belong to the same organism/);
});

test("import never promotes held cultivars or discovery links into facts", () => {
  const bundle = specimenBundle();
  bundle.acquisition.results[1].status = "verified_exact";
  assert.throws(() => projectBundle(bundle, source), /Unsupported taxon fact/);
  const other = specimenBundle();
  other.facts[0].evidence.role = "discovery_lead";
  assert.throws(() => projectBundle(other, source), /structured original-source provenance/);
});

test("published biological claims, inferred completion and revised schema are rejected", () => {
  const good = projectBundle(specimenBundle(), source);
  assert.throws(
    () => validateSnapshot({ ...good, release_state: "ACCEPTED" }),
    /No accepted-release promotion permitted/
  );
  const withProse = structuredClone(good);
  withProse.subjects[0].biological_claim = "invented";
  assert.throws(() => validateSnapshot(withProse), /unexpected field biological_claim/);
  const promoted = structuredClone(good);
  promoted.subjects[0].gap_changes[0].after = "known_source_backed";
  assert.throws(() => validateSnapshot(promoted), /Only partial research progress/);
});

test("one source cannot silently count as multiple specimens", () => {
  const bundle = specimenBundle();
  bundle.acquisition.results[0].specimen_facts = 5;
  assert.throws(() => projectBundle(bundle, source), /Specimen count mismatch/);
});
