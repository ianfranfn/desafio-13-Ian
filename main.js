import './css/estilos-1.css'


let botones = document.querySelectorAll('button')
let display = document.querySelector('#display')
let digitos = ''

botones.forEach(button => { // añade a cada botón el addEventListener por los click
    button.addEventListener('click', () => { // captura los valores de los botones y actualiza el display con los nuevos digitos
        let valor = button.textContent
        textoDisplay(valor)
    })
})

let textoDisplay = (valor) => { // la funcion limita la cantidad de digitos a 13. 
    if (digitos.length < 13) { // El if deja seguir agregando digitos al display hasta que este llegue a 13
        let ultNum = digitos.slice(-1) // se utiliza para obtener el ultimo digito de la cadena.
        if (valor === '.' && digitos.includes('.') && !['+', '-', '/', 'x'].includes(ultNum)) {
            return; // validacion que prohibe agregar un punto si ya hay uno en el display, o si se quiere agregar despues de un operador
          }
        if (['+', '-', '/', 'x'].includes(valor) && ['+', '-', '/', 'x'].includes(ultNum)) { // verifica si el valor es uno de los operadores y comprueba si el ultimo caracter tambien es operador
            digitos = digitos.slice(0, -1) + valor // si es asi, se elimina el ultimo operador ingresado  y se reemplaza por el nuevo.
        } else {
            digitos += valor // si no es asi, se agrega el valor a los digitos normalmente
        }
        display.textContent = digitos
    }
    
}

display.addEventListener('click', () => { // otro evento para el click que elimina los digitos del display al hacer click en este
    digitos = ''
    display.textContent = digitos
})

function calcular(expresion) { // funcion que calcula la expresion matematica
    let num1 = ''
    let operador = ''
    let num2 = ''
    let resultado = 0

    expresion = expresion.replace(/x/g, '*') // ! replace es un metodo de cadena que devuelve una cadena con las coincidencias de un patron reemplazdas por otro valor. En este caso, reemplaza todas las ocurrencias 'x' por el valor '*'.

    for (let i = 0; i < expresion.length; i++) { // recorre cada caracter de la expresion para saber si es un operador o un numero
        let caracter = expresion[i]
        if (['+', '-', '*', '/'].includes(caracter)) { // si el caracter es un operador, se guarda en la variable operador
            operador = caracter
        } else {
            if (operador === '') { // si no es un operador, se guarda en la variable num1
                num1 += caracter
            } else { // si ya se guardo un operador, se guarda en la variable num2
                num2 += caracter
            }
        }
    }

    num1 = parseFloat(num1) // ! parseFloat convierte una cadena de texto a un numero decimal.
    num2 = parseFloat(num2)

    if (operador === '+') { // dependiendo del operador, se realiza la operacion correspondiente
        resultado = num1 + num2
    } else if (operador === '-') {
        resultado = num1 - num2
    } else if (operador === '*') {
        resultado = num1 * num2
    } else if (operador === '/') {
       if (num2 === 0) { // si el segundo numero es 0, se devuelve un error
           return "Error"
       }
       resultado = num1 / num2 // si no es 0, se realiza la division
    }
    return resultado.toString() // ! toString() convierte un numero a una cadena de texto.

}



let calculos = () => {
    try { // try se utiliza para envolver un bloque de codigo que podria lanzar una excepcion (error). si esto ocurre, se salta inmediatamente al bloque catch.
        let resultado = calcular(digitos) // se llama a la funcion calcular
        digitos = resultado.slice(0, 13) // ! slice() extrae una parte de la cadena y devuelve una nueva cadena solo con la cantidad de digitos estipulada (en este caso, solo hasta 13)
        display.textContent = digitos // actualiza los digitos actuales en el display con el resultado de la operacion y limita la cantidad de digitos a 13
    } catch (error) { // catch captura el error lanzado en el bloque try y evita que el programa se detenga abruptamente
        console.log('Error:', error)
        display.textContent = 'Error'
        digitos = ''
    }
}

document.querySelector('#igual').addEventListener('click', calculos) // al presionar el boton '=' se lleva a cabo la funcion de calculos