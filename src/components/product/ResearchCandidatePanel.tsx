import type { CandidateResearchSubject, CandidateResearchSnapshot } from "@/data/biotrack/candidateResearch";

/** Research staging only. It must never be styled as an accepted fact card. */
export function ResearchCandidatePanel({
  entry,
  source,
}: {
  entry: CandidateResearchSubject;
  source: CandidateResearchSnapshot["source"];
}) {
  const held = entry.status === "review_required";
  const specimenCount = entry.specimen_candidate_count;
  const auditUrl = source.run_url + "/artifacts/" + source.artifact_id;
  const gbifUrl =
    !held && entry.gbif_key && /^\d+$/.test(entry.gbif_key)
      ? "https://www.gbif.org/species/" + entry.gbif_key
      : null;

  return (
    <section
      id="research-intake"
      className="mt-12 scroll-mt-24 border border-dashed border-white/20 bg-[#0c1815] px-5 py-7 sm:px-7 sm:py-8"
      aria-labelledby="research-intake-heading"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200/80">
        BioTrack research intake · not an accepted release
      </p>
      <div className="mt-3 grid gap-6 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10">
        <div>
          <h2 id="research-intake-heading" className="font-display text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
            {held ? "Cultivar evidence still on hold" : "New source material under review"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            {held
              ? "GBIF matched a species-level record, not independent proof of this cultivar’s origin or lineage. No specimen or taxonomic claims have been attached to the cultivar."
              : "AquaScrape preserved original GBIF response bytes and verified source hashes. These are candidate research leads, not approved history, ecology, or care facts."}
          </p>
          {!held && entry.gap_changes.length > 0 && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              The specimen/expedition-history research gap advanced to <strong className="text-white/88">partially source-backed</strong>.
              This does not establish a type locality, wild biotope, collector story, or accepted BioTrack relationship.
            </p>
          )}
          {!held && entry.gap_changes.length === 0 && (
            <p className="mt-4 text-sm leading-6 text-white/58">
              No previously unknown dossier gap has advanced to a publishable biological conclusion.
            </p>
          )}
        </div>
        <div className="border-t border-white/10 pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
          <p className="font-display text-4xl font-medium tabular-nums text-white/86">
            {held ? "—" : specimenCount}
          </p>
          <p className="mt-1 text-xs leading-5 text-white/50">
            {held ? "Cultivar match held" : "Preserved-specimen records staged for review"}
          </p>
          <p className="mt-4 text-[11px] text-white/44">
            Source run: {source.captured_on} · review-only
          </p>
          <div className="mt-4 flex flex-col items-start gap-2">
            {gbifUrl && (
              <a
                href={gbifUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#a2e0d7] underline underline-offset-4 hover:text-white"
              >
                Inspect GBIF taxon record
              </a>
            )}
            <a
              href={auditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 underline underline-offset-4 hover:text-white"
            >
              Source audit & raw evidence receipts
            </a>
          </div>
        </div>
      </div>
      {!held && entry.taxon_source_sha256 && (
        <p className="mt-6 break-all border-t border-white/10 pt-4 font-mono text-[10px] leading-5 text-white/38">
          Original GBIF response SHA-256: {entry.taxon_source_sha256}
        </p>
      )}
    </section>
  );
}
