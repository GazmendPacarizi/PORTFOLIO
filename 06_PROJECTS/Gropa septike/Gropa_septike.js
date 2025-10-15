document.getElementById("llogarit").onclick = function () {
  // Define all input IDs
  const inputIds = [
    "nr_banoreve",
    "periudha_projektuese",
    "shtimi_popullsise",
    "shpenzimi_mesatar",
    "lartesia_ujit",
    "kufiri_lire",
    "lymi",
    "periudha_pastrimit",
    "koha_mbajtjes",
    "raporti_L-B"
  ];

  // Check for empty fields
  let allFilled = true;
  inputIds.forEach(id => {
    const value = document.getElementById(id).value.trim();
    if (value === "") {
      allFilled = false;
      document.getElementById(id).classList.add("missing");
    } else {
      document.getElementById(id).classList.remove("missing");
    }
  });

  if (!allFilled) {
    alert("Ju lutem plotësoni të gjitha fushat përpara se të vazhdoni.");
    return;
  }

  // Continue with calculations
  let N0 = parseFloat(document.getElementById("nr_banoreve").value);
  let n = parseFloat(document.getElementById("periudha_projektuese").value);
  let ShP = parseFloat(document.getElementById("shtimi_popullsise").value);
  let q = parseFloat(document.getElementById("shpenzimi_mesatar").value);
  let Hu = parseFloat(document.getElementById("lartesia_ujit").value);
  let dH = parseFloat(document.getElementById("kufiri_lire").value);
  let lymi = parseFloat(document.getElementById("lymi").value);
  let PP = parseFloat(document.getElementById("periudha_pastrimit").value);
  let KM = parseFloat(document.getElementById("koha_mbajtjes").value);
  let Raporti = parseFloat(document.getElementById("raporti_L-B").value);

  let Nb = N0 * Math.pow((1 + ShP / 100), n);
  let Qf = Nb * q / 1000;
  let Qsh = 0.8 * Qf;
  let Vuj = Qsh * KM / 24;
  let Vlymit = lymi * Nb * PP / 1000;
  let Vtot = Vlymit + Vuj;
  let A = Vtot / Hu;
  let B = Math.sqrt(A / Raporti);
  let L = Raporti * B;
  let Htot = Hu + dH;

  document.getElementById("numri_banoreve_periudhe_projektuese").textContent = " " + Math.round(Nb / 10) * 10 + " banorë";
  document.getElementById("prurja_furnizuese").textContent = " " + Qf.toFixed(2) + " m³/d";
  document.getElementById("prurja_shkarkuese").textContent = " " + Qsh.toFixed(2) + " m³/d";
  document.getElementById("vellimi_lymit").textContent = " " + Vlymit.toFixed(2) + " m³";
  document.getElementById("vellimi_gropes").textContent = " " + Vtot.toFixed(2) + " m³";
  document.getElementById("siperfaqja_gropes").textContent = " " + A.toFixed(2) + " m²";
  document.getElementById("lartësia_totale").textContent = " " + Htot.toFixed(2) + " m";
  document.getElementById("gjatesia").textContent = " " + L.toFixed(2) + " m";
  document.getElementById("gjeresia").textContent = " " + B.toFixed(2) + " m";
};