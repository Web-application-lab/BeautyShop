import { template } from "../components/productCard.js";
import { navigateTo } from "../navigation.js";

const categoryLabels = {
  1: "Арьс арчилгаа / Skincare",
  2: "Нүүр будалт / Makeup",
  3: "Нарны хамгаалалт / Sun Care",
  4: "Бие арчилгаа / Body Care",
  5: "Үс арчилгаа / Hair Care"
};

const categoryKeywords = {
  1: ["арьс арчилгаа", "skincare", "skin care", "serum", "toner", "cream", "cleanser"],
  2: ["нүүр будалт", "makeup", "cushion", "mascara", "lip", "palette"],
  3: ["нарны хамгаалалт", "sunscreen", "sun care", "spf"],
  4: ["бие арчилгаа", "body care", "body lotion", "body wash"],
  5: ["үс арчилгаа", "hair care", "shampoo", "conditioner", "hair mask"]
};

const keywordAliases = [
  ["серум", "serum"],
  ["тонер", "toner"],
  ["эссэнц", "essence"],
  ["ампул", "ampoule", "ampule"],
  ["пад", "pad"],
  ["мист", "mist"],
  ["маск", "mask", "sheet mask", "sleeping mask"],
  ["крем", "cream", "moisturizer", "moisturiser", "moisturizing", "чийгшүүлэгч", "lotion"],
  ["тос", "oil", "balm", "ointment"],
  ["гель", "gel"],
  ["цэвэрлэгч", "cleanser", "cleansing", "foam", "face wash", "oil cleanser", "cleansing oil", "cleansing water", "угаагч"],
  ["нарны тос", "sunscreen", "sun cream", "spf", "sun care", "uv protection"],
  ["батга", "acne", "blemish", "breakout", "pimple", "pore", "нүхжилт"],
  ["хуурай", "dry", "dehydrated", "hydrating", "hydration", "moisture", "чийг"],
  ["тослог", "oily", "sebum", "oil control"],
  ["холимог", "combination", "combo"],
  ["эмзэг", "sensitive", "soothing", "calming", "relief", "тайвшруулах", "cica", "centella"],
  ["толбо", "pigment", "pigmentation", "dark spot", "brightening", "glow", "гэрэлт", "niacinamide"],
  ["үрчлээ", "wrinkle", "anti aging", "anti-aging", "firming"],
  ["арьс арчилгаа", "skincare", "skin care"],
  ["нүүр будалт", "makeup", "cushion", "mascara", "lip", "palette"],
  ["бие арчилгаа", "body care", "body wash", "body lotion"],
  ["үс арчилгаа", "hair care", "shampoo", "conditioner", "hair mask"],
  ["нүдний арчилгаа", "eye care", "eye cream"],
  ["уруул", "lip", "lip care", "lip balm"]
];

const sortLabels = {
  relevance: "Хамааралтай",
  "price-asc": "Үнэ өсөхөөр",
  "price-desc": "Үнэ буурахаар",
  "rating-desc": "Үнэлгээ өндөр",
  "reviews-desc": "Сэтгэгдэл олон",
  "name-asc": "Нэрээр A-Z"
};

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitWords(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function getIngredientsText(product) {
  return Array.isArray(product.ingredients)
    ? product.ingredients.join(" ")
    : String(product.ingredients || "");
}

function getCategoryText(product) {
  return (categoryKeywords[product.categoryId] || []).join(" ");
}

function getCurrentPrice(product) {
  return Number(product.newPrice || product.price || 0);
}

function buildSearchIndex(product) {
  const fields = {
    name: normalize(product.name),
    brand: normalize(product.brand),
    description: normalize(product.description),
    ingredients: normalize(getIngredientsText(product)),
    usage: normalize(product.usage),
    category: normalize(getCategoryText(product))
  };

  const words = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, splitWords(value)])
  );

  return {
    fields,
    words,
    combined: Object.values(fields).filter(Boolean).join(" ")
  };
}

function editDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, index) => index);
  const curr = new Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
    }

    for (let j = 0; j <= b.length; j += 1) {
      prev[j] = curr[j];
    }
  }

  return prev[b.length];
}

function isFuzzyMatch(term, word) {
  if (!term || !word || term.includes(" ")) return false;
  if (term.length < 4 || word.length < 4) return false;
  if (Math.abs(term.length - word.length) > 2) return false;

  const maxDistance = term.length >= 7 ? 2 : 1;
  return editDistance(term, word) <= maxDistance;
}

function expandQueryTerm(term) {
  const variants = new Set([term]);

  keywordAliases.forEach(group => {
    const normalizedGroup = group.map(item => normalize(item));
    if (normalizedGroup.some(alias => alias.includes(term) || term.includes(alias))) {
      normalizedGroup.forEach(alias => variants.add(alias));
    }
  });

  return [...variants].filter(Boolean);
}

function scoreVariant(variant, text, words, weight) {
  if (!variant || !text) return 0;

  const paddedText = ` ${text} `;
  const paddedVariant = ` ${variant} `;

  if (text === variant) return weight + 36;
  if (text.startsWith(variant)) return weight + 28;
  if (paddedText.includes(paddedVariant)) return weight + 24;
  if (text.includes(variant)) return weight + 18;

  if (!variant.includes(" ")) {
    if (words.includes(variant)) return weight + 20;
    if (words.some(word => word.startsWith(variant) || variant.startsWith(word))) return weight + 12;
    if (words.some(word => isFuzzyMatch(variant, word))) return weight + 10;
  }

  return 0;
}

