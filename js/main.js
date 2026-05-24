import "./components/cartButton.js";
import "./components/wishlistButton.js";

import { router } from "./router.js";
import { updateNavbarCount } from "./components/navbarCount.js";
import { setupCardActions } from "./components/cardAction.js";
import { WishlistPanel } from "./pages/wishlistPage.js";
import { CartPanel } from "./pages/cartPage.js";
import { setupCategoryNav } from "./components/categoryNav.js";
import { setupBrandNav } from "./components/brandNav.js";
import { initCategoryCatalog } from "./components/categoryCatalog.js";
<<<<<<< HEAD
import { initBrandCatalog } from "./components/brandCatalog.js";
=======
>>>>>>> 38e961e20b4bb5f6eede5e26514121ee98472485
import { navigateTo, setupAppNavigation } from "./navigation.js";
<<<<<<< HEAD
import { productImageSrc } from "./utils/assets.js";
import { AuthModal } from "./pages/authPage.js";
import { setupUserDropdown, updateUserBtn } from "./components/userDropdown.js";
=======
>>>>>>> 65282e7ffdb31b90bad73666effe583b4a50a530

class Product {
  constructor(product) {
    this.id           = product.id;
    this.name         = product.name;
    this.brand        = product.brand;
    this.price        = product.price;
    this.discount     = product.discount || 0;
    this.newPrice     = product.price - (product.price * this.discount / 100);
    this.rating       = product.rating;
    this.reviews      = product.reviews;
    this.categoryId   = product.categoryId;
    this.subCategoryId = product.subCategoryId;
    this.concernIds   = product.concernIds || [];
    this.description  = product.description;
    this.ingredients  = product.ingredients;
    this.usage        = product.usage;
    this.img          = product.img;
    this.imageUrl     = productImageSrc(product.img);
  }
}

<<<<<<< HEAD
function getData(dataUrl) {
  return fetch(dataUrl)
    .then(res => res.json())
    .catch(error => {
      console.error("Error fetching data:", error);
      return { products: [], categories: [], subCategories: [], concerns: [] };
    });
=======
async function getData(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [], categories: [], subCategories: [] };
  }
>>>>>>> 65282e7ffdb31b90bad73666effe583b4a50a530
}

function syncSearchInputWithHash() {
  const input = document.querySelector(".search-box__input");
  if (!input) return;

  const hash = window.location.hash || "";
  const [page, query] = hash.replace("#", "").split("?");

  if (page !== "search") return;

  const params = new URLSearchParams(query || "");
  input.value = params.get("q") || "";
}

function setupSearch(products) {
  const input = document.querySelector(".search-box__input");
  const icon  = document.querySelector(".search-box__icon");
  if (!input) return;

  const runSearch = () => {
    const query    = input.value.trim();
    const nextHash = `#search?q=${encodeURIComponent(query)}`;

    if (window.location.pathname + window.location.hash === `/${nextHash}`) {
      router(products);
      return;
    }

    navigateTo(nextHash);
    router(products);
  };

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });

  icon?.addEventListener("click", runSearch);
  syncSearchInputWithHash();
}

function setupFooterNavigation(products) {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  footer.querySelectorAll("[data-route]").forEach(link => {
    link.addEventListener("click", () => {
      const route = link.dataset.route;
      if (!route) return;

      const nextHash = `#${route}`;

      if (window.location.pathname + window.location.hash === `/${nextHash}`) {
        router(products);
        return;
      }

      navigateTo(nextHash);
      router(products);
    });
  });

  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
}

async function initApp() {
<<<<<<< HEAD
  const data = await getData("/api/data");
=======
  const app = document.querySelector("#app");

  try {
  const data = await getData("/products.json");
>>>>>>> 65282e7ffdb31b90bad73666effe583b4a50a530
  initCategoryCatalog(data);
  const list = data.products || [];
  const products = list.map(product => new Product(product));
  initBrandCatalog(products);

  WishlistPanel.init(products);
  document.addEventListener("wishlist:addToCart", (e) => {
    const product  = e.detail;
    const cart     = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => Number(item.id) === Number(product.id));

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbarCount();
  });

  CartPanel.init(products);

  document.querySelector(".top-nav__actions .icon-btn[aria-label='Wishlist']")
    ?.addEventListener("click", () => WishlistPanel.open());

  document.querySelector("#cartToggle")
    ?.addEventListener("click", () => CartPanel.open());

  // Auth
  setupUserDropdown();
  updateUserBtn();

  setupCardActions(products);
  setupSearch(products);
  setupFooterNavigation(products);
  setupCategoryNav();
  setupBrandNav();
  setupAppNavigation(products, router);
  router(products);
  updateNavbarCount();

  window.addEventListener("hashchange", () => {
    syncSearchInputWithHash();
    router(products);
    updateNavbarCount();
  });
  } catch (err) {
    console.error(err);
    if (app) {
      app.innerHTML = "<p style='padding:2rem'>Апп ачаалахад алдаа гарлаа. Console-оо шалгана уу.</p>";
    }
  }
}

initApp();