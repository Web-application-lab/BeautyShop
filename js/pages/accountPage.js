export function renderAccountPage(app, section = "profile") {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    window.location.href = "/login";
    return;
  }

  app.innerHTML = `
    <div class="account-layout">
      <!-- Зүүн sidebar -->
      <aside class="account-sidebar">
        <div class="account-sidebar__user">
          <div class="account-avatar">${user.name.charAt(0).toUpperCase()}</div>
          <div>
            <p class="account-sidebar__name">${user.name}</p>
            <p class="account-sidebar__email">${user.email}</p>
          </div>
        </div>

        <nav class="account-nav">
          <a href="/account/orders" class="account-nav__item ${section === "orders" ? "active" : ""}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Захиалгууд
          </a>
          <a href="/account/profile" class="account-nav__item ${section === "profile" ? "active" : ""}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Хувийн мэдээлэл
          </a>
        </nav>
      </aside>

      <!-- Баруун контент -->
      <main class="account-content">
        ${section === "orders" ? renderOrders() : renderProfile(user)}
      </main>
    </div>
  `;

  _bindAccountEvents(user, section);
}

function renderProfile(user) {
  return `
    <div class="account-section">
      <h2 class="account-section__title">Хувийн мэдээлэл</h2>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">Нэр</span>
          <span class="profile-field__value" id="display-name">${user.name}</span>
        </div>
        <button class="profile-field__btn" data-field="name">✎ Засах</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">Цахим шуудан</span>
          <span class="profile-field__value">${user.email}</span>
        </div>
        <button class="profile-field__btn" data-field="email">✎ Засах</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">Утасны дугаар</span>
          <span class="profile-field__value">${user.phone || "–"}</span>
        </div>
        <button class="profile-field__btn" data-field="phone">✎ Засах</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">Нууц үг</span>
          <span class="profile-field__value">••••••••</span>
        </div>
        <button class="profile-field__btn" data-field="password">↺ Солих</button>
      </div>
    </div>

    <!-- Edit modal -->
    <div class="profile-edit-modal hidden" id="profile-edit-modal">
      <div class="profile-edit-box">
        <h3 id="edit-modal-title">Засах</h3>
        <div id="edit-modal-body"></div>
        <p class="profile-error hidden" id="edit-error"></p>
        <div class="profile-edit-actions">
          <button class="profile-cancel-btn" id="edit-cancel">Болих</button>
          <button class="profile-save-btn" id="edit-save">Хадгалах</button>
        </div>
      </div>
    </div>
  `;
}

function renderOrders() {
  return `
    <div class="account-section">
      <h2 class="account-section__title">Захиалгууд</h2>
      <div class="orders-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Одоогоор захиалга байхгүй байна</p>
      </div>
    </div>
  `;
}

function _bindAccountEvents(user, section) {
  if (section !== "profile") return;

  const modal    = document.getElementById("profile-edit-modal");
  const title    = document.getElementById("edit-modal-title");
  const body     = document.getElementById("edit-modal-body");
  const errorEl  = document.getElementById("edit-error");
  const saveBtn  = document.getElementById("edit-save");
  const cancelBtn = document.getElementById("edit-cancel");

  let currentField = null;

  document.querySelectorAll(".profile-field__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentField = btn.dataset.field;
      errorEl.classList.add("hidden");

      if (currentField === "name") {
        title.textContent = "Нэр засах";
        body.innerHTML = `<input type="text" id="edit-input" value="${user.name}" placeholder="Нэр" />`;
      } else if (currentField === "email") {
        title.textContent = "Цахим шуудан засах";
        body.innerHTML = `<input type="email" id="edit-input" value="${user.email}" placeholder="И-мэйл" />`;
      } else if (currentField === "phone") {
        title.textContent = "Утасны дугаар засах";
        body.innerHTML = `<input type="tel" id="edit-input" value="${user.phone || ""}" placeholder="Утас" />`;
      } else if (currentField === "password") {
        title.textContent = "Нууц үг солих";
        body.innerHTML = `
          <input type="password" id="edit-input" placeholder="Шинэ нууц үг" />
          <input type="password" id="edit-input-confirm" placeholder="Нууц үг давтах" style="margin-top:10px" />
        `;
      }

      modal.classList.remove("hidden");
      document.getElementById("edit-input")?.focus();
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  saveBtn.addEventListener("click", () => {
    errorEl.classList.add("hidden");
    const input = document.getElementById("edit-input");
    const value = input?.value.trim();

    if (currentField === "password") {
      const confirm = document.getElementById("edit-input-confirm")?.value;
      if (!value || value.length < 6) {
        errorEl.textContent = "Нууц үг хамгийн багадаа 6 тэмдэгт байна";
        errorEl.classList.remove("hidden");
        return;
      }
      if (value !== confirm) {
        errorEl.textContent = "Нууц үг таарахгүй байна";
        errorEl.classList.remove("hidden");
        return;
      }
      modal.classList.add("hidden");
      return;
    }

    if (!value) {
      errorEl.textContent = "Утга хоосон байж болохгүй";
      errorEl.classList.remove("hidden");
      return;
    }

    user[currentField] = value;
    localStorage.setItem("user", JSON.stringify(user));

    if (currentField === "name") {
      document.getElementById("display-name").textContent = value;
      const btnText = document.querySelector(".login-btn__text");
      if (btnText) btnText.textContent = value;
    }

    modal.classList.add("hidden");
  });
}