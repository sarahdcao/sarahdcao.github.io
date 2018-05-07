//sourceURL=pen.js
var el = document.getElementById('DrawingSpace');
var ctx = el.getContext('2d');
var isDrawing, lastPoint;
var radius = 15;
var startingStroke = true;
var points = [];
var clientX, clientY, timeout;
var density = 50;
var imageData;
var data;

function draw(){
    el.onmousedown = function(e) {
        
        //run a switch statement to select which brushes' onmousedown to apply
        switch(parseInt(document.getElementById("brushSelected").value, 10))
        {
            case 1: //simple pencil
                SimplePencil_onmousedown(e);
                break;
            case 2: //smooth connections
                SmoothConnections_onmousedown(e);
                break; 
            case 3: //smooth connections with shadowing effect
                EdgeSmoothingWithShadows_onmousedown(e);
                break;
            case 4: //dry brush
                DryBrush_onmousedown(e);
                break;
            case 5: //point - based with shadows
                PointBasedApproach_onmousedown(e);
                break;
            case 6: //edge smoothing with radial gradient
                PointBasedWithShadows_onmousedown(e);
                break;
            case 7: //bezier curves
                EdgeSmoothingWithRadialGradient_onmousedown(e);
                break;
            case 8: //brush, fur, pen
                BezierCurves_onmousedown(e);
                break;
            case 11: //multiple strokes
                PenVariableSegmentWidth_onmousedown(e);
                break;
            case 12: //thick brush
                PenMultipleStrokes_onmousedown(e);
                break;
            case 13: //"sliced" strokes
                ThickBrush_onmousedown(e);
                break;
            case 14: //"sliced" strokes with opacity
                SlicedStrokes_onmousedown(e);
                break;
            case 15: //multiple lines
                SlicedStrokesWithOpacity_onmousedown(e);
                break;
            case 16: //multiple lines with opacity
                MultipleLines_onmousedown(e);
                break;
            case 17: //stamp-like
                MultipleLinesWithOpacity_onmousedown(e);
                break;
            case 18: //trail effect
                StampLikeBasic_onmousedown(e);
                break;
            case 19: //random radius, opacity
                StampLikeTrailEffect_onmousedown(e);
                break;
            case 20: //shapes
                RandomRadiusOpacity_onmousedown(e);
                break;
            case 21: //shapes with rotation
                Stars_onmousedown(e);
                break;
            case 22: //randomize everything
                StarsWithRotation_onmousedown(e);
                break;
            case 23: //collored pixels
                RandomizeEverything_onmousedown(e);
                break;
            case 24: //spray
                ColoredPixels_onmousedown(e);
                break;
            case 25: //time-based spray
                Spray1_onmousedown(e);
                break;
            case 26: //Time-based spray with round distribution
                TimeBasedSpray_onmousedown(e);
                break;
            case 27: //randomizing dots
                TimeBasedSprayWithRoundDistribution_onmousedown(e);
                break;
            case 28: //Neighbor points connection
                RandomizingDots_onmousedown(e);
                break; 
            case 29: //Eraser Brush
                Eraser_onmousedown(e);
                break; 
            case 30: //blur Brush
                Blur_onmousedown(e);
                break; 
            case 31: //smudge Brush
                Smudge_onmousedown(e);
                break; 
            case 32: //smudge Brush
                Blend_onmousedown(e);
                break;
            default:
                SimplePencil_onmousedown(e);
                break;
        }
    };
    el.onmousemove = function(e) {
        
        //run a switch statement to select which brushes' onmousemove to apply
        switch(parseInt(document.getElementById("brushSelected").value, 10))
        {
            case 1: //simple pencil
                SimplePencil_onmousemove(e);
                break;
            case 2: //smooth connections
                SmoothConnections_onmousemove(e);
                break; 
            case 3: //point - based approach
                EdgeSmoothingWithShadows_onmousemove(e);
                break;
            case 4: //point - based approach
                DryBrush_onmousemove(e);
                break;
            case 5: //point - based with shadows
                PointBasedApproach_onmousemove(e);
                break;
            case 6: //edge smoothing with radial gradient
                PointBasedWithShadows_onmousemove(e);
                break;
            case 7: //bezier curves
                EdgeSmoothingWithRadialGradient_onmousemove(e);
                break;
            case 8: //brush, fur, pen
                BezierCurves_onmousemove(e);
                break;
            case 11: //multiple strokes
                PenVariableSegmentWidth_onmousemove(e);
                break;
            case 12: //thick brush
                PenMultipleStrokes_onmousemove(e);
                break;
            case 13: //"sliced" strokes
                ThickBrush_onmousemove(e);
                break;
            case 14: //"sliced" strokes with opacity
                SlicedStrokes_onmousemove(e);
                break;
            case 15: //multiple lines
                SlicedStrokesWithOpacity_onmousemove(e);
                break;
            case 16: //multiple lines with opacity
                MultipleLines_onmousemove(e);
                break;
            case 17: //stamp-like
                MultipleLinesWithOpacity_onmousemove(e);
                break;
            case 18: //trail effect
                StampLikeBasic_onmousemove(e);
                break;
            case 19: //random radius, opacity
                StampLikeTrailEffect_onmousemove(e);
                break;
            case 20: //shapes
                RandomRadiusOpacity_onmousemove(e);
                break;
            case 21: //shapes with rotation
                Stars_onmousemove(e);
                break;
            case 22: //randomize everything
                StarsWithRotation_onmousemove(e);
                break;
            case 23: //collored pixels
                RandomizeEverything_onmousemove(e);
                break;
            case 24: //spray
                ColoredPixels_onmousemove(e);
                break;
            case 25: //time-based spray
                Spray1_onmousemove(e);
                break;
            case 26: //Time-based spray with round distribution
                TimeBasedSpray_onmousemove(e);
                break;
            case 27: //randomizing dots
                TimeBasedSprayWithRoundDistribution_onmousemove(e);
                break;
            case 28: //Neighbor points connection
                RandomizingDots_onmousemove(e);
                break; 
            case 29: //Eraser Brush
                Eraser_onmousemove(e);
                break; 
            case 30: //blur Brush
                Blur_onmousemove(e);
                break; 
            case 31: //smudge Brush
                Smudge_onmousemove(e);
                break; 
            case 32: //smudge Brush
                Blend_onmousemove(e);
                break;
            default:
                SimplePencil_onmousemove(e);
                break;
        }
    };
    el.onmouseup = function() {
        
        //run a switch statement to select which brushes' onmouseup to apply
        switch(parseInt(document.getElementById("brushSelected").value, 10))
        {
            case 1: //simple pencil
                SimplePencil_onmouseup();
                break;
            case 2: //smooth connections
                SmoothConnections_onmouseup();
                break;
            case 3: //point - based approach
                EdgeSmoothingWithShadows_onmouseup();
                break;
            case 4: //point - based approach
                DryBrush_onmouseup();
                break;
            case 5: //point - based with shadows
                PointBasedApproach_onmouseup();
                break;
            case 6: //edge smoothing with radial gradient
                PointBasedWithShadows_onmouseup();
                break;
            case 7: //bezier curves
                EdgeSmoothingWithRadialGradient_onmouseup();
                break;
            case 8: //brush, fur, pen
                BezierCurves_onmouseup();
                break;
            case 11: //multiple strokes
                PenVariableSegmentWidth_onmouseup();
                break;
            case 12: //thick brush
                PenMultipleStrokes_onmouseup();
                break;
            case 13: //"sliced" strokes
                ThickBrush_onmouseup();
                break;
            case 14: //"sliced" strokes with opacity
                SlicedStrokes_onmouseup();
                break;
            case 15: //multiple lines
                SlicedStrokesWithOpacity_onmouseup();
                break;
            case 16: //multiple lines with opacity
                MultipleLines_onmouseup();
                break;
            case 17: //stamp-like
                MultipleLinesWithOpacity_onmouseup();
                break;
            case 18: //trail effect
                StampLikeBasic_onmouseup();
                break;
            case 19: //random radius, opacity
                StampLikeTrailEffect_onmouseup();
                break;
            case 20: //shapes
                RandomRadiusOpacity_onmouseup();
                break;
            case 21: //shapes with rotation
                Stars_onmouseup();
                break;
            case 22: //randomize everything
                StarsWithRotation_onmouseup();
                break;
            case 23: //collored pixels
                RandomizeEverything_onmouseup();
                break;
            case 24: //spray
                ColoredPixels_onmouseup();
                break;
            case 25: //time-based spray
                Spray1_onmouseup();
                break;
            case 26: //Time-based spray with round distribution
                TimeBasedSpray_onmouseup();
                break;
            case 27: //randomizing dots
                TimeBasedSprayWithRoundDistribution_onmouseup();
                break;
            case 28: //Neighbor points connection
                RandomizingDots_onmouseup();
                break; 
            case 29: //Eraser Brush
                Eraser_onmouseup();
                break; 
            case 30: //blur Brush
                Blur_onmouseup();
                break; 
            case 31: //smudge Brush
                Smudge_onmouseup();
                break; 
            case 32: //smudge Brush
                Blend_onmouseup();
                break;
            default:
                SimplePencil_onmouseup();
                break;
        }
    };
}

