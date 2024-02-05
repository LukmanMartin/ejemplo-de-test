//base de datos local de preguntas
const bd_juego = [
    {
        "id": 0,
        "pregunta": "¿Cuál es el animal terrestre más grande?",
        "op0": "Elefante africano",
        "op1": "Jirafa",
        "op2": "Hipopótamo",
        "correcta": "0"
    },
    {
        "id": 1,
        "pregunta": "¿Qué elemento químico tiene el símbolo 'H' en la tabla periódica?",
        "op0": "Hidrógeno",
        "op1": "Helio",
        "op2": "Hierro",
        "correcta": "0"
    },
    {
        "id": 2,
        "pregunta": "¿Cuál es el planeta más cercano al Sol?",
        "op0": "Venus",
        "op1": "Marte",
        "op2": "Mercurio",
        "correcta": "2"
    },
    {
        "id": 3,
        "pregunta": "¿En qué año se celebró la primera Copa Mundial de la FIFA?",
        "op0": "1930",
        "op1": "1950",
        "op2": "1928",
        "correcta": "0"
    },
    {
        "id": 4,
        "pregunta": "¿Quién escribió la novela 'Cien años de soledad'?",
        "op0": "Julio Cortázar",
        "op1": "Pablo Neruda",
        "op2": "Gabriel García Márquez",
        "correcta": "2"
    },
    {
        "id": 5,
        "pregunta": "¿En qué año se inauguró el Canal de Panamá?",
        "op0": "1914",
        "op1": "1905",
        "op2": "1921",
        "correcta": "0"
    },
    {
        "id": 6,
        "pregunta": "¿Cuál es el océano más grande del mundo?",
        "op0": "Océano Atlántico",
        "op1": "Océano Índico",
        "op2": "Océano Pacífico",
        "correcta": "2"
    },
    {
        "id": 7,
        "pregunta": "¿En qué continente se encuentra el río Amazonas?",
        "op0": "África",
        "op1": "América del Norte",
        "op2": "América del Sur",
        "correcta": "2"
    },
    {
        "id": 8,
        "pregunta": "¿Cuál es el país más visitado del mundo?",
        "op0": "Francia",
        "op1": "Estados Unidos",
        "op2": "China",
        "correcta": "0"
    },
    {
        "id": 9,
        "pregunta": "¿Quién pintó la famosa obra 'La Noche Estrellada'?",
        "op0": "Leonardo da Vinci",
        "op1": "Pablo Picasso",
        "op2": "Vincent van Gogh",
        "correcta": "2"
    }
]


//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}