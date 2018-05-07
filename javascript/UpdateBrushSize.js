/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function updateBrushSize_textBox(){
    //get the brush size as inputted by user
    var brushSizeTextBox = document.getElementById("brushSizeNumberForm");
    var brushSizeSlider = document.getElementById("brushSize_slider");
    var paintBrushSize = brushSizeTextBox.value;
    
    //now make sure that the brush size is valid (min = 1, max = 25)
    if(paintBrushSize < 1)
    {
        alert("The given brush size is too small. Defaulted to 1");
        brushSizeTextBox.value = 1;
    }
    else if(paintBrushSize > 50)
    {
        alert("The given brush size is too big. Defaulted to 50");
        brushSizeTextBox.value = 50;
    }
    
    brushSizeSlider.value = brushSizeTextBox.value;
}

function updateBrushSize_slider(){
    var brushSizeTextBox = document.getElementById("brushSizeNumberForm");
    var brushSizeSlider = document.getElementById("brushSize_slider");
    var paintBrushSize = brushSizeSlider.value;
    
    brushSizeTextBox.value = brushSizeSlider.value;
}
