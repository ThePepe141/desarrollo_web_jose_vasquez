//opcion de input para "contacto-option"
const contactoContainer = document.getElementById("contacto-option");
const contactoExtras = document.getElementById("contacto-extra");

contactoContainer.addEventListener("change", () => {
    const seleccionadas = Array.from(contactoContainer.querySelectorAll("input[name='contacto']:checked")).map(cb => cb.value);

    if (seleccionadas.length > 5){
        document.getElementById("contacto-warning").innerHTML = "";
        showAlert("contacto-warning", "Solo se pueden seleccionar un máximo de 5 opciones");
        contactoContainer.querySelectorAll("input[name='contacto']").forEach(cb => {
            if (cb.checked && !seleccionadas.includes(cb.value)) {
                cb.checked = false;
            }
        });
        return;
    }

    const valoresPrevios = {};
    contactoExtras.querySelectorAll("input").forEach(input => {
        valoresPrevios[input.name] = input.value;
    });

    contactoExtras.innerHTML = "";
    document.getElementById("contacto-warning").innerHTML = "";

    seleccionadas.forEach(forma => {
        const etiqueta = document.createElement("label");
        etiqueta.htmlFor = `input-${forma}`;
        etiqueta.innerText = `ID o URL de contacto para ${forma}:`;

        const theInput = document.createElement("input");
        theInput.type = "text";
        theInput.id = `input-${forma}`;
        theInput.name = `input-${forma}`;
        theInput.dataset.contact = forma;
        theInput.maxLength = 50;

        if (valoresPrevios[`input-${forma}`]) {
            theInput.value = valoresPrevios[`input-${forma}`];
        }

        contactoExtras.appendChild(etiqueta);
        contactoExtras.appendChild(theInput);
    });

});

//opcion de input para "tema-option"
const temaContainer = document.getElementById("tema-option");
const temaExtra = document.getElementById("tema-extra");

temaContainer.addEventListener("change", () => {
    const seleccionadas = Array.from(temaContainer.querySelectorAll("input[name='tema']:checked")).map(cb => cb.value);
    if (seleccionadas.includes("otro")){
        const etiqueta = document.createElement("label");
        etiqueta.htmlFor = `input-tema`;
        etiqueta.innerText = `Escriba el tema:`;

        const theInput = document.createElement("input");
        theInput.type = "text";
        theInput.id = `input-tema`;
        theInput.name = `input-tema`;
        theInput.maxLength = 15;

        temaExtra.appendChild(etiqueta);
        temaExtra.appendChild(theInput);
    }
    else{
        temaExtra.innerHTML = "";
    }
});

//codigo para cargar regiones
const regiones = region_comuna.regiones;
const regionSelect = document.getElementById("region");

regiones.forEach(r => {
    const opcion = document.createElement("option");
    opcion.value = r.numero;
    opcion.textContent = r.nombre;
    regionSelect.appendChild(opcion);
});

//codigo para cargar comunas
const comunaSelect = document.getElementById("comuna");

regionSelect.addEventListener('change', function () {
    const regionID = parseInt(this.value);
    const regionElegida = regiones.find(r => r.numero === regionID);
    //comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
    if (regionElegida) {
        regionElegida.comunas.forEach(c => {
            const option = document.createElement('option');
            option.value = c.id;
            option.textContent = c.nombre;
            comunaSelect.appendChild(option);
        });
    }
});

//codigo para agregar mas de una foto
const fotoContainer = document.getElementById("foto-container");
const agregaFoto = document.getElementById("agregar-foto");

agregaFoto.addEventListener("click", () => {
    const cantidadActual = fotoContainer.querySelectorAll("input[type='file']").length;

    if (cantidadActual >= 5){
        showAlert("foto-warning", "No se pueden agregar más de 5 fotos");
        return;
    }

    const nuevaFoto = document.createElement("input");
    nuevaFoto.type = "file";
    nuevaFoto.name = "foto";
    nuevaFoto.classList.add("foto");

    fotoContainer.appendChild(nuevaFoto);
});

//codigo para volver a menu inicial
const toMainMenu = () => {
    window.location.href = "index.html";
};

let gotoMM = document.getElementById("atras");
gotoMM.addEventListener("click", toMainMenu);


//------------------------Validaciones-------------------------

//valida si se excede el largo de un input (max: largo, input: categoria)
const exeedTextLenght = (categoria, largo) => {
    const aValidar = document.getElementById(categoria);
    return aValidar.value.length > largo;
};

//valida que un campo no este vacio
const notEmpty = (categoria) => {
    const aValidar = document.getElementById(categoria);
    return aValidar.value.trim() != "";
};

//valida que email tenga una buena estructura
const validEmail = () => {
    const aValidar = document.getElementById("email");
    let mail = aValidar.value;
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(mail);
};

//valida que un celular tenga buena estructura
const validCelular = () => {
    const aValidar = document.getElementById("celular");
    let cel = aValidar.value;
    const regex = /^\+\d{3}\.\d{8}$/;
    return regex.test(cel);
};

//valida limites de texto seleccion multiple
const validContactInputs = () => {
    const inputs = contactoExtras.querySelectorAll("input");
    let allValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();
        const nombre = input.dataset.contact || input.name;
        if (value.length < 4 || value.length > 50) {
            showAlert("contacto-warning", `El campo para ${nombre} debe tener entre 4 y 50 caracteres`);
            allValid = false;
        }
    });

    return allValid;
};


