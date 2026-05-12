export function renderTermsPage(container) {
  container.innerHTML = `
    <section class="terms-page">
      <div class="terms-page__shell">
        <header class="terms-page__header">
          <span class="terms-page__eyebrow">Return Policy</span>
          <h1>Бүтээгдэхүүний буцаалтын нөхцөл</h1>
          <p class="terms-page__intro">
            Манай дэлгүүрээс худалдан авсан бүтээгдэхүүн нь тодорхой нөхцөлийн дагуу буцаагдах боломжтой. Буцаалтын хүсэлтийг аль болох хурдан, ойлгомжтой, хэрэглэгчид ээлтэй байдлаар шийдвэрлэхийг зорьдог.
          </p>
        </header>

        <div class="terms-page__sections">
          <article class="terms-page__section">
            <div class="terms-page__section-number">01</div>
            <div class="terms-page__section-body">
              <h2>Буцаалтын хугацаа</h2>
              <p>Худалдан авсан бүтээгдэхүүнийг авснаас хойш 7 хоногийн дотор буцаах хүсэлт гаргах боломжтой.</p>
            </div>
          </article>

          <article class="terms-page__section">
            <div class="terms-page__section-number">02</div>
            <div class="terms-page__section-body">
              <h2>Бүтээгдэхүүний төлөв</h2>
              <p>Бараа нь задлаагүй, хэрэглээгүй, сав баглаа болон хайрцаг нь бүрэн бүтэн байх шаардлагатай.</p>
            </div>
          </article>

          <article class="terms-page__section">
            <div class="terms-page__section-number">03</div>
            <div class="terms-page__section-body">
              <h2>Худалдан авалтын баримт</h2>
              <p>Буцаалт хийхдээ захиалгын мэдээлэл эсвэл худалдан авалтын баримт заавал шаардлагатай.</p>
            </div>
          </article>
        </div>

        <section class="terms-page__highlight">
          <h3>Анхаарах зүйл</h3>
          <ul class="terms-page__list">
            <li>Хэрэглэсэн болон эвдэрсэн бүтээгдэхүүн буцаагдахгүй.</li>
            <li>Буцаалтын шийдвэрийг бүтээгдэхүүний төлөв шалгасны дараа баталгаажуулна.</li>
            <li>Нэмэлт асуулт байвал хэрэглэгчийн үйлчилгээтэй холбогдоно уу.</li>
          </ul>
        </section>
      </div>
    </section>
  `;
}