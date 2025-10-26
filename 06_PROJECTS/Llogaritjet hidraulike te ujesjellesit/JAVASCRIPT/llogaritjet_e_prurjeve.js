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
    const Qmaks_d = Qmes * 1.5 * 86.4; // m³/ditë
    const Qmaks_o = Qmaks_d * 1.5;

    document.getElementById("numri_banoreve_periudhe_projektuese").innerText =
      "Numri i banorëve për periudhën projektuese është: " + Math.round(Nb / 100) * 100 + " banorë";

    document.getElementById("prurja_mesatare").innerText =
      "Prurja mesatare ditore është: " + Qmes.toFixed(2) + " l/s";

    document.getElementById("prurja_maksimale_ditore").innerText =
      "Prurja maksimale ditore është: " + Qmaks_d.toFixed(2) + " m³/ditë";

    document.getElementById("prurja_maksimale_orore").innerText =
      "Prurja maksimale orore është: " + Qmaks_o.toFixed(2) + " m³/orë";

    updateTable(); // përditëso tabelën

    const maxPositive = parseFloat(localStorage.getItem("maxPositive")) || 0;
    const maxNegative = parseFloat(localStorage.getItem("maxNegative")) || 0;

    const Vrez = (maxPositive + maxNegative) * Qmaks_d /100;
    const Vzj = 36;
    const Vshtëse = 0.25 * (Vrez + Vzj);
    const Vtot = Vrez + Vzj + Vshtëse;

    document.getElementById("rezervuari").innerText = Math.ceil(Vrez.toFixed(2)/5)*5 + " m³";
    document.getElementById("rezervuari_vtot").innerText =
      "Vëllimi total i rezervuarit është: " + Vtot.toFixed(2) + " m³";
  };