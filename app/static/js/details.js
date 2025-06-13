const showAlert = (lugarWarning, msgWarning) => {
    const lugarAlerta = document.getElementById(lugarWarning);
    const alertMsg = document.createElement("p");
    alertMsg.innerText = msgWarning;
    alertMsg.style.color = "red";
    alertMsg.style.fontWeight = "bold";
    lugarAlerta.appendChild(alertMsg);
};

const clearAlerts = () => {
    const ids = [
        "nombre-warning",
        "texto-warning"
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("volver-a-listado");
    if (boton) {
        boton.addEventListener("click", () => {
            window.location.href="/activities";
        });
    }

    const form = document.getElementById("comentario-form");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const texto = document.getElementById("texto").value.trim();
            const actividadId = window.location.pathname.split("/").pop();

            clearAlerts();
            let isValid = true;

            if(!nombre) {
                showAlert("nombre-warning", "Campo olbigatorio");
                isValid = false;
            }
            else if(nombre.length < 3 || 80 < nombre.length) {
                showAlert("nombre-warning", "Campo debe tener mínimo 3 y máximo 80 caracteres");
                isValid = false;
            }
            if(!texto) {
                showAlert("texto-warning", "Campo olbigatorio");
                isValid = false;
            }
            else if(texto.length < 5 ) {
                showAlert("texto-warning", "Campo debe tener mínimo 5 caracteres");
                isValid = false;
            }

            if(!isValid) {
                return;
            }

            const datos = new FormData();
            datos.append("nombre", nombre);
            datos.append("texto", texto);

            fetch(`/activity/${actividadId}/comment`, {
                method: "POST",
                body: datos
            })
            .then(response => {
                if (!response.ok) throw new Error("Error al enviar comentario");
                return response.text();
            })
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.error(error);
                alert("Hubo un problema al enviar el comentario");
            });
        });
    }
});