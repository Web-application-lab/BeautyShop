import {
  bindCategoryNavLinks,
  buildCategoryPath,
  categoryPathToParams,
  resolveCategoryParams
} from "./categoryCatalog.js";

export function setActiveCategoryNav(resolved) {
  const categoryParams = categoryPathToParams(window.location.pathname);
  if (categoryParams === null) return;

  document.querySelectorAll(".cat-nav__item").forEach(item => {
    item.classList.remove("active");
  });

  const state = resolved || resolveCategoryParams(categoryParams);
  if (!state || !state.categorySlug) return;

  const link = document.querySelector(
    `.cat-nav__item > a[data-category-slug="${state.categorySlug}"], .cat-nav__item > a[href="${buildCategoryPath({ categorySlug: state.categorySlug })}"]`
  );

  if (link) {
    const item = link.closest(".cat-nav__item");
    if (item) item.classList.add("active");
  }
}

export function setupCategoryNav() {
  bindCategoryNavLinks();
  setActiveCategoryNav();

  const allBtn = document.querySelector(".cat-nav__all-btn");
  if (!allBtn) return;

  allBtn.addEventListener("click", event => {
    event.preventDefault();
    history.pushState(null, "", buildCategoryPath());
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
