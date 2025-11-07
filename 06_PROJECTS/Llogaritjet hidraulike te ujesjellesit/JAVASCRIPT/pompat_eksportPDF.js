
document.addEventListener("DOMContentLoaded", function () {
    const { jsPDF } = window.jspdf;
    const btnRuajPDF = document.getElementById("ruajPDF");

    btnRuajPDF.addEventListener("click", function () {
        const doc = new jsPDF();

        // Titulli
        doc.setFontSize(14);
        doc.text("Raport Llogaritjesh - GazCalc Studio", 10, 15);
        doc.setFontSize(11);

        let y = 25;

        // 🧮 1. Merr të gjitha vlerat nga inputet
        const inpute = [
            ["Prurja e pompës (l/s)", document.getElementById("prurja_maksimale_ditore").value],
            ["Kuota e pompave (m)", document.getElementById("kuota_pompave").value],
            ["Kuota e sipërme e rezervuarit (m)", document.getElementById("kuota_rezervuarit").value],
            ["Shpejtësia e propozuar (m/s)", document.getElementById("shpejtesia_propozuar").value],
            ["Materiali i gypit", document.getElementById("lloji_gypit").value],
            ["Koeficienti i Manning-ut", document.getElementById("manningu").value],
            ["Gjatësia e gypit (m)", document.getElementById("gjatesia_gypit").value],
        ];

        doc.text("Të dhënat hyrëse:", 10, y);
        y += 8;
        inpute.forEach(([label, value]) => {
            doc.text(`${label}: ${value || "-"}`, 10, y);
            y += 8;
        });

        y += 6;
        doc.text("Rezultatet e llogaritjeve:", 10, y);
        y += 8;

        // 📊 2. Merr rezultatet që janë në paragrafët HTML
        const rezultatet = [
            document.getElementById("diametri_llogaritur").textContent,
            document.getElementById("diametri_pervetesuar").textContent,
            document.getElementById("shpejtesia_vertete").textContent,
            document.getElementById("humbjet").textContent,
            document.getElementById("pjerrtesia_gypit").textContent,
            document.getElementById("presioni_gypit").textContent,
            
            document.getElementById("fuqia_maksimale_pompes").textContent
        ].filter(t => t.trim() !== "");

        if (rezultatet.length === 0) {
            alert("Nuk ka rezultate për t'u ruajtur. Ju lutem llogaritni më parë.");
            return;
        }

        rezultatet.forEach(line => {
            doc.text(line, 10, y);
            y += 8;
        });

        // 🕒 Data poshtë rezultateve
        y += 10;
        doc.text(`Data e krijimit: ${new Date().toLocaleString()}`, 10, y);

        // 📄 Footer në fund të faqes (poshtë, pavarësisht përmbajtjes)
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        const footerText = "Raporti u krijua automatikisht nga GazCalc Studio";
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(footerText);

        // Qendro tekstin horizontalisht
        doc.text(
            footerText,
            (pageWidth - textWidth) / 2,
            pageHeight - 10
        );

        // 💾 Ruaj PDF direkt
        doc.save("Raport_GazCalc.pdf");
    });
});

