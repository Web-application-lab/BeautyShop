import "./components/cartButton.js";
import "./components/wishlistButton.js";

import { router } from "./router.js";
import { updateNavbarCount } from "./components/navbarCount.js";
import { setupCardActions } from "./components/cardAction.js";
import { WishlistPanel } from "./pages/wishlistPage.js";
import { CartPanel } from "./pages/cartPage.js";
import { setupCategoryNav } from "./components/categoryNav.js";
import { initCategoryCatalog } from "./components/categoryCatalog.js";
import { setupAppNavigation } from "./navigation.js";
import { productImageSrc } from "./utils/assets.js";

class Product {
  constructor(product) {
    this.id          = product.id;
    this.name        = product.name;
    this.brand       = product.brand;
    this.price       = product.price;
    this.discount    = product.discount || 0;
    this.newPrice    = product.price - (product.price * this.discount / 100);
    this.rating      = product.rating;
    this.reviews     = product.reviews;
    this.categoryId     = product.categoryId;
    this.subCategoryId = product.subCategoryId;
    this.description = product.description;
    this.ingredients = product.ingredients;
    this.usage       = product.usage;
    this.img         = product.img;
    this.imageUrl    = productImageSrc(product.img);
  }
}

function getData(dataUrl) {
  return fetch(dataUrl)
    .then(res => res.json())
    .catch(error => {
      console.error("Error fetching data:", error);
      return { products: [] };
    });
}

function syncSearchInputWithHash() {
  const input = document.querySelector(".search-box__input");
  if (!input) return;

  const hash = window.location.hash || "";
  const [page, query] = hash.replace("#", "").split("?");

  if (page !== "search") {
    return;
  }

  const params = new URLSearchParams(query || "");
  input.value = params.get("q") || "";
}

function setupSearch(products) {
  const input = document.querySelector(".search-box__input");
  const icon = document.querySelector(".search-box__icon");
  if (!input) return;

  const runSearch = () => {
    const query = input.value.trim();
    const nextHash = `#search?q=${encodeURIComponent(query)}`;

    if (window.location.hash === nextHash) {
      router(products);
      return;
    }

    window.location.hash = nextHash;
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

      if (window.location.hash === nextHash) {
        router(products);
        return;
      }

      window.location.hash = nextHash;
    });
  });

  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
}

async function initApp() {
  const data     = await getData("/products.json");
  initCategoryCatalog(data);
  const products = data.products.map(product => new Product(product));

  // Drawer-уудыг нэг удаа эхлүүлнэ
  WishlistPanel.init(products);
  document.addEventListener("wishlist:addToCart", (e) => {
    const product = e.detail;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
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

  // Navbar товчнуудыг drawer-тай холбоно
  document.querySelector(".top-nav__actions .icon-btn[aria-label='Wishlist']")
    ?.addEventListener("click", () => WishlistPanel.open());

  document.querySelector("#cartToggle")
    ?.addEventListener("click", () => CartPanel.open());

  setupCardActions(products);
  setupSearch(products);
  setupFooterNavigation(products);
  setupCategoryNav();
  setupAppNavigation(products, router);
  router(products);
  updateNavbarCount();

  window.addEventListener("hashchange", () => {
    syncSearchInputWithHash();
    router(products);
    updateNavbarCount();
  });
}

initApp();