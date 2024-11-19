
var inputs = document.querySelectorAll(".selector-input");

inputs.forEach((input, index) => {
  let timer;

  // Escucha el evento "input" para cada campo de entrada
  input.addEventListener("input", () => {
    clearTimeout(timer); // Limpiar el temporizador para evitar derivación inmediata
    var valor = input.value; // Obtiene el valor ingresado en tiempo real
    var outputElement = document.getElementById("part_" + (index + 1));

    timer = setTimeout(() => {
      // Expresión regular para capturar bases y exponentes, incluyendo fracciones en paréntesis
      var regex = /(\((?:[^()]+)\)|[a-zA-Z0-9]+)\^\(([^)]+)\)|(\((?:[^()]+)\)|[a-zA-Z0-9]+)\^(-?\d+)/g;
      var expresionConExponentes = valor; // Almacena la expresión final
      var resultado;

      // Procesar todos los términos que coincidan con la expresión regular
      while ((resultado = regex.exec(valor)) !== null) {
        var base = resultado[1] || resultado[3]; // La parte antes de ^
        var exponente = resultado[2] || resultado[4]; // El exponente después de ^

        // Si el exponente tiene una fracción dentro de paréntesis, formatearlo como fracción
        if (exponente && exponente.includes('/')) {
          var [numerador, denominador] = exponente.split('/');
          var expresionConExponente = base + "<sup>" + numerador + "</sup>&frasl;<sub>" + denominador + "</sub>";
        } else {
          // Si no es fracción, formatearlo como exponente normal
          var expresionConExponente = base + "<sup>" + exponente + "</sup>";
        }

        expresionConExponentes = expresionConExponentes.replace(resultado[0], expresionConExponente);
      }

      // Reemplazar * por un punto (&middot;) para la multiplicación
      expresionConExponentes = expresionConExponentes.replace(/\*/g, ' &middot; ');

      // Mostrar la expresión formateada en el div correspondiente
      outputElement.innerHTML = expresionConExponentes;
      console.log("Expresión con exponentes:", expresionConExponentes);

      // Retrasar la derivada solo si la expresión es válida
      try {
        // Derivar utilizando math.js
        const derivativex = math.derivative(valor, 'x').toString();
        const derivativey = math.derivative(valor, 'y').toString();
        const derivativez = math.derivative(valor, 'z').toString();
        const derivativeconditionx = math.derivative(valor, 'x').toString();
        const derivativeconditiony = math.derivative(valor, 'y').toString();
        const derivativeconditionz = math.derivative(valor, 'z').toString();

        // Función personalizada para aplicar formato de exponente y fracciones en las derivadas
        function formatExponents(expression) {
          // Reemplazar exponentes: (x^(n/m)) por (x<sup>n</sup>&frasl;<sub>m</sub>)
          return expression
            .replace(/([a-zA-Z0-9()]+)\^\((\d+\/\d+)\)/g, (match, base, exp) => {
              var [num, denom] = exp.split('/');
              return base + "<sup>" + num + "</sup>&frasl;<sub>" + denom + "</sub>";
            })
            .replace(/([a-zA-Z0-9()]+)\^\(-?(\d+)\)/g, '$1<sup>-$2</sup>') // Exponentes negativos
            .replace(/([a-zA-Z0-9()]+)\^(\d+)/g, '$1<sup>$2</sup>') // Exponentes positivos
            .replace(/\*/g, ' &middot; '); // Reemplaza * por punto para multiplicación
        }

        // Aplicar la función de formato a las derivadas
        const formattedDerivativex = formatExponents(derivativex);
        const formattedDerivativey = formatExponents(derivativey);
        const formattedDerivativez = formatExponents(derivativez);
        const formattedDerivativeConditionx = formatExponents(derivativeconditionx);
        const formattedDerivativeConditiony = formatExponents(derivativeconditiony);
        const formattedDerivativeConditionz = formatExponents(derivativeconditionz);

        // Mostrar las derivadas en los elementos correspondientes
        switch (index) {
          case 0:
            document.getElementById("parcialDerivateX").innerHTML = formattedDerivativex;
            document.getElementById("parcialDerivateY").innerHTML = formattedDerivativey;
            document.getElementById("parcialDerivateZ").innerHTML = formattedDerivativez;
            break;
          case 1:
            document.getElementById("parcialDerivateConditionX").innerHTML = formattedDerivativeConditionx + " (λ)";
            document.getElementById("parcialDerivateConditionY").innerHTML = formattedDerivativeConditiony + " (λ)";
            document.getElementById("parcialDerivateConditionZ").innerHTML = formattedDerivativeConditionz + " (λ)";

            break;
        
          default:
            console.log("No se manejan más tarjetas.");
            break;
        }

    
        
      } catch (error) {
        console.log("Expresión inválida o incompleta: ", error);
        // Podrías mostrar un mensaje de error en lugar de la derivada si lo prefieres
      }

    }, 1000); // Espera de 1000ms antes de ejecutar la derivación y visualización
  });
});
// Función que se ejecuta al dar clic en el botón


