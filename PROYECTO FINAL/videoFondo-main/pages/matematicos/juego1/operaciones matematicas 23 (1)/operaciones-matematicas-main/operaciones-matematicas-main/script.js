// Elementos del DOM
let num1 = document.querySelector("#num1");
let num2 = document.querySelector("#num2");
let respuesta_usuario = document.querySelector("#respuesta_usuario");
let msj_correccion = document.querySelector("#msj_correccion");
let operacion = document.querySelector("#operacion");
let operacion_actual;
let n1, n2;


function btnSumar() { //activar el botón correspondiente y establecer la operación de suma
    msj_correccion.innerHTML = "";
    activarBoton("suma");
    operacion_actual = "+";
    operacion.innerHTML = " + ";
    nuevaSuma();
}


function nuevaSuma() { //generar una nueva suma con números aleatorios
    n1 = parseInt(Math.random() * 10);
    n2 = parseInt(Math.random() * 10);
    num1.innerHTML = n1;
    num2.innerHTML = n2;
    respuesta_usuario.focus();
}


function btnProducto() { //activar el botón correspondiente y establecer la operación de producto
    msj_correccion.innerHTML = "";
    activarBoton("producto");
    operacion_actual = "*";
    operacion.innerHTML = " x ";
    nuevoProducto();
}


function nuevoProducto() { //generar un nuevo producto con números aleatorios
    n1 = parseInt(Math.random() * 10);
    n2 = parseInt(Math.random() * 10);
    num1.innerHTML = n1;
    num2.innerHTML = n2;
    respuesta_usuario.focus();
}


function btnResta() { //activar el botón correspondiente y establecer la operación de resta
    msj_correccion.innerHTML = "";
    activarBoton("resta");
    operacion_actual = "-";
    operacion.innerHTML = " - ";
    nuevaResta();
}


function nuevaResta() { //generar una nueva resta con números aleatorios
    n1 = parseInt(Math.random() * 5 + 5);
    n2 = parseInt(Math.random() * 5);
    num1.innerHTML = n1;
    num2.innerHTML = n2;
    respuesta_usuario.focus();
}


function btnDivision() { //activar el botón correspondiente y establecer la operación de división
    msj_correccion.innerHTML = "";
    activarBoton("division");
    operacion_actual = "/";
    operacion.innerHTML = " / ";
    nuevaDivision();
}


function nuevaDivision() { //generar una nueva división con números aleatorios
    let divisores = [];

    n1 = parseInt(Math.random() * 9 + 1);

    for (var i = 1; i <= n1; i++) {
        if (n1 % i === 0) {
            divisores.push(i);
        }
    }

    let pos = parseInt(Math.random() * (divisores.length));

    n2 = divisores[pos];
    num1.innerHTML = n1;
    num2.innerHTML = n2;
    respuesta_usuario.focus();
}


function corregir() { //corregir la respuesta del usuario
    if (respuesta_usuario.value == "") {
        return;
    }

    let solucion;
    let operacion = n1 + operacion_actual + n2;
    solucion = eval(operacion);

    let i = document.createElement("i");
    if (respuesta_usuario.value == solucion) {
        i.className = "fa-regular fa-face-grin";
    } else {
        i.className = "fa-regular fa-face-frown";
    }

    msj_correccion.appendChild(i);

    
    if (operacion_actual == "+") { // Generar nueva operación según la operación actual
        nuevaSuma();
    } else if (operacion_actual == "-") {
        nuevaResta();
    } else if (operacion_actual == "*") {
        nuevoProducto();
    } else if (operacion_actual == "/") {
        nuevaDivision();
    }

    respuesta_usuario.value = "";
}

// Event Listener para corregir al presionar Enter
respuesta_usuario.onkeydown = function(e) {
    let ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        corregir();
    }
}


function activarBoton(idBoton) {//activar el botón correspondiente
    document.getElementById("suma").className = "";
    document.getElementById("resta").className = "";
    document.getElementById("producto").className = "";
    document.getElementById("division").className = "";
    document.getElementById(idBoton).className = "activado";
}
