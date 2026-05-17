// wishlistPage.js
import { updateNavbarCount } from "../components/navbarCount.js";
import { showToast } from "../components/toggle.js";

// ─── Stylesheet ────────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById("wl-panel-styles")) return;

  const style = document.createElement("style");
  style.id = "wl-panel-styles";
  style.textContent = `
    .wl-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.32);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .wl-overlay.wl-open {
      opacity: 1;
      pointer-events: all;
    }

    .wl-panel {
      position: fixed;
      top: 0;
      right: 0;
      height: 100dvh;
      width: 400px;
      max-width: 100vw;
      background: #fff;
      z-index: 999;
      display: flex;
      flex-direction: column;
      transform: translateX(105%);
      transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: -6px 0 48px rgba(0, 0, 0, 0.10);
    }
    .wl-panel.wl-open {
      transform: translateX(0);
    }

    /* Header */
    .wl-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1.5px solid #f5f5f5;
      flex-shrink: 0;
    }
    .wl-header__left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .wl-header__icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #fff0f4;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-main-500);
      font-size: 15px;
    }
    .wl-header__title {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }
    .wl-header__badge {
      font-size: 12px;
      font-weight: 600;
      background: var(--color-main-500);
      color: #fff;
      border-radius: 20px;
      padding: 2px 9px;
      margin-left: 2px;
    }
    .wl-close {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1.5px solid #eee;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #777;
      font-size: 16px;
      transition: background 0.18s, color 0.18s;
    }
    .wl-close:hover { background: #f5f5f5; color: #111; }

    /* Body */
    .wl-body {
      flex: 1;
      overflow-y: auto;
      padding: 12px 20px 20px;
      scroll-behavior: smooth;
    }
    .wl-body::-webkit-scrollbar { width: 4px; }
    .wl-body::-webkit-scrollbar-track { background: transparent; }
    .wl-body::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 99px; }

    /* Empty state */
    .wl-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 12px;
      padding: 48px 24px;
      text-align: center;
    }
    .wl-empty__icon {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: #fff0f4;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f4b0c0;
      font-size: 28px;
      margin-bottom: 4px;
    }
    .wl-empty__title {
      font-size: 15px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
    .wl-empty__sub {
      font-size: 13px;
      color: #aaa;
      margin: 0;
      line-height: 1.6;
    }

    /* Item */
    .wl-item {
      display: flex;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #f5f5f5;
      align-items: flex-start;
      animation: wlFadeUp 0.22s ease both;
    }
    .wl-item:last-child { border-bottom: none; }

    @keyframes wlFadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .wl-item__img {
      width: 76px;
      height: 76px;
      border-radius: 10px;
      object-fit: cover;
      background: #f8f8f8;
      flex-shrink: 0;
      border: 1px solid #f0f0f0;
    }
    .wl-item__img-placeholder {
      width: 76px;
      height: 76px;
      border-radius: 10px;
      background: #f8f0f2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f4b0c0;
      font-size: 24px;
      flex-shrink: 0;
    }
    .wl-item__info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }
    .wl-item__brand {
      font-size: 10.5px;
      font-weight: 700;
      color: var(--color-main-500);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .wl-item__name {
      font-size: 13.5px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .wl-item__price {
      font-size: 14px;
      font-weight: 700;
      color: #1a1a1a;
      margin-top: 2px;
    }
    .wl-item__price-old {
      font-size: 12px;
      font-weight: 400;
      color: #bbb;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .wl-item__actions {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      align-items: center;
    }
    .wl-item__cart-btn {
      flex: 1;
      padding: 7px 10px;
      border-radius: 8px;
      border: none;
      background: var(--color-main-500);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.18s;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
    .wl-item__cart-btn:hover { opacity: 0.85; }
    .wl-item__remove {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1.5px solid #eee;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      font-size: 13px;
      transition: border-color 0.18s, color 0.18s, background 0.18s;
      flex-shrink: 0;
    }
    .wl-item__remove:hover {
      border-color: #ffd6dc;
      background: #fff5f7;
      color: var(--color-main-500);
    }

    /* Footer */
    .wl-footer {
      padding: 14px 20px;
      border-top: 1.5px solid #f5f5f5;
      flex-shrink: 0;
    }
    .wl-footer__clear {
      width: 100%;
      padding: 11px;
      border-radius: 10px;
      border: 1.5px solid #f0d0d7;
      background: transparent;
      color: var(--color-main-500);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s;
    }
    .wl-footer__clear:hover { background: #fff5f7; }

    @media (max-width: 440px) {
      .wl-panel { width: 100vw; }
    }
  `;
  document.head.appendChild(style);
}

