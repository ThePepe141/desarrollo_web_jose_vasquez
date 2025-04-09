const toAddEvent = () => {
    window.location.href = "add_activity.html";
};

let gotoAdd = document.getElementById("agregar-evento");
gotoAdd.addEventListener("click", toAddEvent);