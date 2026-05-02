export function renderTermsPage(container) {
  container.innerHTML = `
    <section class="terms-page page">
      <h2>Бүтээгдэхүүний буцаалтын нөхцөл</h2>

      <div class="section">
        <div class="card">
          Манай дэлгүүрээс худалдан авсан бүтээгдэхүүн нь тодорхой нөхцөлийн дагуу буцаагдах боломжтой.
        </div>
      </div>

      <div class="section">
        <h3>Буцаалтын нөхцөл</h3>

        <div class="features">
          <div class="feature">
            <h4>7 хоногийн дотор</h4>
            <p>Худалдан авснаас хойш 7 хоногийн дотор буцаана.</p>
          </div>

          <div class="feature">
            <h4>Хэрэглээгүй байх</h4>
            <p>Бүтээгдэхүүн задлаагүй, хэрэглээгүй, сав баглаа болон хайрцаг бүрэн бүтэн байх шаардлагатай.</p>
          </div>

          <div class="feature">
            <h4>Баримт</h4>
            <p>Худалдан авалтын баримт заавал шаардлагатай.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}