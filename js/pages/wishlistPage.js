import { updateNavbarCount } from "../utils/navbarCount.js";
import { showToast } from "../utils/toggle.js";

class WishlistPanelClass {
  static _instance = null;
  static _products  = [];

  static init(products) {
    WishlistPanelClass._products = products;
    WishlistPanelClass._instance ??= new WishlistPanelClass();
    return WishlistPanelClass._instance;
  }

  static open() {
    if (!WishlistPanelClass._instance) {
      console.warn("WishlistPanel.init(products) дуудагдаагүй байна.");
      return;
    }
    WishlistPanelClass._instance._open();
  }

  static refresh() {
    WishlistPanelClass._instance?._renderItems();
  }

  static close() {
    WishlistPanelClass._instance?._close();
  }

  constructor() {
    this._overlay = this._el("div", "wl-overlay");
    this._panel   = this._el("div", "wl-panel");
    this._panel.setAttribute("role", "dialog");
    this._panel.setAttribute("aria-label", "Хүслийн жагсаалт");

    this._badge   = this._el("span", "wl-badge");
    this._body    = this._el("div", "wl-body");

    this._panel.append(
      this._buildHeader(),
      this._body,
      this._buildFooter()
    );

    document.body.append(this._overlay, this._panel);
    this._overlay.addEventListener("click", () => this._close());
    document.addEventListener("keydown", e => e.key === "Escape" && this._close());
  }

  _buildHeader() {
    const header = this._el("div", "wl-header");

    const left = this._el("div", "wl-header-left");
    const icon = this._el("div", "wl-header-icon");
    icon.innerHTML = `<i class="fa-solid fa-heart"></i>`;

    const title = this._el("h2", "wl-title");
    title.textContent = "Хүслийн жагсаалт";

    this._badge.textContent = "0";
    left.append(icon, title, this._badge);

    const closeBtn = this._el("button", "wl-close");
    closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeBtn.setAttribute("aria-label", "Хаах");
    closeBtn.addEventListener("click", () => this._close());

    header.append(left, closeBtn);
    return header;
  }

  _buildFooter() {
    const footer   = this._el("div", "wl-footer");
    const clearBtn = this._el("button", "wl-clear-btn");
    clearBtn.innerHTML = `<i class="fa-regular fa-trash-can" style="margin-right:6px"></i>Жагсаалт цэвэрлэх`;
    clearBtn.addEventListener("click", () => this._clearAll());
    footer.appendChild(clearBtn);
    return footer;
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
    const items = WishlistPanelClass._products.filter(p =>
      wishlist.some(id => Number(id) === Number(p.id))
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
    const icon = this._el("div", "wl-empty-icon");
    icon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    const t = this._el("p", "wl-empty-title");
    t.textContent = "Жагсаалт хоосон байна";
    const s = this._el("p", "wl-empty-sub");
    s.textContent = "Таалагдсан бараагаа ♡ дарж хадгалаарай";
    wrap.append(icon, t, s);
    return wrap;
  }

  _itemEl(p, index) {
    const item = this._el("div", "wl-item");
    item.style.animationDelay = `${index * 0.055}s`;
    item.append(this._buildImage(p), this._buildInfo(p));
    return item;
  }

  _buildImage(p) {
    if (!p.img) {
      const ph = this._el("div", "wl-item-img-placeholder");
      ph.innerHTML = `<i class="fa-solid fa-bottle-droplet"></i>`;
      return ph;
    }
    const src = p.imageUrl || (p.img.includes("/") ? p.img : `/images/${p.img}`);
    const img = Object.assign(this._el("img", "wl-item-img"), { src, alt: p.name ?? "" });
    img.onerror = () => { img.onerror = null; img.src = "/images/placeholder.svg"; };
    return img;
  }

  _buildInfo(p) {
    const info = this._el("div", "wl-item-info");

    if (p.brand) {
      const brand = this._el("span", "wl-item-brand");
      brand.textContent = p.brand;
      info.appendChild(brand);
    }

    const name = this._el("div", "wl-item-name");
    name.textContent = p.name ?? `Бараа #${p.id}`;
    name.title = p.name ?? "";
    info.append(name, this._buildPrice(p), this._buildActions(p));
    return info;
  }

  _buildPrice(p) {
    const row   = this._el("div", "wl-item-price");
    const price = p.discount > 0 ? p.newPrice : p.price;
    row.textContent = `${Number(price).toLocaleString("mn-MN")}₮`;

    if (p.discount > 0) {
      const old = this._el("span", "wl-item-price-old");
      old.textContent = `${Number(p.price).toLocaleString("mn-MN")}₮`;
      row.appendChild(old);
    }
    return row;
  }

  _buildActions(p) {
    const actions = this._el("div", "wl-item-actions");

    const cartBtn = this._el("button", "wl-item-cart-btn");
    cartBtn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Сагсанд нэмэх`;
    cartBtn.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("wishlist:addToCart", { detail: p }));
      showToast("Сагсанд нэмэгдлээ!");
    });

    const removeBtn = this._el("button", "wl-item-remove");
    removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    removeBtn.setAttribute("aria-label", "Хасах");
    removeBtn.addEventListener("click", () => this._remove(p.id));

    actions.append(cartBtn, removeBtn);
    return actions;
  }

  _remove(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify(
      wishlist.filter(id => Number(id) !== Number(productId))
    ));
    this._afterChange("Хүслийн жагсаалтаас хасагдлаа!");
  }

  _clearAll() {
    localStorage.removeItem("wishlist");
    this._afterChange("Жагсаалт цэвэрлэгдлээ!");
  }

  _afterChange(message) {
    updateNavbarCount();
    showToast(message);
    this._renderItems();
    document.querySelectorAll("wishlist-button").forEach(btn => btn.refresh?.());
  }

  _el(tag, cls) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  }
}

export const WishlistPanel = WishlistPanelClass;

export function renderWishlistPage(products, app) {
  WishlistPanelClass.init(products);
  WishlistPanelClass.open();
}