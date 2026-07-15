document.getElementById("llogarit").onclick = function () {
    let H = parseFloat(document.getElementById("lartesia_objektit").value);
    let Pm_m = parseFloat(document.getElementById("presioni_minimal").value);
    let K = parseFloat(document.getElementById("numri_kateve").value);
    let Q = parseFloat(document.getElementById("object-select").value);

    if (isNaN(H) || isNaN(Pm_m) || isNaN(K)) {
        alert("Ju lutem plotësoni të gjitha fushat me numra!");
        return; // ndalon ekzekutimin e mëtejshëm
    }

    let Hp = 5;
    let Nj_rrj = 25.50;
    

    let P = ((9810 * (Q /1000) * (H + Hp * K + Pm_m)) / 0.75) / 1000;
    let q = 0.25 * Math.sqrt( Nj_rrj * K);
    let v_sup = 1.0;
    let D_llog = Math.sqrt((4 * q / 1000) / (Math.PI * v_sup));

    let D_perv = "";
    if (D_llog > 0.010 && D_llog <= 0.015) D_perv = "Diametri i përvetësuar është DN15 (21.3 mm)";
    else if (D_llog > 0.015 && D_llog <= 0.020) D_perv = "Diametri i përvetësuar është DN20 (26.9 mm)";
    else if (D_llog > 0.020 && D_llog <= 0.025) D_perv = "Diametri i përvetësuar është DN25 (33.7 mm)";
    else if (D_llog > 0.025 && D_llog <= 0.032) D_perv = "Diametri i përvetësuar është DN32 (42.4 mm)";
    else if (D_llog > 0.032 && D_llog <= 0.040) D_perv = "Diametri i përvetësuar është DN40 (48.3 mm)";
    else if (D_llog > 0.040 && D_llog <= 0.050) D_perv = "Diametri i përvetësuar është DN50 (60.3 mm)";
    else if (D_llog > 0.050 && D_llog <= 0.065) D_perv = "Diametri i përvetësuar është DN65 (76.1 mm)";
    else if (D_llog > 0.065 && D_llog <= 0.080) D_perv = "Diametri i përvetësuar është DN80 (88.9 mm)";
    else if (D_llog > 0.080 && D_llog <= 0.100) D_perv = "Diametri i përvetësuar është DN100 (114.3 mm)";
    else D_perv = "Nuk ka diametër optimal për këtë vlerë.";

    // Nxjerrja e numrit nga teksti (mm → m)
    let match = D_perv.match(/\(([\d.]+)\s*mm\)/);
    let D_perv_value = match ? parseFloat(match[1]) / 1000 : 0.001; // në metra
    /*
    let match = D_perv.match(/\d+/);
    let D_perv_value = match ? parseFloat(match[0]) /1000 : 0.001  */

    // Shpejtësia e ujit në gyp (m/s)
    let v_vert = (4 * q) / (Math.PI * D_perv_value * D_perv_value);

    document.getElementById("results").textContent =
    "Fuqia maksimale e pompës është: " + P.toFixed(2) + " kW";

    document.getElementById("pipe-dimension").textContent =
    "Diametri minimal i llogaritur (ID) është: " + (D_llog * 1000).toFixed(2) + " mm";

    document.getElementById("pipe-dimension_real").textContent = D_perv;
    /*
    document.getElementById("pipe-dimension_real").textContent =
    "Diametri i përvetësuar është: " + (D_perv_value * 1000).toFixed(2) + " mm"; */
    /*
    document.getElementById("water-speed").textContent =
    "Shpejtësia e vërtetë është: " + v_vert.toFixed(2) + " m/s"; */

    
    
    
    // Presioni fillestar llogaritet që kati i fundit të ketë ≥ Pm
    let Pm = Pm_m / 10;
  
    let startPressure = Pm + (K - 1) * 0.5;

    // Llogarit presionin për çdo kat
    let pressures = [];
    for (let i = 1; i <= K; i++) {
        pressures.push(startPressure - (i - 1) * 0.5);
    }

    // Shfaq tekstin
    document.getElementById("pressure-per-floor").textContent =
        "Presioni fillestar duhet të jetë: " + startPressure.toFixed(2) +
        " bar, që kati i fundit të jetë mbi " + Pm.toFixed(2) + " bar.";

    // Grafiku
    const ctx = document.getElementById('pressureLossChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: Array.from({length: K}, (_, i) => `Kati ${i+1}`),
        datasets: [{
            label: 'Presioni (bar)',
            data: pressures,
            borderColor: 'blue',
            fill: false,
            tension: 0.1
        }]
        },
        options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
        }
    });  



};
