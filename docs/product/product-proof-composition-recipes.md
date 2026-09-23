# Product-proof composition recipes

Status: **presentation contract / no truth authority**

These recipes define how already-accepted material should be composed once the evidence pipeline supplies it. They are intentionally content-agnostic and do not authorize any subject, fact, route, or product pivot.

## 1. Established story

Use when the evidence supports a clean relationship with an interesting human/history/place thread.

### Page rhythm

```
SubjectIdentity
  ↓ 24–40px
StoryLead
  ↓ 32px
2–3 ThreadCards
  ↓ 40px
SourceShelf / EvidenceReceipt
  ↓ 56px
Explore next
```

### Motion

- hero: no entrance animation beyond normal page paint;
- StoryLead: 18px fade-up, 550ms;
- ThreadCards: 75ms stagger, maximum 3 cards in the first sequence;
- receipts: no automatic animation;
- avoid looping motion except a tiny directional cue;
- reduced-motion: render immediately.

### First-screen rule

The first viewport should answer only:

> Why should I care about this one?

Do not put evidence IDs, graph counts, taxonomic tables, or multiple competing headlines above the first thread action.

---

## 2. Correction story

Use when a popular/project framing is too broad, wrong, or semantically collapsed.

### Page rhythm

```
SubjectIdentity
  ↓
StoryLead (the surprising correction)
  ↓
CorrectionCard
  ↓
ThreadCard: "How do we know?"
  ↓
EvidenceReceipt / SourceDocument
  ↓
optional MysteryCard if a real question remains
```

### Tone

Correction should feel like discovery, not scolding.

Prefer:

> The story is a little stranger than the usual version.

Avoid:

> MYTH BUSTED
> WRONG
> DEBUNKED

unless the evidence truly supports a binary false statement and the tone fits the article.

### Visual rule

Amber indicates **narrowing/correction**, not danger.

Red should remain rare and reserved for genuinely conflicting/disputed material.

---

## 3. Honest mystery

Use when the accepted evidence establishes the boundary of knowledge but does not establish the answer.

### Page rhythm

```
SubjectIdentity
  ↓
StoryLead (why the missing answer matters)
  ↓
MysteryCard
  ↓
ThreadCard: known lineage/person/place relation
  ↓
SourceShelf
  ↓
ResearchingState
```

### Critical truth rule

A missing relationship in the project corpus is **not automatically a real-world historical mystery**.

The MysteryCard may say:

> Our accepted evidence does not currently establish X.

It may say:

> X is historically unresolved.

only when qualifying evidence establishes that stronger statement.

### Visual rule

Unknown should look intentional and premium:
- quiet border;
- generous whitespace;
- no warning icon;
- no error-red;
- explicit "what would resolve it" block.

---

## 4. Reconstruction / place story

Use when locality/ecology evidence is actually strong enough to support a build or habitat narrative.

### Page rhythm

```
SubjectIdentity / place identity
  ↓
StoryLead
  ↓
strict evidence block
  ↓
practical substitution block
  ↓
CorrectionCard for "authentic vs inspired"
  ↓
SourceShelf
  ↓
optional handoff to build/setup artifact
```

### Visual distinction

Strict and practical modes must never differ only by tiny labels.

Recommended:
- strict = neutral/aqua;
- practical substitutions = amber-accented note;
- every substitution states **what role it substitutes for** and **what authenticity is lost**.

Do not render a practical substitute as a canonical co-occurrence.

---

## 5. Destination-state behavior

Every thread action has exactly one state.

### READY
A real destination exists and is safe to open.

Visual:
- aqua accent;
- hover lift;
- arrow motion;
- keyboard focus.

### SUMMARY
The relationship is supported but no full page exists.

Visual:
- still clickable if an in-page summary/drawer exists;
- quieter than READY;
- never route to a placeholder page.

### RESEARCHING
The question is valid and actively unresolved in the product corpus.

Visual:
- amber;
- non-clickable unless there is a real research/status view;
- may expose "what evidence would resolve it."

### UNAVAILABLE
The product cannot safely answer or route this thread.

Visual:
- low contrast;
- no hover lift;
- no arrow movement;
- not focusable.

---

## 6. Transition language

Motion should help a user understand **sequence and causality**, not decorate the page.

### Approved motions

- reveal: opacity 0 → 1, y 18 → 0, 550ms;
- card sequence: 75ms stagger;
- hover: y 0 → -2px, 300ms;
- arrow cue: x 0 → 3 → 0, ~1.8s, optional;
- disclosure: native details/summary or simple height/fade.

### Avoid

- parallax on factual text;
- node-bubble physics;
- continuous background motion behind reading text;
- rotating evidence badges;
- dramatic page wipes;
- typewriter effects;
- motion that implies confidence/progress where none exists.

All motion must become effectively static under `prefers-reduced-motion`.

---

## 7. Mobile composition

At ~390px:

- one card per row;
- no horizontal relationship graph;
- scientific name may wrap naturally;
- receipt source/locator stacks below labels;
- source-document excerpt max ~4–6 lines in first view;
- thread state badge remains visible but secondary;
- minimum 44px interactive target;
- no information encoded by hover alone.

The user should reach the first meaningful thread action within roughly two normal phone screens after the hero.

---

## 8. Visual asset rules

### Exact organism imagery

When an image visually claims to depict the subject:
- use exact-species/exact-cultivar media with rights/provenance;
- generated photoreal imagery must not masquerade as evidence.

### Historical/source material

Prefer:
- public-domain/rights-cleared archival image;
- faithful crop of an inspectable source when display rights permit;
- otherwise use the `SourceDocument` treatment with text/citation.

### Decorative imagery

May be generated or abstract only when it cannot be confused with:
- the exact organism;
- a specimen;
- a habitat record;
- a historical document.

Decorative imagery should support atmosphere, not facts.

---

## 9. Acceptance checklist for future screenshots

A future proof screenshot should be rejected if:

- the first screen has more than one dominant idea;
- evidence chips dominate the headline;
- a disabled thread looks clickable;
- "unknown" looks like an app error;
- source material is illegibly tiny;
- the same card treatment is used for story, correction, mystery, and receipt;
- motion competes with reading;
- any visual implies a biological relationship not present in the accepted fixture;
- the page resembles an admin dashboard or graph database.

The target is:

> **Field Notes became interactive.**

Not:

> **BioTrack got a frontend.**
