// Definición de variables globales
let arrayPalabras =["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
let ayudas = [
    "Instrumento Musical",
    "Animal de la selva",
    "Es un color",
    "Nombre de mujer",
    "Hardware de computadora",
    "Es un Pais"
]
let cantPalabrasJugadas = 0;

let intentosRestantes = 5;

let posActual;

let arrayPalabraActual = [];

let cantidadAcertadas = 0;

let divsPalabraActual = [];

let totalQueDebeAcertar;

// Función para cargar una nueva palabra y reiniciar el juego
function cargarNuevaPalabra(){
    cantPalabrasJugadas++;

    // Reinicia el juego después de jugar las 6 palabras
    if(cantPalabrasJugadas>6){
        arrayPalabras =["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
        ayudas = [
            "Instrumento Musical",
            "Animal de la selva",
            "Es un color",
            "Nombre de mujer",
            "Hardware de computadora",
            "Es un Pais"
        ]
    }

    // Selecciona una palabra aleatoria
    posActual = Math.floor(Math.random()*arrayPalabras.length);

    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;

    arrayPalabraActual = palabra.split('');

    // Limpia el contenido del elemento "palabra" y "letrasIngresadas" en el HTML
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    // Crea elementos div para cada letra de la palabra y los agrega al elemento "palabra" en el HTML
    for(i=0;i<palabra.length;i++){
        let divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    // Obtiene todos los elementos con la clase "letra" y los almacena en el array divsPalabraActual
    divsPalabraActual = document.getElementsByClassName("letra");

    // Reinicia el contador de intentos y actualiza el elemento "intentos" en el HTML
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    // Muestra la pista de la palabra actual en el elemento "ayuda" en el HTML
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    // Elimina la palabra actual del conjunto para evitar repeticiones
    arrayPalabras.splice(posActual,1);
    ayudas.splice(posActual,1);
}

// Inicializa el juego cargando la primera palabra
cargarNuevaPalabra();

// Evento de teclado para procesar las letras ingresadas
document.addEventListener("keydown", event => {
    if(isLetter(event.key)){
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split('');
       
        // Verifica si la letra ya ha sido ingresada
        if(letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1){
            let acerto = false;

            // Itera sobre cada letra de la palabra actual
            for(i=0;i<arrayPalabraActual.length;i++){
                // Compara la letra ingresada con cada letra de la palabra actual
                if(arrayPalabraActual[i] == event.key.toUpperCase()){
                    // Si hay coincidencia, actualiza la interfaz y la cantidad de letras acertadas
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }
        
            // Si todas las letras han sido acertadas, resalta la palabra completa
            if(acerto==true){
                if(totalQueDebeAcertar == cantidadAcertadas){
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintar";
                    }
                }
            }else{
                // Si la letra no fue acertada, reduce el contador de intentos y resalta la letra incorrecta
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                if(intentosRestantes<=0){
                    // Si se agotan los intentos, resalta todas las letras de la palabra actual
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintarError";
                    }
                }
            }

            // Actualiza las letras ingresadas en el elemento "letrasIngresadas" en el HTML
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

// verificar si un caracter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