document.getElementById("obtenerValores").addEventListener("click", function() {



  // Recoger valores de las derivadas y la igualdad desde los elementos correspondientes
  const derivadaX = document.getElementById("parcialDerivateX").innerHTML;
  const derivadaY = document.getElementById("parcialDerivateY").innerHTML;
  const derivadaZ = document.getElementById("parcialDerivateZ").innerHTML;
  const derivadaCondX = document.getElementById("parcialDerivateConditionX").innerHTML;
  const derivadaCondY = document.getElementById("parcialDerivateConditionY").innerHTML;
  const derivadaCondZ = document.getElementById("parcialDerivateConditionZ").innerHTML;



  //
  const derivateXif = document.querySelector('#derivateX').value.length== 0;
  const derivateConditionXif = document.querySelector('#derivateConditionX').value.length== 0 ;
  const ecuacionY2 = document.getElementById("part_2").innerHTML;
  const equal = document.getElementById("part_3").innerHTML;

  // Mostrar los valores en la consola o utilizarlos como desees
  console.log("Derivada parcial con respecto a X:", derivadaX);
  console.log("Derivada parcial con respecto a Y:", derivadaY);
  console.log("Derivada parcial con respecto a Z:", derivadaZ);
  console.log("Condición de derivada con respecto a X (con λ):", derivadaCondX);
  console.log("Condición de derivada con respecto a Y (con λ):", derivadaCondY);
  console.log("Condición de derivada con respecto a Z (con λ):", derivadaCondZ);
  if (derivateXif &&  derivateConditionXif ) {
    
Swal.fire("Calm man, complete the information!");
    return false;
  }else{
    Swal.fire("You are a machine, a BBC!");
  document.getElementById("showDerivatesEcuationx").innerHTML = "Ecuation x:" + " " + derivadaX + "=" + derivadaCondX;
  document.getElementById("showDerivatesEcuationy").innerHTML ="Ecuation y:" + " " + derivadaY + "=" + derivadaCondY;
document.getElementById("showDerivatesEcuationz").innerHTML = "Ecuation z:" + " " + derivadaZ + "=" + derivadaCondZ;
document.getElementById("showEcuation").innerHTML = ecuacionY2 + "=" + equal;


}



 
});
var ggbApp;

        function initGeoGebra() {
            console.log("Initializing GeoGebra");
            ggbApp = new GGBApplet({
                "appName": "3d",
          
                "showToolBar": true,
                "showAlgebraInput": true,
                "showMenuBar": true,
                "useBrowserForJS": true,
            }, true);
            ggbApp.inject('ggb-element'); // Agrego GeoGebra en el div
        }

        function ggbOnInit() {
            console.log("GeoGebra initialized");

            document.getElementById("obtenerValores").addEventListener("click", function() {
                console.log("Click event triggered");

                const ecuacionX1 = document.getElementById("part_1").innerHTML;
                const ecuacionY2 = document.getElementById("part_2").innerHTML;
                const equal = document.getElementById("part_3").innerHTML;

                

                /*if (window.ggbApplet && window.ggbApplet.evalCommand) {
                    console.log("Enviando comandos a GeoGebra");

                    // Eliminar gráficos anteriores si existen
                    ['f', 'g', 'h', 'i', 'j', 'k'].forEach((name) => {
                        if (window.ggbApplet.exists(name)) {
                            window.ggbApplet.evalCommand(`Delete[${name}]`);
                        }
                    });

                    if (ecuacionX1 && ecuacionY2) {
                        window.ggbApplet.evalCommand(`h: ${ecuacionX1}`);
                        window.ggbApplet.evalCommand(`i: ${ecuacionY2} = ${equal} `);
                    }  else {
                        console.log("No se tienen suficientes datos para graficar.");
                    }
                } else {
                    console.error("GeoGebra no está listo para recibir comandos");
                }*/

  
            });
        }

        window.addEventListener("load", initGeoGebra);

        

