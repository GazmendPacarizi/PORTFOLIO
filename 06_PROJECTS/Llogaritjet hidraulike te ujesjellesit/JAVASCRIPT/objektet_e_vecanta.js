
const addFormBtn = document.getElementById("addFormBtn");
const removeAllBtn = document.getElementById("removeAllBtn");
const formsContainer = document.getElementById("forms-container");

// Your array of objects
const normat_objekteve = [
  {Objekti: "Shkollë", norma_hargjimit: 10, k_jo: 2, hasNatalitet: true},
  {Objekti: "Spitale të përgjithshme", norma_hargjimit: 300, k_jo: 2.5, hasNatalitet: false},
  {Objekti: "Spitale rurale", norma_hargjimit: 150, k_jo: 2.5, hasNatalitet: false},
  {Objekti: "Hotele", norma_hargjimit: 250, k_jo: 2.5, hasNatalitet: false},
  {Objekti: "Çerdhe", norma_hargjimit: 75, k_jo: 3, hasNatalitet: true},
  {Objekti: "Hidrant", norma_hargjimit: 5, k_jo: 0, hasNatalitet: false},
  {Objekti: "Fakultet", norma_hargjimit: 15, k_jo: 2, hasNatalitet: false},
  {Objekti: "Konvikt", norma_hargjimit: 75, k_jo: 2.5, hasNatalitet: false},
  {Objekti: "Ushtria", norma_hargjimit: 40, k_jo: 1.2, hasNatalitet: false},
  {Objekti: "Klinikë dentale", norma_hargjimit: 260, k_jo: 1, hasNatalitet: false},
  {Objekti: "Kinema", norma_hargjimit: 2, k_jo: 2, hasNatalitet: false},
  {Objekti: "Teatër", norma_hargjimit: 25, k_jo: 2, hasNatalitet: false},
  {Objekti: "Farmaci", norma_hargjimit: 60, k_jo: 1, hasNatalitet: false}
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
      natalitetiInput.value = "Vlerë fikse - Nuk varet nga rritja e popullsisë"; // or some default fixed value
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
    const norma = selected ? selected.norma_hargjimit : 0;
    const k_jo = selected ? selected.k_jo : 1;
    const result = nr * norma * k_jo;

    const resultContainer = formSection.querySelector(".result-container");
    resultContainer.innerHTML = `
        <p><strong>Objekti:</strong> ${select.value}</p>
        <p><strong>Rezultati:</strong> ${result.toFixed(2)}</p>
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