function changeBrush(brushNumber)
{
    document.getElementById("brushSelected").value = (brushNumber);
    resetContextSettings();
}

//some ctx values are being set, but they need to be reset after a brush is switched
function resetContextSettings()
{
    ctx.shadowBlur = 0;
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

function getRandomInt(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function drawStar1(x, y, l) {
  var length = l;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rotate((Math.PI * 1 / 10));
  for (var i = 5; i--;) {
    ctx.lineTo(0, length);
    ctx.translate(0, length);
    ctx.rotate((Math.PI * 2 / 10));
    ctx.lineTo(0, -length);
    ctx.translate(0, -length);
    ctx.rotate(-(Math.PI * 6 / 10));
  }
  ctx.lineTo(0, length);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawStar2(x, y, l, angle) {
  var length = l;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rotate(Math.PI / 180 * angle);
  for (var i = 5; i--;) {
    ctx.lineTo(0, length);
    ctx.translate(0, length);
    ctx.rotate((Math.PI * 2 / 10));
    ctx.lineTo(0, -length);
    ctx.translate(0, -length);
    ctx.rotate(-(Math.PI * 6 / 10));
  }
  ctx.lineTo(0, length);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawStar(options, l) {
  var length = l;
  ctx.save();
  ctx.translate(options.x, options.y);
  ctx.beginPath();
  ctx.globalAlpha = options.opacity;
  ctx.rotate(Math.PI / 180 * options.angle);
  ctx.scale(options.scale, options.scale);
  ctx.strokeStyle = options.color;
  ctx.lineWidth = options.width;
  for (var i = 5; i--;) {
    ctx.lineTo(0, length);
    ctx.translate(0, length);
    ctx.rotate((Math.PI * 2 / 10));
    ctx.lineTo(0, -length);
    ctx.translate(0, -length);
    ctx.rotate(-(Math.PI * 6 / 10));
  }
  ctx.lineTo(0, length);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function addRandomPoint(e) {
  points.push({ 
    x: e.clientX - el.offsetLeft, 
    y: e.clientY - el.offsetTop, 
    angle: getRandomInt(0, 180),
    width: getRandomInt(1,10),
    opacity: Math.random(),
    scale: getRandomInt(1, 20) / 10,
    color: ('rgb('+getRandomInt(0,255)+','+getRandomInt(0,255)+','+getRandomInt(0,255)+')')
  });
}

function drawPixels(x, y) {
  for (var i = -10; i < 10; i+= 4) {
    for (var j = -10; j < 10; j+= 4) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 
                         'light-blue', 'blue', 'purple'][getRandomInt(0,6)];
        ctx.fillRect(x+i, y+j, 4, 4);
      }
    }
  }
}

//these are the brushes
//onmousedown functions --------------------------------------------------------

function SimplePencil_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
}

function SmoothConnections_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
}

