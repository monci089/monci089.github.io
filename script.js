
/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("screen");
let ctx = canvas.getContext('2d');
let cwidth = canvas.width / 2
let cheight = canvas.height / 2
let p_dimensions = [50, 50]
let p_cords = [0, 0]
let keysdown = []
let wdelete
let acollidecords = []
let collidecords = []
let imagesize = []
let imagecenter
let imageci
let imgdimen
let m_horizontal
let m_vertical
let onetime = true
let test
let pastp_cords = p_cords
let movestop
let xmovement
let ymovement
let oldcords
let work

let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let i_tree = new Image()
imagesize.push(["tree", 100, 200, 50, 30, 50, "circle"])
i_tree.src = "./assets/tree.png"
let tree = ["tree", i_tree]

let i_fence = new Image()
imagesize.push(["fence", 100, 100, 50, 50, 50, "rectangle"])
i_fence.src = "./assets/fence.png"
let fence = ["fence", i_fence]


function rect(x, y, w, l, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, l)
}
function dimg(name, x, y) {
    imagecenter = []

    for (let i = 0; i < imagesize.length; i++) {
        if (imagesize[i][0] == name[0]) {
            imgdimen = i

            break
        }
    }
    imagecenter = [x + cwidth - imagesize[imgdimen][3] - p_cords[0], -y + cheight - (imagesize[imgdimen][2] - imagesize[imgdimen][4]) + p_cords[1]]
    ctx.drawImage(name[1], imagecenter[0], imagecenter[1])
    acollidecords.push([x, y, imagesize[imgdimen][5]],imagesize[imgdimen][6])

}
function movement(x, y) {
if(x>=y){
    
}
    p_cords[0] = p_cords[0] + x 

        for (let i = 0; i < collidecords.length; i++) {
            work = true
            while ((collidecords[i][3]=="circle"&&(Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2]))) {
                work = false
                if (x > 0) {
                    p_cords[0]--
                } else {
                    p_cords[0]++
                }
            
        }
    }
    p_cords[1] = p_cords[1] + y 

        for (let i = 0; i < collidecords.length; i++) {
            work = true
            while (Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2]) {
                work = false
                if (y > 0) {
                    p_cords[1]--
                } else {
                    p_cords[1]++
                }
        }
        }
    
        
}
/*
function movement(x, y) {
    xmovementloss=0
    ymovementloss=0


    while (xmovementloss != "done" && ymovementloss != "done") {
        console.log("work")
        p_cords[0] = p_cords[0] + x -  xmovementloss
        if (xmovementloss != "done") {
            for (let i = 0; i < collidecords.length; i++) {
                work = true
                while ((collidecords[i][3]=="circle"&&(Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2]))) {
                    console.log("work1")
                    work = false
                    if (x > 0) {
                        p_cords[0]--
                    } else {
                        p_cords[0]++
                    }
                    xmovementloss++
                    if (x != x - xmovementloss || xmovementloss == 0) {
                        if (xmovementloss + 1 == x) {
                            xmovementloss = "done"
                        }
                    }
                }
                if (work) {
                    xmovementloss = "done"
                }
            }
        }
        p_cords[1] = p_cords[1] + y - ymovementloss
        if (ymovementloss != "done") {
            for (let i = 0; i < collidecords.length; i++) {
                work = true
                while (Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2]) {
                    work = false
                    if (y > 0) {
                        p_cords[1]--
                    } else {
                        p_cords[1]++
                    }
                    ymovementloss++
                    if (y != y - ymovementloss || ymovementloss == 0) {
                        if (ymovementloss + 1 == y) {
                            ymovementloss = "done"
                        }
                    }
                }
                if (work) {
                    ymovementloss = "done"
                }
            }
        }
    }
}
*/
function gameLoop() {
    rect(0, 0, 1960, 1080, "sienna")
    movestop = "free"
    console.log(acollidecords)
    collidecords = []
    for (let i = 0; i < acollidecords.length; i++) {
        if (Math.sqrt(Math.pow((acollidecords[i][0]) - p_cords[0], 2) + Math.pow((acollidecords[i][1]) - p_cords[1], 2)) < 600) {
            collidecords.push(acollidecords[i])
            console.log(collidecords)
        }
    }
    acollidecords = []
    if (keysdown.includes("w") != keysdown.includes("s")) {
        m_vertical = true
    } else {
        m_vertical = false
    }
    if (keysdown.includes("a") != keysdown.includes("d")) {
        m_horizontal = true
    } else {
        m_horizontal = false
    }


    //movement
    if (keysdown.length > 0) {

        acollidecords = []
    }
    if (keysdown.includes("w") == true) {
        if (m_horizontal) {
            movement(0, 7)
        } else {
            movement(0, 9.8995)
        }
    }
    if (keysdown.includes("s") == true) {
        if (m_horizontal) {
            movement(0, -7)
        } else {
            movement(0, -9.8995)
        }
    }


    if (keysdown.includes("d") == true) {
        if (m_vertical) {
            movement(7, 0)
        } else {
            movement(9.8995, 0)
        }
    }
    if (keysdown.includes("a") == true) {
        if (m_vertical) {
            movement(-7, 0)
        } else {
            movement(-9.8995, 0)
        }
    }
    ctx.drawImage(skin, cwidth - p_dimensions[0], cheight - p_dimensions[1])
    console.log(p_cords)
    dimg(tree, 0, 300)
    dimg(fence, 200, 300)
    dimg(fence, 200, 100)
    onetime = false
}
document.addEventListener('keydown', function (event) {
    if (event.key == "w") {
        //w key
        if (keysdown.includes("w") == false)
            keysdown.push("w")
    }
    if (event.key == "s") {
        //s key
        if (keysdown.includes("s") == false)
            keysdown.push("s")
    }
    if (event.key == "d") {
        //d key
        if (keysdown.includes("d") == false)
            keysdown.push("d")
    }
    if (event.key == "a") {
        //a key
        if (keysdown.includes("a") == false)
            keysdown.push("a")
    }
})
document.addEventListener('keyup', function (event) {
    keysdown = keysdown.filter(k => k != event.key);
})
setInterval(gameLoop, 1000 / 60)


