// Clase Display que maneja la interfaz de la calculadora
class Display {
    constructor(displayValorAnterior, displayValorActual) {
        // Elementos del DOM para mostrar los valores anterior y actual
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;

        // Instancia de la calculadora
        this.calculador = new Calculadora();

        // Tipo de operación actual
        this.tipoOperacion = undefined;

        // Valores actual y anterior
        this.valorActual = '';
        this.valorAnterior = '';

        // Signos de operaciones
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-',
        }
    }

    //borrar un dígito del valor actual
    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    //borrar todos los valores
    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    //realizar operaciones matemáticas
    computar(tipo) {
        // Si no se ha presionado el botón igual, realiza la operación actual
        this.tipoOperacion !== 'igual' && this.calcular();

        // Actualiza el tipo de operación y los valores
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';

        // Muestra los valores en la interfaz
        this.imprimirValores();
    }

    //agregar números o el punto decimal al valor actual
    agregarNumero(numero) {
        // Evita agregar más de un punto decimal
        if (numero === '.' && this.valorActual.includes('.')) return;

        // Concatena el número al valor actual
        this.valorActual = this.valorActual.toString() + numero.toString();

        // Muestra los valores en la interfaz
        this.imprimirValores();
    }

    //mostrar los valores en la interfaz
    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    //realizar la operación matemática
    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        // Si alguno de los valores no es un número, no realiza la operación
        if (isNaN(valorActual) || isNaN(valorAnterior)) return;

        // Realiza la operación y actualiza el valor actual
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}
