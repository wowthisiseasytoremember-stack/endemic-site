# Product-proof visual kit

Status: **presentation-only / safe to merge independently**

This kit exists so future evidence-backed product surfaces do not have to invent UI after the truth/data pipeline is ready. It intentionally contains **no biological facts, no accepted-release adapter, no routes, and no product-direction decision**.

## Design rule

Reuse the existing Endemic language:

- dark editorial surface;
- display serif for the story, sans for controls;
- quiet glass/borders;
- aqua for exploration;
- emerald for positive/source-supported ecology context;
- amber for narrowing/corrections;
- evidence hidden until requested;
- motion as orientation, never spectacle.

Do not turn the product into a graph dashboard.

## Components

`SubjectIdentity`
: Hero-sized identity treatment with one strong lead. No care-table/data dump.

`StoryLead`
: "Why this one is interesting" treatment. One excellent fact beats five filler facts.

`ThreadCard`
: Human-language "Follow the thread" action with explicit destination state:
  - `READY`
  - `SUMMARY`
  - `RESEARCHING`
  - `UNAVAILABLE`

A non-ready destination is visibly non-clickable; no fake page.

`CorrectionCard`
: Shows the old/common framing beside the narrower evidence-supported statement. Avoid MYTH/FACT theater when the distinction is actually scope.

`MysteryCard`
: Makes a genuine unknown intentional by showing:
  - question;
  - safe current answer;
  - why unresolved;
  - evidence that would resolve it.

`EvidenceReceipt`
: Native `<details>` disclosure. The receipt remains visually secondary and exposes source/locator/scope only on demand.

`DestinationState`
: Small explicit state tile for thread destinations that cannot yet become pages.

`StoryReveal`, `ThreadSequence`, `ThreadStep`
: Framer Motion wrappers for subtle reveal/stagger behavior. All respect `prefers-reduced-motion`.

## Intended composition

```tsx
<SubjectIdentity ... />

<StoryReveal>
  <StoryLead ... />
</StoryReveal>

<ThreadSequence className="grid gap-4 md:grid-cols-2">
  <ThreadStep><ThreadCard state="READY" ... /></ThreadStep>
  <ThreadStep><ThreadCard state="SUMMARY" ... /></ThreadStep>
  <ThreadStep><ThreadCard state="RESEARCHING" ... /></ThreadStep>
</ThreadSequence>

<CorrectionCard ... />
<MysteryCard ... />
<EvidenceReceipt ... />
```

## What this deliberately does not solve

- accepted evidence ingestion;
- entity routing;
- homepage/navigation;
- analytics provider;
- SEO/indexing;
- product-proof subject selection;
- content authoring;
- new design tokens.

Those remain owned by their existing issues.

## Taste checks for future use

A finished subject page should pass these tests:

1. The first screen communicates **one** reason the organism is interesting.
2. The next action reads as a human question, not a database predicate.
3. An unresolved fact feels intentional, not broken.
4. The evidence exists one click away but does not dominate.
5. No dead thread looks interactive.
6. Motion disappears cleanly under reduced-motion.
7. Cards remain readable at 390 px without horizontal scroll.
8. The page still feels like Endemic Field Notes, not a new dashboard product.

## Suggested mapping to #27

If #27 is eventually opened:

- Cardinal:
  - identity -> `SubjectIdentity`
  - describer/namesake distinction -> `StoryLead`
  - Schultz / Axelrod paths -> `ThreadCard`
  - source details -> `EvidenceReceipt`

- Pink Princess:
  - patent correction -> `CorrectionCard`
  - unresolved originator -> `MysteryCard`
  - EM0003 lineage -> `ThreadCard`
  - patent/source record -> `EvidenceReceipt`

This mapping is illustrative only. #27 remains gate-controlled.
