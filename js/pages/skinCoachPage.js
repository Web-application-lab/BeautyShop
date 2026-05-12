import { template } from "../components/productCard.js";

const problemConcernMap = {
  acne: [2, 5, 6],
  dryness: [1, 2, 3],
  pigment: [4, 1]
};

const skinConcernMap = {
  oily: [5, 6, 2],
  dry: [1, 2, 3],
  combo: [1, 2, 6]
};

const problemKeywordMap = {
  acne: ["батга", "acne", "тослог", "нүхжилт", "тайвшруул", "цочир"],
  dryness: ["хуурай", "чийг", "moist", "hydrat", "таталд", "тэжээл"],
  pigment: ["толбо", "pigment", "цайруул", "гэрэлт", "өнгө", "жигд"]
};

const skinKeywordMap = {
  oily: ["тослог", "хөнгөн", "гел", "нүхжилт", "тэнцвэр"],
  dry: ["хуурай", "чийг", "cream", "тэжээл", "moist", "hydration"],
  combo: ["холимог", "бүх төрлийн", "тэнцвэр", "эмзэг", "чийг"]
};

function getProductSearchText(product) {
  const ingredients = Array.isArray(product.ingredients)
    ? product.ingredients.join(" ")
    : String(product.ingredients || "");

  return [
    product.name,
    product.brand,
    product.description,
    product.usage,
    ingredients
  ].join(" ").toLowerCase();
}

function scoreProduct(product, skinType, problemType) {
  if (product.categoryId !== 1) return -1;

  const text = getProductSearchText(product);
  const concernIds = Array.isArray(product.concernIds) ? product.concernIds : [];

  let score = Number(product.rating || 0);

  problemConcernMap[problemType]?.forEach(id => {
    if (concernIds.includes(id)) score += 4;
  });

  skinConcernMap[skinType]?.forEach(id => {
    if (concernIds.includes(id)) score += 2;
  });

  problemKeywordMap[problemType]?.forEach(keyword => {
    if (text.includes(keyword)) score += 2;
  });

  skinKeywordMap[skinType]?.forEach(keyword => {
    if (text.includes(keyword)) score += 1;
  });

  return score;
}

function getRecommendedProducts(products, skinType, problemType) {
  const ranked = products
    .filter(product => product.categoryId === 1)
    .map(product => ({
      ...product,
      coachScore: scoreProduct(product, skinType, problemType)
    }))
    .sort((a, b) => b.coachScore - a.coachScore || b.rating - a.rating || b.reviews - a.reviews);

  return ranked.slice(0, 3);
}

