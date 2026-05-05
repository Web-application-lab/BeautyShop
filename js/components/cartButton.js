// cartButton.js
import { CartPanel, addToCart } from "../pages/cartPage.js";

class CartButton extends HTMLElement {
  connectedCallback() {
    this.productId = this.getAttribute("product-id");
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <button class="add-cart" type="button" aria-label="Сагсанд нэмэх">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    `;

    this.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(this.productId);   // ← тоог нэмнэ + storage хадгална
      CartPanel.open();            // ← drawer нээнэ
    });
  }
}

if (!customElements.get("cart-button")) {
  customElements.define("cart-button", CartButton);
}