// Lista de pares de palabras en inglés y español
const pairs = [
  { english: 'Cat', spanish: 'Gato' },
  { english: 'Dog', spanish: 'Perro' },
  // ... (otras palabras)
  { english: 'Country', spanish: 'Pais' },
  { english: 'Cap', spanish: 'Gorra' },
];

// Número máximo de niveles del juego
const maxLevels = 10;

// Variables de estado del juego
let level = 1;
let sequence = [];
let correctPair = null;
let points = 0;
let incorrectAnswers = 0;
let canClick = false;


function createCard(pair) { //crear una carta (elemento div) con la palabra en inglés
  const card = document.createElement('div');
  card.className = 'card';
  card.innerText = pair.english;
  card.setAttribute('data-english', pair.english);
  card.addEventListener('click', () => handleCardClick(pair.english));
  return card;
}


function handleCardClick(englishWord) { //maneja el clic en una carta
  if (canClick) {
      const isCorrect = englishWord === correctPair.english;

      if (isCorrect) {
          points++;
      } else {
          incorrectAnswers++;
      }

      // Muestra feedback y actualiza puntos
      document.getElementById('feedback').innerText = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
      document.getElementById('points-counter').innerText = `Puntos: ${points}`;

      // Espera 1 segundo y pasa al siguiente nivel o muestra el resumen
      setTimeout(() => {
          document.getElementById('feedback').innerText = '';
          if (level < maxLevels) {
              level++;
              resetGame();
          } else {
              showSummary();
          }
      }, 1000);
  }
}

//mostrar el resumen del juego
function showSummary() {
  const summary = document.getElementById('summary');
  summary.innerText = `Juego terminado. Puntos: ${points}/${maxLevels}. Respuestas incorrectas: ${incorrectAnswers}.`;
  document.getElementById('game-board').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('points-counter').style.display = 'none';
}

//actualizar el juego
function updateGame() {
  const pair = chooseRandomPair();
  correctPair = pair;

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  const questionText = document.getElementById('question-text');
  questionText.innerHTML = level === 1
      ? '<div>¡Bienvenidos al emocionante mundo del inglés!<br>Descubran, jueguen y aprendan juntos mientras se sumergen en desafíos divertidos.<br>¡A disfrutar y a brillar con entusiasmo! 🌟🚀</div>'
      : `Traduce la palabra al inglés: "${pair.spanish}"`;

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  if (level === 1) {
      document.getElementById('next-btn').style.display = 'block';
  } else {
      const shuffledOptions = shuffleOptions([pair.english, ...getRandomEnglishWords(pair.english)]);
      shuffledOptions.forEach((option) => {
          const optionButton = document.createElement('button');
          optionButton.className = 'option';
          optionButton.innerText = option;
          optionButton.addEventListener('click', () => handleCardClick(option));
          optionsContainer.appendChild(optionButton);
      });
  }

  gameBoard.appendChild(optionsContainer);
}

//reiniciar el juego
function resetGame() {
  canClick = true;
  document.getElementById('next-btn').style.display = 'none';
  updateGame();
}

//iniciar el juego
function startGame() {
  points = 0;
  incorrectAnswers = 0;
  level = 1;
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('game-board').style.display = 'grid';
  document.getElementById('points-counter').style.display = 'block';
  document.getElementById('next-btn').style.display = 'none';
  updateGame();
}

//pasar al siguiente nivel
function nextLevel() {
  level++;
  resetGame();
}

//elegir aleatoriamente un par de palabras de la lista
function chooseRandomPair() {
  const randomIndex = Math.floor(Math.random() * pairs.length);
  return pairs[randomIndex];
}

//obtener palabras en inglés aleatorias, excluyendo la palabra especificada
function getRandomEnglishWords(excludeWord) {
  const allEnglishWords = pairs.map(pair => pair.english);
  const filteredWords = allEnglishWords.filter(word => word !== excludeWord);
  const randomWords = [];

  for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      randomWords.push(filteredWords[randomIndex]);
      filteredWords.splice(randomIndex, 1);
  }

  return randomWords;
}

//barajar opciones
function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

//inicializar el juego
function initGame() {
  document.getElementById('game-board').style.display = 'none';
  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('points-counter').style.display = 'none';
}

// Inicializa el juego al cargar la página
initGame();
