import { starRating } from "./components/starRating.js";
import { setupCardActions } from "./components/cardAction.js";

export function setupProductDetailLogic(product, products) {
    renderStaticStars();
    setupUserRating();
    setupCardActions(products);
}

function renderStaticStars() {
    const userRatingStars = document.querySelector("#user-rating-stars");
    const reviewStars = document.querySelector(".review-stars");

    if (userRatingStars) userRatingStars.innerHTML = starRating(5);
    if (reviewStars) reviewStars.innerHTML = starRating(5);
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