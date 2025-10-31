document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("llogarit").onclick = function () {
        // Marrja e vlerave nga inputet
        let Qmaks_d = parseFloat(document.getElementById("prurja_maksimale_ditore").value);
        let KP = parseFloat(document.getElementById("kuota_pompave").value);
        let KR = parseFloat(document.getElementById("kuota_rezervuarit").value);
        let vp = parseFloat(document.getElementById("shpejtesia_propozuar").value);
        let gypi = document.getElementById("lloji_gypit").value;
        let gjatesia = parseFloat(document.getElementById("gjatesia_gypit").value);
        let n = parseFloat(document.getElementById("manningu").value);

        // Validimi i inputeve
        if (isNaN(Qmaks_d) || isNaN(KP) || isNaN(KR) || isNaN(vp) || isNaN(n) || isNaN(gjatesia)) {
            alert("Ju lutemi shënoni vlera numerike në të gjitha fushat!");
            return;
        }

        // Konvertimi i Q nga l/s në m³/s
        let Q_m3s = Qmaks_d / 1000;

        // Kalkulimi i diametrit (m)
        let diametri_llogaritur = Math.sqrt((4 * Q_m3s) / (Math.PI * vp));
        let Dp = " "; // Diametri i adoptuar

        // Determinimi i diametrit të adoptuar bazuar në materialin e gypit
        if (gypi === "HDPE/PE") {
            if (diametri_llogaritur > 0.05 && diametri_llogaritur <= 0.063) Dp = "Diametri i përvetësuar është 63 mm";
            else if (diametri_llogaritur > 0.063 && diametri_llogaritur <= 0.075) Dp = "Diametri i përvetësuar është 75 mm";
            else if (diametri_llogaritur > 0.075 && diametri_llogaritur <= 0.09) Dp = "Diametri i përvetësuar është 90 mm";
            else if (diametri_llogaritur > 0.09 && diametri_llogaritur <= 0.11) Dp = "Diametri i përvetësuar është 110 mm";
            else if (diametri_llogaritur > 0.11 && diametri_llogaritur <= 0.125) Dp = "Diametri i përvetësuar është 125 mm";
            else if (diametri_llogaritur > 0.125 && diametri_llogaritur <= 0.140) Dp = "Diametri i përvetësuar është 140 mm";
            else if (diametri_llogaritur > 0.140 && diametri_llogaritur <= 0.160) Dp = "Diametri i përvetësuar është 160 mm";
            else if (diametri_llogaritur > 0.160 && diametri_llogaritur <= 0.180) Dp = "Diametri i përvetësuar është 180 mm";
            else if (diametri_llogaritur > 0.180 && diametri_llogaritur <= 0.200) Dp = "Diametri i përvetësuar është 200 mm";
            else if (diametri_llogaritur > 0.225 && diametri_llogaritur <= 0.250) Dp = "Diametri i përvetësuar është 250 mm";
            else if (diametri_llogaritur > 0.250 && diametri_llogaritur <= 0.280) Dp = "Diametri i përvetësuar është 280 mm";
            else if (diametri_llogaritur > 0.280 && diametri_llogaritur <= 0.315) Dp = "Diametri i përvetësuar është 315 mm";
            else if (diametri_llogaritur > 0.315 && diametri_llogaritur <= 0.355) Dp = "Diametri i përvetësuar është 355 mm";
            else if (diametri_llogaritur > 0.355 && diametri_llogaritur <= 0.400) Dp = "Diametri i përvetësuar është 400 mm";
            else if (diametri_llogaritur > 0.400 && diametri_llogaritur <= 0.450) Dp = "Diametri i përvetësuar është 450 mm";
            else if (diametri_llogaritur > 0.450 && diametri_llogaritur <= 0.500) Dp = "Diametri i përvetësuar është 500 mm";
            else if (diametri_llogaritur > 0.500 && diametri_llogaritur <= 0.630) Dp = "Diametri i përvetësuar është 630 mm";
            else if (diametri_llogaritur > 0.630 && diametri_llogaritur <= 0.710) Dp = "Diametri i përvetësuar është 710 mm";
            else if (diametri_llogaritur > 0.710 && diametri_llogaritur <= 0.800) Dp = "Diametri i përvetësuar është 800 mm";
            else if (diametri_llogaritur > 0.800 && diametri_llogaritur <= 1.000) Dp = "Diametri i përvetësuar është 1000 mm";
            else Dp = "Nuk ka diametër optimal për PE.";
        }
        else if (gypi === "Çelik") {
            if (diametri_llogaritur > 0.010 && diametri_llogaritur <= 0.015) Dp = "Diametri i përvetësuar është DN15 (21.3 mm)";
            else if (diametri_llogaritur > 0.015 && diametri_llogaritur <= 0.020) Dp = "Diametri i përvetësuar është DN20 (26.9 mm)";
            else if (diametri_llogaritur > 0.020 && diametri_llogaritur <= 0.025) Dp = "Diametri i përvetësuar është DN25 (33.7 mm)";
            else if (diametri_llogaritur > 0.025 && diametri_llogaritur <= 0.032) Dp = "Diametri i përvetësuar është DN32 (42.4 mm)";
            else if (diametri_llogaritur > 0.032 && diametri_llogaritur <= 0.040) Dp = "Diametri i përvetësuar është DN40 (48.3 mm)";
            else if (diametri_llogaritur > 0.040 && diametri_llogaritur <= 0.050) Dp = "Diametri i përvetësuar është DN50 (60.3 mm)";
            else if (diametri_llogaritur > 0.050 && diametri_llogaritur <= 0.065) Dp = "Diametri i përvetësuar është DN65 (76.1 mm)";
            else if (diametri_llogaritur > 0.065 && diametri_llogaritur <= 0.080) Dp = "Diametri i përvetësuar është DN80 (88.9 mm)";
            else if (diametri_llogaritur > 0.080 && diametri_llogaritur <= 0.100) Dp = "Diametri i përvetësuar është DN100 (114.3 mm)";
            else if (diametri_llogaritur > 0.100 && diametri_llogaritur <= 0.125) Dp = "Diametri i përvetësuar është DN125 (139.7 mm)";
            else if (diametri_llogaritur > 0.125 && diametri_llogaritur <= 0.150) Dp = "Diametri i përvetësuar është DN150 (168.3 mm)";
            else if (diametri_llogaritur > 0.150 && diametri_llogaritur <= 0.200) Dp = "Diametri i përvetësuar është DN200 (219.1 mm)";
            else if (diametri_llogaritur > 0.200 && diametri_llogaritur <= 0.250) Dp = "Diametri i përvetësuar është DN250 (273.0 mm)";
            else if (diametri_llogaritur > 0.250 && diametri_llogaritur <= 0.300) Dp = "Diametri i përvetësuar është DN300 (323.9 mm)";
            else if (diametri_llogaritur > 0.300 && diametri_llogaritur <= 0.350) Dp = "Diametri i përvetësuar është DN350 (355.6 mm)";
            else if (diametri_llogaritur > 0.350 && diametri_llogaritur <= 0.400) Dp = "Diametri i përvetësuar është DN400 (406.4 mm)";
            else if (diametri_llogaritur > 0.400 && diametri_llogaritur <= 0.450) Dp = "Diametri i përvetësuar është DN450 (457.0 mm)";
            else if (diametri_llogaritur > 0.450 && diametri_llogaritur <= 0.500) Dp = "Diametri i përvetësuar është DN500 (508.0 mm)";
            else if (diametri_llogaritur > 0.500 && diametri_llogaritur <= 0.600) Dp = "Diametri i përvetësuar është DN600 (610.0 mm)";
            else if (diametri_llogaritur > 0.600 && diametri_llogaritur <= 0.700) Dp = "Diametri i përvetësuar është DN700 (711.0 mm)";
            else if (diametri_llogaritur > 0.700 && diametri_llogaritur <= 0.800) Dp = "Diametri i përvetësuar është DN800 (813.0 mm)";
            else if (diametri_llogaritur > 0.800 && diametri_llogaritur <= 0.900) Dp = "Diametri i përvetësuar është DN900 (914.0 mm)";
            else if (diametri_llogaritur > 0.900 && diametri_llogaritur <= 1.000) Dp = "Diametri i përvetësuar është DN1000 (1016.0 mm)";
            else if (diametri_llogaritur > 1.000 && diametri_llogaritur <= 1.200) Dp = "Diametri i përvetësuar është DN1200 (1219.0 mm)";
            else Dp = "Nuk ka diametër optimal për Çelik.";
        }
        else if (gypi === "Beton") {
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

        // Nxjerrja e numrit nga diametri adoptuar për kalkulime
        let match = Dp.match(/\d+/);
        let Dp_value = match ? parseFloat(match[0]) : 0.001;

        // Kalkulimi i humbjeve (Manning simplified)
        let kf = 124.6 * n**2 / (Dp_value ** 0.333);

        // Shfaqja e rezultateve
        document.getElementById("diametri_llogaritur").textContent = "Diametri i llogaritur është: " + (diametri_llogaritur * 1000).toFixed(2) + " mm";
        document.getElementById("diametri_pervetesuar").textContent = Dp;
        document.getElementById("humbjet").textContent = "Humbjet gjatësore të presionit janë: " + kf.toFixed(5) + " m";
    };
});