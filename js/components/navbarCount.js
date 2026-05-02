export function updateNavbarCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartCount = document.getElementById("cart-count");
  const wishlistCount = document.getElementById("wishlist-count");

  const totalCartQuantity = cart.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  if (cartCount) cartCount.textContent = totalCartQuantity;
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}