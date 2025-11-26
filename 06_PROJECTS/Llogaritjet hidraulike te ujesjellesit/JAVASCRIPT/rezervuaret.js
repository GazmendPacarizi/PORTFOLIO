
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

  // Rreshti total në fund të tabelës
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td id="totalPump" class="text-center fw-bold"></td>
    <td id="totalUsage" class="text-center fw-bold"></td>
    <td></td><td></td><td></td>
  `;
  tableBody.appendChild(totalRow);

  function updateTable() {
    let cumulative = 0;
    let maxPositive = 0;
    let maxNegative = 0;
    let totalPump = 0;
    let totalUsage = 0;

    [...tableBody.rows].forEach((row, index) => {
      if (index >= 24) return; // Skip total row

      const pump = parseFloat(row.cells[1].querySelector("input").value) || 0;
      const usage = parseFloat(row.cells[2].querySelector("input").value) || 0;
      const diff = pump - usage;

      const inVal = diff > 0 ? diff : 0;
      const outVal = diff < 0 ? diff : 0;

      row.cells[3].textContent = inVal > 0 ? inVal.toFixed(2) : "";
      row.cells[4].textContent = outVal < 0 ? outVal.toFixed(2) : "";

      cumulative += inVal + outVal;
      row.cells[5].textContent = cumulative.toFixed(2);

      totalPump += pump;
      totalUsage += usage;

      if (cumulative > 0 && cumulative > maxPositive) {
        maxPositive = cumulative;
      }

      if (cumulative < 0 && Math.abs(cumulative) > maxNegative) {
        maxNegative = Math.abs(cumulative);
      }
    });

    document.getElementById("totalPump").textContent = totalPump.toFixed(2);
    document.getElementById("totalUsage").textContent = totalUsage.toFixed(2);

    localStorage.setItem("maxPositive", maxPositive.toFixed(2));
    localStorage.setItem("maxNegative", maxNegative.toFixed(2));
  }

  window.eksportoTeDhenat = function () {
    const data = [...tableBody.rows].slice(0, 24).map(row => ({
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
    const rows = [...tableBody.rows].slice(0, 24).map(row => [
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
  let Qmaks_d = parseFloat(document.getElementById("prurja_maksimale_ditore_rezervuarit").value);
  let Qzj = parseFloat(document.getElementById("prurja_zjarrit").value);
  let Tzj = parseFloat(document.getElementById("koha_zjarrit").value);

  if (isNaN(Qmaks_d) || isNaN(Qzj) || isNaN(Tzj)) {
    alert("Ju lutem plotësoni të gjitha fushat me vlera numerike.");
    return;
  }

  updateTable(); // përditëso tabelën

  let maxPlus = parseFloat(localStorage.getItem("maxPositive")) || 0;
  let maxMinus = parseFloat(localStorage.getItem("maxNegative")) || 0;

  let Vrez = (maxPlus + maxMinus) * Qmaks_d / 100;
  let VrezRounded = Math.ceil(Vrez / 10) * 10;
  let Vzj = (Qzj / 1000) * Tzj * 3600;
  let Vsht = 0.25 * (Vrez + Vzj);
  let Vtot = Math.ceil((VrezRounded + Vzj + Vsht) / 10) * 10;

  document.getElementById("vellimi_shfrytezueshem").textContent = 
    "Vëllimi i shfrytëzueshëm i rezervuarit është: " + VrezRounded.toFixed(2) + " m³";

  document.getElementById("vellimi_zjarrit").textContent = 
    "Vëllimi për zjarrfikje është: " + Vzj.toFixed(2) + " m³";

  document.getElementById("vellimi_shtese").textContent = 
    "Vëllimi shtesë i rezervuarit është: " + Vsht.toFixed(2) + " m³";

    document.getElementById("vellimiTotal").textContent = "Vëllimi i përgjithshëm i rezervuarit është" + " " + Vtot.toFixed(2) + " " + " m³";

    document.getElementById("pdf_Qmaks").textContent = Qmaks_d;
document.getElementById("pdf_Qzj").textContent = Qzj;
document.getElementById("pdf_Tzj").textContent = Tzj;
document.getElementById("pdf_Vrez").textContent = VrezRounded.toFixed(2);
document.getElementById("pdf_Vzj").textContent = Vzj.toFixed(2);
document.getElementById("pdf_Vsht").textContent = Vsht.toFixed(2);
document.getElementById("pdf_Vtot").textContent = Vtot.toFixed(2);
};

  updateTable();
});

document.getElementById("ruajPDF_Rezervuarin").onclick = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Data aktuale
    const dataSot = new Date().toLocaleDateString("sq-AL");

    // HEADER
    doc.setFontSize(12);
    doc.text("Raporti u krijua nga GazCalc Studio", 105, 10, { align: "center" });
    doc.setFontSize(10);
    doc.text("Data e krijimit: " + dataSot, 105, 16, { align: "center" });

    // INPUTET
    let Qmaks_d = document.getElementById("prurja_maksimale_ditore_rezervuarit").value;
    let Qzj = document.getElementById("prurja_zjarrit").value;
    let Tzj = document.getElementById("koha_zjarrit").value;

    doc.setFontSize(11);
    doc.text("📌 Inputet e përdorura:", 14, 30);
    doc.setFontSize(10);
    doc.text(`• Prurja maksimale ditore: ${Qmaks_d} m³/d`, 14, 36);
    doc.text(`• Prurja e zjarrit: ${Qzj} l/s`, 14, 42);
    doc.text(`• Koha e fikjes së zjarrit: ${Tzj} orë`, 14, 48);

    // REZULTATET
    let vellimi = document.getElementById("vellimi_shfrytezueshem").textContent;
    let vellimiZ = document.getElementById("vellimi_zjarrit").textContent;
    let vellimiSt = document.getElementById("vellimi_shtese").textContent;
    let vellimiTot = document.getElementById("vellimiTotal").textContent;

    doc.setFontSize(11);
    doc.text("📊 Rezultatet:", 14, 70);
    doc.setFontSize(10);
    if (vellimi) doc.text(vellimi, 14, 76);
    if (vellimiZ) doc.text(vellimiZ, 14, 82);
    if (vellimiSt) doc.text(vellimiSt, 14, 88);
    if (vellimiTot) doc.text(vellimiTot, 14, 94);

    // TABELA
    const headers = ["Ora", "Rendimenti", "Përdorimi", "Hyrja", "Dalja", "Mbetja"];
    const rows = [...document.querySelectorAll("#pumpTable tbody tr")].slice(0, 24).map(row => [
        row.cells[0].textContent,
        row.cells[1].querySelector("input").value || "",
        row.cells[2].querySelector("input").value || "",
        row.cells[3].textContent,
        row.cells[4].textContent,
        row.cells[5].textContent
    ]);

    doc.autoTable({
        startY: 105,
        head: [headers],
        body: rows,
        styles: { fontSize: 8, halign: 'center' },
        theme: 'grid'
    });

    // FOOTER (automatikisht në fund të faqes)
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.text("Copyrighted by Gazmend Paçarizi", pageHeight / 2, pageHeight - 10, { align: "center" });

    // Ruaje PDF-n
    doc.save("Raporti_Rezervuari.pdf");
};