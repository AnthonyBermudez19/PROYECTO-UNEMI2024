// Declaración de variables para los elementos del DOM
let num1, num2, respuesta;
txt_suma = document.getElementById("suma");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");

// Función que inicia el juego
function comenzar(){
    // Reinicia los elementos del juego
    txt_resultado.innerHTML = "?";
    txt_msj.innerHTML = "";

    // Genera dos números aleatorios y calcula la respuesta
    num1 = Math.round(Math.random()*9);
    num2 = Math.round(Math.random()*9);
    respuesta = num1 + num2;

    // Muestra la operación en la interfaz
    suma.innerHTML = num1 + " + " + num2 + " = ";

    // Elige aleatoriamente la posición de la respuesta correcta
    indiceOpCorrecta = Math.round(Math.random()*2);
    console.log(indiceOpCorrecta);

    // Asigna valores a las opciones en función de la respuesta correcta
    if(indiceOpCorrecta == 0){
        op1.innerHTML = respuesta;
        op2.innerHTML = respuesta + 1;
        op3.innerHTML = respuesta - 1;
    }
    if(indiceOpCorrecta == 1){
        op1.innerHTML = respuesta - 1;
        op2.innerHTML = respuesta;
        op3.innerHTML = respuesta - 2;
    }
    if(indiceOpCorrecta == 2){
        op1.innerHTML = respuesta + 2;
        op2.innerHTML = respuesta + 3;
        op3.innerHTML = respuesta;
    }
}

// Función que controla la respuesta seleccionada por el usuario
function controlarRespuesta(opcionElegida){    
    // Muestra la respuesta seleccionada por el usuario
    txt_resultado.innerHTML = opcionElegida.innerHTML;

    // Compara la respuesta seleccionada con la respuesta correcta
    if(respuesta == opcionElegida.innerHTML){
        // Mensaje de acierto si es correcta y reinicia el juego
        txt_msj.innerHTML = "EXCELENTE!!";
        txt_msj.style.color="green";
        setTimeout(comenzar, 2000);
    } else {
        // Mensaje de error si es incorrecta y limpia la interfaz
        txt_msj.innerHTML = "INTENTA DE NUEVO!!";
        txt_msj.style.color="red";
        setTimeout(limpiar, 2000);
    }
}

// Función que limpia la interfaz después de un tiempo
function limpiar(){
    txt_resultado.innerHTML = "?";
    txt_msj.innerHTML = "";
}

// Inicia el juego al cargar la página
comenzar();
