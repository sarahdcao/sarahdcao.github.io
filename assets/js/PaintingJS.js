var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;
var isDrawingB, points=[];
var defaultW = 4;
ctx.shadowBlur = 0;
ctx.shadowColor = 'rgb(0, 0, 0)';

var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 100);

ctx.fillStyle = "#FFFFFF";

//time-based brushes
var clientX, clientY, timeout;
var density = 20;
var radiusSize = 20;

//basic state
var drawingMode = Object.freeze({ "draw": 1, "picker": 2, "select": 3, "timebased": 4, "pointB": 5 });
var drawingState = drawingMode.draw;

//type of pen if drawing
var drawType = Object.freeze({ "classic": 1, "pen1": 2, "eraser": 3 });
var pen = drawType.classic;

//type of spray if spraying
var sprayType = Object.freeze({ "classic": 1, "opacity": 2, "rect": 3, "rectOpacity": 4 });
var spray = sprayType.classic;



ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 600, 300);



ctx.fillStyle = "#000000";
ctx.strokeRect(550, 0, 50, 300);
ctx.strokeRect(550, 0, 50, 300);
ctx.strokeRect(550, 0, 50, 300);
ctx.fillRect(550, 0, 50, 50);
ctx.fillRect(550, 250, 50, 50);

ctx.fillStyle = "#FF0000"; //red
ctx.fillRect(550, 50, 50, 50);

ctx.fillStyle = "#FFFF00"; //yellow
ctx.fillRect(550, 100, 50, 50);

ctx.fillStyle = "#0000FF"; //blue
ctx.fillRect(550, 150, 50, 50);

ctx.fillStyle = "#00FF00"; //green
ctx.fillRect(550, 200, 50, 50);
ctx.fillStyle = "#000000";

ctx.lineWidth = 4;
ctx.lineJoin = ctx.lineCap = 'round';

el.onmousedown = function (e) {
    switch (drawingState) {
        case drawingMode.draw:
            if (isDrawing != true) {
                ctx.beginPath();
            }
            isDrawing = true;

            ctx.moveTo(event.offsetX, event.offsetY);
            break;
        case drawingMode.select:
            break;
        case drawingMode.picker:
            pickColor();
            drawingState = drawingMode.draw;
            break;
        case drawingMode.timebased:
            clientX = event.offsetX;
            clientY = event.offsetY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--;) {
                    var angle = getRandomFloat(0, Math.PI * 2);
                    var radius = getRandomFloat(0, radiusSize);
                    switch (spray) {
                        case sprayType.classic:
                            ctx.fillRect(
                              clientX + radius * Math.cos(angle),
                              clientY + radius * Math.sin(angle),
                              1, 1);
                            break;
                        case sprayType.opacity:
                            ctx.globalAlpha = Math.random();
                            ctx.fillRect(
                              clientX + radius * Math.cos(angle),
                              clientY + radius * Math.sin(angle),
                              getRandomFloat(1, 2), getRandomFloat(1, 2));
                            break;
                        case sprayType.rect:
                            var rad = 30;
                            var offX = getRandomInt(-rad, rad);
                            var offY = getRandomInt(-rad, rad);
                            ctx.fillRect(clientX + offX, clientY + offY, 1, 1);
                            break;
                        case sprayType.rectOpacity:
                            var rad = 30;
                            var offX = getRandomInt(-rad, rad);
                            var offY = getRandomInt(-rad, rad);
                            ctx.globalAlpha = Math.random();
                            ctx.fillRect(clientX + offX, clientY + offY, 1, 1);
                            break;
                        default:
                            break;
                    }
                }
                if (!timeout) return;
                timeout = setTimeout(draw, 50);
            }, 50);
            ctx.globalAlpha = 1;
            break;
        case drawingMode.pointB:
            isDrawingB = true;
            ctx.moveTo(event.offsetX, event.offsetY);
            break;
        default:
            break;
    }
    if (e.x > 550) {
        pickColor();
        select = false;
    }
};

