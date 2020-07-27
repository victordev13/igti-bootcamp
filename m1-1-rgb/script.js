'use strict';
window.addEventListener('load', start);

//declaração de variáveis
var redRange = null;
var greenRange = null;
var blueRange = null;
var redValue = null;
var greenValue = null;
var blueValue = null;
var square = null;

var squareBgColor = null;

function start() {
    redRange = document.querySelector('#redRange');
    greenRange = document.querySelector('#greenRange');
    blueRange = document.querySelector('#blueRange');
    redValue = document.querySelector('#redValue');
    greenValue = document.querySelector('#greenValue');
    blueValue = document.querySelector('#blueValue');
    square = document.querySelector('#square');

    redRange.addEventListener('input', setRedValue);
    greenRange.addEventListener('input', setGreenValue);
    blueRange.addEventListener('input', setBlueValue);
}

function setColor() {
    squareBgColor = `rgb(${redRange.value},${greenRange.value},${blueRange.value})`;
    console.log('Cor: ' + squareBgColor);
    square.style.background = squareBgColor;
}

function setRedValue() {
    redValue.value = redRange.value;
    setColor();
}

function setGreenValue() {
    greenValue.value = greenRange.value;
    setColor();
}

function setBlueValue() {
    blueValue.value = blueRange.value;
    setColor();
}
