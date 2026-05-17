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

export function buildCategoryPath({ categorySlug, subCategorySlug } = {}) {
  if (!categorySlug) return CATEGORY_PATH_PREFIX;

  let path = `${CATEGORY_PATH_PREFIX}/${categorySlug}`;
  if (subCategorySlug) path += `/${subCategorySlug}`;
  return path;
}

/** @deprecated Use buildCategoryPath */
export function buildCategoryHash(options = {}) {
  return buildCategoryPath(options);
}

export function categoryPathToParams(pathname) {
  const path = pathname.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";

  if (path === CATEGORY_PATH_PREFIX) {
    return new URLSearchParams();
  }

  const match = path.match(/^\/c\/([^/]+)(?:\/([^/]+))?$/);
  if (!match) return null;

  const params = new URLSearchParams();
  params.set("cat", decodeURIComponent(match[1]));
  if (match[2]) params.set("sub", decodeURIComponent(match[2]));
  return params;
}

export function normalizeLegacyCategoryLocation() {
  const categoryParams = categoryPathToParams(window.location.pathname);
  if (categoryParams !== null) return null;

  const hash = window.location.hash || "";
  if (!hash.startsWith("#category")) return null;

  const query = hash.includes("?") ? hash.split("?")[1] : "";
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
    return {
      categoryId: category.id,
      name: category.name,
      slug: category.slug
    };
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
  if (!catSlug && !subSlug) {
    return { notFound: false };
  }

  const catEntry = catSlug ? entryFromSlug(catSlug) : null;
  const subEntry = subSlug ? entryFromSlug(subSlug) : null;

  if (catSlug && !catEntry) {
    return { notFound: true };
  }

  if (subSlug && !subEntry) {
    return { notFound: true };
  }

  let categoryId = catEntry?.categoryId ?? subEntry?.categoryId ?? null;
  let subCategoryId = subEntry?.subCategoryId ?? null;

  if (catEntry?.subCategoryId && !subEntry) {
    subCategoryId = catEntry.subCategoryId;
  }

  if (catEntry && subEntry && subEntry.categoryId !== catEntry.categoryId) {
    return { notFound: true };
  }

  if (!categoryId) {
    return { notFound: true };
  }

  const category = catalog.categoryById[categoryId];
  const sub = subCategoryId ? catalog.subCategoryById[subCategoryId] : null;

  return {
    notFound: false,
    categoryId,
    subCategoryId,
    categorySlug: category.slug,
    subCategorySlug: sub?.slug || null,
    categoryName: category.name,
    subCategoryName: sub?.name || null
  };
}

export function resolveCategoryParams(params) {
  if (!catalog) {
    return { notFound: true };
  }

  const name = params.get("name");
  if (name) {
    const entry = entryFromName(name);
    if (!entry) return { notFound: true };

    const category = catalog.categoryById[entry.categoryId];
    const sub = entry.subCategoryId
      ? catalog.subCategoryById[entry.subCategoryId]
      : null;

    return {
      notFound: false,
      categoryId: entry.categoryId,
      subCategoryId: entry.subCategoryId || null,
      categorySlug: category.slug,
      subCategorySlug: sub?.slug || entry.slug || null,
      categoryName: category.name,
      subCategoryName: sub?.name || null
    };
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

    const category = catalog.categoryById[entry.categoryId];
    const sub = entry.subCategoryId
      ? catalog.subCategoryById[entry.subCategoryId]
      : null;

    return {
      notFound: false,
      categoryId: entry.categoryId,
      subCategoryId: entry.subCategoryId || null,
      categorySlug: category.slug,
      subCategorySlug: sub?.slug || null,
      categoryName: category.name,
      subCategoryName: sub?.name || null
    };
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

  const hasLegacy = params.has("id") || params.has("name");
  if (!hasLegacy) return null;

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
      `.cat-nav__item > a[href*="id=${category.id}"], .cat-nav__item > a[data-category-id="${category.id}"]`
    );

    if (mainLink) {
      mainLink.href = buildCategoryPath({ categorySlug: category.slug });
      mainLink.dataset.categorySlug = category.slug;
    }

    const item = mainLink?.closest(".cat-nav__item");
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
