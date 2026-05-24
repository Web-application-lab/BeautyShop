import { AuthModal } from "../pages/authPage.js";

export function setupUserDropdown() {
  const btn = document.querySelector(".login-btn");
  if (!btn) return;

  // Dropdown HTML үүсгэнэ
  const dropdown = document.createElement("div");
  dropdown.className = "user-dropdown hidden";
  dropdown.innerHTML = `
    <a class="user-dropdown__item" data-route="orders">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      Захиалгууд
    </a>
    <a class="user-dropdown__item" data-route="profile">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Хувийн мэдээлэл
    </a>
    <div class="user-dropdown__divider"></div>
    <a class="user-dropdown__item user-dropdown__item--logout" id="logout-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Гарах
    </a>
  `;

  btn.parentElement.style.position = "relative";
  btn.parentElement.appendChild(dropdown);

  // Товч дарахад dropdown нээх/хаах
  btn.addEventListener("click", (e) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      AuthModal.open("login");
      return;
    }
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  // Гарах
  dropdown.querySelector("#logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    dropdown.classList.add("hidden");
    const btnText = document.querySelector(".login-btn__text");
    if (btnText) btnText.textContent = "Нэвтрэх";
    window.location.reload();
  });

dropdown.querySelector("[data-route='profile']").addEventListener("click", () => {
  dropdown.classList.add("hidden");
  history.pushState(null, "", "/account/profile");
  window.location.reload();
});

dropdown.querySelector("[data-route='orders']").addEventListener("click", () => {
  dropdown.classList.add("hidden");
  history.pushState(null, "", "/account/orders");
  window.location.reload();
});

  // Гадна дарахад хаах
  document.addEventListener("click", (e) => {
    if (!btn.parentElement.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
}

export function updateUserBtn() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const btnText = document.querySelector(".login-btn__text");
  if (!btnText) return;
  btnText.textContent = user ? user.name : "Нэвтрэх";
}