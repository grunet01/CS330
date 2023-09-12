/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
'use strict';


/**
 * Greet user by name
 * 
 * @param {string} name visitor's name
 * @param {string} selector element to use for display
 */
function greet(name, selector) {
    document.querySelector(selector).innerHTML = `Hello ${name}`;
}

/**
 * Check if a number is prime
 * 
 * @param {number} number number to check
 * @return {boolean} result of the check
 */
function isPrime(number) {
    if (number<2) return false;

    for (let i = 2, end=Math.sqrt(number); i <= end; i++) 
        if (number % i == 0) return false;

    return true;
}


/**
 * Print whether a number is prime
 * 
 * @param {number} number number to check
 * @param {string} selector element to use for display
 */
function printNumberInfo(number, selector) {
    let displayText = number 
        ? `${number} is ${isPrime(number) ? "" : "not"} a prime number`
        : "Welcome to the prime zone."

    document.querySelector(selector).innerHTML = displayText;
}


/**
 * Generate an array of prime numbers
 * 
 * @param {number} number number of primes to generate
 * @return {number[]} an array of `number` prime numbers
 */
function getNPrimes(number) {
    if (number <= 0) { return []; }

    let primes = [2];
    let currentTestValue = 3;
    while (primes.length < number) {
        if (isPrime(currentTestValue)) { primes.push(currentTestValue) }
        currentTestValue += 2;
    }
    return primes;
}


/**
 * Print a table of prime numbers
 * 
 * @param {number} number number of primes to display
 * @param {string} selector element to use for display
 */
function printNPrimes(number, selector) {
    let table = document.querySelector(selector);

    let primes = number > 0 ? getNPrimes(number) : [];
    let tableData = primes.map((n, index) => {
        return `<tr>
                    <td>${index+1}</td>
                    <td>${n}</td>
                </tr>`
    }).join('');

    table.querySelector('thead tr th').innerHTML = `Here are the first ${number} primes.` 
    table.querySelector('tbody').innerHTML = tableData;
}


/**
 * Display warning about missing URL query parameters
 * 
 * @param {Object} urlParams URL parameters
 * @param {string} selector element to use for display
 */
function displayWarnings(urlParams, selector) {
    let missingParams = [];

    if (urlParams.get('name') == null) { missingParams.push('name'); }
    if (urlParams.get('number') == null && urlParams.get('n') == null) { missingParams.push('number'); }

    if (missingParams.length > 0) {
        let alert = document.createElement("p");
        alert.className = 'alert alert-danger mb-4';
        alert.innerHTML = `The following query ${missingParams.length == 1 ? 'parameter is missing:' : 'parameters are missing: '} ${missingParams.join(', ')}`

        document.querySelector(selector).append(alert);
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('name') ?? 'student';
    let number = urlParams.get('number') ?? urlParams.get('n') ?? 330;

    this.displayWarnings(urlParams, "#warnings");
    greet(name, "#greeting");
    printNumberInfo(number, "#numberInfo");
    printNPrimes(number, "table#nPrimes");
};
