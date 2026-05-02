import { renderHomePage } from "./pages/homePage.js";
import { renderHighRatedPage } from "./pages/highRatedPage.js";
import { renderSalePage } from "./pages/salePage.js";
import { renderAboutPage } from "./pages/aboutPage.js";
import { renderLocationPage } from "./pages/locationPage.js";
import { renderPrivacyPage } from "./pages/privacyPage.js";
import { renderTermsPage } from "./pages/termsPage.js";
import { renderSkinCoachPage } from "./pages/skinCoachPage.js";
import { renderDeliveryPage } from "./pages/deliveryPage.js";
import { renderProductDetailPage } from "./pages/productDetailPage.js";
import { renderWishlistPage } from "./pages/wishlistPage.js";
import { renderCartPage } from "./pages/cartPage.js";

export function router(products) {
  const app = document.querySelector("#app");

  const hash = location.hash || "#home";

  // #product-detail?id=1 → product-detail + params
  const [page, query] = hash.replace("#", "").split("?");
  const params = new URLSearchParams(query || "");

  window.scrollTo(0, 0);

  switch (page) {
    case "":
    case "home":
      renderHomePage(products, app);
      break;

    case "high-rated":
      renderHighRatedPage(products, app);
      break;

    case "sales":
      renderSalePage(products, app);
      break;

    case "wishlist":
      renderWishlistPage(products, app);
      break;

    case "cart":
      renderCartPage(products, app);
      break;

    case "about":
      renderAboutPage(app);
      break;

    case "location":
      renderLocationPage(app);
      break;

    case "privacy":
      renderPrivacyPage(app);
      break;

    case "terms":
      renderTermsPage(app);
      break;

    case "skin-coach":
      renderSkinCoachPage(app);
      break;

    case "delivery":
      renderDeliveryPage(app);
      break;

    case "product-detail":
      renderProductDetailPage(products, app, params);
      break;

    default:
      app.innerHTML = `
        <section class="page">
          <h2>Page not found</h2>
          <a href="#home">Back to home</a>
        </section>
      `;
  }
}