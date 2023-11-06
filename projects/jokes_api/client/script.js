'use strict';

const APILocation = 'https://jokes-api-7apx.onrender.com/api/v1/jokes?';

async function getJokes() {

    var language = document.querySelector('#selLang').value;
    var category = document.querySelector('#selCat').value;
    var number = document.querySelector('#selNum').value;

    var response = await fetch(APILocation + new URLSearchParams({
        language: language,
        category: category,
        number: number
    }))
    .then(response => response.json())
    .catch(error => displayIdError());

    
    var jokesDiv = document.querySelector('#jokes');
    jokesDiv.textContent = '';

    for (var joke of response) {

        var jokeNode = document.createElement('li');
        jokeNode.textContent = joke;
        
        jokesDiv.appendChild(jokeNode);

    }

}


function displayIdError() {

    console.log("We fucked up");

}



document.querySelector('#btnAmuse').addEventListener(
    'click', 
    (event) => getJokes()
);