
/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("screen");
let ctx = canvas.getContext('2d');
let cwidth = canvas.width / 2
let cheight = canvas.height / 2
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
let xh2
let a2
let yk2
let b2
let xh
let yk
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
class character {
    constructor(pixelx, pixely, centerx, centery, collisionraidius, horizontaleclipse, verticaleclipse, collisiontype, realimage, xcord, ycord,) {
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
    set(x, y, npctype) {
        imglist.push([this, x, y])

    }
}






let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let i_tree = new Image()
i_tree.src = "./assets/tree.png"
//[name,pixel x, pixel y, center x, center y, collision raidius, horizontal eclipse, vertical eclipse]
let tree = new metaimg(100, 200, 50, 0, 50, 9, 6, "circle", i_tree)
let player = new character(100, 100, 50, 0, 0, 0, 0, "none", skin, 0, 0)
let i_sockmonkey = new Image()
i_sockmonkey = "./assets/sockmonkey.png"
let sockmonkey = new character(100, 100, 50, 0, 20, 5, 5, "circle", skin, -100, 0, -100)
let i_fence = new Image()
i_fence.src = "./assets/fence.png"
let fence = new metaimg(100, 100, 50, 0, 50, 6, 6, "rectangle", i_fence)

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
    imagecenter = [x + cwidth - objc.centerx - player.xcord, -y + cheight - (objc.pixely - objc.centery) + player.ycord]
    ctx.drawImage(objc.realimage, imagecenter[0], imagecenter[1])
    acollidecords.push([objc, x, y])
    console.log(acollidecords[0])
}
function movement(x, y) {
    for (g = 0; g < Math.abs(x); g++) {
        if (x > 0) {
            player.xcord = player.xcord + 1
        } else {
            player.xcord = player.xcord - 1
        }
        for (let i = 0; i < collidecords.length; i++) {
            xh = collidecords[i][1] - player.xcord
            xh2 = Math.pow(xh, 2)
            a2 = Math.pow(collidecords[i][0].horizontaleclipse, 2)
            yk = collidecords[i][2] - player.ycord
            yk2 = Math.pow(yk, 2)
            b2 = Math.pow(collidecords[i][0].verticaleclipse, 2)

            //checks distance from player and i object and sees if its within objects collider range
            while (
                ((collidecords[i][0].collisiontype == "circle" &&
                    xh2 / a2 + yk2 / b2) < collidecords[i][0].collisionraidius) ||
                (collidecords[i][0].collisiontype == "rectangle" &&
                    Math.abs(xh) < (collidecords[i][0].horizontaleclipse) &&
                    Math.abs(yk) < (collidecords[i][0].verticaleclipse))) {
                console.log(Math.abs(xh) < (collidecords[i][0].horizontaleclipse))
                xh = collidecords[i][1] - player.xcord
                xh2 = Math.pow(xh, 2)
                a2 = Math.pow(collidecords[i][0].horizontaleclipse, 2)
                yk = collidecords[i][2] - player.ycord
                yk2 = Math.pow(yk, 2)
                b2 = Math.pow(collidecords[i][0].verticaleclipse, 2)
                console.log("d")
                if (x > 0) {
                    player.xcord--
                } else {
                    player.xcord++
                } if (collidecords[i][2] < cheight) {
                    if (((collidecords[i][0].collisiontype == "circle" &&
                        xh2 / a2 + Math.pow((collidecords[i][2]) - player.ycord + 1, 2) / b2) > collidecords[i][0].collisionraidius)) {
                        player.ycord--
                    }
                    if (((collidecords[i][0].collisiontype == "circle" &&
                        xh2 / a2 + Math.pow((collidecords[i][2]) - player.ycord - 1, 2) / b2) > collidecords[i][0].collisionraidius)) {
                        player.ycord++
                    }
                }



            }
        }
    }
    for (g = 0; g < Math.abs(y); g++) {
        if (y > 0) {
            player.ycord = player.ycord + 1
        } else {
            player.ycord = player.ycord - 1
        }
        for (let i = 0; i < collidecords.length; i++) {
            xh = collidecords[i][1] - player.xcord
            xh2 = Math.pow(xh, 2)
            a2 = Math.pow(collidecords[i][0].horizontaleclipse, 2)
            yk = collidecords[i][2] - player.ycord
            yk2 = Math.pow(yk, 2)
            b2 = Math.pow(collidecords[i][0].verticaleclipse, 2)
            while (
                ((collidecords[i][0].collisiontype == "circle" &&
                    xh2 / a2 + yk2 / b2) < collidecords[i][0].collisionraidius) ||
                (collidecords[i][0].collisiontype == "rectangle" &&
                    (Math.abs(xh) <= (collidecords[i][0].horizontaleclipse) &&
                        Math.abs(yk) <= (collidecords[i][0].verticaleclipse)))) {
                xh = collidecords[i][1] - player.xcord
                xh2 = Math.pow(xh, 2)
                a2 = Math.pow(collidecords[i][0].horizontaleclipse, 2)
                yk = collidecords[i][2] - player.ycord
                yk2 = Math.pow(yk, 2)
                b2 = Math.pow(collidecords[i][0].verticaleclipse, 2)
                console.log("D")
                if (y > 0) {
                    player.ycord--
                } else {
                    player.ycord++
                } if (collidecords[i][1] < cwidth) {
                    if (((collidecords[i][0].collisiontype == "circle" &&
                        Math.pow((collidecords[i][1]) - player.xcord + 1, 2) / a2 + yk2 / b2) > collidecords[i][0].collisionraidius)) {
                        player.xcord--
                    }
                    if (((collidecords[i][0].collisiontype == "circle" &&
                        Math.pow((collidecords[i][1]) - player.xcord - 1, 2) / a2 + yk2 / b2) > collidecords[i][0].collisionraidius)) {
                        player.xcord++
                    }
                }
            }
        }
    }
}

function gameLoop() {
    rect(0, 0, 1960, 1080, "sienna")
    movestop = "free"
    collidecords = []
    for (let i = 0; i < acollidecords.length; i++) {
        if (Math.sqrt(Math.pow((acollidecords[i][1]) - player.xcord, 2) + Math.pow((acollidecords[i][2]) - player.ycord, 2)) < 600) {
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
    fence.draw(200, 0)
    imglist = bubbleSort(imglist, imglist.length)
    for (let i = imglist.length - 1; i >= 0; i--) {
        if (imglist[i][2] < player.ycord) {
            frontset = i
            break
        }
        dimg(imglist[i][0], imglist[i][1], imglist[i][2])
    }
    ctx.drawImage(skin, cwidth - player.centerx, cheight - (player.pixely - player.centery))
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


