export function renderLocationPage(container) {
  container.innerHTML = `
    <section class="locations page">
      <h2 class="title">Манай салбарууд</h2>

      <div class="location-grid">
        <div class="location-card">
          <h3>Сүхбаатар салбар</h3>
          <p>📍 Улаанбаатар, СБД, 1-р хороо</p>
          <p>📞 7777-1111</p>
          <p>🕒 09:00 - 21:00</p>
          <a class="btn" href="https://www.google.com/maps?q=Shangri-La+Mall+Ulaanbaatar" target="_blank">
            Газрын зураг харах
          </a>
        </div>

        <div class="location-card">
          <h3>Хан-Уул салбар</h3>
          <p>📍 Улаанбаатар, ХУД, 15-р хороо</p>
          <p>📞 7777-2222</p>
          <p>🕒 10:00 - 22:00</p>
          <a class="btn" href="https://www.google.com/maps?q=Khan-Uul+Ulaanbaatar" target="_blank">
            Газрын зураг харах
          </a>
        </div>

        <div class="location-card">
          <h3>Баянгол салбар</h3>
          <p>📍 Улаанбаатар, БГД, 3-р хороо</p>
          <p>📞 7777-3333</p>
          <p>🕒 09:00 - 20:00</p>
          <a class="btn" href="https://www.google.com/maps/@47.9206249,106.8840984,15.72z" target="_blank">
            Газрын зураг харах
          </a>
        </div>
      </div>
    </section>
  `;
}