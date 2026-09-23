import manifest from "./media-manifest.json";

type ManifestAsset = (typeof manifest.assets)[number];

export type ReadyProofMedia = ManifestAsset & {
  commercial_use: "YES";
  source_page_url: string;
  original_url: string;
  creator: string;
  license: string;
  attribution_recommended: string;
  alt: string;
};

const assetsById = new Map<string, ManifestAsset>();

for (const asset of manifest.assets) {
  if (assetsById.has(asset.asset_id)) {
    throw new Error(`Duplicate product-proof media asset_id: ${asset.asset_id}`);
  }
  assetsById.set(asset.asset_id, asset);
}

function isReadyStatus(status: string): boolean {
  return status === "READY" || status.startsWith("READY_");
}

function assertHttpUrl(value: string, field: string, assetId: string) {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid ${field} for product-proof media ${assetId}`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`Unsafe ${field} protocol for product-proof media ${assetId}`);
  }
}

export function getReadyProofMedia(assetId: string): ReadyProofMedia {
  const asset = assetsById.get(assetId);

  if (!asset) {
    throw new Error(`Unknown product-proof media asset: ${assetId}`);
  }

  if (!isReadyStatus(asset.status)) {
    throw new Error(
      `Product-proof media asset is not display-ready: ${assetId} (${asset.status})`,
    );
  }

  if (asset.commercial_use !== "YES") {
    throw new Error(
      `Product-proof media asset lacks commercial-use clearance: ${assetId}`,
    );
  }

  const required = {
    source_page_url: asset.source_page_url,
    original_url: asset.original_url,
    creator: asset.creator,
    license: asset.license,
    attribution_recommended: asset.attribution_recommended,
    alt: asset.alt,
  };

  for (const [field, value] of Object.entries(required)) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(
        `Missing ${field} for display-ready product-proof media ${assetId}`,
      );
    }
  }

  assertHttpUrl(asset.source_page_url, "source_page_url", assetId);
  assertHttpUrl(asset.original_url, "original_url", assetId);

  return asset as ReadyProofMedia;
}

export function proofMediaIdentityProps(assetId: string) {
  const asset = getReadyProofMedia(assetId);

  return {
    image: asset.original_url,
    imageAlt: asset.alt,
    imageCredit: asset.attribution_recommended,
    imageLicense: asset.license,
    imageSourceHref: asset.source_page_url,
  } as const;
}
