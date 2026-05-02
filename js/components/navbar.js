export function setupNavbar() {
  const cartBtn = document.getElementById("cartToggle");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartPanel = document.getElementById("cartPanel");
  const cartClose = document.getElementById("cartClose");
  const cartContinue = document.getElementById("cartContinue");

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add("active");
    if (cartPanel) cartPanel.classList.add("active");
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove("active");
    if (cartPanel) cartPanel.classList.remove("active");
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  if (cartContinue) cartContinue.addEventListener("click", closeCart);
}