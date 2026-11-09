# AquaScrape → BioTrack → Endemic: candidate evidence in existing Rabbit Holes

**Owner:** Endemic consumes; AquaScrape/BioTrack owns source acquisition, evidence semantics, and acceptance. **No new website or database.**

This is a read-only **research-intake overlay** in Endemic's existing
`/prototype/cardinal-tetra`, `/prototype/dragon-puffer`, and
`/prototype/pink-princess` views. The existing accepted Research Intelligence
and Dragon Puffer exemplar are unchanged. The overlay is *not* added to the
public species registry, care sheets, discoverer copy, or canonical app data.

## Source and true current coverage

- Canonical implementation: [AquaScrape PR #122](https://github.com/wowthisiseasytoremember-stack/aquascrape/pull/122), squash `fdb208b8258b3ee22410861f1e66b50bb78b032f`.
- Source-tested exact head: `3b90a3695114c782c6b92a0393c9d15e6ce3a31a`.
- [Real ten-organism original-response acquisition and validation](https://github.com/wowthisiseasytoremember-stack/aquascrape/actions/runs/42535399060), artifact **13638892118** (GitHub artifact retention is finite).
- Direct-source result: **8 exact taxon candidate fact rows**, **20 GBIF preserved-specimen candidate records**; **7 organisms** advanced their *specimen/expedition-history* research gap from `unknown_unsearched` to `known_partial_source_backed`. Two cultivar queries remained review-only. No accepted graph edges or public husbandry claims resulted.
- Endemic projection: `src/data/biotrack/candidate-research.json`. It contains **only** source-run identity, source hashes, GBIF taxon keys for exact organism matches, status, aggregate candidate counts, and a narrow before/after gap-state code. All 28 original fact *values*, occurrence coordinates, locality text, collector identities, descriptions, paper claims, and raw bytes stay out of the Endemic deployment.

## Re-import new original evidence

Use the current AquaScrape workflow artifact or an equivalent explicitly
verified original source bundle; *do not* claim a registry or current snapshot
was refreshed merely because this static project was built.

    unzip data-depth-ten-real-gbif-sources-and-gap-state.zip -d /tmp/biotrack-depth
    node scripts/import-biotrack-research.mjs \
      --input /tmp/biotrack-depth \
      --run-url https://github.com/wowthisiseasytoremember-stack/aquascrape/actions/runs/42535399060 \
      --commit 3b90a3695114c782c6b92a0393c9d15e6ce3a31a \
      --artifact-id 13638892118 \
      --capture-date 2026-11-08
    npm run data:biotrack:check
    npm run lint && npm run typecheck && npm run build

Commit and review only the **resulting small candidate ledger**. Do not commit the
expanded raw archive, original source files, or private database into Endemic.
The importer checks bytes by SHA-256 against each original JSON source, ensures
every source-backed fact references the correct subject, and refuses unexpected
gap transitions, unreviewed fact types or source roles, schema drift, or false
cultivar matches. CI revalidates the published candidate snapshot and executes
negative unit tests on the importer; it does not independently reacquire GBIF
on every Endemic build.

## Publishing boundary

The existing pages remain `noindex` prototypes. The candidate overlay is
**research under review** and displays no asserted ecological/husbandry
relationship. It is separate from accepted BioTrack RI content, and can be
removed without affecting that content. GBIF links identify **source records
to inspect**, not BioTrack acceptance. Future editorial promotion must happen
through BioTrack's release authority and a new accepted packet/release; do not
flip a UI label from candidate to accepted.

The generic RI adapter now fails closed for `HOLD`, missing release IDs,
invalid graph SHA-256, or source-less findings, and never inserts
Cardinal Tetra's historical Schultz/Axelrod relationships as a default for
other organisms.

**Current operational limit:** This is a dated, reviewed import into Endemic;
it is not a live database sync, a continuous crawler, or a publication-ready
BIoTrack data promotion. AquaScrape remains the owner of ingestion semantics.
