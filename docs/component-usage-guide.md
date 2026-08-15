# Component Usage Guide

This is the definitive API contract for all approved MDX components. All LLM-generated MDX must adhere strictly to these TypeScript interfaces and usage limits.

## Base Layout

### `<BentoGrid>`
The core semantic wrapper for cards, replacing identical feature grids.
- **Allowed props:**
  - `cols` (number): 1, 2, 3, or 4.
  - `className` (string): For margin adjustments.
- **Rules:** Must support asymmetrical `colSpan` children to break visual monotony.

## Content Modules

### `<FeatureCard>`
A content card meant for use within a `<BentoGrid>`.
- **Allowed props:**
  - `title` (string, required)
  - `image` (string, optional)
  - `colSpan` (number, optional): For asymmetrical layouts within BentoGrid (e.g. 2).
  - `children` (ReactNode, required): The main text.

### `<Callout>`
Highlighted text block for key takeaways, warnings, or notes.
- **Allowed props:**
  - `type` ("accent" | "note" | "warning"): Determines the subtle background tint.
  - `icon` (string, optional): Emoji or small SVG icon.
  - `label` (string, optional): e.g., "Takeaway", "Caution".
  - `children` (ReactNode, required)
- **Rules:** Must use full 1px borders or subtle tints. No `border-left` side-stripes.

### `<SpeciesCard>`
A card summarizing a specific species.
- **Allowed props:**
  - `name` (string, required): Common name.
  - `latin` (string, required): Scientific name.
  - `image` (string, optional)
  - `colSpan` (number, optional)
- **Rules:** Max 16px border-radius. No side-stripes.

### `<StatStrip>`
A horizontal or wrapped band of key statistics.
- **Allowed props:**
  - `items` (Array<{label: string, value: string}>)

### `<Timeline>` & `<TimelineStep>`
For chronological sequences, preventing manual numbered lists.
- **`<Timeline>` Props:**
  - `children` (ReactNode): Must only contain `<TimelineStep>`s.
- **`<TimelineStep>` Props:**
  - `title` (string, required)
  - `duration` (string, optional): e.g., "1847-1849"
  - `children` (ReactNode, required)

### `<RankedList>` & `<RankItem>`
For ordered rankings (e.g., top 5 biotopes).
- **`<RankItem>` Props:**
  - `rank` (number, required)
  - `title` (string, required)
  - `children` (ReactNode, required)

## Excluded Usage
Do not use:
- `<FeatureGrid>`, `<ProfileGrid>`, `<RelatedGrid>`: Replaced by `<BentoGrid>`.
- Raw HTML (`<div className="...">`, `<style>`).
- Oversized cards (text length exceeding 150 words per card).
