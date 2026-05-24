import { showToast } from "./toggle.js";
import { addToCart } from "../pages/cartPage.js";
import { updateNavbarCount } from "./navbarCount.js";

export function setupCardActions(products) {
  // cart-button custom element-ээр зохицуулагдах тул
  // зөвхөн wishlist болон бусад card action-уудыг энд хийнэ
  document.addEventListener("add-cart", (event) => {
    const id      = Number(event.detail?.productId);
    const product = products.find(p => Number(p.id) === id);
    if (!product) return;

    addToCart(id);
    updateNavbarCount();
    showToast("Сагсанд нэмэгдлээ!");
  });
}