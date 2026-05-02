import { template } from "../components/productCard.js";

export function renderHighRatedPage(products, app) {
  const highRatedProducts = products.filter(product => product.rating >= 4.5);

  app.innerHTML = `
    <section class="high-rated">
      <h2 class="high-rated-product">Үнэлгээ өндөр бүтээгдэхүүн</h2>
      <p class="product-count">${highRatedProducts.length} бүтээгдэхүүн</p>

      <div class="sort">
        <select name="category" class="category">
          <option value="">Бүх ангилал</option>
          <option value="1">Арьс арчилгаа</option>
          <option value="2">Нүүр будалт</option>
          <option value="3">Нарны хамгаалалт</option>
          <option value="4">Бие арчилгаа</option>
          <option value="5">Үс арчилгаа</option>
        </select>

        <select name="sorting" class="sorting">
          <option value="">Эрэмбэлэх</option>
          <option value="price-asc">Үнэ өсөхөөр</option>
          <option value="price-desc">Үнэ буурахаар</option>
          <option value="sale">Хямдарсан</option>
        </select>
      </div>

      <div class="products">
        ${highRatedProducts.map(product => template.cardTemplate(product)).join("")}
      </div>
    </section>
  `;
}