import "./components/cartButton.js";
import "./components/wishlistButton.js";

import { router } from "./router.js";
import { updateNavbarCount } from "./components/navbarCount.js";
import { setupCardActions } from "./components/cardAction.js";

class Product {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.brand = product.brand;
    this.price = product.price;
    this.discount = product.discount || 0;
    this.newPrice = product.price - (product.price * this.discount / 100);
    this.rating = product.rating;
    this.reviews = product.reviews;
    this.categoryId = product.categoryId;
    this.description = product.description;
    this.ingredients = product.ingredients;
    this.usage = product.usage;
    this.img = product.img;
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
  console.log("MAIN ажиллаж байна");

  const data = await getData("./products.json");
  console.log("DATA:", data);

  const products = data.products.map(product => new Product(product));
  console.log("PRODUCTS:", products);

  setupCardActions(products); 

  router(products);
  updateNavbarCount();

  window.addEventListener("hashchange", () => {
    router(products);
    updateNavbarCount();
  });
}

initApp();