import { template } from "../components/productCard.js";
import { setActiveBrandNav } from "../components/brandNav.js";
import { setActiveCategoryNav } from "../components/categoryNav.js";
import {
  buildBrandPath,
  getBrandCatalog,
  getBrandPageTitle,
  productMatchesBrand,
  resolveBrandParams
} from "../components/brandCatalog.js";
import { renderSidebarFilters, setupSidebarFilters } from "../components/categoryFilters.js";

function filterProducts(products, resolved) {
  if (!resolved.brandName) return products;
  return products.filter(product => productMatchesBrand(product, resolved.brandName));
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

  return products.map(product => template.cardTemplate(product)).join("");
}

function renderBrandSidebar(resolved, products) {
  const catalog = getBrandCatalog();
  if (!catalog) return "";

  const brandList = filterProducts(products, resolved);
  const filtersHtml = renderSidebarFilters(brandList, null, "skin");

  const listHtml = catalog.brands
    .map(brand => {
      const isActive = resolved.brandSlug === brand.slug;
      return `
        <li class="category-sidebar__item">
          <a href="${buildBrandPath({ brandSlug: brand.slug })}" class="category-sidebar__sub${isActive ? " is-active" : ""}">
            <span>${brand.name}</span>
          </a>
        </li>
      `;
    })
    .join("");

  const allActive = !resolved.brandSlug ? " is-active" : "";

  return `
    <aside class="category-sidebar" aria-label="Брэнд">
      <div class="category-sidebar__group">
        <a href="${buildBrandPath()}" class="category-sidebar__parent${allActive}">Бүх брэнд</a>
        <ul class="category-sidebar__list">${listHtml}</ul>
      </div>
      ${filtersHtml}
    </aside>
  `;
}

function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="category-page__sep" aria-hidden="true">&gt;</span>`;

  if (!resolved.brandName) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>
      ${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }

  return `
    <a href="/" class="category-page__crumb">Нүүр</a>
    ${sep}
    <a href="${buildBrandPath()}" class="category-page__crumb">Брэнд</a>
    ${sep}
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
  `;
}

function renderSortSelect() {
  return `
    <div class="category-sort">
      <select class="sorting">
        <option value="">--Эрэмбэлэх--</option>
        <option value="price-asc">Үнэ өсөхөөр</option>
        <option value="price-desc">Үнэ буурахаар</option>
        <option value="sale">Хямдарсан</option>
      </select>
    </div>
  `;
}

export function renderBrandPage(products, container, params) {
  const resolved = resolveBrandParams(params);

  if (resolved.notFound) {
    container.innerHTML = `
      <section class="category-page">
        <h2 class="category-page__title">Брэнд олдсонгүй</h2>
        <p><a href="/b">Бүх брэнд рүү буцах</a></p>
      </section>
    `;
    setActiveCategoryNav();
    setActiveBrandNav();
    return;
  }

  const pageTitle = getBrandPageTitle(resolved);
  const filtered = filterProducts(products, resolved);

  container.innerHTML = `
    <section class="category-page category-page--brand">
      <div class="category-layout">
        ${renderBrandSidebar(resolved, products)}
        <div class="category-main">
          <div class="category-toolbar">
            <nav class="category-page__breadcrumb" aria-label="Зам">${renderBreadcrumb(resolved, pageTitle)}</nav>
            ${renderSortSelect()}
          </div>
          <div class="products">
            ${renderProductGrid(filtered)}
          </div>
        </div>
      </div>
    </section>
  `;

  setActiveCategoryNav();
  setActiveBrandNav(resolved);

  const grid = container.querySelector(".products");

  setupSidebarFilters(
    container,
    () => filterProducts(products, resolved),
    (list, sortKey) => {
      grid.innerHTML = renderProductGrid(sortProducts(list, sortKey));
    }
  );
}
