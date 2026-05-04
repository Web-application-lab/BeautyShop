import { updateNavbarCount } from "./navbarCount.js";
import { showToast } from "./toggle.js";

class WishlistButton extends HTMLElement {
  connectedCallback() {
    this.productId = this.getAttribute("product-id");
    this.#render();
  }

  #isWishlisted() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some(item => Number(item) === Number(this.productId));
  }

  #toggle() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex(item => Number(item) === Number(this.productId));

    if (index === -1) {
      wishlist.push(Number(this.productId));
      showToast("Хүслийн жагсаалтад нэмэгдлээ!")
    } else {
      wishlist.splice(index, 1);
      showToast("Хүслийн жагсаалтаас хасагдлаа!")
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCount();
    this.#render();
  }

  #render() {
    const wishlisted = this.#isWishlisted();
    this.innerHTML = `
      <button class="wishlist" type="button">
        <i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"
           style="color: ${wishlisted ? "var(--color-main-500)" : "inherit"}">
        </i>
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      this.#toggle();
    });
  }
}

if (!customElements.get("wishlist-button")) {
  customElements.define("wishlist-button", WishlistButton);
}