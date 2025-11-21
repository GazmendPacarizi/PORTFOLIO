function calculateDiameter() {
        // Marrja e vlerave nga inputet
        let C = parseFloat(document.getElementById("surfaceType").value);
        let I = parseFloat(document.getElementById("intensity").value);
        let A = parseFloat(document.getElementById("area").value);
        let S = parseFloat(document.getElementById("slope").value);
        let gypi = document.getElementById("material").value;
        let segmenti = parseFloat(document.getElementById("section").value); // m²


        const resultsBox = document.getElementById("results");

        // Validim
        if (isNaN(C) || isNaN(I) || isNaN(A) || isNaN(S) || isNaN(gypi)) {
            alert("Ju lutemi plotësoni të gjitha fushat!");
            return;
        }

        // Llogaritja e prurjes Q
        let Q = C * I * A; // l/s

        // Llogaritja e diametrit minimal (m)
        let diametri_llogaritur = Math.pow(((Q / 1000) * 4 * gypi * Math.pow(4, 2/3)) / (Math.PI * Math.sqrt(S / 100)), 3/8);
        let Dp = " "; // Diametri i adoptuar

        let Q_m3s = Q /1000;


        // Determinimi i diametrit të adoptuar bazuar në materialin e gypit
        if (gypi === "HDPE/PE") {
            if (diametri_llogaritur > 0.1 && diametri_llogaritur <= 0.2) Dp = "Diametri i përvetësuar është 200 mm";
            else if (diametri_llogaritur > 0.200 && diametri_llogaritur <= 0.250) Dp = "Diametri i përvetësuar është 250 mm";
            else if (diametri_llogaritur > 0.250 && diametri_llogaritur <= 0.280) Dp = "Diametri i përvetësuar është 280 mm";
            else if (diametri_llogaritur > 0.315 && diametri_llogaritur <= 0.355) Dp = "Diametri i përvetësuar është 355 mm";
            else if (diametri_llogaritur > 0.355 && diametri_llogaritur <= 0.400) Dp = "Diametri i përvetësuar është 400 mm";
            else if (diametri_llogaritur > 0.400 && diametri_llogaritur <= 0.450) Dp = "Diametri i përvetësuar është 450 mm";
            else if (diametri_llogaritur > 0.450 && diametri_llogaritur <= 0.500) Dp = "Diametri i përvetësuar është 500 mm";
            else if (diametri_llogaritur > 0.500 && diametri_llogaritur <= 0.630) Dp = "Diametri i përvetësuar është 630 mm";
            else if (diametri_llogaritur > 0.630 && diametri_llogaritur <= 0.710) Dp = "Diametri i përvetësuar është 710 mm";
            else if (diametri_llogaritur > 0.800 && diametri_llogaritur <= 1.000) Dp = "Diametri i përvetësuar është 1000 mm";
            else Dp = "Nuk ka diametër optimal për PE.";
        }
        else if (gypi === "Beton") {
            if (diametri_llogaritur > 0.200 && diametri_llogaritur <= 0.250) Dp = "Diametri i përvetësuar është DN250 (250 mm)";
            else if (diametri_llogaritur > 0.250 && diametri_llogaritur <= 0.300) Dp = "Diametri i përvetësuar është DN300 (300 mm)";
            else if (diametri_llogaritur > 0.300 && diametri_llogaritur <= 0.400) Dp = "Diametri i përvetësuar është DN400 (400 mm)";
            else if (diametri_llogaritur > 0.400 && diametri_llogaritur <= 0.500) Dp = "Diametri i përvetësuar është DN500 (500 mm)";
            else if (diametri_llogaritur > 0.500 && diametri_llogaritur <= 0.600) Dp = "Diametri i përvetësuar është DN600 (600 mm)";
            else if (diametri_llogaritur > 0.600 && diametri_llogaritur <= 0.700) Dp = "Diametri i përvetësuar është DN700 (700 mm)";
            else if (diametri_llogaritur > 0.700 && diametri_llogaritur <= 0.800) Dp = "Diametri i përvetësuar është DN800 (800 mm)";
            else if (diametri_llogaritur > 0.800 && diametri_llogaritur <= 0.900) Dp = "Diametri i përvetësuar është DN900 (900 mm)";
            else if (diametri_llogaritur > 0.900 && diametri_llogaritur <= 1.000) Dp = "Diametri i përvetësuar është DN1000 (1000 mm)";
            else if (diametri_llogaritur > 1.000 && diametri_llogaritur <= 1.200) Dp = "Diametri i përvetësuar është DN1200 (1200 mm)";
            else if (diametri_llogaritur > 1.200 && diametri_llogaritur <= 1.400) Dp = "Diametri i përvetësuar është DN1400 (1400 mm)";
            else if (diametri_llogaritur > 1.400 && diametri_llogaritur <= 1.600) Dp = "Diametri i përvetësuar është DN1600 (1600 mm)";
            else if (diametri_llogaritur > 1.600 && diametri_llogaritur <= 1.800) Dp = "Diametri i përvetësuar është DN1800 (1800 mm)";
            else if (diametri_llogaritur > 1.800 && diametri_llogaritur <= 2.000) Dp = "Diametri i përvetësuar është DN2000 (2000 mm)";
            else if (diametri_llogaritur > 2.000 && diametri_llogaritur <= 2.200) Dp = "Diametri i përvetësuar është DN2200 (2200 mm)";
            else if (diametri_llogaritur > 2.200 && diametri_llogaritur <= 2.400) Dp = "Diametri i përvetësuar është DN2400 (2400 mm)";
            else if (diametri_llogaritur > 2.400 && diametri_llogaritur <= 2.600) Dp = "Diametri i përvetësuar është DN2600 (2600 mm)";
            else if (diametri_llogaritur > 2.600 && diametri_llogaritur <= 3.000) Dp = "Diametri i përvetësuar është DN3000 (3000 mm)";
            else Dp = "Nuk ka diametër optimal për gypa betoni.";
        }
        else {
            Dp = "Lloji i gypit nuk është i njohur";
        }

        // Nxjerrja e numrit nga diametri adoptuar për kalkulime
        let match = Dp.match(/\d+/);
        let Dp_value = match ? parseFloat(match[0]) /1000 : 0.001;

        // Llogaritja e shpejtësisë v = Q / A
        let shpejtesia = Q_m3s / (Math.PI * Math.pow(Dp_value, 2) / 4);

        // Shfaqja e rezultateve
        document.getElementById("diametri_llogaritur").textContent = "Diametri minimal është:" + " " + Dmm + " " + " mm";
        document.getElementById("diametri_pervetesuar").textContent = Dp;
        document.getElementById("velocity_result").textContent = `Shpejtësia e rrjedhës ≈ ${velocity.toFixed(2)} m/s`;

        // Sugjerim dhe stilizim
        const suggestion = document.getElementById("suggestionBox");
        if (shpejtesia < 0.5) {
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

  const diameter = document.getElementById("minimal_diameter").textContent;
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