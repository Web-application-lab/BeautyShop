import { template } from "../components/productCard.js";
import { setActiveBrandNav } from "../utils/brandNav.js";
import { setActiveCategoryNav } from "../utils/categoryNav.js";
import {
  buildBrandPath,
  getBrandCatalog,
  getBrandPageTitle,
  productMatchesBrand,
  resolveBrandParams
} from "../utils/brandCatalog.js";
import { renderSidebarFilters, setupSidebarFilters } from "../utils/categoryFilters.js";

function filterProducts(products, resolved) {
  if (!resolved.brandName) return products;
  return products.filter(product =>
    productMatchesBrand(product, resolved.brandName)
  );
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
    return `<p class="products-empty">Бүтээгдэхүүн олдсонгүй</p>`;
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
        <li class="sidebar-item">
          <a href="${buildBrandPath({ brandSlug: brand.slug })}"
             class="sidebar-link${isActive ? " is-active" : ""}">
            ${brand.name}
          </a>
        </li>
      `;
    })
    .join("");

  const allActive = !resolved.brandSlug ? " is-active" : "";

  return `
    <aside class="sidebar" aria-label="Брэнд">
      <div class="sidebar-group">
        <a href="${buildBrandPath()}" class="sidebar-title${allActive}">
          Бүх брэнд
        </a>

        <ul class="sidebar-list">
          ${listHtml}
        </ul>
      </div>

      ${filtersHtml}
    </aside>
  `;
}

function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="breadcrumb-sep" aria-hidden="true">&gt;</span>`;

  if (!resolved.brandName) {
    return `
      <a href="/" class="breadcrumb-link">Нүүр</a>
      ${sep}
      <span class="breadcrumb-link breadcrumb-current">${pageTitle}</span>
    `;
  }

  return `
    <a href="/" class="breadcrumb-link">Нүүр</a>
    ${sep}
    <a href="${buildBrandPath()}" class="breadcrumb-link">Брэнд</a>
    ${sep}
    <span class="breadcrumb-link breadcrumb-current">${pageTitle}</span>
  `;
}

function renderSortSelect() {
  return `
    <div class="category-sort">
      <select class="sort-select sorting">
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
      <section class="cat-page">
        <h2 class="cat-title">Брэнд олдсонгүй</h2>
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
    <section class="cat-page">
      <div class="cat-layout">
        ${renderBrandSidebar(resolved, products)}

        <div class="cat-main">
          <div class="cat-toolbar">
            <nav class="breadcrumb" aria-label="Зам">
              ${renderBreadcrumb(resolved, pageTitle)}
            </nav>

            ${renderSortSelect()}
          </div>

          <h2 class="cat-title">${pageTitle}</h2>

          <p class="product-count">
            ${filtered.length} бүтээгдэхүүн
          </p>

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
  const countEl = container.querySelector(".product-count");

  setupSidebarFilters(
    container,
    () => filterProducts(products, resolved),
    (list, sortKey) => {
      const sortedList = sortProducts(list, sortKey);

      if (countEl) {
        countEl.textContent = `${sortedList.length} бүтээгдэхүүн`;
      }

      grid.innerHTML = renderProductGrid(sortedList);
    }
  );
}