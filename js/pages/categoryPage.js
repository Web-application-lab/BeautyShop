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
    return `<p class="category-page__empty">Бүтээгдэхүүн олдсонгүй</p>`;
  }
  return products.map(p => template.cardTemplate(p)).join("");
}

function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="category-page__sep">/</span>`;
  if (resolved.subCategoryId) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>${sep}
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}"
         class="category-page__crumb">${resolved.categoryName}</a>${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }
  return `
    <a href="/" class="category-page__crumb">Нүүр</a>${sep}
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
  `;
}

function renderSidebar(resolved, baseProducts) {
  const catalog = getCategoryCatalog();
  if (!catalog) return "";

  // Дэд ангилалууд
  let subNavHtml = "";
  if (resolved.categoryId) {
    const category = catalog.categoryById[resolved.categoryId];
    const subs = catalog.subCategoriesByCategoryId[resolved.categoryId] || [];

    const allActive = !resolved.subCategoryId ? " is-active" : "";
    const subsHtml = subs.map(sub => {
      const active = Number(resolved.subCategoryId) === Number(sub.id) ? " is-active" : "";
      return `
        <li class="category-sidebar__item">
          <a href="${buildCategoryPath({ categorySlug: category.slug, subCategorySlug: sub.slug })}"
             class="category-sidebar__sub${active}">${sub.name}</a>
        </li>`;
    }).join("");

    subNavHtml = `
      <div class="category-sidebar__group">
        <a href="${buildCategoryPath({ categorySlug: category.slug })}"
           class="category-sidebar__parent${allActive}">${category.name}</a>
        <ul class="category-sidebar__list">${subsHtml}</ul>
      </div>
    `;
  }

  // Арьсны асуудал (concernIds ашиглана)
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
      <li class="category-sidebar__filter-item">
        <label class="category-sidebar__filter-label">
          <input type="checkbox" class="category-sidebar__filter-input filter-concern" value="${c.id}" />
          <span class="category-sidebar__filter-name">${c.name}</span>
          <span class="category-sidebar__filter-count">${count}</span>
        </label>
      </li>`;
  }).join("");

  return `
    <aside class="category-sidebar">
      ${subNavHtml}
      <div class="category-sidebar__filters">
        <h4 class="category-sidebar__filter-heading">Арьсны асуудал</h4>
        <ul class="category-sidebar__filter-list">${concernHtml}</ul>
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
    <section class="category-page">
      <div class="category-layout">
        ${renderSidebar(resolved, baseList)}

        <div class="category-main">
          <div class="category-toolbar">
            <nav class="category-page__breadcrumb">
              ${renderBreadcrumb(resolved, pageTitle)}
            </nav>
            <div class="category-sort">
              <select class="sorting">
                <option value="">--Эрэмбэлэх--</option>
                <option value="price-asc">Үнэ өсөхөөр</option>
                <option value="price-desc">Үнэ буурахаар</option>
                <option value="sale">Хямдарсан</option>
              </select>
            </div>
          </div>

          <h2 class="category-page__title">${pageTitle}</h2>
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