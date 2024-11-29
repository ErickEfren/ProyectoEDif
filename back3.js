function resolver(){
    var resolver = document.getElementById("resolver");
    resolver.disabled = true;

    var a = parseInt(document.getElementById("second").value);
    var b = parseInt(document.getElementById("first").value);
    var c = parseInt(document.getElementById("zero").value);

    var buttonA = document.getElementById("second");
    var buttonB = document.getElementById("first");
    var buttonC = document.getElementById("zero");

    if (a == 0 || isNaN(a) || isNaN(b) || isNaN(c)){
        alert("No se puede generar una solución");
        resolver.disabled = false;
        return;
    }

    buttonA.disabled = true;
    buttonB.disabled = true;
    buttonC.disabled = true;

    var solucion = document.getElementById("solucion");
    solucion.innerHTML = "<br>La ecuación característica es una ecuación polinómica asociada a una matriz cuadrada, cuyas raíces son los valores propios de la matriz <br>";

    solucion.innerHTML += `Ecuación Característica: <br>
        \\(${(a === 1) ? "m^2" : (a === -1) ? "-m^2" : a + "m^2"} ${(b > 0) ? "+ " : (b === 0) ? "" : "-"} 
        ${(b === 1) ? "m" : (b === -1) ? "m" : (b === 0) ? "" :  Math.abs(b) + "m"} ${(c > 0) ? "+ " : (b === 0) ? "" : "-"} 
        ${(c === 0) ? "" : Math.abs(c)} = 0\\)<br>`;
    MathJax.typeset();
    var next = document.createElement("button");
    next.id = "next";
    next.innerHTML = "Siguiente";
    next.onclick = function(){
        generarRaices(a,b,c);
    };
    solucion.appendChild(next);
}

function simplificarRaiz(discriminante){
    if (discriminante < 0) {
        discriminante *= -1;
    }
    var newDiscriminante = discriminante;
    var constout = 1;
    for (var i = discriminante; i > 0; i--) {
        if (discriminante % i === 0) {
            if(Number.isInteger(Math.sqrt(i))){
                newDiscriminante = discriminante / i;
                constout *= Math.sqrt(i);
                break;
            }
        }
    }
    return [newDiscriminante, constout];
}

function mcd (a, b) {
    if (b == 0) return a;
    return mcd(b, a % b);
}

function generarRaices(a,b,c){
    var solucion = document.getElementById("solucion");
    solucion.innerHTML = "<br>Se calculan las raices de la ecuación característica con la fórmula general <br>";

    solucion.innerHTML += `Fórmula General: <br> \\(\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) <br>`;

    solucion.innerHTML += "Sustituyendo con los valores de la ecuación característica: <br>";
    solucion.innerHTML += `\\(m = \\frac{${-b} \\pm \\sqrt{${b}^2 - 4*${a}*${c}}}{2*${a}}\\) <br>`;

    solucion.innerHTML += "Simplificando: <br>";
    solucion.innerHTML += `\\(m = \\frac{${-b} \\pm \\sqrt{${b*b} - ${4*a*c}}}{${2*a}}\\) <br>`;

    var discriminante = b*b - 4*a*c;

    var imaginary = (discriminante < 0) ? true : false;

    solucion.innerHTML += "Simplificando: <br>";
    solucion.innerHTML += `\\(m = \\frac{${-b} \\pm \\sqrt{${discriminante}}}{${2*a}}\\) <br>`;

    var cr = simplificarRaiz(discriminante);

    if (cr[0] != 1 && cr[1] != 1) {
        solucion.innerHTML += "Simplificando: <br>";
        solucion.innerHTML += `\\(m = \\frac{${-b} \\pm ${cr[1] == 1 ? "" : cr[1]}\\sqrt{${cr[0]}}${imaginary ? "i" : ""}}{${2*a}}\\) <br>`;
    }

    solucion.innerHTML += "Simplificando: <br>";
    solucion.innerHTML += `\\(m = \\frac{${-b}}{${2*a}} \\pm \\frac{${cr[1] == 1 ? "" : cr[1]}${cr[0] == 1 ? cr[1] == 1 ? "1" : "" : cr[0] == 0 ? "0" : `\\sqrt{${cr[0]}}`}${imaginary ? "i" : ""}}{${2*a}}\\)<br>`;

    var rp1 = 0, rp2 = 0;
    solucion.innerHTML += "Simplificando: <br>";
    if(-b%(2*a) === 0){
        rp1 = -b/(2*a);
    } else if ((2*a)%(-b) === 0){
        rp1 = `\\frac{${1}}{${(2*a)/-b}}`;
    } else if (mcd(-b,2*a) != 1 || mcd(b,2*a) != -1){
        rp1 = `\\frac{${-b/mcd(b,2*a)}}{${2*a/mcd(b,2*a)}}`;
    } else {
        rp1 = `\\frac{${-b}}{${2*a}}`;
    }
    if (cr[1]%(2*a) === 0){
        rp2 = cr[1]/(2*a);
    } else if ((2*a)%(cr[1]) === 0){
        rp2 = `\\frac{1}{${(2*a)/cr[1]}}`;
    } else if (mcd(cr[1],2*a) != 1 || mcd(cr[1],2*a) != -1){
        rp2 = `\\frac{${cr[1]/mcd(cr[1],2*a)}}{${2*a/mcd(cr[1],2*a)}}`;
    } else {
        rp2 = `\\frac{${cr[1]}}{${2*a}}`;
    }
    solucion.innerHTML += `\\(m = ${rp1 == 0 ? "" :rp1} ${cr[0] == 0 ? "" : `\\pm ${rp2 == 0 || rp2 == 1 ? "" : rp2} {${cr[0] == 1 ? rp2 == 1 ? "1" : "" : cr[0] == 0 ? "0" : `\\sqrt{${cr[0]}}`}}`}${imaginary ? "i" : ""}\\)<br>`;

    solucion.innerHTML += "Raices: <br>";
    if (Number.isInteger((-b/(2*a))+(cr[1]/(2*a))) && cr[0] == 1 ){
        solucion.innerHTML += `\\(m_1 = ${(-b/(2*a))+(cr[1]/(2*a))}\\)<br>`;
    } else {
        solucion.innerHTML += `\\(m_1 = ${rp1 == 0 ? "" :rp1} ${cr[0] == 0 ? "" : `+ ${rp2 == 0 || rp2 == 1 ? "" : rp2} {${cr[0] == 1 ? rp2 == 1 ? "1" : "" : cr[0] == 0 ? "0" : `\\sqrt{${cr[0]}}`}}`}${imaginary ? "i" : ""}\\)<br>`;
    }
    if (Number.isInteger((-b/(2*a))-(cr[1]/(2*a))) && cr[0] == 1 ){
        solucion.innerHTML += `\\(m_2 = ${(-b/(2*a))-(cr[1]/(2*a))}\\)<br>`;
    } else {
        solucion.innerHTML += `\\(m_2 = ${rp1 == 0 ? "" :rp1} ${cr[0] == 0 ? "" : `- ${rp2 == 0 || rp2 == 1 ? "" : rp2} {${cr[0] == 1 ? rp2 == 1 ? "1" : "" : cr[0] == 0 ? "0" : `\\sqrt{${cr[0]}}`}}`}${imaginary ? "i" : ""}\\)<br>`;
    }

    var next = document.createElement("button");
    var former = document.createElement("button");
    
    next.innerHTML = "Siguiente";
    former.innerHTML = "Anterior";
    
    next.onclick = function(){
        encontrarSoluciones(a, b, c, imaginary, rp1, rp2, cr[0], cr[1]);
    }
    former.onclick = function(){
        resolver();
    }
    
    solucion.appendChild(former);
    solucion.appendChild(next);
    
    MathJax.typeset();
}

