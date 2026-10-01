import {
  CorrectionCard,
  DocumentCard,
  EvidenceReceipt,
  ExplorationTrail,
  RelationshipFact,
  ResearchingState,
  SubjectIdentity,
  ThreadLink,
  UnknownCard,
} from "./RabbitHolePrimitives";
import { RabbitHoleReveal } from "./RabbitHoleMotion";
import type { ProductReceipt, RabbitHoleSubjectModel } from "./RabbitHoleTypes";

const PAGE_GLOW = {
  aqua:
    "radial-gradient(circle at 78% 7%, rgba(31,184,196,0.13), transparent 31rem), radial-gradient(circle at 10% 30%, rgba(31,184,196,0.045), transparent 24rem)",
  flora:
    "radial-gradient(circle at 78% 7%, rgba(47,174,107,0.12), transparent 31rem), radial-gradient(circle at 10% 30%, rgba(47,174,107,0.045), transparent 24rem)",
  amber:
    "radial-gradient(circle at 78% 7%, rgba(232,161,44,0.12), transparent 31rem), radial-gradient(circle at 10% 30%, rgba(232,161,44,0.04), transparent 24rem)",
  neutral:
    "radial-gradient(circle at 78% 7%, rgba(255,255,255,0.07), transparent 31rem)",
} as const;

const FEATURE_SURFACE = {
  aqua:
    "border-aqua/18 bg-[linear-gradient(135deg,rgba(31,184,196,0.075),rgba(255,255,255,0.018)_62%,transparent)]",
  flora:
    "border-emerald/18 bg-[linear-gradient(135deg,rgba(47,174,107,0.075),rgba(255,255,255,0.018)_62%,transparent)]",
  amber:
    "border-amber/18 bg-[linear-gradient(135deg,rgba(232,161,44,0.075),rgba(255,255,255,0.018)_62%,transparent)]",
  neutral:
    "border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012)_62%,transparent)]",
} as const;

