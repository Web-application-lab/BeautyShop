const HAIR_CATEGORY_ID = 5;

const skinTypes = [
  { id: "oily", name: "Тослог", words: ["тослог", "гел", "sebum"] },
  { id: "dry", name: "Хуурай", words: ["хуурай", "чийг", "moist", "крем"] },
  { id: "dry-combo", name: "Хуурай-Холимог", words: ["холимог", "хуурай"] },
  { id: "oily-combo", name: "Тослог-Холимог", words: ["холимог", "тослог"] }
];

const skinConcerns = [
  { id: "pigment", name: "Нөсөө толботой", ids: [4], words: ["толбо", "цайруул"] },
  { id: "redness", name: "Улайлттай", ids: [2], words: ["улайлт", "cica", "тайвшруул"] },
  { id: "acne", name: "Батга гарамтгай", ids: [5, 6], words: ["батга", "acne", "bha"] },
  { id: "wrinkle", name: "Үрчлээтэй", ids: [7], words: ["үрчлээ", "ретинол"] },
  { id: "pores", name: "Нүхжилттэй", ids: [5], words: ["нүх", "нүхжилт"] },
  { id: "sebum", name: "Тослогжилттой", ids: [5], words: ["тослог", "sebum"] },
  { id: "dryness", name: "Хуурайшилттай", ids: [1, 3], words: ["хуурай", "чийг"] }
];

const hairTypes = [
  { id: "chemical", name: "Химитэй", words: ["химийн", "индүү", "химийн үйлчилгээ", "perm", "wave"] },
  { id: "colored", name: "Будагтай", words: ["будалт", "өнгө", "color", "dye", "colored"] },
  { id: "dry", name: "Хуурай", words: ["хуурай", "хуурайшил", "чийг", "dry", "moist"] },
  { id: "straight", name: "Шулуун", words: ["шулуун", "straight", "гөлгөр", "silky"] },
  { id: "damaged", name: "Гэмтэлтэй", words: ["гэмтсэн", "гэмтэлт", "гарсан", "damage", "recovery", "keratin"] }
];

const skinConcernMap = {
  1: "dryness",
  2: "redness",
  3: "dryness",
  4: "pigment",
  5: "pores",
  6: "acne",
  7: "wrinkle"
};

function getSearchText(product) {
  let ingredients = "";
  if (Array.isArray(product.ingredients)) {
    ingredients = product.ingredients.join(" ");
  } else if (product.ingredients) {
    ingredients = String(product.ingredients);
  }

  return (product.name + " " + product.brand + " " + (product.description || "") + " " + ingredients).toLowerCase();
}

function productMatches(product, filter, useConcernIds) {
  const text = getSearchText(product);

  if (useConcernIds && filter.ids && filter.ids.length) {
    const concernIds = product.concernIds || [];
    for (let i = 0; i < filter.ids.length; i++) {
      if (concernIds.includes(filter.ids[i])) return true;
    }
  }

  for (let i = 0; i < filter.words.length; i++) {
    if (text.includes(filter.words[i])) return true;
  }
  return false;
}

function countMatches(products, filter, useConcernIds) {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (productMatches(products[i], filter, useConcernIds)) count++;
  }
  return count;
}

function getFilterSets(mode) {
  if (mode === "hair") {
    return {
      types: hairTypes,
      concerns: [],
      typeName: "hair-type",
      concernName: "hair-concern",
      typeTitle: "Үсний төрөл",
      concernTitle: "",
      useConcernIds: false,
      showConcerns: false
    };
  }

  return {
    types: skinTypes,
    concerns: skinConcerns,
    typeName: "skin-type",
    concernName: "skin-concern",
    typeTitle: "Арьсны төрөл",
    concernTitle: "Арьсны асуудал",
    useConcernIds: true,
    showConcerns: true
  };
}

export function getFilterMode(resolved) {
  if (resolved && resolved.categoryId === HAIR_CATEGORY_ID) return "hair";
  return "skin";
}

function renderFilterGroup(products, items, inputName, useConcernIds, defaultCheckedId) {
  defaultCheckedId = defaultCheckedId || "";

  return items.map(item => {
    let checked = "";
    if (defaultCheckedId === item.id) checked = " checked";

    return `
      <li class="filter-item">
        <label class="filter-label">
          <input type="checkbox" class="filter-checkbox" name="${inputName}" value="${item.id}"${checked}>
          <span class="filter-name">${item.name}</span>
          <span class="filter-count">${countMatches(products, item, useConcernIds)}</span>
        </label>
      </li>
    `;
  }).join("");
}

export function renderSidebarFilters(products, resolved, mode) {
  const sets = getFilterSets(mode);
  let defaultConcern = "";

  if (mode === "skin" && resolved && resolved.concernId) {
    defaultConcern = skinConcernMap[resolved.concernId] || "";
  }

  const typesHtml = renderFilterGroup(products, sets.types, sets.typeName, false);
  let concernsBlock = "";

  if (sets.showConcerns && sets.concerns.length) {
    const concernsHtml = renderFilterGroup(
      products,
      sets.concerns,
      sets.concernName,
      sets.useConcernIds,
      defaultConcern
    );
    concernsBlock =
      '<h3 class="filters-title">' + sets.concernTitle + "</h3>" +
      '<ul class="filter-list">' + concernsHtml + "</ul>";
  }

  return (
    '<div class="sidebar-filters" data-filter-mode="' + mode + '">' +
    '<h3 class="filters-title">' + sets.typeTitle + "</h3>" +
    '<ul class="filter-list">' + typesHtml + "</ul>" +
    concernsBlock +
    "</div>"
  );
}

function getCheckedValues(sidebar, inputName) {
  const values = [];
  const boxes = sidebar.querySelectorAll('input[name="' + inputName + '"]:checked');
  boxes.forEach(box => values.push(box.value));
  return values;
}

function filterBySelected(list, selectedIds, filters, useConcernIds) {
  if (!selectedIds.length) return list;

  return list.filter(product => {
    for (let i = 0; i < filters.length; i++) {
      if (!selectedIds.includes(filters[i].id)) continue;
      if (productMatches(product, filters[i], useConcernIds)) return true;
    }
    return false;
  });
}

export function applySidebarFilters(list, sidebar, mode) {
  if (!sidebar) return list;

  const sets = getFilterSets(mode);
  const typeIds = getCheckedValues(sidebar, sets.typeName);
  const concernIds = getCheckedValues(sidebar, sets.concernName);

  let result = filterBySelected(list, typeIds, sets.types, false);
  result = filterBySelected(result, concernIds, sets.concerns, sets.useConcernIds);
  return result;
}

export function setupSidebarFilters(container, getList, onUpdate) {
  const sidebar = container.querySelector(".sidebar");
  const sortSelect = container.querySelector(".sort-select");
  if (!sidebar) return;

  const filterBox = sidebar.querySelector("[data-filter-mode]");
  let mode = "skin";
  if (filterBox) mode = filterBox.dataset.filterMode;

  function refresh() {
    const list = applySidebarFilters(getList(), sidebar, mode);
    let sortKey = "";
    if (sortSelect) sortKey = sortSelect.value;
    onUpdate(list, sortKey);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", refresh);
  }

  sidebar.addEventListener("change", event => {
    if (event.target.type === "checkbox") refresh();
  });
}