function encontrarSoluciones(a, b, c, imaginary, rp1, rp2, disc, cout) {
    var solucion = document.getElementById("solucion");
    solucion.innerHTML = "";
    if (imaginary) {
        solucion.innerHTML = "Al existir raices imaginarias las soluciones se representan de la forma<br>";
        solucion.innerHTML += "\\(y_1 = e^{\\alpha x} \\cos{\\beta x}\\)<br>";
        solucion.innerHTML += "\\(y_2 = e^{\\alpha x} \\sin{\\beta x}\\)<br>";
        solucion.innerHTML += `Donde \\(\\alpha = ${rp1}\\) y \\(\\beta = ${rp2 == 1 || rp2 == 0 ? "" : rp2}${disc == 0 ? "" : disc == 1 ? "1" : `\\sqrt{${disc}}`}\\)<br>`;
        solucion.innerHTML += "Por lo tanto las soluciones son:<br>";
        solucion.innerHTML += `\\(y_1 = e^{${rp1}x} \\cos({${rp2 == 1 || rp2 == 0 ? "" : rp2}${disc == 0 ? "" : disc == 1 ? "1" : `\\sqrt{${disc}}`}x})\\)<br>`;
        solucion.innerHTML += `\\(y_2 = e^{${rp1}x} \\sin({${rp2 == 1 || rp2 == 0 ? "" : rp2}${disc == 0 ? "" : disc == 1 ? "1" : `\\sqrt{${disc}}`}x})\\)<br>`;
        solucion.innerHTML += "Simplificando:<br>";
        solucion.innerHTML += y1 = `\\(y_1 = ${rp1 == 0 ? "1" : `e^{${rp1 == 1 ? "" : rp1 == -1 ? "-" : rp1}x}`} \\cos({${rp2 == 1 || rp2 == 0 ? "" : rp2}${disc == 0 ? "" : disc == 1 ? "1" : `\\sqrt{${disc}}`}x})\\)<br>`;
        solucion.innerHTML += y2 = `\\(y_2 = ${rp1 == 0 ? "1" : `e^{${rp1 == 1 ? "" : rp1 == -1 ? "-" : rp1}x}`} \\sin({${rp2 == 1 || rp2 == 0 ? "" : rp2}${disc == 0 ? "" : disc == 1 ? "1" : `\\sqrt{${disc}}`}x})\\)<br>`;
    } else {
        var m1, m2, y1, y2;
        solucion.innerHTML = "Las raices son reales, por lo tanto son de la forma<br>";
        solucion.innerHTML += "\\(y_1 = e^{m_1 x}\\)<br>";
        solucion.innerHTML += "\\(y_2 = e^{m_2 x}\\)<br>";
        solucion.innerHTML += "Sustituyendo:<br>";
        if (Number.isInteger(-b/(2*a))+((disc == 0 ? 0 : cout)/(2*a)) && (disc == 1 || disc == 0)){
            m1 = (-b/(2*a))+((disc == 0 ? 0 : cout)/(2*a));
        } else { 
            m1 = `${rp1 == 0 ? "" :rp1} ${disc == 0 ? "" : `+ ${rp2 == 0 || rp2 == 1 ? "" : rp2} {${disc == 1 ? rp2 == 1 ? "1" : "" : disc == 0 ? "0" : `\\sqrt{${disc}}`}}`}`;
        }
        if (Number.isInteger(-b/(2*a))-((disc == 0 ? 0 : cout)/(2*a)) && (disc == 1 || disc == 0)){
            m2 = (-b/(2*a))-((disc == 0 ? 0 : cout)/(2*a));
        } else {
            m2 = `${rp1 == 0 ? "" :rp1} ${disc == 0 ? "" : `- ${rp2 == 0 || rp2 == 1 ? "" : rp2} {${disc == 1 ? rp2 == 1 ? "1" : "" : disc == 0 ? "0" : `\\sqrt{${disc}}`}}`}`;
        }
        solucion.innerHTML += `Con \\(m_1 = ${m1}\\)    y    \\(m_2 = ${m2}\\)<br>`;
        if (m1 == m2) {
            solucion.innerHTML += "Hay multiplicidad, por lo tanto la solución es:<br>";
            solucion.innerHTML += y1 = `\\(y_1 = ${m1 == 0 ? "1" : `e^{${m1 == 1 ? "" : m1 == -1 ? "-" : m1}x}`}\\)<br>`;
            solucion.innerHTML += y2 = `\\(y_2 = ${m2 == 0 ? "x" : `x e^{${m2 == 1 ? "" : m2 == -1 ? "-" : m2}x}`}\\)<br>`;
        } else {
            solucion.innerHTML += y1 = `\\(y_1 = ${m1 == 0 ? "1" : `e^{(${m1 == 1 ? "" : m1 == -1 ? "-" : m1}x)}`}\\)<br>`;
            solucion.innerHTML += y2 = `\\(y_2 = ${m2 == 0 ? "1" : `e^{(${m2 == 1 ? "" : m2 == -1 ? "-" : m2}x)}`}\\)<br>`;
        }
    }

    var solucion = document.getElementById("solucion");

    var next = document.createElement("button");
    next.id = "next";
    next.innerHTML = "Siguiente";

    var former = document.createElement("button");
    former.id = "former";
    former.innerHTML = "Anterior";

    next.onclick = function(){
        construccion(a, b, c, imaginary, rp1, rp2, disc, cout, y1, y2);
    }

    former.onclick = function(){
        generarRaices(a, b, c);
    }

    solucion.appendChild(former);
    solucion.appendChild(next);

    MathJax.typeset();
}

