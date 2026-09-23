# Rabbit-Hole Screen Choreography

**Date:** 2026-09-22  
**Status:** implementation choreography for Endemic #27  
**Depends on:** PR #32 visual primitives + BioTrackCore PR #51 product contract  
**Data authority:** accepted BioTrack truth + separately preserved/inspected research receipts

This document specifies **sequence and emphasis**, not new biological facts.

The experience should feel like opening a compact museum dossier, noticing one surprising thing, then following a paper trail.

---

# Global choreography

## First 5 seconds

The user should see only three important things:

1. **what organism this is;**
2. **why it is worth caring about;**
3. **where the first thread leads.**

Do not place:
- database counts;
- graph metrics;
- confidence percentages;
- generic care tables;
- 4+ CTAs;
- full provenance metadata

above this threshold.

## First scroll

The first scroll should reveal **one relationship or correction**, not a grid of metadata.

## Second scroll

The user gets:
- the first receipt;
- 2–4 next questions;
- enough context to choose a direction.

## Deep scroll

Only then:
- unresolved questions;
- source/document shelf;
- secondary threads.

---

# Shared desktop frame

Target:

```text
┌──────────────────────────────────────────────────────────────┐
│ optional exploration trail                                   │
│                                                              │
│ subject identity copy              real subject image        │
│ common/display name                credit / license          │
│ scientific name                                              │
│ one-sentence hook                                            │
├──────────────────────────────────────────────────────────────┤
│ WHY THIS ONE IS INTERESTING                                  │
│                                                              │
│ one dominant editorial statement                             │
│ typed relationship / correction                              │
│ quiet receipt disclosure                                     │
├──────────────────────────────────────────────────────────────┤
│ FOLLOW THE THREAD                                            │
│ question                           question                   │
│ question                           researching/unavailable    │
├──────────────────────────────────────────────────────────────┤
│ optional correction / unknown                                │
├──────────────────────────────────────────────────────────────┤
│ PAPER TRAIL                                                  │
│ rights-safe document card        document/evidence object    │
└──────────────────────────────────────────────────────────────┘
```

No sticky graph side panel.

---

# Shared mobile frame

At ~390px:

```text
trail
↓
subject name
scientific name
hook
↓
hero image + tiny attribution
↓
why interesting
↓
relationship/correction
↓
receipt
↓
first thread
second thread
↓
unknown/correction
↓
documents
```

Rules:
- no two-column relationship comparison;
- no horizontal scroll except optional exploration trail;
- source locators must wrap;
- first useful thread must be visible before a long document shelf;
- 44px+ interactive targets;
- no required hover state.

---

# Cardinal Tetra choreography

## Product role

**Human-history / naming paper trail.**

The experience should move from a very simple distinction into progressively stranger history.

## Frame 1 — identity

### Left

Eyebrow:
> AquaTrack field note

Title:
> Cardinal Tetra

Scientific:
> *Paracheirodon axelrodi*

Lead should remain short and avoid forcing every interesting fact into one sentence.

Preferred emotional direction:
> Its name ties together a describer, a namesake, a rival scientific name, and a much stranger paper trail.

