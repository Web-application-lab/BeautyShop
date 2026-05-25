import { template } from "../components/productCard.js";
import { setActiveCategoryNav } from "../utils/categoryNav.js";
import {
  buildCategoryPath,
  categoryPathToParams,
  getCategoryCatalog,
  getCategoryPageTitle,
  normalizeCategoryPath,
  resolveCategoryParams
} from "../utils/categoryCatalog.js";

function getSubCategoryId(product) {
  return product.subCategoryId;
}

function filterProducts(products, resolved, extraFilters = {}) {
  if (resolved.concernId) {
    return products.filter(p => (p.concernIds || []).includes(resolved.concernId));
  }

  const { categoryId, subCategoryId } = resolved;
  let list = categoryId
    ? products.filter(p => Number(p.categoryId) === Number(categoryId))
    : [...products];

  if (subCategoryId) {
    list = list.filter(p => Number(getSubCategoryId(p)) === Number(subCategoryId));
  }

  if (extraFilters.concerns?.length) {
    list = list.filter(p =>
      extraFilters.concerns.some(c => (p.concernIds || []).includes(Number(c)))
    );
  }

  return list;
}

function sortProducts(list, sortKey) {
  const items = [...list];
  switch (sortKey) {
    case "price-asc":  return items.sort((a, b) => a.price - b.price);
    case "price-desc": return items.sort((a, b) => b.price - a.price);
    case "sale":       return items.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:           return items;
  }
}

function renderProductGrid(products) {
  if (!products.length) {
    return `<p class="products-empty">Бүтээгдэхүүн олдсонгүй</p>`;
  }
  return products.map(p => template.cardTemplate(p)).join("");
}

function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="breadcrumb-sep">/</span>`;
  if (resolved.subCategoryId) {
    return `
      <a href="/" class="breadcrumb-link">Нүүр</a>${sep}
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}"
         class="breadcrumb-link">${resolved.categoryName}</a>${sep}
      <span class="breadcrumb-link breadcrumb-current">${pageTitle}</span>
    `;
  }
  return `
    <a href="/" class="breadcrumb-link">Нүүр</a>${sep}
    <span class="breadcrumb-link breadcrumb-current">${pageTitle}</span>
  `;
}

function renderSidebar(resolved, baseProducts) {
  const catalog = getCategoryCatalog();
  if (!catalog) return "";
  
  let subNavHtml = "";

  if (resolved.categoryId) {
    const category = catalog.categoryById[resolved.categoryId];
    const subs = catalog.subCategoriesByCategoryId[resolved.categoryId] || [];

    const allActive = !resolved.subCategoryId ? " is-active" : "";

    const subsHtml = subs.map(sub => {
      const active =
        Number(resolved.subCategoryId) === Number(sub.id)
          ? " is-active"
          : "";

      return `
        <li class="sidebar-item">
          <a href="${buildCategoryPath({
            categorySlug: category.slug,
            subCategorySlug: sub.slug
          })}"
             class="sidebar-link${active}">
             ${sub.name}
          </a>
        </li>
      `;
    }).join("");

    subNavHtml = `
      <div class="sidebar-group">
        <a href="${buildCategoryPath({
          categorySlug: category.slug
        })}"
           class="sidebar-title${allActive}">
           ${category.name}
        </a>

        <ul class="sidebar-list">
          ${subsHtml}
        </ul>
      </div>
    `;
  }

  // Concern filter
  const concerns = catalog.concerns || [];

  const concernCounts = {};

  baseProducts.forEach(p => {
    (p.concernIds || []).forEach(c => {
      concernCounts[c] = (concernCounts[c] || 0) + 1;
    });
  });

  const concernHtml = concerns.map(c => {
    const count = concernCounts[c.id] || 0;

    return `
      <li class="filter-item">
        <label class="filter-label">
          <input
            type="checkbox"
            class="filter-checkbox filter-concern"
            value="${c.id}"
          />

          <span class="filter-name">${c.name}</span>

          <span class="filter-count">${count}</span>
        </label>
      </li>
    `;
  }).join("");

  return `
    <aside class="sidebar">
      ${subNavHtml}

      <div class="sidebar-filters">
        <h4 class="filters-title">
          Арьсны асуудал
        </h4>

        <ul class="filter-list">
          ${concernHtml}
        </ul>
      </div>
    </aside>
  `;
}

function setupFilters(container, products, resolved) {
  const grid    = container.querySelector(".products");
  const countEl = container.querySelector("#category-product-count");
  const sortEl  = container.querySelector(".sorting");

  function applyFilters() {
    const concerns = [...container.querySelectorAll(".filter-concern:checked")].map(el => el.value);
    const sortKey  = sortEl?.value || "";

    let list = filterProducts(products, resolved, { concerns });
    list = sortProducts(list, sortKey);

    if (countEl) countEl.textContent = String(list.length);
    grid.innerHTML = renderProductGrid(list);
  }

  container.querySelectorAll(".filter-concern").forEach(el => {
    el.addEventListener("change", applyFilters);
  });

  sortEl?.addEventListener("change", applyFilters);
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
  const baseList  = filterProducts(products, resolved);

  container.innerHTML = `
    <section class="cat-page">
      <div class="cat-layout">
        ${renderSidebar(resolved, baseList)}

        <div class="cat-main">
          <div class="cat-toolbar">
            <nav class="breadcrumb">
              ${renderBreadcrumb(resolved, pageTitle)}
            </nav>

            <div class="category-sort">
              <select class="sort-select sorting">
                <option value="">--Эрэмбэлэх--</option>
                <option value="price-asc">Үнэ өсөхөөр</option>
                <option value="price-desc">Үнэ буурахаар</option>
                <option value="sale">Хямдарсан</option>
              </select>
            </div>
          </div>

          <h2 class="cat-title">${pageTitle}</h2>

          <p class="product-count">
            <span id="category-product-count">${baseList.length}</span> бүтээгдэхүүн
          </p>

          <div class="products">
            ${renderProductGrid(baseList)}
          </div>
        </div>
      </div>
    </section>
`;

  setActiveCategoryNav(resolved);
  setupFilters(container, products, resolved);
}