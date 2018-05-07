//sourceURL=pen.js
import React from 'react';
import ReactDOM from 'react-dom';

var el = document.getElementById('DrawingSpace');
var ctx = el.getContext('2d');
var isDrawing;
var startingStroke = true;

function draw(){
    //determine which brush is currently being used
    if(parseInt(document.getElementById("brushSelected").value, 10) == 1)//simple brush
    {
        el.onmousedown = function(e) {
            if(!isDrawing){
                ctx.beginPath();
            }
        isDrawing = true;
        ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
        ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
      };
      el.onmousemove = function(e) {
        if (isDrawing) {
          ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
          ctx.stroke();
        }
      };
      el.onmouseup = function() {
          if(isDrawing){
                ctx.closePath();
            }
        isDrawing = false;
      };
    }
    else if(parseInt(document.getElementById("brushSelected").value, 10) == 2)//smudge brush (not quite working)
    {
        el.onmousedown = function(e) {
            if(!isDrawing){
                ctx.beginPath();
            }
        isDrawing = true;
        if(startingStroke)
        {
            ctx.lineWidth = document.getElementById("brushSizeNumberForm").value;
        }
        startingStroke = false;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = document.getElementById("RGBLabel").innerHTML;
        ctx.moveTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
        };
        el.onmousemove = function(e) {
        if (isDrawing) {
            ctx.lineWidth = ctx.lineWidth - 0.5;
            ctx.lineTo(e.clientX - el.offsetLeft, e.clientY - el.offsetTop);
            ctx.stroke();
        }
      };
      el.onmouseup = function() {
          if(isDrawing){
                ctx.closePath();
            }
        isDrawing = false;
        startingStroke = true;
      };
    }
}

function changeBrush(brushNumber)
{
    alert("working");
    document.getElementById("brushSelected").value = (brushNumber);
    alert("current brush selected was changed to ".concat(document.getElementById("brushSelected").value));
}