export function renderSkinCoachPage(products, container) {
  container.innerHTML = `
    <section class="skin-coach-page">
      <div class="skin-coach-page__shell">
        <header class="skin-coach-page__hero">
          <div class="skin-coach-page__hero-copy">
            <h1 class="skin-coach-page__title">Skin Coach</h1>
            <p>
              Арьсны төрөл болон таны гол асуудлыг сонгоход тань тохирсон үндсэн арчилгааны чиглэлийг санал болгож, өдөр тутмын routine-ээ илүү зөв эхлүүлэхэд тусална.
            </p>
          </div>
        </header>

        <div class="skin-coach-page__form-grid">
          <section class="skin-coach-page__panel">
            <h2>1. Таны арьс ямар вэ?</h2>
            <div class="skin-coach-page__options">
              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="oily">
                <span class="skin-coach-page__option-box">
                  <strong>Тослог</strong>
                  <small>Тос ялгаралт ихтэй, гялалзах хандлагатай</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="dry">
                <span class="skin-coach-page__option-box">
                  <strong>Хуурай</strong>
                  <small>Чийг дутагдах, таталдах мэдрэмжтэй</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="combo">
                <span class="skin-coach-page__option-box">
                  <strong>Холимог</strong>
                  <small>T-zone тослог, бусад хэсэг хуурай</small>
                </span>
              </label>
            </div>
          </section>

          <section class="skin-coach-page__panel">
            <h2>2. Таны гол асуудал?</h2>
            <div class="skin-coach-page__options">
              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="acne">
                <span class="skin-coach-page__option-box">
                  <strong>Батга</strong>
                  <small>Нүхжилт, үрэвсэл, илүүдэл тосны асуудал</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="dryness">
                <span class="skin-coach-page__option-box">
                  <strong>Хуурайшилт</strong>
                  <small>Чийг алдалт, ширүүн мэдрэмж, хальсрах</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="pigment">
                <span class="skin-coach-page__option-box">
                  <strong>Нөсөө толбо</strong>
                  <small>Өнгөний жигд бус байдал, бараан толбо</small>
                </span>
              </label>
            </div>
          </section>
        </div>

        <div class="skin-coach-page__actions">
          <button class="skin-coach-page__submit" id="skinCoachBtn" type="button">Зөвлөгөө авах</button>
        </div>

        <div class="skin-coach-page__result" id="skinCoachResult" hidden></div>
      </div>
    </section>
  `;

  const btn = container.querySelector("#skinCoachBtn");
  const result = container.querySelector("#skinCoachResult");
  const recommendations = {
    oily: {
      acne: "Танд зөөлөн гелэн цэвэрлэгч, тослог тэнцвэржүүлэх серум, non-comedogenic чийгшүүлэгч, SPF тогтмол хэрэглэхийг зөвлөж байна.",
      dryness: "Тослог ч гэсэн чийг дутагдаж болно. Иймд зөөлөн цэвэрлэгээ, усан суурьтай чийгшүүлэгч серум, хөнгөн гель тос, SPF хэрэглээрэй.",
      pigment: "Тослог арьсанд витамин C эсвэл ниацинамидтай серум, хөнгөн чийгшүүлэгч, өдөр бүр SPF хэрэглэх routine тохиромжтой."
    },
    dry: {
      acne: "Хуурай арьсанд батганы эсрэг хэт хүчтэй бүтээгдэхүүнээс зайлсхийж, зөөлөн цэвэрлэгч, barrier дэмжих чийгшүүлэгч, SPF сонгохыг зөвлөж байна.",
      dryness: "Танд сүүн эсвэл кремэн цэвэрлэгч, гиалуронтой серум, тэжээллэг тосон чийгшүүлэгч, SPF тохиромжтой.",
      pigment: "Хуурай арьсанд өнгө сэргээх серум, чийгшүүлэх тос, арьсны хамгаалалтын давхаргыг дэмжих routine илүү үр дүнтэй."
    },
    combo: {
      acne: "Холимог арьсанд T-zone хэсэгт тэнцвэржүүлэх арчилгаа, бусад хэсэгт чийгшүүлэх бүтээгдэхүүн хослуулж хэрэглэхийг зөвлөж байна.",
      dryness: "Холимог арьсанд хөнгөн хэрнээ чийг өгдөг серум, хэсэгчилсэн арчилгаа, SPF хэрэглэх нь тохиромжтой.",
      pigment: "Холимог арьсанд өнгө жигдрүүлэх серум, зөөлөн чийгшүүлэгч, тогтмол нарны хамгаалалт хамгийн чухал."
    }
  };

  btn.addEventListener("click", () => {
    const skin = container.querySelector('input[name="skin"]:checked');
    const problem = container.querySelector('input[name="problem"]:checked');
    result.hidden = false;
    result.classList.add("is-visible");

    if (!skin || !problem) {
      result.innerHTML = `
        <h3>Сонголтоо гүйцээнэ үү</h3>
        <p>Арьсны төрөл болон гол асуудлаа хоёуланг нь сонгосны дараа зөвлөгөө гарна.</p>
      `;
      return;
    }

    const message = recommendations[skin.value]?.[problem.value]
      || "Танд зөөлөн цэвэрлэгч, чийгшүүлэгч, нарны тос тогтмол хэрэглэхийг зөвлөж байна.";
    const matchedProducts = getRecommendedProducts(products, skin.value, problem.value);
    const recommendationCards = matchedProducts.map(product => template.cardTemplate(product)).join("");

    result.innerHTML = `
      <h3>Танд тохирох үндсэн зөвлөгөө</h3>
      <p>${message}</p>
      <div class="skin-coach-page__result-products">
        <h4>Тохирох бүтээгдэхүүний санал</h4>
        <div class="skin-coach-page__recommendations">
          ${recommendationCards}
        </div>
      </div>
    `;
  });
}