import { starRating } from "./starRating.js";
import { priceTemplate } from "./priceTemplate.js";
import "./quantitySelector.js";
import "./cartButton.js";
import "./wishlistButton.js";
export function renderProductDetailView(product, container) {
    container.innerHTML = `
        <section class="product-detail" id="product-detail">

            <div class="detail-left">
                <img src="images/${product.img}" alt="${product.name}">
            </div>

            <div class="detail-right">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-title">${product.name}</h3>

                <div class="product-rating">
                    ${starRating(Math.round(product.rating))}
                    <span class="rating">${product.rating}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>

                ${priceTemplate(product)}

                <div class="product-actions">
                    <button class="add-cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button class="order">Захиалах</button>
                    <button class="wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="product-description">
                    <div class="tabs">
                        <button class="tab-btn active" onclick="openTab('usage', this)">Хэрэглэх заавар</button>
                        <button class="tab-btn" onclick="openTab('description', this)">Тайлбар</button>
                        <button class="tab-btn" onclick="openTab('ingredients', this)">Найрлага</button>
                    </div>
                    <div id="usage" class="tab-content"><p>${product.usage}</p></div>
                    <div id="description" class="tab-content" style="display:none"><p>${product.description}</p></div>
                    <div id="ingredients" class="tab-content" style="display:none">
                        <p>${Array.isArray(product.ingredients) ? product.ingredients.join(", ") : product.ingredients}</p>
                    </div>
                </div>
            </div>

        </section>

        <section class="product-reviews">
            <h3 class="heading">Сэтгэгдэл</h3>
            <div class="cards-container">
                <article class="reviews-card">
                    <h4 class="your-rating">Таны үнэлгээ</h4>
                    <p class="give-rating">Үнэлгээ:</p>
                    <div class="rating-stars">
                        <span id="user-rating-stars"></span>
                        <span id="user-rating-value" class="rating-point">0/5</span>
                    </div>
                    <p class="comment">Сэтгэгдэл:</p>
                    <textarea class="write-comment" rows="10" minlength="5" maxlength="200"
                        placeholder="Таны сэтгэгдэл..."></textarea>
                    <button class="login-required">Нэвтрэх шаардлагатай</button>
                </article>

                <div class="comments-card">
                    <article class="comments-header">
                        <div class="comments-left-header">
                            <div class="comments-left">
                                <span class="avatar-circle">
                                    <img class="profile-avatar" src="images/avatar.jpg" alt="User">
                                </span>
                            </div>
                            <div class="comments-right">
                                <h4 class="user-name">User Name</h4>
                                <div class="review-stars"></div>
                            </div>
                        </div>
                        <p class="comment-date">2023-10-01</p>
                    </article>
                    <p class="comment-text">Энэ бүтээгдэхүүн маш сайхан байна!</p>
                </div>
            </div>
        </section>
    `;

    window.openTab = openTab;
}

function openTab(tabName, element) {
    document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
    document.getElementById(tabName).style.display = "block";
    element.classList.add("active");
}