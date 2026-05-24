(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // js/components/navbarCount.js
  function updateNavbarCount() {
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
  var init_navbarCount = __esm({
    "js/components/navbarCount.js"() {
    }
  });

  // js/components/toggle.js
  function showToast(message) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    toast.style.zIndex = "1100";
    setTimeout(() => toast.remove(), 3e3);
  }
  var init_toggle = __esm({
    "js/components/toggle.js"() {
    }
  });

  // js/pages/cartPage.js
  function getCart() {
    try {
      const raw = JSON.parse(localStorage.getItem("cart")) || [];
      if (raw.length && typeof raw[0] !== "object") {
        return raw.map((id) => ({ id: Number(id), qty: 1 }));
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
  function addToCart(productId) {
    const cart = getCart();
    const index = cart.findIndex((i) => i.id === Number(productId));
    if (index === -1) {
      cart.push({ id: Number(productId), qty: 1 });
    } else {
      cart[index].qty += 1;
    }
    saveCart(cart);
    CartPanelClass.refresh();
  }
  function renderCartPage(products, app) {
    CartPanel.open();
  }
  var CartPanelClass, CartPanel;
  var init_cartPage = __esm({
    "js/pages/cartPage.js"() {
      init_navbarCount();
      init_toggle();
      CartPanelClass = class _CartPanelClass {
        static _instance = null;
        static _products = [];
        static init(products) {
          _CartPanelClass._products = products;
          if (!_CartPanelClass._instance) {
            _CartPanelClass._instance = new _CartPanelClass();
          }
          return _CartPanelClass._instance;
        }
        static open() {
          if (!_CartPanelClass._instance) {
            console.warn("CartPanel.init(products) \u0434\u0443\u0443\u0434\u0430\u0433\u0434\u0430\u0430\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430.");
            return;
          }
          _CartPanelClass._instance._open();
        }
        static refresh() {
          if (_CartPanelClass._instance) {
            _CartPanelClass._instance._renderItems();
          }
        }
        constructor() {
          this._overlay = this._el("div", "cp-overlay");
          this._panel = this._el("div", "cp-panel");
          this._panel.setAttribute("role", "dialog");
          this._panel.setAttribute("aria-label", "\u041C\u0438\u043D\u0438\u0439 \u0441\u0430\u0433\u0441");
          const header = this._el("div", "cp-header");
          const left = this._el("div", "cp-header__left");
          const iconWrap = this._el("div", "cp-header__icon");
          iconWrap.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
          const title = this._el("h2", "cp-header__title");
          title.textContent = "\u041C\u0438\u043D\u0438\u0439 \u0441\u0430\u0433\u0441";
          this._badge = this._el("span", "cp-header__badge");
          this._badge.textContent = "0";
          left.append(iconWrap, title, this._badge);
          const closeBtn = this._el("button", "cp-close");
          closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          closeBtn.setAttribute("aria-label", "\u0425\u0430\u0430\u0445");
          closeBtn.addEventListener("click", () => this._close());
          header.append(left, closeBtn);
          this._body = this._el("div", "cp-body");
          const footer = this._el("div", "cp-footer");
          const totalRow = this._el("div", "cp-footer__total");
          const label = this._el("span", "cp-footer__label");
          label.textContent = "\u041D\u0438\u0439\u0442 \u0434\u04AF\u043D:";
          this._totalEl = this._el("span", "cp-footer__amount");
          this._totalEl.textContent = "0\u20AE";
          totalRow.append(label, this._totalEl);
          const checkoutBtn = this._el("button", "cp-footer__checkout");
          checkoutBtn.innerHTML = `<i class="fa-solid fa-credit-card"></i> \u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u04E9\u0433\u04E9\u0445`;
          checkoutBtn.addEventListener("click", () => this._checkout());
          const clearBtn = this._el("button", "cp-footer__clear");
          clearBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="margin-right:6px"></i>\u0421\u0430\u0433\u0441 \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0445`;
          clearBtn.addEventListener("click", () => this._clearAll());
          footer.append(totalRow, checkoutBtn, clearBtn);
          this._panel.append(header, this._body, footer);
          document.body.append(this._overlay, this._panel);
          this._overlay.addEventListener("click", () => this._close());
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this._close();
          });
        }
        async _checkout() {
          const user = JSON.parse(localStorage.getItem("user") || "null");
          if (!user) {
            showToast("\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u04E9\u0433\u04E9\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u043D\u044D\u0432\u0442\u044D\u0440\u043D\u044D \u04AF\u04AF!");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
            return;
          }
          const cart = getCart();
          const prods = _CartPanelClass._products;
          const items = cart.map((c) => {
            const p = prods.find((pr) => Number(pr.id) === Number(c.id));
            if (!p) return null;
            return {
              productId: p.id,
              name: p.name,
              price: p.discount > 0 ? p.newPrice : p.price,
              qty: c.qty,
              img: p.img || ""
            };
          }).filter(Boolean);
          if (!items.length) return;
          const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
          try {
            const res = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone || "",
                items,
                totalPrice
              })
            });
            if (res.ok) {
              saveCart([]);
              this._renderItems();
              this._close();
              showToast("\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0430\u043C\u0436\u0438\u043B\u0442\u0442\u0430\u0439 \u04E9\u0433\u04E9\u0433\u0434\u043B\u04E9\u04E9!");
            } else {
              const data = await res.json();
              showToast(data.error || "\u0410\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430, \u0434\u0430\u0445\u0438\u043D \u043E\u0440\u043E\u043B\u0434\u043E\u043D\u043E \u0443\u0443");
            }
          } catch {
            showToast("\u0421\u0435\u0440\u0432\u0435\u0440\u0442\u044D\u0439 \u0445\u043E\u043B\u0431\u043E\u0433\u0434\u043E\u0445\u043E\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430");
          }
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
          const cart = getCart();
          const items = _CartPanelClass._products.map((p) => {
            const entry = cart.find((i) => i.id === Number(p.id));
            return entry ? { product: p, qty: entry.qty } : null;
          }).filter(Boolean);
          const totalQty = items.reduce((s, i) => s + i.qty, 0);
          this._badge.textContent = totalQty;
          const totalPrice = items.reduce((s, i) => {
            const price = i.product.discount > 0 ? i.product.newPrice : i.product.price;
            return s + price * i.qty;
          }, 0);
          this._totalEl.textContent = `${Math.round(totalPrice).toLocaleString("mn-MN")}\u20AE`;
          this._body.innerHTML = "";
          if (items.length === 0) {
            this._body.appendChild(this._emptyState());
            return;
          }
          items.forEach(
            ({ product, qty }, i) => this._body.appendChild(this._itemEl(product, qty, i))
          );
        }
        _emptyState() {
          const wrap = this._el("div", "cp-empty");
          const icon = this._el("div", "cp-empty__icon");
          icon.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>`;
          const t = this._el("p", "cp-empty__title");
          t.textContent = "\u0421\u0430\u0433\u0441 \u0445\u043E\u043E\u0441\u043E\u043D \u0431\u0430\u0439\u043D\u0430";
          const s = this._el("p", "cp-empty__sub");
          s.textContent = "\u0411\u0430\u0440\u0430\u0430 \u0441\u043E\u043D\u0433\u043E\u043E\u0434 \u0441\u0430\u0433\u0441\u0430\u043D\u0434 \u043D\u044D\u043C\u044D\u044D\u0440\u044D\u0439";
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
            imgEl.onerror = () => {
              imgEl.onerror = null;
              imgEl.src = "/images/placeholder.svg";
            };
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
          name.textContent = p.name ?? `\u0411\u0430\u0440\u0430\u0430 #${p.id}`;
          name.title = p.name ?? "";
          info.appendChild(name);
          const priceRow = this._el("div", "cp-item__price");
          const displayPrice = p.discount > 0 ? p.newPrice : p.price;
          priceRow.textContent = `${Math.round(displayPrice).toLocaleString("mn-MN")}\u20AE`;
          if (p.discount > 0) {
            const old = this._el("span", "cp-item__price-old");
            old.textContent = `${Number(p.price).toLocaleString("mn-MN")}\u20AE`;
            priceRow.appendChild(old);
          }
          info.appendChild(priceRow);
          const row = this._el("div", "cp-item__row");
          const qtyWrap = this._el("div", "cp-qty");
          const minusBtn = this._el("button", "cp-qty__btn");
          minusBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
          minusBtn.setAttribute("aria-label", "\u0425\u0430\u0441\u0430\u0445");
          minusBtn.addEventListener("click", () => this._changeQty(p.id, -1));
          const qtyVal = this._el("span", "cp-qty__val");
          qtyVal.textContent = qty;
          const plusBtn = this._el("button", "cp-qty__btn");
          plusBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
          plusBtn.setAttribute("aria-label", "\u041D\u044D\u043C\u044D\u0445");
          plusBtn.addEventListener("click", () => this._changeQty(p.id, 1));
          qtyWrap.append(minusBtn, qtyVal, plusBtn);
          const removeBtn = this._el("button", "cp-item__remove");
          removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
          removeBtn.setAttribute("aria-label", "\u0423\u0441\u0442\u0433\u0430\u0445");
          removeBtn.addEventListener("click", () => this._remove(p.id));
          row.append(qtyWrap, removeBtn);
          info.appendChild(row);
          item.append(imgEl, info);
          return item;
        }
        _changeQty(productId, delta) {
          const cart = getCart();
          const index = cart.findIndex((i) => i.id === Number(productId));
          if (index === -1) return;
          cart[index].qty += delta;
          if (cart[index].qty <= 0) {
            cart.splice(index, 1);
            showToast("\u0421\u0430\u0433\u0441\u043D\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0433\u0434\u043B\u0430\u0430!");
          }
          saveCart(cart);
          this._renderItems();
        }
        _remove(productId) {
          const cart = getCart().filter((i) => i.id !== Number(productId));
          saveCart(cart);
          showToast("\u0421\u0430\u0433\u0441\u043D\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0433\u0434\u043B\u0430\u0430!");
          this._renderItems();
        }
        _clearAll() {
          saveCart([]);
          showToast("\u0421\u0430\u0433\u0441 \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0434\u043B\u044D\u044D!");
          this._renderItems();
        }
        _el(tag, cls) {
          const el = document.createElement(tag);
          if (cls) el.className = cls;
          return el;
        }
      };
      CartPanel = CartPanelClass;
    }
  });

  // js/components/cartButton.js
  var require_cartButton = __commonJS({
    "js/components/cartButton.js"() {
      init_cartPage();
      var CartButton = class extends HTMLElement {
        connectedCallback() {
          this.productId = this.getAttribute("product-id");
          this.#render();
        }
        #render() {
          this.innerHTML = `
      <button class="add-cart" type="button" aria-label="\u0421\u0430\u0433\u0441\u0430\u043D\u0434 \u043D\u044D\u043C\u044D\u0445">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    `;
          this.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(this.productId);
            CartPanel.open();
          });
        }
      };
      if (!customElements.get("cart-button")) {
        customElements.define("cart-button", CartButton);
      }
    }
  });

  // js/pages/wishlistPage.js
  function injectStyles() {
    if (document.getElementById("wl-panel-styles")) return;
    const style = document.createElement("style");
    style.id = "wl-panel-styles";
    style.textContent = `
    .wl-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.32);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 998; opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .wl-overlay.wl-open { opacity: 1; pointer-events: all; }

    .wl-panel {
      position: fixed; top: 0; right: 0;
      height: 100dvh; width: 400px; max-width: 100vw;
      background: #fff; z-index: 999;
      display: flex; flex-direction: column;
      transform: translateX(105%);
      transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
      box-shadow: -6px 0 48px rgba(0,0,0,0.10);
    }
    .wl-panel.wl-open { transform: translateX(0); }

    .wl-header {
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1.5px solid #f5f5f5;
      flex-shrink: 0;
    }
    .wl-header__left { display: flex; align-items: center; gap: 10px; }
    .wl-header__icon {
      width: 34px; height: 34px; border-radius: 50%;
      background: #fff0f4; display: flex;
      align-items: center; justify-content: center;
      color: var(--color-main-500); font-size: 15px;
    }
    .wl-header__title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0; }
    .wl-header__badge {
      font-size: 12px; font-weight: 600;
      background: var(--color-main-500); color: #fff;
      border-radius: 20px; padding: 2px 9px; margin-left: 2px;
    }
    .wl-close {
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid #eee; background: transparent;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      color: #777; font-size: 16px;
      transition: background 0.18s, color 0.18s;
    }
    .wl-close:hover { background: #f5f5f5; color: #111; }

    .wl-body {
      flex: 1; overflow-y: auto;
      padding: 12px 20px 20px;
      scroll-behavior: smooth;
    }
    .wl-body::-webkit-scrollbar { width: 4px; }
    .wl-body::-webkit-scrollbar-track { background: transparent; }
    .wl-body::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 99px; }

    .wl-empty {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      height: 100%; gap: 12px;
      padding: 48px 24px; text-align: center;
    }
    .wl-empty__icon {
      width: 68px; height: 68px; border-radius: 50%;
      background: #fff0f4; display: flex;
      align-items: center; justify-content: center;
      color: #f4b0c0; font-size: 28px; margin-bottom: 4px;
    }
    .wl-empty__title { font-size: 15px; font-weight: 700; color: #333; margin: 0; }
    .wl-empty__sub { font-size: 13px; color: #aaa; margin: 0; line-height: 1.6; }

    .wl-item {
      display: flex; gap: 12px;
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
      width: 76px; height: 76px; border-radius: 10px;
      object-fit: cover; background: #f8f8f8;
      flex-shrink: 0; border: 1px solid #f0f0f0;
    }
    .wl-item__img-placeholder {
      width: 76px; height: 76px; border-radius: 10px;
      background: #f8f0f2; display: flex;
      align-items: center; justify-content: center;
      color: #f4b0c0; font-size: 24px; flex-shrink: 0;
    }
    .wl-item__info {
      flex: 1; display: flex; flex-direction: column;
      gap: 3px; min-width: 0;
    }
    .wl-item__brand {
      font-size: 10.5px; font-weight: 700;
      color: var(--color-main-500);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    .wl-item__name {
      font-size: 13.5px; font-weight: 600; color: #1a1a1a;
      line-height: 1.35; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }
    .wl-item__price { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-top: 2px; }
    .wl-item__price-old {
      font-size: 12px; font-weight: 400; color: #bbb;
      text-decoration: line-through; margin-left: 5px;
    }
    .wl-item__actions {
      display: flex; gap: 6px; margin-top: 8px; align-items: center;
    }
    .wl-item__cart-btn {
      flex: 1; padding: 7px 10px; border-radius: 8px;
      border: none; background: var(--color-main-500);
      color: #fff; font-size: 12px; font-weight: 600;
      cursor: pointer; transition: opacity 0.18s;
      white-space: nowrap; display: flex;
      align-items: center; justify-content: center; gap: 5px;
    }
    .wl-item__cart-btn:hover { opacity: 0.85; }
    .wl-item__remove {
      width: 32px; height: 32px; border-radius: 8px;
      border: 1.5px solid #eee; background: transparent;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      color: #ccc; font-size: 13px;
      transition: border-color 0.18s, color 0.18s, background 0.18s;
      flex-shrink: 0;
    }
    .wl-item__remove:hover {
      border-color: #ffd6dc; background: #fff5f7;
      color: var(--color-main-500);
    }

    .wl-footer {
      padding: 14px 20px;
      border-top: 1.5px solid #f5f5f5;
      flex-shrink: 0;
    }
    .wl-footer__clear {
      width: 100%; padding: 11px; border-radius: 10px;
      border: 1.5px solid #f0d0d7; background: transparent;
      color: var(--color-main-500); font-size: 13px;
      font-weight: 600; cursor: pointer; transition: background 0.18s;
    }
    .wl-footer__clear:hover { background: #fff5f7; }

    @media (max-width: 440px) {
      .wl-panel { width: 100vw; }
    }
  `;
    document.head.appendChild(style);
  }
  function renderWishlistPage(products, app) {
    WishlistPanel.open();
  }
  var WishlistPanelClass, WishlistPanel;
  var init_wishlistPage = __esm({
    "js/pages/wishlistPage.js"() {
      init_navbarCount();
      init_toggle();
      WishlistPanelClass = class _WishlistPanelClass {
        static _instance = null;
        static _products = [];
        static init(products) {
          _WishlistPanelClass._products = products;
          injectStyles();
          if (!_WishlistPanelClass._instance) {
            _WishlistPanelClass._instance = new _WishlistPanelClass();
          }
          return _WishlistPanelClass._instance;
        }
        static open() {
          if (!_WishlistPanelClass._instance) {
            console.warn("WishlistPanel.init(products) \u0434\u0443\u0443\u0434\u0430\u0433\u0434\u0430\u0430\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430.");
            return;
          }
          _WishlistPanelClass._instance._open();
        }
        static refresh() {
          if (_WishlistPanelClass._instance) {
            _WishlistPanelClass._instance._renderItems();
          }
        }
        constructor() {
          this._overlay = this._el("div", "wl-overlay");
          this._panel = this._el("div", "wl-panel");
          this._panel.setAttribute("role", "dialog");
          this._panel.setAttribute("aria-label", "\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442");
          const header = this._el("div", "wl-header");
          const left = this._el("div", "wl-header__left");
          const iconWrap = this._el("div", "wl-header__icon");
          iconWrap.innerHTML = `<i class="fa-solid fa-heart"></i>`;
          const title = this._el("h2", "wl-header__title");
          title.textContent = "\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442";
          this._badge = this._el("span", "wl-header__badge");
          this._badge.textContent = "0";
          left.append(iconWrap, title, this._badge);
          const closeBtn = this._el("button", "wl-close");
          closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
          closeBtn.setAttribute("aria-label", "\u0425\u0430\u0430\u0445");
          closeBtn.addEventListener("click", () => this._close());
          header.append(left, closeBtn);
          this._body = this._el("div", "wl-body");
          const footer = this._el("div", "wl-footer");
          const clearBtn = this._el("button", "wl-footer__clear");
          clearBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="margin-right:6px"></i>\u0416\u0430\u0433\u0441\u0430\u0430\u043B\u0442 \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0445`;
          clearBtn.addEventListener("click", () => this._clearAll());
          footer.appendChild(clearBtn);
          this._panel.append(header, this._body, footer);
          document.body.append(this._overlay, this._panel);
          this._overlay.addEventListener("click", () => this._close());
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this._close();
          });
        }
        _open() {
          this._renderItems();
          this._overlay.classList.add("wl-open");
          this._panel.classList.add("wl-open");
          document.body.style.overflow = "hidden";
        }
        _close() {
          this._overlay.classList.remove("wl-open");
          this._panel.classList.remove("wl-open");
          document.body.style.overflow = "";
        }
        _renderItems() {
          const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const items = _WishlistPanelClass._products.filter(
            (p) => wishlist.some((id) => Number(id) === Number(p.id))
          );
          this._badge.textContent = items.length;
          this._body.innerHTML = "";
          if (items.length === 0) {
            this._body.appendChild(this._emptyState());
            return;
          }
          items.forEach((p, i) => this._body.appendChild(this._itemEl(p, i)));
        }
        _emptyState() {
          const wrap = this._el("div", "wl-empty");
          const icon = this._el("div", "wl-empty__icon");
          icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
          const t = this._el("p", "wl-empty__title");
          t.textContent = "\u0416\u0430\u0433\u0441\u0430\u0430\u043B\u0442 \u0445\u043E\u043E\u0441\u043E\u043D \u0431\u0430\u0439\u043D\u0430";
          const s = this._el("p", "wl-empty__sub");
          s.textContent = "\u0422\u0430\u0430\u043B\u0430\u0433\u0434\u0441\u0430\u043D \u0431\u0430\u0440\u0430\u0430\u0433\u0430\u0430 \u2661 \u0434\u0430\u0440\u0436 \u0445\u0430\u0434\u0433\u0430\u043B\u0430\u0430\u0440\u0430\u0439";
          wrap.append(icon, t, s);
          return wrap;
        }
        _itemEl(p, index) {
          const item = this._el("div", "wl-item");
          item.style.animationDelay = `${index * 0.055}s`;
          let imgEl;
          if (p.img) {
            const src = p.imageUrl || (p.img?.includes("/") ? p.img : `/images/${p.img}`);
            imgEl = Object.assign(this._el("img", "wl-item__img"), { src, alt: p.name ?? "" });
            imgEl.onerror = () => {
              imgEl.onerror = null;
              imgEl.src = "/images/placeholder.svg";
            };
          } else {
            imgEl = this._el("div", "wl-item__img-placeholder");
            imgEl.innerHTML = `<i class="fa-solid fa-bottle-droplet"></i>`;
          }
          const info = this._el("div", "wl-item__info");
          if (p.brand) {
            const brand = this._el("span", "wl-item__brand");
            brand.textContent = p.brand;
            info.appendChild(brand);
          }
          const name = this._el("div", "wl-item__name");
          name.textContent = p.name ?? `\u0411\u0430\u0440\u0430\u0430 #${p.id}`;
          name.title = p.name ?? "";
          info.appendChild(name);
          const priceRow = this._el("div", "wl-item__price");
          const displayPrice = p.discount > 0 ? p.newPrice : p.price;
          priceRow.textContent = `${Number(displayPrice).toLocaleString("mn-MN")}\u20AE`;
          if (p.discount > 0) {
            const old = this._el("span", "wl-item__price-old");
            old.textContent = `${Number(p.price).toLocaleString("mn-MN")}\u20AE`;
            priceRow.appendChild(old);
          }
          info.appendChild(priceRow);
          const actions = this._el("div", "wl-item__actions");
          const cartBtn = this._el("button", "wl-item__cart-btn");
          cartBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> \u0421\u0430\u0433\u0441\u0430\u043D\u0434 \u043D\u044D\u043C\u044D\u0445`;
          cartBtn.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("wishlist:addToCart", { detail: p }));
            showToast("\u0421\u0430\u0433\u0441\u0430\u043D\u0434 \u043D\u044D\u043C\u044D\u0433\u0434\u043B\u044D\u044D!");
          });
          const removeBtn = this._el("button", "wl-item__remove");
          removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
          removeBtn.setAttribute("aria-label", "\u0425\u0430\u0441\u0430\u0445");
          removeBtn.addEventListener("click", () => this._remove(p.id));
          actions.append(cartBtn, removeBtn);
          info.appendChild(actions);
          item.append(imgEl, info);
          return item;
        }
        _remove(productId) {
          const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          localStorage.setItem("wishlist", JSON.stringify(
            wishlist.filter((id) => Number(id) !== Number(productId))
          ));
          updateNavbarCount();
          showToast("\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0433\u0434\u043B\u0430\u0430!");
          this._renderItems();
          document.querySelectorAll("wishlist-button").forEach((btn) => btn.refresh?.());
        }
        _clearAll() {
          localStorage.removeItem("wishlist");
          updateNavbarCount();
          showToast("\u0416\u0430\u0433\u0441\u0430\u0430\u043B\u0442 \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0434\u043B\u044D\u044D!");
          this._renderItems();
          document.querySelectorAll("wishlist-button").forEach((btn) => btn.refresh?.());
        }
        _el(tag, cls) {
          const el = document.createElement(tag);
          if (cls) el.className = cls;
          return el;
        }
      };
      WishlistPanel = WishlistPanelClass;
    }
  });

  // js/components/wishlistButton.js
  var require_wishlistButton = __commonJS({
    "js/components/wishlistButton.js"() {
      init_navbarCount();
      init_toggle();
      init_wishlistPage();
      var WishlistButton = class extends HTMLElement {
        connectedCallback() {
          this.productId = this.getAttribute("product-id");
          this.#render();
        }
        // Panel дотроос дуудагдана
        refresh() {
          this.#render();
        }
        #isWishlisted() {
          const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          return wishlist.some((item) => Number(item) === Number(this.productId));
        }
        #toggle() {
          const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const index = wishlist.findIndex((item) => Number(item) === Number(this.productId));
          if (index === -1) {
            wishlist.push(Number(this.productId));
            showToast("\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442\u0430\u0434 \u043D\u044D\u043C\u044D\u0433\u0434\u043B\u044D\u044D!");
          } else {
            wishlist.splice(index, 1);
            showToast("\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0433\u0434\u043B\u0430\u0430!");
          }
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          updateNavbarCount();
          this.#render();
          WishlistPanel.refresh();
        }
        #render() {
          const wishlisted = this.#isWishlisted();
          this.innerHTML = `
      <button class="wishlist" type="button" aria-label="\u0425\u04AF\u0441\u043B\u0438\u0439\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442">
        <i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"
           style="color: ${wishlisted ? "var(--color-main-500)" : "inherit"}">
        </i>
      </button>
    `;
          this.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            this.#toggle();
            WishlistPanel.open();
          });
        }
      };
      if (!customElements.get("wishlist-button")) {
        customElements.define("wishlist-button", WishlistButton);
      }
    }
  });

  // js/components/starRating.js
  function starRating(rating = 5) {
    return [1, 2, 3, 4, 5].map((num) => `
    <span class="review-stars">
      <i class="${num <= rating ? "fa-solid" : "fa-regular"} fa-star"></i>
    </span>
  `).join("");
  }
  var init_starRating = __esm({
    "js/components/starRating.js"() {
    }
  });

  // js/components/priceTemplate.js
  function priceTemplate(product) {
    if (product.discount > 0) {
      const newPrice = product.price - product.price * product.discount / 100;
      return `
      <p class="product-price">
        <span class="new-price">${newPrice.toLocaleString()}\u20AE</span>
        <span class="old-price">${product.price.toLocaleString()}\u20AE</span>
      </p>
    `;
    }
    return `
    <p class="product-price">
      ${product.price.toLocaleString()}\u20AE
    </p>
  `;
  }
  var init_priceTemplate = __esm({
    "js/components/priceTemplate.js"() {
    }
  });

  // js/components/productCard.js
  function productImgSrc(product) {
    return product.imageUrl || productImageSrc(product.img);
  }
  var imgFallback, template;
  var init_productCard = __esm({
    "js/components/productCard.js"() {
      init_starRating();
      init_priceTemplate();
      imgFallback = `onerror="this.onerror=null;this.src='/images/placeholder.svg'"`;
      template = {
        cardTemplate(product) {
          return `
            <div class="product-card">
                <a href="#product-detail?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${productImgSrc(product)}" alt="${product.name}" ${imgFallback}>
                    </div>

                    <div class="product-body">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-brand">${product.brand}</p>
                    </div>

                    <div class="product-rating">
                        ${starRating(Math.round(product.rating))}
                        <span class="rating">${product.rating}</span>
                        <span class="reviews">(${product.reviews})</span>
                    </div>
                    ${priceTemplate(product)}
                </a>
                <div class="product-actions">
                    <wishlist-button product-id="${product.id}"></wishlist-button>
                    <cart-button product-id="${product.id}"></cart-button>
                </div>
            </div>
        `;
        },
        saleTemplate(product) {
          return `
            <div class="product-card">
                <span class="sale-rate">-${product.discount}%</span>
                <a href="#product-detail?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${productImgSrc(product)}" alt="${product.name}" ${imgFallback}>
                    </div>

                    <div class="product-body">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-brand">${product.brand}</p>
                    </div>

                    <div class="product-rating">
                        ${starRating(Math.round(product.rating))}
                        <span class="rating">${product.rating}</span>
                        <span class="reviews">(${product.reviews})</span>
                    </div>
                    ${priceTemplate(product)}
                </a>
                <div class="product-actions">
                    <wishlist-button product-id="${product.id}"></wishlist-button>
                    <cart-button product-id="${product.id}"></cart-button>
                </div>
            </div>
        `;
        }
      };
    }
  });

  // js/components/categoryCatalog.js
  function initCategoryCatalog(data) {
    const categories = data.categories || [];
    const subCategories = data.subCategories || [];
    const navigation = data.categoryNavigation || { bySlug: {}, byName: {} };
    const normalizedCategories = categories.map((c) => ({ ...c, id: Number(c.id) }));
    const normalizedSubs = subCategories.map((s) => ({
      ...s,
      id: Number(s.id),
      categoryId: Number(s.categoryId)
    }));
    const categoryById = Object.fromEntries(normalizedCategories.map((c) => [c.id, c]));
    const subCategoryById = Object.fromEntries(normalizedSubs.map((s) => [s.id, s]));
    const subCategoriesByCategoryId = normalizedSubs.reduce((groups, sub) => {
      if (!groups[sub.categoryId]) groups[sub.categoryId] = [];
      groups[sub.categoryId].push(sub);
      return groups;
    }, {});
    catalog = {
      categories: normalizedCategories,
      subCategories: normalizedSubs,
      concerns: data.concerns || [],
      navigation,
      categoryById,
      subCategoryById,
      subCategoriesByCategoryId
    };
    return catalog;
  }
  function getCategoryCatalog() {
    return catalog;
  }
  function buildCategoryPath(options) {
    options = options || {};
    const categorySlug = options.categorySlug;
    const subCategorySlug = options.subCategorySlug;
    if (!categorySlug) return CATEGORY_PATH_PREFIX;
    let path = CATEGORY_PATH_PREFIX + "/" + categorySlug;
    if (subCategorySlug) {
      path += "/" + subCategorySlug;
    }
    return path;
  }
  function categoryPathToParams(pathname) {
    let path = pathname;
    if (path.toLowerCase().endsWith("/index.html")) {
      path = path.slice(0, -"/index.html".length);
    }
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    if (!path) {
      path = "/";
    }
    if (path === CATEGORY_PATH_PREFIX) {
      return new URLSearchParams();
    }
    const categoryPrefix = CATEGORY_PATH_PREFIX + "/";
    if (!path.startsWith(categoryPrefix)) {
      return null;
    }
    const rest = path.slice(categoryPrefix.length);
    const parts = rest.split("/");
    const catSlug = parts[0] || "";
    const subSlug = parts[1] || "";
    const params = new URLSearchParams();
    if (catSlug) {
      params.set("cat", decodeURIComponent(catSlug));
    }
    if (subSlug) {
      params.set("sub", decodeURIComponent(subSlug));
    }
    return params;
  }
  function normalizeLegacyCategoryLocation() {
    if (categoryPathToParams(window.location.pathname) !== null) return null;
    const hash = window.location.hash || "";
    if (!hash.startsWith("#category")) return null;
    let query = "";
    const qIndex = hash.indexOf("?");
    if (qIndex !== -1) {
      query = hash.slice(qIndex + 1);
    }
    const params = new URLSearchParams(query);
    if (params.get("concern")) return null;
    const resolved = resolveCategoryParams(params);
    if (resolved.notFound) return null;
    return buildCategoryPath({
      categorySlug: resolved.categorySlug,
      subCategorySlug: resolved.subCategorySlug
    });
  }
  function entryFromSlug(slug) {
    if (!slug || !catalog) return null;
    return catalog.navigation.bySlug[slug] || null;
  }
  function entryFromName(name) {
    if (!name || !catalog) return null;
    return catalog.navigation.byName[name] || null;
  }
  function entryFromLegacyIds(categoryId, subCategoryId) {
    if (!catalog || !categoryId) return null;
    const category = catalog.categoryById[Number(categoryId)];
    if (!category) return null;
    if (!subCategoryId) {
      return { categoryId: category.id, name: category.name, slug: category.slug };
    }
    const sub = catalog.subCategoryById[Number(subCategoryId)];
    if (!sub || sub.categoryId !== category.id) return null;
    return {
      categoryId: category.id,
      subCategoryId: sub.id,
      name: sub.name,
      slug: sub.slug
    };
  }
  function resolveFromSlugParams(catSlug, subSlug) {
    if (!catSlug && !subSlug) return { notFound: false };
    let catEntry = null;
    let subEntry = null;
    if (catSlug) catEntry = entryFromSlug(catSlug);
    if (subSlug) subEntry = entryFromSlug(subSlug);
    if (catSlug && !catEntry) return { notFound: true };
    if (subSlug && !subEntry) return { notFound: true };
    let categoryId = null;
    let subCategoryId = null;
    if (catEntry && catEntry.categoryId) categoryId = catEntry.categoryId;
    if (subEntry && subEntry.categoryId) categoryId = subEntry.categoryId;
    if (subEntry && subEntry.subCategoryId) subCategoryId = subEntry.subCategoryId;
    if (catEntry && catEntry.subCategoryId && !subEntry) {
      subCategoryId = catEntry.subCategoryId;
    }
    if (catEntry && subEntry && subEntry.categoryId !== catEntry.categoryId) {
      return { notFound: true };
    }
    if (!categoryId) return { notFound: true };
    const category = catalog.categoryById[categoryId];
    let sub = null;
    if (subCategoryId) {
      sub = catalog.subCategoryById[subCategoryId];
    }
    let subCategorySlug = null;
    let subCategoryName = null;
    if (sub) {
      subCategorySlug = sub.slug;
      subCategoryName = sub.name;
    }
    return {
      notFound: false,
      categoryId,
      subCategoryId,
      categorySlug: category.slug,
      subCategorySlug,
      categoryName: category.name,
      subCategoryName
    };
  }
  function buildResolvedFromEntry(entry) {
    const category = catalog.categoryById[entry.categoryId];
    let sub = null;
    if (entry.subCategoryId) {
      sub = catalog.subCategoryById[entry.subCategoryId];
    }
    let subCategorySlug = entry.slug || null;
    let subCategoryName = null;
    if (sub) {
      subCategorySlug = sub.slug;
      subCategoryName = sub.name;
    }
    return {
      notFound: false,
      categoryId: entry.categoryId,
      subCategoryId: entry.subCategoryId || null,
      categorySlug: category.slug,
      subCategorySlug,
      categoryName: category.name,
      subCategoryName
    };
  }
  function resolveCategoryParams(params) {
    if (!catalog) return { notFound: true };
    const name = params.get("name");
    if (name) {
      const entry = entryFromName(name);
      if (!entry) return { notFound: true };
      return buildResolvedFromEntry(entry);
    }
    const catSlug = params.get("cat");
    const subSlug = params.get("sub");
    if (catSlug || subSlug) {
      return resolveFromSlugParams(catSlug, subSlug);
    }
    const concernParam = params.get("concern");
    if (concernParam) {
      const concernId = Number(concernParam);
      const concern = catalog.concerns.find((c) => c.id === concernId);
      if (!concern) return { notFound: true };
      return {
        notFound: false,
        concernId,
        concernName: concern.name
      };
    }
    const legacyId = params.get("id");
    if (legacyId) {
      const entry = entryFromLegacyIds(legacyId, params.get("sub"));
      if (!entry) return { notFound: true };
      return buildResolvedFromEntry(entry);
    }
    return { notFound: false };
  }
  function getCategoryPageTitle(resolved) {
    if (resolved.notFound) return "\u0410\u043D\u0433\u0438\u043B\u0430\u043B \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439";
    if (resolved.concernName) return resolved.concernName;
    if (resolved.subCategoryName) return resolved.subCategoryName;
    if (resolved.categoryName) return resolved.categoryName;
    return "\u0411\u04AF\u0445 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D";
  }
  function normalizeCategoryPath(params) {
    const resolved = resolveCategoryParams(params);
    if (resolved.notFound) return null;
    if (!params.has("id") && !params.has("name")) return null;
    const nextPath = buildCategoryPath({
      categorySlug: resolved.categorySlug,
      subCategorySlug: resolved.subCategorySlug
    });
    if (window.location.pathname === nextPath) return null;
    return nextPath;
  }
  function bindCategoryNavLinks() {
    if (!catalog) return;
    catalog.categories.forEach((category) => {
      const mainLink = document.querySelector(
        '.cat-nav__item > a[href*="id=' + category.id + '"], .cat-nav__item > a[data-category-id="' + category.id + '"]'
      );
      if (mainLink) {
        mainLink.href = buildCategoryPath({ categorySlug: category.slug });
        mainLink.dataset.categorySlug = category.slug;
      }
      let item = null;
      if (mainLink) {
        item = mainLink.closest(".cat-nav__item");
      }
      if (!item) return;
      const subs = catalog.subCategoriesByCategoryId[category.id] || [];
      const dropdownLinks = item.querySelectorAll(".dropdown__item");
      subs.forEach((sub, index) => {
        const link = dropdownLinks[index];
        if (!link) return;
        link.href = buildCategoryPath({
          categorySlug: category.slug,
          subCategorySlug: sub.slug
        });
      });
      const seeAll = item.querySelector(".dropdown__see-all");
      if (seeAll) {
        seeAll.href = buildCategoryPath({ categorySlug: category.slug });
      }
    });
  }
  var catalog, CATEGORY_PATH_PREFIX;
  var init_categoryCatalog = __esm({
    "js/components/categoryCatalog.js"() {
      catalog = null;
      CATEGORY_PATH_PREFIX = "/c";
    }
  });

  // js/components/brandCatalog.js
  function normalizeBrandName(name) {
    return String(name || "").trim().replace(/\s+/g, " ");
  }
  function slugifyBrand(name) {
    return normalizeBrandName(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function initBrandCatalog(products) {
    const bySlug = /* @__PURE__ */ new Map();
    (products || []).forEach((product) => {
      const name = normalizeBrandName(product.brand);
      if (!name) return;
      const slug = slugifyBrand(name);
      if (!bySlug.has(slug)) {
        bySlug.set(slug, { name, slug, productCount: 0 });
      }
      bySlug.get(slug).productCount += 1;
    });
    const brands = [...bySlug.values()].sort(
      (a, b) => a.name.localeCompare(b.name, "mn")
    );
    catalog2 = { brands, bySlug };
    return catalog2;
  }
  function getBrandCatalog() {
    return catalog2;
  }
  function buildBrandPath({ brandSlug } = {}) {
    if (!brandSlug) return BRAND_PATH_PREFIX;
    return `${BRAND_PATH_PREFIX}/${brandSlug}`;
  }
  function brandPathToParams(pathname) {
    const path = pathname.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";
    if (path === BRAND_PATH_PREFIX) {
      return new URLSearchParams();
    }
    const match = path.match(/^\/b\/([^/]+)$/);
    if (!match) return null;
    const params = new URLSearchParams();
    params.set("brand", decodeURIComponent(match[1]));
    return params;
  }
  function resolveBrandParams(params) {
    if (!catalog2) return { notFound: true };
    const slug = params.get("brand");
    if (!slug) {
      return { notFound: false };
    }
    const entry = catalog2.bySlug.get(slug);
    if (!entry) return { notFound: true };
    return {
      notFound: false,
      brandSlug: entry.slug,
      brandName: entry.name
    };
  }
  function getBrandPageTitle(resolved) {
    if (resolved.notFound) return "\u0411\u0440\u044D\u043D\u0434 \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439";
    if (resolved.brandName) return resolved.brandName;
    return "\u0411\u0440\u044D\u043D\u0434";
  }
  function productMatchesBrand(product, brandName) {
    return normalizeBrandName(product.brand) === brandName;
  }
  function bindBrandNavLinks() {
    if (!catalog2) return;
    const item = document.querySelector(".cat-nav__item--brand");
    if (!item) return;
    const mainLink = item.querySelector(":scope > a");
    if (mainLink) {
      mainLink.href = buildBrandPath();
    }
    const dropdown = item.querySelector("[data-brand-dropdown]");
    if (!dropdown) return;
    const links = catalog2.brands.map(
      (brand) => `
        <a href="${buildBrandPath({ brandSlug: brand.slug })}" class="dropdown__item" data-brand-slug="${brand.slug}">
          ${brand.name}
        </a>
      `
    ).join("");
    dropdown.innerHTML = `
    ${links}
    <div class="dropdown__divider"></div>
    <a href="${buildBrandPath()}" class="dropdown__see-all">\u0411\u04AF\u0433\u0434\u0438\u0439\u0433 \u0445\u0430\u0440\u0430\u0445</a>
  `;
  }
  var catalog2, BRAND_PATH_PREFIX;
  var init_brandCatalog = __esm({
    "js/components/brandCatalog.js"() {
      catalog2 = null;
      BRAND_PATH_PREFIX = "/b";
    }
  });

  // js/navigation.js
  function isModifiedClick(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
  }
  function isExternalHref(href) {
    return /^(https?:|mailto:|tel:|javascript:)/i.test(href);
  }
  function parseLocation() {
    const legacyPath = normalizeLegacyCategoryLocation();
    if (legacyPath) {
      history.replaceState(null, "", legacyPath);
    }
    const hash = window.location.hash || "";
    if (hash.startsWith("#")) {
      const [page, query] = hash.slice(1).split("?");
      const route = page || "home";
      if (route === "category") {
        return {
          page: "category",
          params: new URLSearchParams(query || "")
        };
      }
      if (HASH_ROUTES.has(route)) {
        return {
          page: route,
          params: new URLSearchParams(query || "")
        };
      }
    }
    const brandParams = brandPathToParams(window.location.pathname);
    if (brandParams !== null) {
      return { page: "brand", params: brandParams };
    }
    const categoryParams = categoryPathToParams(window.location.pathname);
    if (categoryParams !== null) {
      return { page: "category", params: categoryParams };
    }
    const path = window.location.pathname.replace(/\/index\.html$/i, "").replace(/\/$/, "") || "/";
    if (path === "/") {
      return { page: "home", params: new URLSearchParams() };
    }
    return { page: null, params: new URLSearchParams() };
  }
  function navigateTo(path, { replace = false } = {}) {
    let next = path.startsWith("/") || path.startsWith("#") ? path : `/${path}`;
    if (next.startsWith("#")) {
      next = `/${next}`;
    }
    if (replace) {
      history.replaceState(null, "", next);
    } else {
      history.pushState(null, "", next);
    }
  }
  function setupAppNavigation(products, router2) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link || link.target === "_blank" || isModifiedClick(event)) return;
      const href = link.getAttribute("href");
      if (!href || isExternalHref(href)) return;
      if (href === "/" || href === "/index.html") {
        event.preventDefault();
        navigateTo("#home");
        router2(products);
        return;
      }
      if (href.startsWith("/c") || href.startsWith("/b")) {
        event.preventDefault();
        navigateTo(href.split("?")[0]);
        router2(products);
        return;
      }
      if (!href.startsWith("#")) return;
      if (href.startsWith("#category")) {
        event.preventDefault();
        const query = href.includes("?") ? href.split("?")[1] : "";
        const params = new URLSearchParams(query);
        const path = buildCategoryPath({
          categorySlug: params.get("cat") || void 0,
          subCategorySlug: params.get("sub") || void 0
        });
        navigateTo(path);
        router2(products);
        return;
      }
      const route = href.replace("#", "").split("?")[0] || "home";
      if (!HASH_ROUTES.has(route) && route !== "") return;
      event.preventDefault();
      navigateTo(href);
      router2(products);
    });
    window.addEventListener("popstate", () => router2(products));
  }
  var HASH_ROUTES;
  var init_navigation = __esm({
    "js/navigation.js"() {
      init_categoryCatalog();
      init_brandCatalog();
      HASH_ROUTES = /* @__PURE__ */ new Set([
        "home",
        "high-rated",
        "sales",
        "wishlist",
        "cart",
        "about",
        "location",
        "privacy",
        "terms",
        "skin-coach",
        "delivery",
        "product-detail",
        "search"
      ]);
    }
  });

  // js/pages/homePage.js
  function renderHomePage(products, container) {
    const highRated = products.filter((product) => product.rating >= 4.5).slice(0, 5);
    const sales = products.filter((product) => product.discount > 0).slice(0, 5);
    container.innerHTML = `
    <section class="hero" aria-label="hero">
      <img src="/images/hero.webp" class="hero-img" onerror="this.style.display='none'">
    </section>

    <main class="container">

      <section class="skin-concern-heading">
        <h2 id="skin-concern-heading">\u04AE\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u043D\u0438\u0439 \u0442\u04E9\u0440\u043B\u04E9\u04E9\u0440</h2>

        <ul class="strip">
          <li class="strip-item">
            <button class="strip-button" data-concern="1">
              <span class="strip-circle">
                <img src="/icons/Hydrating.svg" alt="Hydrating">
              </span>
              <span class="strip-label">\u0427\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0445</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="2">
              <span class="strip-circle">
                <img src="/icons/Calming.svg" alt="Calming">
              </span>
              <span class="strip-label">\u0422\u0430\u0439\u0432\u0448\u0440\u0443\u0443\u043B\u0430\u0445</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="3">
              <span class="strip-circle">
                <img src="/icons/Nutrition.svg" alt="Nutrition">
              </span>
              <span class="strip-label">\u0422\u044D\u0436\u044D\u044D\u043B \u04E9\u0433\u04E9\u0445</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="4">
              <span class="strip-circle">
                <img src="/icons/Whitening.svg" alt="Whitening">
              </span>
              <span class="strip-label">\u0426\u0430\u0439\u0440\u0443\u0443\u043B\u0430\u0445</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="5">
              <span class="strip-circle">
                <img src="/icons/Pores.svg" alt="Pores">
              </span>
              <span class="strip-label">\u041D\u04AF\u0445\u0436\u0438\u043B\u0442\u0438\u0439\u043D \u044D\u0441\u0440\u044D\u0433</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="6">
              <span class="strip-circle">
                <img src="/icons/pH-balancing.svg" alt="pH-balancing">
              </span>
              <span class="strip-label">pH \u0442\u044D\u043D\u0446\u0432\u044D\u0440\u0436\u04AF\u04AF\u043B\u044D\u0445</span>
            </button>
          </li>

          <li class="strip-item">
            <button class="strip-button" data-concern="7">
              <span class="strip-circle">
                <img src="/icons/Anti-aging.svg" alt="Anti-aging">
              </span>
              <span class="strip-label">\u04AE\u0440\u0447\u043B\u044D\u044D\u043D\u0438\u0439 \u044D\u0441\u0440\u044D\u0433</span>
            </button>
          </li>
        </ul>
      </section>

      <section class="high-rated">
        <div class="heading-high-rated">
          <h2 id="high-rated-product">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D \u04E9\u043D\u0434\u04E9\u0440 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</h2>
          <a href="#high-rated" class="view-all">\u0411\u04AF\u0433\u0434\u0438\u0439\u0433 \u04AF\u0437\u044D\u0445</a>
        </div>

        <div class="products">
          ${highRated.map((product) => template.cardTemplate(product)).join("")}
        </div>
      </section>

      <section class="discount-product">
        <div class="heading-sale-product">
          <h2 id="sale-product">\u0425\u044F\u043C\u0434\u0440\u0430\u043B\u0442\u0430\u0439 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</h2>
          <a href="#sales" class="view-all">\u0411\u04AF\u0433\u0434\u0438\u0439\u0433 \u04AF\u0437\u044D\u0445</a>
        </div>

        <div class="products">
          ${sales.map((product) => template.saleTemplate(product)).join("")}
        </div>
      </section>

    </main>
  `;
    container.querySelectorAll(".strip-button[data-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const concernId = Number(btn.dataset.concern);
        navigateTo(`#category?concern=${concernId}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
    });
  }
  var init_homePage = __esm({
    "js/pages/homePage.js"() {
      init_productCard();
      init_navigation();
    }
  });

  // js/pages/highRatedPage.js
  function renderHighRatedPage(products, app) {
    const highRatedProducts = products.filter((product) => product.rating >= 4.5);
    app.innerHTML = `
    <section class="high-rated">
      <h2 class="high-rated-product">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D \u04E9\u043D\u0434\u04E9\u0440 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</h2>
      <p class="product-count">${highRatedProducts.length} \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</p>

      <div class="sort">
        <select name="category" class="category">
          <option value="">\u0411\u04AF\u0445 \u0430\u043D\u0433\u0438\u043B\u0430\u043B</option>
          <option value="1">\u0410\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="2">\u041D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442</option>
          <option value="3">\u041D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442</option>
          <option value="4">\u0411\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="5">\u04AE\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
        </select>

        <select name="sorting" class="sorting">
          <option value="">\u042D\u0440\u044D\u043C\u0431\u044D\u043B\u044D\u0445</option>
          <option value="price-asc">\u04AE\u043D\u044D \u04E9\u0441\u04E9\u0445\u04E9\u04E9\u0440</option>
          <option value="price-desc">\u04AE\u043D\u044D \u0431\u0443\u0443\u0440\u0430\u0445\u0430\u0430\u0440</option>
          <option value="sale">\u0425\u044F\u043C\u0434\u0430\u0440\u0441\u0430\u043D</option>
        </select>
      </div>

      <div class="products">
        ${highRatedProducts.map((product) => template.cardTemplate(product)).join("")}
      </div>
    </section>
  `;
  }
  var init_highRatedPage = __esm({
    "js/pages/highRatedPage.js"() {
      init_productCard();
    }
  });

  // js/pages/salePage.js
  function renderSalePage(products, container) {
    let saleProducts = products.filter((product) => Number(product.discount) > 0);
    container.innerHTML = `
    <section class="discount-product page">
      <h2 class="sale-product">\u0425\u044F\u043C\u0434\u0440\u0430\u043B\u0442\u0430\u0439 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</h2>
      <p class="product-count">${saleProducts.length} \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</p>

      <div class="sort">
        <select class="category">
          <option value="">\u0411\u04AF\u0445 \u0430\u043D\u0433\u0438\u043B\u0430\u043B</option>
          <option value="skin-care">\u0410\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="make-up">\u041D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442</option>
          <option value="sun-protection">\u041D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442</option>
          <option value="body-care">\u0411\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="hair-care">\u04AE\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
        </select>

        <select class="sorting">
          <option value="">\u042D\u0440\u044D\u043C\u0431\u044D\u043B\u044D\u0445</option>
          <option value="price-asc">\u04AE\u043D\u044D \u04E9\u0441\u04E9\u0445\u04E9\u04E9\u0440</option>
          <option value="price-desc">\u04AE\u043D\u044D \u0431\u0443\u0443\u0440\u0430\u0445\u0430\u0430\u0440</option>
          <option value="new">\u0428\u0438\u043D\u044D</option>
          <option value="sale">\u0425\u044F\u043C\u0434\u0430\u0440\u0441\u0430\u043D</option>
        </select>
      </div>

      <div class="products">
        ${saleProducts.map((product) => template.saleTemplate(product)).join("")}
      </div>
    </section>
  `;
  }
  var init_salePage = __esm({
    "js/pages/salePage.js"() {
      init_productCard();
    }
  });

  // js/pages/aboutPage.js
  function renderAboutPage(container) {
    container.innerHTML = `
    <section class="about-page">
      <div class="about-page__shell">
        <header class="about-page__header">
          <span class="about-page__eyebrow">About BeautyShop</span>
          <h1>\u0411\u0438\u0434\u043D\u0438\u0439 \u0442\u0443\u0445\u0430\u0439</h1>
          <p class="about-page__intro">
            BeautyShop \u043D\u044C \u0421\u043E\u043B\u043E\u043D\u0433\u043E\u0441\u044B\u043D \u0433\u043E\u043E \u0441\u0430\u0439\u0445\u043D\u044B \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439\u0433 \u041C\u043E\u043D\u0433\u043E\u043B \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0434\u044D\u0434 \u0438\u043B\u04AF\u04AF \u043E\u0439\u043B\u0433\u043E\u043C\u0436\u0442\u043E\u0439, \u043D\u0430\u0439\u0434\u0432\u0430\u0440\u0442\u0430\u0439, \u0433\u043E\u0451\u043C\u0441\u043E\u0433 \u0442\u0443\u0440\u0448\u043B\u0430\u0433\u0430\u0430\u0440 \u0445\u04AF\u0440\u0433\u044D\u0445 \u0437\u043E\u0440\u0438\u043B\u0433\u043E\u0442\u043E\u0439 \u043E\u043D\u043B\u0430\u0439\u043D \u0434\u044D\u043B\u0433\u04AF\u04AF\u0440 \u044E\u043C.
          </p>
        </header>

        <div class="about-page__hero-media">
          <img src="/images/about-beautyshop.webp" alt="BeautyShop \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0433\u0430 \u0437\u0443\u0440\u0430\u0433">
        </div>

        <section class="about-page__section">
          <div class="about-page__section-number">01</div>
          <div class="about-page__section-body">
            <h2>BeautyShop \u0433\u044D\u0436 \u0445\u044D\u043D \u0431\u044D?</h2>
            <p>
              \u0421\u043E\u043B\u043E\u043D\u0433\u043E\u0441\u044B\u043D \u0433\u043E\u043E \u0441\u0430\u0439\u0445\u043D\u044B \u0441\u0430\u043B\u0431\u0430\u0440 \u043D\u044C \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438, \u04AF\u0440 \u0434\u04AF\u043D, \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u044D\u044D\u043B\u0442\u044D\u0439 \u043D\u0430\u0439\u0440\u043B\u0430\u0433\u0430\u0430\u0440\u0430\u0430 \u0434\u044D\u043B\u0445\u0438\u0439\u0434 \u0442\u0430\u043D\u0438\u0433\u0434\u0441\u0430\u043D. BeautyShop \u043D\u044C \u044D\u043D\u044D \u0434\u0430\u0432\u0443\u0443 \u0442\u0430\u043B\u044B\u0433 \u04E9\u0434\u04E9\u0440 \u0442\u0443\u0442\u043C\u044B\u043D \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u044D\u043D\u0434 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u043E\u0439\u043B\u0433\u043E\u043C\u0436\u0442\u043E\u0439, \u043D\u0430\u0439\u0434\u0432\u0430\u0440\u0442\u0430\u0439 \u0431\u0430\u0439\u0434\u043B\u0430\u0430\u0440 \u0445\u04AF\u0440\u0433\u044D\u0445\u0438\u0439\u0433 \u0437\u043E\u0440\u044C\u0434\u043E\u0433.
            </p>
            <p>
              \u0411\u0438\u0434 \u0430\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430, \u043D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442, \u0431\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430\u043D\u044B \u04E9\u043D\u0434\u04E9\u0440 \u0447\u0430\u043D\u0430\u0440\u0442\u0430\u0439, \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0442\u0430\u0439 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u04AF\u04AF\u0434\u0438\u0439\u0433 \u0430\u043B\u0431\u0430\u043D \u0451\u0441\u043D\u044B \u044D\u0445 \u04AF\u04AF\u0441\u0432\u044D\u0440\u044D\u044D\u0441 \u0448\u0443\u0443\u0434 \u0441\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0436, \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0434\u044D\u0434 \u0441\u043E\u043D\u0433\u043E\u043B\u0442\u043E\u043E \u0438\u043B\u04AF\u04AF \u0445\u044F\u043B\u0431\u0430\u0440 \u0445\u0438\u0439\u0445\u044D\u0434 \u0442\u0443\u0441\u0430\u043B\u0434\u0430\u0433.
            </p>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">02</div>
          <div class="about-page__section-body">
            <h2>\u042E\u0443\u0433 \u044D\u0440\u0445\u044D\u043C\u043B\u044D\u0434\u044D\u0433 \u0432\u044D?</h2>
            <ul class="about-page__value-list">
              <li>\u0411\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0442\u0430\u0439 \u0447\u0430\u043D\u0430\u0440</li>
              <li>\u0428\u0443\u0434\u0430\u0440\u0433\u0430, \u043E\u0439\u043B\u0433\u043E\u043C\u0436\u0442\u043E\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B</li>
              <li>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u0442\u04E9\u0432\u0442\u044D\u0439 \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D</li>
              <li>\u041E\u0440\u0447\u0438\u043D \u04AF\u0435\u0438\u0439\u043D \u0433\u043E\u043E \u0441\u0430\u0439\u0445\u043D\u044B \u0448\u0438\u0439\u0434\u044D\u043B</li>
            </ul>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">03</div>
          <div class="about-page__section-body">
            <h2>\u0411\u0438\u0434\u043D\u0438\u0439\u0433 \u0441\u043E\u043D\u0433\u043E\u0445 \u0448\u0430\u043B\u0442\u0433\u0430\u0430\u043D</h2>
            <div class="about-page__reason-grid">
              <article class="about-page__reason-item">
                <h3>\u04E8\u043D\u0434\u04E9\u0440 \u0447\u0430\u043D\u0430\u0440</h3>
                <p>\u0411\u0438\u0434 \u0437\u04E9\u0432\u0445\u04E9\u043D \u0430\u043B\u0431\u0430\u043D \u0451\u0441\u043D\u044B \u044D\u0445 \u04AF\u04AF\u0441\u0432\u044D\u0440\u044D\u044D\u0441 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043D\u0438\u0439\u043B\u04AF\u04AF\u043B\u0434\u044D\u0433 \u0442\u0443\u043B \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u0431\u04AF\u0440 \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0442\u0430\u0439 \u0441\u043E\u043D\u0433\u043E\u043B\u0442 \u0445\u0438\u0439\u0434\u044D\u0433.</p>
              </article>
              <article class="about-page__reason-item">
                <h3>\u04E8\u0440\u0433\u04E9\u043D \u0441\u043E\u043D\u0433\u043E\u043B\u0442</h3>
                <p>\u0410\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430, \u043D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442, \u0431\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430\u043D\u044B \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u044D\u0440\u044D\u043B\u0442\u0442\u044D\u0439 \u0431\u043E\u043B\u043E\u043D \u0448\u0438\u043D\u044D\u043B\u044D\u0433 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u04AF\u04AF\u0434\u0438\u0439\u0433 \u043D\u044D\u0433 \u0434\u043E\u0440\u043E\u043E\u0441 \u0441\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u043D\u043E.</p>
              </article>
              <article class="about-page__reason-item">
                <h3>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D</h3>
                <p>\u0411\u0438\u0434 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u0441\u044D\u0442\u0433\u044D\u043B \u0445\u0430\u043D\u0430\u043C\u0436\u0438\u0439\u0433 \u043D\u044D\u0433\u0434\u04AF\u0433\u044D\u044D\u0440\u0442 \u0442\u0430\u0432\u044C\u0436, \u043E\u0439\u043B\u0433\u043E\u043C\u0436\u0442\u043E\u0439, \u043D\u0430\u0439\u0440\u0441\u0430\u0433, \u043C\u044D\u0440\u0433\u044D\u0436\u043B\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u0433 \u0445\u04AF\u0440\u0433\u044D\u0445\u0438\u0439\u0433 \u0437\u043E\u0440\u044C\u0434\u043E\u0433.</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;
  }
  var init_aboutPage = __esm({
    "js/pages/aboutPage.js"() {
    }
  });

  // js/pages/locationPage.js
  function renderLocationPage(container) {
    container.innerHTML = `
    <section class="about-page">
      <div class="about-page__shell">
        <header class="about-page__header">
          <span class="about-page__eyebrow">BeautyShop</span>
          <h1>\u0411\u0430\u0439\u0440\u0448\u0438\u043B</h1>
          <p class="about-page__intro">
            \u041C\u0430\u043D\u0430\u0439 \u0434\u044D\u043B\u0433\u04AF\u04AF\u0440\u0438\u0439\u043D \u0445\u0430\u044F\u0433, \u0430\u0436\u043B\u044B\u043D \u0446\u0430\u0433 \u0431\u043E\u043B\u043E\u043D \u0445\u043E\u043B\u0431\u043E\u043E \u0431\u0430\u0440\u0438\u0445 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B.
          </p>
        </header>

        <section class="about-page__section">
          <div class="about-page__section-number">01</div>
          <div class="about-page__section-body">
            <h2>\u0425\u0430\u044F\u0433</h2>
            <p>\u0423\u043B\u0430\u0430\u043D\u0431\u0430\u0430\u0442\u0430\u0440 \u0445\u043E\u0442, \u0421\u04AF\u0445\u0431\u0430\u0430\u0442\u0430\u0440 \u0434\u04AF\u04AF\u0440\u044D\u0433</p>
            <p>\u0418-\u043C\u044D\u0439\u043B: <a href="mailto:info@beautyshop.mn">info@beautyshop.mn</a></p>
            <p>\u0423\u0442\u0430\u0441: <a href="tel:77777777">7777-7777</a></p>
          </div>
        </section>

        <section class="about-page__section">
          <div class="about-page__section-number">02</div>
          <div class="about-page__section-body">
            <h2>\u0410\u0436\u043B\u044B\u043D \u0446\u0430\u0433</h2>
            <p>\u0414\u0430\u0432\u0430\u0430 \u2013 \u0411\u0430\u0430\u0441\u0430\u043D: 10:00 \u2013 19:00</p>
            <p>\u0411\u044F\u043C\u0431\u0430 \u2013 \u041D\u044F\u043C: 11:00 \u2013 18:00</p>
          </div>
        </section>
      </div>
    </section>
  `;
  }
  var init_locationPage = __esm({
    "js/pages/locationPage.js"() {
    }
  });

  // js/pages/privacyPage.js
  function renderPrivacyPage(container) {
    container.innerHTML = `
    <section class="privacy-page">
      <div class="privacy-page__shell">
        <header class="privacy-page__header">
          <span class="privacy-page__eyebrow">Privacy Policy</span>
          <h1>\u0410\u044E\u0443\u043B\u0433\u04AF\u0439 \u0431\u0430\u0439\u0434\u0430\u043B \u0431\u0430 \u043D\u0443\u0443\u0446\u043B\u0430\u043B</h1>
          <p class="privacy-page__intro">
            BeautyShop \u043D\u044C \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B, \u0430\u044E\u0443\u043B\u0433\u04AF\u0439 \u0431\u0430\u0439\u0434\u043B\u044B\u0433 \u044D\u0440\u0445\u044D\u043C\u043B\u044D\u0434\u044D\u0433. \u042D\u043D\u044D\u0445\u04AF\u04AF \u0431\u043E\u0434\u043B\u043E\u0433\u043E \u043D\u044C \u043C\u0430\u043D\u0430\u0439 \u0441\u0430\u0439\u0442 \u0442\u0430\u043D\u044B \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u044F\u043C\u0430\u0440 \u0437\u043E\u0440\u0438\u043B\u0433\u043E\u043E\u0440 \u0446\u0443\u0433\u043B\u0443\u0443\u043B\u0436, \u0445\u044D\u0440\u0445\u044D\u043D \u0430\u0448\u0438\u0433\u043B\u0430\u0436, \u0445\u044D\u0440\u0445\u044D\u043D \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0434\u0433\u0438\u0439\u0433 \u0442\u043E\u0432\u0447 \u0442\u0430\u0439\u043B\u0431\u0430\u0440\u043B\u0430\u043D\u0430.
          </p>
          <div class="privacy-page__meta">
            <span>BeautyShop</span>
            <span>\u041D\u0443\u0443\u0446\u043B\u0430\u043B\u044B\u043D \u0431\u043E\u0434\u043B\u043E\u0433\u043E</span>
          </div>
        </header>

        <div class="privacy-page__sections">
          <article class="privacy-page__section">
            <div class="privacy-page__section-number">01</div>
            <div class="privacy-page__section-body">
              <h2>\u041C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0446\u0443\u0433\u043B\u0443\u0443\u043B\u0430\u0445</h2>
              <p>
                \u0411\u0438\u0434 \u0442\u0430\u043D\u044B \u043D\u044D\u0440, \u0443\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440, \u0438-\u043C\u044D\u0439\u043B, \u0445\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u0445\u0430\u044F\u0433 \u0437\u044D\u0440\u044D\u0433 \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u043D\u0434 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0437\u04E9\u0432\u0445\u04E9\u043D \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0431\u043E\u043B\u043E\u0432\u0441\u0440\u0443\u0443\u043B\u0430\u0445, \u0445\u04AF\u0440\u0433\u044D\u043B\u0442 \u0437\u043E\u0445\u0438\u043E\u043D \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u0430\u0445, \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D \u04AF\u0437\u04AF\u04AF\u043B\u044D\u0445 \u0437\u043E\u0440\u0438\u043B\u0433\u043E\u043E\u0440 \u0430\u0432\u043D\u0430.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">02</div>
            <div class="privacy-page__section-body">
              <h2>\u041C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0430\u0448\u0438\u0433\u043B\u0430\u0445</h2>
              <p>
                \u0426\u0443\u0433\u043B\u0443\u0443\u043B\u0441\u0430\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0443\u0443\u043B\u0430\u043B\u0442, \u0442\u04E9\u043B\u04E9\u0432 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u0445, \u0445\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u04AF\u0439\u043B \u044F\u0432\u0446\u044B\u0433 \u0437\u043E\u0445\u0438\u0446\u0443\u0443\u043B\u0430\u0445, \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u0445\u04AF\u0441\u044D\u043B\u0442 \u0431\u043E\u043B\u043E\u043D \u0430\u0441\u0443\u0443\u043B\u0442\u0430\u0434 \u0445\u0430\u0440\u0438\u0443 \u04E9\u0433\u04E9\u0445\u04E9\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u043D\u0430.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">03</div>
            <div class="privacy-page__section-body">
              <h2>\u041C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u0445</h2>
              <p>
                \u0422\u0430\u043D\u044B \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0445\u044F\u0437\u0433\u0430\u0430\u0440\u043B\u0430\u0433\u0434\u043C\u0430\u043B \u0445\u0430\u043D\u0434\u0430\u043B\u0442\u0442\u0430\u0439 \u043E\u0440\u0447\u0438\u043D\u0434 \u0445\u0430\u0434\u0433\u0430\u043B\u0436, \u0437\u04E9\u0432\u0445\u04E9\u043D \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439 \u0430\u0436\u0438\u043B\u0442\u043D\u0443\u0443\u0434 \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u043D\u0438\u0439 \u0445\u04AF\u0440\u044D\u044D\u043D\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439 \u0431\u0430\u0439\u043D\u0430. \u0411\u0438\u0434 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0430\u044E\u0443\u043B\u0433\u04AF\u0439 \u0431\u0430\u0439\u0434\u043B\u044B\u0433 \u0430\u043B\u0434\u0430\u0433\u0434\u0443\u0443\u043B\u0430\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u0445 \u04AF\u043D\u0434\u0441\u044D\u043D \u0437\u0430\u0440\u0447\u043C\u0443\u0443\u0434\u044B\u0433 \u043C\u04E9\u0440\u0434\u04E9\u043D\u04E9.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">04</div>
            <div class="privacy-page__section-body">
              <h2>\u0413\u0443\u0440\u0430\u0432\u0434\u0430\u0433\u0447 \u044D\u0442\u0433\u044D\u044D\u0434\u044D\u0434 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0434\u0430\u043C\u0436\u0443\u0443\u043B\u0430\u0445</h2>
              <p>
                \u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0445\u0443\u0443\u043B\u044C\u0434 \u0437\u0430\u0430\u0441\u0430\u043D \u04AF\u043D\u0434\u044D\u0441\u043B\u044D\u043B\u044D\u044D\u0441 \u0431\u0443\u0441\u0430\u0434 \u0442\u043E\u0445\u0438\u043E\u043B\u0434\u043E\u043B\u0434 \u0437\u04E9\u0432\u0448\u04E9\u04E9\u0440\u04E9\u043B\u0433\u04AF\u0439\u0433\u044D\u044D\u0440 \u0431\u0443\u0441\u0434\u0430\u0434 \u0434\u0430\u043C\u0436\u0443\u0443\u043B\u0430\u0445\u0433\u04AF\u0439. \u0425\u04AF\u0440\u0433\u044D\u043B\u0442, \u0442\u04E9\u043B\u0431\u04E9\u0440 \u0437\u044D\u0440\u044D\u0433 \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u0442\u044D\u0439 \u0445\u043E\u043B\u0431\u043E\u043E\u0442\u043E\u0439 \u0437\u0430\u0439\u043B\u0448\u0433\u04AF\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0437\u04E9\u0432\u0445\u04E9\u043D \u0442\u0443\u0445\u0430\u0439\u043D \u04AF\u0439\u043B \u044F\u0432\u0446\u0430\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0433\u0434\u0430\u043D\u0430.
              </p>
            </div>
          </article>

          <article class="privacy-page__section">
            <div class="privacy-page__section-number">05</div>
            <div class="privacy-page__section-body">
              <h2>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u044D\u0440\u0445</h2>
              <p>
                \u0422\u0430 \u04E9\u04E9\u0440\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0430\u043B\u0430\u0430\u0440 \u0430\u0441\u0443\u0443\u0445, \u0448\u0438\u043D\u044D\u0447\u043B\u044D\u0445, \u0437\u0430\u0441\u0432\u0430\u0440\u043B\u0443\u0443\u043B\u0430\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442 \u0433\u0430\u0440\u0433\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439. \u041C\u0430\u043D\u0430\u0439 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u043D\u0438\u0439 \u0441\u0443\u0432\u0433\u0430\u0430\u0440 \u0445\u043E\u043B\u0431\u043E\u0433\u0434\u043E\u043D \u043D\u044D\u043C\u044D\u043B\u0442 \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u0430\u0432\u0447 \u0431\u043E\u043B\u043D\u043E.
              </p>
            </div>
          </article>
        </div>

        <section class="privacy-page__footer-note">
          <h3>\u0410\u043D\u0445\u0430\u0430\u0440\u0430\u0445 \u0437\u04AF\u0439\u043B</h3>
          <p>
            \u042D\u043D\u044D\u0445\u04AF\u04AF \u0431\u043E\u0434\u043B\u043E\u0433\u043E \u043D\u044C \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D \u0441\u0430\u0439\u0436\u0440\u0430\u0445\u044B\u043D \u0445\u044D\u0440\u044D\u044D\u0440 \u0448\u0438\u043D\u044D\u0447\u043B\u044D\u0433\u0434\u044D\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u0441\u04AF\u04AF\u043B\u0438\u0439\u043D \u0445\u0443\u0432\u0438\u043B\u0431\u0430\u0440 \u043D\u044C \u04AF\u0440\u0433\u044D\u043B\u0436 \u044D\u043D\u044D \u0445\u0443\u0443\u0434\u0441\u0430\u043D\u0434 \u0431\u0430\u0439\u0440\u043B\u0430\u043D\u0430.
          </p>
        </section>
      </div>
    </section>
  `;
  }
  var init_privacyPage = __esm({
    "js/pages/privacyPage.js"() {
    }
  });

  // js/pages/termsPage.js
  function renderTermsPage(container) {
    container.innerHTML = `
    <section class="terms-page">
      <div class="terms-page__shell">
        <header class="terms-page__header">
          <span class="terms-page__eyebrow">Return Policy</span>
          <h1>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u0431\u0443\u0446\u0430\u0430\u043B\u0442\u044B\u043D \u043D\u04E9\u0445\u0446\u04E9\u043B</h1>
          <p class="terms-page__intro">
            \u041C\u0430\u043D\u0430\u0439 \u0434\u044D\u043B\u0433\u04AF\u04AF\u0440\u044D\u044D\u0441 \u0445\u0443\u0434\u0430\u043B\u0434\u0430\u043D \u0430\u0432\u0441\u0430\u043D \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043D\u044C \u0442\u043E\u0434\u043E\u0440\u0445\u043E\u0439 \u043D\u04E9\u0445\u0446\u04E9\u043B\u0438\u0439\u043D \u0434\u0430\u0433\u0443\u0443 \u0431\u0443\u0446\u0430\u0430\u0433\u0434\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439. \u0411\u0443\u0446\u0430\u0430\u043B\u0442\u044B\u043D \u0445\u04AF\u0441\u044D\u043B\u0442\u0438\u0439\u0433 \u0430\u043B\u044C \u0431\u043E\u043B\u043E\u0445 \u0445\u0443\u0440\u0434\u0430\u043D, \u043E\u0439\u043B\u0433\u043E\u043C\u0436\u0442\u043E\u0439, \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0434 \u044D\u044D\u043B\u0442\u044D\u0439 \u0431\u0430\u0439\u0434\u043B\u0430\u0430\u0440 \u0448\u0438\u0439\u0434\u0432\u044D\u0440\u043B\u044D\u0445\u0438\u0439\u0433 \u0437\u043E\u0440\u044C\u0434\u043E\u0433.
          </p>
        </header>

        <div class="terms-page__sections">
          <article class="terms-page__section">
            <div class="terms-page__section-number">01</div>
            <div class="terms-page__section-body">
              <h2>\u0411\u0443\u0446\u0430\u0430\u043B\u0442\u044B\u043D \u0445\u0443\u0433\u0430\u0446\u0430\u0430</h2>
              <p>\u0425\u0443\u0434\u0430\u043B\u0434\u0430\u043D \u0430\u0432\u0441\u0430\u043D \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439\u0433 \u0430\u0432\u0441\u043D\u0430\u0430\u0441 \u0445\u043E\u0439\u0448 7 \u0445\u043E\u043D\u043E\u0433\u0438\u0439\u043D \u0434\u043E\u0442\u043E\u0440 \u0431\u0443\u0446\u0430\u0430\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442 \u0433\u0430\u0440\u0433\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439.</p>
            </div>
          </article>

          <article class="terms-page__section">
            <div class="terms-page__section-number">02</div>
            <div class="terms-page__section-body">
              <h2>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u0442\u04E9\u043B\u04E9\u0432</h2>
              <p>\u0411\u0430\u0440\u0430\u0430 \u043D\u044C \u0437\u0430\u0434\u043B\u0430\u0430\u0433\u04AF\u0439, \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u044D\u0433\u04AF\u0439, \u0441\u0430\u0432 \u0431\u0430\u0433\u043B\u0430\u0430 \u0431\u043E\u043B\u043E\u043D \u0445\u0430\u0439\u0440\u0446\u0430\u0433 \u043D\u044C \u0431\u04AF\u0440\u044D\u043D \u0431\u04AF\u0442\u044D\u043D \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439.</p>
            </div>
          </article>

          <article class="terms-page__section">
            <div class="terms-page__section-number">03</div>
            <div class="terms-page__section-body">
              <h2>\u0425\u0443\u0434\u0430\u043B\u0434\u0430\u043D \u0430\u0432\u0430\u043B\u0442\u044B\u043D \u0431\u0430\u0440\u0438\u043C\u0442</h2>
              <p>\u0411\u0443\u0446\u0430\u0430\u043B\u0442 \u0445\u0438\u0439\u0445\u0434\u044D\u044D \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B \u044D\u0441\u0432\u044D\u043B \u0445\u0443\u0434\u0430\u043B\u0434\u0430\u043D \u0430\u0432\u0430\u043B\u0442\u044B\u043D \u0431\u0430\u0440\u0438\u043C\u0442 \u0437\u0430\u0430\u0432\u0430\u043B \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439.</p>
            </div>
          </article>
        </div>

        <section class="terms-page__highlight">
          <h3>\u0410\u043D\u0445\u0430\u0430\u0440\u0430\u0445 \u0437\u04AF\u0439\u043B</h3>
          <ul class="terms-page__list">
            <li>\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0441\u044D\u043D \u0431\u043E\u043B\u043E\u043D \u044D\u0432\u0434\u044D\u0440\u0441\u044D\u043D \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u0431\u0443\u0446\u0430\u0430\u0433\u0434\u0430\u0445\u0433\u04AF\u0439.</li>
            <li>\u0411\u0443\u0446\u0430\u0430\u043B\u0442\u044B\u043D \u0448\u0438\u0439\u0434\u0432\u044D\u0440\u0438\u0439\u0433 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u0442\u04E9\u043B\u04E9\u0432 \u0448\u0430\u043B\u0433\u0430\u0441\u043D\u044B \u0434\u0430\u0440\u0430\u0430 \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0443\u0443\u043B\u043D\u0430.</li>
            <li>\u041D\u044D\u043C\u044D\u043B\u0442 \u0430\u0441\u0443\u0443\u043B\u0442 \u0431\u0430\u0439\u0432\u0430\u043B \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D\u0442\u044D\u0439 \u0445\u043E\u043B\u0431\u043E\u0433\u0434\u043E\u043D\u043E \u0443\u0443.</li>
          </ul>
        </section>
      </div>
    </section>
  `;
  }
  var init_termsPage = __esm({
    "js/pages/termsPage.js"() {
    }
  });

  // js/pages/skinCoachPage.js
  function getProductSearchText(product) {
    const ingredients = Array.isArray(product.ingredients) ? product.ingredients.join(" ") : String(product.ingredients || "");
    return [
      product.name,
      product.brand,
      product.description,
      product.usage,
      ingredients
    ].join(" ").toLowerCase();
  }
  function scoreProduct(product, skinType, problemType) {
    if (product.categoryId !== 1) return -1;
    const text = getProductSearchText(product);
    const concernIds = Array.isArray(product.concernIds) ? product.concernIds : [];
    let score = Number(product.rating || 0);
    problemConcernMap[problemType]?.forEach((id) => {
      if (concernIds.includes(id)) score += 4;
    });
    skinConcernMap[skinType]?.forEach((id) => {
      if (concernIds.includes(id)) score += 2;
    });
    problemKeywordMap[problemType]?.forEach((keyword) => {
      if (text.includes(keyword)) score += 2;
    });
    skinKeywordMap[skinType]?.forEach((keyword) => {
      if (text.includes(keyword)) score += 1;
    });
    return score;
  }
  function getRecommendedProducts(products, skinType, problemType) {
    const ranked = products.filter((product) => product.categoryId === 1).map((product) => ({
      ...product,
      coachScore: scoreProduct(product, skinType, problemType)
    })).sort((a, b) => b.coachScore - a.coachScore || b.rating - a.rating || b.reviews - a.reviews);
    return ranked.slice(0, 3);
  }
  function renderSkinCoachPage(products, container) {
    container.innerHTML = `
    <section class="skin-coach-page">
      <div class="skin-coach-page__shell">
        <header class="skin-coach-page__hero">
          <div class="skin-coach-page__hero-copy">
            <h1 class="skin-coach-page__title">Skin Coach</h1>
            <p>
              \u0410\u0440\u044C\u0441\u043D\u044B \u0442\u04E9\u0440\u04E9\u043B \u0431\u043E\u043B\u043E\u043D \u0442\u0430\u043D\u044B \u0433\u043E\u043B \u0430\u0441\u0443\u0443\u0434\u043B\u044B\u0433 \u0441\u043E\u043D\u0433\u043E\u0445\u043E\u0434 \u0442\u0430\u043D\u044C \u0442\u043E\u0445\u0438\u0440\u0441\u043E\u043D \u04AF\u043D\u0434\u0441\u044D\u043D \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430\u043D\u044B \u0447\u0438\u0433\u043B\u044D\u043B\u0438\u0439\u0433 \u0441\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0436, \u04E9\u0434\u04E9\u0440 \u0442\u0443\u0442\u043C\u044B\u043D routine-\u044D\u044D \u0438\u043B\u04AF\u04AF \u0437\u04E9\u0432 \u044D\u0445\u043B\u04AF\u04AF\u043B\u044D\u0445\u044D\u0434 \u0442\u0443\u0441\u0430\u043B\u043D\u0430.
            </p>
          </div>
        </header>

        <div class="skin-coach-page__form-grid">
          <section class="skin-coach-page__panel">
            <h2>1. \u0422\u0430\u043D\u044B \u0430\u0440\u044C\u0441 \u044F\u043C\u0430\u0440 \u0432\u044D?</h2>
            <div class="skin-coach-page__options">
              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="oily">
                <span class="skin-coach-page__option-box">
                  <strong>\u0422\u043E\u0441\u043B\u043E\u0433</strong>
                  <small>\u0422\u043E\u0441 \u044F\u043B\u0433\u0430\u0440\u0430\u043B\u0442 \u0438\u0445\u0442\u044D\u0439, \u0433\u044F\u043B\u0430\u043B\u0437\u0430\u0445 \u0445\u0430\u043D\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="dry">
                <span class="skin-coach-page__option-box">
                  <strong>\u0425\u0443\u0443\u0440\u0430\u0439</strong>
                  <small>\u0427\u0438\u0439\u0433 \u0434\u0443\u0442\u0430\u0433\u0434\u0430\u0445, \u0442\u0430\u0442\u0430\u043B\u0434\u0430\u0445 \u043C\u044D\u0434\u0440\u044D\u043C\u0436\u0442\u044D\u0439</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="skin" value="combo">
                <span class="skin-coach-page__option-box">
                  <strong>\u0425\u043E\u043B\u0438\u043C\u043E\u0433</strong>
                  <small>T-zone \u0442\u043E\u0441\u043B\u043E\u0433, \u0431\u0443\u0441\u0430\u0434 \u0445\u044D\u0441\u044D\u0433 \u0445\u0443\u0443\u0440\u0430\u0439</small>
                </span>
              </label>
            </div>
          </section>

          <section class="skin-coach-page__panel">
            <h2>2. \u0422\u0430\u043D\u044B \u0433\u043E\u043B \u0430\u0441\u0443\u0443\u0434\u0430\u043B?</h2>
            <div class="skin-coach-page__options">
              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="acne">
                <span class="skin-coach-page__option-box">
                  <strong>\u0411\u0430\u0442\u0433\u0430</strong>
                  <small>\u041D\u04AF\u0445\u0436\u0438\u043B\u0442, \u04AF\u0440\u044D\u0432\u0441\u044D\u043B, \u0438\u043B\u04AF\u04AF\u0434\u044D\u043B \u0442\u043E\u0441\u043D\u044B \u0430\u0441\u0443\u0443\u0434\u0430\u043B</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="dryness">
                <span class="skin-coach-page__option-box">
                  <strong>\u0425\u0443\u0443\u0440\u0430\u0439\u0448\u0438\u043B\u0442</strong>
                  <small>\u0427\u0438\u0439\u0433 \u0430\u043B\u0434\u0430\u043B\u0442, \u0448\u0438\u0440\u04AF\u04AF\u043D \u043C\u044D\u0434\u0440\u044D\u043C\u0436, \u0445\u0430\u043B\u044C\u0441\u0440\u0430\u0445</small>
                </span>
              </label>

              <label class="skin-coach-page__option">
                <input type="radio" name="problem" value="pigment">
                <span class="skin-coach-page__option-box">
                  <strong>\u041D\u04E9\u0441\u04E9\u04E9 \u0442\u043E\u043B\u0431\u043E</strong>
                  <small>\u04E8\u043D\u0433\u04E9\u043D\u0438\u0439 \u0436\u0438\u0433\u0434 \u0431\u0443\u0441 \u0431\u0430\u0439\u0434\u0430\u043B, \u0431\u0430\u0440\u0430\u0430\u043D \u0442\u043E\u043B\u0431\u043E</small>
                </span>
              </label>
            </div>
          </section>
        </div>

        <div class="skin-coach-page__actions">
          <button class="skin-coach-page__submit" id="skinCoachBtn" type="button">\u0417\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9 \u0430\u0432\u0430\u0445</button>
        </div>

        <div class="skin-coach-page__result" id="skinCoachResult" hidden></div>
      </div>
    </section>
  `;
    const btn = container.querySelector("#skinCoachBtn");
    const result = container.querySelector("#skinCoachResult");
    const recommendations = {
      oily: {
        acne: "\u0422\u0430\u043D\u0434 \u0437\u04E9\u04E9\u043B\u04E9\u043D \u0433\u0435\u043B\u044D\u043D \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0447, \u0442\u043E\u0441\u043B\u043E\u0433 \u0442\u044D\u043D\u0446\u0432\u044D\u0440\u0436\u04AF\u04AF\u043B\u044D\u0445 \u0441\u0435\u0440\u0443\u043C, non-comedogenic \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, SPF \u0442\u043E\u0433\u0442\u043C\u043E\u043B \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0445\u0438\u0439\u0433 \u0437\u04E9\u0432\u043B\u04E9\u0436 \u0431\u0430\u0439\u043D\u0430.",
        dryness: "\u0422\u043E\u0441\u043B\u043E\u0433 \u0447 \u0433\u044D\u0441\u044D\u043D \u0447\u0438\u0439\u0433 \u0434\u0443\u0442\u0430\u0433\u0434\u0430\u0436 \u0431\u043E\u043B\u043D\u043E. \u0418\u0439\u043C\u0434 \u0437\u04E9\u04E9\u043B\u04E9\u043D \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u044D\u044D, \u0443\u0441\u0430\u043D \u0441\u0443\u0443\u0440\u044C\u0442\u0430\u0439 \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447 \u0441\u0435\u0440\u0443\u043C, \u0445\u04E9\u043D\u0433\u04E9\u043D \u0433\u0435\u043B\u044C \u0442\u043E\u0441, SPF \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u044D\u0440\u044D\u0439.",
        pigment: "\u0422\u043E\u0441\u043B\u043E\u0433 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u0432\u0438\u0442\u0430\u043C\u0438\u043D C \u044D\u0441\u0432\u044D\u043B \u043D\u0438\u0430\u0446\u0438\u043D\u0430\u043C\u0438\u0434\u0442\u0430\u0439 \u0441\u0435\u0440\u0443\u043C, \u0445\u04E9\u043D\u0433\u04E9\u043D \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, \u04E9\u0434\u04E9\u0440 \u0431\u04AF\u0440 SPF \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0445 routine \u0442\u043E\u0445\u0438\u0440\u043E\u043C\u0436\u0442\u043E\u0439."
      },
      dry: {
        acne: "\u0425\u0443\u0443\u0440\u0430\u0439 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u0431\u0430\u0442\u0433\u0430\u043D\u044B \u044D\u0441\u0440\u044D\u0433 \u0445\u044D\u0442 \u0445\u04AF\u0447\u0442\u044D\u0439 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u044D\u044D\u0441 \u0437\u0430\u0439\u043B\u0441\u0445\u0438\u0439\u0436, \u0437\u04E9\u04E9\u043B\u04E9\u043D \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0447, barrier \u0434\u044D\u043C\u0436\u0438\u0445 \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, SPF \u0441\u043E\u043D\u0433\u043E\u0445\u044B\u0433 \u0437\u04E9\u0432\u043B\u04E9\u0436 \u0431\u0430\u0439\u043D\u0430.",
        dryness: "\u0422\u0430\u043D\u0434 \u0441\u04AF\u04AF\u043D \u044D\u0441\u0432\u044D\u043B \u043A\u0440\u0435\u043C\u044D\u043D \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0447, \u0433\u0438\u0430\u043B\u0443\u0440\u043E\u043D\u0442\u043E\u0439 \u0441\u0435\u0440\u0443\u043C, \u0442\u044D\u0436\u044D\u044D\u043B\u043B\u044D\u0433 \u0442\u043E\u0441\u043E\u043D \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, SPF \u0442\u043E\u0445\u0438\u0440\u043E\u043C\u0436\u0442\u043E\u0439.",
        pigment: "\u0425\u0443\u0443\u0440\u0430\u0439 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u04E9\u043D\u0433\u04E9 \u0441\u044D\u0440\u0433\u044D\u044D\u0445 \u0441\u0435\u0440\u0443\u043C, \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0445 \u0442\u043E\u0441, \u0430\u0440\u044C\u0441\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442\u044B\u043D \u0434\u0430\u0432\u0445\u0430\u0440\u0433\u044B\u0433 \u0434\u044D\u043C\u0436\u0438\u0445 routine \u0438\u043B\u04AF\u04AF \u04AF\u0440 \u0434\u04AF\u043D\u0442\u044D\u0439."
      },
      combo: {
        acne: "\u0425\u043E\u043B\u0438\u043C\u043E\u0433 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 T-zone \u0445\u044D\u0441\u044D\u0433\u0442 \u0442\u044D\u043D\u0446\u0432\u044D\u0440\u0436\u04AF\u04AF\u043B\u044D\u0445 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430, \u0431\u0443\u0441\u0430\u0434 \u0445\u044D\u0441\u044D\u0433\u0442 \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0445 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u0445\u043E\u0441\u043B\u0443\u0443\u043B\u0436 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0445\u0438\u0439\u0433 \u0437\u04E9\u0432\u043B\u04E9\u0436 \u0431\u0430\u0439\u043D\u0430.",
        dryness: "\u0425\u043E\u043B\u0438\u043C\u043E\u0433 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u0445\u04E9\u043D\u0433\u04E9\u043D \u0445\u044D\u0440\u043D\u044D\u044D \u0447\u0438\u0439\u0433 \u04E9\u0433\u0434\u04E9\u0433 \u0441\u0435\u0440\u0443\u043C, \u0445\u044D\u0441\u044D\u0433\u0447\u0438\u043B\u0441\u044D\u043D \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430, SPF \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0445 \u043D\u044C \u0442\u043E\u0445\u0438\u0440\u043E\u043C\u0436\u0442\u043E\u0439.",
        pigment: "\u0425\u043E\u043B\u0438\u043C\u043E\u0433 \u0430\u0440\u044C\u0441\u0430\u043D\u0434 \u04E9\u043D\u0433\u04E9 \u0436\u0438\u0433\u0434\u0440\u04AF\u04AF\u043B\u044D\u0445 \u0441\u0435\u0440\u0443\u043C, \u0437\u04E9\u04E9\u043B\u04E9\u043D \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, \u0442\u043E\u0433\u0442\u043C\u043E\u043B \u043D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u0447\u0443\u0445\u0430\u043B."
      }
    };
    btn.addEventListener("click", () => {
      const skin = container.querySelector('input[name="skin"]:checked');
      const problem = container.querySelector('input[name="problem"]:checked');
      result.hidden = false;
      result.classList.add("is-visible");
      if (!skin || !problem) {
        result.innerHTML = `
        <h3>\u0421\u043E\u043D\u0433\u043E\u043B\u0442\u043E\u043E \u0433\u04AF\u0439\u0446\u044D\u044D\u043D\u044D \u04AF\u04AF</h3>
        <p>\u0410\u0440\u044C\u0441\u043D\u044B \u0442\u04E9\u0440\u04E9\u043B \u0431\u043E\u043B\u043E\u043D \u0433\u043E\u043B \u0430\u0441\u0443\u0443\u0434\u043B\u0430\u0430 \u0445\u043E\u0451\u0443\u043B\u0430\u043D\u0433 \u043D\u044C \u0441\u043E\u043D\u0433\u043E\u0441\u043D\u044B \u0434\u0430\u0440\u0430\u0430 \u0437\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9 \u0433\u0430\u0440\u043D\u0430.</p>
      `;
        return;
      }
      const message = recommendations[skin.value]?.[problem.value] || "\u0422\u0430\u043D\u0434 \u0437\u04E9\u04E9\u043B\u04E9\u043D \u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0447, \u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447, \u043D\u0430\u0440\u043D\u044B \u0442\u043E\u0441 \u0442\u043E\u0433\u0442\u043C\u043E\u043B \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0445\u0438\u0439\u0433 \u0437\u04E9\u0432\u043B\u04E9\u0436 \u0431\u0430\u0439\u043D\u0430.";
      const matchedProducts = getRecommendedProducts(products, skin.value, problem.value);
      const recommendationCards = matchedProducts.map((product) => template.cardTemplate(product)).join("");
      result.innerHTML = `
      <h3>\u0422\u0430\u043D\u0434 \u0442\u043E\u0445\u0438\u0440\u043E\u0445 \u04AF\u043D\u0434\u0441\u044D\u043D \u0437\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9</h3>
      <p>${message}</p>
      <div class="skin-coach-page__result-products">
        <h4>\u0422\u043E\u0445\u0438\u0440\u043E\u0445 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u0441\u0430\u043D\u0430\u043B</h4>
        <div class="skin-coach-page__recommendations">
          ${recommendationCards}
        </div>
      </div>
    `;
    });
  }
  var problemConcernMap, skinConcernMap, problemKeywordMap, skinKeywordMap;
  var init_skinCoachPage = __esm({
    "js/pages/skinCoachPage.js"() {
      init_productCard();
      problemConcernMap = {
        acne: [2, 5, 6],
        dryness: [1, 2, 3],
        pigment: [4, 1]
      };
      skinConcernMap = {
        oily: [5, 6, 2],
        dry: [1, 2, 3],
        combo: [1, 2, 6]
      };
      problemKeywordMap = {
        acne: ["\u0431\u0430\u0442\u0433\u0430", "acne", "\u0442\u043E\u0441\u043B\u043E\u0433", "\u043D\u04AF\u0445\u0436\u0438\u043B\u0442", "\u0442\u0430\u0439\u0432\u0448\u0440\u0443\u0443\u043B", "\u0446\u043E\u0447\u0438\u0440"],
        dryness: ["\u0445\u0443\u0443\u0440\u0430\u0439", "\u0447\u0438\u0439\u0433", "moist", "hydrat", "\u0442\u0430\u0442\u0430\u043B\u0434", "\u0442\u044D\u0436\u044D\u044D\u043B"],
        pigment: ["\u0442\u043E\u043B\u0431\u043E", "pigment", "\u0446\u0430\u0439\u0440\u0443\u0443\u043B", "\u0433\u044D\u0440\u044D\u043B\u0442", "\u04E9\u043D\u0433\u04E9", "\u0436\u0438\u0433\u0434"]
      };
      skinKeywordMap = {
        oily: ["\u0442\u043E\u0441\u043B\u043E\u0433", "\u0445\u04E9\u043D\u0433\u04E9\u043D", "\u0433\u0435\u043B", "\u043D\u04AF\u0445\u0436\u0438\u043B\u0442", "\u0442\u044D\u043D\u0446\u0432\u044D\u0440"],
        dry: ["\u0445\u0443\u0443\u0440\u0430\u0439", "\u0447\u0438\u0439\u0433", "cream", "\u0442\u044D\u0436\u044D\u044D\u043B", "moist", "hydration"],
        combo: ["\u0445\u043E\u043B\u0438\u043C\u043E\u0433", "\u0431\u04AF\u0445 \u0442\u04E9\u0440\u043B\u0438\u0439\u043D", "\u0442\u044D\u043D\u0446\u0432\u044D\u0440", "\u044D\u043C\u0437\u044D\u0433", "\u0447\u0438\u0439\u0433"]
      };
    }
  });

  // js/pages/deliveryPage.js
  function renderOrderResult(code, order) {
    return `
    <div class="delivery-page__result-header">
      <h4>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 ${code}</h4>
      <span class="delivery-page__status-badge">${order.status}</span>
    </div>
    <div class="delivery-page__result-grid">
      <div class="delivery-page__result-item">
        <span>\u0417\u0430\u0445\u0438\u0430\u043B\u0430\u0433\u0447</span>
        <strong>${order.customer}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>\u0421\u04AF\u04AF\u043B\u0438\u0439\u043D \u0448\u0438\u043D\u044D\u0447\u043B\u044D\u043B\u0442</span>
        <strong>${order.updatedAt}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</span>
        <strong>${order.items}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>\u0425\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u0445\u0430\u044F\u0433</span>
        <strong>${order.address}</strong>
      </div>
    </div>
    <p class="delivery-page__result-note">${order.note}</p>
  `;
  }
  function showResult(result, html, isError = false) {
    result.hidden = false;
    result.classList.add("is-visible");
    result.classList.toggle("is-error", isError);
    result.innerHTML = html;
  }
  function renderDeliveryPage(container) {
    container.innerHTML = `
    <section class="delivery-page">
      <div class="delivery-page__shell">
        <header class="delivery-page__header">
          <span class="delivery-page__eyebrow">Delivery Policy</span>
          <h1>\u0425\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u043D\u04E9\u0445\u0446\u04E9\u043B</h1>
          <p class="delivery-page__intro">
            \u0411\u0438\u0434 \u0442\u0430\u043D\u044B \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439\u0433 24-48 \u0446\u0430\u0433\u0438\u0439\u043D \u0434\u043E\u0442\u043E\u0440 \u0445\u04AF\u0441\u0441\u044D\u043D \u0433\u0430\u0437\u0430\u0440\u0442 \u043D\u044C \u043D\u0430\u0439\u0434\u0432\u0430\u0440\u0442\u0430\u0439 \u0445\u04AF\u0440\u0433\u044D\u0445\u0438\u0439\u0433 \u0437\u043E\u0440\u044C\u0434\u043E\u0433. \u0414\u043E\u043E\u0440\u0445 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u044D\u044D\u0441 \u0445\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u04AF\u043D\u0434\u0441\u044D\u043D \u043D\u04E9\u0445\u0446\u04E9\u043B \u0431\u043E\u043B\u043E\u043D \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0442\u04E9\u043B\u04E9\u0432 \u0448\u0430\u043B\u0433\u0430\u0445 \u0445\u044D\u0441\u0433\u0438\u0439\u0433 \u0430\u0448\u0438\u0433\u043B\u0430\u043D\u0430 \u0443\u0443.
          </p>
        </header>

        <div class="delivery-page__sections">
          <article class="delivery-page__section">
            <div class="delivery-page__section-number">01</div>
            <div class="delivery-page__section-body">
              <h2>\u0425\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u0445\u0443\u0433\u0430\u0446\u0430\u0430</h2>
              <p>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0441\u0430\u043D\u044B \u0434\u0430\u0440\u0430\u0430 \u0445\u04AF\u0440\u0433\u044D\u043B\u0442 \u0438\u0445\u044D\u0432\u0447\u043B\u044D\u043D 24-48 \u0446\u0430\u0433\u0438\u0439\u043D \u0434\u043E\u0442\u043E\u0440 \u0445\u0438\u0439\u0433\u0434\u044D\u043D\u044D.</p>
            </div>
          </article>

          <article class="delivery-page__section">
            <div class="delivery-page__section-number">02</div>
            <div class="delivery-page__section-body">
              <h2>\u0425\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B</h2>
              <p>\u0417\u04E9\u0432 \u0445\u0430\u044F\u0433, \u0443\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440 \u043E\u0440\u0443\u0443\u043B\u0441\u0430\u043D \u0442\u043E\u0445\u0438\u043E\u043B\u0434\u043E\u043B\u0434 \u0445\u04AF\u0440\u0433\u044D\u043B\u0442 \u0438\u043B\u04AF\u04AF \u0445\u0443\u0440\u0434\u0430\u043D, \u0441\u0430\u0430\u0434\u0433\u04AF\u0439 \u044F\u0432\u0430\u0433\u0434\u0430\u043D\u0430.</p>
            </div>
          </article>

          <article class="delivery-page__section">
            <div class="delivery-page__section-number">03</div>
            <div class="delivery-page__section-body">
              <h2>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0448\u0430\u043B\u0433\u0430\u0445</h2>
              <p>\u0422\u0430 \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0434\u0443\u0433\u0430\u0430\u0440\u0430\u0430 \u043E\u0440\u0443\u0443\u043B\u0436 \u0445\u04AF\u0440\u0433\u044D\u043B\u0442\u0438\u0439\u043D \u0442\u04E9\u043B\u04E9\u0432\u04E9\u04E9 \u0448\u0430\u043B\u0433\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439.</p>
            </div>
          </article>
        </div>

        <section class="delivery-page__tracker">
          <h3>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0442\u04E9\u043B\u04E9\u0432 \u0448\u0430\u043B\u0433\u0430\u0445</h3>
          <p class="delivery-page__tracker-help">\u0422\u0443\u0440\u0448\u0438\u0436 \u04AF\u0437\u044D\u0445 \u043A\u043E\u0434: BS1234, BS5678, BS9012</p>
          <div class="delivery-page__tracker-form">
            <input type="text" id="orderId" placeholder="\u0416\u0438\u0448\u044D\u044D: BS1234" class="delivery-page__input">
            <button class="delivery-page__button" id="checkOrderBtn" type="button">\u0428\u0430\u043B\u0433\u0430\u0445</button>
          </div>
          <div class="delivery-page__result" id="result" hidden></div>
        </section>
      </div>
    </section>
  `;
    const btn = container.querySelector("#checkOrderBtn");
    const input = container.querySelector("#orderId");
    const result = container.querySelector("#result");
    const checkOrder = () => {
      const value = input.value.trim().toUpperCase();
      if (!value) {
        showResult(
          result,
          `
          <h4>\u0421\u043E\u043D\u0433\u043E\u043B\u0442\u043E\u043E \u0433\u04AF\u0439\u0446\u044D\u044D\u043D\u044D \u04AF\u04AF</h4>
          <p>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0434\u0443\u0433\u0430\u0430\u0440 \u043E\u0440\u0443\u0443\u043B\u0441\u043D\u044B \u0434\u0430\u0440\u0430\u0430 \u0442\u04E9\u043B\u04E9\u0432 \u0448\u0430\u043B\u0433\u0430\u0445 \u0431\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439.</p>
        `,
          true
        );
        return;
      }
      const order = mockOrders[value];
      if (!order) {
        showResult(
          result,
          `
          <h4>\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</h4>
          <p><strong>${value}</strong> \u043A\u043E\u0434\u0442\u043E\u0439 \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0431\u04AF\u0440\u0442\u0433\u044D\u0433\u0434\u0441\u044D\u043D\u0433\u04AF\u0439. \u041A\u043E\u0434\u043E\u043E \u0434\u0430\u0445\u0438\u043D \u0448\u0430\u043B\u0433\u0430\u0430\u0434 \u043E\u0440\u043E\u043B\u0434\u043E\u043D\u043E \u0443\u0443.</p>
        `,
          true
        );
        return;
      }
      showResult(result, renderOrderResult(value, order));
    };
    btn.addEventListener("click", checkOrder);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkOrder();
      }
    });
  }
  var mockOrders;
  var init_deliveryPage = __esm({
    "js/pages/deliveryPage.js"() {
      mockOrders = {
        BS1234: {
          status: "\u0425\u04AF\u0440\u0433\u044D\u043B\u0442\u044D\u043D\u0434 \u0433\u0430\u0440\u0441\u0430\u043D",
          customer: "\u041D\u043E\u043C\u0438\u043D",
          items: "Snail mucin 88 + Peptide Cream, Waterfull Hyaluronic Toner",
          address: "\u0423\u043B\u0430\u0430\u043D\u0431\u0430\u0430\u0442\u0430\u0440, \u0425\u0430\u043D-\u0423\u0443\u043B \u0434\u04AF\u04AF\u0440\u044D\u0433",
          updatedAt: "2026-05-12 11:20",
          note: "\u041A\u0443\u0440\u044C\u0435\u0440 \u0442\u0430\u043D\u0434 \u0445\u04AF\u0440\u0433\u044D\u0445\u044D\u044D\u0441 \u04E9\u043C\u043D\u04E9 \u0445\u043E\u043B\u0431\u043E\u0433\u0434\u043E\u043D\u043E."
        },
        BS5678: {
          status: "\u0411\u044D\u043B\u0442\u0433\u044D\u0433\u0434\u044D\u0436 \u0431\u0430\u0439\u043D\u0430",
          customer: "\u0421\u043E\u043B\u043E\u043D\u0433\u043E",
          items: "345 Relief Cream, Dark Spot Correcting Glow Serum",
          address: "\u0423\u043B\u0430\u0430\u043D\u0431\u0430\u0430\u0442\u0430\u0440, \u0421\u04AF\u0445\u0431\u0430\u0430\u0442\u0430\u0440 \u0434\u04AF\u04AF\u0440\u044D\u0433",
          updatedAt: "2026-05-12 10:05",
          note: "\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0430\u0433\u0443\u0443\u043B\u0430\u0445\u0430\u0430\u0441 \u0433\u0430\u0440\u0430\u0445\u0430\u0434 \u0431\u044D\u043B\u044D\u043D \u0431\u043E\u043B\u0436 \u0431\u0430\u0439\u043D\u0430."
        },
        BS9012: {
          status: "\u0425\u04AF\u0440\u0433\u044D\u0433\u0434\u0441\u044D\u043D",
          customer: "\u0410\u043D\u0443\u0434\u0430\u0440\u044C",
          items: "Mugwort Calming Cleanser",
          address: "\u0423\u043B\u0430\u0430\u043D\u0431\u0430\u0430\u0442\u0430\u0440, \u0411\u0430\u044F\u043D\u0437\u04AF\u0440\u0445 \u0434\u04AF\u04AF\u0440\u044D\u0433",
          updatedAt: "2026-05-11 18:40",
          note: "\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0430\u043C\u0436\u0438\u043B\u0442\u0442\u0430\u0439 \u0445\u04AF\u043B\u044D\u044D\u043B\u0433\u044D\u043D \u04E9\u0433\u04E9\u0433\u0434\u0441\u04E9\u043D."
        }
      };
    }
  });

  // js/utils/assets.js
  function assetUrl(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
    return `/${path.replace(/^\.?\//, "")}`;
  }
  function productImageSrc2(filename) {
    if (!filename) return "";
    if (filename.includes("/")) return assetUrl(filename);
    return `/images/${filename}`;
  }
  var init_assets = __esm({
    "js/utils/assets.js"() {
    }
  });

  // js/components/quantitySelector.js
  var require_quantitySelector = __commonJS({
    "js/components/quantitySelector.js"() {
      var QuantitySelector = class extends HTMLElement {
        constructor() {
          super();
          this.count = 1;
        }
        connectedCallback() {
          this.render();
          this.attachEvents();
        }
        render() {
          this.innerHTML = `
         <div class="product-count">
            <button class="minus"><i class="fa-solid fa-minus"></i></button>
            <span class="count">1</span>
            <button class="plus"><i class="fa-solid fa-plus"></i></button>
        </div> 
        `;
        }
        attachEvents() {
          const minus = this.querySelector(".minus");
          const plus = this.querySelector(".plus");
          minus.addEventListener("click", () => {
            if (this.count > 1) {
              this.count--;
              this.update();
            }
          });
          plus.addEventListener("click", () => {
            this.count++;
            this.update();
          });
        }
        update() {
          this.querySelector(".count").textContent = this.count;
          this.dispatchEvent(
            new CustomEvent("quantity-change", {
              detail: { value: this.count },
              bubbles: true
            })
          );
        }
      };
      customElements.define("quantity-selector", QuantitySelector);
    }
  });

  // js/components/productDetailView.js
  function renderProductDetailView(product, container) {
    const imageSrc = product.imageUrl || productImageSrc2(product.img);
    container.innerHTML = `
        <section class="product-detail" id="product-detail">

            <div class="detail-left">
                <img src="${imageSrc}" alt="${product.name}" onerror="this.onerror=null;this.src='/images/placeholder.svg'">
            </div>

            <div class="detail-right">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-title">${product.name}</h3>

                <div class="product-rating">
                    ${starRating(Math.round(product.rating))}
                    <span class="rating">${product.rating}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>

                ${priceTemplate(product)}

                <div class="product-actions">
                    <button class="add-cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button class="order">\u0417\u0430\u0445\u0438\u0430\u043B\u0430\u0445</button>
                    <button class="wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="product-description">
                    <div class="tabs">
                        <button class="tab-btn active" onclick="openTab('usage', this)">\u0425\u044D\u0440\u044D\u0433\u043B\u044D\u0445 \u0437\u0430\u0430\u0432\u0430\u0440</button>
                        <button class="tab-btn" onclick="openTab('description', this)">\u0422\u0430\u0439\u043B\u0431\u0430\u0440</button>
                        <button class="tab-btn" onclick="openTab('ingredients', this)">\u041D\u0430\u0439\u0440\u043B\u0430\u0433\u0430</button>
                    </div>
                    <div id="usage" class="tab-content"><p>${product.usage}</p></div>
                    <div id="description" class="tab-content" style="display:none"><p>${product.description}</p></div>
                    <div id="ingredients" class="tab-content" style="display:none">
                        <p>${Array.isArray(product.ingredients) ? product.ingredients.join(", ") : product.ingredients}</p>
                    </div>
                </div>
            </div>

        </section>

        <section class="product-reviews">
            <h3 class="heading">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</h3>
            <div class="cards-container">
                <article class="reviews-card">
                    <h4 class="your-rating">\u0422\u0430\u043D\u044B \u04AF\u043D\u044D\u043B\u0433\u044D\u044D</h4>
                    <p class="give-rating">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D:</p>
                    <div class="rating-stars">
                        <span id="user-rating-stars"></span>
                        <span id="user-rating-value" class="rating-point">0/5</span>
                    </div>
                    <p class="comment">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B:</p>
                    <textarea class="write-comment" rows="10" minlength="5" maxlength="200"
                        placeholder="\u0422\u0430\u043D\u044B \u0441\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B..."></textarea>
                    <button class="login-required">\u041D\u044D\u0432\u0442\u0440\u044D\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439</button>
                </article>

                <div class="comments-card">
                    <article class="comments-header">
                        <div class="comments-left-header">
                            <div class="comments-left">
                                <span class="avatar-circle">
                                    <img class="profile-avatar" src="/images/avatar.webp" alt="User">
                                </span>
                            </div>
                            <div class="comments-right">
                                <h4 class="user-name">User Name</h4>
                                <div class="review-stars"></div>
                            </div>
                        </div>
                        <p class="comment-date">2023-10-01</p>
                    </article>
                    <p class="comment-text">\u042D\u043D\u044D \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043C\u0430\u0448 \u0441\u0430\u0439\u0445\u0430\u043D \u0431\u0430\u0439\u043D\u0430!</p>
                </div>
            </div>
        </section>
    `;
    window.openTab = openTab;
  }
  function openTab(tabName, element) {
    document.querySelectorAll(".tab-content").forEach((el) => el.style.display = "none");
    document.querySelectorAll(".tab-btn").forEach((el) => el.classList.remove("active"));
    document.getElementById(tabName).style.display = "block";
    element.classList.add("active");
  }
  var import_quantitySelector, import_cartButton, import_wishlistButton;
  var init_productDetailView = __esm({
    "js/components/productDetailView.js"() {
      init_starRating();
      init_priceTemplate();
      init_assets();
      import_quantitySelector = __toESM(require_quantitySelector());
      import_cartButton = __toESM(require_cartButton());
      import_wishlistButton = __toESM(require_wishlistButton());
    }
  });

  // js/components/cardAction.js
  function setupCardActions(products) {
    document.addEventListener("add-cart", (event) => {
      console.log("add-cart event received", event.detail);
      const id = Number(event.detail.productId);
      const product = products.find((p) => Number(p.id) === id);
      if (!product) return;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => Number(item.id) === id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateNavbarCount();
      showToast("\u0421\u0430\u0433\u0441\u0430\u043D\u0434 \u043D\u044D\u043C\u044D\u0433\u0434\u043B\u044D\u044D!");
    });
  }
  var init_cardAction = __esm({
    "js/components/cardAction.js"() {
      init_navbarCount();
      init_toggle();
    }
  });

  // js/productDetailLogic.js
  function setupProductDetailLogic(product, products) {
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
  var init_productDetailLogic = __esm({
    "js/productDetailLogic.js"() {
      init_starRating();
      init_cardAction();
    }
  });

  // js/pages/productDetailPage.js
  function renderProductDetailPage(products, container, params) {
    const id = Number(params.get("id"));
    const product = products.find((p) => p.id === id);
    if (!product) {
      container.innerHTML = "<p>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</p>";
      return;
    }
    renderProductDetailView(product, container);
    setupProductDetailLogic(product, products);
    updateNavbarCount();
  }
  var init_productDetailPage = __esm({
    "js/pages/productDetailPage.js"() {
      init_productDetailView();
      init_productDetailLogic();
      init_navbarCount();
    }
  });

  // js/pages/searchPage.js
  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, " ").trim();
  }
  function splitWords(value) {
    return normalize(value).split(" ").filter(Boolean);
  }
  function getIngredientsText(product) {
    return Array.isArray(product.ingredients) ? product.ingredients.join(" ") : String(product.ingredients || "");
  }
  function getCategoryText(product) {
    return (categoryKeywords[product.categoryId] || []).join(" ");
  }
  function getCurrentPrice(product) {
    return Number(product.newPrice || product.price || 0);
  }
  function buildSearchIndex(product) {
    const fields = {
      name: normalize(product.name),
      brand: normalize(product.brand),
      description: normalize(product.description),
      ingredients: normalize(getIngredientsText(product)),
      usage: normalize(product.usage),
      category: normalize(getCategoryText(product))
    };
    const words = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, splitWords(value)])
    );
    return {
      fields,
      words,
      combined: Object.values(fields).filter(Boolean).join(" ")
    };
  }
  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const prev = Array.from({ length: b.length + 1 }, (_, index) => index);
    const curr = new Array(b.length + 1).fill(0);
    for (let i = 1; i <= a.length; i += 1) {
      curr[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(
          prev[j] + 1,
          curr[j - 1] + 1,
          prev[j - 1] + cost
        );
      }
      for (let j = 0; j <= b.length; j += 1) {
        prev[j] = curr[j];
      }
    }
    return prev[b.length];
  }
  function isFuzzyMatch(term, word) {
    if (!term || !word || term.includes(" ")) return false;
    if (term.length < 4 || word.length < 4) return false;
    if (Math.abs(term.length - word.length) > 2) return false;
    const maxDistance = term.length >= 7 ? 2 : 1;
    return editDistance(term, word) <= maxDistance;
  }
  function expandQueryTerm(term) {
    const variants = /* @__PURE__ */ new Set([term]);
    keywordAliases.forEach((group) => {
      const normalizedGroup = group.map((item) => normalize(item));
      if (normalizedGroup.some((alias) => alias.includes(term) || term.includes(alias))) {
        normalizedGroup.forEach((alias) => variants.add(alias));
      }
    });
    return [...variants].filter(Boolean);
  }
  function scoreVariant(variant, text, words, weight) {
    if (!variant || !text) return 0;
    const paddedText = ` ${text} `;
    const paddedVariant = ` ${variant} `;
    if (text === variant) return weight + 36;
    if (text.startsWith(variant)) return weight + 28;
    if (paddedText.includes(paddedVariant)) return weight + 24;
    if (text.includes(variant)) return weight + 18;
    if (!variant.includes(" ")) {
      if (words.includes(variant)) return weight + 20;
      if (words.some((word) => word.startsWith(variant) || variant.startsWith(word))) return weight + 12;
      if (words.some((word) => isFuzzyMatch(variant, word))) return weight + 10;
    }
    return 0;
  }
  function scoreProduct2(product, normalizedQuery, queryTerms) {
    const searchIndex = buildSearchIndex(product);
    const fieldValues = Object.values(searchIndex.fields);
    const fieldWeights = {
      name: 60,
      brand: 42,
      category: 28,
      ingredients: 22,
      description: 16,
      usage: 12
    };
    let score = 0;
    let matchedTerms = 0;
    let directScore = 0;
    let directTermMatches = 0;
    if (searchIndex.fields.name === normalizedQuery) {
      score += 180;
      directScore = 520;
    } else if (searchIndex.fields.name.includes(normalizedQuery)) {
      score += 120;
      directScore = 420;
    }
    if (searchIndex.fields.brand === normalizedQuery) {
      score += 110;
      directScore = Math.max(directScore, 360);
    } else if (searchIndex.fields.brand.includes(normalizedQuery)) {
      score += 70;
      directScore = Math.max(directScore, 300);
    }
    if (searchIndex.combined.includes(normalizedQuery)) {
      score += 32;
      directScore = Math.max(directScore, 220);
    }
    queryTerms.forEach((term) => {
      const variants = expandQueryTerm(term);
      let bestVariantScore = 0;
      const hasDirectTermMatch = fieldValues.some((value) => value.includes(term));
      if (hasDirectTermMatch) {
        directTermMatches += 1;
        directScore += 30;
      }
      variants.forEach((variant) => {
        Object.entries(fieldWeights).forEach(([field, weight]) => {
          bestVariantScore = Math.max(
            bestVariantScore,
            scoreVariant(variant, searchIndex.fields[field], searchIndex.words[field], weight)
          );
        });
      });
      if (bestVariantScore > 0) {
        matchedTerms += 1;
        score += bestVariantScore;
      }
    });
    score += Number(product.rating || 0) * 2;
    score += Math.min(Number(product.reviews || 0) / 100, 8);
    const minimumMatchedTerms = queryTerms.length === 1 ? 1 : Math.max(queryTerms.length - 1, 1);
    const hasDirectMatch = directScore > 0;
    return {
      score,
      matchedTerms,
      directScore,
      directTermMatches,
      hasDirectMatch,
      isMatch: hasDirectMatch || matchedTerms >= minimumMatchedTerms && score > 30
    };
  }
  function escapeHtml(value) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function buildSearchState(params) {
    return {
      q: params.get("q") || "",
      category: params.get("category") || "",
      brand: params.get("brand") || "",
      minPrice: params.get("min_price") || "",
      maxPrice: params.get("max_price") || "",
      sort: params.get("sort") || "relevance"
    };
  }
  function buildSearchHash(state) {
    const nextParams = new URLSearchParams();
    if (state.q.trim()) nextParams.set("q", state.q.trim());
    if (state.category) nextParams.set("category", state.category);
    if (state.brand) nextParams.set("brand", state.brand);
    if (state.minPrice) nextParams.set("min_price", state.minPrice);
    if (state.maxPrice) nextParams.set("max_price", state.maxPrice);
    if (state.sort && state.sort !== "relevance") nextParams.set("sort", state.sort);
    const queryString = nextParams.toString();
    return queryString ? `#search?${queryString}` : "#search";
  }
  function readFormState(form, sortSelect) {
    const formData = new FormData(form);
    return {
      q: String(formData.get("q") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      brand: String(formData.get("brand") || "").trim(),
      minPrice: String(formData.get("min_price") || "").trim(),
      maxPrice: String(formData.get("max_price") || "").trim(),
      sort: String(sortSelect?.value || "relevance")
    };
  }
  function sortResults(items, sortKey, hasQuery) {
    const activeSort = sortKey || (hasQuery ? "relevance" : "rating-desc");
    const compareDirectness = (a, b) => Number(b.hasDirectMatch) - Number(a.hasDirectMatch) || b.directTermMatches - a.directTermMatches || b.directScore - a.directScore;
    items.sort((a, b) => {
      switch (activeSort) {
        case "price-asc":
          return compareDirectness(a, b) || getCurrentPrice(a.product) - getCurrentPrice(b.product) || b.score - a.score;
        case "price-desc":
          return compareDirectness(a, b) || getCurrentPrice(b.product) - getCurrentPrice(a.product) || b.score - a.score;
        case "rating-desc":
          return compareDirectness(a, b) || Number(b.product.rating || 0) - Number(a.product.rating || 0) || Number(b.product.reviews || 0) - Number(a.product.reviews || 0);
        case "reviews-desc":
          return compareDirectness(a, b) || Number(b.product.reviews || 0) - Number(a.product.reviews || 0) || Number(b.product.rating || 0) - Number(a.product.rating || 0);
        case "name-asc":
          return compareDirectness(a, b) || String(a.product.name || "").localeCompare(String(b.product.name || ""), "mn") || b.score - a.score;
        case "relevance":
        default:
          return compareDirectness(a, b) || b.score - a.score || Number(b.product.rating || 0) - Number(a.product.rating || 0) || Number(b.product.reviews || 0) - Number(a.product.reviews || 0);
      }
    });
    return items;
  }
  function getFilteredProducts(products, state) {
    const normalizedQuery = normalize(state.q);
    const queryTerms = splitWords(state.q);
    const hasQuery = Boolean(normalizedQuery);
    const minPrice = Number(state.minPrice);
    const maxPrice = Number(state.maxPrice);
    const scored = products.map((product) => {
      if (!hasQuery) {
        return {
          product,
          score: Number(product.rating || 0) * 10 + Math.min(Number(product.reviews || 0) / 20, 20),
          matchedTerms: 0,
          directScore: 0,
          directTermMatches: 0,
          hasDirectMatch: false,
          isMatch: true
        };
      }
      return {
        product,
        ...scoreProduct2(product, normalizedQuery, queryTerms)
      };
    }).filter((item) => item.isMatch).filter((item) => !state.category || String(item.product.categoryId) === state.category).filter((item) => !state.brand || String(item.product.brand || "") === state.brand).filter((item) => Number.isNaN(minPrice) || getCurrentPrice(item.product) >= minPrice).filter((item) => Number.isNaN(maxPrice) || getCurrentPrice(item.product) <= maxPrice);
    return sortResults(scored, state.sort, hasQuery);
  }
  function buildAppliedFilters(state) {
    const filters = [];
    if (state.q.trim()) {
      filters.push(`"${escapeHtml(state.q.trim())}"`);
    }
    if (state.category) {
      filters.push(escapeHtml(categoryLabels[Number(state.category)] || state.category));
    }
    if (state.brand) {
      filters.push(escapeHtml(state.brand));
    }
    if (state.minPrice || state.maxPrice) {
      const min = state.minPrice ? `${escapeHtml(state.minPrice)}\u20AE` : "0\u20AE";
      const max = state.maxPrice ? `${escapeHtml(state.maxPrice)}\u20AE` : "\u0414\u044D\u044D\u0434 \u0445\u044F\u0437\u0433\u0430\u0430\u0440\u0433\u04AF\u0439";
      filters.push(`${min} - ${max}`);
    }
    return filters;
  }
  function syncGlobalSearchInput(query) {
    const input = document.querySelector(".search-box__input");
    if (input) {
      input.value = query;
    }
  }
  function renderSearchPage(products, container, params) {
    const state = buildSearchState(params);
    const safeQuery = escapeHtml(state.q);
    const filteredItems = getFilteredProducts(products, state);
    const brands = [...new Set(products.map((product) => String(product.brand || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "mn"));
    const appliedFilters = buildAppliedFilters(state);
    const hasFilters = appliedFilters.length > 0;
    const hasProducts = filteredItems.length > 0;
    const hasQuery = Boolean(state.q.trim());
    const directItems = hasQuery ? filteredItems.filter((item) => item.hasDirectMatch) : [];
    const relatedItems = hasQuery ? filteredItems.filter((item) => !item.hasDirectMatch) : [];
    const primaryItems = directItems.length > 0 ? directItems : filteredItems;
    const secondaryItems = directItems.length > 0 ? relatedItems : [];
    const summaryText = state.q.trim() ? `"${safeQuery}" \u0445\u0430\u0439\u043B\u0442\u0430\u0430\u0440 ${filteredItems.length} \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u043B\u043E\u043E.` : `${filteredItems.length} \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u0448\u04AF\u04AF\u0433\u0434\u043B\u044D\u044D.`;
    const selectedSort = sortLabels[state.sort] ? state.sort : "relevance";
    container.innerHTML = `
    <section class="search-page">
      <div class="search-page__shell">
        <nav class="search-page__breadcrumb" aria-label="Breadcrumb">
          <a href="#home">\u041D\u04AF\u04AF\u0440 \u0445\u0443\u0443\u0434\u0430\u0441</a>
          <span class="search-page__breadcrumb-separator">></span>
          <span>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</span>
        </nav>

        <div class="search-page__layout">
          <aside class="search-page__sidebar">
            <form class="search-page__filters" id="searchFilterForm">
              <div class="search-page__filter-card">
                <h2>\u0425\u0430\u0439\u043B\u0442 \u0445\u0438\u0439\u0445</h2>

                <label class="search-page__field">
                  <span>\u0422\u04AF\u043B\u0445\u04AF\u04AF\u0440 \u04AF\u0433</span>
                  <input class="search-page__input" type="text" name="q" value="${safeQuery}" placeholder="\u0416\u0438\u0448\u044D\u044D \u043D\u044C: \u0442\u043E\u0441, serum, sensitive, Jumiso">
                </label>

                <label class="search-page__field">
                  <span>\u0410\u043D\u0433\u0438\u043B\u0430\u043B</span>
                  <select class="search-page__select" name="category">
                    <option value="">\u0411\u04AF\u0445 \u0430\u043D\u0433\u0438\u043B\u0430\u043B</option>
                    ${Object.entries(categoryLabels).map(([value, label]) => `
                      <option value="${value}" ${state.category === value ? "selected" : ""}>${label}</option>
                    `).join("")}
                  </select>
                </label>

                <label class="search-page__field">
                  <span>\u0411\u0440\u0435\u043D\u0434</span>
                  <select class="search-page__select" name="brand">
                    <option value="">\u0411\u04AF\u0445 \u0431\u0440\u0435\u043D\u0434</option>
                    ${brands.map((brand) => `
                      <option value="${escapeHtml(brand)}" ${state.brand === brand ? "selected" : ""}>${escapeHtml(brand)}</option>
                    `).join("")}
                  </select>
                </label>

                <div class="search-page__field">
                  <span>\u04AE\u043D\u044D</span>
                  <div class="search-page__field-row">
                    <input class="search-page__input" type="number" min="0" step="500" name="min_price" value="${escapeHtml(state.minPrice)}" placeholder="\u0414\u043E\u043E\u0434 \u04AF\u043D\u044D">
                    <input class="search-page__input" type="number" min="0" step="500" name="max_price" value="${escapeHtml(state.maxPrice)}" placeholder="\u0414\u044D\u044D\u0434 \u04AF\u043D\u044D">
                  </div>
                </div>

                <div class="search-page__actions">
                  <p class="search-page__auto-note">\u0421\u043E\u043D\u0433\u043E\u0445 \u0431\u04AF\u0440\u0442 \u0438\u043B\u044D\u0440\u0446 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0430\u0430\u0440 \u0448\u0438\u043D\u044D\u0447\u043B\u044D\u0433\u0434\u044D\u043D\u044D.</p>
                  <button class="search-page__button search-page__button--secondary" type="button" id="searchResetBtn">\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445</button>
                </div>
              </div>
            </form>
          </aside>

          <div class="search-page__content">
            <div class="search-page__toolbar">
              <div class="search-page__toolbar-copy">
                <p class="search-page__result-count">${filteredItems.length} \u0438\u043B\u044D\u0440\u0446</p>
                ${hasFilters ? `
                      <div class="search-page__chips">
                        ${appliedFilters.map((filter) => `<span class="search-page__chip">${filter}</span>`).join("")}
                      </div>
                    ` : `<p class="search-page__hint">Cosmix \u0448\u0438\u0433 layout-\u0442\u0430\u0439\u0433\u0430\u0430\u0440 filter \u0431\u043E\u043B\u043E\u043D result-\u044D\u044D \u043D\u044D\u0433 \u0434\u043E\u0440\u043E\u043E\u0441 \u0443\u0434\u0438\u0440\u0434\u0430\u043D\u0430.</p>`}
              </div>

              <label class="search-page__sort">
                <span>\u042D\u0440\u044D\u043C\u0431\u044D\u043B\u044D\u0445</span>
                <select class="search-page__select" id="searchSortSelect">
                  ${Object.entries(sortLabels).map(([value, label]) => `
                    <option value="${value}" ${selectedSort === value ? "selected" : ""}>${label}</option>
                  `).join("")}
                </select>
              </label>
            </div>

            ${hasProducts ? `
                  <div class="search-page__result-sections">
                    <section class="search-page__result-group">
                      ${directItems.length > 0 ? `<p class="search-page__group-label">\u0428\u0443\u0443\u0434 \u0442\u0430\u0430\u0440\u0441\u0430\u043D \u0438\u043B\u044D\u0440\u0446</p>` : ""}
                      <div class="search-page__results products">
                        ${primaryItems.map((item) => template.cardTemplate(item.product)).join("")}
                      </div>
                    </section>
                    ${secondaryItems.length > 0 ? `
                          <section class="search-page__result-group">
                            <p class="search-page__group-label">\u0422\u04E9\u0441\u0442\u044D\u0439 \u0438\u043B\u044D\u0440\u0446</p>
                            <div class="search-page__results products">
                              ${secondaryItems.map((item) => template.cardTemplate(item.product)).join("")}
                            </div>
                          </section>
                        ` : ""}
                  </div>
                ` : `
                  <div class="search-page__empty">
                    <h2>\u0418\u043B\u044D\u0440\u0446 \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</h2>
                    <p>${state.q.trim() ? `"${safeQuery}" \u0445\u0430\u0439\u043B\u0442\u0430\u0430\u0440 \u0442\u043E\u0445\u0438\u0440\u043E\u0445 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439.` : "\u0421\u043E\u043D\u0433\u043E\u0441\u043E\u043D \u0448\u04AF\u04AF\u043B\u0442\u044D\u0434 \u0442\u043E\u0445\u0438\u0440\u043E\u0445 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439."} \u04E8\u04E9\u0440 \u0431\u0440\u0435\u043D\u0434, \u04AF\u043D\u044D \u044D\u0441\u0432\u044D\u043B \u0430\u043D\u0433\u0438\u043B\u043B\u0430\u0430\u0440 \u0434\u0430\u0445\u0438\u043D \u0445\u0430\u0439\u0436 \u04AF\u0437\u043D\u044D \u04AF\u04AF.</p>
                  </div>
                `}
          </div>
        </div>
      </div>
    </section>
  `;
    const form = container.querySelector("#searchFilterForm");
    const sortSelect = container.querySelector("#searchSortSelect");
    const resetButton = container.querySelector("#searchResetBtn");
    let autoApplyTimer;
    const applyState = (nextState) => {
      const nextHash = buildSearchHash(nextState);
      syncGlobalSearchInput(nextState.q);
      const current = window.location.pathname + window.location.hash;
      if (current === `/${nextHash}` || current === nextHash) {
        renderSearchPage(products, container, new URLSearchParams(nextHash.split("?")[1] || ""));
        return;
      }
      navigateTo(nextHash, { replace: true });
      renderSearchPage(products, container, new URLSearchParams(nextHash.split("?")[1] || ""));
    };
    const scheduleApply = (delay) => {
      if (!form) return;
      window.clearTimeout(autoApplyTimer);
      autoApplyTimer = window.setTimeout(() => {
        applyState(readFormState(form, sortSelect));
      }, delay);
    };
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      applyState(readFormState(form, sortSelect));
    });
    form?.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
        return;
      }
      applyState(readFormState(form, sortSelect));
    });
    form?.addEventListener("input", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }
      if (!["text", "search", "number"].includes(target.type)) {
        return;
      }
      scheduleApply(250);
    });
    sortSelect?.addEventListener("change", () => {
      if (!form) return;
      applyState(readFormState(form, sortSelect));
    });
    resetButton?.addEventListener("click", () => {
      applyState({
        q: "",
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sort: "relevance"
      });
    });
  }
  var categoryLabels, categoryKeywords, keywordAliases, sortLabels;
  var init_searchPage = __esm({
    "js/pages/searchPage.js"() {
      init_productCard();
      init_navigation();
      categoryLabels = {
        1: "\u0410\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430 / Skincare",
        2: "\u041D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442 / Makeup",
        3: "\u041D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442 / Sun Care",
        4: "\u0411\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430 / Body Care",
        5: "\u04AE\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430 / Hair Care"
      };
      categoryKeywords = {
        1: ["\u0430\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "skincare", "skin care", "serum", "toner", "cream", "cleanser"],
        2: ["\u043D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442", "makeup", "cushion", "mascara", "lip", "palette"],
        3: ["\u043D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442", "sunscreen", "sun care", "spf"],
        4: ["\u0431\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "body care", "body lotion", "body wash"],
        5: ["\u04AF\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "hair care", "shampoo", "conditioner", "hair mask"]
      };
      keywordAliases = [
        ["\u0441\u0435\u0440\u0443\u043C", "serum"],
        ["\u0442\u043E\u043D\u0435\u0440", "toner"],
        ["\u044D\u0441\u0441\u044D\u043D\u0446", "essence"],
        ["\u0430\u043C\u043F\u0443\u043B", "ampoule", "ampule"],
        ["\u043F\u0430\u0434", "pad"],
        ["\u043C\u0438\u0441\u0442", "mist"],
        ["\u043C\u0430\u0441\u043A", "mask", "sheet mask", "sleeping mask"],
        ["\u043A\u0440\u0435\u043C", "cream", "moisturizer", "moisturiser", "moisturizing", "\u0447\u0438\u0439\u0433\u0448\u04AF\u04AF\u043B\u044D\u0433\u0447", "lotion"],
        ["\u0442\u043E\u0441", "oil", "balm", "ointment"],
        ["\u0433\u0435\u043B\u044C", "gel"],
        ["\u0446\u044D\u0432\u044D\u0440\u043B\u044D\u0433\u0447", "cleanser", "cleansing", "foam", "face wash", "oil cleanser", "cleansing oil", "cleansing water", "\u0443\u0433\u0430\u0430\u0433\u0447"],
        ["\u043D\u0430\u0440\u043D\u044B \u0442\u043E\u0441", "sunscreen", "sun cream", "spf", "sun care", "uv protection"],
        ["\u0431\u0430\u0442\u0433\u0430", "acne", "blemish", "breakout", "pimple", "pore", "\u043D\u04AF\u0445\u0436\u0438\u043B\u0442"],
        ["\u0445\u0443\u0443\u0440\u0430\u0439", "dry", "dehydrated", "hydrating", "hydration", "moisture", "\u0447\u0438\u0439\u0433"],
        ["\u0442\u043E\u0441\u043B\u043E\u0433", "oily", "sebum", "oil control"],
        ["\u0445\u043E\u043B\u0438\u043C\u043E\u0433", "combination", "combo"],
        ["\u044D\u043C\u0437\u044D\u0433", "sensitive", "soothing", "calming", "relief", "\u0442\u0430\u0439\u0432\u0448\u0440\u0443\u0443\u043B\u0430\u0445", "cica", "centella"],
        ["\u0442\u043E\u043B\u0431\u043E", "pigment", "pigmentation", "dark spot", "brightening", "glow", "\u0433\u044D\u0440\u044D\u043B\u0442", "niacinamide"],
        ["\u04AF\u0440\u0447\u043B\u044D\u044D", "wrinkle", "anti aging", "anti-aging", "firming"],
        ["\u0430\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "skincare", "skin care"],
        ["\u043D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442", "makeup", "cushion", "mascara", "lip", "palette"],
        ["\u0431\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "body care", "body wash", "body lotion"],
        ["\u04AF\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "hair care", "shampoo", "conditioner", "hair mask"],
        ["\u043D\u04AF\u0434\u043D\u0438\u0439 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430", "eye care", "eye cream"],
        ["\u0443\u0440\u0443\u0443\u043B", "lip", "lip care", "lip balm"]
      ];
      sortLabels = {
        relevance: "\u0425\u0430\u043C\u0430\u0430\u0440\u0430\u043B\u0442\u0430\u0439",
        "price-asc": "\u04AE\u043D\u044D \u04E9\u0441\u04E9\u0445\u04E9\u04E9\u0440",
        "price-desc": "\u04AE\u043D\u044D \u0431\u0443\u0443\u0440\u0430\u0445\u0430\u0430\u0440",
        "rating-desc": "\u04AE\u043D\u044D\u043B\u0433\u044D\u044D \u04E9\u043D\u0434\u04E9\u0440",
        "reviews-desc": "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u043E\u043B\u043E\u043D",
        "name-asc": "\u041D\u044D\u0440\u044D\u044D\u0440 A-Z"
      };
    }
  });

  // js/components/categoryNav.js
  function setActiveCategoryNav(resolved) {
    const categoryParams = categoryPathToParams(window.location.pathname);
    if (categoryParams === null) return;
    document.querySelectorAll(".cat-nav__item").forEach((item) => {
      item.classList.remove("active");
    });
    const state = resolved || resolveCategoryParams(categoryParams);
    if (!state || !state.categorySlug) return;
    const link = document.querySelector(
      `.cat-nav__item > a[data-category-slug="${state.categorySlug}"], .cat-nav__item > a[href="${buildCategoryPath({ categorySlug: state.categorySlug })}"]`
    );
    if (link) {
      const item = link.closest(".cat-nav__item");
      if (item) item.classList.add("active");
    }
  }
  function setupCategoryNav() {
    bindCategoryNavLinks();
    setActiveCategoryNav();
    const allBtn = document.querySelector(".cat-nav__all-btn");
    if (!allBtn) return;
    allBtn.addEventListener("click", (event) => {
      event.preventDefault();
      history.pushState(null, "", buildCategoryPath());
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }
  var init_categoryNav = __esm({
    "js/components/categoryNav.js"() {
      init_categoryCatalog();
    }
  });

  // js/pages/categoryPage.js
  function getSubCategoryId(product) {
    return product.subCategoryId;
  }
  function filterProducts(products, resolved, extraFilters = {}) {
    if (resolved.concernId) {
      return products.filter((p) => (p.concernIds || []).includes(resolved.concernId));
    }
    const { categoryId, subCategoryId } = resolved;
    let list = categoryId ? products.filter((p) => Number(p.categoryId) === Number(categoryId)) : [...products];
    if (subCategoryId) {
      list = list.filter((p) => Number(getSubCategoryId(p)) === Number(subCategoryId));
    }
    if (extraFilters.concerns?.length) {
      list = list.filter(
        (p) => extraFilters.concerns.some((c) => (p.concernIds || []).includes(Number(c)))
      );
    }
    return list;
  }
  function sortProducts(list, sortKey) {
    const items = [...list];
    switch (sortKey) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "sale":
        return items.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return items;
    }
  }
  function renderProductGrid(products) {
    if (!products.length) {
      return `<p class="category-page__empty">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</p>`;
    }
    return products.map((p) => template.cardTemplate(p)).join("");
  }
  function renderBreadcrumb(resolved, pageTitle) {
    const sep = `<span class="category-page__sep">/</span>`;
    if (resolved.subCategoryId) {
      return `
      <a href="/" class="category-page__crumb">\u041D\u04AF\u04AF\u0440</a>${sep}
      <a href="${buildCategoryPath({ categorySlug: resolved.categorySlug })}"
         class="category-page__crumb">${resolved.categoryName}</a>${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
    }
    return `
    <a href="/" class="category-page__crumb">\u041D\u04AF\u04AF\u0440</a>${sep}
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
  `;
  }
  function renderSidebar(resolved, baseProducts) {
    const catalog3 = getCategoryCatalog();
    if (!catalog3) return "";
    let subNavHtml = "";
    if (resolved.categoryId) {
      const category = catalog3.categoryById[resolved.categoryId];
      const subs = catalog3.subCategoriesByCategoryId[resolved.categoryId] || [];
      const allActive = !resolved.subCategoryId ? " is-active" : "";
      const subsHtml = subs.map((sub) => {
        const active = Number(resolved.subCategoryId) === Number(sub.id) ? " is-active" : "";
        return `
        <li class="category-sidebar__item">
          <a href="${buildCategoryPath({ categorySlug: category.slug, subCategorySlug: sub.slug })}"
             class="category-sidebar__sub${active}">${sub.name}</a>
        </li>`;
      }).join("");
      subNavHtml = `
      <div class="category-sidebar__group">
        <a href="${buildCategoryPath({ categorySlug: category.slug })}"
           class="category-sidebar__parent${allActive}">${category.name}</a>
        <ul class="category-sidebar__list">${subsHtml}</ul>
      </div>
    `;
    }
    const concerns = catalog3.concerns || [];
    const concernCounts = {};
    baseProducts.forEach((p) => {
      (p.concernIds || []).forEach((c) => {
        concernCounts[c] = (concernCounts[c] || 0) + 1;
      });
    });
    const concernHtml = concerns.map((c) => {
      const count = concernCounts[c.id] || 0;
      return `
      <li class="category-sidebar__filter-item">
        <label class="category-sidebar__filter-label">
          <input type="checkbox" class="category-sidebar__filter-input filter-concern" value="${c.id}" />
          <span class="category-sidebar__filter-name">${c.name}</span>
          <span class="category-sidebar__filter-count">${count}</span>
        </label>
      </li>`;
    }).join("");
    return `
    <aside class="category-sidebar">
      ${subNavHtml}
      <div class="category-sidebar__filters">
        <h4 class="category-sidebar__filter-heading">\u0410\u0440\u044C\u0441\u043D\u044B \u0430\u0441\u0443\u0443\u0434\u0430\u043B</h4>
        <ul class="category-sidebar__filter-list">${concernHtml}</ul>
      </div>
    </aside>
  `;
  }
  function setupFilters(container, products, resolved) {
    const grid = container.querySelector(".products");
    const countEl = container.querySelector("#category-product-count");
    const sortEl = container.querySelector(".sorting");
    function applyFilters() {
      const concerns = [...container.querySelectorAll(".filter-concern:checked")].map((el) => el.value);
      const sortKey = sortEl?.value || "";
      let list = filterProducts(products, resolved, { concerns });
      list = sortProducts(list, sortKey);
      if (countEl) countEl.textContent = String(list.length);
      grid.innerHTML = renderProductGrid(list);
    }
    container.querySelectorAll(".filter-concern").forEach((el) => {
      el.addEventListener("change", applyFilters);
    });
    sortEl?.addEventListener("change", applyFilters);
  }
  function renderCategoryPage(products, container, params) {
    const newPath = normalizeCategoryPath(params);
    if (newPath) {
      history.replaceState(null, "", newPath);
      params = categoryPathToParams(newPath);
    }
    const resolved = resolveCategoryParams(params);
    if (resolved.notFound) {
      container.innerHTML = `
      <section class="category-page">
        <h2>\u0410\u043D\u0433\u0438\u043B\u0430\u043B \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</h2>
        <p><a href="/">\u041D\u04AF\u04AF\u0440 \u0445\u0443\u0443\u0434\u0430\u0441 \u0440\u0443\u0443 \u0431\u0443\u0446\u0430\u0445</a></p>
      </section>
    `;
      setActiveCategoryNav();
      return;
    }
    const pageTitle = getCategoryPageTitle(resolved);
    const baseList = filterProducts(products, resolved);
    container.innerHTML = `
    <section class="category-page">
      <div class="category-layout">
        ${renderSidebar(resolved, baseList)}

        <div class="category-main">
          <div class="category-toolbar">
            <nav class="category-page__breadcrumb">
              ${renderBreadcrumb(resolved, pageTitle)}
            </nav>
            <div class="category-sort">
              <select class="sorting">
                <option value="">--\u042D\u0440\u044D\u043C\u0431\u044D\u043B\u044D\u0445--</option>
                <option value="price-asc">\u04AE\u043D\u044D \u04E9\u0441\u04E9\u0445\u04E9\u04E9\u0440</option>
                <option value="price-desc">\u04AE\u043D\u044D \u0431\u0443\u0443\u0440\u0430\u0445\u0430\u0430\u0440</option>
                <option value="sale">\u0425\u044F\u043C\u0434\u0430\u0440\u0441\u0430\u043D</option>
              </select>
            </div>
          </div>

          <h2 class="category-page__title">${pageTitle}</h2>
          <p class="product-count">
            <span id="category-product-count">${baseList.length}</span> \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D
          </p>

          <div class="products">
            ${renderProductGrid(baseList)}
          </div>
        </div>
      </div>
    </section>
  `;
    setActiveCategoryNav(resolved);
    setupFilters(container, products, resolved);
  }
  var init_categoryPage = __esm({
    "js/pages/categoryPage.js"() {
      init_productCard();
      init_categoryNav();
      init_categoryCatalog();
    }
  });

  // js/components/brandNav.js
  function setActiveBrandNav(resolved) {
    const brandParams = brandPathToParams(window.location.pathname);
    const brandItem = document.querySelector(".cat-nav__item--brand");
    if (brandParams === null) return;
    document.querySelectorAll(".cat-nav__item").forEach((item) => {
      item.classList.remove("active");
    });
    brandItem?.classList.add("active");
    brandItem?.querySelectorAll(".dropdown__item").forEach((link2) => {
      link2.classList.remove("dropdown__item--active");
    });
    if (!resolved?.brandSlug) return;
    const link = brandItem?.querySelector(
      `[data-brand-slug="${resolved.brandSlug}"], a[href="${buildBrandPath({ brandSlug: resolved.brandSlug })}"]`
    );
    link?.classList.add("dropdown__item--active");
  }
  function setupBrandNav() {
    bindBrandNavLinks();
    setActiveBrandNav();
  }
  var init_brandNav = __esm({
    "js/components/brandNav.js"() {
      init_brandCatalog();
    }
  });

  // js/components/categoryFilters.js
  function getSearchText(product) {
    let ingredients = "";
    if (Array.isArray(product.ingredients)) {
      ingredients = product.ingredients.join(" ");
    } else if (product.ingredients) {
      ingredients = String(product.ingredients);
    }
    return (product.name + " " + product.brand + " " + (product.description || "") + " " + ingredients).toLowerCase();
  }
  function productMatches(product, filter, useConcernIds) {
    const text = getSearchText(product);
    if (useConcernIds && filter.ids && filter.ids.length) {
      const concernIds = product.concernIds || [];
      for (let i = 0; i < filter.ids.length; i++) {
        if (concernIds.includes(filter.ids[i])) return true;
      }
    }
    for (let i = 0; i < filter.words.length; i++) {
      if (text.includes(filter.words[i])) return true;
    }
    return false;
  }
  function countMatches(products, filter, useConcernIds) {
    let count = 0;
    for (let i = 0; i < products.length; i++) {
      if (productMatches(products[i], filter, useConcernIds)) count++;
    }
    return count;
  }
  function getFilterSets(mode) {
    if (mode === "hair") {
      return {
        types: hairTypes,
        concerns: [],
        typeName: "hair-type",
        concernName: "hair-concern",
        typeTitle: "\u04AE\u0441\u043D\u0438\u0439 \u0442\u04E9\u0440\u04E9\u043B",
        concernTitle: "",
        useConcernIds: false,
        showConcerns: false
      };
    }
    return {
      types: skinTypes,
      concerns: skinConcerns,
      typeName: "skin-type",
      concernName: "skin-concern",
      typeTitle: "\u0410\u0440\u044C\u0441\u043D\u044B \u0442\u04E9\u0440\u04E9\u043B",
      concernTitle: "\u0410\u0440\u044C\u0441\u043D\u044B \u0430\u0441\u0443\u0443\u0434\u0430\u043B",
      useConcernIds: true,
      showConcerns: true
    };
  }
  function renderFilterGroup(products, items, inputName, useConcernIds, defaultCheckedId) {
    defaultCheckedId = defaultCheckedId || "";
    return items.map((item) => {
      let checked = "";
      if (defaultCheckedId === item.id) checked = " checked";
      return `
      <li class="category-sidebar__filter-item">
        <label class="category-sidebar__filter-label">
          <input type="checkbox" class="category-sidebar__filter-input" name="${inputName}" value="${item.id}"${checked}>
          <span class="category-sidebar__filter-name">${item.name}</span>
          <span class="category-sidebar__filter-count">${countMatches(products, item, useConcernIds)}</span>
        </label>
      </li>
    `;
    }).join("");
  }
  function renderSidebarFilters(products, resolved, mode) {
    const sets = getFilterSets(mode);
    let defaultConcern = "";
    if (mode === "skin" && resolved && resolved.concernId) {
      defaultConcern = skinConcernMap2[resolved.concernId] || "";
    }
    const typesHtml = renderFilterGroup(products, sets.types, sets.typeName, false);
    let concernsBlock = "";
    if (sets.showConcerns && sets.concerns.length) {
      const concernsHtml = renderFilterGroup(
        products,
        sets.concerns,
        sets.concernName,
        sets.useConcernIds,
        defaultConcern
      );
      concernsBlock = '<h3 class="category-sidebar__filter-heading">' + sets.concernTitle + '</h3><ul class="category-sidebar__filter-list">' + concernsHtml + "</ul>";
    }
    return '<div class="category-sidebar__filters" data-filter-mode="' + mode + '"><h3 class="category-sidebar__filter-heading">' + sets.typeTitle + '</h3><ul class="category-sidebar__filter-list">' + typesHtml + "</ul>" + concernsBlock + "</div>";
  }
  function getCheckedValues(sidebar, inputName) {
    const values = [];
    const boxes = sidebar.querySelectorAll('input[name="' + inputName + '"]:checked');
    boxes.forEach((box) => values.push(box.value));
    return values;
  }
  function filterBySelected(list, selectedIds, filters, useConcernIds) {
    if (!selectedIds.length) return list;
    return list.filter((product) => {
      for (let i = 0; i < filters.length; i++) {
        if (!selectedIds.includes(filters[i].id)) continue;
        if (productMatches(product, filters[i], useConcernIds)) return true;
      }
      return false;
    });
  }
  function applySidebarFilters(list, sidebar, mode) {
    if (!sidebar) return list;
    const sets = getFilterSets(mode);
    const typeIds = getCheckedValues(sidebar, sets.typeName);
    const concernIds = getCheckedValues(sidebar, sets.concernName);
    let result = filterBySelected(list, typeIds, sets.types, false);
    result = filterBySelected(result, concernIds, sets.concerns, sets.useConcernIds);
    return result;
  }
  function setupSidebarFilters(container, getList, onUpdate) {
    const sidebar = container.querySelector(".category-sidebar");
    const sortSelect = container.querySelector(".sorting");
    if (!sidebar) return;
    const filterBox = sidebar.querySelector("[data-filter-mode]");
    let mode = "skin";
    if (filterBox) mode = filterBox.dataset.filterMode;
    function refresh() {
      const list = applySidebarFilters(getList(), sidebar, mode);
      let sortKey = "";
      if (sortSelect) sortKey = sortSelect.value;
      onUpdate(list, sortKey);
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", refresh);
    }
    sidebar.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") refresh();
    });
  }
  var skinTypes, skinConcerns, hairTypes, skinConcernMap2;
  var init_categoryFilters = __esm({
    "js/components/categoryFilters.js"() {
      skinTypes = [
        { id: "oily", name: "\u0422\u043E\u0441\u043B\u043E\u0433", words: ["\u0442\u043E\u0441\u043B\u043E\u0433", "\u0433\u0435\u043B", "sebum"] },
        { id: "dry", name: "\u0425\u0443\u0443\u0440\u0430\u0439", words: ["\u0445\u0443\u0443\u0440\u0430\u0439", "\u0447\u0438\u0439\u0433", "moist", "\u043A\u0440\u0435\u043C"] },
        { id: "dry-combo", name: "\u0425\u0443\u0443\u0440\u0430\u0439-\u0425\u043E\u043B\u0438\u043C\u043E\u0433", words: ["\u0445\u043E\u043B\u0438\u043C\u043E\u0433", "\u0445\u0443\u0443\u0440\u0430\u0439"] },
        { id: "oily-combo", name: "\u0422\u043E\u0441\u043B\u043E\u0433-\u0425\u043E\u043B\u0438\u043C\u043E\u0433", words: ["\u0445\u043E\u043B\u0438\u043C\u043E\u0433", "\u0442\u043E\u0441\u043B\u043E\u0433"] }
      ];
      skinConcerns = [
        { id: "pigment", name: "\u041D\u04E9\u0441\u04E9\u04E9 \u0442\u043E\u043B\u0431\u043E\u0442\u043E\u0439", ids: [4], words: ["\u0442\u043E\u043B\u0431\u043E", "\u0446\u0430\u0439\u0440\u0443\u0443\u043B"] },
        { id: "redness", name: "\u0423\u043B\u0430\u0439\u043B\u0442\u0442\u0430\u0439", ids: [2], words: ["\u0443\u043B\u0430\u0439\u043B\u0442", "cica", "\u0442\u0430\u0439\u0432\u0448\u0440\u0443\u0443\u043B"] },
        { id: "acne", name: "\u0411\u0430\u0442\u0433\u0430 \u0433\u0430\u0440\u0430\u043C\u0442\u0433\u0430\u0439", ids: [5, 6], words: ["\u0431\u0430\u0442\u0433\u0430", "acne", "bha"] },
        { id: "wrinkle", name: "\u04AE\u0440\u0447\u043B\u044D\u044D\u0442\u044D\u0439", ids: [7], words: ["\u04AF\u0440\u0447\u043B\u044D\u044D", "\u0440\u0435\u0442\u0438\u043D\u043E\u043B"] },
        { id: "pores", name: "\u041D\u04AF\u0445\u0436\u0438\u043B\u0442\u0442\u044D\u0439", ids: [5], words: ["\u043D\u04AF\u0445", "\u043D\u04AF\u0445\u0436\u0438\u043B\u0442"] },
        { id: "sebum", name: "\u0422\u043E\u0441\u043B\u043E\u0433\u0436\u0438\u043B\u0442\u0442\u043E\u0439", ids: [5], words: ["\u0442\u043E\u0441\u043B\u043E\u0433", "sebum"] },
        { id: "dryness", name: "\u0425\u0443\u0443\u0440\u0430\u0439\u0448\u0438\u043B\u0442\u0442\u0430\u0439", ids: [1, 3], words: ["\u0445\u0443\u0443\u0440\u0430\u0439", "\u0447\u0438\u0439\u0433"] }
      ];
      hairTypes = [
        { id: "chemical", name: "\u0425\u0438\u043C\u0438\u0442\u044D\u0439", words: ["\u0445\u0438\u043C\u0438\u0439\u043D", "\u0438\u043D\u0434\u04AF\u04AF", "\u0445\u0438\u043C\u0438\u0439\u043D \u04AF\u0439\u043B\u0447\u0438\u043B\u0433\u044D\u044D", "perm", "wave"] },
        { id: "colored", name: "\u0411\u0443\u0434\u0430\u0433\u0442\u0430\u0439", words: ["\u0431\u0443\u0434\u0430\u043B\u0442", "\u04E9\u043D\u0433\u04E9", "color", "dye", "colored"] },
        { id: "dry", name: "\u0425\u0443\u0443\u0440\u0430\u0439", words: ["\u0445\u0443\u0443\u0440\u0430\u0439", "\u0445\u0443\u0443\u0440\u0430\u0439\u0448\u0438\u043B", "\u0447\u0438\u0439\u0433", "dry", "moist"] },
        { id: "straight", name: "\u0428\u0443\u043B\u0443\u0443\u043D", words: ["\u0448\u0443\u043B\u0443\u0443\u043D", "straight", "\u0433\u04E9\u043B\u0433\u04E9\u0440", "silky"] },
        { id: "damaged", name: "\u0413\u044D\u043C\u0442\u044D\u043B\u0442\u044D\u0439", words: ["\u0433\u044D\u043C\u0442\u0441\u044D\u043D", "\u0433\u044D\u043C\u0442\u044D\u043B\u0442", "\u0433\u0430\u0440\u0441\u0430\u043D", "damage", "recovery", "keratin"] }
      ];
      skinConcernMap2 = {
        1: "dryness",
        2: "redness",
        3: "dryness",
        4: "pigment",
        5: "pores",
        6: "acne",
        7: "wrinkle"
      };
    }
  });

  // js/pages/brandPage.js
  function filterProducts2(products, resolved) {
    if (!resolved.brandName) return products;
    return products.filter((product) => productMatchesBrand(product, resolved.brandName));
  }
  function sortProducts2(list, sortKey) {
    const items = [...list];
    switch (sortKey) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "sale":
        return items.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return items;
    }
  }
  function renderProductGrid2(products) {
    if (!products.length) {
      return `<p class="category-page__empty">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</p>`;
    }
    return products.map((product) => template.cardTemplate(product)).join("");
  }
  function renderBrandSidebar(resolved, products) {
    const catalog3 = getBrandCatalog();
    if (!catalog3) return "";
    const brandList = filterProducts2(products, resolved);
    const filtersHtml = renderSidebarFilters(brandList, null, "skin");
    const listHtml = catalog3.brands.map((brand) => {
      const isActive = resolved.brandSlug === brand.slug;
      return `
        <li class="category-sidebar__item">
          <a href="${buildBrandPath({ brandSlug: brand.slug })}" class="category-sidebar__sub${isActive ? " is-active" : ""}">
            <span>${brand.name}</span>
          </a>
        </li>
      `;
    }).join("");
    const allActive = !resolved.brandSlug ? " is-active" : "";
    return `
    <aside class="category-sidebar" aria-label="\u0411\u0440\u044D\u043D\u0434">
      <div class="category-sidebar__group">
        <a href="${buildBrandPath()}" class="category-sidebar__parent${allActive}">\u0411\u04AF\u0445 \u0431\u0440\u044D\u043D\u0434</a>
        <ul class="category-sidebar__list">${listHtml}</ul>
      </div>
      ${filtersHtml}
    </aside>
  `;
  }
  function renderBreadcrumb2(resolved, pageTitle) {
    const sep = `<span class="category-page__sep" aria-hidden="true">&gt;</span>`;
    if (!resolved.brandName) {
      return `
      <a href="/" class="category-page__crumb">\u041D\u04AF\u04AF\u0440</a>
      ${sep}
      <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
    `;
    }
    return `
    <a href="/" class="category-page__crumb">\u041D\u04AF\u04AF\u0440</a>
    ${sep}
    <a href="${buildBrandPath()}" class="category-page__crumb">\u0411\u0440\u044D\u043D\u0434</a>
    ${sep}
    <span class="category-page__crumb category-page__crumb--current">${pageTitle}</span>
  `;
  }
  function renderSortSelect() {
    return `
    <div class="category-sort">
      <select class="sorting">
        <option value="">--\u042D\u0440\u044D\u043C\u0431\u044D\u043B\u044D\u0445--</option>
        <option value="price-asc">\u04AE\u043D\u044D \u04E9\u0441\u04E9\u0445\u04E9\u04E9\u0440</option>
        <option value="price-desc">\u04AE\u043D\u044D \u0431\u0443\u0443\u0440\u0430\u0445\u0430\u0430\u0440</option>
        <option value="sale">\u0425\u044F\u043C\u0434\u0430\u0440\u0441\u0430\u043D</option>
      </select>
    </div>
  `;
  }
  function renderBrandPage(products, container, params) {
    const resolved = resolveBrandParams(params);
    if (resolved.notFound) {
      container.innerHTML = `
      <section class="category-page">
        <h2 class="category-page__title">\u0411\u0440\u044D\u043D\u0434 \u043E\u043B\u0434\u0441\u043E\u043D\u0433\u04AF\u0439</h2>
        <p><a href="/b">\u0411\u04AF\u0445 \u0431\u0440\u044D\u043D\u0434 \u0440\u04AF\u04AF \u0431\u0443\u0446\u0430\u0445</a></p>
      </section>
    `;
      setActiveCategoryNav();
      setActiveBrandNav();
      return;
    }
    const pageTitle = getBrandPageTitle(resolved);
    const filtered = filterProducts2(products, resolved);
    container.innerHTML = `
    <section class="category-page category-page--brand">
      <div class="category-layout">
        ${renderBrandSidebar(resolved, products)}
        <div class="category-main">
          <div class="category-toolbar">
            <nav class="category-page__breadcrumb" aria-label="\u0417\u0430\u043C">${renderBreadcrumb2(resolved, pageTitle)}</nav>
            ${renderSortSelect()}
          </div>
          <div class="products">
            ${renderProductGrid2(filtered)}
          </div>
        </div>
      </div>
    </section>
  `;
    setActiveCategoryNav();
    setActiveBrandNav(resolved);
    const grid = container.querySelector(".products");
    setupSidebarFilters(
      container,
      () => filterProducts2(products, resolved),
      (list, sortKey) => {
        grid.innerHTML = renderProductGrid2(sortProducts2(list, sortKey));
      }
    );
  }
  var init_brandPage = __esm({
    "js/pages/brandPage.js"() {
      init_productCard();
      init_brandNav();
      init_categoryNav();
      init_brandCatalog();
      init_categoryFilters();
    }
  });

  // js/pages/accountPage.js
  async function renderAccountPage(app, section = "profile") {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const content = section === "orders" ? await renderOrders(user) : renderProfile(user);
    app.innerHTML = `
    <div class="account-layout">
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
            \u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0443\u0443\u0434
          </a>
          <a href="/account/profile" class="account-nav__item ${section === "profile" ? "active" : ""}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            \u0425\u0443\u0432\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B
          </a>
        </nav>
      </aside>

      <main class="account-content">
        ${content}
      </main>
    </div>
  `;
    _bindAccountEvents(user, section);
  }
  function renderProfile(user) {
    return `
    <div class="account-section">
      <h2 class="account-section__title">\u0425\u0443\u0432\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B</h2>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">\u041D\u044D\u0440</span>
          <span class="profile-field__value" id="display-name">${user.name}</span>
        </div>
        <button class="profile-field__btn" data-field="name">\u270E \u0417\u0430\u0441\u0430\u0445</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">\u0426\u0430\u0445\u0438\u043C \u0448\u0443\u0443\u0434\u0430\u043D</span>
          <span class="profile-field__value">${user.email}</span>
        </div>
        <button class="profile-field__btn" data-field="email">\u270E \u0417\u0430\u0441\u0430\u0445</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">\u0423\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440</span>
          <span class="profile-field__value" id="display-phone">${user.phone || "\u2013"}</span>
        </div>
        <button class="profile-field__btn" data-field="phone">\u270E \u0417\u0430\u0441\u0430\u0445</button>
      </div>

      <div class="profile-field">
        <div class="profile-field__info">
          <span class="profile-field__label">\u041D\u0443\u0443\u0446 \u04AF\u0433</span>
          <span class="profile-field__value">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>
        </div>
        <button class="profile-field__btn" data-field="password">\u21BA \u0421\u043E\u043B\u0438\u0445</button>
      </div>
    </div>

    <div class="profile-edit-modal hidden" id="profile-edit-modal">
      <div class="profile-edit-box">
        <h3 id="edit-modal-title">\u0417\u0430\u0441\u0430\u0445</h3>
        <div id="edit-modal-body"></div>
        <p class="profile-error hidden" id="edit-error"></p>
        <div class="profile-edit-actions">
          <button class="profile-cancel-btn" id="edit-cancel">\u0411\u043E\u043B\u0438\u0445</button>
          <button class="profile-save-btn" id="edit-save">\u0425\u0430\u0434\u0433\u0430\u043B\u0430\u0445</button>
        </div>
      </div>
    </div>
  `;
  }
  async function renderOrders(user) {
    try {
      const res = await fetch(`/api/orders/my/${user.id}`);
      const orders = await res.json();
      if (!orders.length) {
        return `
        <div class="account-section">
          <h2 class="account-section__title">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0443\u0443\u0434</h2>
          <div class="orders-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>\u041E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430</p>
          </div>
        </div>
      `;
      }
      const statusLabel = {
        pending: "\u0425\u04AF\u043B\u044D\u044D\u0433\u0434\u044D\u0436 \u0431\u0430\u0439\u043D\u0430",
        confirmed: "\u0411\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0441\u0430\u043D",
        delivered: "\u0425\u04AF\u0440\u0433\u044D\u0433\u0434\u0441\u044D\u043D",
        cancelled: "\u0426\u0443\u0446\u043B\u0430\u0433\u0434\u0441\u0430\u043D"
      };
      const statusClass = {
        pending: "order-status--pending",
        confirmed: "order-status--confirmed",
        delivered: "order-status--delivered",
        cancelled: "order-status--cancelled"
      };
      return `
      <div class="account-section">
        <h2 class="account-section__title">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0443\u0443\u0434</h2>
        ${orders.map((o) => `
          <div class="order-card">
            <div class="order-card__header">
              <div>
                <p class="order-card__date">${new Date(o.createdAt).toLocaleDateString("mn-MN")}</p>
                <p class="order-card__total">${Math.round(o.totalPrice).toLocaleString("mn-MN")}\u20AE</p>
              </div>
              <span class="order-status ${statusClass[o.status] || ""}">
                ${statusLabel[o.status] || o.status}
              </span>
            </div>
            <div class="order-card__items">
              ${o.items.map((item) => `
                <div class="order-card__item">
                  <img src="/images/${item.img}" onerror="this.src='/images/placeholder.svg'" />
                  <div>
                    <p class="order-card__item-name">${item.name}</p>
                    <p class="order-card__item-meta">${item.qty} \u0448 \xB7 ${Math.round(item.price).toLocaleString("mn-MN")}\u20AE</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
    } catch {
      return `
      <div class="account-section">
        <h2 class="account-section__title">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0443\u0443\u0434</h2>
        <p style="color: var(--color-black-7)">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0430\u0447\u0430\u0430\u043B\u0430\u0445\u0430\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430</p>
      </div>
    `;
    }
  }
  function _bindAccountEvents(user, section) {
    if (section !== "profile") return;
    const modal = document.getElementById("profile-edit-modal");
    const title = document.getElementById("edit-modal-title");
    const body = document.getElementById("edit-modal-body");
    const errorEl = document.getElementById("edit-error");
    const saveBtn = document.getElementById("edit-save");
    const cancelBtn = document.getElementById("edit-cancel");
    let currentField = null;
    document.querySelectorAll(".profile-field__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentField = btn.dataset.field;
        errorEl.classList.add("hidden");
        errorEl.textContent = "";
        if (currentField === "name") {
          title.textContent = "\u041D\u044D\u0440 \u0437\u0430\u0441\u0430\u0445";
          body.innerHTML = `<input type="text" id="edit-input" value="${user.name}" placeholder="\u041D\u044D\u0440" />`;
        } else if (currentField === "email") {
          title.textContent = "\u0426\u0430\u0445\u0438\u043C \u0448\u0443\u0443\u0434\u0430\u043D \u0437\u0430\u0441\u0430\u0445";
          body.innerHTML = `<input type="email" id="edit-input" value="${user.email}" placeholder="\u0418-\u043C\u044D\u0439\u043B" />`;
        } else if (currentField === "phone") {
          title.textContent = "\u0423\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440 \u0437\u0430\u0441\u0430\u0445";
          body.innerHTML = `<input type="tel" id="edit-input" value="${user.phone || ""}" placeholder="\u0423\u0442\u0430\u0441" />`;
        } else if (currentField === "password") {
          title.textContent = "\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0441\u043E\u043B\u0438\u0445";
          body.innerHTML = `
          <input type="password" id="edit-input" placeholder="\u0428\u0438\u043D\u044D \u043D\u0443\u0443\u0446 \u04AF\u0433" />
          <input type="password" id="edit-input-confirm" placeholder="\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0434\u0430\u0432\u0442\u0430\u0445" style="margin-top:10px" />
        `;
        }
        modal.classList.remove("hidden");
        document.getElementById("edit-input")?.focus();
      });
    });
    cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
    saveBtn.addEventListener("click", async () => {
      errorEl.classList.add("hidden");
      errorEl.textContent = "";
      const input = document.getElementById("edit-input");
      const value = input?.value.trim();
      if (currentField === "password") {
        const confirm2 = document.getElementById("edit-input-confirm")?.value;
        if (!value || value.length < 6) {
          errorEl.textContent = "\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u0431\u0430\u0433\u0430\u0434\u0430\u0430 6 \u0442\u044D\u043C\u0434\u044D\u0433\u0442 \u0431\u0430\u0439\u043D\u0430";
          errorEl.classList.remove("hidden");
          return;
        }
        if (value !== confirm2) {
          errorEl.textContent = "\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0442\u0430\u0430\u0440\u0430\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430";
          errorEl.classList.remove("hidden");
          return;
        }
        const res2 = await fetch("/api/auth/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, password: value })
        });
        const data2 = await res2.json();
        if (!res2.ok) {
          errorEl.textContent = data2.error;
          errorEl.classList.remove("hidden");
          return;
        }
        modal.classList.add("hidden");
        return;
      }
      if (!value) {
        errorEl.textContent = "\u0423\u0442\u0433\u0430 \u0445\u043E\u043E\u0441\u043E\u043D \u0431\u0430\u0439\u0436 \u0431\u043E\u043B\u043E\u0445\u0433\u04AF\u0439";
        errorEl.classList.remove("hidden");
        return;
      }
      const body2 = { id: user.id };
      if (currentField === "name") body2.name = value;
      if (currentField === "phone") body2.phone = value;
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body2)
      });
      const data = await res.json();
      if (!res.ok) {
        errorEl.textContent = data.error;
        errorEl.classList.remove("hidden");
        return;
      }
      const updatedUser = { ...user, ...data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Object.assign(user, updatedUser);
      if (currentField === "name") {
        document.getElementById("display-name").textContent = value;
        const btnText = document.querySelector(".login-btn__text");
        if (btnText) btnText.textContent = value;
        const sidebarName = document.querySelector(".account-sidebar__name");
        if (sidebarName) sidebarName.textContent = value;
      }
      if (currentField === "phone") {
        const phoneEl = document.getElementById("display-phone");
        if (phoneEl) phoneEl.textContent = value;
      }
      modal.classList.add("hidden");
    });
  }
  var init_accountPage = __esm({
    "js/pages/accountPage.js"() {
    }
  });

  // js/pages/authPage.js
  var AuthModal;
  var init_authPage = __esm({
    "js/pages/authPage.js"() {
      AuthModal = class _AuthModal {
        static init() {
        }
        static open(tab = "login") {
          const url = tab === "register" ? "/signup" : "/login";
          history.pushState(null, "", url);
          _AuthModal.render(tab);
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
          }, 2e3);
        }
        static render(tab = "login") {
          const app = document.querySelector("#app");
          app.innerHTML = `
      <div class="auth-page">
        <div class="auth-box">
          <h1 class="auth-logo">BeautyShop</h1>

          <div class="auth-tabs">
            <button class="auth-tab ${tab === "login" ? "active" : ""}" data-tab="login">\u041D\u044D\u0432\u0442\u0440\u044D\u0445</button>
            <button class="auth-tab ${tab === "register" ? "active" : ""}" data-tab="register">\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445</button>
          </div>

          <div class="auth-form ${tab === "login" ? "" : "hidden"}" id="tab-login">
            <label>\u0418-\u043C\u044D\u0439\u043B</label>
            <input type="email" id="login-email" placeholder="your@email.com" />
            <label>\u041D\u0443\u0443\u0446 \u04AF\u0433</label>
            <input type="password" id="login-password" />
            <p class="auth-error" id="login-error"></p>
            <button class="auth-submit" id="login-submit">\u041D\u044D\u0432\u0442\u0440\u044D\u0445</button>
          </div>

          <div class="auth-form ${tab === "register" ? "" : "hidden"}" id="tab-register">
            <label>\u041D\u044D\u0440</label>
            <input type="text" id="reg-name" />
            <label>\u0418-\u043C\u044D\u0439\u043B</label>
            <input type="email" id="reg-email" />
            <label>\u0423\u0442\u0430\u0441</label>
            <input type="tel" id="reg-phone" />
            <label>\u041D\u0443\u0443\u0446 \u04AF\u0433</label>
            <input type="password" id="reg-password" />
            <label>\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0434\u0430\u0432\u0442\u0430\u0445</label>
            <input type="password" id="reg-password-confirm" />
            <p class="auth-error" id="reg-error"></p>
            <button class="auth-submit" id="reg-submit">\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445</button>
          </div>

          <div class="auth-success hidden" id="auth-success">
            <p id="auth-success-msg"></p>
          </div>
        </div>
      </div>
    `;
          _AuthModal._bindPageEvents();
        }
        static _bindPageEvents() {
          document.querySelectorAll(".auth-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
              _AuthModal.open(tab.dataset.tab);
            });
          });
          document.getElementById("login-submit")?.addEventListener("click", async () => {
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;
            const errorEl = document.getElementById("login-error");
            errorEl.textContent = "";
            const res = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
              errorEl.textContent = data.error;
              return;
            }
            _AuthModal._saveUser(data.user);
            _AuthModal.showToast(`\u0422\u0430\u0432\u0442\u0430\u0439 \u043C\u043E\u0440\u0438\u043B, ${data.user.name}!`);
            setTimeout(() => {
              history.pushState(null, "", "/");
              window.location.reload();
            }, 2e3);
          });
          document.getElementById("reg-submit")?.addEventListener("click", async () => {
            const name = document.getElementById("reg-name").value.trim();
            const email = document.getElementById("reg-email").value.trim();
            const password = document.getElementById("reg-password").value;
            const confirm2 = document.getElementById("reg-password-confirm").value;
            const errorEl = document.getElementById("reg-error");
            errorEl.textContent = "";
            if (password !== confirm2) {
              errorEl.textContent = "\u041D\u0443\u0443\u0446 \u04AF\u0433 \u0442\u0430\u0430\u0440\u0430\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430";
              return;
            }
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) {
              errorEl.textContent = data.error;
              return;
            }
            _AuthModal._saveUser(data.user);
            _AuthModal.showToast("\u0410\u043C\u0436\u0438\u043B\u0442\u0442\u0430\u0439 \u0431\u04AF\u0440\u0442\u0433\u044D\u0433\u0434\u043B\u044D\u044D!");
            setTimeout(() => {
              _AuthModal.open("login");
            }, 2e3);
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
      };
    }
  });

  // js/pages/adminPage.js
  async function renderAdminPage(app) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.isAdmin) {
      window.location.href = "/";
      return;
    }
    app.innerHTML = `
    <div class="admin-page">
      <div class="admin-header">
        <div>
          <h1 class="admin-header__title">\u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B</h1>
          <p class="admin-header__sub">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u0431\u043E\u043B\u043E\u043D \u0437\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0443\u0434\u0438\u0440\u0434\u0430\u0445</p>
        </div>
        <button class="admin-back-btn" onclick="history.back()">\u2190 \u0411\u0443\u0446\u0430\u0445</button>
      </div>

      <!-- Stats -->
      <div class="admin-stats">
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">\u041D\u0438\u0439\u0442 \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</p>
            <p class="admin-stat-card__value" id="stat-products">\u2013</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
        </div>
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430</p>
            <p class="admin-stat-card__value" id="stat-orders">0</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
        </div>
        <div class="admin-stat-card">
          <div>
            <p class="admin-stat-card__label">\u0418\u0434\u044D\u0432\u0445\u0442\u044D\u0439 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447</p>
            <p class="admin-stat-card__value" id="stat-users">\u2013</p>
          </div>
          <div class="admin-stat-card__icon admin-stat-card__icon--pink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="admin-tabs">
        <button class="admin-tab active" data-tab="products">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D</button>
        <button class="admin-tab" data-tab="orders">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430</button>
        <button class="admin-tab" data-tab="add">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043D\u044D\u043C\u044D\u0445</button>
      </div>

      <!-- Tab content -->
      <div class="admin-content" id="admin-content">
        <div class="admin-loading">\u0410\u0447\u0430\u0430\u043B\u0436 \u0431\u0430\u0439\u043D\u0430...</div>
      </div>
    </div>
  `;
    await _loadStats();
    await _renderTab("products");
    _bindTabEvents();
  }
  async function _loadStats() {
    try {
      const [productsRes, usersRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/users")
      ]);
      const products = await productsRes.json();
      const users = await usersRes.json();
      document.getElementById("stat-products").textContent = products.length || 0;
      document.getElementById("stat-users").textContent = users.length || 0;
    } catch {
    }
  }
  function _bindTabEvents() {
    document.querySelectorAll(".admin-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        _renderTab(tab.dataset.tab);
      });
    });
  }
  async function _renderTab(tab) {
    const content = document.getElementById("admin-content");
    if (tab === "products") {
      const res = await fetch("/api/admin/products");
      const products = await res.json();
      content.innerHTML = `
      <div class="admin-table-wrap">
        <h3 class="admin-table-title">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442</h3>
        ${products.map((p) => `
          <div class="admin-product-row" data-id="${p._id}">
            <img class="admin-product-row__img" src="/images/${p.img}" onerror="this.src='/images/placeholder.svg'" />
            <div class="admin-product-row__info">
              <p class="admin-product-row__name">${p.name}</p>
              <p class="admin-product-row__meta">${Number(p.price).toLocaleString("mn-MN")}\u20AE &nbsp;\xB7&nbsp; \u041D\u04E9\u04E9\u0446: ${p.stock || 0} &nbsp;
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
      content.querySelectorAll(".admin-delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          if (!confirm("\u0423\u0441\u0442\u0433\u0430\u0445 \u0443\u0443?")) return;
          await fetch(`/api/admin/products/${btn.dataset.id}`, { method: "DELETE" });
          _renderTab("products");
          _loadStats();
        });
      });
      content.querySelectorAll(".admin-edit-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const res2 = await fetch(`/api/admin/products/${btn.dataset.id}`);
          const p = await res2.json();
          _showEditModal(p);
        });
      });
    } else if (tab === "orders") {
      content.innerHTML = `
      <div class="admin-table-wrap">
        <h3 class="admin-table-title">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u044B\u043D \u0436\u0430\u0433\u0441\u0430\u0430\u043B\u0442</h3>
        <p class="admin-empty">\u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0430 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430</p>
      </div>
    `;
    } else if (tab === "add") {
      content.innerHTML = `
      <div class="admin-form-wrap">
        <h3 class="admin-table-title">\u0428\u0438\u043D\u044D \u0431\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043D\u044D\u043C\u044D\u0445</h3>
        ${_productFormHtml()}
        <button class="admin-submit-btn" id="admin-add-btn">\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u043D\u044D\u043C\u044D\u0445</button>
        <p class="admin-form-error hidden" id="admin-form-error"></p>
      </div>
    `;
      document.getElementById("admin-add-btn").addEventListener("click", async () => {
        const body = _getFormValues();
        if (!body.name || !body.price) {
          document.getElementById("admin-form-error").textContent = "\u041D\u044D\u0440 \u0431\u043E\u043B\u043E\u043D \u04AF\u043D\u044D \u0437\u0430\u0430\u0432\u0430\u043B \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439";
          document.getElementById("admin-form-error").classList.remove("hidden");
          return;
        }
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          alert("\u0410\u043C\u0436\u0438\u043B\u0442\u0442\u0430\u0439 \u043D\u044D\u043C\u044D\u0433\u0434\u043B\u044D\u044D!");
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
        <label>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D\u0438\u0439 \u043D\u044D\u0440</label>
        <input type="text" id="f-name" value="${p.name || ""}" />
      </div>
      <div class="admin-form__field">
        <label>\u0422\u0430\u0439\u043B\u0431\u0430\u0440</label>
        <textarea id="f-desc" rows="4">${p.description || ""}</textarea>
      </div>
      <div class="admin-form__row">
        <div class="admin-form__field">
          <label>\u04AE\u043D\u044D (\u20AE)</label>
          <input type="number" id="f-price" value="${p.price || ""}" />
        </div>
        <div class="admin-form__field">
          <label>\u041D\u04E9\u04E9\u0446</label>
          <input type="number" id="f-stock" value="${p.stock || ""}" />
        </div>
      </div>
      <div class="admin-form__field">
        <label>\u0410\u043D\u0433\u0438\u043B\u0430\u043B</label>
        <select id="f-category">
          <option value="">\u0410\u043D\u0433\u0438\u043B\u0430\u043B \u0441\u043E\u043D\u0433\u043E\u0445</option>
          <option value="skincare" ${p.categorySlug === "skincare" ? "selected" : ""}>\u0410\u0440\u044C\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="makeup" ${p.categorySlug === "makeup" ? "selected" : ""}>\u041D\u04AF\u04AF\u0440 \u0431\u0443\u0434\u0430\u043B\u0442</option>
          <option value="sun-care" ${p.categorySlug === "sun-care" ? "selected" : ""}>\u041D\u0430\u0440\u043D\u044B \u0445\u0430\u043C\u0433\u0430\u0430\u043B\u0430\u043B\u0442</option>
          <option value="body-care" ${p.categorySlug === "body-care" ? "selected" : ""}>\u0411\u0438\u0435 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
          <option value="hair-care" ${p.categorySlug === "hair-care" ? "selected" : ""}>\u04AE\u0441 \u0430\u0440\u0447\u0438\u043B\u0433\u0430\u0430</option>
        </select>
      </div>
      <div class="admin-form__field">
        <label>\u0417\u0443\u0440\u0433\u0438\u0439\u043D URL</label>
        <input type="text" id="f-img" value="${p.img || ""}" placeholder="https://..." />
      </div>
    </div>
  `;
  }
  function _getFormValues() {
    return {
      name: document.getElementById("f-name")?.value.trim(),
      description: document.getElementById("f-desc")?.value.trim(),
      price: Number(document.getElementById("f-price")?.value),
      stock: Number(document.getElementById("f-stock")?.value),
      categorySlug: document.getElementById("f-category")?.value,
      img: document.getElementById("f-img")?.value.trim()
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
        <h3>\u0411\u04AF\u0442\u044D\u044D\u0433\u0434\u044D\u0445\u04AF\u04AF\u043D \u0437\u0430\u0441\u0430\u0445</h3>
        <button class="admin-modal__close" id="admin-modal-close">\u2715</button>
      </div>
      ${_productFormHtml(p)}
      <p class="admin-form-error hidden" id="admin-edit-error"></p>
      <div class="admin-modal__footer">
        <button class="admin-cancel-btn" id="admin-modal-close2">\u0411\u043E\u043B\u0438\u0445</button>
        <button class="admin-submit-btn" id="admin-edit-save">\u0425\u0430\u0434\u0433\u0430\u043B\u0430\u0445</button>
      </div>
    </div>
  `;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    document.getElementById("admin-modal-close").addEventListener("click", close);
    document.getElementById("admin-modal-close2").addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    document.getElementById("admin-edit-save").addEventListener("click", async () => {
      const body = _getFormValues();
      const res = await fetch(`/api/admin/products/${p._id}`, {
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
  var init_adminPage = __esm({
    "js/pages/adminPage.js"() {
    }
  });

  // js/router.js
  function router(products) {
    const app = document.querySelector("#app");
    const pathname = window.location.pathname;
    if (pathname === "/login") {
      AuthModal.render("login");
      return;
    }
    if (pathname === "/signup") {
      AuthModal.render("register");
      return;
    }
    if (pathname === "/account/profile") {
      renderAccountPage(app, "profile");
      return;
    }
    if (pathname === "/account/orders") {
      renderAccountPage(app, "orders");
      return;
    }
    if (pathname === "/admin") {
      renderAdminPage(app);
      return;
    }
    const { page, params } = parseLocation();
    window.scrollTo(0, 0);
    switch (page) {
      case "home":
        renderHomePage(products, app);
        break;
      case "high-rated":
        renderHighRatedPage(products, app);
        break;
      case "sales":
        renderSalePage(products, app);
        break;
      case "concern":
        renderCategoryPage(products, app, params);
        break;
      case "wishlist":
        renderHomePage(products, app);
        renderWishlistPage(products, app);
        break;
      case "cart":
        renderCartPage(products, app);
        break;
      case "about":
        renderAboutPage(app);
        break;
      case "location":
        renderLocationPage(app);
        break;
      case "privacy":
        renderPrivacyPage(app);
        break;
      case "terms":
        renderTermsPage(app);
        break;
      case "skin-coach":
        renderSkinCoachPage(products, app);
        break;
      case "delivery":
        renderDeliveryPage(app);
        break;
      case "product-detail":
        renderProductDetailPage(products, app, params);
        break;
      case "search":
        renderSearchPage(products, app, params);
        break;
      case "category":
        renderCategoryPage(products, app, params);
        break;
      case "brand":
        renderBrandPage(products, app, params);
        break;
      default:
        app.innerHTML = `
        <section class="page">
          <h2>Page not found</h2>
          <a href="/">Back to home</a>
        </section>
      `;
    }
  }
  var init_router = __esm({
    "js/router.js"() {
      init_homePage();
      init_highRatedPage();
      init_salePage();
      init_aboutPage();
      init_locationPage();
      init_privacyPage();
      init_termsPage();
      init_skinCoachPage();
      init_deliveryPage();
      init_productDetailPage();
      init_wishlistPage();
      init_cartPage();
      init_searchPage();
      init_categoryPage();
      init_brandPage();
      init_accountPage();
      init_navigation();
      init_authPage();
      init_adminPage();
    }
  });

  // js/components/userDropdown.js
  function setupUserDropdown() {
    const btn = document.querySelector(".login-btn");
    if (!btn) return;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const dropdown = document.createElement("div");
    dropdown.className = "user-dropdown hidden";
    const adminItem = user?.isAdmin ? `<a class="user-dropdown__item" data-route="admin">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        \u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B
      </a>
      <div class="user-dropdown__divider"></div>` : "";
    dropdown.innerHTML = `
    ${adminItem}
    <a class="user-dropdown__item" data-route="orders">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      \u0417\u0430\u0445\u0438\u0430\u043B\u0433\u0443\u0443\u0434
    </a>
    <a class="user-dropdown__item" data-route="profile">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      \u0425\u0443\u0432\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B
    </a>
    <div class="user-dropdown__divider"></div>
    <a class="user-dropdown__item user-dropdown__item--logout" id="logout-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      \u0413\u0430\u0440\u0430\u0445
    </a>
  `;
    btn.parentElement.style.position = "relative";
    btn.parentElement.appendChild(dropdown);
    btn.addEventListener("click", (e) => {
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");
      if (!currentUser) {
        AuthModal.open("login");
        return;
      }
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });
    dropdown.querySelector("#logout-btn").addEventListener("click", () => {
      localStorage.removeItem("user");
      dropdown.classList.add("hidden");
      const btnText = document.querySelector(".login-btn__text");
      if (btnText) btnText.textContent = "\u041D\u044D\u0432\u0442\u0440\u044D\u0445";
      window.location.href = "/";
    });
    dropdown.querySelector("[data-route='orders']").addEventListener("click", () => {
      dropdown.classList.add("hidden");
      history.pushState(null, "", "/account/orders");
      window.location.reload();
    });
    dropdown.querySelector("[data-route='profile']").addEventListener("click", () => {
      dropdown.classList.add("hidden");
      history.pushState(null, "", "/account/profile");
      window.location.reload();
    });
    dropdown.querySelector("[data-route='admin']")?.addEventListener("click", () => {
      dropdown.classList.add("hidden");
      history.pushState(null, "", "/admin");
      window.location.reload();
    });
    document.addEventListener("click", (e) => {
      if (!btn.parentElement.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }
  function updateUserBtn() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const btnText = document.querySelector(".login-btn__text");
    if (!btnText) return;
    btnText.textContent = user ? user.name : "\u041D\u044D\u0432\u0442\u0440\u044D\u0445";
  }
  var init_userDropdown = __esm({
    "js/components/userDropdown.js"() {
      init_authPage();
    }
  });

  // js/main.js
  var require_main = __commonJS({
    "js/main.js"() {
      var import_cartButton2 = __toESM(require_cartButton());
      var import_wishlistButton2 = __toESM(require_wishlistButton());
      init_router();
      init_navbarCount();
      init_cardAction();
      init_wishlistPage();
      init_cartPage();
      init_categoryNav();
      init_brandNav();
      init_categoryCatalog();
      init_brandCatalog();
      init_navigation();
      init_assets();
      init_authPage();
      init_userDropdown();
      var Product = class {
        constructor(product) {
          this.id = product.id;
          this.name = product.name;
          this.brand = product.brand;
          this.price = product.price;
          this.discount = product.discount || 0;
          this.newPrice = product.price - product.price * this.discount / 100;
          this.rating = product.rating;
          this.reviews = product.reviews;
          this.categoryId = product.categoryId;
          this.subCategoryId = product.subCategoryId;
          this.concernIds = product.concernIds || [];
          this.description = product.description;
          this.ingredients = product.ingredients;
          this.usage = product.usage;
          this.img = product.img;
          this.imageUrl = productImageSrc2(product.img);
        }
      };
      async function getData(dataUrl) {
        try {
          const res = await fetch(dataUrl);
          if (!res.ok) throw new Error("HTTP " + res.status);
          return await res.json();
        } catch (error) {
          console.error("Error fetching data:", error);
          return { products: [], categories: [], subCategories: [], concerns: [] };
        }
      }
      function syncSearchInputWithHash() {
        const input = document.querySelector(".search-box__input");
        if (!input) return;
        const hash = window.location.hash || "";
        const [page, query] = hash.replace("#", "").split("?");
        if (page !== "search") return;
        const params = new URLSearchParams(query || "");
        input.value = params.get("q") || "";
      }
      function setupSearch(products) {
        const input = document.querySelector(".search-box__input");
        const icon = document.querySelector(".search-box__icon");
        if (!input) return;
        const runSearch = () => {
          const query = input.value.trim();
          const nextHash = `#search?q=${encodeURIComponent(query)}`;
          if (window.location.pathname + window.location.hash === `/${nextHash}`) {
            router(products);
            return;
          }
          navigateTo(nextHash);
          router(products);
        };
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            runSearch();
          }
        });
        icon?.addEventListener("click", runSearch);
        syncSearchInputWithHash();
      }
      function setupFooterNavigation(products) {
        const footer = document.querySelector(".footer");
        if (!footer) return;
        footer.querySelectorAll("[data-route]").forEach((link) => {
          link.addEventListener("click", () => {
            const route = link.dataset.route;
            if (!route) return;
            const nextHash = `#${route}`;
            if (window.location.pathname + window.location.hash === `/${nextHash}`) {
              router(products);
              return;
            }
            navigateTo(nextHash);
            router(products);
          });
        });
        const footerYear = document.querySelector("#footer-year");
        if (footerYear) {
          footerYear.textContent = String((/* @__PURE__ */ new Date()).getFullYear());
        }
      }
      async function initApp() {
        const app = document.querySelector("#app");
        try {
          const data = await getData("/api/data");
          initCategoryCatalog(data);
          const list = data.products || [];
          const products = list.map((product) => new Product(product));
          initBrandCatalog(products);
          WishlistPanel.init(products);
          document.addEventListener("wishlist:addToCart", (e) => {
            const product = e.detail;
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existing = cart.find((item) => Number(item.id) === Number(product.id));
            if (existing) {
              existing.quantity = (existing.quantity || 1) + 1;
            } else {
              cart.push({ id: product.id, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateNavbarCount();
          });
          CartPanel.init(products);
          document.querySelector(".top-nav__actions .icon-btn[aria-label='Wishlist']")?.addEventListener("click", () => WishlistPanel.open());
          document.querySelector("#cartToggle")?.addEventListener("click", () => CartPanel.open());
          setupUserDropdown();
          updateUserBtn();
          setupCardActions(products);
          setupSearch(products);
          setupFooterNavigation(products);
          setupCategoryNav();
          setupBrandNav();
          setupAppNavigation(products, router);
          router(products);
          updateNavbarCount();
          window.addEventListener("hashchange", () => {
            syncSearchInputWithHash();
            router(products);
            updateNavbarCount();
          });
        } catch (err) {
          console.error(err);
          if (app) {
            app.innerHTML = "<p style='padding:2rem'>\u0410\u043F\u043F \u0430\u0447\u0430\u0430\u043B\u0430\u0445\u0430\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430. Console-\u043E\u043E \u0448\u0430\u043B\u0433\u0430\u043D\u0430 \u0443\u0443.</p>";
          }
        }
      }
      initApp();
    }
  });
  require_main();
})();