// ─── WishlistPanel Singleton ───────────────────────────────────────────────────
class WishlistPanel {
  static #instance = null;
  static #products  = [];

  static init(products) {
    WishlistPanel.#products = products;
    injectStyles();
    if (!WishlistPanel.#instance) {
      WishlistPanel.#instance = new WishlistPanel();
    }
    return WishlistPanel.#instance;
  }

  static open() {
    if (!WishlistPanel.#instance) {
      console.warn("WishlistPanel.init(products) дуудагдаагүй байна.");
      return;
    }
    WishlistPanel.#instance.#open();
  }

    static refresh() {
        if (WishlistPanel.#instance) {
         WishlistPanel.#instance.#renderItems();
      }
    }

  // ── DOM ──────────────────────────────────────────────────────────────────────
  #overlay; #panel; #body; #badge;

  constructor() {
    this.#overlay = this.#el("div", "wl-overlay");
    this.#panel   = this.#el("div", "wl-panel");
    this.#panel.setAttribute("role", "dialog");
    this.#panel.setAttribute("aria-label", "Хүслийн жагсаалт");

    // Header
    const header   = this.#el("div", "wl-header");
    const left     = this.#el("div", "wl-header__left");
    const iconWrap = this.#el("div", "wl-header__icon");
    iconWrap.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    const title = this.#el("h2", "wl-header__title");
    title.textContent = "Хүслийн жагсаалт";
    this.#badge = this.#el("span", "wl-header__badge");
    this.#badge.textContent = "0";
    left.append(iconWrap, title, this.#badge);

    const closeBtn = this.#el("button", "wl-close");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.setAttribute("aria-label", "Хаах");
    closeBtn.addEventListener("click", () => this.#close());

    header.append(left, closeBtn);

    this.#body = this.#el("div", "wl-body");

    const footer   = this.#el("div", "wl-footer");
    const clearBtn = this.#el("button", "wl-footer__clear");
    clearBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="margin-right:6px"></i>Жагсаалт цэвэрлэх`;
    clearBtn.addEventListener("click", () => this.#clearAll());
    footer.appendChild(clearBtn);

    this.#panel.append(header, this.#body, footer);
    document.body.append(this.#overlay, this.#panel);

    this.#overlay.addEventListener("click", () => this.#close());
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") this.#close();
    });
  }

  #open() {
    this.#renderItems();
    this.#overlay.classList.add("wl-open");
    this.#panel.classList.add("wl-open");
    document.body.style.overflow = "hidden";
  }

  #close() {
    this.#overlay.classList.remove("wl-open");
    this.#panel.classList.remove("wl-open");
    document.body.style.overflow = "";
  }

  #renderItems() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const items = WishlistPanel.#products.filter(p =>
      wishlist.some(id => Number(id) === Number(p.id))
    );

    this.#badge.textContent = items.length;
    this.#body.innerHTML = "";

    if (items.length === 0) {
      this.#body.appendChild(this.#emptyState());
      return;
    }
    items.forEach((p, i) => this.#body.appendChild(this.#itemEl(p, i)));
  }

  #emptyState() {
    const wrap = this.#el("div", "wl-empty");
    const icon = this.#el("div", "wl-empty__icon");
    icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    const t = this.#el("p", "wl-empty__title");
    t.textContent = "Жагсаалт хоосон байна";
    const s = this.#el("p", "wl-empty__sub");
    s.textContent = "Таалагдсан бараагаа ♡ дарж хадгалаарай";
    wrap.append(icon, t, s);
    return wrap;
  }

  #itemEl(p, index) {
    const item = this.#el("div", "wl-item");
    item.style.animationDelay = `${index * 0.055}s`;

    // Зураг — Product class дотор `img` гэсэн field байгаа тул тэрийг ашиглана
    let imgEl;
    if (p.img) {
<<<<<<< HEAD
      const src = p.imageUrl || (p.img?.includes("/") ? p.img : `/images/${p.img}`);
      imgEl = Object.assign(this.#el("img", "wl-item__img"), { src, alt: p.name ?? "" });
      imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = "/images/placeholder.svg"; };
=======
      imgEl = Object.assign(this.#el("img", "wl-item__img"), { src: `images/${p.img}`, alt: p.name ?? "" });
>>>>>>> d8fc03cb717da0a3506582113502e623537f1414
    } else {
      imgEl = this.#el("div", "wl-item__img-placeholder");
      imgEl.innerHTML = `<i class="fa-solid fa-bottle-droplet"></i>`;
    }

    const info = this.#el("div", "wl-item__info");

    if (p.brand) {
      const brand = this.#el("span", "wl-item__brand");
      brand.textContent = p.brand;
      info.appendChild(brand);
    }

    const name = this.#el("div", "wl-item__name");
    name.textContent = p.name ?? `Бараа #${p.id}`;
    name.title = p.name ?? "";
    info.appendChild(name);

    // Үнэ — discount байвал newPrice-г харуулна
    const priceRow = this.#el("div", "wl-item__price");
    const displayPrice = p.discount > 0 ? p.newPrice : p.price;
    priceRow.textContent = `${Number(displayPrice).toLocaleString("mn-MN")}₮`;
    if (p.discount > 0) {
      const old = this.#el("span", "wl-item__price-old");
      old.textContent = `${Number(p.price).toLocaleString("mn-MN")}₮`;
      priceRow.appendChild(old);
    }
    info.appendChild(priceRow);

    // Товчлуурууд
    const actions  = this.#el("div", "wl-item__actions");

    const cartBtn  = this.#el("button", "wl-item__cart-btn");
    cartBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Сагсанд нэмэх`;
    cartBtn.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("wishlist:addToCart", { detail: p }));
      showToast("Сагсанд нэмэгдлээ!");
    });

    const removeBtn = this.#el("button", "wl-item__remove");
    removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    removeBtn.setAttribute("aria-label", "Хасах");
    removeBtn.addEventListener("click", () => this.#remove(p.id));

    actions.append(cartBtn, removeBtn);
    info.appendChild(actions);
    item.append(imgEl, info);
    return item;
  }

  #remove(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify(
      wishlist.filter(id => Number(id) !== Number(productId))
    ));
    updateNavbarCount();
    showToast("Хүслийн жагсаалтаас хасагдлаа!");
    this.#renderItems();
    document.querySelectorAll("wishlist-button").forEach(btn => btn.refresh?.());
  }

  #clearAll() {
    localStorage.removeItem("wishlist");
    updateNavbarCount();
    showToast("Жагсаалт цэвэрлэгдлээ!");
    this.#renderItems();
    document.querySelectorAll("wishlist-button").forEach(btn => btn.refresh?.());
  }

  #el(tag, cls) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  }
}

// ─── Router-тай нийцэх export ──────────────────────────────────────────────────
// router.js: renderWishlistPage(products, app) → drawer нээнэ
export function renderWishlistPage(products, app) {
  WishlistPanel.open();
}

export { WishlistPanel };