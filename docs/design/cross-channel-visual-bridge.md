# Cross-channel visual bridge

Status: **alignment guide / no runtime dependency**

Purpose: keep the future Endemic experience visually related to Content Factory's existing Field Notes primitives without importing video-overlay implementation into the web app.

## Principle

Share **semantic roles and visual grammar**, not renderer code.

Content Factory owns fixed-frame SVG/video overlays.
Endemic owns responsive accessible web interaction.

## Mapping

| Content Factory | Job | Endemic web |
| --- | --- | --- |
| `taxonomy-stamp` | honest subject identity | `SubjectIdentity` |
| `fact-flash-card` | one strong factual beat | `RelationshipFact` / hero lead |
| `source-fact-card` | fact + receipt | `EvidenceReceipt` / `DocumentCard` |
| `before-after-snap` | correction/change | `CorrectionCard` |
| `section-divider` | chapter reset | restrained section label/rule |
| planned `relationship-card` | typed relation | `RelationshipFact` / `ThreadLink` |
| planned `unknown-field-card` | honest absence | `UnknownCard` / `ResearchingState` |

## Shared grammar

Keep recognizable:
- very dark base;
- one accent per information role;
- compact uppercase labels;
- italic scientific names;
- thin accent rules;
- one dominant statement;
- source/receipt as a distinct secondary layer.

## Do not copy literally

Content Factory uses brighter fixed-frame video colors and Inter/Arial because overlays are rendered into moving video.

Endemic keeps its existing web typography and color language.

Shared identity comes from semantics and hierarchy, not identical hex values.

## Motion translation

Content Factory:
- hard cuts;
- short overlay exposure;
- rapid retention reset.

Endemic:
- gentle section settle;
- directional thread entrance;
- native disclosure;
- no hard flashes.

Same role, different tempo.

## Claim parity

A story object moving across media should preserve:

```
subject
relationship/correction
safe statement
scope warning
source reference
```

Neither renderer may strengthen the claim.

## Avoid drift

Reject future web components that introduce:
- node-bubble maps as primary navigation;
- neon graph chrome;
- generic SaaS metrics;
- probabilistic-looking confidence percentages without a real model;
- badges on every field.

Reject future video primitives that require the web app to mimic a video-specific effect to remain "on brand."

Desired relationship:

> same editorial desk, different medium.
