import { starRating } from "./starRating.js";
import { priceTemplate } from "./priceTemplate.js";

const imgFallback = `onerror="this.onerror=null;this.src='/images/placeholder.svg'"`;

function productImgSrc(product) {
  if (product.imageUrl) return product.imageUrl;
  return `/images/${product.img}`;
}

function stockBadge(product) {
  const stock = product.stock ?? null;
  if (stock === null) return "";
  if (stock === 0) {
    return `<span class="product-stock product-stock--out">Дууссан</span>`;
  }
  if (stock <= 3) {
    return `<span class="product-stock product-stock--low">Үлдэгдэл: ${stock} ш</span>`;
  }
  return "";
}

export const template = {
  cardTemplate(product) {
    const outOfStock = (product.stock ?? 1) === 0;
    return `
      <div class="product-card ${outOfStock ? "product-card--out" : ""}">
        ${stockBadge(product)}
        <a href="#product-detail?id=${product.id}" class="product-link">
          <div class="product-image">
            <img src="${productImgSrc(product)}" alt="${product.name}" ${imgFallback}>
          </div>
          <div class="product-body">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
          </div>
          <div class="product-rating">
            ${starRating(Math.round(product.rating))}
            <span class="rating">${product.rating}</span>
            <span class="reviews">(${product.reviews})</span>
          </div>
          ${priceTemplate(product)}
        </a>
        <div class="product-actions">
          <wishlist-button product-id="${product.id}"></wishlist-button>
          <cart-button product-id="${product.id}" ${outOfStock ? 'disabled' : ''}></cart-button>
        </div>
      </div>
    `;
  },

  saleTemplate(product) {
    const outOfStock = (product.stock ?? 1) === 0;
    return `
      <div class="product-card ${outOfStock ? "product-card--out" : ""}">
        <span class="sale-rate">-${product.discount}%</span>
        ${stockBadge(product)}
        <a href="#product-detail?id=${product.id}" class="product-link">
          <div class="product-image">
            <img src="${productImgSrc(product)}" alt="${product.name}" ${imgFallback}>
          </div>
          <div class="product-body">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
          </div>
          <div class="product-rating">
            ${starRating(Math.round(product.rating))}
            <span class="rating">${product.rating}</span>
            <span class="reviews">(${product.reviews})</span>
          </div>
          ${priceTemplate(product)}
        </a>
        <div class="product-actions">
          <wishlist-button product-id="${product.id}"></wishlist-button>
          <cart-button product-id="${product.id}" ${outOfStock ? 'disabled' : ''}></cart-button>
        </div>
      </div>
    `;
  }
};