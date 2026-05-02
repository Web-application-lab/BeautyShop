import { updateNavbarCount } from "./navbarCount.js";

export function setupCardActions(products) {
  document.addEventListener("add-cart", (event) => {
    console.log("add-cart event received", event.detail);

    const id = Number(event.detail.productId);
    const product = products.find(p => Number(p.id) === id);

    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => Number(item.id) === id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbarCount();
  });

  document.addEventListener("add-wishlist", (event) => {
    console.log("add-wishlist event received", event.detail);

    const id = Number(event.detail.productId);
    const product = products.find(p => Number(p.id) === id);

    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.some(item => Number(item.id) === id);

    if (!exists) {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCount();
  });
}