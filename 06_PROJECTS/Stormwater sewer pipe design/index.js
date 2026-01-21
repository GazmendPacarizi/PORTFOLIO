function llogarit() {
    let C = parseFloat(document.getElementById("lloji_siperfaqes").value);
    let I = parseFloat(document.getElementById("intensiteti").value);
    let A = parseFloat(document.getElementById("siperfaqja").value);
    let S = parseFloat(document.getElementById("pjerrtesia").value);

    let select = document.getElementById("materiali");
    let gypi = parseFloat(select.value); // koeficienti Manning
    let material = select.options[select.selectedIndex].text; // "HDPE/PE" ose "Beton"

    const resultsBox = document.getElementById("rezultatet");

    if (isNaN(C) || isNaN(I) || isNaN(A) || isNaN(S)) {
        alert("Ju lutemi plotësoni të gjitha fushat!");
        return;
    }

    // Llogaritja e prurjes Q
    let Q = C * I * A; // l/s
    let Q_m3s = Q / 1000;

    // Diametri minimal (m)
    let diametri_llogaritur = Math.pow(((Q_m3s * 4 * gypi * Math.pow(4, 2/3)) /(Math.PI * Math.sqrt(S / 100))), 3/8);

    // Diametri i adoptuar sipas materialit
    let Dp = "";
    if (material.includes("HDPE")) {
        if (diametri_llogaritur > 0.1 && diametri_llogaritur <= 0.2) Dp = "Diametri i përvetësuar është 200 mm";
        else if (diametri_llogaritur > 0.200 && diametri_llogaritur <= 0.250) Dp = "Diametri i përvetësuar është 250 mm";
        else if (diametri_llogaritur > 0.250 && diametri_llogaritur <= 0.315) Dp = "Diametri i përvetësuar është 315 mm";
        else if (diametri_llogaritur > 0.315 && diametri_llogaritur <= 0.355) Dp = "Diametri i përvetësuar është 355 mm";
        else if (diametri_llogaritur > 0.355 && diametri_llogaritur <= 0.400) Dp = "Diametri i përvetësuar është 400 mm";
        else if (diametri_llogaritur > 0.400 && diametri_llogaritur <= 0.450) Dp = "Diametri i përvetësuar është 450 mm";
        else if (diametri_llogaritur > 0.450 && diametri_llogaritur <= 0.500) Dp = "Diametri i përvetësuar është 500 mm";
        else if (diametri_llogaritur > 0.500 && diametri_llogaritur <= 0.630) Dp = "Diametri i përvetësuar është 630 mm";
        else if (diametri_llogaritur > 0.630 && diametri_llogaritur <= 0.710) Dp = "Diametri i përvetësuar është 710 mm";
        else if (diametri_llogaritur > 0.800 && diametri_llogaritur <= 1.000) Dp = "Diametri i përvetësuar është 1000 mm";
        else Dp = "Nuk ka diametër optimal për PE.";
    }
    else if (material.includes("Beton")) {
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
    // Nxjerrja e numrit nga diametri adoptuar
    let match = Dp.match(/\d+/);
    let Dp_value = match ? parseFloat(match[0]) / 1000 : diametri_llogaritur;

    // Shpejtësia
    let shpejtesia = (Q_m3s / (Math.PI * Math.pow(Dp_value, 2) / 4)).toFixed(2);

    // Rezultatet
    document.getElementById("prurja_llogaritur").textContent = "Prurja e llogaritur është: " + Q_m3s.toFixed(3) + " m³/s";
    document.getElementById("diametri_llogaritur").textContent = "Diametri minimal është: " + (diametri_llogaritur*1000).toFixed(0) + " mm";
    document.getElementById("diametri_pervetesuar").textContent = Dp;
    document.getElementById("shpejtesia_vertete").textContent = "Shpejtësia e rrjedhjes është" + " " + shpejtesia + " " + "m/s";
    

    // Sugjerime
    const suggestion = document.getElementById("sygjerimet");
    if (shpejtesia < 0.5) {
        suggestion.textContent = "⚠️ Shpejtësia është shumë e ulët (< 0.5 m/s). Rekomandohet të zvogëlohet diametri ose të rritet pjerrësia.";
        resultsBox.style.border = "2px solid orange";
        resultsBox.style.backgroundColor = "#fff3cd";
    } else {
        suggestion.textContent = "✅ Shpejtësia është brenda kufijve të pranueshëm.";
        resultsBox.style.border = "2px solid #198754";
        resultsBox.style.backgroundColor = "#e2f7e2";
    }

}
function saveToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header me datën e krijimit
    let today = new Date();
    let dateStr = today.toLocaleDateString("sq-AL", {
        year: "numeric", month: "long", day: "numeric"
    });
    doc.setFontSize(12);
    doc.text(`Raport i krijuar më: ${dateStr}`, 10, 10);

    // Inputet
    let inpute = [
        ["Segmenti", document.getElementById("segmenti").value],
        ["Lloji i sipërfaqes (C)", document.getElementById("lloji_siperfaqes").options[document.getElementById("lloji_siperfaqes").selectedIndex].text],
        ["Intensiteti i reshjeve", document.getElementById("intensiteti").value + " l/s/ha"],
        ["Sipërfaqja", document.getElementById("siperfaqja").value + " ha"],
        ["Pjerrësia", document.getElementById("pjerrtesia").value + " %"],
        ["Materiali i tubacionit", document.getElementById("materiali").options[document.getElementById("materiali").selectedIndex].text]
    ];

    let y = 25;
    doc.setFontSize(12);
    doc.text("Të dhënat e futura:", 10, y);
    y += 8;
    inpute.forEach(([label, value]) => {
        doc.text(`${label}: ${value}`, 10, y);
        y += 8;
    });

    // Rezultatet
    y += 10;
    doc.text("Rezultatet e llogaritjes:", 10, y);
    y += 8;

    let rezultate = [
        document.getElementById("prurja_llogaritur").textContent,
        document.getElementById("diametri_llogaritur").textContent,
        document.getElementById("diametri_pervetesuar").textContent,
        document.getElementById("shpejtesia_vertete").textContent,
    ];

    rezultate.forEach(r => {
        doc.text(r, 10, y);
        y += 8;
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Copyrighted by Gazmend Paçarizi", 105, 290, { align: "center" });


    // Ruaj PDF
    doc.save("Raporti_Kanalizim_Atmosferik.pdf");
}



