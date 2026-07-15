document.getElementById("eksportoPDF").onclick = async function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  let y = 20;

  // Header
  doc.setFontSize(14);
  doc.text("Raport i dimensionimit të pompës", 10, y);
  y += 10;
  doc.setFontSize(10);
  doc.text("Data: " + new Date().toLocaleDateString(), 10, y);
  y += 20;

  // Inputet
  const H = document.getElementById("lartesia_objektit").value;
  const Pm = document.getElementById("presioni_minimal").value;
  const K = document.getElementById("numri_kateve").value;
  doc.setFontSize(12);
  doc.text("Inputet:", 10, y); y += 10;
  doc.text("Lartësia e objektit: " + H + " m", 10, y); y += 10;
  doc.text("Presioni minimal: " + Pm + " m", 10, y); y += 10;
  doc.text("Numri i kateve: " + K, 10, y); y += 20;

  // Rezultatet
  const results = document.getElementById("results").textContent;
  const pipeDim = document.getElementById("pipe-dimension").textContent;
  const pipeDimReal = document.getElementById("pipe-dimension_real").textContent;
  const pressureFloor = document.getElementById("pressure-per-floor").textContent;
  doc.text("Rezultatet:", 10, y); y += 10;
  doc.text(results, 10, y); y += 10;
  doc.text(pipeDim, 10, y); y += 10;
  doc.text(pipeDimReal, 10, y); y += 10;
  let wrappedText = doc.splitTextToSize(pressureFloor, 180);
doc.text(wrappedText, 10, y);
y += wrappedText.length * 6;

  // Grafiku (canvas → image)
  const canvas = document.getElementById("pressureLossChart");
  const canvasImg = await html2canvas(canvas);
  const imgData = canvasImg.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 10, y, 180, 100);

  // Footer
  doc.setFontSize(10);
  doc.text("© Gazmend Paçarizi", 10, 290);

  // Ruaj PDF
  doc.save("Raporti_Pompa.pdf");
};
