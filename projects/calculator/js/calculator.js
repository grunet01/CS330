/* jshint esversion: 8 */
/* jshint browser: true */
'use strict';

var outputScreen;
var clearOnEntry;

const maxDisplayCharacters = 26;

/**
 * Display a digit on the `outputScreen`
 * 
 * @param {number} digit digit to add or display on the `outputScreen`
 */
function enterDigit(digit) {
    if (outputScreen.textContent.length < maxDisplayCharacters) {
        if (outputScreen.textContent == "0") {
            outputScreen.textContent = String(digit);
        } else {
            outputScreen.textContent += digit;
        }
    }
}


/**
 * Clear `outputScreen` and set value to 0
 */
function clear_screen() {
    outputScreen.textContent = "0";
}


/**
 * Evaluate the expression and display its result or *ERROR*
 */
function eval_expr() {
    try {
        outputScreen.textContent = eval(outputScreen.textContent);
    } catch (e) {
        outputScreen.textContent = "ERROR";
    }
}


/**
 * Display an operation on the `outputScreen`
 * 
 * @param {string} operation to add to the expression
 */
function enterOp(operation) {
    if (outputScreen.textContent != "0" && outputScreen.textContent.length < maxDisplayCharacters) {
        outputScreen.textContent += operation;
    }
}


window.onload = function () {
    outputScreen = document.querySelector('#result');
    clearOnEntry = true;
};
