export function starRating(rating = 5) {
  return [1, 2, 3, 4, 5].map(num => `
    <span class="review-stars">
      <i class="${num <= rating?"fa-solid" : "fa-regular"} fa-star"></i>
    </span>
  `).join("");
}