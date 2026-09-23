# Product-proof media manifest

Status: **source/rights shortlist; binaries intentionally not vendored yet**

Purpose: prevent the product-proof implementation from reaching for synthetic exact-subject imagery or unreviewed archival material at the last minute.

## Rules

1. Exact organism/cultivar hero imagery must be exact-subject media.
2. Generated photorealistic imagery must not be presented as specimen/habitat evidence.
3. Every external asset needs source, creator, license/usage terms, attribution text, and a recommended role.
4. "No restrictions" does not automatically override an institution's separate commercial-use terms.
5. Archive/document imagery may fall back to the text-based `SourceDocument` primitive when reuse terms are unclear.

---

## Cardinal Tetra — exact-subject hero candidate

**Status:** READY WITH ATTRIBUTION

- Subject: *Paracheirodon axelrodi*
- Source page: Wikimedia Commons
- File page:
  - https://commons.wikimedia.org/wiki/File:Cardinal_Tetra_(Pacheirodon_axelrodi)_(3152824692).jpg
- Original:
  - https://upload.wikimedia.org/wikipedia/commons/8/8b/Cardinal_Tetra_%28Pacheirodon_axelrodi%29_%283152824692%29.jpg
- Creator: Cliff (Flickr / Wikimedia transfer)
- License: CC BY 2.0
- Dimensions: 1280 × 853
- Required attribution:
  - "Cardinal Tetra — Cliff, CC BY 2.0, via Wikimedia Commons"
- Recommended role:
  - identity hero / subject thumbnail;
  - crop toward the central/right school, not the blurred foreground.
- Limitation:
  - aquarium photograph, **not** native-habitat evidence;
  - do not visually imply the plants/background are Rio Negro associates.

### Suggested alt

> School of Cardinal Tetras (*Paracheirodon axelrodi*) in an aquarium.

---

## Pink Princess — exact-cultivar hero candidate

**Status:** READY / CC0

- Subject: *Philodendron erubescens* 'Pink Princess'
- Source page:
  - https://commons.wikimedia.org/wiki/File:Pink_princess_philodendron.jpg
- Original:
  - https://upload.wikimedia.org/wikipedia/commons/3/31/Pink_princess_philodendron.jpg
- Creator: Cmushore
- License: CC0 1.0
- Dimensions: 1090 × 2098
- Required attribution: none legally required under CC0; preserve source credit in internal manifest anyway.
- Recommended role:
  - subject hero / vertical crop;
  - useful for pink/green foliage identity.
- Limitation:
  - modern cultivated specimen image;
  - do not use as evidence of origin, breeder, patent, or historical lineage.

### Suggested alt

> Pink Princess philodendron with dark green leaves and pink variegation.

---

## Leonard P. Schultz portrait

**Status:** HOLD FOR COMMERCIAL-USE REVIEW

- Source: Smithsonian Institution Archives
- Record:
  - https://siarchives.si.edu/collections/siris_sic_14077
- ID: SIA2010-3056
- Date: circa 1968
- Record states: "No restrictions"
- Smithsonian usage notice on page:
  - personal and educational use welcomed unless otherwise noted;
  - commercial use should contact Smithsonian Archives.
- Recommended role if cleared:
  - human-history thread portrait;
  - monochrome portrait card.
- Fallback:
  - render Schultz as text/person relationship without portrait.

Do not vendor the binary until commercial reuse is cleared or a clearly compatible rights statement is documented.

---

## Operation Crossroads — Schultz log / field-document material

**Status:** HOLD FOR COMMERCIAL-USE REVIEW; SOURCE-DOCUMENT UX READY

### Log cover / record

- https://www.si.edu/object/dr-leonard-p-schultzs-log-operation-crossroads%3Asiris_sic_13785
- Smithsonian Archives Record Unit 7222
- 1946
- useful as a literal source-object visual.

### July 1, 1946 log entry

- https://www.si.edu/object/siris_sic_13873
- describes Schultz witnessing the Able Day explosion and is linked to the Crossroads research record.

### Crossroads correspondence / reef-fish work

- https://siarchives.si.edu/collections/siris_sic_13866
- July 11, 1946
- letter/chart describing work on reef fishes.

### Field photographs

- https://siarchives.si.edu/collections/fbr_item_modsi6140
- 165 black-and-white photographs from Operation Crossroads work, including fish specimen collection.

Recommended product treatment:
- archival-paper/source-document card;
- inspection link;
- no decorative mushroom-cloud imagery as the default hook;
- keep the story centered on scientific field work and the source record.

If commercial image reuse remains unclear, use:
- archive title;
- date;
- record ID;
- citation;
- short source-backed paraphrase;
inside `SourceDocument` rather than displaying the scanned image.

---

## Patent-document imagery — Pink Princess / EM0003

**Status:** TEXT/DOCUMENT TREATMENT FIRST

Relevant records:
- USPP31149 — unrelated `Metasequoia glyptostroboides 'Urban Spire'`
  - https://patents.google.com/patent/USPP31149P2/en
- USPP36881 — `Philodendron 'EM0003'`
  - https://patents.google.com/patent/USPP36881P2/en
- USPP37308 — `Philodendron 'BVCL01'`
  - https://patents.google.com/patent/USPP37308P2/en

Recommended role:
- correction story;
- source-document shelf;
- lineage/patent comparison.

Do not assume every patent illustration can be republished commercially merely because the patent text is public. The first proof can use citation/document UI and external links without copying patent figures.

---

## Cropping / treatment rules

### Organism hero
- 16:9 or 4:3 desktop;
- 4:5 mobile-safe crop;
- retain enough subject context to avoid "floating sticker" effect;
- apply Endemic's existing luminosity/gradient treatment only if identity remains legible.

### Portrait / archive
- grayscale is acceptable;
- do not colorize archival images unless explicitly labeled as altered;
- keep dates/source labels adjacent when the historicity matters.

### Documents
- warm paper surface;
- citation/locator legible;
- excerpt short enough to read;
- click opens the authoritative record;
- no fake aged-paper texture that could be mistaken for the source itself.

## Implementation handoff

Before #27 visual implementation:
1. download/vend only READY assets;
2. record SHA-256 of each local binary in a machine-readable media manifest;
3. preserve creator/license/source URL;
4. add attribution display where required;
5. verify crops on desktop + 390px mobile;
6. leave HOLD assets external/textual unless rights are cleared.