function Receipt({
  receipt,
  accent,
}: {
  receipt: ProductReceipt;
  accent: RabbitHoleSubjectModel["accent"];
}) {
  return (
    <EvidenceReceipt
      sourceLabel={receipt.sourceLabel}
      relationship={receipt.relationship}
      locator={receipt.locator}
      releaseId={receipt.releaseId}
      note={receipt.note}
      accent={accent}
    >
      {receipt.href && (
        <a
          href={receipt.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center border-b border-white/18 text-sm font-medium text-white/68 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Open source ↗
        </a>
      )}
    </EvidenceReceipt>
  );
}

export function RabbitHoleSubjectView({ model }: { model: RabbitHoleSubjectModel }) {
  const accent = model.accent ?? "neutral";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040908] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[46rem]"
        style={{ background: PAGE_GLOW[accent] }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-7 md:pb-32 md:pt-16 lg:px-10">
        {model.trail && model.trail.length > 0 && (
          <div className="mb-9 md:mb-12">
            <ExplorationTrail items={model.trail} accent={accent} />
          </div>
        )}

        <RabbitHoleReveal kind="section">
          <SubjectIdentity
            eyebrow={model.eyebrow}
            title={model.title}
            scientificName={model.scientificName}
            lead={model.lead}
            accent={accent}
            image={model.image}
            imageAlt={model.imageAlt}
            imageCredit={model.imageCredit}
            imageLicense={model.imageLicense}
            imageSourceHref={model.imageSourceHref}
            imagePosition={model.imagePosition}
          />
        </RabbitHoleReveal>

        {model.researching ? (
          <section className="mt-16 md:mt-20">
            <ResearchingState
              title={model.researching.title}
              body={model.researching.body}
              nextEvidence={model.researching.nextEvidence}
              accent={accent}
            />
          </section>
        ) : (
          <>
            <section id="interesting" className="mt-14 scroll-mt-24 md:mt-18" aria-labelledby="interesting-heading">
              <RabbitHoleReveal kind="section">
                <div className="mb-7 max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Start here
                  </p>
                  <h2
                    id="interesting-heading"
                    className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl"
                  >
                    Why this one is interesting
                  </h2>
                </div>
              </RabbitHoleReveal>

              <div className="space-y-3">
                {model.interesting.map((item, index) => (
                  <RabbitHoleReveal
                    key={item.id}
                    kind="section"
                    delay={Math.min(index * 0.04, 0.12)}
                  >
                    <article
                      className={
                        index === 0
                          ? `grid gap-5 rounded-[1.5rem] border px-6 py-7 sm:px-8 sm:py-8 md:grid-cols-[4.5rem_minmax(0,1fr)] ${FEATURE_SURFACE[accent]}`
                          : "grid gap-4 border-t border-white/10 px-1 py-7 md:grid-cols-[4.5rem_minmax(0,1fr)] md:py-8"
                      }
                    >
                      <div className="font-mono text-[10px] tracking-[0.16em] text-white/28">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        {item.kicker && (
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/46">
                            {item.kicker}
                          </p>
                        )}

                        <h3
                          className={
                            index === 0
                              ? "font-display mt-2 max-w-3xl text-3xl font-medium leading-[1.04] tracking-[-0.025em] text-white sm:text-4xl"
                              : "font-display mt-2 max-w-3xl text-2xl font-medium leading-tight text-white sm:text-3xl"
                          }
                        >
                          {item.title}
                        </h3>

                        {item.body && (
                          <p className="mt-4 max-w-2xl text-base leading-7 text-white/64">
                            {item.body}
                          </p>
                        )}

                        {item.relationship && (
                          <div className="mt-6">
                            <RelationshipFact
                              subject={item.relationship.subject}
                              predicate={item.relationship.predicate}
                              object={item.relationship.object}
                              year={item.relationship.year}
                              note={item.relationship.note}
                              accent={accent}
                            />
                          </div>
                        )}

                        {item.receipt && (
                          <div className="mt-4">
                            <Receipt receipt={item.receipt} accent={accent} />
                          </div>
                        )}
                      </div>
                    </article>
                  </RabbitHoleReveal>
                ))}
              </div>
            </section>

            <section
              id="threads"
              className="mt-16 scroll-mt-24 border-t border-white/10 pt-10 md:mt-20 md:pt-12"
              aria-labelledby="threads-heading"
            >
              <RabbitHoleReveal kind="section">
                <div className="mb-7 max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Keep going
                  </p>
                  <h2
                    id="threads-heading"
                    className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl"
                  >
                    Follow the thread
                  </h2>
                </div>
              </RabbitHoleReveal>

              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
                {model.threads.map((thread, index) => (
                  <RabbitHoleReveal
                    key={thread.id}
                    kind="thread"
                    delay={Math.min(index * 0.035, 0.1)}
                  >
                    {thread.state === "READY" || thread.state === "SUMMARY" ? (
                      <ThreadLink
                        question={thread.question}
                        target={thread.target}
                        relationshipHint={thread.relationshipHint}
                        state={thread.state}
                        href={thread.href}
                        accent={accent}
                      />
                    ) : (
                      <ThreadLink
                        question={thread.question}
                        target={thread.target}
                        relationshipHint={thread.relationshipHint}
                        state={thread.state}
                        accent={accent}
                      />
                    )}
                  </RabbitHoleReveal>
                ))}
              </div>
            </section>

            {model.corrections && model.corrections.length > 0 && (
              <section
                id="corrections"
                className="mt-16 scroll-mt-24 border-t border-white/10 pt-10 md:mt-20 md:pt-12"
                aria-labelledby="corrections-heading"
              >
                <RabbitHoleReveal kind="section">
                  <h2
                    id="corrections-heading"
                    className="font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl"
                  >
                    What changed
                  </h2>
                </RabbitHoleReveal>

                <div className="mt-7 space-y-5">
                  {model.corrections.map((correction) => (
                    <RabbitHoleReveal key={correction.id} kind="correction">
                      <CorrectionCard
                        oldClaim={correction.oldClaim}
                        correctedClaim={correction.correctedClaim}
                        scopeNote={correction.scopeNote}
                      >
                        {correction.receipt && (
                          <Receipt receipt={correction.receipt} accent="amber" />
                        )}
                      </CorrectionCard>
                    </RabbitHoleReveal>
                  ))}
                </div>
              </section>
            )}

            {model.unknowns && model.unknowns.length > 0 && (
              <section
                id="unknowns"
                className="mt-16 scroll-mt-24 border-t border-white/10 pt-10 md:mt-20 md:pt-12"
                aria-labelledby="unknowns-heading"
              >
                <RabbitHoleReveal kind="section">
                  <h2
                    id="unknowns-heading"
                    className="font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl"
                  >
                    Still unsolved
                  </h2>
                </RabbitHoleReveal>

                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                  {model.unknowns.map((unknown) => (
                    <UnknownCard
                      key={unknown.id}
                      question={unknown.question}
                      currentAnswer={unknown.currentAnswer}
                      whyUnresolved={unknown.whyUnresolved}
                      whatWouldResolve={unknown.whatWouldResolve}
                      status={unknown.status}
                    />
                  ))}
                </div>
              </section>
            )}

            {model.documents && model.documents.length > 0 && (
              <section
                id="documents"
                className="mt-16 scroll-mt-24 border-t border-white/10 pt-10 md:mt-20 md:pt-12"
                aria-labelledby="documents-heading"
              >
                <RabbitHoleReveal kind="section">
                  <div className="mb-7 max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                      Paper trail
                    </p>
                    <h2
                      id="documents-heading"
                      className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl"
                    >
                      Documents worth opening
                    </h2>
                  </div>
                </RabbitHoleReveal>

                <div className="grid gap-4 md:grid-cols-2">
                  {model.documents.map((document) => (
                    <DocumentCard
                      key={document.id}
                      title={document.title}
                      institution={document.institution}
                      year={document.year}
                      detail={document.detail}
                      identifier={document.identifier}
                      href={document.href}
                      rightsNote={document.rightsNote}
                      accent={accent}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
