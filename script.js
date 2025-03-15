
/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("screen");
let ctx = canvas.getContext('2d');
let wd = canvas.width / 2
let hi = canvas.height / 2
let p_cordinates=[0,0]
let keysdown=[]
let wdelete

let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let tree = new Image(200,400)
tree.src = "./assets/tree.png"
function rect(x, y, w, l, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, l)
}
function dimg(name, x,y){
    ctx.drawImage(name,x-p_cordinates[0],y+p_cordinates[1])
}
function gameLoop() {
    rect(0, 0, 1960, 1080, "sienna")
    //movement
    if (keysdown.includes("w")==true){
        p_cordinates[1]=p_cordinates[1]+4
    }if (keysdown.includes("s")==true){
        p_cordinates[1]=p_cordinates[1]-4
    }if (keysdown.includes("d")==true){
        p_cordinates[0]=p_cordinates[0]+4
    }if (keysdown.includes("a")==true){
        p_cordinates[0]=p_cordinates[0]-4
    }
    ctx.drawImage(skin, wd - 100, hi - 50)
    console.log(p_cordinates)
    dimg(tree, 500,700)
    dimg(tree, 700,700)
    dimg(tree, 500,1000)
    
}
document.addEventListener('keydown', function(event) {
    if(event.key == "w") {
        //w key
        if(keysdown.includes("w")==false)
            keysdown.push("w")
    }
    if(event.key == "s"){
        //s key
        if(keysdown.includes("s")==false)
            keysdown.push("s")
    }
    if(event.key == "d"){
        //d key
        if(keysdown.includes("d")==false)
            keysdown.push("d")
    }
    if(event.key == "a"){
        //a key
        if(keysdown.includes("a")==false)
            keysdown.push("a")
    }
})
document.addEventListener('keyup', function(event) {
        keysdown = keysdown.filter(k => k != event.key);
})
setInterval(gameLoop, 1000 / 60)


