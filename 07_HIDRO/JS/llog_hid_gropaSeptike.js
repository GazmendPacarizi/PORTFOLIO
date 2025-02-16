document.getElementById("llog_gropa_septike").onclick = function() {
    // Parse input values
    let N0 = parseFloat(document.getElementById("Nr_banoreve").value);
    let Pp = parseFloat(document.getElementById("Periudha_projektuese").value);
    let Pps = parseFloat(document.getElementById("Periudha_pastrimit").value);
    let q = parseFloat(document.getElementById("kerkesa_uje_per_person").value);
    let H = parseFloat(document.getElementById("Lartësia").value);
    let Hl = parseFloat(document.getElementById("Kufiri_lirë").value);
    let Ly = parseFloat(document.getElementById("Lymi").value);
    let Km = parseFloat(document.getElementById("koha_mbajtjes").value);
    let Rrp = parseFloat(document.getElementById("rritja_popullsise").value);

    // Numri i popullsise
    let Nb = N0 * Math.pow((1 + Rrp / 100), Pp);

    // Furnizimi me uje
    let Qf = (q * Nb) / 1000;

    // Prurja shkarkuese
    let Qsh = 0.8 * Qf;

    // Vellimi i ujit
    let Vu = Qsh * Km / 24;

    // Vellimi i lymit
    let Vl = (Ly / 1000) * Nb * (Pps / 1);

    // Vellimi total
    let V1 = Vu + Vl;

    // Siperfaqja e gropes septike
    let A = V1 / H;

    // Gjeresia e gropes septike
    let W = Math.sqrt(A / 2);

    // Gjatesia e gropes septike, ne rastin tone ne raport 2 me 1
    let L = 2 * W;

    // Lartesia totale e gropes septike
    let Ht = H + Hl;

    // Update HTML elements with results
    document.getElementById("rez1").innerHTML = "Gjatësia e gropës septike (m): " + L.toFixed(2);
    document.getElementById("rez2").innerHTML ="Gjerësia e gropës septike (m): " + W.toFixed(2);
    document.getElementById("rez3").innerHTML ="Lartësia e gropës septike (m): " + Ht.toFixed(2);
};


   