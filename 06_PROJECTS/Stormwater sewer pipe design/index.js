function calculateDiameter() {
        // Marrja e vlerave nga inputet
        const C = parseFloat(document.getElementById("surfaceType").value);
        const I = parseFloat(document.getElementById("intensity").value);
        const A = parseFloat(document.getElementById("area").value);
        const S = parseFloat(document.getElementById("slope").value);
        const n = parseFloat(document.getElementById("material").value);
        const section = parseFloat(document.getElementById("section").value); // m²


        const resultsBox = document.getElementById("results");

        // Validim
        if (isNaN(C) || isNaN(I) || isNaN(A) || isNaN(S) || isNaN(n)) {
            resultsBox.style.border = "2px solid red";
            resultsBox.style.backgroundColor = "#ffe6e6";
            document.getElementById("diameter_result").textContent = "❌ Ju lutem plotësoni të gjitha fushat me vlera numerike.";
            document.getElementById("velocity_result").textContent = "";
            document.getElementById("suggestionBox").textContent = "";
            return;
        }

        // Llogaritja e prurjes Q
        const Q = C * I * A; // l/s

        // Llogaritja e diametrit minimal (m)
        const D = Math.pow(((Q / 1000) * 4 * n * Math.pow(4, 2/3)) / (Math.PI * Math.sqrt(S / 100)), 3/8);
        const Dmm = D * 1000;

        const Q_m3s = Q /1000;

        // Llogaritja e shpejtësisë v = Q / A
        const velocity = Q_m3s / (Math.PI * Math.pow(D, 2) / 4);

        // Shfaqja e rezultateve
        document.getElementById("diameter_result").textContent = `Diametri minimal ≈ ${Dmm} mm`;
        document.getElementById("velocity_result").textContent = `Shpejtësia e rrjedhës ≈ ${velocity.toFixed(2)} m/s`;

        // Sugjerim dhe stilizim
        const suggestion = document.getElementById("suggestionBox");
        if (velocity < 0.5) {
            suggestion.textContent = "⚠️ Shpejtësia është shumë e ulët (< 0.5 m/s). Rekomandohet të zvogëlohet diametri ose të rritet pjerrësia.";
            resultsBox.style.border = "2px solid orange";
            resultsBox.style.backgroundColor = "#fff3cd";
        } else {
            suggestion.textContent = "✅ Shpejtësia është brenda kufijve të pranueshëm.";
            resultsBox.style.border = "2px solid #198754";
            resultsBox.style.backgroundColor = "#e2f7e2";
        }
        };



        async function saveToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const section = document.getElementById("section").value;
  const surfaceType = document.getElementById("surfaceType").selectedOptions[0].text;
  const intensity = document.getElementById("intensity").value;
  const area = document.getElementById("area").value;
  const slope = document.getElementById("slope").value;
  const material = document.getElementById("material").selectedOptions[0].text;

  const diameter = document.getElementById("diameter_result").textContent;
  const velocity = document.getElementById("velocity_result").textContent;
  const suggestion = document.getElementById("suggestionBox").textContent;

  let y = 10;
  doc.setFontSize(14);
  doc.text("Stormwater Network Design", 10, y); y += 10;

  doc.setFontSize(12);
  doc.text(`Section: ${section}`, 10, y); y += 8;
  doc.text(`Surface Type: ${surfaceType}`, 10, y); y += 8;
  doc.text(`Precipitation Intensity: ${intensity} l/s/ha`, 10, y); y += 8;
  doc.text(`Area: ${area} ha`, 10, y); y += 8;
  doc.text(`Slope: ${slope} %`, 10, y); y += 8;
  doc.text(`Pipe Material: ${material}`, 10, y); y += 10;

  doc.setFontSize(13);
  doc.text("Results:", 10, y); y += 8;
  doc.text(`Diametri minimal: ${diameter.replace(/[^\d.,\s\w]/g, '')}`, 10, y); y += 8;
  doc.text(`Shpejtësia e rrjedhës: ${velocity.replace(/[^\d.,\s\w]/g, '')}`, 10, y); y += 8;
  doc.text(suggestion.replace(/[^\d.,\s\w()=:%-]/g, ''), 10, y); y += 8;

  doc.save("stormwater_design.pdf");
}