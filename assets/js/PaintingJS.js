var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;
var select = false;
var pen = false;
var defaultW = 4;

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

el.onmousedown = function (e) {
    if (isDrawing != true) {
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineJoin = ctx.lineCap = 'round';
    //ctx.moveTo(e.clientX, e.clientY);
    //ctx.moveTo(e.layerX, e.layerY);
    ctx.moveTo(event.offsetX, event.offsetY);
    if (select) {
        var pixel = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
        ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(550, 250, 50, 50);
        select = false;
    }
    if (e.x > 550) {
        var pixel = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
        ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(550, 250, 50, 50);
        select = false;
    }
};

el.onmousemove = function (e) {
    if (isDrawing && e.x <= 550 && select == false) {
        //ctx.lineTo(e.clientX, e.clientY);
        //ctx.lineTo(e.layerX, e.layerY);
        ctx.lineTo(event.offsetX, event.offsetY);
        if (pen == true) {
            ctx.lineWidth = defaultW + getRandomInt(2, 5);
        }
        ctx.stroke();
    }
};

el.onmouseup = function () {
    if (isDrawing) {
        ctx.closePath();
    }
    isDrawing = false;
};

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == 'e') {
        ctx.strokeStyle = "#FFFFFF";
        defaultW = 15;
        ctx.lineWidth = defaultW;
    }
    if (keyName == 'b') {
        var pixel = ctx.getImageData(555, 295, 1, 1).data;
        ctx.strokeStyle = rgbToHex(pixel[0], pixel[1], pixel[2]);
        defaultW = 4;
        ctx.lineWidth = defaultW;
    }
    if (keyName == 'c') {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 300);
    }
    if (keyName == 'p') {
        select = true;
    }
    if (keyName == 'v') {
        pen = true;
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
});

//fix this later!!!!!
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