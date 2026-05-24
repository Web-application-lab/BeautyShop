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
    list = list.filter(product => Number(getSubCategoryId(product)) === Number(subCategoryId));
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

function renderSubNav(resolved) {
  const catalog = getCategoryCatalog();
  if (!catalog || !resolved.categoryId) return "";

  const subs = catalog.subCategoriesByCategoryId[resolved.categoryId] || [];
  if (!subs.length) return "";

  const allActive = !resolved.subCategoryId ? " category-subnav__link--active" : "";
  const pills = subs.map(sub => {
    const active = resolved.subCategoryId === sub.id ? " category-subnav__link--active" : "";
    return `<a href="${buildCategoryPath({
      categorySlug: resolved.categorySlug,
      subCategorySlug: sub.slug
    })}" class="category-subnav__link${active}">${sub.name}</a>`;
  }).join("");

  return `
    <nav class="category-subnav" aria-label="Дэд ангилал">
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}" class="category-subnav__link${allActive}">Бүгд</a>
      ${pills}
    </nav>
  `;
}

function setupCategorySorting(container, products, resolved) {
  const sortSelect = container.querySelector(".sorting");
  const grid       = container.querySelector(".products");
  const countEl    = container.querySelector("#category-product-count");

  if (!sortSelect || !grid) return;

  sortSelect.addEventListener("change", () => {
    const sorted = sortProducts(filterProducts(products, resolved), sortSelect.value);
    if (countEl) countEl.textContent = String(sorted.length);
    grid.innerHTML = renderProductGrid(sorted);
  });
}

function renderBreadcrumb(resolved, pageTitle) {
  const sep = `<span class="category-page__sep">/</span>`;

  if (resolved.subCategoryId) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>${sep}
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}" class="category-page__crumb">${resolved.categoryName}</a>${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }

  return `
    <a href="/" class="category-page__crumb">Нүүр</a>${sep}
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
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
      <section class="high-rated category-page">
        <h2 class="high-rated-product">Ангилал олдсонгүй</h2>
        <p><a href="/">Нүүр хуудас руу буцах</a></p>
      </section>
    `;
    setActiveCategoryNav();
    return;
  }

  const pageTitle = getCategoryPageTitle(resolved);
  const filtered  = filterProducts(products, resolved);

  container.innerHTML = `
    <section class="high-rated category-page">
      <nav class="category-page__breadcrumb" aria-label="Зам">
        ${renderBreadcrumb(resolved, pageTitle)}
      </nav>

      <h2 class="high-rated-product">${pageTitle}</h2>
      <p class="product-count">
        <span id="category-product-count">${filtered.length}</span> бүтээгдэхүүн
      </p>

      ${resolved.categoryId ? renderSubNav(resolved) : ""}

      <div class="sort">
        <select name="sorting" class="sorting">
          <option value="">Эрэмбэлэх</option>
          <option value="price-asc">Үнэ өсөхөөр</option>
          <option value="price-desc">Үнэ буурахаар</option>
          <option value="sale">Хямдарсан</option>
        </select>
      </div>

      <div class="products">
        ${renderProductGrid(filtered)}
      </div>
    </section>
  `;

  setActiveCategoryNav(resolved);
  setupCategorySorting(container, products, resolved);
}