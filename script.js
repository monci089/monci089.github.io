function rect(x, y, w, l, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, l)
}
/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("screen");
let ctx = canvas.getContext('2d');
let wd = canvas.width / 2
let hi = canvas.height / 2

let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let tree = new Image(200,400)
tree.src = "./assets/tree.png"

function gameLoop() {
    rect(0, 0, 1850, 1000, "sienna")
    ctx.drawImage(tree, 500, 700,)
    ctx.drawImage(skin, wd - 100, hi - 100, )
}

setInterval(gameLoop, 1000 / 60)


