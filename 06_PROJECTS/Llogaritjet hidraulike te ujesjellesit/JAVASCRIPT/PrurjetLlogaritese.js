document.getElementById("llogarit").onclick = function () {
    const Nb0 = parseFloat(document.getElementById("nr_banoreve").value);
    const n = parseFloat(document.getElementById("periudha_projektuese").value);
    const p = parseFloat(document.getElementById("shtimi_popullsise").value);
    const qmes = parseFloat(document.getElementById("shpenzimi_mesatar").value);

    if (isNaN(Nb0) || isNaN(n) || isNaN(p) || isNaN(qmes)) {
      alert("Ju lutem plotësoni të gjitha fushat me vlera numerike.");
      return;
    }

    const Nb = Nb0 * Math.pow(1 + p / 100, n);
    const Qmes = (Nb * qmes) / (24 * 3600); // l/s
    const Qmaks_d = Qmes * 1.5; // l/s
    const Qmaks_o = Qmaks_d * 1.5;

    document.getElementById("numri_banoreve_periudhe_projektuese").innerText =
      "Numri i banorëve për periudhën projektuese është: " + Math.round(Nb / 100) * 100 + " banorë";

    document.getElementById("prurja_mesatare").innerText =
      "Prurja mesatare ditore është: " + Qmes.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_ditore").innerText =
      "Prurja maksimale ditore është: " + Qmaks_d.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_orore").innerText =
      "Prurja maksimale orore është: " + Qmaks_o.toFixed(2) + " l/s";
  };

  //eksporti ne pdf i rezultateve te prurjeve
    document.getElementById("Eksporto").onclick = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const NbText = document.getElementById("numri_banoreve_periudhe_projektuese").innerText;
    const QmesText = document.getElementById("prurja_mesatare").innerText;
    const QmaksDText = document.getElementById("prurja_maksimale_ditore").innerText;
    const QmaksOText = document.getElementById("prurja_maksimale_orore").innerText;

    doc.text("Rezultatet e llogaritjes:", 10, 10);
    doc.text(NbText, 10, 20);
    doc.text(QmesText, 10, 30);
    doc.text(QmaksDText, 10, 40);
    doc.text(QmaksOText, 10, 50);

    doc.save("Rezultatet.pdf");
  };


//prurjet e objekteve
const addFormBtn = document.getElementById("addFormBtn");
const removeAllBtn = document.getElementById("removeAllBtn");
const formsContainer = document.getElementById("forms-container");

// Your array of objects
const normat_objekteve = [
  {Objekti: "Shkollë", norma_hargjimit: 10, k_jo: 2, hasNatalitet: true, koha: 12},
  {Objekti: "Spitale të përgjithshme", norma_hargjimit: 300, k_jo: 2.5, hasNatalitet: false, koha: 24},
  {Objekti: "Spitale rurale", norma_hargjimit: 150, k_jo: 2.5, hasNatalitet: false, koha: 24},
  {Objekti: "Hotele", norma_hargjimit: 250, k_jo: 2.5, hasNatalitet: false, koha: 24},
  {Objekti: "Çerdhe", norma_hargjimit: 75, k_jo: 3, hasNatalitet: true, koha: 12},
  {Objekti: "Hidrant", norma_hargjimit: 5, k_jo: 0, hasNatalitet: false, koha: 24},
  {Objekti: "Fakultet", norma_hargjimit: 15, k_jo: 2, hasNatalitet: false, koha: 12},
  {Objekti: "Konvikt", norma_hargjimit: 75, k_jo: 2.5, hasNatalitet: false, koha: 24},
  {Objekti: "Ushtria", norma_hargjimit: 40, k_jo: 1.2, hasNatalitet: false, koha: 24},
  {Objekti: "Klinikë dentale", norma_hargjimit: 260, k_jo: 1, hasNatalitet: false, koha: 12},
  {Objekti: "Kinema", norma_hargjimit: 2, k_jo: 2, hasNatalitet: false, koha: 12},
  {Objekti: "Teatër", norma_hargjimit: 25, k_jo: 2, hasNatalitet: false, koha: 12},
  {Objekti: "Farmaci", norma_hargjimit: 60, k_jo: 1, hasNatalitet: false, koha: 24}
];

// Template for one form
const formTemplate = `
<div class="form-section border p-3 rounded mb-3 position-relative">
    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 deleteFormBtn">X</button>
    <h5 class="form-title mb-3">Form</h5>

    <div class="mb-2">
        <label class="form-label">Lloji i përdoruesve</label>
        <select class="form-select user-type">
            <option value="">Zgjidh objektin</option>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label">Numri i përdoruesve</label>
        <input type="text" class="form-control nr-perdoruesve" required>
    </div>

    <div class="mb-2">
        <label class="form-label">Periudha projektuese n (vite)</label>
        <input type="text" class="form-control periudha" required>
    </div>

    <div class="mb-2">
        <label class="form-label">Nataliteti (%)</label>
        <input type="text" class="form-control nataliteti" required>
    </div>

    <div class="mb-2">
        <label class="form-label">Shpenzimi mesatar i ujit (l/b/d)</label>
        <input type="text" class="form-control shpenzimi" required>
    </div>

    <div class="d-flex justify-content-start">
        <button class="btn btn-secondary w-30 mt-2 llogaritBtn">Llogarit</button>
    </div>
    <div class="mt-2 result-container"></div> <!-- Add this line -->
</div>
`;

