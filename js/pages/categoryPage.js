export function renderCategoryPage(products, container, params) {
    const categoryId = Number(params.get("id"));
    const subId = Number(params.get("sub"));
    const filtered = products.filter(p => {
        if (subId) return p.subCategoryId === subId;
        return p.categoryId === categoryId;
    });

    container.innerHTML = `
        <section class="high-rated">
            <div class="products">
                ${
                    filtered.length > 0
                        ? filtered.map(p => template.cardTemplate(p)).join("")
                        : "<p>Бүтээгдэхүүн олдсонгүй</p>"
                }
            </div>
        </section>
    `;
}