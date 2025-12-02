document.getElementById("Eksporto_PDF_teGjitha").onclick = function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // --- HEADER ---
  let today = new Date();
  let dateStr = today.toLocaleDateString("sq-AL", {
    year: "numeric", month: "long", day: "numeric"
  });

  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Krijuar nga GazCalc Studio", 10, 10);
  doc.setFont(undefined, "normal");
  doc.text("Data e krijimit: " + dateStr, 150, 10);

  let y = 30; // fillojmë pas header-it

  // --- INPUTET KRYESORE ---
  const Nb0 = document.getElementById("nr_banoreve").value;
  const n = document.getElementById("periudha_projektuese").value;
  const p = document.getElementById("shtimi_popullsise").value;
  const qmes = document.getElementById("shpenzimi_mesatar").value;

  doc.text("Inputet kryesore:", 10, y); y += 10;
  doc.text("Numri fillestar i banorëve: " + Nb0, 10, y); y += 10;
  doc.text("Periudha projektuese (vite): " + n, 10, y); y += 10;
  doc.text("Shtimi i popullsisë (%): " + p, 10, y); y += 10;
  doc.text("Shpenzimi mesatar (l/b/d): " + qmes, 10, y); y += 15;

  // --- REZULTATET KRYESORE ---
  const NbText = document.getElementById("numri_banoreve_periudhe_projektuese").innerText;
  const QmesText = document.getElementById("prurja_mesatare").innerText;
  const QmaksDText = document.getElementById("prurja_maksimale_ditore").innerText;
  const QmaksOText = document.getElementById("prurja_maksimale_orore").innerText;

  doc.text("Rezultatet kryesore:", 10, y); y += 10;
  doc.text(NbText, 10, y); y += 10;
  doc.text(QmesText, 10, y); y += 10;
  doc.text(QmaksDText, 10, y); y += 10;
  doc.text(QmaksOText, 10, y); y += 15;

  // --- OBJEKTET ---
  const forms = document.querySelectorAll("#forms-container .form-section");
  forms.forEach((form, index) => {
    const objName = form.querySelector(".user-type").value;
    const nr = form.querySelector(".nr-perdoruesve").value;
    const periudha = form.querySelector(".periudha").value;
    const nataliteti = form.querySelector(".nataliteti").value;
    const shpenzimi = form.querySelector(".shpenzimi").value;
    const resultText = form.querySelector(".result-container").innerText;

    doc.text(`Objekti ${index + 1}: ${objName}`, 10, y); y += 10;
    doc.text(`Numri përdoruesve: ${nr}`, 10, y); y += 10;
    doc.text(`Periudha: ${periudha}`, 10, y); y += 10;
    doc.text(`Nataliteti: ${nataliteti}`, 10, y); y += 10;
    doc.text(`Shpenzimi: ${shpenzimi}`, 10, y); y += 10;
    doc.text(resultText, 10, y); y += 15;

    if (y > 270) {
      // Footer në fund të faqes
      doc.setFontSize(10);
      doc.text("Copyrighted by Gazmend Paçarizi", doc.internal.pageSize.getWidth() / 2, 290, { align: "center" });

      doc.addPage();
      y = 30;

      // Header përsëri
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("Krijuar nga GazCalc Studio", 10, 10);
      doc.setFont(undefined, "normal");
      doc.text("Data e krijimit: " + dateStr, 150, 10);
    }
  });

  // --- PARAMETRAT SHTESË ---
  const shumaObjekteveText = document.getElementById("shuma_prurjeve_objekteve_rezultatet").innerText;
  const prurjaSpecifikeText = document.getElementById("prurja_specifike").innerText;

  doc.text("Parametrat shtesë:", 10, y); y += 10;
  doc.text(shumaObjekteveText, 10, y); y += 10;
  doc.text(prurjaSpecifikeText, 10, y); y += 15;

  // --- FOOTER në faqen e fundit ---
  doc.setFontSize(10);
  doc.text("Copyrighted by Gazmend Paçarizi", doc.internal.pageSize.getWidth() / 2, 290, { align: "center" });

  // --- SAVE PDF ---
  doc.save("Raporti_TeGjitha.pdf");
};