/*
const expr = '2n*x^2 / 3x^2';
  const simplifiedExpr = math.simplify(expr);

  console.log(simplifiedExpr.toString());  // Output: 1
//
//
//

function moveToLeftAndSimplify(equation) {
  // Dividir la ecuación en los lados izquierdo y derecho usando el signo de igualdad
  const [left, right] = equation.split('=');

  // Mover el lado derecho restándolo del lado izquierdo
  const newEquation = `${left} - (${right})`;

  // Simplificar la nueva ecuación
  const simplifiedExpr = math.simplify(newEquation);

  return simplifiedExpr.toString() + ' = 0';
}

// Función para resolver la ecuación
function solveEquation(expr) {
  // Extraer el término de la izquierda y el de la derecha
  const [left, right] = expr.split(' = ');

  // Dividir la parte izquierda (que representa la variable) por el valor de la derecha
  const leftTerms = left.replace(' - ', ' ').split(' ');
  const variableTerm = leftTerms.find(term => term.includes('x'));

  if (variableTerm) {
    // Determinar el coeficiente de la variable
    const coefficient = parseFloat(variableTerm.slice(0, -2)) || 1; // Suponiendo 'x^2' como el término

    // Calcular el valor de n basándonos en la ecuación original
    const nValue = parseFloat(right) / coefficient; // Cambiado para reflejar la división correcta
    return { n: nValue };
  }

  return { n: null };
}

// Definir las variables x y n
const x = 'x';
const n = 'n';

// Definir la ecuación usando las variables
const expr1 = `${x}^2 = 3 * x^2${n}`; // Ejemplo: x^2 = 3*n

// Simplificar la ecuación para que quede igualada a 0
const result = moveToLeftAndSimplify(expr1);

// Mostrar la ecuación simplificada
console.log("Ecuación simplificada:", result);  // Output esperado: '-x^2 + 3*n = 0'

// Resolver la ecuación
const solution = solveEquation(result);

// Mostrar el valor de n
console.log(`Valor de n: ${solution.n}`);
//
//
//


// Función para simplificar la ecuación y resolver para n
function solveForN(equation) {
  // Dividir la ecuación en lados izquierdo y derecho usando el signo de igualdad
  const [left, right] = equation.split('=').map(part => part.trim());

  // Verificar si el lado derecho contiene 'n'
  if (right.includes('n')) {
      // Simplificar la parte izquierda
      const simplifiedLeft = math.simplify(left).toString();

      // Verificar si el lado izquierdo tiene un coeficiente común en ambos lados
      const coefficientMatch = right.match(/(\d+)?\s*\*\s*n/); // Captura coeficiente si existe
      const coefficient = coefficientMatch ? (parseFloat(coefficientMatch[1]) || 1) : 1;

      // Dividir la parte izquierda por el coeficiente para obtener n
      const nValue = math.simplify(`${simplifiedLeft} / ${coefficient}`).toString();
      
      // Devolver la expresión de n simplificada
      return `n = ${nValue}`;
  } else if (left.includes('n')) {
      // Si 'n' está en el lado izquierdo, moverlo al derecho
      const newLeft = left.replace(/(n\s*\*\s*)/g, ''); // Eliminar n de la izquierda
      return `${newLeft} = ${right} / (1)`; // Mantener igual al lado derecho
  }

  return null; // Retornar null si no hay n en la ecuación
}

// Definir la ecuación
const equation = '3*x^3 = 3*n';

// Resolver la ecuación para n
const result1 = solveForN(equation);

// Mostrar el resultado
console.log(result1);  // Output esperado: "n = x^2"


*/


