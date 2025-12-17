import config from "../config";

export function assetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${config.assetUrl}${path}`;
}
