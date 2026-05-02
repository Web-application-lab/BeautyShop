class CartButton extends HTMLElement {
  connectedCallback() {
    this.productId = this.getAttribute("product-id");

    this.innerHTML = `
      <button class="add-cart" type="button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      console.log("cart component clicked", this.productId);
      this.dispatchEvent(
        new CustomEvent("add-cart", {
          detail: {
            productId: Number(this.productId),
          },
          bubbles: true,
        })
      );
    });
  }
}

if (!customElements.get("cart-button")) {
  customElements.define("cart-button", CartButton);
}