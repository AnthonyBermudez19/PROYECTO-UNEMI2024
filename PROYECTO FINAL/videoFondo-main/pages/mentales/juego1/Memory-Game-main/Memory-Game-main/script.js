// Definición de objetos que almacenan elementos HTML
const selectores = {
    contenedorTablero: document.querySelector('.board-container'),
    tablero: document.querySelector('.board'),
    movimientos: document.querySelector('.moves'),
    temporizador: document.querySelector('.timer'),
    iniciar: document.querySelector('button'),
    ganar: document.querySelector('.win')
}


const estado = { // Estado del juego
    juegoIniciado: false,
    cartasVolteadas: 0,
    totalVolteos: 0,
    tiempoTotal: 0,
    bucle: null
}


const mezclar = array => { //mezclar un array utilizando el algoritmo de Fisher-Yates
    const arrayClonado = [...array]

    for (let i = arrayClonado.length - 1; i > 0; i--) {
        const indiceAleatorio = Math.floor(Math.random() * (i + 1))
        const original = arrayClonado[i]

        arrayClonado[i] = arrayClonado[indiceAleatorio]
        arrayClonado[indiceAleatorio] = original
    }

    return arrayClonado
}


const elegirAleatorio = (array, elementos) => { //elegir aleatoriamente elementos de un array
    const arrayClonado = [...array]
    const seleccionesAleatorias = []

    for (let i = 0; i < elementos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * arrayClonado.length)
        
        seleccionesAleatorias.push(arrayClonado[indiceAleatorio])
        arrayClonado.splice(indiceAleatorio, 1)
    }

    return seleccionesAleatorias
}

//generar el juego
const generarJuego = () => {
    const dimensiones = selectores.tablero.getAttribute('data-dimension')  

    // Verifica si la dimensión del tablero es par
    if (dimensiones % 2 !== 0) {
        throw new Error("La dimensión del tablero debe ser un número par.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'] //emojis
    const selecciones = elegirAleatorio(emojis, (dimensiones * dimensiones) / 2) 
    const elementos = mezclar([...selecciones, ...selecciones])

    // Crea las cartas con emojis y las coloca en el tablero
    const cartas = `
        <div class="board" style="grid-template-columns: repeat(${dimensiones}, auto)">
            ${elementos.map(elemento => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${elemento}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cartas, 'text/html')

    // Reemplaza el contenido del tablero con las cartas generadas
    selectores.tablero.replaceWith(parser.querySelector('.board'))
}

//iniciar el juego
const iniciarJuego = () => {
    estado.juegoIniciado = true
    selectores.iniciar.classList.add('disabled')

    // Inicia el temporizador del juego
    estado.bucle = setInterval(() => {
        estado.tiempoTotal++
        // Actualiza los elementos del DOM con el tiempo y los movimientos
        selectores.movimientos.innerText = `${estado.totalVolteos} movimientos`
        selectores.temporizador.innerText = `Tiempo: ${estado.tiempoTotal} seg`
    }, 1000)
}

//voltear todas las cartas no emparejadas a su posición original
const voltearCartasAtras = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(cart => { 
        cart.classList.remove('flipped')
    })

    estado.cartasVolteadas = 0
}

//manejar el evento de voltear una carta
const voltearCarta = carta => {
    estado.cartasVolteadas++
    estado.totalVolteos++

    // Inicia el temporizador si es la primera vez que se voltea una carta
    if (!estado.juegoIniciado) {
        iniciarJuego()
    }

    // Voltea la carta si no se han volteado más de dos cartas
    if (estado.cartasVolteadas <= 2) {
        carta.classList.add('flipped')
    }

    if (estado.cartasVolteadas === 2) {
        const cartasVolteadas = document.querySelectorAll('.flipped:not(.matched)')

        // Comprueba si las dos cartas volteadas son iguales
        if (cartasVolteadas[0].innerText === cartasVolteadas[1].innerText) {
            // Si son iguales, las marca como emparejadas
            cartasVolteadas[0].classList.add('matched')
            cartasVolteadas[1].classList.add('matched')
        }

        // Voltea las cartas a su posición original después de 1 segundo
        setTimeout(() => {
            voltearCartasAtras()
        }, 1000)
    }

    // Si no hay cartas sin voltear, muestra el mensaje de ganar y detiene el temporizador
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectores.contenedorTablero.classList.add('flipped')
            selectores.ganar.innerHTML = `
                <span class="win-text">
                    ¡Ganaste!<br />
                    con <span class="highlight">${estado.totalVolteos}</span> movimientos<br />
                    en <span class="highlight">${estado.tiempoTotal}</span> segundos
                </span>
            `

            clearInterval(estado.bucle)
        }, 1000)
    }
}

//agregar escuchadores de eventos
const agregarEscuchadoresEventos = () => {
    document.addEventListener('click', evento => {
        const objetivoEvento = evento.target
        const padreEvento = objetivoEvento.parentElement

        // Voltea la carta si se hace clic en ella y no está volteada
        if (objetivoEvento.className.includes('card') && !padreEvento.className.includes('flipped')) {
            voltearCarta(padreEvento)
        } 
        // Inicia el juego si se hace clic en el botón de iniciar y no está deshabilitado
        else if (objetivoEvento.nodeName === 'BUTTON' && !objetivoEvento.className.includes('disabled')) {
            iniciarJuego()
        }
    })
}

// Lógica principal del juego
generarJuego()
agregarEscuchadoresEventos()
