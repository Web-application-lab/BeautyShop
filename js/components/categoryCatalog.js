let catalog = null;

export function initCategoryCatalog(data) {
  const categories = data.categories || [];
  const subCategories = data.subCategories || [];
  const navigation = data.categoryNavigation || { bySlug: {}, byName: {} };

  const categoryById = Object.fromEntries(categories.map(c => [c.id, c]));
  const subCategoryById = Object.fromEntries(subCategories.map(s => [s.id, s]));

  const subCategoriesByCategoryId = subCategories.reduce((groups, sub) => {
    if (!groups[sub.categoryId]) groups[sub.categoryId] = [];
    groups[sub.categoryId].push(sub);
    return groups;
  }, {});

  catalog = {
    categories,
    subCategories,
    concerns: data.concerns || [],
    navigation,
    categoryById,
    subCategoryById,
    subCategoriesByCategoryId
  };

  return catalog;
}

export function getCategoryCatalog() {
  return catalog;
}

export const CATEGORY_PATH_PREFIX = "/c";

export function buildCategoryPath(options) {
  options = options || {};
  const categorySlug = options.categorySlug;
  const subCategorySlug = options.subCategorySlug;

  if (!categorySlug) return CATEGORY_PATH_PREFIX;

  let path = CATEGORY_PATH_PREFIX + "/" + categorySlug;
  if (subCategorySlug) {
    path += "/" + subCategorySlug;
  }
  return path;
}

