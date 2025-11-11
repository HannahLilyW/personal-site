let fishes = [
    {
        // urls to images
        anal_fin_left: 'fishes/anal_fin_left_small.png',
        anal_fin_right: 'fishes/anal_fin_right_small.png',
        body_left: 'fishes/body_left_small.png',
        body_right: 'fishes/body_right_small.png',
        dorsal_fin_left: 'fishes/dorsal_fin_left_small.png',
        dorsal_fin_right: 'fishes/dorsal_fin_right_small.png',
        pectoral_fin_left: 'fishes/pectoral_fin_left_small.png',
        pectoral_fin_right: 'fishes/pectoral_fin_right_small.png',
        pelvic_fin_left: 'fishes/pelvic_fin_left_small.png',
        pelvic_fin_right: 'fishes/pelvic_fin_right_small.png',
        tail_left: 'fishes/tail_left_small.png',
        tail_right: 'fishes/tail_right_small.png',

        // image elements
        bodyImageLeft: null,
        bodyImageRight: null,
        tailImageLeft: null,
        tailImageRight: null,
        dorsalFinImageLeft: null,
        dorsalFinImageRight: null,
        pectoralFinImageLeft: null,
        pectoralFinImageRight: null,
        pelvicFinImageLeft: null,
        pelvicFinImageRight: null,
        analFinImageLeft: null,
        analFinImageRight: null,

        pectoral_fin_x: 90,  // x of base of pectoral fin

        size: 150, // in pixels

        // x and y of top left pixel of fish's square
        x: 0,
        y: 0,


        vx: 0,

        // Angle in degrees up from horizontal.
        angle: 0,

        // max angle
        maxAngle: 10,

        lastSpin: new Date(), // last time a spin was done
        spinInterval: 5000, // minimum time in milliseconds between random spins
        spinStep: 0, // a spin takes 20 frames, this will be 1 to 20 if fish is currently spinning, 0 otherwise
        spinDirection: 1, // 1 if spinning right, -1 if spinning left

        // 1 to 10
        maxSpeed: 2,

        // How likely the fish is to change speed (1=10% likely to 9=90% likely)
        changeSpeedLikelihood: 5,

        // How likely the fish is to change angle (1=10% likely to 9=90% likely)
        changeAngleLikelihood: 1,

        // How likely the fish is to spin around (1=10% likely to 9=90% likely)
        spinLikelihood: 5,

        // Last movement the fish made
        lastVx: 0,

        tailAnimation: 0,
        dorsalFinAnimation: 0,
        pelvicFinAnimation: 0,
        pectoralFinAnimation: 0,
        analFinAnimation: 0,
    },
    {
        // urls to images
        anal_fin_left: 'fishes/anal_fin_left_small.png',
        anal_fin_right: 'fishes/anal_fin_right_small.png',
        body_left: 'fishes/body_left_small.png',
        body_right: 'fishes/body_right_small.png',
        dorsal_fin_left: 'fishes/dorsal_fin_left_small.png',
        dorsal_fin_right: 'fishes/dorsal_fin_right_small.png',
        pectoral_fin_left: 'fishes/pectoral_fin_left_small.png',
        pectoral_fin_right: 'fishes/pectoral_fin_right_small.png',
        pelvic_fin_left: 'fishes/pelvic_fin_left_small.png',
        pelvic_fin_right: 'fishes/pelvic_fin_right_small.png',
        tail_left: 'fishes/tail_left_small.png',
        tail_right: 'fishes/tail_right_small.png',

        // image elements
        bodyImageLeft: null,
        bodyImageRight: null,
        tailImageLeft: null,
        tailImageRight: null,
        dorsalFinImageLeft: null,
        dorsalFinImageRight: null,
        pectoralFinImageLeft: null,
        pectoralFinImageRight: null,
        pelvicFinImageLeft: null,
        pelvicFinImageRight: null,
        analFinImageLeft: null,
        analFinImageRight: null,

        pectoral_fin_x: 90,  // x of base of pectoral fin

        size: 125, // in pixels

        // x and y of top left pixel of fish's square
        x: 0,
        y: 0,


        vx: 0,

        // Angle in degrees up from horizontal.
        angle: 0,

        // max angle
        maxAngle: 10,

        lastSpin: new Date(), // last time a spin was done
        spinInterval: 5000, // minimum time in milliseconds between random spins
        spinStep: 0, // a spin takes 20 frames, this will be 1 to 20 if fish is currently spinning, 0 otherwise
        spinDirection: 1, // 1 if spinning right, -1 if spinning left

        // 1 to 10
        maxSpeed: 2,

        // How likely the fish is to change speed (1=10% likely to 9=90% likely)
        changeSpeedLikelihood: 5,

        // How likely the fish is to change angle (1=10% likely to 9=90% likely)
        changeAngleLikelihood: 1,

        // How likely the fish is to spin around (1=10% likely to 9=90% likely)
        spinLikelihood: 5,

        // Last movement the fish made
        lastVx: 0,

        tailAnimation: 0,
        dorsalFinAnimation: 0,
        pelvicFinAnimation: 0,
        pectoralFinAnimation: 0,
        analFinAnimation: 0,
    }
]

