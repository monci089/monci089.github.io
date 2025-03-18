
/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("screen");
let ctx = canvas.getContext('2d');
let cwidth = canvas.width / 2
let cheight = canvas.height / 2
let p_dimensions = [50, 100]
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
let corddistance
let movestop
let xmovement
let ymovement
let oldcords
let work
let imglast = []
let imglist = []
let frontset


class metaimg {
    constructor(pixelx, pixely, centerx, centery, collisionraidius, horizontaleclipse, verticaleclipse, collisiontype, realimage) {
        this.pixelx = pixelx;
        this.pixely = pixely;
        this.centerx = centerx;
        this.centery = centery;
        this.collisionraidius = collisionraidius;
        this.horizontaleclipse = horizontaleclipse;
        this.verticaleclipse = verticaleclipse;
        this.collisiontype = collisiontype;
        this.realimage = realimage;
    }
    draw(x, y) {
        imglist.push([this, x, y])
    }

}
class character{
    constructor(pixelx, pixely, centerx, centery, collisionraidius, horizontaleclipse, verticaleclipse, collisiontype, realimage, xcord, ycord){
        this.pixelx = pixelx;
        this.pixely = pixely;
        this.centerx = centerx;
        this.centery = centery;
        this.collisionraidius = collisionraidius;
        this.horizontaleclipse = horizontaleclipse;
        this.verticaleclipse = verticaleclipse;
        this.collisiontype = collisiontype;
        this.realimage = realimage;
        this.xcord = xcord;
        this.ycord = ycord;
    }
}






let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let i_tree = new Image()
i_tree.src = "./assets/tree.png"
//[name,pixel x, pixel y, center x, center y, collision raidius, horizontal eclipse, vertical eclipse]
let tree = new metaimg(100, 200, 50, -10, 100, 50, 50, "circle", i_tree)
let player=new character(100,100,50,0,0,0,0,"none",skin,0,0)


function rect(x, y, w, l, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, l)
}
function bubbleSort(arr, n) {
    let swapped = false;
    for (let i = 0; i < n; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j][2] > arr[j + 1][2]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (swapped === false) break;
    }
    return arr;
}
function dimg(objc, x, y) {
    imagecenter = []
    //gets the objects true center
    imagecenter = [x + cwidth - objc.centerx - p_cords[0], -y + cheight - (objc.pixely - objc.centery) + p_cords[1]]
    ctx.drawImage(objc.realimage, imagecenter[0], imagecenter[1])
    acollidecords.push([objc, imagecenter[0], imagecenter[1]])
}
function movement(x, y) {
    for (g = 0; g < Math.abs(x); g++) {
        if (x > 0) {
            p_cords[0] = p_cords[0] + 1
        } else {
            p_cords[0] = p_cords[0] - 1
        }
        for (let i = 0; i < collidecords.length; i++) {
            console.log(Math.pow((collidecords[i][1]) - p_cords[0], 2) / Math.pow(collidecords[i][0].horizontaleclipse, 2) +
            Math.pow((collidecords[i][2]) - p_cords[1], 2) / Math.pow(collidecords[i][0].verticaleclipse, 2))
            console.log(collidecords[i][0].collisionraidius)
            work = true
            //checks distance from player and i object and sees if its within objects collider range
            while (
                (collidecords[i][0].collisiontype == "circle" &&
                    (Math.pow((collidecords[i][1]) - p_cords[0], 2) / Math.pow(collidecords[i][0].horizontaleclipse, 2) +
                        Math.pow((collidecords[i][2]) - p_cords[1], 2) / Math.pow(collidecords[i][0].verticaleclipse, 2))) < collidecords[i][0].collisionraidius ||
                (collidecords[i][0].collisiontype == "rectangle" &&
                    (Math.abs(x - (collidecords[i][0])) < collidecords[i][2] && (p_cords[1] < collidecords[i][1] + collidecords[i][2] && p_cords[1] > collidecords[i][1] - collidecords[i][2])))) {
                work = false
                console.log("work")
                if (x > 0) {
                    p_cords[0]--
                } else {
                    p_cords[0]++
                }

            }
        }
    }
    for (g = 0; g < Math.abs(y); g++) {
        if (y > 0) {
            p_cords[1] = p_cords[1] + 1
        } else {
            p_cords[1] = p_cords[1] - 1
        }
        for (let i = 0; i < collidecords.length; i++) {
            work = true
            while (

                (collidecords[i][0].collisiontype == "circle" &&
                    (Math.pow((collidecords[i][1]) - p_cords[0], 2) / Math.pow(collidecords[i][0].horizontaleclipse, 2) +
                        Math.pow((collidecords[i][2]) - p_cords[1], 2) / Math.pow(collidecords[i][0].verticaleclipse, 2))) < collidecords[i][0].collisionraidius ||
                (collidecords[i][0].collisiontype == "rectangle" &&
                    (Math.abs(x - (collidecords[i][0])) < collidecords[i][2] && (p_cords[1] < collidecords[i][1] + collidecords[i][2] && p_cords[1] > collidecords[i][1] - collidecords[i][2])))) {
                work = false
                if (y > 0) {
                    p_cords[1]--
                } else {
                    p_cords[1]++
                }
            }
        }
    }
    console.log(p_cords)
}

function gameLoop() {
    rect(0, 0, 1960, 1080, "sienna")
    movestop = "free"
    collidecords = []
    for (let i = 0; i < acollidecords.length; i++) {
        if (Math.sqrt(Math.pow((acollidecords[i][1]) - p_cords[0], 2) + Math.pow((acollidecords[i][2]) - p_cords[1], 2)) < 600) {
            collidecords.push(acollidecords[i])
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
    }
    tree.draw(100, 100)
    imglist = bubbleSort(imglist, imglist.length)
    for (let i = imglist.length - 1; i >= 0; i--) {
        if (imglist[i][2] < p_cords[1]) {
            frontset = i
            break
        }
        dimg(imglist[i][0], imglist[i][1], imglist[i][2])
    }
    ctx.drawImage(skin, cwidth - p_dimensions[0], cheight - p_dimensions[1])
    for (let i = frontset; i >= 0; i--) {
        dimg(imglist[i][0], imglist[i][1], imglist[i][2])
    }
    frontset = -1
    /*
    for (let i = 0; i < imglast.length; i++) {
        dimg(imglast[i][0], imglast[i][1], imglast[i][2], "last")

    }
        */
    imglast = []
    imglist = []
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


