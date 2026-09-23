# Endemic Rabbit-Hole Visual System

**Status:** design/implementation substrate only  
**Date:** 2026-09-22  
**Product authority:** BioTrackCore Draft PR #51  
**Production routing/data wiring:** blocked behind Endemic #18/#25/#26/#27 and RI/evidence gates

## Goal

Make the eventual BioTrack/Endemic experience feel like a **modern natural-history editorial product with receipts**, not a database browser, aquarium dashboard, gaming HUD, or generic SaaS card system.

The product should feel:

- curious;
- quiet;
- tactile without fake skeuomorphism;
- evidence-aware without looking like a compliance tool;
- visually rich when real media exists;
- deliberately incomplete when truth is incomplete.

## Existing system: keep vs reduce

### Keep

- existing Endemic dark canvas;
- Outfit display type + Inter UI type;
- Aqua / Flora accent distinction;
- restrained historical plate imagery;
- `Reveal` / Framer Motion infrastructure;
- reduced-motion handling;
- current editorial reading widths;
- large immersive subject imagery when rights and identity are clear.

### Reduce

- glass on every surface;
- glow as a default emphasis mechanism;
- large pill/badge density;
- repeated hover lift;
- 3D tilt on informational cards;
- generic dashboard stat strips;
- generic “confidence percent” UI where confidence is not a defined quantitative metric;
- parallax for ordinary reading content.

### Do not promote

- `ConnectionWeb.tsx` as the primary product interaction;
- bubble/node graph UI;
- raw edge counts as visual spectacle;
- emoji as primary product iconography;
- red error styling for honest unknowns.

## Primary visual metaphor

**Field note + evidence desk + museum label.**

A page should have:

1. a strong specimen/subject identity;
2. one dominant reason to care;
3. a visible next thread;
4. quiet receipts;
5. explicit corrections or unknowns when needed.

The subject remains the hero; UI chrome should recede.

---

## Motion grammar

Motion must communicate **meaning**, not simply prove that the interface is animated.

### 1. Subject entry — settle

Purpose: establish a place/subject.

- opacity 0 -> 1
- y 18 -> 0
- 500ms
- ease `[0.16, 1, 0.3, 1]`
- run once
- no scale bounce

Use for:
- hero copy;
- “why interesting” sections;
- major page sections.

### 2. Follow the thread — direction

Purpose: show movement from one idea to the next.

Idle:
- no animation.

Hover/focus:
- arrow translates +4px over 150ms;
- border becomes slightly clearer;
- no card lift;
- no glow explosion.

Entrance:
- opacity + x -10 -> 0
- 340ms.

Route-level transition, when later implemented:
- preserve subject identity/context when possible;
- old supporting material fades 120–180ms;
- next relationship content enters 180–260ms;
- avoid full-screen wipes/spinners.

### 3. Receipt — disclose

Purpose: reveal proof without interrupting reading.

- receipt is visually secondary;
- default collapsed;
- opening should feel like unfolding a footnote, not launching a modal;
- 180–240ms maximum if animated later;
- no bright accent pulse.

The first implementation deliberately uses semantic `<details>` so truth remains accessible with JS/motion disabled.

### 4. Correction — replace

Purpose: make a factual correction legible.

Sequence if later animated:
1. old claim opacity falls slightly / strike becomes visible: ~120ms;
2. corrected claim appears: ~180ms;
3. receipt becomes available immediately.

Do not:
- shake;
- flash red;
- use “MYTH DESTROYED” styling;
- imply wrongdoing where the issue is ordinary evidence correction.

### 5. Unknown — remain still

Unknowns should be the **least animated** state.

No pulse, spinner, warning bounce, or red alert.

The stillness is intentional: this is an unresolved research state, not a loading failure.

### 6. Reduced motion

All nonessential motion disappears under `prefers-reduced-motion`.

Never make relationship meaning depend on animation direction alone.

---

## Core reusable primitives

Implemented on the isolated design branch:

### `SubjectIdentity`

