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
    const Qmaks_d = Qmes * 1.5; // l/s
    const Qmaks_o = Qmaks_d * 1.5;

    document.getElementById("numri_banoreve_periudhe_projektuese").innerText =
      "Numri i banorëve për periudhën projektuese është: " + Math.round(Nb / 100) * 100 + " banorë";

    document.getElementById("prurja_mesatare").innerText =
      "Prurja mesatare ditore është: " + Qmes.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_ditore").innerText =
      "Prurja maksimale ditore është: " + Qmaks_d.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_orore").innerText =
      "Prurja maksimale orore është: " + Qmaks_o.toFixed(2) + " l/s";
  };

  //eksporti ne pdf i rezultateve te prurjeve
    document.getElementById("Eksporto").onclick = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const NbText = document.getElementById("numri_banoreve_periudhe_projektuese").innerText;
    const QmesText = document.getElementById("prurja_mesatare").innerText;
    const QmaksDText = document.getElementById("prurja_maksimale_ditore").innerText;
    const QmaksOText = document.getElementById("prurja_maksimale_orore").innerText;

    doc.text("Rezultatet e llogaritjes:", 10, 10);
    doc.text(NbText, 10, 20);
    doc.text(QmesText, 10, 30);
    doc.text(QmaksDText, 10, 40);
    doc.text(QmaksOText, 10, 50);

    doc.save("Rezultatet.pdf");
  };

