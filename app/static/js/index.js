//redirecciones
const toAddEvent = () => {
    window.location.href = "/add";
};

const toListEvent = () => {
    window.location.href = "/activities";
};

const toStatsEvent = () => {
    window.location.href = "/statistics";
};

let gotoAdd = document.getElementById("agregar-evento");
if (gotoAdd) {
    gotoAdd.addEventListener("click", toAddEvent);
};

let gotoList = document.getElementById("ver-actividades");
if (gotoList) {
    gotoList.addEventListener("click", toListEvent);
};

let gotoStats = document.getElementById("estadisticas");
if (gotoStats) {
    gotoStats.addEventListener("click", toStatsEvent);
};

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

function showLastActivities(actividades) {
    //const actividades = response.data;
    const tbody = document.getElementById("tbody-actividades");
    actividades.forEach(act => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${act.inicio}</td>
            <td>${act.fin}</td>
            <td>${act.comuna}</td>
            <td>${act.sector}</td>
            <td><ul>${act.temas.map(t => `<li>${t}</li>`).join("")}</ul></td>
            <td>${act.foto ? `<img src="/static/${act.foto}" alt="foto actividad" style="max-width: 100px; border-radius: 6px;">` : "Sin foto"}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchAJAX("api/last-activities", showLastActivities);
});

//modo oscuro
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-mode");
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark){
        document.body.classList.add("dark-mode");
        toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
        if (toggle.checked){
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "true");
        }
        else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "false");
        }
    });
});