function construccion(a, b, c, imaginary, rp1, rp2, disc, cout, y1, y2) {
    var solucion = document.getElementById("solucion");
    solucion.innerHTML = "Construyendo la Solución General<br>";

    solucion.innerHTML += "Donde:<br>";
    solucion.innerHTML += "\\(y_c = c_1 y_1 + c_2 y_2\\)<br>";
    
    solucion.innerHTML += "Sustituyendo:<br>";
    solucion.innerHTML += `${y1}`;
    solucion.innerHTML += `${y2}`;

    y1 = y1.slice(8, -6);
    y2 = y2.slice(8, -6);

    solucion.innerHTML += "Se tiene:<br>";
    solucion.innerHTML += `\\(y_c = c_1 ${y1} + c_2 ${y2}\\)<br>`;

    var former = document.createElement("button");
    former.id = "former";
    former.innerHTML = "Anterior";

    var reset = document.createElement("button");
    reset.id = "reset";
    reset.innerHTML = "Limpiar";

    former.onclick = function() {
        encontrarSoluciones(a, b, c, imaginary, rp1, rp2, disc, cout);
    }

    reset.onclick = function() {
        limpiar();
    }

    solucion.appendChild(former);
    solucion.appendChild(reset);

    MathJax.typeset();
}

function limpiar() {
    var solucion = document.getElementById("solucion");
    solucion.innerHTML = "Ingresa un conjunto de datos válidos para continuar";

    var buttonA = document.getElementById("second");
    var buttonB = document.getElementById("first");
    var buttonC = document.getElementById("zero");
    buttonA.value = "";
    buttonB.value = "";
    buttonC.value = "";
    buttonA.disabled = false;
    buttonB.disabled = false;    
    buttonC.disabled = false;
    
    var resolver = document.getElementById("resolver");
    resolver.disabled = false;
}