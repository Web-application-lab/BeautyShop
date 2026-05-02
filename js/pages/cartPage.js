import { template } from "../components/productCard.js";

export function renderCartPage(products) {
  const app = document.querySelector("#app");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartProducts = products.filter(product =>
    cart.includes(String(product.id)) || cart.includes(Number(product.id))
  );

  app.innerHTML = `
    <section class="products-section">
      <h2>Миний сагс</h2>

      <div class="products">
        ${
          cartProducts.length > 0
            ? cartProducts.map(product => template.cardTemplate(product)).join("")
            : "<p>Сагс хоосон байна.</p>"
        }
      </div>
    </section>
  `;
}