/*var inputs = document.querySelectorAll(".selector-input");

inputs.forEach((input, index) => {
  // Escucha el evento "input" para cada campo de entrada
  input.addEventListener("input", () => {
    var valor = input.value; // Actualiza el valor en tiempo real
    var outputElement = document.getElementById("part_" + (index + 1));

    // Expresión regular que busca términos con exponentes
    var regex = /([a-zA-Z0-9]+)\^([0-9]+)/g; // Captura base y exponente
    var resultado;
    var expresionConExponentes = valor; // Variable para almacenar la expresión final

    // Procesar todos los términos que coincidan con la expresión regular
    while ((resultado = regex.exec(valor)) !== null) {
      var base = resultado[1];      // La parte antes de ^
      var exponente = resultado[2]; // El exponente después de ^
      var expresionConExponente = base + "<sup>" + exponente + "</sup>";

      // Reemplazar el término original en la expresión por el formato con exponente
      expresionConExponentes = expresionConExponentes.replace(resultado[0], expresionConExponente);
    }

    // Mostrar la expresión formateada en el div correspondiente
    outputElement.innerHTML = expresionConExponentes;
    console.log("Expresión con exponentes:", expresionConExponentes);

    // Usar switch para manejar diferentes tarjetas según el índice
    switch (index) {
      case 0:
        document.getElementById("parcialDerivateX").innerHTML = expresionConExponentes;
        break;
      case 1:
        document.getElementById("parcialDerivateY").innerHTML = expresionConExponentes;
        break;
      case 2:
        document.getElementById("parcialDerivateZ").innerHTML = expresionConExponentes;
        break;
      default:
        console.log("No se manejan más tarjetas.");
        break;
    }

    if (!resultado) {
      // Si no hay exponentes, solo muestra el valor completo
      outputElement.innerHTML = valor;
      console.log("No se encontró ningún exponente.");
    }
  });
});
*/





/*var inputs = document.querySelectorAll(".selector-input");

  inputs.forEach((input, index) => {
    // Escucha el evento "input" para cada campo de entrada
    input.addEventListener("input", () => {
      var valor = input.value; // Actualiza el valor en tiempo real
      var exponente;  // Variable para almacenar el valor después de ^
      var base;       // Variable para almacenar la parte antes de ^

      // Expresión regular que busca el símbolo ^ seguido de uno o más dígitos
      var regex = /([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/;
      var resultado = valor.match(regex);

      // Selecciona el div correspondiente al resultado usando el índice
      var outputElement = document.getElementById("part_" + (index + 1));

      if (resultado) {
        base = resultado[1];      // La parte antes de ^
        exponente = resultado[2]; // El exponente después de ^
        var expresionConExponente = base + "<sup>" + exponente + "</sup>";

        // Muestra la expresión en el div correspondiente
        outputElement.innerHTML = expresionConExponente;
        console.log("Expresión con exponente:", expresionConExponente);

        //mostrar en tarjetas
        var tarjetaMensaje = ""; // Variable para almacenar el mensaje de la tarjeta

        // Usar switch para manejar diferentes casos de base
        switch (index) {
          case 0:
            document.getElementById("parcialDerivateX").innerHTML = expresionConExponente;
            break;
          case 1:
            document.getElementById("parcialDerivateY").innerHTML = expresionConExponente;
            break;
          case 2:
            document.getElementById("parcialDerivateZ").innerHTML = expresionConExponente;
            break;
          default:
            tarjetaMensaje = "La expresión ingresada es: " + expresionConExponente;
            break;
        }
  
        // Muestra el mensaje de la tarjeta en el elemento correspondiente
        
        
       

  
      } else {
        // Si no hay ^, solo muestra el valor completo
        outputElement.innerHTML = valor;
        console.log("No se encontró ningún exponente.");
      }

    });
  });

*/











/*var input = document.getElementById("function_Enter");
var valor;

// Escucha el evento "input" en lugar del evento de "click"
input.addEventListener("input", () => {
  valor = input.value; // Actualiza el valor en tiempo real

  var exponente;  // Variable para almacenar el valor después de ^
  var base;       // Variable para almacenar la parte antes de ^

  // Expresión regular que busca el símbolo ^ seguido de uno o más dígitos
  var regex = /(.+)\^(\d+)/;  // Captura todo antes de ^ en el primer grupo, y el exponente en el segundo grupo
  var resultado = valor.match(regex);

  if (resultado) {
    base = resultado[1];      // La parte antes de ^
    exponente = resultado[2]; // El exponente después de ^

    // Construye el string con el exponente en <sup>
    var expresionConExponente = base + "<sup>" + exponente + "</sup>";

    // Muestra la expresión en el HTML
    document.getElementById("partX").innerHTML = expresionConExponente;
    document.getElementById("partY").innerHTML = expresionConExponente;
    console.log("Expresión con exponente:", expresionConExponente);
  } else {
    // Si no hay ^, solo muestra el valor completo
    document.getElementById("partX").innerHTML = valor;
    document.getElementById("partY").innerHTML = valor;
    console.log("No se encontró ningún exponente.");
  }
});


  //if (valor.includes('^')) {
    //simbolo = '^';  // Guarda el símbolo en la variable
    //console.log("Símbolo guardado:", simbolo);


  //} else {
    //console.log("El símbolo '^' no se encuentra en la cadena.");
  //}*/