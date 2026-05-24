export async function renderAdminPage(app) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user?.isAdmin) {
    window.location.href = "/";
    return;
  }

  app.innerHTML = `
    <div class="admin-page">
      <div class="admin-header">
        <div>
          <h1 class="admin-header__title">Админ панел</h1>
          <p class="admin-header__sub">Бүтээгдэхүүн болон захиалга удирдах</p>
        </div>
        <button class="admin-back-btn" onclick="history.back()">← Буцах</button>
      </div>

      <div class="admin-stats">
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">Нийт бүтээгдэхүүн</p>
            <p class="admin-stat-card__value" id="stat-products">–</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
        </div>
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">Захиалга</p>
            <p class="admin-stat-card__value" id="stat-orders">–</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
        </div>
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">Идэвхтэй хэрэглэгч</p>
            <p class="admin-stat-card__value" id="stat-users">–</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--pink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
      </div>

      <div class="admin-tabs">
        <button class="admin-tab active" data-tab="products">Бүтээгдэхүүн</button>
        <button class="admin-tab" data-tab="orders">Захиалга</button>
        <button class="admin-tab" data-tab="add">Бүтээгдэхүүн нэмэх</button>
      </div>

      <div class="admin-content" id="admin-content">
        <div class="admin-loading">Ачаалж байна...</div>
      </div>
    </div>
  `;

  await _loadStats();
  await _renderTab("products");
  _bindTabEvents();
}

async function _loadStats() {
  try {
    const [productsRes, usersRes, ordersRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/users"),
      fetch("/api/admin/orders")
    ]);
    const products = await productsRes.json();
    const users    = await usersRes.json();
    const orders   = await ordersRes.json();

    document.getElementById("stat-products").textContent = products.length || 0;
    document.getElementById("stat-users").textContent    = users.length    || 0;
    document.getElementById("stat-orders").textContent   = orders.length   || 0;
  } catch {}
}

function _bindTabEvents() {
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      _renderTab(tab.dataset.tab);
    });
  });
}

