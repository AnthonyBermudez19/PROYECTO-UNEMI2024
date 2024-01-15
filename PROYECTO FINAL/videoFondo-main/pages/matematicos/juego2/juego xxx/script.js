(function() {
    // Declaración de variables
    let character;
    let currentLevel = 1;
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Objeto con los caracteres disponibles
    const characters = {
        'character1': '🚀',
        'character2': '👩‍🚀',
        'character3': '🚂'
    };

    
    function startGame(selectedCharacter) { //iniciar el juego con el personaje seleccionado
        character = characters[selectedCharacter];
        showMessage('story-text', `¡Bienvenido, ${character}! Te embarcarás en una aventura matemática emocionante.`);
        hideElements(['character-selection']);
        showLevel();
    }

    
    function showLevel() { //mostrar el nivel actual y generar un problema matemático
        hideElements(['next-level-button', 'correct-message', 'incorrect-message']);
        if (currentLevel <= 10) {
            const problem = generateMathProblem();
            showElements(['math-problem', 'answer-input', 'accept-button']);
            showMessage('math-problem', problem);
            showElements(['score-text', 'level-text']);
            updateScoreAndLevel();
        } else {
            endGame();
        }
    }

    
    function generateMathProblem() { // generar un problema matemático aleatorio
        const operand1 = Math.floor(Math.random() * 10) + 1;
        const operand2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        return `${operand1} ${operator} ${operand2} = ?`;
    }

    
    function checkAnswer() { // verificar la respuesta del usuario
        const userInput = document.getElementById('answer-input').value;

        const mathProblem = document.getElementById('math-problem').textContent.replace('=', '').split(' ');
        let result;

        // Calcula la respuesta correcta según el operador del problema
        switch (mathProblem[1]) {
            case '+':
                result = parseInt(mathProblem[0]) + parseInt(mathProblem[2]);
                break;
            case '-':
                result = parseInt(mathProblem[0]) - parseInt(mathProblem[2]);
                break;
            case '*':
                result = parseInt(mathProblem[0]) * parseInt(mathProblem[2]);
                break;
            case '/':
                result = parseInt(mathProblem[0]) / parseInt(mathProblem[2]);
                break;
        }

        // Compara la respuesta del usuario con la respuesta correcta
        if (parseFloat(userInput) === result) {
            score++;
            correctAnswers++;
            showMessage('correct-message', '¡Correcto!');
            showElements(['next-level-button']);
        } else {
            incorrectAnswers++;
            showMessage('incorrect-message', '¡Incorrecto!');
            showElements(['next-level-button']);
        }

        hideElements(['accept-button']);
        updateScoreAndLevel();
    }

    //para finalizar el juego
    function endGame() {
        showMessage('story-text', `¡Felicidades, ${character}! Has completado todas las aventuras matemáticas.`);
        hideElements(['math-problem', 'answer-input', 'accept-button', 'next-level-button', 'correct-message', 'incorrect-message', 'score-text', 'level-text']);
        showSummary();
        showElements(['restart-button']);
    }

    //mostrar un resumen de respuestas correctas e incorrectas
    function showSummary() {
        const summaryText = `Resumen:\nRespuestas correctas: ${correctAnswers}\nRespuestas incorrectas: ${incorrectAnswers}`;
        showMessage('summary-text', summaryText);
        showElements('summary-text');
    }

    //mostrar elementos en la interfaz
    function showElements(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        ids.forEach(id => {
            document.getElementById(id).style.display = 'block';
        });
    }

    //ocultar elementos en la interfaz
    function hideElements(ids) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        ids.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    }

    //mostrar un mensaje en un elemento específico
    function showMessage(id, content = '') {
        const element = document.getElementById(id);
        element.textContent = content;
        showElements(id);
    }

    //actualizar la puntuación y el nivel en la interfaz
    function updateScoreAndLevel() {
        document.getElementById('score-text').textContent = `Puntos: ${score}`;
        document.getElementById('level-text').textContent = `Nivel: ${currentLevel}`;
    }

    // Event Listeners
    document.getElementById('character1').addEventListener('click', () => startGame('character1'));
    document.getElementById('character2').addEventListener('click', () => startGame('character2'));
    document.getElementById('character3').addEventListener('click', () => startGame('character3'));
    document.getElementById('accept-button').addEventListener('click', checkAnswer);
    document.getElementById('next-level-button').addEventListener('click', () => {
        currentLevel++;
        showLevel();
    });
    document.getElementById('restart-button').addEventListener('click', () => location.reload());
})();
