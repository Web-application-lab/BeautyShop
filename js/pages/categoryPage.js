<<<<<<< HEAD
import { template } from "../components/productCard.js";
import { setActiveCategoryNav } from "../components/categoryNav.js";
import {
  buildCategoryPath,
  getCategoryCatalog,
  getCategoryPageTitle,
  normalizeCategoryPath,
  resolveCategoryParams
} from "../components/categoryCatalog.js";
=======
export function renderCategoryPage(products, container, params) {
    const categoryId = Number(params.get("id"));
    const subId = Number(params.get("sub"));
    const concernId = Number(params.get("concern"));
    
    const filtered = products.filter(p => {
        if (subId) return p.subCategoryId === subId;
        return p.categoryId === categoryId;
    });
>>>>>>> 6a05cb9021755b740c06ad0cf083e2a6f66ee366

function getSubCategoryId(product) {
  return product.subCategoryId;
}

function filterProducts(products, categoryId, subCategoryId) {
  if (!categoryId) return products;

  let list = products.filter(product => product.categoryId === categoryId);

  if (subCategoryId) {
    list = list.filter(product => getSubCategoryId(product) === subCategoryId);
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

  return products.map(product => template.cardTemplate(product)).join("");
}

function renderSubNav(resolved) {
  const catalog = getCategoryCatalog();
  if (!catalog || !resolved.categoryId) return "";

  const subs = catalog.subCategoriesByCategoryId[resolved.categoryId] || [];
  if (!subs.length) return "";

  const allActive = !resolved.subCategoryId ? " category-subnav__link--active" : "";
  const pills = subs
    .map(sub => {
      const active =
        resolved.subCategoryId === sub.id ? " category-subnav__link--active" : "";
      return `<a href="${buildCategoryPath({
        categorySlug: resolved.categorySlug,
        subCategorySlug: sub.slug
      })}" class="category-subnav__link${active}">${sub.name}</a>`;
    })
    .join("");

  return `
    <nav class="category-subnav" aria-label="Дэд ангилал">
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}" class="category-subnav__link${allActive}">Бүгд</a>
      ${pills}
    </nav>
  `;
}

function setupCategorySorting(container, products, resolved) {
  const sortSelect = container.querySelector(".sorting");
  const grid = container.querySelector(".products");
  const countEl = container.querySelector("#category-product-count");

  if (!sortSelect || !grid) return;

  sortSelect.addEventListener("change", () => {
    const sorted = sortProducts(
      filterProducts(products, resolved.categoryId, resolved.subCategoryId),
      sortSelect.value
    );

    if (countEl) countEl.textContent = String(sorted.length);
    grid.innerHTML = renderProductGrid(sorted);
  });
}

function renderBreadcrumb(resolved, pageTitle) {
  if (!resolved.categoryId) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>
      <span class="category-page__sep">/</span>
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }

  if (resolved.subCategoryId) {
    return `
      <a href="/" class="category-page__crumb">Нүүр</a>
      <span class="category-page__sep">/</span>
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}" class="category-page__crumb">${resolved.categoryName}</a>
      <span class="category-page__sep">/</span>
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
  }

  return `
    <a href="#home" class="category-page__crumb">Нүүр</a>
    <span class="category-page__sep">/</span>
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
  `;
}

export function renderCategoryPage(products, container, params) {
  const canonicalPath = normalizeCategoryPath(params);
  if (canonicalPath) {
    history.replaceState(null, "", canonicalPath);
    const pathParams = new URLSearchParams();
    const segments = canonicalPath.replace(/^\/c\/?/, "").split("/").filter(Boolean);
    if (segments[0]) pathParams.set("cat", segments[0]);
    if (segments[1]) pathParams.set("sub", segments[1]);
    params = pathParams;
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
  const filtered = filterProducts(
    products,
    resolved.categoryId,
    resolved.subCategoryId
  );

  container.innerHTML = `
    <section class="high-rated category-page">
      <nav class="category-page__breadcrumb" aria-label="Зам">${renderBreadcrumb(resolved, pageTitle)}</nav>

      <h2 class="high-rated-product">${pageTitle}</h2>
      <p class="product-count"><span id="category-product-count">${filtered.length}</span> бүтээгдэхүүн</p>

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