function DryBrush_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    density = 15;
}

function EdgeSmoothingWithShadows_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.shadowBlur = document.getElementById("brushSizeNumberForm").value;
    ctx.shadowColor = 'rgb(0, 0, 0)';
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
}

function PointBasedApproach_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
}

function PointBasedWithShadows_onmousedown(e)//6
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.shadowBlur = document.getElementById("brushSizeNumberForm").value;
    ctx.shadowColor = 'rgb(0, 0, 0)';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
}

function EdgeSmoothingWithRadialGradient_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    radius = document.getElementById("brushSizeNumberForm").value;
}

function BezierCurves_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
}

function PenVariableSegmentWidth_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    points.push({ 
      x: e.clientX - el.offsetLeft, 
      y: e.clientY - el.offsetTop,
      width: getRandomInt(0, document.getElementById("brushSizeNumberForm").value)
    });
}

function PenMultipleStrokes_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function ThickBrush_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'butt';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function SlicedStrokes_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function SlicedStrokesWithOpacity_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function MultipleLines_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
}

function MultipleLinesWithOpacity_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
}

function StampLikeBasic_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.strokeStyle = "#000000";
    radius = document.getElementById("brushSizeNumberForm").value;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
}

function StampLikeTrailEffect_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.strokeStyle = "#000000";
    radius = document.getElementById("brushSizeNumberForm").value;
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function RandomRadiusOpacity_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    radius = document.getElementById("brushSizeNumberForm").value;
    points.push({ 
      x: e.clientX - el.offsetLeft, 
      y: e.clientY - el.offsetTop,
      radius: getRandomInt(1, document.getElementById("brushSizeNumberForm").value),
      opacity: Math.random()
    });
}

