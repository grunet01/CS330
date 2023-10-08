/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

var allNumbers = document.querySelector('#number_info');


async function get_individual(num) {
    for (let number of [num-1, num, num+1]) {
        let numberObject = {};
        let responseText = await fetch(`http://numbersapi.com/${number}`)
            .then(response => response.text())
            .catch(error => console.log(error));
        numberObject[number] = responseText;
        displayData(numberObject);
    }
}


async function get_batch(num) {
    let responseJSON = await fetch(`http://numbersapi.com/${num-1}..${num+1}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    
    displayData(responseJSON);
}

function displayData(numberTriviaData) {
    for (let number in numberTriviaData) {
        let parentDiv = document.createElement('div');
        let numberDiv = document.createElement('div');
        let triviaDiv = document.createElement('div');

        parentDiv.className = 'row mb-4';
        numberDiv.className = 'col-auto fs-2 me-3 d-flex align-items-center';
        triviaDiv.className = 'col alert alert-success text-wrap mb-0';

        numberDiv.innerHTML = number;
        triviaDiv.innerHTML = numberTriviaData[number];
        parentDiv.appendChild(numberDiv);
        parentDiv.appendChild(triviaDiv);

        allNumbers.appendChild(parentDiv);
    };
}


async function submitNumber() {
    while (allNumbers.firstChild) {
        allNumbers.removeChild(allNumbers.lastChild);
    }

    let num = parseInt(document.querySelector('#number').value);

    if (document.querySelector('#batch').checked) {
        get_batch(num);
    } else {
        get_individual(num);
    }
}

window.onload = function (params) {
    let form = document.querySelector("#form_number");

    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            form.classList.remove('was-validated');
            submitNumber();
            }
      }, false)
}