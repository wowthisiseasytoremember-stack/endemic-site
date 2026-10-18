/** Snapshot counts, not claims that every record is verified or exposed through a public app. */
export const SHOWCASE_STATS = [
  { value: 1669, label: "Fish records", qualifier: "AquaTrack fish species trait coverage report" },
  { value: 840, label: "Aquatic plant records", qualifier: "AquaTrack normalized aquatic plant trait dataset" },
  { value: 1546, label: "Species with geography", qualifier: "Species matched to geographic distribution in AquaTrack geography snapshot" },
  { value: 154, label: "Countries represented", qualifier: "Countries in that same geographic coverage snapshot" },
] as const;
