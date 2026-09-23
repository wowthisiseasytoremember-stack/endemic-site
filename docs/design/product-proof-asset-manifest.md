# Product-Proof Asset Manifest

**Date:** 2026-09-22  
**Status:** working asset contract for Endemic #27  
**Visual system:** `docs/design/rabbit-hole-visual-system.md`  
**Evidence authority:** BioTrackCore Draft PR #51 + accepted/source-preserved receipts

This manifest distinguishes:

- `SUBJECT_HERO` — the organism/cultivar itself;
- `EVIDENCE_OBJECT` — a document/image shown because it supports a claim;
- `CONTEXT_ART` — atmosphere/history/geography that must not imply an unsupported relationship;
- `PERSON_MEDIA` — portrait/archive media for a named person.

A source can be useful for research while remaining **ineligible for production display**.

## Production gate

Every production asset must have:

```text
IDENTITY_VERIFIED=YES
CLAIM_SCOPE_WRITTEN=YES
SOURCE_URL_PRESENT=YES
LICENSE_RECORDED=YES
COMMERCIAL_USE=YES
ATTRIBUTION_KNOWN=YES
```

For `EVIDENCE_OBJECT`:

```text
LOCATOR_PRESENT=YES
VISUAL_DOES_NOT_EXCEED_CLAIM_SCOPE=YES
```

If a raw file is preserved by AquaScrape, also require its hash/source identity.

---

# Cardinal Tetra

## C1 — live subject hero

**Role:** `SUBJECT_HERO`  
**Candidate:** Wikimedia Commons `Paracheirodon_axelrodi_2.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Paracheirodon_axelrodi_2.jpg  
**Current rights read:** Public domain / PD-author; Commons page states free for commercial use.  
**Production status:** candidate PASS after AquaScrape manifest verification.

Alternative:
https://commons.wikimedia.org/wiki/File:Neontetra-vis.jpg

Current Commons page also reports public-domain dedication.

### Product use

Use as the full-color organism hero.

Do not:
- desaturate it until it looks archival;
- make it a tiny background behind dashboard text;
- use an aquarium-shop image when this clean-rights option exists.

---

## C2 — original-description bibliographic object

**Role:** `EVIDENCE_OBJECT` rendered as metadata, not scan  
**Fact scope:** original name / publication venue / bibliographic identity  
**Authority shelf:** current merged Cardinal targeted research in Content Factory

Visual representation:
- `DocumentCard`
- title / original name;
- publication;
- volume/issue;
- pages;
- CAS/GBIF external link.

### Rights decision

The 1956 magazine scan itself is `commercial_use=UNCLEAR` until rights are separately established.

**Default production design:** do not reproduce the article scan.

---

## C3 — ICZN Opinion 485

**Role:** `EVIDENCE_OBJECT` rendered as metadata, not scan  
**Source:** https://www.biodiversitylibrary.org/part/149624  
**Fact scope:** formal relative-priority case involving the two 1956 names

Current BHL rights metadata:
- copyright status: in copyright;
- rights holder: International Commission on Zoological Nomenclature;
- license: CC BY-NC-SA 3.0.

**Production scan status:** FAIL for a potentially monetized product by default.  
**Metadata/link status:** PASS.

### Product treatment

Use `DocumentCard`:
- “ICZN Opinion 485”
- 1957
- `Opinions and Declarations` 17(7):87–104
- DOI / external link

No scan required for visual quality.

---

## C4 — Schultz / Operation Crossroads document

**Role:** `EVIDENCE_OBJECT`

Primary candidate:
- Smithsonian SIA2010-0895
- https://siarchives.si.edu/collections/siris_sic_13871

Current record:
- 1946;
- Schultz / Operation Crossroads;
- says Schultz was in charge of the biological investigation of reef fishes;
- reports `Restrictions & Rights: No restrictions`.

Additional candidate:
- Smithsonian SIA2010-0901 / July 1 log entry
- https://www.si.edu/object/siris_sic_13873
- current record reports `No restrictions`.

### Production status

`RIGHTS_REVIEW_REQUIRED` until AquaScrape #45 preserves:
- exact item-level rights field;
- exact usage terms;
- raw asset + source identity.

Do not extrapolate rights from one Smithsonian item to another.

Avoid by default:
- SIA2010-0906/0907/0908 correspondence, whose current record explicitly exposes commercial-use permission language.

### Product treatment

Use one archival page at meaningful size with a caption explaining what the document establishes.

Do **not** use generic mushroom-cloud photography as the primary Schultz visual. The scientific document is more distinctive and less sensational.

---

## C5 — Rio Negro / Amazon historical map

**Role:** `CONTEXT_ART`  
**Existing AquaScrape asset:** LOC historical map

### Safe product role

Atmosphere / historical geography only.

Do not label it:
- type locality;
- collection locality;
- exact native river;
- exact “home” of the subject

unless the serving packet supplies that relationship.

---

# Pink Princess

## P1 — live subject hero

**Role:** `SUBJECT_HERO`  
**Candidate:** Wikimedia Commons `Pink princess philodendron.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Pink_princess_philodendron.jpg  
**Current rights read:** CC0 1.0 / own work by Cmushore  
**Original:** 1090 × 2098 according to current Commons metadata  
**Production status:** candidate PASS after source-manifest verification.

