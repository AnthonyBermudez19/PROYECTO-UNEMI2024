// Elementos del DOM
const round = document.getElementById('round');
const simonButtons = document.getElementsByClassName('square');
const startButton = document.getElementById('startButton');
class Simon {
    constructor(simonButtons, startButton, round) {
        // Propiedades del juego
        this.round = 0;
        this.userPosition = 0;
        this.totalRounds = 10;
        this.sequence = [];
        this.speed = 1000;
        this.blockedButtons = true;

        // Elementos del DOM relacionados con el juego
        this.buttons = Array.from(simonButtons);
        this.display = {
            startButton,
            round
        }

        // Sonidos del juego
        this.errorSound = new Audio('./sounds/error.wav');
        this.buttonSounds = [
            new Audio('./sounds/1.mp3'),
            new Audio('./sounds/2.mp3'),
            new Audio('./sounds/3.mp3'),
            new Audio('./sounds/4.mp3'),
        ]
    }

    // Método de inicialización del juego
    init() {
        this.display.startButton.onclick = () => this.startGame();
    }
    startGame() {
        this.display.startButton.disabled = true; // Deshabilitar el botón de inicio durante el juego
        this.updateRound(0);
        this.userPosition = 0;
        this.sequence = this.createSequence();
        this.buttons.forEach((element, i) => {
            element.classList.remove('winner');
            element.onclick = () => this.buttonClick(i);
        });
        this.showSequence();
    }

    
    updateRound(value) {// para actualizar el número de ronda en la interfaz
        this.round = value;
        this.display.round.textContent = `Ronda ${this.round}`;
    }

    
    createSequence() {// para crear una secuencia aleatoria de colores
        return Array.from({length: this.totalRounds}, () =>  this.getRandomColor());
    }

    
    getRandomColor() {// para obtener un color aleatorio
        return Math.floor(Math.random() * 4);
    }

   
    buttonClick(value) { // llamado cuando se hace clic en un botón
        !this.blockedButtons && this.validateChosenColor(value);
    }

    
    validateChosenColor(value) {// para validar el color seleccionado por el usuario
        if(this.sequence[this.userPosition] === value) {
            this.buttonSounds[value].play();
            if(this.round === this.userPosition) {
                this.updateRound(this.round + 1);
                this.speed /= 1.02;
                this.isGameOver();
            } else {
                this.userPosition++;
            }
        } else {
            this.gameLost();
        }
    }

    
    isGameOver() {// para verificar si el juego ha terminado
        if (this.round === this.totalRounds) {
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
        };
    }

    
    showSequence() {//  para mostrar la secuencia de colores
        this.blockedButtons = true;
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];
            this.buttonSounds[this.sequence[sequenceIndex]].play();
            this.toggleButtonStyle(button)
            setTimeout( () => this.toggleButtonStyle(button), this.speed / 2)
            sequenceIndex++;
            if (sequenceIndex > this.round) {
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }

    
    toggleButtonStyle(button) {// para alternar el estilo de un botón
        button.classList.toggle('active');
    }

    
    gameLost() {// llamado cuando el jugador pierde el juego
        this.errorSound.play();
        this.display.startButton.disabled = false; // Habilitar el botón de inicio después de perder
        this.blockedButtons = true;
    }

    
    gameWon() {// llamado cuando el jugador gana el juego
        this.display.startButton.disabled = false; // Habilitar el botón de inicio después de ganar
        this.blockedButtons = true;
        this.buttons.forEach(element =>{
            element.classList.add('winner');
        });
        this.updateRound('🏆');
    }
}

// Crear una instancia de la clase Simon y inicializar el juego
const simon = new Simon(simonButtons, startButton, round);
simon.init();
