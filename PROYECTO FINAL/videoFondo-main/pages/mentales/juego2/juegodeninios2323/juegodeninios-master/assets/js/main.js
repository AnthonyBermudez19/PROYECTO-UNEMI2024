// Arreglos de nombres de animales y colores asociados
let animals = ["elephant", "frog", "pig", "teddy", "whale"];
let colors = ["#c3c3c3", "#0ed145", "#feaec7", "#b97b56", "#00a8f3"];


let counter = 0; // Contador para el seguimiento de la posición actual del juego

let contentColors = ""; // Variables para manipular el contenido dinámico
let contentCards = "";

let position = [0, 1, 2, 3, 4]; // Arreglo que define la posición original de las cartas

// Variables para el control de la posición de las cartas y el estado del juego
let lastCard = 0;
let cardRow = 0;
let lastCardRow = 0;
let win = [];


function delayBeforeOtherAnimal(pause) { //agregar un retraso antes de mostrar el siguiente animal
    setTimeout(() => {
        // Pausar el sonido actual y mostrar el siguiente animal
        document.getElementById("animalSound").pause();
        showAnimal();
    }, pause);
}

//mostrar un animal en la interfaz
function showAnimal() {
    // Barajar la posición de las cartas
    position.sort(function(a, b) { return 0.5 - Math.random() });

    // Verificar si se han mostrado todos los animales
    if (counter == animals.length) {
        window.location.href = "memory.html"; // Redirigir a otra página al completar el juego
    }

    // Mostrar la imagen del animal actual y generar los botones de colores
    document.getElementById("animalIMG").src = "assets/img/" + animals[counter] + "/white.png";
    position.forEach(function(item, index) {
        contentColors += '<div id="' + item + '" class="colorButton" style="background: ' + colors[item] + ';" onclick="selectColor(' + item + ')" ></div>';
    })
    document.getElementById("containerColorButtons").innerHTML = contentColors;
}

//manejar la selección de un color
function selectColor(num) {
    // Establecer el sonido del animal correspondiente y reproducirlo
    document.getElementById("animalSound").src = "assets/sound/" + animals[num] + ".mp3";
    document.getElementById("animalSound").play();

    // Verificar si la selección del color es correcta
    if (counter == num) {
        // Mostrar la imagen de confirmación, limpiar el contenido de los colores y actualizar el contador
        document.getElementById("animalIMG").src = "assets/img/" + animals[counter] + "/ok.png";
        contentColors = "";
        counter++;

        // Esperar antes de mostrar el siguiente animal
        delayBeforeOtherAnimal(2000);
    }
}

