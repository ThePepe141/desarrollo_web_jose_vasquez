document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("volver-a-listado");
    if (boton) {
        boton.addEventListener("click", () => {
            window.location.href="/activities";
        });
    }
});