function Stars_onmousedown(e)
{
    isDrawing = true;
    radius = document.getElementById("brushSizeNumberForm").value;
    ctx.lineWidth = 1;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop, l: radius });
}

function StarsWithRotation_onmousedown(e)
{
    isDrawing = true;
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    radius = document.getElementById("brushSizeNumberForm").value;
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop, l: document.getElementById("brushSizeNumberForm").value, angle: getRandomInt(0, 180) });
}

function RandomizeEverything_onmousedown(e)
{
    isDrawing = true;
    addRandomPoint(e);
}

function ColoredPixels_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineJoin = ctx.lineCap = 'round';
    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function Spray1_onmousedown(e)
{
    if(!isDrawing){
        ctx.beginPath();
    }
    isDrawing = true;
    ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
    ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    density = 50;
}

function TimeBasedSpray_onmousedown(e)
{
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;
    density = 50;

    timeout = setTimeout(function spray() {
      for (var i = density; i--; ) {
        var radius = 30;
        var offsetX = getRandomInt(-radius, radius);
        var offsetY = getRandomInt(-radius, radius);
        ctx.fillRect(clientX + offsetX, clientY + offsetY, 1, 1);
      }
      if (!timeout) return;
      timeout = setTimeout(spray, 50);
    }, 50);
}

function TimeBasedSprayWithRoundDistribution_onmousedown(e)
{
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;
    density = 50;

    timeout = setTimeout(function spray() {
      for (var i = density; i--; ) {
        var angle2 = getRandomFloat(0, Math.PI*2);
        var radius2 = getRandomFloat(0, 20);
        ctx.fillRect(
          clientX + radius2 * Math.cos(angle2),
          clientY + radius2 * Math.sin(angle2), 
          1, 1);
      }
      if (!timeout) return;
      timeout = setTimeout(spray, 50);
    }, 50);
}

function RandomizingDots_onmousedown(e)
{
    density = 40;
    ctx.fillStyle = document.getElementById("RGBLabel").innerHTML;
    ctx.lineJoin = ctx.lineCap = 'round';
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;

    timeout = setTimeout(function spray() {
      for (var i = density; i--; ) {
        var angle = getRandomFloat(0, Math.PI * 2);
        var radius = getRandomFloat(0, 30);
        ctx.globalAlpha = Math.random();
        ctx.fillRect(
          clientX + radius * Math.cos(angle),
          clientY + radius * Math.sin(angle), 
          getRandomFloat(1, 2), getRandomFloat(1, 2));
      }
      if (!timeout) return;
      timeout = setTimeout(spray, 50);
    }, 50);
}

