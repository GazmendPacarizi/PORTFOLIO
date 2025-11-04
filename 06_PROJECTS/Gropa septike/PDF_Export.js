document.getElementById("ruajPDF").onclick = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 📅 Data aktuale
    const sot = new Date();
    const dataString = sot.toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    // 🧾 Titulli dhe data
    doc.setFontSize(14);
    doc.text("Raporti i llogaritjes për gropën septike", 10, 10);
    doc.setFontSize(12);
    doc.text(`Data e printimit: ${dataString}`, 150, 10);

    // 🧮 Të dhënat e futura
    const inpute = [
      ["Numri i banorëve të tanishëm", document.getElementById("nr_banoreve").value, "banorë"],
      ["Periudha projektuese", document.getElementById("periudha_projektuese").value, "vite"],
      ["Nataliteti", document.getElementById("shtimi_popullsise").value, "%"],
      ["Shpenzimi mesatar i ujit", document.getElementById("shpenzimi_mesatar").value, "l/b/d"],
      ["Kufiri i lirë", document.getElementById("kufiri_lire").value, "m"],
      ["Lartësia e ujit", document.getElementById("lartesia_ujit").value, "m"],
      ["Lymi", document.getElementById("lymi").value, "l/b/vit"],
      ["Periudha e pastrimit", document.getElementById("periudha_pastrimit").value, "herë/vit"],
      ["Koha e mbajtjes së ujit", document.getElementById("koha_mbajtjes").value, "orë"],
      ["Raporti L/B", document.getElementById("raporti_L-B").value, ""]
    ];

    let y = 20;
    doc.setFont(undefined, 'bold');
    doc.text("Të dhënat e futura:", 10, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    inpute.forEach(([label, value, unit]) => {
      doc.text(`${label}: ${value} ${unit}`, 10, y);
      y += 8;
    });

    y += 10;
    doc.setFont(undefined, 'bold');
    doc.text("Rezultatet e llogaritjes:", 10, y);
    y += 8;
    doc.setFont(undefined, 'normal');

    const rezultate = [
      ["Banorë në periudhën projektuese", document.getElementById("numri_banoreve_periudhe_projektuese").textContent.trim()],
      ["Prurja furnizuese", document.getElementById("prurja_furnizuese").textContent.trim()],
      ["Prurja shkarkuese", document.getElementById("prurja_shkarkuese").textContent.trim()],
      ["Vëllimi i lymit", document.getElementById("vellimi_lymit").textContent.trim()],
      ["Vëllimi total i gropës", document.getElementById("vellimi_gropes").textContent.trim()],
      ["Sipërfaqja e gropës", document.getElementById("siperfaqja_gropes").textContent.trim()],
      ["Lartësia totale", document.getElementById("lartësia_totale").textContent.trim()],
      ["Gjatësia", document.getElementById("gjatesia").textContent.trim()],
      ["Gjerësia", document.getElementById("gjeresia").textContent.trim()]
    ];

    rezultate.forEach(([label, value]) => {
  doc.text(`${label}: ${value}`, 10, y);
  y += 8;
});

    // 🖋️ Footer me emrin tënd
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Copyrighted by Gazmend Paçarizi", 105, 285, { align: "center" });

    doc.save("Raporti_Gropa_Septike.pdf");
  };