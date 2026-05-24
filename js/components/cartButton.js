import { addToCart, CartPanel } from "../pages/cartPage.js";

class CartButton extends HTMLElement {
  connectedCallback() {
    this.productId  = this.getAttribute("product-id");
    this.isDisabled = this.hasAttribute("disabled");
    this._render();
  }

  _render() {
    this.innerHTML = `
      <button class="add-cart ${this.isDisabled ? "add-cart--disabled" : ""}"
              type="button"
              aria-label="Сагсанд нэмэх"
              ${this.isDisabled ? "disabled" : ""}>
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    `;

    if (!this.isDisabled) {
      this.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(this.productId);
        CartPanel.open();
      });
    }
  }
}

if (!customElements.get("cart-button")) {
  customElements.define("cart-button", CartButton);
}