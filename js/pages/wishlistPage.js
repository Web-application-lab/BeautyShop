import { template } from "../components/productCard.js";

export function renderWishlistPage(products) {
  const app = document.querySelector("#app");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const wishlistProducts = products.filter(product =>
    wishlist.includes(String(product.id)) || wishlist.includes(Number(product.id))
  );

  app.innerHTML = `
    <section class="products-section">
      <h2>Миний wishlist</h2>

      <div class="products">
        ${
          wishlistProducts.length > 0
            ? wishlistProducts.map(product => template.cardTemplate(product)).join("")
            : "<p>Wishlist хоосон байна.</p>"
        }
      </div>
    </section>
  `;
}