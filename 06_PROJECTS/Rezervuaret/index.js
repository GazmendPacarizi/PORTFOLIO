document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#pumpTable tbody");
  const defaultPumpRate = 4.17;

  // Gjenero tabelën për 24 orë
  for (let i = 0; i < 24; i++) {
    const row = document.createElement("tr");

    const hourCell = document.createElement("td");
    hourCell.textContent = `${i.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
    row.appendChild(hourCell);

    const pumpCell = document.createElement("td");
    const pumpInput = document.createElement("input");
    pumpInput.type = "number";
    pumpInput.step = "0.01";
    pumpInput.className = "form-control mx-auto";
    pumpInput.value = localStorage.getItem(`pump_${i}`) || defaultPumpRate.toFixed(2);
    pumpInput.oninput = () => {
      localStorage.setItem(`pump_${i}`, pumpInput.value);
      updateTable();
    };
    pumpCell.appendChild(pumpInput);
    row.appendChild(pumpCell);

    const usageCell = document.createElement("td");
    const usageInput = document.createElement("input");
    usageInput.type = "number";
    usageInput.step = "0.01";
    usageInput.className = "form-control mx-auto";
    usageInput.value = localStorage.getItem(`usage_${i}`) || "";
    usageInput.oninput = () => {
      localStorage.setItem(`usage_${i}`, usageInput.value);
      updateTable();
    };
    usageCell.appendChild(usageInput);
    row.appendChild(usageCell);

    row.appendChild(document.createElement("td")); // Hyrja
    row.appendChild(document.createElement("td")); // Dalja
    row.appendChild(document.createElement("td")); // Mbetja

    tableBody.appendChild(row);
  }

  function updateTable() {
    let cumulative = 0;
    let maxPositive = 0;
    let maxNegative = 0;

    [...tableBody.rows].forEach((row) => {
      const pump = parseFloat(row.cells[1].querySelector("input").value) || 0;
      const usage = parseFloat(row.cells[2].querySelector("input").value) || 0;
      const diff = pump - usage;

      const inVal = diff > 0 ? diff : 0;
      const outVal = diff < 0 ? diff : 0;

      row.cells[3].textContent = inVal > 0 ? inVal.toFixed(2) : "";
      row.cells[4].textContent = outVal < 0 ? outVal.toFixed(2) : "";

      cumulative += inVal + outVal;
      row.cells[5].textContent = cumulative.toFixed(2);

      if (cumulative > 0 && cumulative > maxPositive) {
        maxPositive = cumulative;
      }

      if (cumulative < 0 && Math.abs(cumulative) > maxNegative) {
        maxNegative = Math.abs(cumulative);
      }
    });

    localStorage.setItem("maxPositive", maxPositive.toFixed(2));
    localStorage.setItem("maxNegative", maxNegative.toFixed(2));
  }

  window.eksportoTeDhenat = function () {
    const data = [...tableBody.rows].map(row => ({
      ora: row.cells[0].textContent,
      rendimenti: row.cells[1].querySelector("input").value || "",
      perdorimi: row.cells[2].querySelector("input").value || "",
      hyrja: row.cells[3].textContent,
      dalja: row.cells[4].textContent,
      mbetja: row.cells[5].textContent
    }));

    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  };

  window.eksportoPDF = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text("Tabela e Performancës së Pompës", 14, 10);

    const headers = ["Ora", "Rendimenti", "Përdorimi", "Hyrja", "Dalja", "Mbetja"];
    const rows = [...tableBody.rows].map(row => [
      row.cells[0].textContent,
      row.cells[1].querySelector("input").value || "",
      row.cells[2].querySelector("input").value || "",
      row.cells[3].textContent,
      row.cells[4].textContent,
      row.cells[5].textContent
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 15,
      styles: { halign: 'center' },
      theme: 'grid'
    });

    doc.save("Tabela_Pompes.pdf");
  };

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
    const Qmaks_d = Qmes * 1.5 * 86.4; // m³/ditë
    const Qmaks_o = Qmaks_d * 1.5;

    document.getElementById("numri_banoreve_periudhe_projektuese").innerText =
      "Numri i banorëve për periudhën projektuese është: " + Math.round(Nb / 100) * 100 + " banorë";

    document.getElementById("prurja_mesatare").innerText =
      "Prurja mesatare ditore është: " + Qmes.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_ditore").innerText =
      "Prurja maksimale ditore është: " + Qmaks_d.toFixed(2) + " m³/ditë";

    document.getElementById("prurja_maksimale_orore").innerText =
      "Prurja maksimale orare është: " + Qmaks_o.toFixed(2) + " m³/orë";

    updateTable(); // përditëso tabelën

    const maxPositive = parseFloat(localStorage.getItem("maxPositive")) || 0;
    const maxNegative = parseFloat(localStorage.getItem("maxNegative")) || 0;

    const Vrez = (maxPositive + maxNegative) * Qmaks_d /100;
    const Vzj = 36;
    const Vshtëse = 0.25 * (Vrez + Vzj);
    const Vtot = Vrez + Vzj + Vshtëse;

    document.getElementById("rezervuari").innerText = Math.ceil(Vrez.toFixed(2)/5)*5 + " m³";
    document.getElementById("rezervuari_vtot").innerText =
      "Vëllimi total i rezervuarit është: " + Vtot.toFixed(2) + " m³";
  };

  updateTable();
});
