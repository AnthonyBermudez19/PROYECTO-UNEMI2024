// Elementos del DOM
const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;


const bodyParts = [// Partes del cuerpo del ahorcado
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];


let selectedWord;// Variables del juego
let usedLetters;
let mistakes;
let hits;


const addLetter = letter => {//agregar una letra usada al DOM
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}


const addBodyPart = bodyPart => {//agregar una parte del cuerpo al ahorcado en el canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};


const wrongLetter = () => {//manejar una letra incorrecta
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame();
}


const endGame = () => {//manejar el fin del juego
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}


const correctLetter = letter => {//manejar una letra correcta
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame();
}


const letterInput = letter => {// manejar la entrada de letras
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};


const letterEvent = event => {// Función para manejar el evento de teclado
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};


const drawWord = () => {// Función para dibujar la palabra oculta en el DOM
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};


const selectRandomWord = () => {//seleccionar una palabra aleatoria
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};


const drawHangMan = () => {//dibujar el ahorcado en el canvas
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};


const startGame = () => {//iniciar el juego
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

//para el botón de inicio del juego
startButton.addEventListener('click', startGame);
