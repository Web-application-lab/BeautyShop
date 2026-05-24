let catalog = null;

export function normalizeBrandName(name) {
  return String(name || "").trim().replace(/\s+/g, " ");
}

export function slugifyBrand(name) {
  return normalizeBrandName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function initBrandCatalog(products) {
  const bySlug = new Map();

  (products || []).forEach(product => {
    const name = normalizeBrandName(product.brand);
    if (!name) return;

    const slug = slugifyBrand(name);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { name, slug, productCount: 0 });
    }
    bySlug.get(slug).productCount += 1;
  });

  const brands = [...bySlug.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "mn")
  );

  catalog = { brands, bySlug };
  return catalog;
}

export function getBrandCatalog() {
  return catalog;
}

export const BRAND_PATH_PREFIX = "/b";

export function buildBrandPath({ brandSlug } = {}) {
  if (!brandSlug) return BRAND_PATH_PREFIX;
  return `${BRAND_PATH_PREFIX}/${brandSlug}`;
}

export function brandPathToParams(pathname) {
  const path = pathname.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";

  if (path === BRAND_PATH_PREFIX) {
    return new URLSearchParams();
  }

  const match = path.match(/^\/b\/([^/]+)$/);
  if (!match) return null;

  const params = new URLSearchParams();
  params.set("brand", decodeURIComponent(match[1]));
  return params;
}

export function resolveBrandParams(params) {
  if (!catalog) return { notFound: true };

  const slug = params.get("brand");
  if (!slug) {
    return { notFound: false };
  }

  const entry = catalog.bySlug.get(slug);
  if (!entry) return { notFound: true };

  return {
    notFound: false,
    brandSlug: entry.slug,
    brandName: entry.name
  };
}

export function getBrandPageTitle(resolved) {
  if (resolved.notFound) return "Брэнд олдсонгүй";
  if (resolved.brandName) return resolved.brandName;
  return "Брэнд";
}

export function productMatchesBrand(product, brandName) {
  return normalizeBrandName(product.brand) === brandName;
}

export function bindBrandNavLinks() {
  if (!catalog) return;

  const item = document.querySelector(".cat-nav__item--brand");
  if (!item) return;

  const mainLink = item.querySelector(":scope > a");
  if (mainLink) {
    mainLink.href = buildBrandPath();
  }

  const dropdown = item.querySelector("[data-brand-dropdown]");
  if (!dropdown) return;

  const links = catalog.brands
    .map(
      brand => `
        <a href="${buildBrandPath({ brandSlug: brand.slug })}" class="dropdown__item" data-brand-slug="${brand.slug}">
          ${brand.name}
        </a>
      `
    )
    .join("");

  dropdown.innerHTML = `
    ${links}
    <div class="dropdown__divider"></div>
    <a href="${buildBrandPath()}" class="dropdown__see-all">Бүгдийг харах</a>
  `;
}
