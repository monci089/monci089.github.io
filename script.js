
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

let skin = new Image()
skin.src = "./assets/bluechillguy.png"
let i_tree = new Image()
imagesize.push(["tree", 100, 200, 50, 0, 45, "circle"])
i_tree.src = "./assets/tree.png"
let tree = ["tree", i_tree]

let i_fence = new Image()
imagesize.push(["fence", 100, 100, 50, 50, 50, "circle"])
i_fence.src = "./assets/fence.png"
let fence = ["fence", i_fence]


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
function dimg(name, x, y, last) {
    /*checks if player is behidn or infront of object
    
    if (y < p_cords[1] && last != "last") {
        imglast.push([name, x, y])
    }
*/

    imagecenter = []
    //finds objects meta data
    for (let i = 0; i < imagesize.length; i++) {
        if (imagesize[i][0] == name[0]) {
            imgdimen = i

            break
        }
    }
    //gets the objects true center
    imagecenter = [x + cwidth - imagesize[imgdimen][3] - p_cords[0], -y + cheight - (imagesize[imgdimen][2] - imagesize[imgdimen][4]) + p_cords[1]]
    ctx.drawImage(name[1], imagecenter[0], imagecenter[1])
    console.log(imagecenter)

    acollidecords.push([x, y, imagesize[imgdimen][5], imagesize[imgdimen][6]])






}
function movement(x, y) {
    for(g=0;g<Math.abs(x);g++){
        if(x>0){
            p_cords[0] = p_cords[0] +1
        }else{
            p_cords[0] = p_cords[0] -1
        }
    
    for (let i = 0; i < collidecords.length; i++) {
        work = true
        //checks distance from player and i object and sees if its within objects collider range
        while (
            (collidecords[i][3] == "circle" &&
                (Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2])) ||
            (collidecords[i][3] == "rectangle" &&
                (Math.abs(x - (collidecords[i][0])) < collidecords[i][2] && (p_cords[1] < collidecords[i][1] + collidecords[i][2] && p_cords[1] > collidecords[i][1] - collidecords[i][2])))) {
            work = false
            if (x > 0) {
                p_cords[0]--
            } else {
                p_cords[0]++
            }

        }
    }
}
for(g=0;g<Math.abs(y);g++){
    if(y>0){
        p_cords[1] = p_cords[1] +1
    }else{
        p_cords[1] = p_cords[1] -1
    }
    for (let i = 0; i < collidecords.length; i++) {
        work = true
        while ((collidecords[i][3] == "circle" && Math.sqrt(Math.pow((collidecords[i][0]) - p_cords[0], 2) + Math.pow((collidecords[i][1]) - p_cords[1], 2)) < collidecords[i][2])) {
            work = false
            if (y > 0) {
                p_cords[1]--
            } else {
                p_cords[1]++
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
        if (Math.sqrt(Math.pow((acollidecords[i][0]) - p_cords[0], 2) + Math.pow((acollidecords[i][1]) - p_cords[1], 2)) < 600) {
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
    imglist.push([tree, 0, 210])
    imglist.push([tree, -100, -110])
    imglist.push([tree, 150, 510])
    imglist.push([tree, -100, 110])
    imglist.push([tree, 150, -120])
    imglist.push([tree, 220, 010])
    imglist.push([tree, 330, 610])
    imglist.push([tree, -110, 310])
    imglist.push([tree, 550, 310])
    imglist.push([tree, 3-150, -410])
    imglist.push([tree, 120, -110])
    imglist = bubbleSort(imglist, imglist.length)
    for (let i = imglist.length - 1; i >= 0; i--) {
        if (imglist[i][2] < p_cords[1]) {
            frontset = i
            break
        }
        dimg(imglist[i][0], imglist[i][1], imglist[i][2],)
    }
    ctx.drawImage(skin, cwidth - p_dimensions[0], cheight - p_dimensions[1])
    for (let i = frontset; i >= 0; i--) {
        dimg(imglist[i][0], imglist[i][1], imglist[i][2],)
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