### Product use

Use as a real, colorful hero.

Do not bury it under:
- heavy green tint;
- luminosity blend;
- large dashboard overlay.

---

## P2 — PP31149 wrong-patent receipt

**Role:** `EVIDENCE_OBJECT`  
**Source authority:** AquaScrape #50 once accepted  
**Product fact:** old Endemic copy attached PP31149 to Pink Princess; preserved PP31149 identity is a different plant patent.

### Product treatment

Use exact patent title/identity as:
- `DocumentCard`, or
- a narrow document crop if #50 preserves rights-safe display bytes.

This object supports the correction only.

Do not use it for:
- Pink Princess origin;
- patent-law conclusion;
- breeder identity.

---

## P3 — PP36881 EM0003 receipt

**Role:** `EVIDENCE_OBJECT`  
**Source authority:** AquaScrape #50 once accepted  
**Product fact scope:** EM0003 patent + parent statement involving Pink Princess.

### Product treatment

Preferred visual:
- patent title;
- exact origin/parent line;
- clean document crop or `DocumentCard`;
- receipt link.

Use beside `CorrectionCard`.

Do not imply that PP36881 proves Pink Princess's original breeder/originator.

---

## P4 — unresolved-origin treatment

**Role:** UI state, **not** media

Use:
- `UnknownCard`

Do not create a fake missing-person silhouette, mystery detective image, question-mark art, or invented breeder portrait.

The absence itself is the honest visual state.

---

# Pea Puffer

**Status:** blocked until accepted v2 + Content Factory #204.

## Likely slots

- `SUBJECT_HERO` — current AquaScrape #45 has a CC BY-SA 2.5 Commons specimen candidate;
- `EVIDENCE_OBJECT` — original-combination / description document only after accepted packet/source locators are confirmed;
- `PERSON_MEDIA` — Hora and Nair only after identity + rights are verified.

No visual sourcing should outrun the accepted packet.

---

# Shared visual asset rules

## Evidence crop

Every evidence crop must be accompanied by:
- source label;
- exact claim scope;
- locator;
- external source link;
- rights/attribution metadata.

The crop should show enough surrounding context that it does not become a misleading isolated sentence fragment.

## Generated imagery

Generated imagery may be used only for clearly decorative/non-documentary texture.

Allowed:
- subtle paper grain;
- abstract water light;
- botanical shadow;
- neutral archival-desk falloff.

Not allowed as evidence:
- generated fish/plant presented as specimen image;
- fake historical portrait;
- fake patent/article/document;
- synthetic map that appears archival.

## Fallback order

When an ideal visual is unavailable:

1. real subject image;
2. rights-safe evidence object;
3. typographic `DocumentCard`;
4. quiet layout/negative space;
5. decorative texture.

Never substitute a misleading image merely to fill the slot.

---

# Asset handoff fields

Every sourced asset handed from AquaScrape to Endemic should expose:

```json
{
  "asset_id": "stable-id",
  "asset_role": "SUBJECT_HERO",
  "subject_id": "optional-biotrack-subject-id",
  "title": "human-readable title",
  "source_url": "https://...",
  "local_path": "...",
  "raw_sha256": "...",
  "license": "...",
  "commercial_use": "YES",
  "attribution": "...",
  "claim_scope": "...",
  "locator": null,
  "rights_note": "..."
}
```

This is a media handoff contract, not a new biological schema.
