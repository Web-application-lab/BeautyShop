export function renderPrivacyPage(container) {
  container.innerHTML = `
    <section class="privacy-page page">
      <h2>Аюулгүй байдал, нууцлал</h2>

      <div class="card">
        <h3>1. Мэдээлэл цуглуулах</h3>
        <p>Бид таны мэдээллийг зөвхөн үйлчилгээний зорилгоор ашиглана.</p>
      </div>

      <div class="card">
        <h3>2. Мэдээлэл хамгаалах</h3>
        <p>Таны мэдээлэл найдвартай хамгаалагдана.</p>
      </div>
    </section>
  `;
}