async function _renderTab(tab) {
  const content = document.getElementById("admin-content");

  if (tab === "products") {
    const res      = await fetch("/api/admin/products");
    const products = await res.json();

    content.innerHTML = `
      <div class="admin-table-wrap">
        <h3 class="admin-table-title">Бүтээгдэхүүний жагсаалт</h3>
        ${!products.length ? `<p class="admin-empty">Бүтээгдэхүүн байхгүй байна</p>` : products.map(p => `
          <div class="admin-product-row" data-id="${p._id}">
            <img class="admin-product-row__img" src="/images/${p.img}" onerror="this.src='/images/placeholder.svg'" />
            <div class="admin-product-row__info">
              <p class="admin-product-row__name">${p.name}</p>
              <p class="admin-product-row__meta">
                ${Number(p.price).toLocaleString("mn-MN")}₮ &nbsp;·&nbsp; Нөөц: ${p.stock || 0} &nbsp;
                <span class="admin-product-row__tag">${p.categorySlug || ""}</span>
              </p>
            </div>
            <div class="admin-product-row__actions">
              <button class="admin-edit-btn" data-id="${p._id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="admin-delete-btn" data-id="${p._id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    content.querySelectorAll(".admin-delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Устгах уу?")) return;
        await fetch(`/api/admin/products/${btn.dataset.id}`, { method: "DELETE" });
        _renderTab("products");
        _loadStats();
      });
    });

    content.querySelectorAll(".admin-edit-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const res = await fetch(`/api/admin/products/${btn.dataset.id}`);
        const p   = await res.json();
        _showEditModal(p);
      });
    });

  } else if (tab === "orders") {
    const res    = await fetch("/api/admin/orders");
    const orders = await res.json();

    content.innerHTML = `
      <div class="admin-table-wrap">
        <h3 class="admin-table-title">Захиалгын жагсаалт</h3>
        ${!orders.length ? `<p class="admin-empty">Захиалга байхгүй байна</p>` : orders.map(o => `
          <div class="admin-order-row">
            <div class="admin-order-row__info">
              <p class="admin-order-row__name">${o.userName}</p>
              <p class="admin-order-row__meta">${o.userEmail} · ${o.userPhone || "–"}</p>
              <p class="admin-order-row__meta">${new Date(o.createdAt).toLocaleDateString("mn-MN")} · ${o.items.length} бараа</p>
              <div class="admin-order-row__items">
                ${o.items.map(item => `
                  <span class="admin-order-row__item">${item.name} × ${item.qty}</span>
                `).join("")}
              </div>
            </div>
            <div class="admin-order-row__right">
              <p class="admin-order-row__total">${Math.round(o.totalPrice).toLocaleString("mn-MN")}₮</p>
              <select class="admin-order-status-select" data-id="${o._id}">
                <option value="pending"   ${o.status === "pending"   ? "selected" : ""}>Хүлээгдэж байна</option>
                <option value="confirmed" ${o.status === "confirmed" ? "selected" : ""}>Баталгаажсан</option>
                <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Хүргэгдсэн</option>
                <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>Цуцлагдсан</option>
              </select>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    content.querySelectorAll(".admin-order-status-select").forEach(select => {
      select.addEventListener("change", async () => {
        await fetch(`/api/admin/orders/${select.dataset.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: select.value })
        });
        _loadStats();
      });
    });

  } else if (tab === "add") {
    content.innerHTML = `
      <div class="admin-form-wrap">
        <h3 class="admin-table-title">Шинэ бүтээгдэхүүн нэмэх</h3>
        ${_productFormHtml()}
        <button class="admin-submit-btn" id="admin-add-btn">Бүтээгдэхүүн нэмэх</button>
        <p class="admin-form-error hidden" id="admin-form-error"></p>
      </div>
    `;

    document.getElementById("admin-add-btn").addEventListener("click", async () => {
      const body = _getFormValues();
      if (!body.name || !body.price) {
        document.getElementById("admin-form-error").textContent = "Нэр болон үнэ заавал шаардлагатай";
        document.getElementById("admin-form-error").classList.remove("hidden");
        return;
      }

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert("Амжилттай нэмэгдлээ!");
        _renderTab("add");
        _loadStats();
      }
    });
  }
}

function _productFormHtml(p = {}) {
  return `
    <div class="admin-form">
      <div class="admin-form__field">
        <label>Бүтээгдэхүүний нэр</label>
        <input type="text" id="f-name" value="${p.name || ""}" />
      </div>
      <div class="admin-form__field">
        <label>Тайлбар</label>
        <textarea id="f-desc" rows="4">${p.description || ""}</textarea>
      </div>
      <div class="admin-form__row">
        <div class="admin-form__field">
          <label>Үнэ (₮)</label>
          <input type="number" id="f-price" value="${p.price || ""}" />
        </div>
        <div class="admin-form__field">
          <label>Нөөц</label>
          <input type="number" id="f-stock" value="${p.stock || ""}" />
        </div>
      </div>
      <div class="admin-form__field">
        <label>Ангилал</label>
        <select id="f-category">
          <option value="">Ангилал сонгох</option>
          <option value="skincare"  ${p.categorySlug === "skincare"  ? "selected" : ""}>Арьс арчилгаа</option>
          <option value="makeup"    ${p.categorySlug === "makeup"    ? "selected" : ""}>Нүүр будалт</option>
          <option value="sun-care"  ${p.categorySlug === "sun-care"  ? "selected" : ""}>Нарны хамгаалалт</option>
          <option value="body-care" ${p.categorySlug === "body-care" ? "selected" : ""}>Бие арчилгаа</option>
          <option value="hair-care" ${p.categorySlug === "hair-care" ? "selected" : ""}>Үс арчилгаа</option>
        </select>
      </div>
      <div class="admin-form__field">
        <label>Зургийн URL</label>
        <input type="text" id="f-img" value="${p.img || ""}" placeholder="https://..." />
      </div>
    </div>
  `;
}

function _getFormValues() {
  return {
    name:         document.getElementById("f-name")?.value.trim(),
    description:  document.getElementById("f-desc")?.value.trim(),
    price:        Number(document.getElementById("f-price")?.value),
    stock:        Number(document.getElementById("f-stock")?.value),
    categorySlug: document.getElementById("f-category")?.value,
    img:          document.getElementById("f-img")?.value.trim()
  };
}

function _showEditModal(p) {
  const existing = document.getElementById("admin-edit-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "admin-edit-modal";
  modal.className = "admin-modal";
  modal.innerHTML = `
    <div class="admin-modal__box">
      <div class="admin-modal__header">
        <h3>Бүтээгдэхүүн засах</h3>
        <button class="admin-modal__close" id="admin-modal-close">✕</button>
      </div>
      ${_productFormHtml(p)}
      <p class="admin-form-error hidden" id="admin-edit-error"></p>
      <div class="admin-modal__footer">
        <button class="admin-cancel-btn" id="admin-modal-close2">Болих</button>
        <button class="admin-submit-btn" id="admin-edit-save">Хадгалах</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();
  document.getElementById("admin-modal-close").addEventListener("click", close);
  document.getElementById("admin-modal-close2").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });

  document.getElementById("admin-edit-save").addEventListener("click", async () => {
    const body = _getFormValues();
    const res  = await fetch(`/api/admin/products/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      close();
      _renderTab("products");
    }
  });
}