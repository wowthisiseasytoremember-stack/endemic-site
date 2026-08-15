# Endemic Editorial Brand Constitution

## Overview
This document defines the overarching visual grammar, tone, and layout rules for the Endemic platform. All generated content, MDX layouts, and React components must strictly adhere to this constitution.

## Core Tone and Audience
- **Audience:** Aquarium hobbyists and natural history readers with casual to intermediate interest in ichthyology.
- **Tone:** Conversational, curious, slightly scholarly, but younger, smart, and genuinely interested. Awed by nature and fascinated by historical/biological connections.
- **Style:** American English. High-quality editorial, NOT a typical SEO-farmed blog post.

## The Visual Grammar
The blog must share the production-level visual grammar of our presentation-grade PDFs:
- **Palette:** Matte charcoal backgrounds (`#1A1A2E`), warm near-white body copy (`#F4F4F5`), and signal-yellow accents for hierarchy. No glassmorphism, no neon effects, no heavy shadows.
- **Typography:** Modern, structured sans-serifs (like Inter or Roboto) for body, paired with robust display fonts for headings.
- **Spacing:** High-density, magazine-style layout. Avoid endless walls of text.

## Impeccable Design Constraints (Strictly Enforced)
1. **The "Endless Grid" Ban:** Never use identical, endlessly repeating card grids. Components like `<BentoGrid>` must support asymmetrical spanning capabilities (e.g., `colSpan`) to break monotony.
2. **The "Side-Stripe" Ban:** `border-left` or `border-right` colored accents are absolutely banned. `<Callout>` and `<SpeciesCard>` must use full borders (e.g., 1px solid) or subtle background tints instead of a single side stripe.
3. **Corner Radii Limits:** Do not over-round corners. The maximum allowed corner radius for cards and containers is 12px to 16px (`rounded-xl` or `rounded-2xl`). Fully rounded pill shapes are reserved exclusively for small tags or buttons.
4. **Hero Sections:** Must be full-bleed, impactful, and visually striking, avoiding the generic "Hero-metric template" (big number, small label, gradient accent).
