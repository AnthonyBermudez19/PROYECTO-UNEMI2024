// Elementos del DOM
const seccionBatalla = document.getElementById('campo-batalla');
const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijeras = document.getElementById('btn-tijeras');

// Variables para almacenar la opción del jugador y de la PC, así como las imágenes
let opcionJugador;
let opcionPc;
let imgJugador;
let imgPc;

// Array de objetos con nombres y URLs de imágenes
const imagenes = [
    {
        name: "Piedra",
        url: "assets/Piedra.PNG" 
    },
    {
        name: "Papel",
        url: "assets/Papel.PNG" 
    },
    {
        name: "Tijeras",
        url: "assets/Tijeras.PNG" 
    }
];

// Función para ocultar la sección de batalla al inicio
function iniciar(){
    seccionBatalla.style.display = 'none';
};

// Event Listeners para los botones de elección del jugador
btnPiedra.addEventListener('click', function(){
    opcionJugador = "Piedra";
    opPc();
});

btnPapel.addEventListener('click', function(){
    opcionJugador = "Papel";
    opPc();
});

btnTijeras.addEventListener('click', function(){
    opcionJugador = "Tijeras";
    opPc();
})


function opPc(){// Función para determinar la elección de la PC
    let aleatorio = nAleatorio();

    if(aleatorio == 0){
        opcionPc = "Piedra";
    }else if(aleatorio == 1){
        opcionPc = "Papel";
    }else if(aleatorio == 2){
        opcionPc = "Tijeras"
    };

    batalla();
};


function batalla(){//resolver la batalla y mostrar el resultado
    if(opcionJugador == opcionPc){
        msjBatalla.innerHTML = "Empate";
    }else if(opcionJugador == "Piedra" && opcionPc == "Tijeras"){
        msjBatalla.innerHTML = "Ganaste!";
    }else if(opcionJugador == "Papel" && opcionPc == "Piedra"){
        msjBatalla.innerHTML = "Ganaste!";
    }else if(opcionJugador == "Tijeras" && opcionPc == "Papel"){
        msjBatalla.innerHTML = "Ganaste!";
    }else{
        msjBatalla.innerHTML = "Perdiste :(";
    };

    // Agrega las imágenes correspondientes al resultado
    addImagenes();
}

//generar un número aleatorio entre 0 y 2
function nAleatorio(){
    return Math.floor(Math.random() * 3);
}

//agregar las imágenes al DOM
function addImagenes(){
    for(let i=0;i<imagenes.length;i++){
        if(opcionJugador == imagenes[i].name){
            imgJugador = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgJugador} alt="">`;
            imgAtaqueJugador.innerHTML = inserta;
        };
        
        if(opcionPc == imagenes[i].name){
            imgPc = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgPc} alt="">`;
            imgAtaquePc.innerHTML = inserta;
        };
    };

    // Muestra la sección de batalla
    seccionBatalla.style.display = 'flex';
};

// cargar la función de inicio al cargar la página
window.addEventListener('load', iniciar);
