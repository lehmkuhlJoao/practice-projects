// Initial Data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')

// Events
document.querySelectorAll('.color').forEach(item =>{
    item.addEventListener('click', colorClickEvent)
})
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScreen)

// Functions
function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')
    event.target.classList.add('active')
}

/*
Passo a passo para desenhar no canvas:
- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
- Quando o click do mouse LEVANTAR, desative o modo desenho.
*/

function mouseDownEvent(event) {
    canDraw = true
    mouseX = event.pageX - screen.offsetLeft
    mouseY = event.pageY - screen.offsetTop
}
function mouseMoveEvent(event) {
    if(canDraw) {
        draw(event.pageX, event.pageY)
    }
}
function mouseUpEvent() {
    canDraw = false
}   
function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineJoin = "round"
    ctx.moveTo(mouseX, mouseY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = currentColor
    ctx.stroke()

    mouseX = pointX
    mouseY = pointY
}
function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}