import { template } from "../components/productCard.js";
import { setActiveCategoryNav } from "../components/categoryNav.js";
import {
  buildCategoryPath,
  categoryPathToParams,
  getCategoryCatalog,
  getCategoryPageTitle,
  normalizeCategoryPath,
  resolveCategoryParams
} from "../components/categoryCatalog.js";
<<<<<<< HEAD
import {
  getFilterMode,
  renderSidebarFilters,
  setupSidebarFilters
} from "../components/categoryFilters.js";

function filterProducts(products, resolved) {
  if (resolved.concernId) {
    return products.filter(p => (p.concernIds || []).includes(resolved.concernId));
=======

function getSubCategoryId(product) {
  return product.subCategoryId;
}

function filterProducts(products, resolved) {
  if (resolved.concernId) {
    return products.filter(product =>
      (product.concernIds || []).includes(resolved.concernId)
    );
  }

  const { categoryId, subCategoryId } = resolved;
  if (!categoryId) return products;

  let list = products.filter(product => Number(product.categoryId) === Number(categoryId));

  if (subCategoryId) {
<<<<<<< HEAD
    list = list.filter(product => Number(getSubCategoryId(product)) === Number(subCategoryId));
=======
    list = list.filter(product => getSubCategoryId(product) === subCategoryId);
>>>>>>> 38e961e20b4bb5f6eede5e26514121ee98472485
>>>>>>> 65282e7ffdb31b90bad73666effe583b4a50a530
  }

  if (!resolved.categoryId) return products;

  let list = products.filter(p => p.categoryId === resolved.categoryId);
  if (resolved.subCategoryId) {
    list = list.filter(p => p.subCategoryId === resolved.subCategoryId);
  }
  return list;
}
function sortProducts(list, sortKey) {
  const items = [...list];

  switch (sortKey) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "sale":
      return items.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:
      return items;
  }
}

function renderProductGrid(products) {
  if (!products.length) {
    return `<p class="category-page__empty">Бүтээгдэхүүн олдсонгүй</p>`;
  }
  return products.map(p => template.cardTemplate(p)).join("");
}

function renderSidebar(resolved, products) {
  const catalog = getCategoryCatalog();
  if (!catalog) return "";

  const mode = getFilterMode(resolved);
  const base = filterProducts(products, resolved);
  const filtersHtml = renderSidebarFilters(base, resolved, mode);

  if (resolved.concernId) {
    return `
      <aside class="category-sidebar">
        <a href="/" class="category-sidebar__link">← Нүүр</a>
        ${filtersHtml}
      </aside>
    `;
  }

  if (!resolved.categoryId) {
    let html = "";
    catalog.categories.forEach(cat => {
      const subs = catalog.subCategoriesByCategoryId[cat.id] || [];
      const subsHtml = subs.map(sub => `
        <li class="category-sidebar__item">
          <a href="${buildCategoryPath({ categorySlug: cat.slug, subCategorySlug: sub.slug })}" class="category-sidebar__sub">${sub.name}</a>
        </li>
      `).join("");

      let subsList = "";
      if (subs.length) {
        subsList = `<ul class="category-sidebar__list">${subsHtml}</ul>`;
      }

      html += `
        <div class="category-sidebar__group">
          <a href="${buildCategoryPath({ categorySlug: cat.slug })}" class="category-sidebar__parent">${cat.name}</a>
          ${subsList}
        </div>
      `;
    });

    return `<aside class="category-sidebar">${html}${filtersHtml}</aside>`;
  }

  const category = catalog.categoryById[resolved.categoryId];
  const subs = catalog.subCategoriesByCategoryId[resolved.categoryId] || [];
  const subsHtml = subs.map(sub => {
    let active = "";
    if (resolved.subCategoryId === sub.id) active = " is-active";

    return `
      <li class="category-sidebar__item">
        <a href="${buildCategoryPath({ categorySlug: category.slug, subCategorySlug: sub.slug })}" class="category-sidebar__sub${active}">${sub.name}</a>
      </li>
    `;
  }).join("");

  let parentActive = "";
  if (!resolved.subCategoryId) parentActive = " is-active";

  return `
    <aside class="category-sidebar">
      <div class="category-sidebar__group">
        <a href="${buildCategoryPath({ categorySlug: category.slug })}" class="category-sidebar__parent${parentActive}">${category.name}</a>
        <ul class="category-sidebar__list">${subsHtml}</ul>
      </div>
      ${filtersHtml}
    </aside>
  `;
}

<<<<<<< HEAD
=======
function setupCategorySorting(container, products, resolved) {
  const sortSelect = container.querySelector(".sorting");
  const grid = container.querySelector(".products");
  const countEl = container.querySelector("#category-product-count");

  if (!sortSelect || !grid) return;

  sortSelect.addEventListener("change", () => {
    const sorted = sortProducts(filterProducts(products, resolved), sortSelect.value);

    if (countEl) countEl.textContent = String(sorted.length);
    grid.innerHTML = renderProductGrid(sorted);
  });
}

>>>>>>> 38e961e20b4bb5f6eede5e26514121ee98472485
function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="category-page__sep">&gt;</span>`;

  if (!resolved.categoryId) {
    return `<a href="/" class="category-page__crumb">Нүүр</a>${sep}<span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>`;
  }

  if (resolved.subCategoryId) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>${sep}
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}" class="category-page__crumb">${resolved.categoryName}</a>${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }

  return `<a href="/" class="category-page__crumb">Нүүр</a>${sep}<span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>`;
}

function renderSortSelect() {
  return `
<<<<<<< HEAD
    <div class="category-sort">
      <select class="sorting">
        <option value="">--Эрэмбэлэх--</option>
        <option value="price-asc">Үнэ өсөхөөр</option>
        <option value="price-desc">Үнэ буурахаар</option>
        <option value="sale">Хямдарсан</option>
      </select>
    </div>
=======
    <a href="/" class="category-page__crumb">Нүүр</a>
    <span class="category-page__sep">/</span>
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
>>>>>>> 38e961e20b4bb5f6eede5e26514121ee98472485
  `;
}

export function renderCategoryPage(products, container, params) {
  const newPath = normalizeCategoryPath(params);
  if (newPath) {
    history.replaceState(null, "", newPath);
    params = categoryPathToParams(newPath);
  }

  const resolved = resolveCategoryParams(params);

  if (resolved.notFound) {
    container.innerHTML = `
      <section class="category-page">
        <h2>Ангилал олдсонгүй</h2>
        <p><a href="/">Нүүр хуудас руу буцах</a></p>
      </section>
    `;
    setActiveCategoryNav();
    return;
  }

  const pageTitle = getCategoryPageTitle(resolved);
  const filtered = filterProducts(products, resolved);
<<<<<<< HEAD
  const isConcern = Boolean(resolved.concernId);

  let pageClass = "category-page";
  if (isConcern) pageClass += " category-page--concern";

  let concernHeader = "";
  if (isConcern) {
    concernHeader =
      `<h1 class="category-page__title">${pageTitle}</h1>` +
      `<p class="product-count"><span id="category-product-count">${filtered.length}</span> бүтээгдэхүүн</p>`;
  }
=======
>>>>>>> 38e961e20b4bb5f6eede5e26514121ee98472485

  container.innerHTML = `
    <section class="${pageClass}">
      <div class="category-layout">
        ${renderSidebar(resolved, products)}
        <div class="category-main">
          ${concernHeader}
          <div class="category-toolbar">
            <nav class="category-page__breadcrumb">${renderBreadcrumb(resolved, pageTitle)}</nav>
            ${renderSortSelect()}
          </div>
          <div class="products">${renderProductGrid(filtered)}</div>
        </div>
      </div>
    </section>
  `;

  setActiveCategoryNav(resolved);

  const grid = container.querySelector(".products");
  const countEl = container.querySelector("#category-product-count");

  setupSidebarFilters(
    container,
    () => filterProducts(products, resolved),
    (list, sortKey) => {
      const sorted = sortProducts(list, sortKey);
      grid.innerHTML = renderProductGrid(sorted);
      if (countEl) countEl.textContent = sorted.length;
    }
  );
}
