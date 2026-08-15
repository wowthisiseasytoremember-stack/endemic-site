# Publication Definition of Done

Before any article is published or considered complete, it must pass the following multi-layer checks.

## 1. Automated Validation (CI/CD)
The build pipeline (`pnpm validate:content`) must pass with zero errors. This checks:
- Zero unknown MDX components.
- Zero raw layout HTML (`className`, `style`).
- Zero `<h1>` tags inside the article body.
- No skipped heading levels.
- All `heroImage` and `<Figure>` assets exist on disk in `public/content-data/`.
- No side-stripe borders or over-rounded cards (enforced via component tests).

## 2. Factual Evidence Matrix
All scientific and husbandry claims must be audited.
- Assertions like "A. macmasteri is a Rio Negro species" must have a verifiable source.
- Dangerous husbandry advice (e.g., "add a pinch of ammonia") will trigger an automatic rejection.

## 3. Editorial Quality Score (Must score 90+)
- Accuracy and sourcing (25)
- Readability and editorial quality (20)
- Information architecture (15)
- Brand and visual composition (15)
- Component appropriateness (10)
- Accessibility and semantics (10)
- Metadata and internal linking (5)

## 4. Visual Regression
The article must look correct across all breakpoints (375px, 768px, 1280px) and not resemble a templated "codex" generation. Asymmetrical Bento grids and timeline structures should be used to provide editorial variety.