let bubbles = []
for (let i = 0; i < 15; i++) {
    bubbles.push([Math.random(), Math.random(), Math.random() - 0.5]) // initial x,y,x offset angle of bubble
}

let plants = [[], [], []]
let heights = [10, 12, 15]
for (let j = 0; j < heights.length; j++) {
    for (let i = 0; i < heights[j]; i++) {
        plants[j].push([Math.random(), randomChoice([-1, 1])])
    }
}
let plantAngles = [-20, -10, -10];
let plantDir = [1, 1, -1];
let minPlantAngle = [-40,-20, -30];
let maxPlantAngle = [-10,10, 0];
let plantPosition = [[.20, .90], [.22, .91], [.21, .92]]

let canvas = null;
let parent = null;
let ctx = null;
let scale = null;

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

const changePosition = function (fish) {
    if (fish.vx != 0) {
        fish.lastVx = fish.vx;
    }
    fish.x += fish.vx / 3;
    // Change y with angle
    fish.y -= Math.tan(fish.angle * Math.PI / 180) * fish.vx;
}

const startSpinRight = function (fish) {
    if (
        fish.spinStep == 0 && fish.vx < 0
    ) {
        fish.spinStep = 1;
        fish.spinDirection = -1;
    }
}

const startSpinLeft = function (fish) {
    if (
        fish.spinStep == 0 && fish.vx > 0
    ) {
        fish.spinStep = 1;
        fish.spinDirection = -1;
    }
}

