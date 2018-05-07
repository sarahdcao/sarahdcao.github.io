/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function changeColor()
{
    //these three values are the rgb values i will use
    var redValue = document.getElementById("redSlider").value;
    var greenValue = document.getElementById("greenSlider").value;
    var blueValue = document.getElementById("blueSlider").value;
    
    
    //now create a hexadecimal code for the current color
    var redHex = convertToHexadecimal(redValue);
    var greenHex = convertToHexadecimal(greenValue);
    var blueHex = convertToHexadecimal(blueValue);
    var combinedValue = redHex.concat(greenHex, blueHex);
    var colorString = "#".concat(combinedValue);
    
    //make sure the hexadecimal RGB is shown
    var hexaRGBLabel = document.getElementById("RGBLabel");
    hexaRGBLabel.innerHTML = colorString;
    
    //assign that color as the background color of the color box so the user can see the current color
    var colorBox = document.getElementById("ColorBox");
    colorBox.style.backgroundColor = colorString;
}

function convertToHexadecimal(number)
{
    var dividend = Math.floor(number/16);
    var remainder = number%16;
    var hexadecimalReturn = "";
    
    //find hexadecimal of dividend
    if(dividend > 9)
    {
        switch(dividend){
            case 10:
                hexadecimalReturn = hexadecimalReturn.concat("A");
                break
            case 11:
                hexadecimalReturn = hexadecimalReturn.concat("B");
                break
            case 12:
                hexadecimalReturn = hexadecimalReturn.concat("C");
                break
            case 13:
                hexadecimalReturn = hexadecimalReturn.concat("D");
                break
            case 14:
                hexadecimalReturn = hexadecimalReturn.concat("E");
                break
            default:
                hexadecimalReturn = hexadecimalReturn.concat("F");
                break
        }
    }
    else
    {
        hexadecimalReturn = hexadecimalReturn.concat(dividend);
    }
    
    //find hexadecimal of remainder
    if(remainder > 9)
    {
        switch(remainder){
            case 10:
                hexadecimalReturn = hexadecimalReturn.concat("A");
                break
            case 11:
                hexadecimalReturn = hexadecimalReturn.concat("B");
                break
            case 12:
                hexadecimalReturn = hexadecimalReturn.concat("C");
                break
            case 13:
                hexadecimalReturn = hexadecimalReturn.concat("D");
                break
            case 14:
                hexadecimalReturn = hexadecimalReturn.concat("E");
                break
            default:
                hexadecimalReturn = hexadecimalReturn.concat("F");
                break
        }
    }
    else
    {
        hexadecimalReturn = hexadecimalReturn.concat(remainder);
    }
    
    return hexadecimalReturn;
}