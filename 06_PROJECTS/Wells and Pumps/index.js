document.getElementById("calculate").onclick = function () {
  let D = parseFloat(document.getElementById("pump_head").value);
  let Q = parseFloat(document.getElementById("object-select").value);

  if (isNaN(D) || isNaN(Q)) {
    document.getElementById("results").textContent = "Please enter valid values.";
    return; // ✅ This ends the function early if inputs are invalid
  }

  let P = ((9810 * (Q /1000) * D) / 0.75) / 1000;

  document.getElementById("results").textContent = "Pump power is: " + P.toFixed(2) + " kW";
}