//validacion de categoria con selector
const validOption = (categoria) => {
    const aValidar = document.getElementById(categoria);
    return aValidar.value != "";
};

//limpia las alerts en el html
const clearAlerts = () => {
    const ids = [
        "nombre-warning",
        "email-warning",
        "celular-warning",
        "contacto-warning",
        "region-warning",
        "inicio-warning",
        "fin-warning",
        "tema-warning",
        "foto-warning"
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
};

//muestra una alert en lugarWarning con texto msgWarning
const showAlert = (lugarWarning, msgWarning) => {
    const lugarAlerta = document.getElementById(lugarWarning);
    const alertMsg = document.createElement("p");
    alertMsg.innerText = msgWarning;
    alertMsg.style.color = "red";
    alertMsg.style.fontWeight = "bold";
    lugarAlerta.appendChild(alertMsg);
};

const validForm = () => {

    clearAlerts();

    let isValid = true;
    //nombre
    if (!notEmpty("nombre")){
        showAlert("nombre-warning", "Campo obligatorio");
        isValid = false;
    }
    else if (exeedTextLenght("nombre", 200)){
        showAlert("nombre-warning", "Campo excede máximo de caracteres (máx. 200)");
        isValid = false;
    }
    //email
    if (!notEmpty("email")){
        showAlert("email-warning", "Campo obligatorio");
        isValid = false;
    }
    else if (!validEmail()){
        showAlert("email-warning", "Formato input incorrecto (a@a.a)");
        isValid = false;
    }
    else if (exeedTextLenght("email", 100)){
        showAlert("email-warning", "Campo excede máximo de caracteres (máx. 100)");
        isValid = false;
    } 
    //celular
    if (!notEmpty("celular")){
        showAlert("celular-warning", "Campo obligatorio")
    }
    else if (!validCelular()){
        showAlert("celular-warning", "Formato input incorrecto (+NNN.NNNNNNNN)")
        isValid = false;
    }
    //contacto
    if (!validContactInputs()){
        isValid = false;
    }
    //region
    if (!validOption("region")){
        showAlert("region-warning", "Campo obligatorio");
        isValid = false;
    }
    //comuna
    if (!validOption("comuna")){
        showAlert("comuna-warning", "Campo obligatorio");
        isValid = false;
    }
    //inicio
    const inicioInput = document.getElementById("inicio");
    const inicioValue = inicioInput.value.trim();
    if (inicioValue === ""){
        showAlert("inicio-warning", "Campo obligatorio");
        isValid = false;
    }
    //fin
    const finInput = document.getElementById("fin");
    const finValue = finInput.value.trim();
    if (finValue != ""){
        const ini = new Date(inicioValue);
        const fin = new Date(finValue);

        if (fin <= ini){
            showAlert("fin-warning", "Fecha de fin debe ser posterior a la fecha de inicio");
            isValid = false;
        }
    }
    //tema
    const temasSeleccionados = Array.from(document.querySelectorAll("input[name='tema']:checked")).map(cb => cb.value);
    if (temasSeleccionados.length === 0){
        showAlert("tema-warning", "Se debe seleccionar al menos 1 tema");
        isValid = false;
    }
    else if (temasSeleccionados.includes("otro")){
        const lenOtro = document.getElementById("input-tema").value.trim();
        if (lenOtro.length < 3 || lenOtro.length > 15){
            showAlert("tema-warning", "El tema escrito debe tener un largo entre 3 y 15 caracteres");
            isValid = false;
        }
    }
    //foto
    const fotos = fotoContainer.querySelectorAll("input[type='file']");
    let numSeleccionadas = 0;

    fotos.forEach(input => {
        if (input.files.length > 0){
            numSeleccionadas++;
        }
    });

    if (numSeleccionadas === 0){
        showAlert("foto-warning", "Campo obligatorio");
        isValid = false;
    }
    else if (numSeleccionadas > 5 ){
        showAlert("foto-warning", "Máximo 5 fotos")
        isValid = false;
    }

    return isValid;
    
};

const confContainer = document.getElementById("confirmacion-option");
const finalMsgContainer = document.getElementById("mensaje-final");

let pubEvent = document.getElementById("publicar");
pubEvent.addEventListener("click", () => {

    clearAlerts();

    const valido = validForm();

    if (!valido) return;

    confContainer.innerHTML = `
        <p style="font-weight: bold;">¿Está seguro que desea agregar esta actividad?</p>
        <button type="button" id="confirmar-btn">Sí, estoy seguro</button>
        <button type="button" id="cancelar-btn">No, no estoy seguro, quiero volver al formulario</button>
    `;
    confContainer.style.display = "block";

    document.getElementById("cancelar-btn").addEventListener("click", () => {
        confContainer.style.display = "none";
    });

    document.getElementById("confirmar-btn").addEventListener("click", () => {
        confContainer.style.display = "none";

        const form = document.getElementById("add-activity");
        form.method = "POST";
        form.enctype = "multipart/form-data";
        form.action = "/add";
        form.submit();
    })

});

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("atras");
    if (boton) {
        boton.addEventListener("click", () => {
            window.location.href="/";
        });
    }
});