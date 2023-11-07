'use strict';

const APILocation = 'https://jokes-api-7apx.onrender.com/api/v1/jokes?';
// Note: API is hosted on free plan and takes extra time to spin up on the
// first request. Subsequent requests are faster

async function getJokes() {

    var language = document.querySelector('#selLang').value;
    var category = document.querySelector('#selCat').value;
    var number = document.querySelector('#selNum').value;
    var id = document.querySelector('#inputId').value;


    if (id == '') {

        var URLparams = new URLSearchParams({
            language: language,
            category: category,
            number: number
        });

    } else {

        var URLparams = new URLSearchParams({
            language: language,
            category: category,
            id: id
        });

    }

    setIdErrorDisplay(false);

    var response = await fetch(APILocation + URLparams)
        .then(response => response.json())
        .catch(error => setIdErrorDisplay(true));

    
    
    var jokesDiv = document.querySelector('#jokes');
    jokesDiv.textContent = '';

    for (var joke of response) {

        var jokeNode = document.createElement('li');
        jokeNode.className = "mb-2"
        jokeNode.textContent = joke;

        jokesDiv.appendChild(jokeNode);

    }

}


function setIdErrorDisplay(bool) {

    var errorDisplay = document.querySelector('#idErrorDisplay');
    errorDisplay.hidden = !bool;

}



document.querySelector('#btnAmuse').addEventListener(
    'click', 
    (event) => getJokes()
);