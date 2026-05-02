import { renderProductDetailView } from "../components/productDetailView.js";
import { setupProductDetailLogic } from "../productDetailLogic.js";
import { updateNavbarCount } from "../components/navbarCount.js";

export function renderProductDetailPage(products, container, params) {
    const id = Number(params.get("id"));
    const product = products.find(p => p.id === id);

    if (!product) {
        container.innerHTML = "<p>Бүтээгдэхүүн олдсонгүй</p>";
        return;
    }

    renderProductDetailView(product, container);
    setupProductDetailLogic(product, products);
    updateNavbarCount();
}