export function renderSkinCoachPage(container) {
  container.innerHTML = `
    <section class="skin-coach-page page">
      <h2>Skin Coach</h2>

      <div class="feature">
        <h4>Таны арьс ямар вэ?</h4>
        <p>
          <label><input type="radio" name="skin" value="oily"> Тослог</label><br>
          <label><input type="radio" name="skin" value="dry"> Хуурай</label><br>
          <label><input type="radio" name="skin" value="combo"> Холимог</label>
        </p>
      </div>

      <div class="feature">
        <h4>Таны гол асуудал?</h4>
        <p>
          <label><input type="radio" name="problem" value="acne"> Батга</label><br>
          <label><input type="radio" name="problem" value="dryness"> Хуурайшилт</label><br>
          <label><input type="radio" name="problem" value="pigment"> Нөсөө толбо</label>
        </p>
      </div>

      <button class="btn" id="skinCoachBtn">Зөвлөгөө авах</button>

      <div class="card" id="skinCoachResult" style="display:none;"></div>
    </section>
  `;

  const btn = container.querySelector("#skinCoachBtn");
  const result = container.querySelector("#skinCoachResult");

  btn.addEventListener("click", () => {
    const skin = container.querySelector('input[name="skin"]:checked');
    const problem = container.querySelector('input[name="problem"]:checked');

    result.style.display = "block";

    if (!skin || !problem) {
      result.textContent = "Арьсны төрөл болон асуудлаа сонгоно уу.";
      return;
    }

    result.textContent = "Танд зөөлөн цэвэрлэгч, чийгшүүлэгч, нарны тос тогтмол хэрэглэхийг зөвлөж байна.";
  });
}