//redirecciones
const toAddEvent = () => {
    window.location.href = "/add";
};

const toListEvent = () => {
    window.location.href = "/activities";
};

let gotoAdd = document.getElementById("agregar-evento");
if (gotoAdd) {
    gotoAdd.addEventListener("click", toAddEvent);
}

let gotoList = document.getElementById("ver-actividades");
if (gotoList) {
    gotoList.addEventListener("click", toListEvent);
}

//modo oscuro
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-mode");
    const isDark = localStorage.getItem("dark-mode")="true";
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