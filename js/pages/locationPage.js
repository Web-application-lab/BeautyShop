export function renderLocationPage(container) {
  container.innerHTML = `
    <section class="about-page">
      <div class="about-page__shell">
        <header class="about-page__header">
          <span class="about-page__eyebrow">BeautyShop</span>
          <h1>Байршил</h1>
          <p class="about-page__intro">
            Манай дэлгүүрийн хаяг, ажлын цаг болон холбоо барих мэдээлэл.
          </p>
        </header>

        <section class="about-page__section">
          <div class="about-page__section-number">01</div>
          <div class="about-page__section-body">
            <h2>Хаяг</h2>
            <p>Улаанбаатар хот, Сүхбаатар дүүрэг</p>
            <p>И-мэйл: <a href="mailto:info@beautyshop.mn">info@beautyshop.mn</a></p>
            <p>Утас: <a href="tel:77777777">7777-7777</a></p>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">02</div>
          <div class="about-page__section-body">
            <h2>Ажлын цаг</h2>
            <p>Даваа – Баасан: 10:00 – 19:00</p>
            <p>Бямба – Ням: 11:00 – 18:00</p>
          </div>
        </section>
      </div>
    </section>
  `;
}