el.onmousemove = function (e) {
    if (e.x < 550) { //anything to the right of 550 is color picker + etc
        switch (drawingState) {
            case drawingMode.draw:
                if (isDrawing) {
                    ctx.lineTo(event.offsetX, event.offsetY);

                    switch (pen) {
                        case drawType.pen1:
                            ctx.lineWidth = defaultW + getRandomInt(2, 5);
                            break;
                        case drawType.eraser:
                            ctx.strokeStyle = "#FFFFFF";
                            break;
                        case drawType.timebased:
                            clientX = event.offsetX;
                            clientY = event.offsetY;
                            break;
                        default:
                            break;
                    }
                    ctx.stroke();
                }
                break;
            case drawingMode.timebased:
                clientX = event.offsetX;
                clientY = event.offsetY;
                break;
            case drawingMode.pointB:
                if (!isDrawingB) return;

                //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                points.push({ x: event.offsetX, y: event.offsetY });

                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.stroke();
                break;
            default:
                break;
        }
    }
};

el.onmouseup = function () {
    switch (drawingState) {
        case drawingMode.draw:
            if (isDrawing) {
                ctx.closePath();
            }
            isDrawing = false;
            break;
        case drawingMode.timebased:
            clearTimeout(timeout);
            break;
        case drawingMode.pointB:
            isDrawingB = false;
            points.length = 0;
            break;
        default:
            break;
    }
};

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    switch (keyName) {
        case 'e':
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 15;
            pen = drawType.classic;
            break;
        case 'b':
            drawingState = drawingMode.draw;
            pen = drawType.classic;

            var pixel = ctx.getImageData(555, 295, 1, 1).data;
            ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
            defaultW = 4;
            ctx.lineWidth = defaultW;
            break;
        case 'c':
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, 500, 300);
            break;
        case 'p':
            drawingState = drawingMode.picker;
            break;
        case 'v':
            drawingState = drawingMode.draw;
            pen = drawType.pen1;
            break;
        case '+':
            switch (drawingState) {
                case drawingMode.draw:
                    defaultW++;
                    ctx.lineWidth = defaultW;
                    break;
                case drawingMode.timebased:
                    radiusSize++;
                    break;
                default:
                    break;
            }
            break;
        case '-':
            switch (drawingState) {
                case drawingMode.draw:
                    if (defaultW > 0) {
                        defaultW--;
                        ctx.lineWidth = defaultW;
                    }
                    break;
                case drawingMode.timebased:
                    if (radiusSize > 0) {
                        radiusSize--;
                    }
                    break;
                default:
                    break;
            }
            break;
        case '1':
            drawingState = drawingMode.timebased;
            spray = sprayType.classic;
            break;
        case '2':
            drawingState = drawingMode.timebased;
            spray = sprayType.opacity;
            break;
        case '3':
            drawingState = drawingMode.timebased;
            spray = sprayType.rect;
            break;
        case '4':
            drawingState = drawingMode.timebased;
            spray = sprayType.rectOpacity;
            break;
        case 'q':
            drawingState = drawingMode.pointB;
            break;
        case 's':
            var pixel = ctx.getImageData(555, 295, 1, 1).data;
            ctx.shadowColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
            if (ctx.shadowBlur == 0) {
                ctx.shadowBlur = 10;
            } else {
                ctx.shadowBlur = 0;
            }
            break;
        default:
            break;
    }
    /**
    if (keyName == 'e') {
        ctx.lineWidth = 15;
        pen = drawType.classic;
    }
    if (keyName == 'b') {
        var pixel = ctx.getImageData(555, 295, 1, 1).data;
        ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
        pen = drawType.classic;
        defaultW = 4;
        ctx.lineWidth = defaultW;
    }
    if (keyName == 'c') {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 300);
    }
    if (keyName == 'p') {
        drawingState = drawingMode.picker;
    }
    if (keyName == 'v') {
        drawingState = drawingMode.draw;

        pen = drawType.pen1;
    }
    if (keyName == '+') {
        defaultW++;
        ctx.lineWidth = defaultW;
    }
    if (keyName == '-') {
        if (defaultW > 0) {
            defaultW--;
            ctx.lineWidth = defaultW;
        }
    }
    **/
});

//fix this later!!!!!

function drawPixels(x, y) {
    for (var i = -10; i < 10; i += 4) {
        for (var j = -10; j < 10; j += 4) {
            if (Math.random() > 0.5) {
                ctx.fillStyle = ['red', 'orange', 'yellow', 'green',
                                 'light-blue', 'blue', 'purple'][getRandomInt(0, 6)];
                ctx.fillRect(x + i, y + j, 4, 4);
            }
        }
    }
}

function pickColor() {
    var pixel = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
    ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(550, 250, 50, 50);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

function drawCircle(x, y) {
    var length = 15;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();

    
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}