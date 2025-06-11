document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("volver-al-inicio");
    if (boton) {
        boton.addEventListener("click", () => {
            window.location.href="/";
        });
    }

    fetchAJAX("/api/statistics/activities-by-day", buildLineChart);
    fetchAJAX("/api/statistics/activities-by-theme", buildPieChart);
    fetchAJAX("/api/statistics/activities-by-time", buildBarChart);
});

let fetchAJAX = (url, callback) => {
    fetch(url)
        .then((response) => {
            if (!response.ok){
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then((ajaxResponse) => {
            callback(ajaxResponse);
            console.log("Datos recibidos desde: ", url, ajaxResponse);
        })
        .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation",
                error
            );
        })
};

//graficos
function buildLineChart(data) {
    new Chart(document.getElementById("acts_per_day"), {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Cantidad de Actividades",
                data: data.cantidades,
                fill: false,
                borderColor: "blue",
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        stepsize: 1,
                        precision: 0
                    }
                }
            }
        }
    });
}
function buildPieChart(data) {
    new Chart(document.getElementById("acts_per_theme"), {
        type: "pie",
        data: {
            labels: data.labels,
            datasets: [{
                data: data.cantidades,
                backgroundColor: ["#00FF00", "#FFFF00", "#FF00FF", "#0000FF", "#FFA500", "#800080", "#008080", "#A0522D", "#8B0000", "#D3D3D3"],
            }]
        }
    });
}

function buildBarChart(data) {
    new Chart(document.getElementById("acts_per_date"), {
    type: "bar",
    data: {
        labels: data.labels,
        datasets: [
            {
                label: "mañana",
                data: data.manana,
                backgroundColor: "#FFD54F"
            },
            {
                label: "tarde",
                data: data.tarde,
                backgroundColor: "#FF8A65"
            },
            {
                label: "noche",
                data: data.noche,
                backgroundColor: "#37474F"
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepsize: 1,
                    precision: 0
                }
            }
        }
    }
});
}