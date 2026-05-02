class QuantitySelector extends HTMLElement {
    constructor() {
        super ();
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
}

customElements.define("quantity-selector", QuantitySelector);