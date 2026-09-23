import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST = path.join(
  ROOT,
  "src",
  "data",
  "product-proof",
  "media-manifest.json",
);

const payload = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

if (payload.schemaVersion !== 1) {
  throw new Error("Unsupported product-proof media manifest schemaVersion");
}

if (!Array.isArray(payload.assets)) {
  throw new Error("Product-proof media manifest must contain assets[]");
}

const ids = new Set();
let readyCount = 0;

function requireText(asset, field) {
  const value = asset[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${asset.asset_id || "<missing-id>"}: missing ${field}`);
  }
  return value;
}

function requireHttpUrl(asset, field) {
  const value = requireText(asset, field);
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${asset.asset_id}: invalid ${field}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${asset.asset_id}: unsafe ${field} protocol`);
  }
}

for (const asset of payload.assets) {
  const id = requireText(asset, "asset_id");
  if (ids.has(id)) {
    throw new Error(`Duplicate product-proof media asset_id: ${id}`);
  }
  ids.add(id);

  const status = requireText(asset, "status");
  const isReady = status === "READY" || status.startsWith("READY_");

  if (!isReady) continue;
  readyCount += 1;

  if (asset.commercial_use !== "YES") {
    throw new Error(`${id}: READY asset must have commercial_use=YES`);
  }

  for (const field of [
    "asset_role",
    "subject_label",
    "creator",
    "license",
    "attribution_recommended",
    "claim_scope",
    "alt",
  ]) {
    requireText(asset, field);
  }

  requireHttpUrl(asset, "source_page_url");
  requireHttpUrl(asset, "original_url");

  if (
    asset.attribution_required === "YES" &&
    (!asset.attribution_recommended ||
      typeof asset.attribution_recommended !== "string")
  ) {
    throw new Error(`${id}: attribution_required=YES needs attribution text`);
  }

  if (
    !asset.dimensions ||
    !Number.isInteger(asset.dimensions.width) ||
    !Number.isInteger(asset.dimensions.height) ||
    asset.dimensions.width <= 0 ||
    asset.dimensions.height <= 0
  ) {
    throw new Error(`${id}: READY asset needs positive integer dimensions`);
  }

  if (!Array.isArray(asset.prohibited_implications)) {
    throw new Error(`${id}: READY asset needs prohibited_implications[]`);
  }

  if (!Array.isArray(asset.recommended_use) || asset.recommended_use.length === 0) {
    throw new Error(`${id}: READY asset needs recommended_use[]`);
  }
}

if (readyCount === 0) {
  throw new Error("Product-proof media manifest has no READY assets");
}

console.log(
  `[product-proof-media] PASS assets=${payload.assets.length} ready=${readyCount}`,
);
