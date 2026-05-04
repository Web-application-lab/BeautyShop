export function renderWishlistPage(products) {
    const app = document.querySelector("#app");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistProducts = products.filter(p => 
        wishlist.some(id => Number(id) === Number(p.id))
    );

    app.innerHTML = `
        <section class="products-section">
            <h2>Миний wishlist</h2>
            <div class="products">
                ${
                    wishlistProducts.length > 0
                        ? wishlistProducts.map(p => template.cardTemplate(p)).join("")
                        : "<p>Wishlist хоосон байна.</p>"
                }
            </div>
        </section>
    `;
}