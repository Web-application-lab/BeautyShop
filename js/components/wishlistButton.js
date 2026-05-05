// wishlistButton.js
import { updateNavbarCount } from "./navbarCount.js";
import { showToast } from "./toggle.js";
import { WishlistPanel } from "../pages/wishlistPage.js";

class WishlistButton extends HTMLElement {
  connectedCallback() {
    this.productId = this.getAttribute("product-id");
    this.#render();
  }

  // Panel дотроос дуудагдана
  refresh() {
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
      showToast("Хүслийн жагсаалтад нэмэгдлээ!");
    } else {
      wishlist.splice(index, 1);
      showToast("Хүслийн жагсаалтаас хасагдлаа!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCount();
    this.#render();

    // Панел нээлттэй байвал шинэчилнэ
    WishlistPanel.refresh();
  }

  #render() {
    const wishlisted = this.#isWishlisted();
    this.innerHTML = `
      <button class="wishlist" type="button" aria-label="Хүслийн жагсаалт">
        <i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"
           style="color: ${wishlisted ? "var(--color-main-500)" : "inherit"}">
        </i>
      </button>
    `;

    this.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      this.#toggle();
      WishlistPanel.open();
    });
  }
}

if (!customElements.get("wishlist-button")) {
  customElements.define("wishlist-button", WishlistButton);
}