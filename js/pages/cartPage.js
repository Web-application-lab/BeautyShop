// cartPage.js
import { updateNavbarCount } from "../components/navbarCount.js";
import { showToast } from "../components/toggle.js";

function getCart() {
  try {
    const raw = JSON.parse(localStorage.getItem("cart")) || [];
    if (raw.length && typeof raw[0] !== "object") {
      return raw.map(id => ({ id: Number(id), qty: 1 }));
    }
    return raw;
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateNavbarCount();
}

export function addToCart(productId) {
  const cart  = getCart();
  const index = cart.findIndex(i => i.id === Number(productId));
  if (index === -1) {
    cart.push({ id: Number(productId), qty: 1 });
  } else {
    cart[index].qty += 1;
  }
  saveCart(cart);
  CartPanel.refresh();
}

export function isInCart(productId) {
  return getCart().some(i => i.id === Number(productId));
}

function injectStyles() {
  if (document.getElementById("cart-panel-styles")) return;

  const style = document.createElement("style");
  style.id = "cart-panel-styles";
  style.textContent = `
    .cp-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.32);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 998; opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .cp-overlay.cp-open { opacity: 1; pointer-events: all; }

    .cp-panel {
      position: fixed; top: 0; right: 0;
      height: 100dvh; width: 420px; max-width: 100vw;
      background: #fff; z-index: 999;
      display: flex; flex-direction: column;
      transform: translateX(105%);
      transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
      box-shadow: -6px 0 48px rgba(0,0,0,0.10);
    }
    .cp-panel.cp-open { transform: translateX(0); }

    .cp-header {
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1.5px solid #f5f5f5;
      flex-shrink: 0;
    }
    .cp-header__left { display: flex; align-items: center; gap: 10px; }
    .cp-header__icon {
      width: 34px; height: 34px; border-radius: 50%;
      background: #f0f7ff; display: flex;
      align-items: center; justify-content: center;
      color: var(--color-main-500); font-size: 15px;
    }
    .cp-header__title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0; }
    .cp-header__badge {
      font-size: 12px; font-weight: 600;
      background: var(--color-main-500); color: #fff;
      border-radius: 20px; padding: 2px 9px; margin-left: 2px;
    }
    .cp-close {
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid #eee; background: transparent;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; color: #777; font-size: 16px;
      transition: background 0.18s, color 0.18s;
    }
    .cp-close:hover { background: #f5f5f5; color: #111; }

    .cp-body {
      flex: 1; overflow-y: auto;
      padding: 12px 20px 20px;
      scroll-behavior: smooth;
    }
    .cp-body::-webkit-scrollbar { width: 4px; }
    .cp-body::-webkit-scrollbar-track { background: transparent; }
    .cp-body::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 99px; }

    .cp-empty {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      height: 100%; gap: 12px;
      padding: 48px 24px; text-align: center;
    }
    .cp-empty__icon {
      width: 68px; height: 68px; border-radius: 50%;
      background: #f0f7ff; display: flex;
      align-items: center; justify-content: center;
      color: #a8cff0; font-size: 28px; margin-bottom: 4px;
    }
    .cp-empty__title { font-size: 15px; font-weight: 700; color: #333; margin: 0; }
    .cp-empty__sub { font-size: 13px; color: #aaa; margin: 0; line-height: 1.6; }

    .cp-item {
      display: flex; gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #f5f5f5;
      align-items: flex-start;
      animation: cpFadeUp 0.22s ease both;
    }
    .cp-item:last-child { border-bottom: none; }

    @keyframes cpFadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .cp-item__img {
      width: 76px; height: 76px; border-radius: 10px;
      object-fit: cover; background: #f8f8f8;
      flex-shrink: 0; border: 1px solid #f0f0f0;
    }
    .cp-item__img-placeholder {
      width: 76px; height: 76px; border-radius: 10px;
      background: #f0f7ff; display: flex;
      align-items: center; justify-content: center;
      color: #a8cff0; font-size: 24px; flex-shrink: 0;
    }
    .cp-item__info {
      flex: 1; display: flex; flex-direction: column;
      gap: 3px; min-width: 0;
    }
    .cp-item__brand {
      font-size: 10.5px; font-weight: 700;
      color: var(--color-main-500);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    .cp-item__name {
      font-size: 13.5px; font-weight: 600; color: #1a1a1a;
      line-height: 1.35; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }
    .cp-item__price { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-top: 2px; }
    .cp-item__price-old {
      font-size: 12px; font-weight: 400; color: #bbb;
      text-decoration: line-through; margin-left: 5px;
    }

    .cp-item__row {
      display: flex; align-items: center;
      justify-content: space-between; margin-top: 8px;
    }
    .cp-qty {
      display: flex; align-items: center;
      border: 1.5px solid #eee; border-radius: 8px; overflow: hidden;
    }
    .cp-qty__btn {
      width: 30px; height: 30px; border: none;
      background: transparent; cursor: pointer;
      font-size: 16px; color: #555;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s; line-height: 1;
    }
    .cp-qty__btn:hover { background: #f5f5f5; }
    .cp-qty__val {
      min-width: 28px; text-align: center;
      font-size: 13px; font-weight: 700; color: #1a1a1a;
      border-left: 1.5px solid #eee; border-right: 1.5px solid #eee;
      padding: 0 4px; height: 30px;
      display: flex; align-items: center; justify-content: center;
    }
    .cp-item__remove {
      width: 30px; height: 30px; border-radius: 8px;
      border: 1.5px solid #eee; background: transparent;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      color: #ccc; font-size: 13px;
      transition: border-color 0.18s, color 0.18s, background 0.18s;
    }
    .cp-item__remove:hover {
      border-color: #ffd6dc; background: #fff5f7;
      color: var(--color-main-500);
    }

    .cp-footer {
      padding: 14px 20px;
      border-top: 1.5px solid #f5f5f5;
      flex-shrink: 0; display: flex;
      flex-direction: column; gap: 10px;
    }
    .cp-footer__total {
      display: flex; justify-content: space-between; align-items: center;
    }
    .cp-footer__label { font-size: 13px; color: #888; font-weight: 500; }
    .cp-footer__amount { font-size: 17px; font-weight: 800; color: #1a1a1a; }
    .cp-footer__checkout {
      width: 100%; padding: 12px; border-radius: 10px;
      border: none; background: var(--color-main-500);
      color: #fff; font-size: 14px; font-weight: 700;
      cursor: pointer; transition: opacity 0.18s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .cp-footer__checkout:hover { opacity: 0.87; }
    .cp-footer__clear {
      width: 100%; padding: 10px; border-radius: 10px;
      border: 1.5px solid #eee; background: transparent;
      color: #aaa; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: background 0.18s, color 0.18s;
    }
    .cp-footer__clear:hover { background: #f9f9f9; color: #555; }

    @media (max-width: 460px) {
      .cp-panel { width: 100vw; }
    }
  `;
  document.head.appendChild(style);
}

class CartPanelClass {
  static #instance = null;
  static #products  = [];

  static init(products) {
    CartPanelClass.#products = products;
    injectStyles();
    if (!CartPanelClass.#instance) {
      CartPanelClass.#instance = new CartPanelClass();
    }
    return CartPanelClass.#instance;
  }

  static open() {
    if (!CartPanelClass.#instance) {
      console.warn("CartPanel.init(products) дуудагдаагүй байна.");
      return;
    }
    CartPanelClass.#instance._open();
  }

  static refresh() {
    if (CartPanelClass.#instance) {
      CartPanelClass.#instance._renderItems();
    }
  }

  constructor() {
    this._overlay = this._el("div", "cp-overlay");
    this._panel   = this._el("div", "cp-panel");
    this._panel.setAttribute("role", "dialog");
    this._panel.setAttribute("aria-label", "Миний сагс");

    const header   = this._el("div", "cp-header");
    const left     = this._el("div", "cp-header__left");
    const iconWrap = this._el("div", "cp-header__icon");
    iconWrap.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
    const title = this._el("h2", "cp-header__title");
    title.textContent = "Миний сагс";
    this._badge = this._el("span", "cp-header__badge");
    this._badge.textContent = "0";
    left.append(iconWrap, title, this._badge);

    const closeBtn = this._el("button", "cp-close");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.setAttribute("aria-label", "Хаах");
    closeBtn.addEventListener("click", () => this._close());

    header.append(left, closeBtn);

    this._body = this._el("div", "cp-body");

    const footer    = this._el("div", "cp-footer");
    const totalRow  = this._el("div", "cp-footer__total");
    const label     = this._el("span", "cp-footer__label");
    label.textContent = "Нийт дүн:";
    this._totalEl   = this._el("span", "cp-footer__amount");
    this._totalEl.textContent = "0₮";
    totalRow.append(label, this._totalEl);

    const checkoutBtn = this._el("button", "cp-footer__checkout");
    checkoutBtn.innerHTML = `<i class="fa-solid fa-credit-card"></i> Захиалга өгөх`;
    checkoutBtn.addEventListener("click", () => {
      showToast("Захиалга удахгүй нэмэгдэнэ!");
    });

    const clearBtn = this._el("button", "cp-footer__clear");
    clearBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="margin-right:6px"></i>Сагс цэвэрлэх`;
    clearBtn.addEventListener("click", () => this._clearAll());

    footer.append(totalRow, checkoutBtn, clearBtn);
    this._panel.append(header, this._body, footer);
    document.body.append(this._overlay, this._panel);

    this._overlay.addEventListener("click", () => this._close());
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") this._close();
    });
  }

  _open() {
    this._renderItems();
    this._overlay.classList.add("cp-open");
    this._panel.classList.add("cp-open");
    document.body.style.overflow = "hidden";
  }

  _close() {
    this._overlay.classList.remove("cp-open");
    this._panel.classList.remove("cp-open");
    document.body.style.overflow = "";
  }

  _renderItems() {
    const cart  = getCart();
    const items = CartPanelClass.#products
      .map(p => {
        const entry = cart.find(i => i.id === Number(p.id));
        return entry ? { product: p, qty: entry.qty } : null;
      })
      .filter(Boolean);

    const totalQty = items.reduce((s, i) => s + i.qty, 0);
    this._badge.textContent = totalQty;

    const totalPrice = items.reduce((s, i) => {
      const price = i.product.discount > 0 ? i.product.newPrice : i.product.price;
      return s + price * i.qty;
    }, 0);
    this._totalEl.textContent = `${Math.round(totalPrice).toLocaleString("mn-MN")}₮`;

    this._body.innerHTML = "";

    if (items.length === 0) {
      this._body.appendChild(this._emptyState());
      return;
    }
    items.forEach(({ product, qty }, i) =>
      this._body.appendChild(this._itemEl(product, qty, i))
    );
  }

  _emptyState() {
    const wrap = this._el("div", "cp-empty");
    const icon = this._el("div", "cp-empty__icon");
    icon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
    const t = this._el("p", "cp-empty__title");
    t.textContent = "Сагс хоосон байна";
    const s = this._el("p", "cp-empty__sub");
    s.textContent = "Бараа сонгоод сагсанд нэмээрэй";
    wrap.append(icon, t, s);
    return wrap;
  }

  _itemEl(p, qty, index) {
    const item = this._el("div", "cp-item");
    item.style.animationDelay = `${index * 0.055}s`;

    let imgEl;
    if (p.img) {
      const src = p.imageUrl || (p.img?.includes("/") ? p.img : `/images/${p.img}`);
      imgEl = Object.assign(this._el("img", "cp-item__img"), { src, alt: p.name ?? "" });
      imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = "/images/placeholder.svg"; };
    } else {
      imgEl = this._el("div", "cp-item__img-placeholder");
      imgEl.innerHTML = `<i class="fa-solid fa-bottle-droplet"></i>`;
    }

    const info = this._el("div", "cp-item__info");

    if (p.brand) {
      const brand = this._el("span", "cp-item__brand");
      brand.textContent = p.brand;
      info.appendChild(brand);
    }

    const name = this._el("div", "cp-item__name");
    name.textContent = p.name ?? `Бараа #${p.id}`;
    name.title = p.name ?? "";
    info.appendChild(name);

    const priceRow     = this._el("div", "cp-item__price");
    const displayPrice = p.discount > 0 ? p.newPrice : p.price;
    priceRow.textContent = `${Math.round(displayPrice).toLocaleString("mn-MN")}₮`;
    if (p.discount > 0) {
      const old = this._el("span", "cp-item__price-old");
      old.textContent = `${Number(p.price).toLocaleString("mn-MN")}₮`;
      priceRow.appendChild(old);
    }
    info.appendChild(priceRow);

    const row     = this._el("div", "cp-item__row");
    const qtyWrap = this._el("div", "cp-qty");

    const minusBtn = this._el("button", "cp-qty__btn");
    minusBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    minusBtn.setAttribute("aria-label", "Хасах");
    minusBtn.addEventListener("click", () => this._changeQty(p.id, -1));

    const qtyVal = this._el("span", "cp-qty__val");
    qtyVal.textContent = qty;

    const plusBtn = this._el("button", "cp-qty__btn");
    plusBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    plusBtn.setAttribute("aria-label", "Нэмэх");
    plusBtn.addEventListener("click", () => this._changeQty(p.id, +1));

    qtyWrap.append(minusBtn, qtyVal, plusBtn);

    const removeBtn = this._el("button", "cp-item__remove");
    removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    removeBtn.setAttribute("aria-label", "Устгах");
    removeBtn.addEventListener("click", () => this._remove(p.id));

    row.append(qtyWrap, removeBtn);
    info.appendChild(row);
    item.append(imgEl, info);
    return item;
  }

  _changeQty(productId, delta) {
    const cart  = getCart();
    const index = cart.findIndex(i => i.id === Number(productId));
    if (index === -1) return;

    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
      showToast("Сагснаас хасагдлаа!");
    }

    saveCart(cart);
    this._renderItems();
  }

  _remove(productId) {
    const cart = getCart().filter(i => i.id !== Number(productId));
    saveCart(cart);
    showToast("Сагснаас хасагдлаа!");
    this._renderItems();
  }

  _clearAll() {
    saveCart([]);
    showToast("Сагс цэвэрлэгдлээ!");
    this._renderItems();
  }

  _el(tag, cls) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  }
}

export const CartPanel = CartPanelClass;

export function renderCartPage(products, app) {
  CartPanel.open();
}

export { getCart, saveCart };