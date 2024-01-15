// Variable para controlar si la suma es correcta
let sumaCorrecta = false;

// Variables para el seguimiento del nivel actual y el máximo nivel
let currentLevel = 1;
const maxLevel = 5;

// Contadores de respuestas correctas e incorrectas
let correctAnswers = 0;
let incorrectAnswers = 0;

//generar un número aleatorio en un rango dado
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//obtener una base aleatoria
function getRandomBase() {
  const bases = [2, 8, 10, 16];
  const randomIndex = Math.floor(Math.random() * bases.length);
  return bases[randomIndex];
}

//generar un nivel aleatorio
function generateRandomLevel() {
  // Obtiene una base aleatoria y un número aleatorio
  const base = getRandomBase();
  const number = getRandomNumber(1, 23);

  // Convierte el número a la base correspondiente
  const convertedNumber = parseInt(number.toString(), 10).toString(base);

  // Muestra la información en la interfaz
  document.getElementById("base").innerHTML = `Base ${base}`;
  document.getElementById("operacion").innerHTML = `(${number}) =`;
  document.getElementById("resultado").innerHTML = convertedNumber;
  document.getElementById("resultado").classList.remove("correct");

  // Posición de la respuesta correcta en las opciones
  const correctAnswerPosition = Math.floor(Math.random() * 3) + 1;
  document.getElementById(`op${correctAnswerPosition}`).innerHTML = convertedNumber;

  // Rellena las opciones restantes con valores incorrectos
  for (let i = 1; i <= 3; i++) {
    if (i !== correctAnswerPosition) {
      document.getElementById(`op${i}`).innerHTML = parseInt(getRandomNumber(1, 23)).toString(getRandomBase());
    }
  }

  // Reinicia la variable para la suma correcta y el mensaje
  sumaCorrecta = false;
  document.getElementById("msj").innerHTML = "";
}

//controlar la respuesta seleccionada
function controlarRespuesta(elemento) {
  // Si la suma ya es correcta, no hace nada
  if (sumaCorrecta) return;

  // Obtiene la opción seleccionada y la respuesta correcta
  let opcionSeleccionada = elemento.innerHTML;
  let resultado = document.getElementById("resultado").innerHTML;

  // Compara la opción seleccionada con la respuesta correcta
  if (opcionSeleccionada === resultado) {
    // Muestra mensaje de correcto y actualiza contadores
    document.getElementById("msj").innerHTML = "¡Correcto! Ganaste.";
    document.getElementById("msj").style.color = "green";
    sumaCorrecta = true;
    correctAnswers++;
    document.getElementById("resultado").classList.add("correct");

    // Si hay más niveles, avanza al siguiente nivel
    if (currentLevel < maxLevel) {
      setTimeout(() => {
        currentLevel++;
        generateRandomLevel();
      }, 1000);
    } else {
      // Si no hay más niveles, muestra los resultados finales
      setTimeout(() => {
        mostrarResultados();
      }, 1000);
    }
  } else {
    // Si la respuesta es incorrecta, muestra mensaje y resalta las opciones incorrectas
    document.getElementById("msj").innerHTML = `Incorrecto. La respuesta correcta es ${resultado}. Intenta de nuevo.`;
    document.getElementById("msj").style.color = "red";
    document.getElementById("op1").classList.remove("correct");
    document.getElementById("op2").classList.remove("correct");
    document.getElementById("op3").classList.remove("correct");
    document.getElementById("op1").classList.add("incorrect");
    document.getElementById("op2").classList.add("incorrect");
    document.getElementById("op3").classList.add("incorrect");
    incorrectAnswers++;
  }
}

//saltar al siguiente nivel
function saltarNivel() {
  
  if (currentLevel < maxLevel) { // Si hay más niveles, avanza al siguiente nivel
    currentLevel++;
    generateRandomLevel();
    document.getElementById("msj").innerHTML = "Nivel Saltado!";
    document.getElementById("msj").style.color = "blue";
    document.getElementById("op1").classList.remove("incorrect");
    document.getElementById("op2").classList.remove("incorrect");
    document.getElementById("op3").classList.remove("incorrect");
    setTimeout(() => {
      document.getElementById("msj").innerHTML = "";
    }, 1000);
  } else {
    // Si no hay más niveles, muestra los resultados finales
    document.getElementById("msj").innerHTML = "No hay más niveles para saltar.";
    document.getElementById("msj").style.color = "orange";
    document.getElementById("op1").classList.remove("incorrect");
    document.getElementById("op2").classList.remove("incorrect");
    document.getElementById("op3").classList.remove("incorrect");
    setTimeout(() => {
      mostrarResultados();
    }, 1000);
  }
}


function limpiar() { //limpiar la interfaz
  document.getElementById("resultado").innerHTML = "?";
  document.getElementById("msj").innerHTML = "";
  document.getElementById("op1").classList.remove("correct", "incorrect");
  document.getElementById("op2").classList.remove("correct", "incorrect");
  document.getElementById("op3").classList.remove("correct", "incorrect");
}


function comenzar() { //comenzar el juego
  generateRandomLevel();
}


function mostrarResultados() { //mostrar los resultados finales
  document.getElementById("msj").innerHTML = `¡Felicidades! Has completado todos los niveles. Respuestas correctas: ${correctAnswers}, Respuestas incorrectas: ${incorrectAnswers}`;
  document.getElementById("msj").style.color = "black";
}

// Evento que se ejecuta al cargar la página
window.onload = comenzar;
