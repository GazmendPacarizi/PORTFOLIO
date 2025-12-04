
let segmentIndex = 0;

function shtoSegment() {
  segmentIndex++;
  const wrapper = document.getElementById("wrapper");

  const container = document.createElement("div");
  container.className = "container mt-md-3 mt-2 segment-container";
  container.setAttribute("data-index", segmentIndex);

  container.innerHTML = `
    <div class="row">
      <div class="col-lg-2">
        <label>Segmenti</label>
        <input type="text" class="form-control segmenti">
      </div>

      <div class="col-lg-2">
        <label>Gjatesia (m)</label>
        <input type="text" class="form-control gjatesia">
      </div>

      <div class="col-lg-2">
        <label>Prurja specifike (l/s/m)</label>
        <input type="text" class="form-control specifike">
      </div>

      <div class="col-lg-2">
        <label>Prurja rrugore (l/s)</label>
        <input type="text" class="form-control rrugore" readonly>
      </div>

      <div class="col-lg-2">
        <label>∑ Prurjeve rrugore</label>
        <select class="form-select shuma_rrugore"></select>
      </div>

      <div class="col-lg-2">
        <label>Prurja meritore (l/s)</label>
        <input type="text" class="form-control meritore" readonly>
      </div>

      <div class="col-lg-2">
        <label>Materiali i gypit</label>
        <select class="form-select lloji_gypit">
          <option value="HDPE/PE">HDPE/PE</option>
          <option value="Çelik">Çelik</option>
          <option value="Beton">Beton</option>
        </select>
      </div>

      <div class="col-lg-2">
        <label>Prurja maks_o_obj (l/s)</label>
        <input type="text" class="form-control max_objekteve">
      </div>

      <div class="col-lg-2">
        <label>Prurja zjarrit (l/s)</label>
        <input type="text" class="form-control zjarrit">
      </div>

      <div class="col-lg-2">
        <label>Prurja maksimale_o (l/s)</label>
        <input type="text" class="form-control Prurja_maksimale_orore_vendbanimit">
      </div>
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
  const lloji_gypit = container.querySelector(".lloji_gypit");
  const max_objekteve = container.querySelector(".max_objekteve");
  const Prurja_maksimale_orore_vendbanimit = container.querySelector(".Prurja_maksimale_orore_vendbanimit");


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

//KETU BEHEN TE GJITHA VLERAT QE PERSERITEN PER CDO RRESHT
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

  //Prurja maksimale e objekteve e cila perseritet ne te gjitha
  Prurja_maksimale_orore_vendbanimit.addEventListener("input", () => {
    const isFirst = container.getAttribute("data-index") === "1";
    if (isFirst) {
      document.querySelectorAll(".Prurja_maksimale_orore_vendbanimit").forEach(el => el.value = Prurja_maksimale_orore_vendbanimit.value);
    }
  });

  //KETU NDALEN TE GJITHA VLERAT QE PERSERITEN PER CDO RRESHT

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

    // --- SHTO OPSIONIN 0 ---
    const zeroOpt = document.createElement("option");
    zeroOpt.value = "0";
    zeroOpt.textContent = "Segmentet 0";
    select.appendChild(zeroOpt);
    // ------------------------

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

    // -------------------- INPUTET --------------------
    const shumaSelect = container.querySelector(".shuma_rrugore").value;
    const maxObj = parseFloat(container.querySelector(".max_objekteve").value.replace(",", ".")) || 0;
    const zjarr = parseFloat(container.querySelector(".zjarrit").value.replace(",", ".")) || 0;
    const meritore = parseFloat(container.querySelector(".meritore").value.replace(",", ".")) || 0;
    const Prurja_maks = parseFloat(container.querySelector(".Prurja_maksimale_orore_vendbanimit").value.replace(",", ".")) || 0;
    const rrugore = parseFloat(container.querySelector(".rrugore").value.replace(",", ".")) || 0;
    const gjatesia = parseFloat(container.querySelector(".gjatesia").value.replace(",", ".")) || 0;
    const gypi = container.querySelector(".lloji_gypit").value;   // 🟩 RREGULLIMI KRYESOR

    // -------------------- LLOGARITJET KRYESORE --------------------
    const shuma = parseFloat(llogaritShumen(shumaSelect)) || 0;
    const PrurjaLlogaritese = (Prurja_maks + zjarr + maxObj + meritore + shuma) * 1.20;

    // -------------------- SHPEJTËSIA PËRVETËSUAR --------------------
    let S = 0;
    if (PrurjaLlogaritese < 25) S = 0.7;
    else if (PrurjaLlogaritese <= 50) S = 0.8;
    else if (PrurjaLlogaritese <= 75) S = 0.9;
    else if (PrurjaLlogaritese <= 100) S = 1.0;
    else if (PrurjaLlogaritese <= 150) S = 1.2;
    else if (PrurjaLlogaritese <= 200) S = 1.3;
    else if (PrurjaLlogaritese <= 250) S = 1.4;
    else if (PrurjaLlogaritese <= 300) S = 1.5;
    else if (PrurjaLlogaritese <= 400) S = 1.6;
    else if (PrurjaLlogaritese <= 500) S = 1.7;
    else if (PrurjaLlogaritese <= 600) S = 1.8;
    else if (PrurjaLlogaritese <= 700) S = 1.9;
    else S = 2.0;

    // -------------------- DIAMETRI LLOGARITUR --------------------
    let diametri_llogaritur = parseFloat(
        Math.sqrt((4 * PrurjaLlogaritese / 1000) / (Math.PI * S)).toFixed(3)
    );

    // -------------------- PËRZGJEDHJA E DIAMETRIT --------------------
    let diametri_adoptuar = 0;

    if (gypi === "HDPE/PE") {
        if (diametri_llogaritur <= 0.063) diametri_adoptuar = 63;
        else if (diametri_llogaritur <= 0.075) diametri_adoptuar = 75;
        else if (diametri_llogaritur <= 0.090) diametri_adoptuar = 90;
        else if (diametri_llogaritur <= 0.110) diametri_adoptuar = 110;
        else if (diametri_llogaritur <= 0.125) diametri_adoptuar = 125;
        else if (diametri_llogaritur <= 0.140) diametri_adoptuar = 140;
        else if (diametri_llogaritur <= 0.160) diametri_adoptuar = 160;
        else if (diametri_llogaritur <= 0.180) diametri_adoptuar = 180;
        else if (diametri_llogaritur <= 0.200) diametri_adoptuar = 200;
        else if (diametri_llogaritur <= 0.225) diametri_adoptuar = 225;
        else if (diametri_llogaritur <= 0.250) diametri_adoptuar = 250;
        else if (diametri_llogaritur <= 0.280) diametri_adoptuar = 280;
        else if (diametri_llogaritur <= 0.315) diametri_adoptuar = 315;
        else if (diametri_llogaritur <= 0.355) diametri_adoptuar = 355;
        else if (diametri_llogaritur <= 0.400) diametri_adoptuar = 400;
        else if (diametri_llogaritur <= 0.450) diametri_adoptuar = 450;
        else if (diametri_llogaritur <= 0.500) diametri_adoptuar = 500;
        else if (diametri_llogaritur <= 0.560) diametri_adoptuar = 560;
        else if (diametri_llogaritur <= 0.630) diametri_adoptuar = 630;
        else if (diametri_llogaritur <= 0.710) diametri_adoptuar = 710;
        else if (diametri_llogaritur <= 0.800) diametri_adoptuar = 800;
        else if (diametri_llogaritur <= 1.000) diametri_adoptuar = 1000;
        else diametri_adoptuar = 0;
    }
    else if (gypi === "Çelik") {
        if (diametri_llogaritur <= 0.015) diametri_adoptuar = 21.3;   // DN15
        else if (diametri_llogaritur <= 0.020) diametri_adoptuar = 26.9;   // DN20
        else if (diametri_llogaritur <= 0.025) diametri_adoptuar = 33.7;   // DN25
        else if (diametri_llogaritur <= 0.032) diametri_adoptuar = 42.4;   // DN32
        else if (diametri_llogaritur <= 0.040) diametri_adoptuar = 48.3;   // DN40
        else if (diametri_llogaritur <= 0.050) diametri_adoptuar = 60.3;   // DN50
        else if (diametri_llogaritur <= 0.065) diametri_adoptuar = 76.1;   // DN65
        else if (diametri_llogaritur <= 0.080) diametri_adoptuar = 88.9;   // DN80
        else if (diametri_llogaritur <= 0.100) diametri_adoptuar = 114.3;  // DN100
        else if (diametri_llogaritur <= 0.125) diametri_adoptuar = 139.7;  // DN125
        else if (diametri_llogaritur <= 0.150) diametri_adoptuar = 168.3;  // DN150
        else if (diametri_llogaritur <= 0.200) diametri_adoptuar = 219.1;  // DN200
        else if (diametri_llogaritur <= 0.250) diametri_adoptuar = 273.0;  // DN250
        else if (diametri_llogaritur <= 0.300) diametri_adoptuar = 323.9;  // DN300
        else if (diametri_llogaritur <= 0.350) diametri_adoptuar = 355.6;  // DN350
        else if (diametri_llogaritur <= 0.400) diametri_adoptuar = 406.4;  // DN400
        else if (diametri_llogaritur <= 0.450) diametri_adoptuar = 457.0;  // DN450
        else if (diametri_llogaritur <= 0.500) diametri_adoptuar = 508.0;  // DN500
        else if (diametri_llogaritur <= 0.600) diametri_adoptuar = 610.0;  // DN600
        else if (diametri_llogaritur <= 0.700) diametri_adoptuar = 711.0;  // DN700
        else if (diametri_llogaritur <= 0.800) diametri_adoptuar = 813.0;  // DN800
        else if (diametri_llogaritur <= 0.900) diametri_adoptuar = 914.0;  // DN900
        else if (diametri_llogaritur <= 1.000) diametri_adoptuar = 1016.0; // DN1000
        else if (diametri_llogaritur <= 1.200) diametri_adoptuar = 1219.0; // DN1200
    else diametri_adoptuar = 0;
}
else if (gypi === "Beton") {
      if (diametri_llogaritur <= 0.250) diametri_adoptuar = 250;    // DN250
      else if (diametri_llogaritur <= 0.300) diametri_adoptuar = 300;    // DN300
      else if (diametri_llogaritur <= 0.400) diametri_adoptuar = 400;    // DN400
      else if (diametri_llogaritur <= 0.500) diametri_adoptuar = 500;    // DN500
      else if (diametri_llogaritur <= 0.600) diametri_adoptuar = 600;    // DN600
      else if (diametri_llogaritur <= 0.700) diametri_adoptuar = 700;    // DN700
      else if (diametri_llogaritur <= 0.800) diametri_adoptuar = 800;    // DN800
      else if (diametri_llogaritur <= 0.900) diametri_adoptuar = 900;    // DN900
      else if (diametri_llogaritur <= 1.000) diametri_adoptuar = 1000;   // DN1000
      else if (diametri_llogaritur <= 1.200) diametri_adoptuar = 1200;   // DN1200
      else if (diametri_llogaritur <= 1.400) diametri_adoptuar = 1400;   // DN1400
      else if (diametri_llogaritur <= 1.600) diametri_adoptuar = 1600;   // DN1600
      else if (diametri_llogaritur <= 1.800) diametri_adoptuar = 1800;   // DN1800
      else if (diametri_llogaritur <= 2.000) diametri_adoptuar = 2000;   // DN2000
      else if (diametri_llogaritur <= 2.200) diametri_adoptuar = 2200;   // DN2200
      else if (diametri_llogaritur <= 2.400) diametri_adoptuar = 2400;   // DN2400
      else if (diametri_llogaritur <= 2.600) diametri_adoptuar = 2600;   // DN2600
      else if (diametri_llogaritur <= 3.000) diametri_adoptuar = 3000;   // DN3000
      else diametri_adoptuar = 0;
}
else{
    diametri_adoptuar = 0;
}

    let shpejtesia_reale = (4 * PrurjaLlogaritese / 1000) / (Math.PI * Math.pow((diametri_adoptuar / 1000), 2));

    let n = 0;
    if (gypi==="HDPE/PE"){
        n = 0.013
    }
    else if (gypi ==="Çelik"){
      n = 0.011
    }
    else if(gypi ==="Beton") {
      n = 0.015
    }
    else {
        n = 0;
    }

    let kf = 124.6 * Math.pow(n, 2) / Math.pow((diametri_adoptuar/1000), 1/3);
    let humbjet = kf * gjatesia * shpejtesia_reale / ((diametri_adoptuar/1000) * 2 * 9.81);

    // -------------------- SHFAQJA E REZULTATEVE --------------------
    const rezultatet = container.querySelector("#rezultatet");
    rezultatet.querySelector(".prurja_llogaritese_gypit")
              .textContent = `Prurja llogaritëse: ${PrurjaLlogaritese.toFixed(2)} l/s`;

    rezultatet.querySelector(".shpejtesia_pervetesuar_gypit")
              .textContent = `Shpejtësia e përvetësuar: ${S.toFixed(2)} m/s`;

    rezultatet.querySelector(".diametri_llogaritur_gypit")
              .textContent = `Diametri i llogaritur: ${diametri_llogaritur} m`;

    rezultatet.querySelector(".diametri_pervetesuar_gypit")
              .textContent = `Diametri i përvetesuar: ${diametri_adoptuar} mm`;

    rezultatet.querySelector(".shpejtesia_vertete_gypit")
          .textContent = `Shpejtësia reale: ${shpejtesia_reale.toFixed(2)} m/s`; 
          
    rezultatet.querySelector(".humbjet_gjatesore_gypit")
          .textContent = `Humbjet e presionit: ${humbjet.toFixed(2)} m`;       
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

