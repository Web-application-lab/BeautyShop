const mockOrders = {
  BS1234: {
    status: "Хүргэлтэнд гарсан",
    customer: "Номин",
    items: "Snail mucin 88 + Peptide Cream, Waterfull Hyaluronic Toner",
    address: "Улаанбаатар, Хан-Уул дүүрэг",
    updatedAt: "2026-05-12 11:20",
    note: "Курьер танд хүргэхээс өмнө холбогдоно."
  },
  BS5678: {
    status: "Бэлтгэгдэж байна",
    customer: "Солонго",
    items: "345 Relief Cream, Dark Spot Correcting Glow Serum",
    address: "Улаанбаатар, Сүхбаатар дүүрэг",
    updatedAt: "2026-05-12 10:05",
    note: "Захиалга агуулахаас гарахад бэлэн болж байна."
  },
  BS9012: {
    status: "Хүргэгдсэн",
    customer: "Анударь",
    items: "Mugwort Calming Cleanser",
    address: "Улаанбаатар, Баянзүрх дүүрэг",
    updatedAt: "2026-05-11 18:40",
    note: "Захиалга амжилттай хүлээлгэн өгөгдсөн."
  }
};

function renderOrderResult(code, order) {
  return `
    <div class="delivery-page__result-header">
      <h4>Захиалга ${code}</h4>
      <span class="delivery-page__status-badge">${order.status}</span>
    </div>
    <div class="delivery-page__result-grid">
      <div class="delivery-page__result-item">
        <span>Захиалагч</span>
        <strong>${order.customer}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>Сүүлийн шинэчлэлт</span>
        <strong>${order.updatedAt}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>Бүтээгдэхүүн</span>
        <strong>${order.items}</strong>
      </div>
      <div class="delivery-page__result-item">
        <span>Хүргэлтийн хаяг</span>
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

export function renderDeliveryPage(container) {
  container.innerHTML = `
    <section class="delivery-page">
      <div class="delivery-page__shell">
        <header class="delivery-page__header">
          <span class="delivery-page__eyebrow">Delivery Policy</span>
          <h1>Хүргэлтийн нөхцөл</h1>
          <p class="delivery-page__intro">
            Бид таны бүтээгдэхүүнийг 24-48 цагийн дотор хүссэн газарт нь найдвартай хүргэхийг зорьдог. Доорх мэдээллээс хүргэлтийн үндсэн нөхцөл болон захиалгын төлөв шалгах хэсгийг ашиглана уу.
          </p>
        </header>

        <div class="delivery-page__sections">
          <article class="delivery-page__section">
            <div class="delivery-page__section-number">01</div>
            <div class="delivery-page__section-body">
              <h2>Хүргэлтийн хугацаа</h2>
              <p>Захиалга баталгаажсаны дараа хүргэлт ихэвчлэн 24-48 цагийн дотор хийгдэнэ.</p>
            </div>
          </article>

          <article class="delivery-page__section">
            <div class="delivery-page__section-number">02</div>
            <div class="delivery-page__section-body">
              <h2>Хүргэлтийн мэдээлэл</h2>
              <p>Зөв хаяг, утасны дугаар оруулсан тохиолдолд хүргэлт илүү хурдан, саадгүй явагдана.</p>
            </div>
          </article>

          <article class="delivery-page__section">
            <div class="delivery-page__section-number">03</div>
            <div class="delivery-page__section-body">
              <h2>Захиалга шалгах</h2>
              <p>Та захиалгын дугаараа оруулж хүргэлтийн төлөвөө шалгах боломжтой.</p>
            </div>
          </article>
        </div>

        <section class="delivery-page__tracker">
          <h3>Захиалгын төлөв шалгах</h3>
          <p class="delivery-page__tracker-help">Туршиж үзэх код: BS1234, BS5678, BS9012</p>
          <div class="delivery-page__tracker-form">
            <input type="text" id="orderId" placeholder="Жишээ: BS1234" class="delivery-page__input">
            <button class="delivery-page__button" id="checkOrderBtn" type="button">Шалгах</button>
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
          <h4>Сонголтоо гүйцээнэ үү</h4>
          <p>Захиалгын дугаар оруулсны дараа төлөв шалгах боломжтой.</p>
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
          <h4>Захиалга олдсонгүй</h4>
          <p><strong>${value}</strong> кодтой захиалга бүртгэгдсэнгүй. Кодоо дахин шалгаад оролдоно уу.</p>
        `,
        true
      );
      return;
    }

    showResult(result, renderOrderResult(value, order));
  };

  btn.addEventListener("click", checkOrder);
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkOrder();
    }
  });
}