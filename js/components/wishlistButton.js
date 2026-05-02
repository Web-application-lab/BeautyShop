class WishlistButton extends HTMLElement {
  connectedCallback() {
    this.productId = this.getAttribute("product-id");

    // wishlistButton.js
    this.innerHTML = `
      <button class="wishlist" type="button">
        <i class="fa-regular fa-heart"></i>
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      console.log("wishlist component clicked", this.productId);
      this.dispatchEvent(
        new CustomEvent("add-wishlist", {
          detail: {
            productId: Number(this.productId),
          },
          bubbles: true,
        })
      );
    });
  }
}

if (!customElements.get("wishlist-button")) {
  customElements.define("wishlist-button", WishlistButton);
}