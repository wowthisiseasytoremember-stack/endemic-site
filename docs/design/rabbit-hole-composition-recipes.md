# Rabbit-hole composition recipes

Status: **presentation contract only**

These recipes define how already-accepted material should be composed once the evidence pipeline supplies it. They do not authorize any subject, fact, route, or product pivot.

## Established story

Use when the evidence supports a clean relationship with an interesting human/history/place thread.

Recommended rhythm:

```
SubjectIdentity
  -> RelationshipFact / strong lead
  -> 2–3 ThreadLinks
  -> SourceShelf / EvidenceReceipt / DocumentCard
  -> Explore next
```

First-screen rule:

> The first viewport should answer one question: why should I care about this one?

Do not put evidence IDs, graph counts, dense taxonomy tables, or multiple competing headlines above the first meaningful thread.

## Correction story

Use when a public/project framing is too broad, wrong, or semantically collapsed.

```
SubjectIdentity
  -> CorrectionCard
  -> ThreadLink: "How do we know?"
  -> EvidenceReceipt / DocumentCard
  -> optional UnknownCard if a real question remains
```

Correction should feel like discovery, not scolding.

Prefer:
> The story is a little stranger than the usual version.

Avoid theatrical myth/fact styling unless the evidence truly supports a binary false statement.

## Honest mystery

Use when accepted evidence establishes the boundary of knowledge but not the answer.

```
SubjectIdentity
  -> UnknownCard
  -> known RelationshipFact / ThreadLink
  -> SourceShelf
  -> ResearchingState
```

Critical rule:

> A missing relationship in the project corpus is not automatically a real-world historical mystery.

The interface may say:
> Our accepted evidence does not currently establish X.

It may say:
> X is historically unresolved.

only when qualifying evidence establishes that stronger claim.

## Reconstruction / place story

Use only where locality/ecology evidence is actually strong enough.

```
Subject/place identity
  -> strict evidence block
  -> practical substitution block
  -> correction/narrowing for "authentic vs inspired"
  -> SourceShelf
  -> optional build/setup handoff
```

Strict and practical modes must never differ only by a tiny badge.

A practical substitute must say:
- what ecological/functional role it substitutes for;
- what authenticity is lost;
- that it is a substitution rather than canonical co-occurrence.

## Destination-state behavior

Every thread action has exactly one state.

### READY
A real destination exists and is safe to open.

### SUMMARY
The relationship is supported but only a bounded summary exists.

### RESEARCHING
The question is valid but current accepted evidence is incomplete.

### UNAVAILABLE
The product cannot safely answer or route the thread.

A non-ready state must not masquerade as a clickable destination.

## Motion

Motion communicates sequence, not confidence.

Approved:
- section settle: 18px -> 0, ~500ms;
- thread direction: x -10 -> 0, ~340ms;
- receipt: small 8px settle, ~240ms;
- hover arrow: +4px, ~150ms.

Avoid:
- parallax on evidence text;
- graph-node physics;
- dramatic wipes;
- typewriter effects;
- spinners for honest unknowns;
- motion that implies progress or certainty.

All nonessential motion disappears under `prefers-reduced-motion`.

## Mobile

At ~390px:
- one information block per row;
- no horizontal graph;
- long scientific names wrap naturally;
- long locators break safely;
- source details stack;
- minimum ~44px interactive target;
- no meaning encoded by hover alone.

The first meaningful thread should appear within roughly two normal phone screens after identity.

## Media

Exact organism/cultivar imagery:
- exact subject;
- rights/provenance recorded;
- never synthetic photoreal imagery presented as evidence.

Archive/documents:
- real rights-safe source when available;
- otherwise use `DocumentCard`;
- do not fabricate historical textures that look like real evidence.

## Screenshot rejection criteria

Reject a future proof if:
- more than one idea dominates the first screen;
- evidence chips overpower the story;
- disabled threads look clickable;
- unknown looks like an error;
- source text is illegibly tiny;
- every information type uses the same card treatment;
- motion competes with reading;
- visuals imply unsupported biological relationships;
- the page resembles a SaaS dashboard or graph database.

The target is:

> **Field Notes became interactive.**

Not:

> **BioTrack got a frontend.**
