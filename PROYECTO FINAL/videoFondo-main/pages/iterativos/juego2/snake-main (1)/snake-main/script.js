// Obtener elementos del DOM
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Tamaño del tablero y velocidad del juego
const boardSize = 10;
const gameSpeed = 200;

// Tipos de cuadrados en el tablero
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

// Direcciones posibles del movimiento de la serpiente
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};

// Variables del juego
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

// Dibuja la serpiente en el tablero
const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

// Dibuja un cuadrado en el tablero con el tipo dado
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    // Actualiza la lista de cuadrados vacíos
    if (type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}

// Mueve la serpiente en la dirección actual
const moveSnake = () => {
    // Calcula la nueva posición de la cabeza de la serpiente
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');

    // Verifica si la serpiente ha chocado con las paredes o con ella misma
    if (
        newSquare < 0 ||
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9) ||
        boardSquares[row][column] === squareTypes.snakeSquare
    ) {
        gameOver(); // Termina el juego si se cumple alguna de las condiciones
    } else {
        snake.push(newSquare); // Añade la nueva posición a la serpiente

        // Si la serpiente come la comida, añade puntos y crea nueva comida
        if (boardSquares[row][column] === squareTypes.foodSquare) {
            addFood();
        } else {
            const emptySquare = snake.shift(); // Elimina la cola de la serpiente
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake(); // Dibuja la serpiente en su nueva posición
    }
}

// Añade comida al tablero y actualiza el puntaje
const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}

// Muestra la pantalla de fin de juego
const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}

// Establece la dirección de la serpiente según la tecla presionada
const setDirection = newDirection => {
    direction = newDirection;
}

// Maneja los eventos de teclado para cambiar la dirección de la serpiente
const directionEvent = key => {
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code);
            break;
    }
}

// Crea comida en una posición aleatoria del tablero
const createRandomFood = () => {
    const randomEmptySquare =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

// Actualiza el puntaje en el marcador
const updateScore = () => {
    scoreBoard.innerText = score;
}

// Crea el tablero y llena la lista de cuadrados vacíos
const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
}

// Inicializa las variables del juego y crea el tablero
const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(
        Array(boardSize),
        () => new Array(boardSize).fill(squareTypes.emptySquare)
    );
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

// Inicia el juego cuando se presiona el botón de inicio
const startGame = () => {
    setGame();
    gameOverSign.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval(() => moveSnake(), gameSpeed);
}

// Agrega un evento de clic al botón de inicio para comenzar el juego
startButton.addEventListener('click', startGame);
