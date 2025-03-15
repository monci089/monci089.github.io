function rect(x, y, w, l, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, l)
}
window.addEventListener('keydown', function(event) {
        if(Event.keycode == 87) {
            //w key
            rect(100, 100, 100, 100, "red");
        }
        else if(Event.keycode == 83) {
            //s key
            alert('Right was pressed');
        }
        else if(Event.keycode == 68) {
            //d key
            alert('Right was pressed');
        }
        else if(Event.keycode == 65) {
            alert('Right was pressed');
        }
    });
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
    ctx.drawImage(skin, wd - 100, hi - 50, )
}

setInterval(gameLoop, 1000 / 60)