Editorial hero identity:
- eyebrow;
- common/display name;
- scientific name;
- short “why care” lead;
- optional real image.

No database metrics above the fold.

### `RelationshipFact`

Typography-first typed relationship.

Example:

```text
Paracheirodon axelrodi
—— described by · 1956 ——
Leonard P. Schultz
```

This replaces graph-node bubbles for ordinary relationship communication.

### `ThreadLink`

Natural-language next question with explicit destination state:

- READY
- SUMMARY
- RESEARCHING
- UNAVAILABLE

Dead or not-yet-supported destinations do not become fake links.

### `EvidenceReceipt`

Quiet disclosure for:
- source label;
- relationship supported;
- locator;
- accepted release;
- scoped note.

Raw internal filesystem paths should not be hero copy.

### `UnknownCard`

First-class unresolved state:
- question;
- current safe answer;
- why unresolved;
- what evidence would settle it.

No generic red error design.

### `CorrectionCard`

Two-part claim repair:
- previous claim;
- what evidence supports;
- optional scope note;
- receipt slot.

Suitable for the Pink Princess wrong-patent story if/when AquaScrape #50 + CF #276 pass.

### `RabbitHoleReveal`

Small Framer Motion wrapper encoding the allowed entrance vocabulary.

Not a page-transition framework.

---

## Asset system

The first proof does **not** need a huge art pipeline. It needs a small number of excellent, correctly attributed assets.

### Asset classes

#### A. Subject hero

Use:
1. rights-cleared real organism/cultivar photo;
2. historical/public-domain plate when identity is correct and editorially appropriate;
3. quiet abstract/texture fallback.

Never use:
- AI-generated organism image as documentary evidence;
- a wrong species because it “looks close”;
- a historical plate without identifying what it depicts.

#### B. Document evidence crop

Examples:
- original-description page;
- ICZN opinion title/page;
- patent title/origin paragraph;
- museum catalog/archival record.

Requirements:
- source ID;
- locator;
- rights/use note;
- caption explaining exactly what the crop proves.

The crop is an **evidence object**, not decorative texture.

#### C. Person/history media

Use only if identity/right-to-use is clear.

A missing portrait is better than a dubious portrait.

Fallback:
- name;
- dates;
- typographic monogram;
- document signature only when source/right is clear.

#### D. Decorative texture

Allowed to be generated or authored because it carries no factual claim.

Examples:
- paper grain;
- subtle water-caustic texture;
- botanical shadow;
- archival desk light/falloff.

It must remain obviously decorative and cannot imitate a historical document.

---

## Proof-subject asset manifest

### Cardinal Tetra

**Minimum excellent set**
- [ ] real Cardinal Tetra hero image, correctly licensed;
- [ ] original-description / bibliographic visual tied to the 1956 *Tropical Fish Hobbyist* receipt;
- [ ] ICZN Opinion 485 visual crop/title page if rights/use allow;
- [ ] Schultz portrait/archive media only if identity + rights are clean;
- [ ] Axelrod portrait only if identity + rights are clean.

**Do not need**
- generic Bikini mushroom-cloud imagery;
- fake “atomic fish” art;
- a dramatic naming-race timeline before exact chronology is fully sourced.

**Visual story**
1. fish;
2. typed role split: Schultz vs Axelrod;
3. old scientific name/publication;
4. competing name / ICZN receipt;
5. Operation Crossroads context as a separate Schultz thread, not causal decoration.

### Pink Princess

**Minimum excellent set**
- [ ] real Pink Princess hero photo;
- [ ] PP36881 title/origin crop once AquaScrape #50 preserves it;
- [ ] PP31149 title/identity crop proving the old article's patent mismatch;
- [ ] quiet unresolved-origin treatment.

**Do not need**
- invented breeder portrait;
- generic “patent approved” stamp art;
- stock courthouse/legal imagery.

**Visual story**
1. famous plant;
2. old claim struck through;
3. wrong-patent receipt;
4. correct EM0003 patent receipt;
5. “originator still not established by accepted evidence” unknown card.

