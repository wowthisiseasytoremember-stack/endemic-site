import { z } from 'zod';

export const EditorialPlanSchema = z.object({
  archetype: z.enum([
    "guide",
    "profile",
    "research",
    "comparison",
    "field-story"
  ]),
  heroVariant: z.enum(["overlay", "split", "minimal"]),
  thesis: z.string().min(20),
  sections: z.array(
    z.object({
      heading: z.string(),
      intent: z.enum([
        "explanation",
        "parallel-concepts",
        "structured-data",
        "sequence",
        "ranking",
        "profiles",
        "related-content"
      ]),
      treatment: z.enum([
        "prose",
        "bento-grid",
        "data-table",
        "timeline",
        "ranked-list",
        "stat-strip",
        "figure"
      ])
    })
  )
});

export type EditorialPlan = z.infer<typeof EditorialPlanSchema>;
