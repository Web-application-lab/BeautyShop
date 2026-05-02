import { template } from "../components/productCard.js";

export function renderHomePage(products, container) {
  const highRated = products.filter(product => product.rating >= 4.5).slice(0, 5);
  const sales = products.filter(product => product.discount > 0).slice(0, 5);

  container.innerHTML = `
    <section class="hero" aria-label="hero">
      <img src="images/hero.jpg" class="hero-img">
    </section>

    <main class="container">

      <section class="skin-concern-heading">
        <h2 id="skin-concern-heading">Үйлчилгээний төрлөөр</h2>

        <ul class="strip">
          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Hydrating.svg" alt="Hydrating">
              </span>
              <span class="strip-label">Чийгшүүлэх</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Calming.svg" alt="Calming">
              </span>
              <span class="strip-label">Тайвшруулах</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Nutrition.svg" alt="Nutrition">
              </span>
              <span class="strip-label">Тэжээл өгөх</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Whitening.svg" alt="Whitening">
              </span>
              <span class="strip-label">Цайруулах</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Pores.svg" alt="Pores">
              </span>
              <span class="strip-label">Нүхжилтийн эсрэг</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/pH-balancing.svg" alt="pH-balancing">
              </span>
              <span class="strip-label">pH тэнцвэржүүлэх</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button">
              <span class="strip-circle">
                <img src="icons/Anti-aging.svg" alt="Anti-aging">
              </span>
              <span class="strip-label">Үрчлээний эсрэг</span>
            </button>
          </li>
        </ul>
      </section>

      <section class="high-rated">
        <div class="heading-high-rated">
          <h2 id="high-rated-product">Үнэлгээ өндөр бүтээгдэхүүн</h2>
          <a href="#high-rated" class="view-all">Бүгдийг үзэх</a>
        </div>

        <div class="products">
          ${highRated.map(product => template.cardTemplate(product)).join("")}
        </div>
      </section>

      <section class="discount-product">
        <div class="heading-sale-product">
          <h2 id="sale-product">Хямдралтай бүтээгдэхүүн</h2>
          <a href="#sales" lass="view-all">Бүгдийг үзэх</a>
        </div>

        <div class="products">
          ${sales.map(product => template.saleTemplate(product)).join("")}
        </div>
      </section>

    </main>
  `;
}