import { template } from "../components/productCard.js";

export function renderSalePage(products, container) {
  let saleProducts = products.filter(product => Number(product.discount) > 0);

  container.innerHTML = `
    <section class="discount-product page">
      <h2 class="sale-product">Хямдралтай бүтээгдэхүүн</h2>
      <p class="product-count">${saleProducts.length} бүтээгдэхүүн</p>

      <div class="sort">
        <select class="category">
          <option value="">Бүх ангилал</option>
          <option value="skin-care">Арьс арчилгаа</option>
          <option value="make-up">Нүүр будалт</option>
          <option value="sun-protection">Нарны хамгаалалт</option>
          <option value="body-care">Бие арчилгаа</option>
          <option value="hair-care">Үс арчилгаа</option>
        </select>

        <select class="sorting">
          <option value="">Эрэмбэлэх</option>
          <option value="price-asc">Үнэ өсөхөөр</option>
          <option value="price-desc">Үнэ буурахаар</option>
          <option value="new">Шинэ</option>
          <option value="sale">Хямдарсан</option>
        </select>
      </div>

      <div class="products">
        ${saleProducts.map(product => template.saleTemplate(product)).join("")}
      </div>
    </section>
  `;
}