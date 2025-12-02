
let segmentIndex = 0;

function shtoSegment() {
  segmentIndex++;
  const wrapper = document.getElementById("wrapper");

  const container = document.createElement("div");
  container.className = "container mt-md-3 mt-2 segment-container";
  container.setAttribute("data-index", segmentIndex);

  container.innerHTML = `
    <div class="row">
      <div class="col-lg-2"><label>Segmenti</label><input type="text" class="form-control segmenti"></div>
      <div class="col-lg-2"><label>Gjatesia (m)</label><input type="text" class="form-control gjatesia"></div>
      <div class="col-lg-2"><label>Prurja specifike (l/s/m)</label><input type="text" class="form-control specifike"></div>
      <div class="col-lg-2"><label>Prurja rrugore (l/s)</label><input type="text" class="form-control rrugore" readonly></div>
      <div class="col-lg-2"><label>∑ Prurjeve rrugore</label><select class="form-select shuma_rrugore"></select></div>
      <div class="col-lg-2"><label>Prurja meritore (l/s)</label><input type="text" class="form-control meritore" readonly></div>
      <div class="col-lg-2"><label>Prurja max obj (l/s)</label><input type="text" class="form-control max_objekteve"></div>
      <div class="col-lg-2"><label>Prurja zjarrit (l/s)</label><input type="text" class="form-control zjarrit"></div>
    </div>
    <div class="row my-2">
      <div class="col text-center">
        <button class="btn btn-secondary" onclick="llogarit(this)">Llogarit</button>
        <button class="btn btn-danger ms-2" onclick="fshiSegment(this)">🗑️ Fshi</button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col" id="rezultatet">
        <p class="prurja_llogaritese_gypit"></p>
        <p class="shpejtesia_pervetesuar_gypit"></p>
        <p class="diametri_llogaritur_gypit"></p>
        <p class="diametri_pervetesuar_gypit"></p>
        <p class="shpejtesia_vertete_gypit"></p>
        <p class="humbjet_gjatesore_gypit"></p>
      </div>
    </div>
  `;

  wrapper.appendChild(container);
  gjeneroOpsioneShume();
  vendosEvente(container);
}

function vendosEvente(container) {
  const gjatesia = container.querySelector(".gjatesia");
  const specifike = container.querySelector(".specifike");
  const rrugore = container.querySelector(".rrugore");
  const meritore = container.querySelector(".meritore");
  const zjarrit = container.querySelector(".zjarrit");
  const shumaSelect = container.querySelector(".shuma_rrugore");

  function llogaritAutomatikisht() {
    const g = parseFloat(gjatesia.value.replace(",", "."));
    const s = parseFloat(specifike.value.replace(",", "."));
    if (!isNaN(g) && !isNaN(s)) {
      const prurja = g * s;
      rrugore.value = prurja.toFixed(2);
      meritore.value = (0.55 * prurja).toFixed(2);
    }
  }

  gjatesia.addEventListener("input", llogaritAutomatikisht);
  
  /* specifike.addEventListener("input", () => {
  const isFirst = container.getAttribute("data-index") === "1";
  if (isFirst) {
    const vlera = specifike.value;
    document.querySelectorAll(".segment-container").forEach(c => {
      c.querySelector(".specifike").value = vlera;
      c.querySelector(".gjatesia").dispatchEvent(new Event("input"));
    });
  }
}); */
  specifike.addEventListener("input", () => {
    const isFirst = container.getAttribute("data-index") === "1";
    if (isFirst) {
      document.querySelectorAll(".specifike").forEach(el => el.value = specifike.value);
      document.querySelectorAll(".gjatesia").forEach(el => el.dispatchEvent(new Event("input")));
    }
  });  

  zjarrit.addEventListener("input", () => {
    const isFirst = container.getAttribute("data-index") === "1";
    if (isFirst) {
      document.querySelectorAll(".zjarrit").forEach(el => el.value = zjarrit.value);
    }
  });

  shumaSelect.addEventListener("change", () => {
    const vlera = llogaritShumen(shumaSelect.value);
    container.querySelector(".shpejtesia_pervetesuar_gypit").textContent = `∑ Prurjeve rrugore: ${vlera} l/s`;
  });
}

