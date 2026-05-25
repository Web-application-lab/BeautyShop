export class AuthModal {
  static init() {}

  static open(tab = "login") {
    const url = tab === "register" ? "/signup" : "/login";
    history.pushState(null, "", url);
    AuthModal.render(tab);
  }

  static close() {
    history.pushState(null, "", "/");
    window.location.reload();
  }

  static showToast(message) {
    const toast = document.createElement("div");
    toast.className = "auth-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("auth-toast--show"), 100);
    setTimeout(() => {
      toast.classList.remove("auth-toast--show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  static render(tab = "login") {
    const app = document.querySelector("#app");

    app.innerHTML = `
      <div class="auth-page">
        <div class="auth-box">
          <h1 class="auth-logo">BeautyShop</h1>

          <div class="auth-tabs">
            <button class="auth-tab ${tab === "login" ? "active" : ""}" data-tab="login">Нэвтрэх</button>
            <button class="auth-tab ${tab === "register" ? "active" : ""}" data-tab="register">Бүртгүүлэх</button>
          </div>

          <div class="auth-form ${tab === "login" ? "" : "hidden"}" id="tab-login">
            <label>И-мэйл</label>
            <input type="email" id="login-email" placeholder="your@email.com" />
            <label>Нууц үг</label>
            <input type="password" id="login-password" />
            <p class="auth-error" id="login-error"></p>
            <button class="auth-submit" id="login-submit">Нэвтрэх</button>
          </div>

          <div class="auth-form ${tab === "register" ? "" : "hidden"}" id="tab-register">
            <label>Нэр</label>
            <input type="text" id="reg-name" />
            <label>И-мэйл</label>
            <input type="email" id="reg-email" />
            <label>Утас</label>
            <input type="tel" id="reg-phone" />
            <label>Нууц үг</label>
            <input type="password" id="reg-password" />
            <label>Нууц үг давтах</label>
            <input type="password" id="reg-password-confirm" />
            <p class="auth-error" id="reg-error"></p>
            <button class="auth-submit" id="reg-submit">Бүртгүүлэх</button>
          </div>

          <div class="auth-success hidden" id="auth-success">
            <p id="auth-success-msg"></p>
          </div>
        </div>
      </div>
    `;

    AuthModal._bindPageEvents();
  }

  static _bindPageEvents() {
    document.querySelectorAll(".auth-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        AuthModal.open(tab.dataset.tab);
      });
    });

    // Нэвтрэх
    document.getElementById("login-submit")?.addEventListener("click", async () => {
      const email    = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const errorEl  = document.getElementById("login-error");
      errorEl.textContent = "";

      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.error;
        return;
      }

      AuthModal._saveUser(data.user);
      AuthModal.showToast(`Тавтай морил, ${data.user.name}!`);
      setTimeout(() => {
        history.pushState(null, "", "/");
        window.location.reload();
      }, 2000);
    });

    document.getElementById("reg-submit")?.addEventListener("click", async () => {
      const name     = document.getElementById("reg-name").value.trim();
      const email    = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value;
      const confirm  = document.getElementById("reg-password-confirm").value;
      const errorEl  = document.getElementById("reg-error");
      errorEl.textContent = "";

      if (password !== confirm) {
        errorEl.textContent = "Нууц үг таарахгүй байна";
        return;
      }

      const res  = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.error;
        return;
      }

      AuthModal._saveUser(data.user);
      AuthModal.showToast("Амжилттай бүртгэгдлээ!");
      setTimeout(() => {
        AuthModal.open("login");
      }, 2000);
    });
  }

  static _saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    const btn = document.querySelector(".login-btn__text");
    if (btn) btn.textContent = user.name;
  }

  static _loadUser() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const btn = document.querySelector(".login-btn__text");
    if (!btn) return;
    if (user) btn.textContent = user.name;
  }
}