export function categoryPathToParams(pathname) {
  let path = pathname;

  if (path.toLowerCase().endsWith("/index.html")) {
    path = path.slice(0, -"/index.html".length);
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (!path) {
    path = "/";
  }

  if (path === CATEGORY_PATH_PREFIX) {
    return new URLSearchParams();
  }

  const categoryPrefix = CATEGORY_PATH_PREFIX + "/";
  if (!path.startsWith(categoryPrefix)) {
    return null;
  }

  const rest = path.slice(categoryPrefix.length);
  const parts = rest.split("/");
  const catSlug = parts[0] || "";
  const subSlug = parts[1] || "";

  const params = new URLSearchParams();
  if (catSlug) {
    params.set("cat", decodeURIComponent(catSlug));
  }
  if (subSlug) {
    params.set("sub", decodeURIComponent(subSlug));
  }

  return params;
}

export function normalizeLegacyCategoryLocation() {
  if (categoryPathToParams(window.location.pathname) !== null) return null;

  const hash = window.location.hash || "";
  if (!hash.startsWith("#category")) return null;

  let query = "";
  const qIndex = hash.indexOf("?");
  if (qIndex !== -1) {
    query = hash.slice(qIndex + 1);
  }

  const params = new URLSearchParams(query);
  if (params.get("concern")) return null;

  const resolved = resolveCategoryParams(params);
  if (resolved.notFound) return null;

  return buildCategoryPath({
    categorySlug: resolved.categorySlug,
    subCategorySlug: resolved.subCategorySlug
  });
}

function entryFromSlug(slug) {
  if (!slug || !catalog) return null;
  return catalog.navigation.bySlug[slug] || null;
}

function entryFromName(name) {
  if (!name || !catalog) return null;
  return catalog.navigation.byName[name] || null;
}

function entryFromLegacyIds(categoryId, subCategoryId) {
  if (!catalog || !categoryId) return null;

  const category = catalog.categoryById[Number(categoryId)];
  if (!category) return null;

  if (!subCategoryId) {
    return { categoryId: category.id, name: category.name, slug: category.slug };
  }

  const sub = catalog.subCategoryById[Number(subCategoryId)];
  if (!sub || sub.categoryId !== category.id) return null;

  return {
    categoryId: category.id,
    subCategoryId: sub.id,
    name: sub.name,
    slug: sub.slug
  };
}

function resolveFromSlugParams(catSlug, subSlug) {
  if (!catSlug && !subSlug) return { notFound: false };

  let catEntry = null;
  let subEntry = null;

  if (catSlug) catEntry = entryFromSlug(catSlug);
  if (subSlug) subEntry = entryFromSlug(subSlug);

  if (catSlug && !catEntry) return { notFound: true };
  if (subSlug && !subEntry) return { notFound: true };

  let categoryId = null;
  let subCategoryId = null;

  if (catEntry && catEntry.categoryId) categoryId = catEntry.categoryId;
  if (subEntry && subEntry.categoryId) categoryId = subEntry.categoryId;
  if (subEntry && subEntry.subCategoryId) subCategoryId = subEntry.subCategoryId;

  if (catEntry && catEntry.subCategoryId && !subEntry) {
    subCategoryId = catEntry.subCategoryId;
  }

  if (catEntry && subEntry && subEntry.categoryId !== catEntry.categoryId) {
    return { notFound: true };
  }

  if (!categoryId) return { notFound: true };

  const category = catalog.categoryById[categoryId];
  let sub = null;
  if (subCategoryId) {
    sub = catalog.subCategoryById[subCategoryId];
  }

  let subCategorySlug = null;
  let subCategoryName = null;
  if (sub) {
    subCategorySlug = sub.slug;
    subCategoryName = sub.name;
  }

  return {
    notFound: false,
    categoryId,
    subCategoryId,
    categorySlug: category.slug,
    subCategorySlug,
    categoryName: category.name,
    subCategoryName
  };
}

function buildResolvedFromEntry(entry) {
  const category = catalog.categoryById[entry.categoryId];
  let sub = null;
  if (entry.subCategoryId) {
    sub = catalog.subCategoryById[entry.subCategoryId];
  }

  let subCategorySlug = entry.slug || null;
  let subCategoryName = null;

  if (sub) {
    subCategorySlug = sub.slug;
    subCategoryName = sub.name;
  }

  return {
    notFound: false,
    categoryId: entry.categoryId,
    subCategoryId: entry.subCategoryId || null,
    categorySlug: category.slug,
    subCategorySlug,
    categoryName: category.name,
    subCategoryName
  };
}

export function resolveCategoryParams(params) {
  if (!catalog) return { notFound: true };

  const name = params.get("name");
  if (name) {
    const entry = entryFromName(name);
    if (!entry) return { notFound: true };
    return buildResolvedFromEntry(entry);
  }

  const catSlug = params.get("cat");
  const subSlug = params.get("sub");
  if (catSlug || subSlug) {
    return resolveFromSlugParams(catSlug, subSlug);
  }

  const concernParam = params.get("concern");
  if (concernParam) {
    const concernId = Number(concernParam);
    const concern = catalog.concerns.find(c => c.id === concernId);
    if (!concern) return { notFound: true };

    return {
      notFound: false,
      concernId,
      concernName: concern.name
    };
  }

  const legacyId = params.get("id");
  if (legacyId) {
    const entry = entryFromLegacyIds(legacyId, params.get("sub"));
    if (!entry) return { notFound: true };
    return buildResolvedFromEntry(entry);
  }

  return { notFound: false };
}

export function getCategoryPageTitle(resolved) {
  if (resolved.notFound) return "Ангилал олдсонгүй";
  if (resolved.concernName) return resolved.concernName;
  if (resolved.subCategoryName) return resolved.subCategoryName;
  if (resolved.categoryName) return resolved.categoryName;
  return "Бүх бүтээгдэхүүн";
}

export function normalizeCategoryPath(params) {
  const resolved = resolveCategoryParams(params);
  if (resolved.notFound) return null;

  if (!params.has("id") && !params.has("name")) return null;

  const nextPath = buildCategoryPath({
    categorySlug: resolved.categorySlug,
    subCategorySlug: resolved.subCategorySlug
  });

  if (window.location.pathname === nextPath) return null;
  return nextPath;
}

export function bindCategoryNavLinks() {
  if (!catalog) return;

  catalog.categories.forEach(category => {
    const mainLink = document.querySelector(
      '.cat-nav__item > a[href*="id=' + category.id + '"], .cat-nav__item > a[data-category-id="' + category.id + '"]'
    );

    if (mainLink) {
      mainLink.href = buildCategoryPath({ categorySlug: category.slug });
      mainLink.dataset.categorySlug = category.slug;
    }

    let item = null;
    if (mainLink) {
      item = mainLink.closest(".cat-nav__item");
    }
    if (!item) return;

    const subs = catalog.subCategoriesByCategoryId[category.id] || [];
    const dropdownLinks = item.querySelectorAll(".dropdown__item");

    subs.forEach((sub, index) => {
      const link = dropdownLinks[index];
      if (!link) return;
      link.href = buildCategoryPath({
        categorySlug: category.slug,
        subCategorySlug: sub.slug
      });
    });

    const seeAll = item.querySelector(".dropdown__see-all");
    if (seeAll) {
      seeAll.href = buildCategoryPath({ categorySlug: category.slug });
    }
  });
}
