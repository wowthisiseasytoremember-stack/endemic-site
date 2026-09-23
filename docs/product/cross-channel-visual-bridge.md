# Cross-channel visual bridge: Content Factory -> Endemic web

Status: **alignment guide / no runtime dependency**

Purpose: keep the future interactive Endemic experience visually related to the already-built Content Factory / Field Notes primitive language without importing video-overlay implementation into the web app.

## Principle

Share **semantic roles and visual grammar**, not renderer code.

Content Factory owns fixed-frame SVG/video overlays.
Endemic owns responsive, accessible web interaction.

Do not create a cross-repo component dependency.

## Primitive mapping

| Content Factory primitive | Existing CF job | Endemic web equivalent | Web behavior |
| --- | --- | --- | --- |
| `taxonomy-stamp` | identify subject honestly | `SubjectIdentity` / scientific-name treatment | responsive identity, no confidence theater |
| `fact-flash-card` | one strong factual beat | `StoryLead` | one dominant "why interesting" idea |
| `source-fact-card` | fact + source receipt | `EvidenceReceipt` / `SourceDocument` | source stays secondary until opened |
| `before-after-snap` | make a correction/change legible | `CorrectionCard` | old framing vs evidence-supported framing |
| `section-divider` | chapter reset | section eyebrow + thin accent rule | reading orientation, not decoration |
| planned `relationship-card` | typed subject -> predicate -> object | `ThreadCard` | translate relationship into a human question |
| planned `unknown-field-card` | honest absence | `MysteryCard` / `ResearchingState` | unknown becomes intentional, not error state |

## Shared visual grammar

Keep these recognizable across video and web:

- very dark ink/panel base;
- one accent per information role;
- high-contrast white primary text;
- compact uppercase labels;
- italic scientific names;
- thin left/bottom accent rather than thick dashboard chrome;
- large single statement rather than many tiny metrics;
- source/receipt is a distinct visual layer.

## Color reconciliation

Content Factory currently uses brighter fixed-frame colors:
- aqua `#2EF0C9`
- sky `#7DD3FC`
- gold `#F5C84B`

Endemic web already has:
- aqua `#1fb8c4`
- emerald `#2fae6b`
- amber `#e8a12c`

Do **not** import CF hex values into the web app just to force identity.
The shared identity comes from semantic use + layout language. Endemic keeps its existing tokens.

## Typography reconciliation

CF overlay templates use Inter/Arial because they are rendered into video.

Endemic should keep:
- display serif for story/identity;
- sans for labels/controls;
- monospace only for evidence locators.

The website should not imitate video typography literally.

## Transition reconciliation

CF:
- hard cut / short accent flash;
- brief overlay exposure;
- rapid retention reset.

Endemic:
- 550ms reveal;
- 75ms thread stagger;
- 2px hover lift;
- native disclosure;
- no hard flashes.

The role is the same: **signal a new information beat**.
The tempo differs because the user controls reading speed.

## Content parity rule

A story object can move across media only when its factual scope survives the transfer.

Example semantic object:

```
subject
relationship/correction
safe statement
scope warning
source reference
```

Content Factory may render that as an SVG/video overlay.
Endemic may render it as a StoryLead + EvidenceReceipt.

Neither renderer may strengthen the claim.

## Avoid visual drift

Reject future web components that introduce:
- node-bubble network maps as primary navigation;
- neon cyberpunk graph chrome;
- generic SaaS metric tiles;
- confidence percentages with no real probabilistic meaning;
- badges for every field;
- more than one accent color inside a single small card.

Reject future CF primitives that require the web product to copy a video-specific effect to remain "on brand."

## Outcome

The desired relationship is:

> same editorial desk, different medium.

A user should recognize the same instincts:
- honest label;
- strong fact;
- correction when needed;
- receipt available;
- unknown preserved.

They should not feel like the website embeds YouTube overlay graphics.
