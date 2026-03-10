function calculateAndPlot() {
      const input = document.getElementById("inputFlows").value;
      const flowValues = input
        .split(",")
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v));

      if (flowValues.length < 2) {
        document.getElementById("results").innerText = "Jepni të paktën dy vlera të vlefshme.";
        return;
      }

      const N = flowValues.length;
      const mean = flowValues.reduce((sum, val) => sum + val, 0) / N;
      const variance = flowValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (N - 1);
      const stdDev = Math.sqrt(variance);

      const T_values = [2, 5, 10, 25, 50, 100];
      const x_extremes = [];

      T_values.forEach(T => {
        const innerLog = Math.log(T / (T - 1));
        const YT = -Math.log(innerLog);
        const K = (YT - 0.577) / 1.2825;
        const x = mean + K * stdDev;
        x_extremes.push(x);
      });

      document.getElementById("results").innerHTML = `
        <strong>📊 Parametra bazë:</strong><br>
        ➤ Prurja mesatare (𝑋̄): <strong>${mean.toFixed(2)} m³/s</strong><br>
        ➤ Devijimi standard (σ): <strong>${stdDev.toFixed(2)} m³/s</strong><br>
        ➤ Numri i vlerave: ${N}<br><br>
        <strong>📈 Prurjet ekstreme sipas T:</strong><br>
        ${T_values.map((T, i) => `T = ${T} → x = ${x_extremes[i].toFixed(2)} m³/s`).join("<br>")}
      `;

      const ctx = document.getElementById("gumbelChart").getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: T_values,
          datasets: [{
            label: 'Prurja ekstreme (m³/s)',
            data: x_extremes,
            borderColor: '#0077cc',
            backgroundColor: 'rgba(0, 119, 204, 0.2)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointBackgroundColor: '#0077cc'
          }]
        },
        options: {
          scales: {
            x: {
              title: { display: true, text: 'Koha kthyes T (vite)' }
            },
            y: {
              title: { display: true, text: 'Prurja ekstreme (m³/s)' },
              beginAtZero: true
            }
          },
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      });
    }