function Eraser_onmousedown(e)
{
    isDrawing = true;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    radius = document.getElementById("brushSizeNumberForm").value;
}

function Blur_onmousedown(e){
    isDrawing = true;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    radius = document.getElementById("brushSizeNumberForm").value;
    if(radius < 4){
        radius = 5;
    }
}

function Smudge_onmousedown(e){
    isDrawing = true;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    radius = document.getElementById("brushSizeNumberForm").value;
    
    //grab the image data at the current moise location
    imageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
    data = imageData.data;
}

function Blend_onmousedown(e){
    isDrawing = true;
    ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    radius = document.getElementById("brushSizeNumberForm").value;
    
    imageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
    data = imageData.data;
}

//onmousemove functions --------------------------------------------------------

function SimplePencil_onmousemove(e)
{
    if (isDrawing) {
        ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
        ctx.stroke();
    }
}

function SmoothConnections_onmousemove(e)
{
    if (isDrawing) {
        ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
        ctx.stroke();
    }
}

function EdgeSmoothingWithShadows_onmousemove(e)
{
    if (isDrawing) {
        ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
        ctx.stroke();
  }
}

function DryBrush_onmousemove(e)
{
    if (isDrawing) {
        for (var i = density; i--; ) {
            var radius = 30;
            var offsetX = getRandomInt(-radius, radius);
            var offsetY = getRandomInt(-radius, radius);
            ctx.fillRect(e.clientX - el.offsetLeft + offsetX, e.clientY - el.offsetTop + offsetY, 1, 1);
        }
    }
}