function scoreProduct(product, normalizedQuery, queryTerms) {
  const searchIndex = buildSearchIndex(product);
  const fieldValues = Object.values(searchIndex.fields);
  const fieldWeights = {
    name: 60,
    brand: 42,
    category: 28,
    ingredients: 22,
    description: 16,
    usage: 12
  };

  let score = 0;
  let matchedTerms = 0;
  let directScore = 0;
  let directTermMatches = 0;

  if (searchIndex.fields.name === normalizedQuery) {
    score += 180;
    directScore = 520;
  } else if (searchIndex.fields.name.includes(normalizedQuery)) {
    score += 120;
    directScore = 420;
  }

  if (searchIndex.fields.brand === normalizedQuery) {
    score += 110;
    directScore = Math.max(directScore, 360);
  } else if (searchIndex.fields.brand.includes(normalizedQuery)) {
    score += 70;
    directScore = Math.max(directScore, 300);
  }

  if (searchIndex.combined.includes(normalizedQuery)) {
    score += 32;
    directScore = Math.max(directScore, 220);
  }

  queryTerms.forEach(term => {
    const variants = expandQueryTerm(term);
    let bestVariantScore = 0;
    const hasDirectTermMatch = fieldValues.some(value => value.includes(term));

    if (hasDirectTermMatch) {
      directTermMatches += 1;
      directScore += 30;
    }

    variants.forEach(variant => {
      Object.entries(fieldWeights).forEach(([field, weight]) => {
        bestVariantScore = Math.max(
          bestVariantScore,
          scoreVariant(variant, searchIndex.fields[field], searchIndex.words[field], weight)
        );
      });
    });

    if (bestVariantScore > 0) {
      matchedTerms += 1;
      score += bestVariantScore;
    }
  });

  score += Number(product.rating || 0) * 2;
  score += Math.min(Number(product.reviews || 0) / 100, 8);

  const minimumMatchedTerms = queryTerms.length === 1
    ? 1
    : Math.max(queryTerms.length - 1, 1);

  const hasDirectMatch = directScore > 0;

  return {
    score,
    matchedTerms,
    directScore,
    directTermMatches,
    hasDirectMatch,
    isMatch: hasDirectMatch || (matchedTerms >= minimumMatchedTerms && score > 30)
  };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSearchState(params) {
  return {
    q: params.get("q") || "",
    category: params.get("category") || "",
    brand: params.get("brand") || "",
    minPrice: params.get("min_price") || "",
    maxPrice: params.get("max_price") || "",
    sort: params.get("sort") || "relevance"
  };
}

function buildSearchHash(state) {
  const nextParams = new URLSearchParams();
  if (state.q.trim()) nextParams.set("q", state.q.trim());
  if (state.category) nextParams.set("category", state.category);
  if (state.brand) nextParams.set("brand", state.brand);
  if (state.minPrice) nextParams.set("min_price", state.minPrice);
  if (state.maxPrice) nextParams.set("max_price", state.maxPrice);
  if (state.sort && state.sort !== "relevance") nextParams.set("sort", state.sort);

  const queryString = nextParams.toString();
  return queryString ? `#search?${queryString}` : "#search";
}

function readFormState(form, sortSelect) {
  const formData = new FormData(form);

  return {
    q: String(formData.get("q") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    brand: String(formData.get("brand") || "").trim(),
    minPrice: String(formData.get("min_price") || "").trim(),
    maxPrice: String(formData.get("max_price") || "").trim(),
    sort: String(sortSelect?.value || "relevance")
  };
}

function sortResults(items, sortKey, hasQuery) {
  const activeSort = sortKey || (hasQuery ? "relevance" : "rating-desc");
  const compareDirectness = (a, b) => (
    Number(b.hasDirectMatch) - Number(a.hasDirectMatch)
    || b.directTermMatches - a.directTermMatches
    || b.directScore - a.directScore
  );

  items.sort((a, b) => {
    switch (activeSort) {
      case "price-asc":
        return compareDirectness(a, b)
          || getCurrentPrice(a.product) - getCurrentPrice(b.product)
          || b.score - a.score;
      case "price-desc":
        return compareDirectness(a, b)
          || getCurrentPrice(b.product) - getCurrentPrice(a.product)
          || b.score - a.score;
      case "rating-desc":
        return compareDirectness(a, b)
          || Number(b.product.rating || 0) - Number(a.product.rating || 0)
          || Number(b.product.reviews || 0) - Number(a.product.reviews || 0);
      case "reviews-desc":
        return compareDirectness(a, b)
          || Number(b.product.reviews || 0) - Number(a.product.reviews || 0)
          || Number(b.product.rating || 0) - Number(a.product.rating || 0);
      case "name-asc":
        return compareDirectness(a, b)
          || String(a.product.name || "").localeCompare(String(b.product.name || ""), "mn")
          || b.score - a.score;
      case "relevance":
      default:
        return compareDirectness(a, b)
          || b.score - a.score
          || Number(b.product.rating || 0) - Number(a.product.rating || 0)
          || Number(b.product.reviews || 0) - Number(a.product.reviews || 0);
    }
  });

  return items;
}

function getFilteredProducts(products, state) {
  const normalizedQuery = normalize(state.q);
  const queryTerms = splitWords(state.q);
  const hasQuery = Boolean(normalizedQuery);
  const minPrice = Number(state.minPrice);
  const maxPrice = Number(state.maxPrice);

  const scored = products
    .map(product => {
      if (!hasQuery) {
        return {
          product,
          score: Number(product.rating || 0) * 10 + Math.min(Number(product.reviews || 0) / 20, 20),
          matchedTerms: 0,
          directScore: 0,
          directTermMatches: 0,
          hasDirectMatch: false,
          isMatch: true
        };
      }

      return {
        product,
        ...scoreProduct(product, normalizedQuery, queryTerms)
      };
    })
    .filter(item => item.isMatch)
    .filter(item => !state.category || String(item.product.categoryId) === state.category)
    .filter(item => !state.brand || String(item.product.brand || "") === state.brand)
    .filter(item => Number.isNaN(minPrice) || getCurrentPrice(item.product) >= minPrice)
    .filter(item => Number.isNaN(maxPrice) || getCurrentPrice(item.product) <= maxPrice);

  return sortResults(scored, state.sort, hasQuery);
}

function buildAppliedFilters(state) {
  const filters = [];

  if (state.q.trim()) {
    filters.push(`"${escapeHtml(state.q.trim())}"`);
  }

  if (state.category) {
    filters.push(escapeHtml(categoryLabels[Number(state.category)] || state.category));
  }

  if (state.brand) {
    filters.push(escapeHtml(state.brand));
  }

  if (state.minPrice || state.maxPrice) {
    const min = state.minPrice ? `${escapeHtml(state.minPrice)}₮` : "0₮";
    const max = state.maxPrice ? `${escapeHtml(state.maxPrice)}₮` : "Дээд хязгааргүй";
    filters.push(`${min} - ${max}`);
  }

  return filters;
}

function syncGlobalSearchInput(query) {
  const input = document.querySelector(".search-box__input");
  if (input) {
    input.value = query;
  }
}

export function renderSearchPage(products, container, params) {
  const state = buildSearchState(params);
  const safeQuery = escapeHtml(state.q);
  const filteredItems = getFilteredProducts(products, state);
  const brands = [...new Set(products.map(product => String(product.brand || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "mn"));
  const appliedFilters = buildAppliedFilters(state);
  const hasFilters = appliedFilters.length > 0;
  const hasProducts = filteredItems.length > 0;
  const hasQuery = Boolean(state.q.trim());
  const directItems = hasQuery ? filteredItems.filter(item => item.hasDirectMatch) : [];
  const relatedItems = hasQuery ? filteredItems.filter(item => !item.hasDirectMatch) : [];
  const primaryItems = directItems.length > 0 ? directItems : filteredItems;
  const secondaryItems = directItems.length > 0 ? relatedItems : [];
  const summaryText = state.q.trim()
    ? `"${safeQuery}" хайлтаар ${filteredItems.length} бүтээгдэхүүн олдлоо.`
    : `${filteredItems.length} бүтээгдэхүүн шүүгдлээ.`;
  const selectedSort = sortLabels[state.sort] ? state.sort : "relevance";

  container.innerHTML = `
    <section class="search-page">
      <div class="search-page__shell">
        <nav class="search-page__breadcrumb" aria-label="Breadcrumb">
          <a href="#home">Нүүр хуудас</a>
          <span class="search-page__breadcrumb-separator">></span>
          <span>Бүтээгдэхүүн</span>
        </nav>

        <div class="search-page__layout">
          <aside class="search-page__sidebar">
            <form class="search-page__filters" id="searchFilterForm">
              <div class="search-page__filter-card">
                <h2>Хайлт хийх</h2>

                <label class="search-page__field">
                  <span>Түлхүүр үг</span>
                  <input class="search-page__input" type="text" name="q" value="${safeQuery}" placeholder="Жишээ нь: тос, serum, sensitive, Jumiso">
                </label>

                <label class="search-page__field">
                  <span>Ангилал</span>
                  <select class="search-page__select" name="category">
                    <option value="">Бүх ангилал</option>
                    ${Object.entries(categoryLabels).map(([value, label]) => `
                      <option value="${value}" ${state.category === value ? "selected" : ""}>${label}</option>
                    `).join("")}
                  </select>
                </label>

                <label class="search-page__field">
                  <span>Бренд</span>
                  <select class="search-page__select" name="brand">
                    <option value="">Бүх бренд</option>
                    ${brands.map(brand => `
                      <option value="${escapeHtml(brand)}" ${state.brand === brand ? "selected" : ""}>${escapeHtml(brand)}</option>
                    `).join("")}
                  </select>
                </label>

                <div class="search-page__field">
                  <span>Үнэ</span>
                  <div class="search-page__field-row">
                    <input class="search-page__input" type="number" min="0" step="500" name="min_price" value="${escapeHtml(state.minPrice)}" placeholder="Доод үнэ">
                    <input class="search-page__input" type="number" min="0" step="500" name="max_price" value="${escapeHtml(state.maxPrice)}" placeholder="Дээд үнэ">
                  </div>
                </div>

                <div class="search-page__actions">
                  <p class="search-page__auto-note">Сонгох бүрт илэрц автоматаар шинэчлэгдэнэ.</p>
                  <button class="search-page__button search-page__button--secondary" type="button" id="searchResetBtn">Цэвэрлэх</button>
                </div>
              </div>
            </form>
          </aside>

          <div class="search-page__content">
            <div class="search-page__toolbar">
              <div class="search-page__toolbar-copy">
                <p class="search-page__result-count">${filteredItems.length} илэрц</p>
                ${
                  hasFilters
                    ? `
                      <div class="search-page__chips">
                        ${appliedFilters.map(filter => `<span class="search-page__chip">${filter}</span>`).join("")}
                      </div>
                    `
                    : `<p class="search-page__hint">Cosmix шиг layout-тайгаар filter болон result-ээ нэг дороос удирдана.</p>`
                }
              </div>

              <label class="search-page__sort">
                <span>Эрэмбэлэх</span>
                <select class="search-page__select" id="searchSortSelect">
                  ${Object.entries(sortLabels).map(([value, label]) => `
                    <option value="${value}" ${selectedSort === value ? "selected" : ""}>${label}</option>
                  `).join("")}
                </select>
              </label>
            </div>

            ${
              hasProducts
                ? `
                  <div class="search-page__result-sections">
                    <section class="search-page__result-group">
                      ${directItems.length > 0 ? `<p class="search-page__group-label">Шууд таарсан илэрц</p>` : ""}
                      <div class="search-page__results products">
                        ${primaryItems.map(item => template.cardTemplate(item.product)).join("")}
                      </div>
                    </section>
                    ${
                      secondaryItems.length > 0
                        ? `
                          <section class="search-page__result-group">
                            <p class="search-page__group-label">Төстэй илэрц</p>
                            <div class="search-page__results products">
                              ${secondaryItems.map(item => template.cardTemplate(item.product)).join("")}
                            </div>
                          </section>
                        `
                        : ""
                    }
                  </div>
                `
                : `
                  <div class="search-page__empty">
                    <h2>Илэрц олдсонгүй</h2>
                    <p>${state.q.trim()
                      ? `"${safeQuery}" хайлтаар тохирох бүтээгдэхүүн олдсонгүй.`
                      : "Сонгосон шүүлтэд тохирох бүтээгдэхүүн олдсонгүй."} Өөр бренд, үнэ эсвэл ангиллаар дахин хайж үзнэ үү.</p>
                  </div>
                `
            }
          </div>
        </div>
      </div>
    </section>
  `;

  const form = container.querySelector("#searchFilterForm");
  const sortSelect = container.querySelector("#searchSortSelect");
  const resetButton = container.querySelector("#searchResetBtn");
  let autoApplyTimer;

  const applyState = nextState => {
    const nextHash = buildSearchHash(nextState);
    syncGlobalSearchInput(nextState.q);

    const current = window.location.pathname + window.location.hash;
    if (current === `/${nextHash}` || current === nextHash) {
      renderSearchPage(products, container, new URLSearchParams(nextHash.split("?")[1] || ""));
      return;
    }

    navigateTo(nextHash, { replace: true });
    renderSearchPage(products, container, new URLSearchParams(nextHash.split("?")[1] || ""));
  };

  const scheduleApply = delay => {
    if (!form) return;

    window.clearTimeout(autoApplyTimer);
    autoApplyTimer = window.setTimeout(() => {
      applyState(readFormState(form, sortSelect));
    }, delay);
  };

  form?.addEventListener("submit", event => {
    event.preventDefault();
    applyState(readFormState(form, sortSelect));
  });

  form?.addEventListener("change", event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
      return;
    }

    applyState(readFormState(form, sortSelect));
  });

  form?.addEventListener("input", event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (!["text", "search", "number"].includes(target.type)) {
      return;
    }

    scheduleApply(250);
  });

  sortSelect?.addEventListener("change", () => {
    if (!form) return;
    applyState(readFormState(form, sortSelect));
  });

  resetButton?.addEventListener("click", () => {
    applyState({
      q: "",
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sort: "relevance"
    });
  });
}
