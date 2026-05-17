export function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
  return `/${path.replace(/^\.?\//, "")}`;
}

export function productImageSrc(filename) {
  if (!filename) return "";
  if (filename.includes("/")) return assetUrl(filename);
  return `/images/${filename}`;
}
