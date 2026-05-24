export function renderProfilePage(app) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    window.location.href = "/login";
    return;
  }

  app.innerHTML = `
    <section class="profile-page">
      <div class="profile-box">
        <div class="profile-avatar">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <h2 class="profile-name">${user.name}</h2>
        <p class="profile-email">${user.email}</p>

        <div class="profile-form">
          <h3>Хувийн мэдээлэл засах</h3>

          <label>Нэр</label>
          <input type="text" id="profile-name" value="${user.name}" />

          <label>И-мэйл</label>
          <input type="email" id="profile-email" value="${user.email}" disabled />

          <label>Шинэ нууц үг</label>
          <input type="password" id="profile-password" placeholder="Өөрчлөхгүй бол хоосон үлдээнэ" />

          <label>Нууц үг давтах</label>
          <input type="password" id="profile-password-confirm" placeholder="Өөрчлөхгүй бол хоосон үлдээнэ" />

          <p class="profile-error hidden" id="profile-error"></p>
          <p class="profile-success hidden" id="profile-success">Амжилттай хадгалагдлаа!</p>

          <button class="profile-submit" id="profile-save">Хадгалах</button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("profile-save").addEventListener("click", async () => {
    const name     = document.getElementById("profile-name").value.trim();
    const password = document.getElementById("profile-password").value;
    const confirm  = document.getElementById("profile-password-confirm").value;
    const errorEl  = document.getElementById("profile-error");
    const successEl = document.getElementById("profile-success");

    errorEl.classList.add("hidden");
    successEl.classList.add("hidden");

    if (password && password !== confirm) {
      errorEl.textContent = "Нууц үг таарахгүй байна";
      errorEl.classList.remove("hidden");
      return;
    }

    if (password && password.length < 6) {
      errorEl.textContent = "Нууц үг хамгийн багадаа 6 тэмдэгт байна";
      errorEl.classList.remove("hidden");
      return;
    }

    // localStorage шинэчилнэ
    const updatedUser = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const btnText = document.querySelector(".login-btn__text");
    if (btnText) btnText.textContent = name;

    successEl.classList.remove("hidden");
    setTimeout(() => successEl.classList.add("hidden"), 2000);
  });
}