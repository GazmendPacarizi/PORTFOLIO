    let Q = 0;

    function calculateRunOff() {
      const C = parseFloat(document.getElementById('surfaceType').value);
      const i = parseFloat(document.getElementById('intensity').value);
      const A = parseFloat(document.getElementById('area').value);

      if (C <= 0 || i <= 0 || A <= 0) {
        document.getElementById('outputQ').innerText = "⚠️ All values have to be > 0.";
        return;
      }

      Q = C * i * A;
      document.getElementById('outputQ').innerHTML = `🔹 Calculated flow is: <strong>${Q.toFixed(2)} l/s</strong>`;
      document.getElementById('pipeCalc').style.display = 'block';
    }

    function calculateDiameter() {
      const S = parseFloat(document.getElementById('slope').value);
      const n = parseFloat(document.getElementById('material').value);

      if (Q <= 0 || S <= 0 || n <= 0) {
        document.getElementById('outputD').innerText = "⚠️ Check values again.";
        return;
      }

      const Qm3 = Q / 1000; // l/s → m³/s
      let D = 0.1; // start with 100 mm
        while (D < 5) {
            const A = Math.PI * Math.pow(D, 2) / 4;
            const R = D / 4;
            const Qtest = (1 / n) * A * Math.pow(R, 2/3) * Math.sqrt(S / 100); // slope in decimal

            if (Qtest >= Qm3) break;
            D += 0.001;
        }




      const Dmm = Math.ceil(D * 1000); 
      document.getElementById('outputD').innerHTML = `🧮 Minimal diameter is: <strong>${Dmm} mm</strong>`;
    }