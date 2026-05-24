import {
  bindBrandNavLinks,
  brandPathToParams,
  buildBrandPath,
  resolveBrandParams
} from "./brandCatalog.js";

export function setActiveBrandNav(resolved) {
  const brandParams = brandPathToParams(window.location.pathname);
  const brandItem = document.querySelector(".cat-nav__item--brand");

  if (brandParams === null) return;

  document.querySelectorAll(".cat-nav__item").forEach(item => {
    item.classList.remove("active");
  });

  brandItem?.classList.add("active");

  brandItem?.querySelectorAll(".dropdown__item").forEach(link => {
    link.classList.remove("dropdown__item--active");
  });

  if (!resolved?.brandSlug) return;

  const link = brandItem?.querySelector(
    `[data-brand-slug="${resolved.brandSlug}"], a[href="${buildBrandPath({ brandSlug: resolved.brandSlug })}"]`
  );
  link?.classList.add("dropdown__item--active");
}

export function setupBrandNav() {
  bindBrandNavLinks();
  setActiveBrandNav();
}