function PointBasedApproach_onmousemove(e)
{
    if (!isDrawing) return;

    //if this line below is active, it cause subsequent lines to "erase" (cover up) past lines
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function PointBasedWithShadows_onmousemove(e)
{
    if (!isDrawing) return;

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function EdgeSmoothingWithRadialGradient_onmousemove(e)
{
    if (isDrawing) {
    var radgrad = ctx.createRadialGradient(
      e.clientX - el.offsetLeft, e.clientY - el.offsetTop, radius/2, e.clientX - el.offsetLeft, e.clientY - el.offsetTop, radius);
    
    radgrad.addColorStop(0, '#000');
    radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radgrad;
    
    ctx.fillRect(e.clientX - el.offsetLeft - radius, e.clientY - el.offsetTop - radius, radius*2, radius*2);
  }
}

function BezierCurves_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var p1 = points[0];
    var p2 = points[1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var midPoint = midPointBtw(p1, p2);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function PenVariableSegmentWidth_onmousemove(e)
{
    if (!isDrawing) return;

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    points.push({ 
      x: e.clientX - el.offsetLeft, 
      y: e.clientY - el.offsetTop,
      width: getRandomInt(0, document.getElementById("brushSizeNumberForm").value)
    });

    for (var i = 1; i < points.length; i++) {
      ctx.beginPath();
      ctx.moveTo(points[i-1].x, points[i-1].y);
      ctx.lineWidth = points[i].width;
      ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
}

function PenMultipleStrokes_onmousemove(e)
{
    if (!isDrawing) return;

    ctx.beginPath();

    ctx.moveTo(lastPoint.x - getRandomInt(0, radius), lastPoint.y - getRandomInt(0, radius));
    ctx.lineTo(e.clientX - el.offsetLeft - getRandomInt(0, radius), e.clientY - el.offsetTop - getRandomInt(0, radius));
    ctx.stroke();

    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    ctx.stroke();

    ctx.moveTo(lastPoint.x + getRandomInt(0, radius), lastPoint.y + getRandomInt(0, radius));
    ctx.lineTo(e.clientX - el.offsetLeft + getRandomInt(0, radius), e.clientY - el.offsetTop + getRandomInt(0, radius));
    ctx.stroke();

    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function ThickBrush_onmousemove(e)
{
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    ctx.stroke();

    ctx.moveTo(lastPoint.x - radius, lastPoint.y - radius);
    ctx.lineTo(e.clientX - el.offsetLeft - radius, e.clientY - el.offsetTop - radius);
    ctx.stroke();

    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function SlicedStrokes_onmousemove(e)
{
    if (!isDrawing) return;

    ctx.beginPath();

    ctx.globalAlpha = 1;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    ctx.stroke();

    ctx.moveTo(lastPoint.x - radius*2, lastPoint.y - radius*2);
    ctx.lineTo(e.clientX - el.offsetLeft - radius*2, e.clientY - el.offsetTop - radius*2);
    ctx.stroke();

    ctx.moveTo(lastPoint.x - radius, lastPoint.y - radius);
    ctx.lineTo(e.clientX - el.offsetLeft - radius, e.clientY - el.offsetTop - radius);
    ctx.stroke();

    ctx.moveTo(lastPoint.x + radius*2 - radius, lastPoint.y + radius*2 - radius);
    ctx.lineTo(e.clientX - el.offsetLeft + radius*2 - radius, e.clientY - el.offsetTop + radius*2 - radius);
    ctx.stroke();

    ctx.moveTo(lastPoint.x + radius*2, lastPoint.y + radius*2);
    ctx.lineTo(e.clientX - el.offsetLeft + radius*2, e.clientY - el.offsetTop + radius*2);
    ctx.stroke();

    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function SlicedStrokesWithOpacity_onmousemove(e)
{
    if (!isDrawing) return;

    ctx.beginPath();

    ctx.globalAlpha = 1;
    ctx.moveTo(lastPoint.x - radius*2, lastPoint.y - radius*2);
    ctx.lineTo(e.clientX - el.offsetLeft - radius*2, e.clientY - el.offsetTop - radius*2);
    ctx.stroke();

    ctx.globalAlpha = 0.8;
    ctx.moveTo(lastPoint.x - radius, lastPoint.y - radius);
    ctx.lineTo(e.clientX - el.offsetLeft - radius, e.clientY - el.offsetTop - radius);
    ctx.stroke();

    ctx.globalAlpha = 0.6;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
    ctx.stroke();

    ctx.globalAlpha = 0.4;
    ctx.moveTo(lastPoint.x + radius*2 - radius, lastPoint.y + radius*2 - radius);
    ctx.lineTo(e.clientX - el.offsetLeft + radius*2 - radius, e.clientY - el.offsetTop + radius*2 - radius);
    ctx.stroke();
    
    ctx.globalAlpha = 0.2;
    ctx.moveTo(lastPoint.x + radius*2, lastPoint.y + radius*2);
    ctx.lineTo(e.clientX - el.offsetLeft + radius*2, e.clientY - el.offsetTop + radius*2);
    ctx.stroke();

    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function MultipleLines_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    stroke(offsetPoints(-radius*2));
    stroke(offsetPoints(-radius));
    stroke(points);
    stroke(offsetPoints(radius*2 - radius));
    stroke(offsetPoints(radius*2));
  };

function MultipleLinesWithOpacity_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.globalAlpha = 1;
    stroke(offsetPoints(-radius*2));
    ctx.globalAlpha = 0.8;
    stroke(offsetPoints(-radius));
    ctx.globalAlpha = 0.6;
    stroke(points);
    ctx.globalAlpha = 0.4;
    stroke(offsetPoints(radius*2 - radius));
    ctx.globalAlpha = 0.2;
    stroke(offsetPoints(radius*2));
  };

  function offsetPoints(val) {
    var offsetPoints = [ ];
    for (var i = 0; i < points.length; i++) {
      offsetPoints.push({ 
        x: points[i].x + val,
        y: points[i].y + val
      });
    }
    return offsetPoints;
  }

  function stroke(points) {
    var p1 = points[0];
    var p2 = points[1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var midPoint = midPointBtw(p1, p2);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function StampLikeBasic_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, radius, false, Math.PI * 2, false);
      ctx.fill();
      ctx.stroke();
    }
}

function StampLikeTrailEffect_onmousemove(e)
{
    if (!isDrawing) return;
  
    var currentPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);

    for (var i = 0; i < dist; i+=5) {
      x = lastPoint.x + (Math.sin(angle) * i) - radius;
      y = lastPoint.y + (Math.cos(angle) * i) - radius;
      ctx.beginPath();
      ctx.arc(x+(radius/2), y+(radius/2), radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    lastPoint = currentPoint;
}

function RandomRadiusOpacity_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ 
      x: e.clientX - el.offsetLeft, 
      y: e.clientY - el.offsetTop,
      radius: getRandomInt(5, 20),
      opacity: Math.random()
    });

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.globalAlpha = points[i].opacity;
      ctx.arc(
        points[i].x, points[i].y, points[i].radius, 
        false, Math.PI * 2, false);
      ctx.fill();
    }
}

function Stars_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop });

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < points.length; i++) {
      drawStar1(points[i].x, points[i].y, radius);
    }
}

