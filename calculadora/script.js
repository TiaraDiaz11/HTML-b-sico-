const operacion = document.getElementById("operacion");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");
const listaHistorial = document.getElementById("listaHistorial");
const btnHistorial = document.getElementById("btnHistorial");
const cerrarHistorial = document.getElementById("cerrarHistorial");

let expresion = "";
let historialCalculos = JSON.parse(localStorage.getItem("historial")) || [];

function mostrarHistorial(){

    listaHistorial.innerHTML = "";

    historialCalculos.forEach(calculo =>{

        const p = document.createElement("p");
        p.textContent = calculo;
        listaHistorial.appendChild(p);
    });
}

mostrarHistorial();

function agregar(valor){

    expresion += valor;
    operacion.value = expresion;
}

function limpiarTodo(){

    expresion = "";
    operacion.value = "";
    resultado.value = "";
}

function borrarUno(){

    expresion = expresion.slice(0,-1);
    operacion.value = expresion;
}

function calcular(){

    if(expresion==="") return;

    try{

        let cuenta = expresion.replace(/×/g,"*");
        let respuesta = eval(cuenta);
        resultado.value = respuesta;
        historialCalculos.unshift(expresion + " = " + respuesta);
        if(historialCalculos.length > 20){

            historialCalculos.pop();
        }

        localStorage.setItem(
            "historial",
            JSON.stringify(historialCalculos)
        );

        mostrarHistorial();
        expresion = respuesta.toString();
        operacion.value = expresion;
    }

    catch{resultado.value = "Error";
    }
}

btnHistorial.addEventListener("click",()=>{
    historial.classList.remove("oculto");
});

cerrarHistorial.addEventListener("click",()=>{
    historial.classList.add("oculto");
});

document.addEventListener("keydown",(e)=>{

    const tecla = e.key;
    
    if(!isNaN(tecla)){agregar(tecla);
    }

    if(["+","-","*","/","(",")","."].includes(tecla)){

        agregar(tecla);

    }

    if(tecla==="Enter"){

        e.preventDefault();
        calcular();
    }

    if(tecla==="Backspace"){

        borrarUno();
    }

    if(tecla==="Escape"){

        limpiarTodo();
    }
});