document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("volver-al-inicio");
    if (boton) {
        boton.addEventListener("click", () => {
            window.location.href="/";
        });
    }
});

//graficos
new Chart(document.getElementById("acts_per_day"), {
    type: "line",
    data: {
        labels: ["2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04"],
        datasets: [{
            label: "Cantidad de Actividades",
            data: [2, 1, 3, 4],
            fill: false,
            borderColor: "blue",
            tension: 0.1
        }]
    }
});

new Chart(document.getElementById("acts_per_theme"), {
    type: "pie",
    data: {
        labels: ["Baile", "Ciencia", "Comida", "Deporte", "Juegos", "Música", "Política", "Religión", "Tecnología", "Otro"],
        datasets: [{
            data: [8, 3, 1, 5, 9, 4, 4, 7, 10, 6],
            backgroundColor: ["#00FF00", "#FFFF00", "#FF00FF", "#0000FF", "#FFA500", "#800080", "#008080", "#A0522D", "#8B0000", "#D3D3D3"],
        }]
    }
});

new Chart(document.getElementById("acts_per_date"), {
    type: "bar",
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: "AM",
                data: [9, 11, 6, 5, 3, 3, 2, 4, 8, 4, 3, 10],
                backgroundcolor: "#FFFF00"
            },
            {
                label: "PM",
                data: [14, 18, 13, 6, 5, 5, 4, 6, 14, 5, 8, 20],
                backgroundcolor: "#FF00FF"
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepsize: 1
                }
            }
        }
    }
});