function StarsWithRotation_onmousemove(e)
{
    if (!isDrawing) return;
  
    points.push({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop, angle: getRandomInt(0, 180) });

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < points.length; i++) {
      drawStar2(points[i].x, points[i].y, radius, points[i].angle);
    }
}

function RandomizeEverything_onmousemove(e)
{
    if (!isDrawing) return;
  
    addRandomPoint(e);

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < points.length; i++) {
      drawStar(points[i], radius);
    }
}

function ColoredPixels_onmousemove(e)
{
    if (!isDrawing) return;
  
    drawPixels(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);

    lastPoint = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
}

function Spray1_onmousemove(e)
{
    if (isDrawing) {
    for (var i = density; i--; ) {
      var radius = 20;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      ctx.fillRect(e.clientX - el.offsetLeft + offsetX, e.clientY - el.offsetTop + offsetY, 1, 1);
    }
  }
}

function TimeBasedSpray_onmousemove(e)
{
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;
}

function TimeBasedSprayWithRoundDistribution_onmousemove(e)
{
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;
}

function RandomizingDots_onmousemove(e)
{
    clientX = e.clientX - el.offsetLeft;
    clientY = e.clientY - el.offsetTop;
}

function Eraser_onmousemove(e)
{
    if(isDrawing){
        imageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
        data = imageData.data;
        for(var i = 0; i < data.length; i += 4)
        {
            //lower alpha value of each pixel
            data[i + 3] -= 255;
        }
        ctx.putImageData(imageData, e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2));
    }
}

function Blur_onmousemove(e){
    if(isDrawing){
        //get the image data to blur
        imageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
        data = imageData.data;
        
        //use the temp canvas to apply a blur effect
        var tempCanvas = document.getElementById("imageBox");
        var tempContext = tempCanvas.getContext('2d');
        tempContext.putImageData(imageData, 0, 0);
        
        //apply gausian blur
        var filterCanvas = document.getElementById("filterBox");
        var filterContext = filterCanvas.getContext('2d');
        filterContext.filter = 'blur(1px)';
        filterContext.drawImage(tempCanvas, 0, 0);
        
        //retrieve blurred image
        var filteredImageData = filterContext.getImageData(2, 2, radius-4, radius-4);
        
        //put blurred data back into the original image
        ctx.putImageData(filteredImageData, e.clientX - el.offsetLeft - (radius/2) + 2, e.clientY - el.offsetTop - (radius/2) + 2);
        
        imageData = null;
        data = null;
        //clear the Canvases used for the filter process
        tempContext.clearRect(0, 0, 50, 50);
        filterContext.filter = "none";
        filterContext.clearRect(0, 0, 50, 50);
    }
}

