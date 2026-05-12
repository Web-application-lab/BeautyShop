export function renderPrivacyPage(container) {
  container.innerHTML = `
    <section class="privacy-page">
      <div class="privacy-page__shell">
        <header class="privacy-page__header">
          <span class="privacy-page__eyebrow">Privacy Policy</span>
          <h1>Аюулгүй байдал ба нууцлал</h1>
          <p class="privacy-page__intro">
            BeautyShop нь хэрэглэгчийн мэдээллийн нууцлал, аюулгүй байдлыг эрхэмлэдэг. Энэхүү бодлого нь манай сайт таны мэдээллийг ямар зорилгоор цуглуулж, хэрхэн ашиглаж, хэрхэн хамгаалдгийг товч тайлбарлана.
          </p>
          <div class="privacy-page__meta">
            <span>BeautyShop</span>
            <span>Нууцлалын бодлого</span>
          </div>
        </header>

        <div class="privacy-page__sections">
          <article class="privacy-page__section">
            <div class="privacy-page__section-number">01</div>
            <div class="privacy-page__section-body">
              <h2>Мэдээлэл цуглуулах</h2>
              <p>
                Бид таны нэр, утасны дугаар, и-мэйл, хүргэлтийн хаяг зэрэг үйлчилгээнд шаардлагатай мэдээллийг зөвхөн захиалга боловсруулах, хүргэлт зохион байгуулах, хэрэглэгчийн үйлчилгээ үзүүлэх зорилгоор авна.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">02</div>
            <div class="privacy-page__section-body">
              <h2>Мэдээлэл ашиглах</h2>
              <p>
                Цуглуулсан мэдээллийг захиалгын баталгаажуулалт, төлөв мэдээлэх, хүргэлтийн үйл явцыг зохицуулах, хэрэглэгчийн хүсэлт болон асуултад хариу өгөхөд ашиглана.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">03</div>
            <div class="privacy-page__section-body">
              <h2>Мэдээлэл хамгаалах</h2>
              <p>
                Таны мэдээллийг хязгаарлагдмал хандалттай орчинд хадгалж, зөвхөн шаардлагатай ажилтнууд үйлчилгээний хүрээнд ашиглах боломжтой байна. Бид мэдээллийн аюулгүй байдлыг алдагдуулахгүй байх үндсэн зарчмуудыг мөрдөнө.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">04</div>
            <div class="privacy-page__section-body">
              <h2>Гуравдагч этгээдэд мэдээлэл дамжуулах</h2>
              <p>
                Хэрэглэгчийн мэдээллийг хуульд заасан үндэслэлээс бусад тохиолдолд зөвшөөрөлгүйгээр бусдад дамжуулахгүй. Хүргэлт, төлбөр зэрэг үйлчилгээтэй холбоотой зайлшгүй мэдээлэл зөвхөн тухайн үйл явцад ашиглагдана.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">05</div>
            <div class="privacy-page__section-body">
              <h2>Хэрэглэгчийн эрх</h2>
              <p>
                Та өөрийн мэдээллийн талаар асуух, шинэчлэх, засварлуулах хүсэлт гаргах боломжтой. Манай хэрэглэгчийн үйлчилгээний сувгаар холбогдон нэмэлт мэдээлэл авч болно.
              </p>
            </div>
          </article>
        </div>

        <section class="privacy-page__footer-note">
          <h3>Анхаарах зүйл</h3>
          <p>
            Энэхүү бодлого нь үйлчилгээ сайжрахын хэрээр шинэчлэгдэх боломжтой бөгөөд хамгийн сүүлийн хувилбар нь үргэлж энэ хуудсанд байрлана.
          </p>
        </section>
      </div>
    </section>
  `;
}