let formCount = 0;

// Add form
addFormBtn.addEventListener("click", () => {
  formsContainer.style.display = "block";
  removeAllBtn.style.display = "inline-block";
  formCount++;

  const formWrapper = document.createElement("div");
  formWrapper.innerHTML = formTemplate.trim();
  const formSection = formWrapper.firstChild;

  formSection.querySelector(".form-title").textContent = `Objekti ${formCount}`;

  // Delete button
  formSection.querySelector(".deleteFormBtn").addEventListener("click", () => {
    formSection.classList.remove("show");
    setTimeout(() => {
      formSection.remove();
      updateVisibility();
    }, 300);
  });

  // Fill dropdown dynamically
  const select = formSection.querySelector(".user-type");
  normat_objekteve.forEach(obj => {
    const option = document.createElement("option");
    option.value = obj.Objekti;
    option.textContent = obj.Objekti;
    select.appendChild(option);
  });

  // When user selects an object
  select.addEventListener("change", () => {
  const selected = normat_objekteve.find(o => o.Objekti === select.value);
  const shpenzimiInput = formSection.querySelector(".shpenzimi");
  const natalitetiInput = formSection.querySelector(".nataliteti");
  

  if (selected) {
    shpenzimiInput.value = selected.norma_hargjimit;

    if (selected.hasNatalitet) {
      natalitetiInput.removeAttribute("readonly");
      natalitetiInput.value = ""; // or default value
    } else {
      natalitetiInput.value = "Vlerë fikse"; // or some default fixed value
      natalitetiInput.setAttribute("readonly", true);
    }
  } else {
    shpenzimiInput.value = "";
    natalitetiInput.value = "";
    natalitetiInput.removeAttribute("readonly");
  }
});

  // Example calculation (you can extend later)
  formSection.querySelector(".llogaritBtn").addEventListener("click", e => {
    e.preventDefault();

    const selected = normat_objekteve.find(o => o.Objekti === select.value);
    const nr = parseFloat(formSection.querySelector(".nr-perdoruesve").value) || 0;

    const nataliteti = parseFloat(formSection.querySelector(".nataliteti").value) || 0;
    const periudha = parseFloat(formSection.querySelector(".periudha").value) || 0;

    const norma = selected ? selected.norma_hargjimit : 0;
    const k_jo = selected ? selected.k_jo : 1;
    const koha_shpenzimit = selected ? selected.koha : 1;

    // *** FORMULA E SAKTË ***
    const nr_periudhe_projektuese =
        nr * Math.pow(1 + nataliteti / 100, periudha);

    const result =
        nr_periudhe_projektuese * norma * k_jo * k_jo / (koha_shpenzimit * 3600);

    const resultContainer = formSection.querySelector(".result-container");
    resultContainer.innerHTML = `
        <p><strong>Objekti:</strong> ${select.value}</p>
        <p><strong>Rezultati:</strong> ${"Prurja maksimale orore është" + " " + result.toFixed(2) + " " + "l/s"}</p>
    `;
});


//////////
  formsContainer.appendChild(formSection);
  setTimeout(() => formSection.classList.add("show"), 10);
});

// Remove all forms
removeAllBtn.addEventListener("click", () => {
  formsContainer.querySelectorAll(".form-section").forEach(form => {
    form.classList.remove("show");
    setTimeout(() => form.remove(), 300);
  });
  setTimeout(updateVisibility, 350);
});

function updateVisibility() {
  const total = formsContainer.querySelectorAll(".form-section").length;
  if (total === 0) {
    formsContainer.style.display = "none";
    removeAllBtn.style.display = "none";
    formCount = 0;
  }
}

document.getElementById("llogaritPrurjenSpecifike").onclick = function () {
  let Ltot = parseFloat(document.getElementById("gjatesia_totale_rrjetit").value);
  let Qmaks_o_rr = parseFloat(document.getElementById("prurja_maksimale_orore_rrjetit").value);
  let ShumaObjekteve = parseFloat(document.getElementById("shuma_prurjeve_objekteve").value);
  
  let qspecifike = ((Qmaks_o_rr - ShumaObjekteve) / Ltot).toFixed(4);


  document.getElementById("shuma_prurjeve_objekteve_rezultatet").innerText =
    "Prurja specifike e rrjetit është: " + qspecifike + " l/s/m";
  
  
}