function Smudge_onmousemove(e){
    if(isDrawing){
        //get the imageData at the current location of the mouse cursor
        tempImageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
        tempData = tempImageData.data;
        
        //blend the colors of the corresponding pixels in both data and tempData
        //blend with their alpha values in mind
        for(var i = 0; i < data.length; i += 4)
        {
            //these are the values i will multiply the colors by when blending.
            var dataAlphaMultiplier = data[i + 3]/255;
            var tempDataAlphaMultiplier = tempData[i + 3]/255;
            
            //get the individual colors of each pixel and adjust them according to the current opacity (alpha)
            var dataRed = Math.round(data[i] * dataAlphaMultiplier);
            var dataGreen = Math.round(data[i + 1] * dataAlphaMultiplier);
            var dataBlue = Math.round(data[i + 2] * dataAlphaMultiplier);
            var tempDataRed = Math.round(tempData[i] * tempDataAlphaMultiplier);
            var tempDataGreen = Math.round(tempData[i + 1] * tempDataAlphaMultiplier);
            var tempDataBlue = Math.round(tempData[i + 2] * tempDataAlphaMultiplier);
            
            //combine the colors and place them in the tempData 
            tempData[i] = ((dataRed + tempDataRed)/2);//red
            tempData[i+1] = ((dataGreen + tempDataGreen)/2);//green
            tempData[i+2] = ((dataBlue + tempDataBlue)/2);//blue
            tempData[i+3] = ((tempData[i+3] + data[i+3])/2);//alpha
        }
        
        //place the tempDataImage back into the canvas
        ctx.putImageData(tempImageData, e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2));

        data = tempData;
    }
}

function Blend_onmousemove(e){
    if(isDrawing){
        //get the imageData at the current location of the mouse
        tempImageData = ctx.getImageData(e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2), radius, radius);
        tempData = tempImageData.data;
    
        for(var i = 0; i < data.length; i += 4)
        {
            //average the colors of each pixel between the imageData objects (the first one
            //was made when the mouse was clicked, the second just a moment ago when the mouse was moved)
            tempData[i] = ((tempData[i] + data[i])/2);//red
            tempData[i+1] = ((tempData[i+1] + data[i+1])/2);//green
            tempData[i+2] = ((tempData[i+2] + data[i+2])/2);//blue
            tempData[i+3] = ((tempData[i+3] + data[i+3])/2);//alpha
        }
        
        //now place the altered tempImageData back into the canvas where the user is drawing
        ctx.putImageData(tempImageData, e.clientX - el.offsetLeft - (radius/2), e.clientY - el.offsetTop - (radius/2));
        
        //now make temp the original for the next time the mouse is moved
        imageData = tempImageData;
        data = tempData;
    }
}

//onmouseup functions ----------------------------------------------------------

function SimplePencil_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    ctx.closePath();
}

function SmoothConnections_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function EdgeSmoothingWithShadows_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function DryBrush_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function PointBasedApproach_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function PointBasedWithShadows_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function EdgeSmoothingWithRadialGradient_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function BezierCurves_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function PenVariableSegmentWidth_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function PenMultipleStrokes_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function ThickBrush_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function SlicedStrokes_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function SlicedStrokesWithOpacity_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function MultipleLines_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function MultipleLinesWithOpacity_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function StampLikeBasic_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function StampLikeTrailEffect_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function RandomRadiusOpacity_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
    points.length = 0;
}

function Stars_onmouseup()
{
    isDrawing = false;
    points.length = 0;
}

function StarsWithRotation_onmouseup()
{
    isDrawing = false;
    points.length = 0;
}

function RandomizeEverything_onmouseup()
{
    isDrawing = false;
    points.length = 0;
}

function ColoredPixels_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function Spray1_onmouseup()
{
    if(isDrawing){
        ctx.closePath();
    }
    isDrawing = false;
}

function TimeBasedSpray_onmouseup()
{
    clearTimeout(timeout);
}

function TimeBasedSprayWithRoundDistribution_onmouseup()
{
    clearTimeout(timeout);
}

function RandomizingDots_onmouseup()
{
    clearTimeout(timeout);
}

function Eraser_onmouseup()
{
    isDrawing = false;
}

function Blur_onmouseup(){
    isDrawing = false;
}

function Smudge_onmouseup(){
    isDrawing = false;
}

function Blend_onmouseup(){
    isDrawing = false;
}

//------------------------------------------------------------------------------