Only use final copy after the current Cardinal packet reconciliation (#273) establishes the exact allowed phrasing.

### Right

Use the public-domain Cardinal Tetra hero from AquaScrape #45 / Wikimedia Commons.

Treatment:
- full color;
- no heavy luminosity filter;
- natural crop;
- attribution underneath, not overlaid across the fish.

## Transition

Hero uses **subject settle**:
- 500ms;
- y 18 -> 0;
- no scale.

The image itself should not zoom on entry.

---

## Frame 2 — first surprise

Section:
> Why this one is interesting

Dominant statement:
> The scientist who described the Cardinal Tetra is not the person it was named for.

Then render the accepted typed relationships separately.

Relationship A:
- Cardinal Tetra
- described by · 1956
- Leonard P. Schultz

Relationship B:
- Cardinal Tetra
- named for
- Herbert R. Axelrod

Do not merge these into a “discoverer” card.

## Visual treatment

Typography and hairlines, not two glowing profile bubbles.

The relationship predicate should be the smallest part of the visual hierarchy but remain unambiguous.

---

## Frame 3 — first thread choice

Questions, ordered:

1. **What was its first scientific name?**
2. **Why did two names for the same fish need an ICZN ruling?**
3. **Who was Leonard Schultz outside this fish story?**
4. **Show me the receipts.**

Exact READY/SUMMARY/RESEARCHING states come from the final packet.

## Transition

Thread hover/focus:
- arrow +4px;
- border clarity increases;
- no card lift.

Thread click:
- route/navigation must not intentionally wait for an exit animation;
- preserve exploration trail in the destination.

---

## Frame 4 — original publication

If #273 passes:

Use a **DocumentCard**, not a magazine scan by default.

Card fields:
- original combination;
- publication title;
- volume/issue;
- pages;
- CAS/GBIF link.

Why:
- the bibliographic fact is interesting;
- rights for reproducing the magazine scan are not established;
- metadata can still feel intentional and designed.

---

## Frame 5 — ICZN ruling

Use a **DocumentCard**:

Title:
> ICZN Opinion 485

Support:
- relative-priority dispute;
- 1957;
- volume/issue/pages;
- DOI / BHL link.

Do not reproduce the BHL page scan by default because current BHL rights metadata is noncommercial.

This is a key example of the product looking good **without cheating on rights**.

---

## Frame 6 — Schultz / Operation Crossroads

Only after AquaScrape #45 rights gate.

Preferred treatment:
- one real Smithsonian log page;
- caption explaining exactly why it is here;
- no mushroom-cloud hero art;
- no “atomic fish” sensational styling.

Layout:
- document image ~45%;
- interpretation copy ~55% on desktop;
- stacked document then copy on mobile.

Copy must keep this as a Schultz-history thread, not imply causal connection to the Cardinal Tetra description.

---

# Pink Princess choreography

## Product role

**Specific correction + honest remaining unknown.**

The strongest current product moment is not “mysterious plant origin” in the abstract.

It is:
> We found a concrete claim in our own product that did not survive the source check.

That demonstrates why the evidence system matters.

---

## Frame 1 — identity

Eyebrow:
> FloraTrack field note

Title:
> Pink Princess

Scientific:
> *Philodendron erubescens* 'Pink Princess'

Right:
- CC0 Pink Princess photograph once AquaScrape #45 preserves manifest metadata;
- allow real pink/green color to dominate;
- no green monochrome treatment.

Lead direction:
> Famous cultivar. Messy paper trail.

Avoid saying the real-world origin is definitively unknown unless the research shelf supports that stronger statement.

---

## Frame 2 — correction

Section heading:
> What changed

Use `CorrectionCard`.

Previous claim:
> PP31149 covers Pink Princess.

Corrected claim after #50/#276:
> PP31149 is a different plant patent; the relevant EM0003 patent is PP36881.

Exact wording must remain bounded to accepted #276 output.

## Visual treatment

Previous claim:
- lower contrast;
- strike;
- no red warning icon.

Corrected claim:
- normal white;
- amber only as a quiet editorial marker.

No:
- “BUSTED”;
- police stamp;
- fake legal seal;
- dramatic error animation.

---

## Frame 3 — side-by-side paper trail

Desktop:
- PP31149 document card;
- PP36881 evidence object / document card.

Mobile:
- wrong patent first;
- correct relevant patent second.

The visual comparison should make the correction understandable before the user opens either receipt.

---

## Frame 4 — what the patent actually supports

After upstream source preservation:

Use one exact PP36881 origin/parent line as an evidence object **only within the preserved locator scope**.

The interpretation next to it should explicitly separate:

- what the patent says about EM0003;
- what it says about Pink Princess as parent;
- what it does **not** establish about Pink Princess's original creator.

This boundary is the product.

---

## Frame 5 — honest unknown

Use `UnknownCard`.

Question:
> Who originated Pink Princess?

Current-answer pattern:
> The current accepted BioTrack evidence does not establish that person.

Not:
> Nobody knows.

“What would settle it” may list evidence classes approved by the product contract:
- dated nursery/breeder catalog;
- original introduction record;
- contemporaneous trade publication;
- qualifying registration/patent document tied to the claim.

No detective/mystery illustration.

The absence should look calm and intentional.

---

## Frame 6 — threads

Possible questions after the correction packet is accepted:

1. **What exactly is EM0003?**
2. **Open the patent receipt.**
3. **What would prove Pink Princess's origin?**
4. **What other cultivar claims have source conflicts?** — only if a real destination exists.

Do not invent cross-cultivar density merely to avoid a dead end.

---

# Pea Puffer choreography

## Pre-v2 state

Do **not** render an impoverished pseudo-dossier.

Use subject identity if permitted, then `ResearchingState`:

> This rabbit hole is still being verified.

Supporting body should explain that the accepted release does not yet contain the relationships needed for the full story.

Optional:
- subject hero image if rights/identity are already clean;
- no speculative facts.

This is visually better than filling the page with generic care information.

## Post-v2

Once accepted v2 + Content Factory #204 pass, the choreography can move to:

1. subject;
2. two describers;
3. original combination;
4. 1941;
5. receipts;
6. next supported thread.

Do not design the final Pea Puffer sequence before the packet exists.

---

# Exploration trail behavior

Optional example:

```text
Field Notes — Cardinal Tetra — Leonard P. Schultz — Operation Crossroads
```

This is orientation, not ontology.

Rules:
- show the path the user actually followed;
- never imply every adjacent breadcrumb is a canonical graph edge;
- current item has no link;
- horizontal scroll allowed on phone;
- no node bubbles.

If the product is opened directly from search, a single subject item is fine.

---

# Asset choreography

## Organism image

Purpose:
> emotional identification

Position:
- hero;
- high visual weight.

## Evidence image/document

Purpose:
> proof / historical texture

Position:
- only after the claim it supports;
- never before explanation.

## Context map

Purpose:
> atmosphere / geographic orientation

Position:
- optional deeper section;
- never beside a claim that could make it look like exact locality evidence unless it actually is.

## Person portrait

Purpose:
> humanize a named person

Position:
- thread destination / detail;
- not required in the main subject hero.

A missing portrait is not a broken design.

---

# Motion choreography matrix

| Event | Motion | Timing | Avoid |
|---|---|---:|---|
| subject appears | fade + y18 | 500ms | scale bounce |
| section enters | fade + y18 | 500ms | every paragraph animating |
| thread enters | fade + x-10 | 340ms | node movement |
| thread hover | arrow +4px | 150ms | card lift |
| receipt disclosure | semantic details / subtle | <=240ms | modal launch |
| correction appears | fade + y10 | 280ms | shake/red flash |
| unknown appears | essentially static | minimal | spinner/pulse |
| route change | immediate navigation | browser/app normal | 600ms decorative delay |

---

# Crop guidance

## Subject hero

Preferred:
- source image >= 1000px long side where possible;
- desktop 4:3;
- phone 4:3 or near-square;
- focal point stored per asset if needed.

Do not encode important text inside hero images.

## Evidence document

Preferred:
- preserve surrounding context;
- 3:4 or natural page ratio;
- no fake perspective transform;
- no artificial paper aging;
- crop can highlight region through layout, not destructive blur elsewhere.

## Social/share crop later

Not part of #27.

Do not optimize the primary product view around 9:16 or 1:1 social cards.

---

# Acceptance before wiring #27

The final prototype should not start until:

- PR #32 visual QA passes;
- #25 dead-link repair passes;
- #26 public-truth cleanup passes;
- Cardinal #273 is adjudicated;
- Pink #50 -> #276 is adjudicated or Pink is intentionally reduced;
- Endemic #18 opens the prototype gate.

Then implementation should mostly be:
1. adapt accepted packet -> `RabbitHoleSubjectModel`;
2. supply production-eligible assets;
3. route;
4. screenshots/taste QA.

There should be no new visual-system design phase at that point.
