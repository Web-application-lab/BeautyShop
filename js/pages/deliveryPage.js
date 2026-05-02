export function renderDeliveryPage(container) {
  container.innerHTML = `
    <section class="delivery-page">
      <h2>Хүргэлт</h2>
      <div class="card">
        Бид таны бүтээгдэхүүнийг 24-48 цагийн дотор хүссэн газарт нь найдвартай хүргээд өгнө.
      </div>

      <h2>Хүргэлтийн нөхцөл</h2>

      <div class="section">
        <div class="card">
          Та захиалгын дугаараа оруулж хүргэлтийн төлөвөө шалгана уу.
        </div>
      </div>

      <div class="section">

        <div class="card">
          <h3>Захиалга шалгах</h3>

          <input type="text" id="orderId" placeholder="Жишээ: BS1234" class="input">

          <button class="btn" onclick="checkOrder()">Шалгах</button>

        </div>

      </div>

      <div class="section">
        <div class="card" id="result" style="display:none;"></div>
      </div>

    </section>
  `;
const btn = container.querySelector("#checkOrderBtn");
  const input = container.querySelector("#orderId");
  const result = container.querySelector("#result");

  btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) {
      result.style.display = "block";
      result.textContent = "Захиалгын дугаар оруулна уу!";
      return;
    }

    result.style.display = "block";
    result.textContent = `Захиалга ${value} - хүргэлтэнд гарсан байна.`;
  });
}