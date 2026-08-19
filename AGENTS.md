---
schema: agents-md/v1
project: endemic-site
initiative: monetization
family: apps
what: >-
  Next.js web platform for the Endemic ecosystem — the public-facing web hub that showcases aquatic species (AquaTrack) and plants (FloraTrack) with an editorial blog and interactive data exploration, fed by the BioTrack species data.
status: active
stack: [next, react, typescript]
entrypoints:
  - package.json
modules:
  - name: Web app
    path: app/ or pages/
    does: Next.js routes for species showcase + blog.
    status: wip
  - name: Data sync layer
    path: (integration)
    does: Requires AquaTrack/FloraTrack species DB live before content phases.
    status: wip
updated: 2026-08-19 20:30 UTC
---

# AGENTS.md — endemic-site

> Part of the **BioTrack trilogy** (AquaTrack + FloraTrack + BioTrackCore). Endemic is the web surface that exposes their species data; see `twitch-rebroadcaster` only for relay branding, and `AquaTrack`/`FloraTrack` AGENTS.md for the data layer. Not under `content-factory` — that initiative is the media *pipeline*, Endemic is the *product site* on top of BioTrack data.

## What It Is
Next.js web platform for the **Endemic** ecosystem — showcases aquatic species (AquaTrack) and plants (FloraTrack) with an editorial blog and interactive data exploration.

## Status
- Active. Last commit 2026-08-15 (docs: monetization blueprint).

## Delegation Rules (enforce)
- **Content generation** (blog articles, species copy): route to `deepseek-worker` for bulk/article generation.
- **Database integration / data sync**: route to `deepseek-worker`; requires the data-sync prerequisite (species DB live) before content phases.
- **Architecture / roadmap decisions**: human orchestration only.

## Roadmap Handoff Points
- Phases 0–5 defined; handoff points and the data-sync prerequisite must be documented so a worker does not start a content phase before DB sync completes.

## Notes
- Do NOT let a worker scaffold new DB models without confirming the sync layer exists first.
