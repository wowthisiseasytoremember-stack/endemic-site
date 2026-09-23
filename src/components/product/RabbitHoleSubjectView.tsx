import {
  CorrectionCard,
  DocumentCard,
  EvidenceReceipt,
  RelationshipFact,
  SubjectIdentity,
  ThreadLink,
  UnknownCard,
} from "./RabbitHolePrimitives";
import { RabbitHoleReveal } from "./RabbitHoleMotion";
import type { ProductReceipt, RabbitHoleSubjectModel } from "./RabbitHoleTypes";

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
    <main className="min-h-screen bg-[#040908] text-white">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-7 md:pb-32 md:pt-20 lg:px-10">
        <RabbitHoleReveal kind="section">
          <SubjectIdentity
            eyebrow={model.eyebrow}
            title={model.title}
            scientificName={model.scientificName}
            lead={model.lead}
            accent={accent}
            image={model.image}
            imageAlt={model.imageAlt}
          />
        </RabbitHoleReveal>

        {model.researching ? (\n          <section className="mt-16 md:mt-20">\n            <ResearchingState\n              title={model.researching.title}\n              body={model.researching.body}\n              nextEvidence={model.researching.nextEvidence}\n              accent={accent}\n            />\n          </section>\n        ) : (\n        <>\n        <section className="mt-16 md:mt-20" aria-labelledby="interesting-heading">
          <RabbitHoleReveal kind="section">
            <div className="mb-7 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
                Start here
              </p>
              <h2 id="interesting-heading" className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
                Why this one is interesting
              </h2>
            </div>
          </RabbitHoleReveal>

          <div className="space-y-6">
            {model.interesting.map((item, index) => (
              <RabbitHoleReveal key={item.id} kind="section" delay={Math.min(index * 0.04, 0.12)}>
                <article className="border-t border-white/10 pt-6 sm:pt-7">
                  {item.kicker && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-white/38">
                      {item.kicker}
                    </p>
                  )}
                  <h3 className="font-display mt-2 max-w-3xl text-2xl font-medium leading-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
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
                </article>
              </RabbitHoleReveal>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-12" aria-labelledby="threads-heading">
          <RabbitHoleReveal kind="section">
            <div className="mb-7 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
                Keep going
              </p>
              <h2 id="threads-heading" className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
                Follow the thread
              </h2>
            </div>
          </RabbitHoleReveal>

          <div className="grid gap-3 md:grid-cols-2">
            {model.threads.map((thread, index) => (
              <RabbitHoleReveal key={thread.id} kind="thread" delay={Math.min(index * 0.035, 0.1)}>
                <ThreadLink
                  question={thread.question}
                  target={thread.target}
                  relationshipHint={thread.relationshipHint}
                  state={thread.state}
                  href={thread.href}
                  accent={accent}
                />
              </RabbitHoleReveal>
            ))}
          </div>
        </section>

        {model.corrections && model.corrections.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-12" aria-labelledby="corrections-heading">
            <RabbitHoleReveal kind="section">
              <h2 id="corrections-heading" className="font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
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
                    {correction.receipt && <Receipt receipt={correction.receipt} accent="amber" />}
                  </CorrectionCard>
                </RabbitHoleReveal>
              ))}
            </div>
          </section>
        )}

        {model.unknowns && model.unknowns.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-12" aria-labelledby="unknowns-heading">
            <RabbitHoleReveal kind="section">
              <h2 id="unknowns-heading" className="font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
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
          <section className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-12" aria-labelledby="documents-heading">
            <RabbitHoleReveal kind="section">
              <div className="mb-7 max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
                  Paper trail
                </p>
                <h2 id="documents-heading" className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
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
      </div>
    </main>
  );
}
