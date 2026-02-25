function saveToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titulli
    doc.setFontSize(16);
    doc.text("Raport Hidraulik", 105, 20, { align: "center" });

    // Data
    let date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Data: ${date}`, 14, 30);

    // Përgatitja e të dhënave për tabelë
    let rows = [];
    for (let i = 0; i < segmentLabels.length; i++) {
        let Q = prurjetData[i] || 0;
        let V = shpejtesiData[i] || 0;
        rows.push([
            segmentLabels[i],
            Q.toFixed(3),
            V.toFixed(2)
        ]);
    }

    // Tabela kryesore
    doc.autoTable({
        head: [["Segmenti", "Prurja (m³/s)", "Shpejtësia (m/s)"]],
        body: rows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [54, 162, 235] },
    });

    // Rezultatet e detajuara nga div-et
    let y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text("Rezultatet e detajuara:", 14, y);

    y += 6;
    document.querySelectorAll(".rezultat-box").forEach((box, idx) => {
        if (!box.classList.contains("d-none")) {
            let text = box.innerText.replace(/\n/g, " ");
            doc.setFontSize(10);
            let splitText = doc.splitTextToSize(`${segmentLabels[idx]}: ${text}`, 180);
            doc.text(splitText, 14, y);
            y += splitText.length * 6;
        }
    });

    // ===============================
    // Futja e grafikëve si imazh
    // ===============================

    let canvasQ = document.getElementById("grafikuQ");
    let canvasV = document.getElementById("grafikuV");

    if (canvasQ) {
        let imgQ = canvasQ.toDataURL("image/png", 1.0);
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Grafiku i Prurjes", 105, 20, { align: "center" });
        doc.addImage(imgQ, "PNG", 15, 30, 180, 120);
    }

    if (canvasV) {
        let imgV = canvasV.toDataURL("image/png", 1.0);
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Grafiku i Shpejtësisë", 105, 20, { align: "center" });
        doc.addImage(imgV, "PNG", 15, 30, 180, 120);
    }

    // Footer
    doc.setFontSize(9);
    doc.text("© GazCalc Studio", 105, 290, { align: "center" });

    // Ruaj PDF
    doc.save("Raport_Hidraulik.pdf");
}