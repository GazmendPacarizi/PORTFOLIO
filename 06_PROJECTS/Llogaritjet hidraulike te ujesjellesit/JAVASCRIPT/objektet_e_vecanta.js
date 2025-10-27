const addFormBtn = document.getElementById("addFormBtn");
    const removeAllBtn = document.getElementById("removeAllBtn");
    const formsContainer = document.getElementById("forms-container");

// Template for one form
const formTemplate = `
<div class="form-section border p-3 rounded mb-3 position-relative">
    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 deleteFormBtn">X</button>
    <h5 class="form-title mb-3">Form</h5>

    
    <div class="mb-2">
        <label class="form-label">Lloji i përdoruesve</label>
        <select class="form-select">
            <option value="10">Shkollë</option>
            <option value="300">Spital</option>
            <option value="250">Hotel</option>
            <option value="15">Fakultet</option>
            <option value="75">Çerdhe</option>
            <option value="75">Konvikt</option>
            <option value="2">Ushtria</option>
            <option value="35">Hidrant</option>
            <option value="35">Klinikë dentale</option>
            <option value="35">Kinema</option>
            <option value="35">Teatër</option>
            <option value="35">Farmaci</option>
        </select>
    </div>
    <div class="mb-2">
        <label class="form-label">Numri i përdoruesve</label>
        <input type="text" class="form-control" required>
    </div>
    <div class="mb-2">
        <label class="form-label">Periudha projektuese n (vite)</label>
        <input type="text" class="form-control" required>
    </div>
    <div class="mb-2">
        <label class="form-label">Nataliteti (%)</label>
        <input type="text" class="form-control" required>
    </div>
    <div class="mb-2">
        <label class="form-label">Shpenzimi mesatar i ujit (l/b/d)</label>
        <input type="text" class="form-control" required>
    </div>
    <div class="d-flex justify-content-start">
        <button class="btn btn-secondary w-50 mt-2">Llogarit</button>
    </div>
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

    formSection.querySelector(".form-title").textContent = `Form ${formCount}`;

    // Delete button (for that specific form)
    formSection.querySelector(".deleteFormBtn").addEventListener("click", () => {
        formSection.classList.remove("show");
        setTimeout(() => {
            formSection.remove();
            updateVisibility();
        }, 300);
    });

    formsContainer.appendChild(formSection);
    setTimeout(() => formSection.classList.add("show"), 10); // animation
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