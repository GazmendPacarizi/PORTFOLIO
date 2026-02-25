let grafikuQ, grafikuV;
let shpejtesiData = [];

function inicializoGrafiket() {
    const ctxQ = document.getElementById('grafikuQ').getContext('2d');
    const ctxV = document.getElementById('grafikuV').getContext('2d');

    grafikuQ = new Chart(ctxQ, {
        type: 'bar',
        data: {
            labels: segmentLabels,
            datasets: [{
                label: 'Prurja (m³/s)',
                data: prurjetData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Prurja përgjatë segmenteve'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    grafikuV = new Chart(ctxV, {
        type: 'line',
        data: {
            labels: segmentLabels,
            datasets: [{
                label: 'Shpejtësia (m/s)',
                data: shpejtesiData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Shpejtësia përgjatë segmenteve'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function perditesoGrafiket(segmentName, Q_m3, V){
    let index = segmentLabels.indexOf(segmentName);
    
    // Update prurjet dhe shpejtesine
    prurjetData[index] = Q_m3;
    shpejtesiData[index] = V;

    // Rifresko grafiket
    grafikuQ.data.labels = segmentLabels;
    grafikuQ.data.datasets[0].data = prurjetData;
    grafikuQ.update();

    grafikuV.data.labels = segmentLabels;
    grafikuV.data.datasets[0].data = shpejtesiData;
    grafikuV.update();
}
