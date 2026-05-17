export function renderAboutPage(container) {
  container.innerHTML = `
    <section class="about-page">
      <div class="about-page__shell">
        <header class="about-page__header">
          <span class="about-page__eyebrow">About BeautyShop</span>
          <h1>Бидний тухай</h1>
          <p class="about-page__intro">
            BeautyShop нь Солонгосын гоо сайхны бүтээгдэхүүнийг Монгол хэрэглэгчдэд илүү ойлгомжтой, найдвартай, гоёмсог туршлагаар хүргэх зорилготой онлайн дэлгүүр юм.
          </p>
        </header>

        <div class="about-page__hero-media">
          <img src="/images/about-beautyshop.png" alt="BeautyShop танилцуулга зураг">
        </div>

        <section class="about-page__section">
          <div class="about-page__section-number">01</div>
          <div class="about-page__section-body">
            <h2>BeautyShop гэж хэн бэ?</h2>
            <p>
              Солонгосын гоо сайхны салбар нь инноваци, үр дүн, арьсанд ээлтэй найрлагаараа дэлхийд танигдсан. BeautyShop нь энэ давуу талыг өдөр тутмын хэрэглээнд хамгийн ойлгомжтой, найдвартай байдлаар хүргэхийг зорьдог.
            </p>
            <p>
              Бид арьс арчилгаа, нүүр будалт, бие арчилгааны өндөр чанартай, баталгаатай бүтээгдэхүүнүүдийг албан ёсны эх үүсвэрээс шууд санал болгож, хэрэглэгчдэд сонголтоо илүү хялбар хийхэд тусалдаг.
            </p>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">02</div>
          <div class="about-page__section-body">
            <h2>Юуг эрхэмлэдэг вэ?</h2>
            <ul class="about-page__value-list">
              <li>Баталгаатай чанар</li>
              <li>Шударга, ойлгомжтой мэдээлэл</li>
              <li>Хэрэглэгч төвтэй үйлчилгээ</li>
              <li>Орчин үеийн гоо сайхны шийдэл</li>
            </ul>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">03</div>
          <div class="about-page__section-body">
            <h2>Биднийг сонгох шалтгаан</h2>
            <div class="about-page__reason-grid">
              <article class="about-page__reason-item">
                <h3>Өндөр чанар</h3>
                <p>Бид зөвхөн албан ёсны эх үүсвэрээс бүтээгдэхүүн нийлүүлдэг тул хэрэглэгч бүр баталгаатай сонголт хийдэг.</p>
              </article>
              <article class="about-page__reason-item">
                <h3>Өргөн сонголт</h3>
                <p>Арьс арчилгаа, нүүр будалт, бие арчилгааны хамгийн эрэлттэй болон шинэлэг бүтээгдэхүүнүүдийг нэг дороос санал болгоно.</p>
              </article>
              <article class="about-page__reason-item">
                <h3>Хэрэглэгчийн үйлчилгээ</h3>
                <p>Бид хэрэглэгчийн сэтгэл ханамжийг нэгдүгээрт тавьж, ойлгомжтой, найрсаг, мэргэжлийн үйлчилгээг хүргэхийг зорьдог.</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
}