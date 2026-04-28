let chart;
let pieChart;

// BAR CHART
function drawChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Core 1', 'Core 2', 'Core 3'],
            datasets: [{
                label: 'CPU Load',
                data: data,
                backgroundColor: ['#ff4d4d', '#4d79ff', '#33cc33'],
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000 },
            plugins: {
                title: {
                    display: true,
                    text: 'CPU Load Distribution'
                }
            }
        }
    });
}

// PIE CHART
function drawPie(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Core 1', 'Core 2', 'Core 3'],
            datasets: [{
                data: data,
                backgroundColor: ['#ff4d4d', '#4d79ff', '#33cc33']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'CPU Load Share (Pie Chart)'
                }
            }
        }
    });
}

// STATIC
function runStatic() {
    document.getElementById("output").innerText = "Running Static Scheduling...";

    fetch("http://127.0.0.1:5000/static")
        .then(res => res.json())
        .then(data => {
            document.getElementById("output").innerText =
                data.message + "\nCore Loads: " + data.cores;

            drawChart(data.cores);
            drawPie(data.cores);
        });
}

// DYNAMIC
function runDynamic() {
    document.getElementById("output").innerText = "Running Dynamic Scheduling...";

    fetch("http://127.0.0.1:5000/dynamic")
        .then(res => res.json())
        .then(data => {
            document.getElementById("output").innerText =
                data.message + "\nCore Loads: " + data.cores;

            drawChart(data.cores);
            drawPie(data.cores);
        });
}