function gjeneroOpsioneShume() {
  const containers = document.querySelectorAll(".segment-container");
  containers.forEach((container, i) => {
    const select = container.querySelector(".shuma_rrugore");
    select.innerHTML = "";

    const indekse = Array.from({ length: i + 1 }, (_, k) => k + 1);

    function kombinime(arr) {
      const result = [];
      const n = arr.length;
      for (let len = 1; len <= n; len++) {
        const helper = (start, combo) => {
          if (combo.length === len) {
            result.push(combo.join("+"));
            return;
          }
          for (let j = start; j < n; j++) {
            helper(j + 1, combo.concat(arr[j]));
          }
        };
        helper(0, []);
      }
      return result;
    }

    const combos = kombinime(indekse);
    combos.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = `Segmentet ${c}`;
      select.appendChild(opt);
    });
  });
}

function llogaritShumen(combo) {
  const indekse = combo.split('+').map(Number);
  let total = 0;
  indekse.forEach(i => {
    const container = document.querySelector(`.segment-container[data-index="${i}"]`);
    if (container) {
      const vlera = parseFloat(container.querySelector(".rrugore").value.replace(",", ".")) || 0;
      total += vlera;
    }
  });
  return total.toFixed(2);
}

function llogarit(btn) {
  const container = btn.closest(".segment-container");
  const shumaSelect = container.querySelector(".shuma_rrugore").value;
  const maxObj = parseFloat(container.querySelector(".max_objekteve").value.replace(",", ".")) || 0;
  const zjarr = parseFloat(container.querySelector(".zjarrit").value.replace(",", ".")) || 0;
  const meritore = parseFloat(container.querySelector(".meritore").value.replace(",", ".")) || 0;

  const shuma = parseFloat(llogaritShumen(shumaSelect)) || 0;
  const prurjaTotale = meritore + maxObj + zjarr;

  const rezultatet = container.querySelector("#rezultatet");
  rezultatet.querySelector(".prurja_llogaritese_gypit").textContent = `Prurja totale: ${prurjaTotale.toFixed(2)} l/s`;
  rezultatet.querySelector(".shpejtesia_pervetesuar_gypit").textContent = `∑ Prurjeve rrugore: ${shuma.toFixed(2)} l/s`;
  rezultatet.querySelector(".diametri_llogaritur_gypit").textContent = `Diametri llogaritur: ...`;
  rezultatet.querySelector(".diametri_pervetesuar_gypit").textContent = `Diametri përvetësuar: ...`;
  rezultatet.querySelector(".shpejtesia_vertete_gypit").textContent = `Shpejtësia reale: ...`;
  rezultatet.querySelector(".humbjet_gjatesore_gypit").textContent = `Humbjet gjatësore: ...`; 
}

  function fshiSegment(btn) {
  if (confirm("A je i sigurt që do ta fshish këtë segment?")) {
    const container = btn.closest(".segment-container");
    container.remove();
    gjeneroOpsioneShume();
  }
}

window.onload = () => shtoSegment();


function ruajTeGjithaNePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Raporti i segmenteve të rrjetit", 10, 10);

  const containers = document.querySelectorAll(".segment-container");
  let y = 20;

  containers.forEach((c, i) => {
    const index = c.getAttribute("data-index");
    const segmenti = c.querySelector(".segmenti").value;
    const gjatesia = c.querySelector(".gjatesia").value;
    const specifike = c.querySelector(".specifike").value;
    const rrugore = c.querySelector(".rrugore").value;
    const meritore = c.querySelector(".meritore").value;
    const maxObj = c.querySelector(".max_objekteve").value;
    const zjarr = c.querySelector(".zjarrit").value;
    const shuma = c.querySelector(".shuma_rrugore").value;

    doc.text(`Segmenti ${index}: ${segmenti}`, 10, y); y += 8;
    doc.text(`Gjatësia: ${gjatesia} m`, 10, y); y += 8;
    doc.text(`Prurja specifike: ${specifike} l/s/m`, 10, y); y += 8;
    doc.text(`Prurja rrugore: ${rrugore} l/s`, 10, y); y += 8;
    doc.text(`∑ Prurjeve rrugore: ${shuma}`, 10, y); y += 8;
    doc.text(`Prurja meritore: ${meritore} l/s`, 10, y); y += 8;
    doc.text(`Prurja max objekteve: ${maxObj} l/s`, 10, y); y += 8;
    doc.text(`Prurja zjarrit: ${zjarr} l/s`, 10, y); y += 10;

    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("Raporti_Segmenteve.pdf");
}