const random = function (min, max) {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     */
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const isReady = function (image) {
    // Returns whether image is ready to draw
    if (image === null || image === undefined) {
        return false;
    }
    return (image.complete && image.naturalHeight !== 0);
}

const drawBackground = function () {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#202020");
    grad.addColorStop(1, "#101010");
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawForeground = function() {
    ctx.save();
    ctx.translate(canvas.width/3, canvas.height*2.2);
    ctx.beginPath();
    ctx.arc(0,0,canvas.width*1.5,0,2*Math.PI);
    ctx.closePath();
    const grad = ctx.createRadialGradient(0, 0, canvas.width*1.2, 0, 0, canvas.width * 1.5);
    grad.addColorStop(0, '#201d15');
    grad.addColorStop(1, '#99927f');
    ctx.fillStyle=grad;
    ctx.fill();
    ctx.restore();
}

const drawFish = function (fish) {
    ctx.save();

    // Set the origin to the center of the fish (near the tail base)
    ctx.translate(fish.x, fish.y);

    // Rotate the canvas around the origin
    const rad = 2 * Math.PI - fish.angle * Math.PI / 180;
    ctx.rotate(rad);

    let image = fish.bodyImageRight;
    let tailImage = fish.tailImageRight;
    let dorsalFinImage = fish.dorsalFinImageRight;
    let pectoralFinImage = fish.pectoralFinImageRight;
    let pelvicFinImage = fish.pelvicFinImageRight;
    let analFinImage = fish.analFinImageRight;
    let tailAnimation = Math.abs(fish.tailAnimation) * fish.size;
    let dorsalFinSkew = Math.abs(fish.dorsalFinAnimation) * 2;
    let pelvicFinSkew = Math.abs(fish.pelvicFinAnimation) * 2;
    let analFinSkew = Math.abs(fish.analFinAnimation) * 2;
    let pectoralFinScale = Math.abs(fish.pectoralFinAnimation) + 1 - 0.6;
    const actual_pectoral_fin_x = (256 - fish.pectoral_fin_x) * (fish.size / 512);
    let pectoralFinTranslate = (actual_pectoral_fin_x - actual_pectoral_fin_x * pectoralFinScale) * scale;
    let right = true;
    if (fish.vx < 0) {
        image = fish.bodyImageLeft;
        tailImage = fish.tailImageLeft;
        dorsalFinImage = fish.dorsalFinImageLeft;
        pectoralFinImage = fish.pectoralFinImageLeft;
        pelvicFinImage = fish.pelvicFinImageLeft;
        analFinImage = fish.analFinImageLeft;
        pectoralFinTranslate = -pectoralFinTranslate;
        right = false;
    }

    if (fish.spinStep > 0) {
        ctx.transform(Math.abs((10.5 - fish.spinStep) * 0.1), 0, 0, 1, 0, 0)
        if (fish.spinStep == 10) {
            fish.angle = fish.angle * -1;
            fish.vx = fish.vx * -1;
            fish.lastSpin = new Date();
        }
        if (fish.spinStep >= 20) {
            fish.spinStep = 0;
        } else {
            fish.spinStep++;
        }
    }

    if (isReady(dorsalFinImage)) {
        ctx.save();

        ctx.transform(1, 0, dorsalFinSkew, 1, 0, 0)
        ctx.drawImage(
            dorsalFinImage,
            -fish.size / 2 * scale, -fish.size / 2 * scale, // x and y in the destination canvas at which to place the top-left corner of the source
            fish.size * scale, fish.size * scale
        )
        ctx.restore();
    }

    if (isReady(pelvicFinImage)) {
        ctx.save();

        ctx.transform(1, 0, pelvicFinSkew, 1, 0, 0)
        ctx.drawImage(
            pelvicFinImage,
            -fish.size / 2 * scale, -fish.size / 2 * scale, // x and y in the destination canvas at which to place the top-left corner of the source
            fish.size * scale, fish.size * scale
        )
        ctx.restore();
    }

    if (isReady(analFinImage)) {
        ctx.save();

        ctx.transform(1, 0, analFinSkew, 1, 0, 0)
        ctx.drawImage(
            analFinImage,
            -fish.size / 2 * scale, -fish.size / 2 * scale, // x and y in the destination canvas at which to place the top-left corner of the source
            fish.size * scale, fish.size * scale
        )
        ctx.restore();
    }

    if (isReady(tailImage)) {
        ctx.drawImage(
            tailImage,
            -fish.size / 2 * scale, (-(fish.size + tailAnimation) / 2) * scale,
            fish.size * scale, (fish.size + tailAnimation) * scale
        )
    }

    if (isReady(image)) {
        ctx.drawImage(
            image,
            -fish.size / 2 * scale, -fish.size / 2 * scale, // x and y in the destination canvas at which to place the top-left corner of the source
            fish.size * scale, fish.size * scale
        )
    }

    if (isReady(pectoralFinImage)) {
        ctx.save();
        ctx.transform(pectoralFinScale, 0, 0, 1, pectoralFinTranslate, 0);
        ctx.drawImage(
            pectoralFinImage,
            -fish.size / 2 * scale, -fish.size / 2 * scale, // x and y in the destination canvas at which to place the top-left corner of the source
            fish.size * scale, fish.size * scale
        )
        ctx.restore();
    }

    ctx.restore();

    if (random(0, 10) <= Math.abs(fish.vx * 2)) {
        fish.tailAnimation += 0.03;
    }
    if (fish.tailAnimation > 0.2) {
        fish.tailAnimation = fish.tailAnimation * -1;
    }

    if (random(0, 10) <= Math.abs(fish.vx * 2)) {
        fish.dorsalFinAnimation += 0.010;
    }
    if (fish.dorsalFinAnimation > 0.1) {
        fish.dorsalFinAnimation = fish.dorsalFinAnimation * -1;
    }

    if (random(0, 10) <= Math.abs(fish.vx * 2)) {
        fish.pelvicFinAnimation += 0.010;
    }
    if (fish.pelvicFinAnimation > 0.1) {
        fish.pelvicFinAnimation = fish.pelvicFinAnimation * -1;
    }
    if (random(0, 10) <= Math.abs(fish.vx * 2)) {
        fish.analFinAnimation += 0.010;
    }
    if (fish.analFinAnimation > 0.1) {
        fish.analFinAnimation = fish.analFinAnimation * -1;
    }

    if (random(0, 10) <= Math.abs(fish.vx * 2)) {
        fish.pectoralFinAnimation += 0.045;
    }
    if (fish.pectoralFinAnimation > 0.3) {
        fish.pectoralFinAnimation = fish.pectoralFinAnimation * -1;
    }

    if (
        (fish.vx > 0) &&
        (fish.x < canvas.width)
    ) {
        // If fish is going right, and has not hit the right wall
        changePosition(fish);
    } else if (
        (fish.vx < 0) &&
        (fish.x > 0)
    ) {
        // If fish is going left, and has not hit the left wall
        changePosition(fish);
    }

    // Change fish's speed if necessary
    if (
        (random(0, 100) <= fish.changeSpeedLikelihood)
    ) {
        const changeSpeed = random(-1, 1);
        if (
            ((fish.vx + changeSpeed) <= fish.maxSpeed) &&
            ((fish.vx + changeSpeed) >= (fish.maxSpeed * -1)) &&
            (((fish.vx + changeSpeed > 0) && (fish.vx > 0)) || ((fish.vx + changeSpeed < 0) && (fish.vx < 0)))
        ) {
            fish.vx += changeSpeed * scale;
        }
    }

    // Change fish's angle if necessary
    if (random(0, 100) <= fish.changeAngleLikelihood) {
        const changeAngle = random(-3, 3);
        if (
            ((fish.angle + changeAngle) <= fish.maxAngle) &&
            ((fish.angle + changeAngle) >= (fish.maxAngle * -1))
        ) {
            fish.angle += changeAngle;
        }
    }

    // Spin fish if necessary
    if (
        (fish.x + fish.vx < fish.size * scale / 2) &&
        (fish.vx < 0)
    ) {
        // If fish is going left, and is close to the left wall
        startSpinRight(fish);
    } else if (
        (fish.x + fish.vx > (canvas.width - fish.size * scale / 2)) &&
        (fish.vx > 0)
    ) {
        // If fish is going right, and is close to the right wall
        startSpinLeft(fish);
    } else if (
        (fish.vx === 0) &&
        (fish.x <= fish.size * scale / 2)
    ) {
        // If fish is stopped and close to the left wall
        startSpinRight(fish);
    } else if (
        (fish.vx === 0) &&
        (fish.x >= (canvas.width - fish.size * scale))
    ) {
        // If fish is stopped and close to the right wall
        startSpinLeft(fish);
    } else if (
        (random(0, 100) < fish.spinLikelihood) &&
        (Math.abs(new Date().getTime() - fish.lastSpin.getTime()) > fish.spinInterval)
    ) {
        // Random spin
        if (right) {
            startSpinLeft(fish);
        } else {
            startSpinRight(fish);
        }
    }

    // Check if angle adjustment is needed
    if (fish.y > (canvas.height - fish.size * scale / 2)) {
        // Near the bottom
        if (fish.vx > 0 && fish.angle < 0) {
            fish.angle += 3;
        } else if (fish.vx < 0 && fish.angle > 0) {
            fish.angle -= 3;
        }
    } else if (fish.y < fish.size * scale / 2) {
        // Near the top
        if (fish.vx > 0 && fish.angle > 0) {
            fish.angle -= 3;
        } else if (fish.vx < 0 && fish.angle < 0) {
            fish.angle += 3;
        }
    }
}

const drawFishes = function () {
    fishes.forEach(fish => {
        drawFish(fish);
    })
}

const drawBubbles = function() {
    for (let i = 0; i < bubbles.length; i++) {
        radius = i * canvas.height / 300
        ctx.save();
        ctx.translate((bubbles[i][0] * canvas.width), bubbles[i][1] * canvas.height);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0 - radius, 0, 0 + radius, 0);
        grad.addColorStop(0, 'rgba(255,255,255,0.05)');
        grad.addColorStop(1, 'rgba(255,255,255,0.01)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
        bubbles[i][0] += bubbles[i][2] * 0.0025;
        bubbles[i][1] -= Math.sqrt(i) * 0.002;
        if (bubbles[i][1] < -0.1) {
            bubbles[i][0] = Math.random() * 0.1 + 0.45;
            bubbles[i][1] = 1;
            bubbles[i][2] = Math.random() - 0.5;
        }
    }
}

const drawPlants = function() {
    for (let i = 0; i < heights.length; i++) {
        plant = plants[i]
        ctx.save();
        ctx.translate(canvas.width * plantPosition[i][0], canvas.height * plantPosition[i][1]);
        ctx.rotate((.25 * plantAngles[i]) * Math.PI / 180);
        for (let j = 0; j < plant.length; j++) {

            // draw leaves
            ctx.beginPath();
            ctx.ellipse(
                0,
                0,
                canvas.width/50,
                canvas.width/100,
                0,
                0,
                2*Math.PI
            )
            ctx.closePath();
            ctx.fillStyle = 'rgba(84, 140, 83, .8)';
            ctx.fill();
            
            // connect this node to last node
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, (-1 * .05 * canvas.height));
            ctx.closePath();
            ctx.strokeStyle = '#11450d';
            ctx.lineWidth = (plants[i].length - j) / 2;
            ctx.stroke();
            
            ctx.translate(0, (-1 * .05 * canvas.height))
            ctx.rotate(2 * plant[j][0] * Math.PI / 180);

            plants[i][j][0] = plants[i][j][0] + plants[i][j][1] * Math.random() * .01;

            if (plants[i][j][0] > 1 || plants[i][j][0] < -1) {
                plants[i][j][1] = -plants[i][j][1];
            }
        }
        if (plantAngles[i] < minPlantAngle[i]) {
            plantAngles[i] = plantAngles[i] + 0.1
            plantDir[i] = 1;
            minPlantAngle[i] = randomFloat(-40, -20);
            maxPlantAngle[i] = randomFloat(-10, 10);
        } else if (plantAngles[i] > maxPlantAngle[i]) {
            plantAngles[i] = plantAngles[i] - 0.1
            plantDir[i] = -1;
            minPlantAngle[i] = randomFloat(-40, -20);
            maxPlantAngle[i] = randomFloat(-10, 10);
        } else {
            plantAngles[i] = plantAngles[i] + 0.1 * plantDir[i]
        }
        ctx.restore();
    }
}

const draw = function () {
    drawBackground();
    drawBubbles();
    drawForeground();
    drawPlants();
    drawFishes();

    window.requestAnimationFrame(draw);
}

const initCanvas = function () {
    canvas = document.getElementById('bioFishTank');
    parent = document.getElementById('bio');

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    scale = canvas.height / 512;

    ctx = canvas.getContext('2d', { alpha: false });
}

const init = function () {
    initCanvas();

    addEventListener("resize", (event) => {
        initCanvas();
    });

    // Initialize fish images
    fishes.forEach(fish => {
        let startVx = 0;
        startVx = random(fish.maxSpeed * -1 * scale, fish.maxSpeed * scale);
        // ensure startVx is nonzero
        if (startVx == 0) {
            startVx = 1;
        }
        fish.x = random(0, canvas.width - fish.size * scale);
        fish.y = random(fish.size * scale / 2, canvas.height - fish.size * scale);
        fish.vx = startVx;
        fish.angle = random(fish.maxAngle * -1, fish.maxAngle);
        fish.bodyImageLeft = new Image();
        fish.bodyImageLeft.src = fish.body_left;
        fish.bodyImageRight = new Image();
        fish.bodyImageRight.src = fish.body_right;
        fish.tailImageLeft = new Image();
        fish.tailImageLeft.src = fish.tail_left;
        fish.tailImageRight = new Image();
        fish.tailImageRight.src = fish.tail_right;
        fish.dorsalFinImageLeft = new Image();
        fish.dorsalFinImageLeft.src = fish.dorsal_fin_left;
        fish.dorsalFinImageRight = new Image();
        fish.dorsalFinImageRight.src = fish.dorsal_fin_right;
        fish.pectoralFinImageLeft = new Image();
        fish.pectoralFinImageLeft.src = fish.pectoral_fin_left;
        fish.pectoralFinImageRight = new Image();
        fish.pectoralFinImageRight.src = fish.pectoral_fin_right;
        fish.pelvicFinImageLeft = new Image();
        fish.pelvicFinImageLeft.src = fish.pelvic_fin_left;
        fish.pelvicFinImageRight = new Image();
        fish.pelvicFinImageRight.src = fish.pelvic_fin_right;
        fish.analFinImageLeft = new Image();
        fish.analFinImageLeft.src = fish.anal_fin_left;
        fish.analFinImageRight = new Image();
        fish.analFinImageRight.src = fish.anal_fin_right;
    });

    window.requestAnimationFrame(draw);
}
