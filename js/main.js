import "./components/cartButton.js";
import "./components/wishlistButton.js";

import { router } from "./router.js";
import { updateNavbarCount } from "./components/navbarCount.js";
import { setupCardActions } from "./components/cardAction.js";
import { WishlistPanel } from "./pages/wishlistPage.js";
import { CartPanel } from "./pages/cartPage.js";

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
    this.categoryId  = product.categoryId;
    this.description = product.description;
    this.ingredients = product.ingredients;
    this.usage       = product.usage;
    this.img         = product.img;
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

async function initApp() {
  const data     = await getData("./products.json");
  const products = data.products.map(product => new Product(product));

  // Drawer-уудыг нэг удаа эхлүүлнэ
  WishlistPanel.init(products);
  CartPanel.init(products);

  // Navbar товчнуудыг drawer-тай холбоно
  document.querySelector(".top-nav__actions .icon-btn[aria-label='Wishlist']")
    ?.addEventListener("click", () => WishlistPanel.open());

  document.querySelector("#cartToggle")
    ?.addEventListener("click", () => CartPanel.open());

  setupCardActions(products);
  router(products);
  updateNavbarCount();

  window.addEventListener("hashchange", () => {
    router(products);
    updateNavbarCount();
  });
}

initApp();