### Pea Puffer

**Blocked until accepted v2/#204.**

Later likely set:
- [ ] real Pea Puffer hero;
- [ ] original combination document/source crop;
- [ ] Hora identity media if rights clear;
- [ ] Nair identity media if rights clear;
- [ ] 1941 document treatment.

Do not generate/source speculative geography merely to fill the page.

---

## Image treatment

### Hero images

- large;
- natural crop;
- low UI overlay density;
- avoid the current default “30% opacity + luminosity + heavy gradient” on every image;
- retain enough color/texture for the organism to feel alive.

Preferred desktop:
- text 55–65%;
- image 35–45%.

Mobile:
- image first or immediately after identity;
- no tiny split-panel hero.

### Historical documents

- preserve paper color where possible;
- avoid fake sepia filters;
- crop with generous margin around the evidentiary line;
- optional quiet locator rule/caption below;
- no magnifying-glass cliché.

### Captions

Every evidentiary image caption answers:
> Why am I seeing this?

Not just:
> Source: Smithsonian.

Example:
> Smithsonian archive record describing Schultz's 1946 Operation Crossroads reef-fish investigation.

---

## Responsive behavior

### Phone

Priorities:
1. subject;
2. why interesting;
3. first thread;
4. correction/unknown;
5. receipt.

Rules:
- no multi-column relationship diagrams;
- minimum 44px interactive target;
- scientific names may wrap naturally;
- thread arrow remains visible;
- receipt locators wrap/break safely;
- no horizontal carousel required for core comprehension.

### Tablet/desktop

Use extra width for:
- document + interpretation pairing;
- relationship comparison;
- optional sticky local thread index.

Do not fill empty width with extra metrics.

---

## Information hierarchy test

Every subject screen should pass the five-second test:

1. What organism/subject is this?
2. Why is it interesting?
3. What can I follow next?

Within thirty seconds:

4. What is supported?
5. What remains unknown/corrected?

If the first thing a user notices is “confidence 87%,” graph edges, database counts, or UI controls, the hierarchy is wrong.

---

## Transition cleanup candidates in current Endemic

These are later integration work, not part of this isolated component PR:

### `TiltCard`

Keep for marketing/app tiles if desired.

Do not use it on:
- receipts;
- relationship facts;
- corrections;
- unknowns;
- research/document cards.

### `Reveal`

Keep infrastructure, but reduce universal 800ms/28px movement on dense reading pages.

Use the new smaller motion presets for rabbit-hole detail surfaces.

### `MarkdownViewer`

Current behavior animates essentially every markdown block from y=50 over 800ms.

For evidence-heavy longform, this is too theatrical and creates visual churn. Later change:
- paragraphs/lists: no entrance animation;
- section headings/major callouts only;
- reduced y distance.

### `FieldNotesPageClient`

Parallax historical plate hero can remain an editorial landing-page flourish.

Do not copy its glow/badge/hover language into the subject detail product.

### `ArticleLink`

The custom 600ms delayed navigation is too slow for rabbit-hole traversal.

Later subject/thread navigation should feel closer to 150–260ms and never intentionally delay routing for a decorative exit animation.

---

## Implementation boundary

This design branch intentionally does **not**:
- wire a route;
- consume BioTrack data;
- change public copy;
- alter homepage/nav;
- implement analytics;
- introduce a new design library;
- add a graph viewer;
- merge production code.

It exists to give Endemic #27 a tested visual vocabulary once the truth/product gates open.

## Visual QA checklist for later local validation

For each primitive at 390px and desktop width:

- [ ] readable in <1 second;
- [ ] one dominant target;
- [ ] no clipped scientific name;
- [ ] no overflow from source locator;
- [ ] usable with keyboard;
- [ ] destination state understandable without color;
- [ ] reduced-motion mode preserves meaning;
- [ ] unknown does not look like an error;
- [ ] correction does not look sensational;
- [ ] receipts are obvious enough to find but do not dominate;
- [ ] Aqua and Flora variants feel like siblings.
