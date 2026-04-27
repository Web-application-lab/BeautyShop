import { setupWishlist, setupAddToCart } from "./components/cartActions.js";
import { starRating } from "./components/starRating.js";

function renderStaticStars() {
  const userRatingStars = document.querySelector("#user-rating-stars");
  const reviewStars = document.querySelector("#review-stars");

  if (userRatingStars) {
    userRatingStars.innerHTML = starRating(5);
  }

  if (reviewStars) {
    reviewStars.innerHTML = starRating(5);
  }
}

function setupUserRating() {
  const userRatingStars = document.querySelector("#user-rating-stars");
  const userRatingValue = document.querySelector("#user-rating-value");

  if (!userRatingStars || !userRatingValue) return;

  userRatingStars.innerHTML = starRating(0);

  let userRating = 0;
  const stars = userRatingStars.querySelectorAll("i");

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      userRating = userRating === index + 1 ? 0 : index + 1;

      stars.forEach((s, i) => {
        s.classList.toggle("fa-solid", i < userRating);
        s.classList.toggle("fa-regular", i >= userRating);
      });

      userRatingValue.textContent = `${userRating}/5`;
    });
  });
}

function renderProductDetail(product) {
  const container = document.getElementById("product-detail");

  const discount = product.discount || 0;
  const newPrice = product.price - (product.price * discount / 100);
  container.innerHTML = `
    <div class="detail-left">
      <img src="images/${product.img}" alt="${product.name}">
    </div>

    <div class="detail-right">
      <div class="product-body">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-title">${product.name}</h3>
      </div>

      <div class="product-rating">
        ${starRating(Math.round(product.rating))}
        <span class="rating">${product.rating}</span>
        <span class="reviews">(${product.reviews})</span>
        <p class="product-price">${
                discount > 0
                ? `<span class="new-price">${newPrice.toLocaleString()}₮</span>
                    <span class="old-price">${product.price.toLocaleString()}₮</span>`
                : `<span>${product.price.toLocaleString()}₮</span>`
            }
        </p>
      </div>

      <div class="product-count">
        <button class="minus"><i class="fa-solid fa-minus"></i></button>
        <span class="count">1</span>
        <button class="plus"><i class="fa-solid fa-plus"></i></button>
      </div> 

      <div class="product-actions">
        <button class="add-cart">Сагслах</button>
        <button class="order">Захиалах</button>
        <button class="wishlist"><i class="fa-regular fa-heart"></i></button>
      </div>

      <div class="product-description">
        <div class="tabs">
          <button class="tab-btn active" onclick="openTab('usage', this)">Хэрэглэх заавар</button>
          <button class="tab-btn" onclick="openTab('description', this)">Тайлбар</button>
          <button class="tab-btn" onclick="openTab('ingredients', this)">Найрлага</button>
        </div>

        <div id="usage" class="tab-content">
          <p>${product.usage}</p>
        </div>

        <div id="description" class="tab-content" style="display: none;">
          <p>${product.description}</p>
        </div>

        <div id="ingredients" class="tab-content" style="display: none;">
          <p>${Array.isArray(product.ingredients) ? product.ingredients.join(", ") : product.ingredients}</p>
        </div>
      </div>
    </div>
  `;

  let count = 1;
  const plusBtn = container.querySelector(".plus");
  const minusBtn = container.querySelector(".minus");
  const countSpan = container.querySelector(".count");

  plusBtn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
  });

  minusBtn.addEventListener("click", () => {
    count--;
    if (count < 1) {
      count = 1;
    }
    countSpan.textContent = count;
  });

     

  const userRatingStars = document.querySelector("#user-rating-stars");
  const userRatingValue = document.querySelector("#user-rating-value");
  let userRating = 0;

  const stars = userRatingStars.querySelectorAll("i");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      userRating = index + 1;
      stars.forEach((s, i) => {
        s.classList.toggle("fa-solid", i < userRating);
        s.classList.toggle("fa-regular", i >= userRating);
      });

      userRatingValue.textContent = `${userRating}/5`;
    });
  });
}

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    renderStaticStars();

    const products = data.products;
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(item => Number(item.id) === productId);
    const container = document.getElementById("product-detail");

    if (!product) {
      container.innerHTML = `<p>Product not found.</p>`;
      return;
    }

    renderProductDetail(product);
  })
  .catch(error => {
    console.error("Error loading product detail:", error);
  });