
function shtoSegment() {
    let id = Date.now();
    let segmentName = "S" + (segmentLabels.length + 1);
    segmentLabels.push(segmentName);

    let html = `
    <div class="segment-card" id="segment-${id}">
        
        <div class="row g-3">
            <div class="col-md-2">
                <label class="form-label">Segmenti</label>
                <input type="text" class="form-control segmenti" placeholder="Emri i segmentit">
            </div>

            <div class="col-md-2">
                <label class="form-label">Sipërfaqja</label>
                <select class="form-select c">
                    <option value="0.95">Asfalt (C = 0.95)</option>
                    <option value="0.85">Beton (C = 0.85)</option>
                    <option value="0.35">Tokë natyrore (C = 0.35)</option>
                    <option value="0.55">Tokë e ngjeshur (C = 0.55)</option>
                    <option value="0.15">Bar & Pyje (C = 0.15)</option>
                </select>
            </div>

            <div class="col-md-2">
                <label class="form-label">Intensiteti (l/s/ha)</label>
                <input type="number" class="form-control intensiteti" placeholder="120-180">
            </div>

            <div class="col-md-2">
                <label class="form-label">Sipërfaqja (ha)</label>
                <input type="number" class="form-control siperfaqja">
            </div>

            <div class="col-md-2">
                <label class="form-label">Pjerrtësia (%)</label>
                <input type="number" class="form-control pjerrtesia">
            </div>

            <div class="col-md-2">
                <label class="form-label">Materiali (n)</label>
                <select class="form-select n">
                    <option value="0.013">HDPE/PE</option>
                    <option value="0.015">Beton</option>
                </select>
            </div>
            
            <div class="col-md-2">
                <label class="form-label">Opsion Prurje</label>
                <select class="form-select prurjeOpsion">
                    <option value="zero">Zero</option>
                    <option value="fromPrev">Merr nga segmenti paraprak</option>
                </select>
            </div>
        </div>

        <div class="text-center mt-3">
            <button class="btn btn-secondary" onclick="llogarit(${id})">Llogarit</button>
            <button class="btn btn-danger" onclick="fshiSegment(${id})">Fshi</button>
        </div>

        <div class="rezultat-box d-none" id="rez-${id}"></div>

    </div>
    `;

    document.getElementById("container-segmente")
        .insertAdjacentHTML("beforeend", html);

    // ===============================
    // Event listener për ndryshimin e emrit të segmentit
    // ===============================
    let segmentInput = document.querySelector(`#segment-${id} .segmenti`);
    segmentInput.addEventListener("input", function() {
        let newName = segmentInput.value.trim();
        if (!newName) return;

        // Gjej indeksin e segmentit sipas ID-së
        let segmentBox = document.getElementById(`segment-${id}`);
        let oldName = segmentBox.dataset.segmentName;

        if (oldName) {
            let index = segmentLabels.indexOf(oldName);
            if (index !== -1) {
                segmentLabels[index] = newName;
                // Rifresko grafikun
                grafikuQ.data.labels = segmentLabels;
                grafikuV.data.labels = segmentLabels;
                grafikuQ.update();
                grafikuV.update();
            }
        }

        // Ruaj emrin e ri në dataset për këtë segment
        segmentBox.dataset.segmentName = newName;
    });
}

let prurjetData = [];
let segmentLabels = []; // ruan emrat e segmenteve sipas renditjes

