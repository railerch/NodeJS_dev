// VARIABLES DE CONTROL
var click = movingMouse = false;
var xPos = yPos = 0;
var prevPos = null;
var initColor = "black";

// PINCELES
let toolbarBtn = document.querySelectorAll(".toolbar-btn");
toolbarBtn.forEach(btn => {
    // Colores de fondo
    let bgColor = btn.getAttribute("data-btn");
    btn.style.backgroundColor = bgColor;

    // Obtener colores
    btn.addEventListener("click", function() {
        let attrColor = this.getAttribute("data-btn");
        initColor = attrColor;
        console.log("Color: " + attrColor);
    })
})

// SOCKETS
const socket = io();

// CANVAS

// Preparando el canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const canvasPosX = canvas.getBoundingClientRect().left;
const canvasPosY = canvas.getBoundingClientRect().top;
canvas.width = window.innerWidth / 1.23;
canvas.height = window.innerHeight;

// Eventos en el canvas
canvas.addEventListener("mousedown", function(event) {
    console.log("mouseDown")
    click = true;
})

canvas.addEventListener("mouseup", function() {
    console.log("mouseUp")
    click = false;
})

canvas.addEventListener("mousemove", function(event) {
    console.log("mouseMove");
    movingMouse = true;
    xPos = event.clientX;
    yPos = event.clientY;

    crear_dibujo();
})

// Funciones de dibujo
function crear_dibujo() {
    if (click && movingMouse) {
        console.log("Drawing...");
        let dibujo = {
            x: xPos,
            y: yPos,
            color: initColor,
            prevPos: prevPos
        }
        mostrar_dibujo(dibujo);
    }

    prevPos = { x: xPos, y: yPos };
}

function mostrar_dibujo(dibujo) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = dibujo.color;
    context.moveTo(dibujo.x, dibujo.y);
    context.lineTo(dibujo.prevPos.x, dibujo.prevPos.y);
    context.stroke();
}