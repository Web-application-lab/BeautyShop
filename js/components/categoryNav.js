import {
  bindCategoryNavLinks,
  buildCategoryPath,
  categoryPathToParams,
  resolveCategoryParams
} from "./categoryCatalog.js";

export function setActiveCategoryNav(resolved) {
  document.querySelectorAll(".cat-nav__item").forEach(item => {
    item.classList.remove("active");
  });

  const pathParams = categoryPathToParams(window.location.pathname);
  if (pathParams === null) return;

  const state = resolved || resolveCategoryParams(pathParams);
  if (!state?.categorySlug) return;

  const link = document.querySelector(
    `.cat-nav__item > a[data-category-slug="${state.categorySlug}"], .cat-nav__item > a[href="${buildCategoryPath({ categorySlug: state.categorySlug })}"]`
  );

  link?.closest(".cat-nav__item")?.classList.add("active");
}

export function setupCategoryNav() {
  bindCategoryNavLinks();
  setActiveCategoryNav();

  const allBtn = document.querySelector(".cat-nav__all-btn");
  if (allBtn) {
    allBtn.addEventListener("click", event => {
      event.preventDefault();
      history.pushState(null, "", buildCategoryPath());
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }
}
