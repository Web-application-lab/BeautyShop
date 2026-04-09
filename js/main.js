fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const products = data.products;
        const container = document.getElementById("products");
        container.innerHTML = products.map(product => `
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <div class="product-card">
                    <div class="product-image">
                        <img src="images/${product.img}" alt="${product.name}">
                    </div>

                    <div class="product-body">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-brand">${product.brand}</p>
                    </div>

                    <div class="product-rating">
                        <span class="review-star"><i class="fa-solid fa-star"></i></span>
                        <span class="rating">${product.rating}</span>
                        <span class="reviews">(${product.reviews})</span>
                    </div>

                    <p class="product-price">${product.price.toLocaleString()}₮</p>

                    <div class="product-actions">
                        <button class="add-cart"><i class="fa-regular fa-cart-shopping"></i></button>
                        <button class="wishlist"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </a>
        `).join("");
    });