function llogarit(id) {
    let segment = document.getElementById("segment-" + id);

    let opsion = segment.querySelector(".prurjeOpsion").value;
    let materialText = segment.querySelector(".n").selectedOptions[0].text;
    let n = parseFloat(segment.querySelector(".n").value);
    let S = parseFloat(segment.querySelector(".pjerrtesia").value) / 100;

    let C = parseFloat(segment.querySelector(".c").value);
    let i = parseFloat(segment.querySelector(".intensiteti").value);
    let A = parseFloat(segment.querySelector(".siperfaqja").value);

    if (isNaN(i) || isNaN(A) || isNaN(S)) {
        alert("Plotëso të gjitha fushat!");
        return;
    }

    // Prurja e segmentit aktual
    let Q_segment = C * i * A;     
    let Q_segment_m3 = Q_segment / 1000;

    let Q_m3;
    let segmentName = segment.querySelector(".segmenti").value.trim();
    let index = segmentLabels.indexOf(segmentName);

    let prevQ = 0;
    if (opsion === "fromPrev" && index > 0) {
        prevQ = prurjetData[index - 1] || 0;
        Q_m3 = prevQ + Q_segment_m3;
    } else {
        Q_m3 = Q_segment_m3;
    }

    // Ruaj prurjen e këtij segmenti
    prurjetData[index] = Q_m3;

    // Manning dhe diametri minimal
    let D = Math.pow(((Q_m3 * n) / (0.312 * Math.sqrt(S))), 3 / 8);
    let D_mm = D * 1000;

    // Diametri i adoptuar sipas materialit
    let Dp = "";
    if (materialText.includes("HDPE")) {
        if (D <= 0.2) Dp = "Diametri i përvetësuar është 200 mm";
        else if (D <= 0.25) Dp = "Diametri i përvetësuar është 250 mm";
        else if (D <= 0.315) Dp = "Diametri i përvetësuar është 315 mm";
        else if (D <= 0.355) Dp = "Diametri i përvetësuar është 355 mm";
        else if (D <= 0.4) Dp = "Diametri i përvetësuar është 400 mm";
        else if (D <= 0.45) Dp = "Diametri i përvetësuar është 450 mm";
        else if (D <= 0.5) Dp = "Diametri i përvetësuar është 500 mm";
        else if (D <= 0.63) Dp = "Diametri i përvetësuar është 630 mm";
        else if (D <= 0.8) Dp = "Diametri i përvetësuar është 800 mm";
        else if (D <= 1.0) Dp = "Diametri i përvetësuar është 1000 mm";
        else Dp = "Nuk ka diametër optimal për PE.";
    } else if (materialText.includes("Beton")) {
        if (D <= 0.25) Dp = "Diametri i përvetësuar është DN250 (250 mm)";
        else if (D <= 0.3) Dp = "Diametri i përvetësuar është DN300 (300 mm)";
        else if (D <= 0.4) Dp = "Diametri i përvetësuar është DN400 (400 mm)";
        else if (D <= 0.5) Dp = "Diametri i përvetësuar është DN500 (500 mm)";
        else if (D <= 0.6) Dp = "Diametri i përvetësuar është DN600 (600 mm)";
        else if (D <= 0.8) Dp = "Diametri i përvetësuar është DN800 (800 mm)";
        else if (D <= 1.0) Dp = "Diametri i përvetësuar është DN1000 (1000 mm)";
        else Dp = "Nuk ka diametër optimal për gypa betoni.";
    } else {
        Dp = "Lloji i gypit nuk është i njohur";
    }

    // Shpejtësia reale
    let match = Dp.match(/\d+/);
    let Dp_value = match ? parseFloat(match[0]) / 1000 : D;
    let area = Math.PI * Math.pow(Dp_value, 2) / 4;
    let V = Q_m3 / area;

    // Shfaq rezultatet
    let rezultat = document.getElementById("rez-" + id);
    rezultat.classList.remove("d-none", "rezultat-ok", "rezultat-error");
    if (V < 0.5) rezultat.classList.add("rezultat-error");
    else rezultat.classList.add("rezultat-ok");

    let rezultatHTML = "";

    // Nëse opsioni është "fromPrev", shfaq edhe prurjen e mëparshme dhe prurjen empirike
    if (opsion === "fromPrev" && index > 0) {
        rezultatHTML += `
            <p><strong>Prurja nga segmenti ${index} është:</strong> ${prevQ.toFixed(3)} m³/s</p>
            <p><strong>Prurja empirike e segmentit aktual është:</strong> ${Q_segment_m3.toFixed(3)} m³/s</p>
        `;
    }

    rezultatHTML += `
        <p><strong>Prurja totale e llogaritur është:</strong> ${Q_m3.toFixed(3)} m³/s</p>
        <p><strong>Diametri minimal është:</strong> ${D_mm.toFixed(0)} mm</p>
        <p><strong>${Dp}</strong></p>
        <p><strong>Shpejtësia reale është:</strong> ${V.toFixed(2)} m/s</p>
        <p>${V >= 0.5 && V <= 3 
            ? "✅ Shpejtësia është brenda kufijve të pranueshëm."
            : "⚠️ Shpejtësia është jashtë kufijve të pranueshëm."}
        </p>
    `;

    rezultat.innerHTML = rezultatHTML;

    // Përditëso grafiket
    perditesoGrafiket(segmentName, Q_m3, V);
}





function fshiSegment(id){
    document.getElementById("segment-"+id).remove();
}



// krijon segmentin e parë automatikisht
shtoSegment();

window.onload = function() {
    inicializoGrafiket();
};