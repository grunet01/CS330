/* jshint esversion: 8 */
/* jshint browser: true */
'use strict';


// Module from https://inorganik.github.io/countUp.js/
import { CountUp } from './modules/countUp.js';



// 
// Functions to alter the HTML document
//


export function unhideDriverPanel() {
    var driverPanel = document.querySelector('#driverPanel');
    driverPanel.hidden = false;
}



export function displayDriverImage(imageURL) {
    var image = document.querySelector('#driverImage');
    image.src = imageURL;
}



export function displayDriverInfo(driverBook) {

    let pElem = document.getElementById("driverInfo");
    pElem.innerHTML = '';

    //for (let driverInfoString of driverBook) {
        let driverInfoString = driverBook[0];
        const driverInfo = driverInfoString.split(',');

        let firstName = driverInfo[0];
        let lastName = driverInfo[1];
        let age = driverInfo[2];
        let dateOfBirth = driverInfo[3];
        let nationality = driverInfo[4];

        let p = document.createElement("p");
        p.classList.add("driverInfo");
        p.textContent = `${firstName} ${lastName}, was born on ${dateOfBirth}. He competes using the number ${age} and under the ${nationality} flag.`;
        pElem.classList.add("text-light");
        pElem.appendChild(p);
    //}

}



export function displayDriverName(driverName) {
    var element = document.querySelector('#driverName');
    element.innerHTML = driverName;
}


const nameToNationality = {
    'Lewis Hamilton': 'GB',
    'Max Verstappen': 'NL',
    'Alexander Albon': 'TH',
    'Fernando Alonso': 'ES',
    'Valtteri Bottas': 'FI',
    'Nyck de Vries': 'NE',
    'Pierre Gasly': 'FR',
    'Nico Hülkenberg': 'DE',
    'Liam Lawson': 'AU',
    'Charles Leclerc': 'PL',
    'Kevin Magnussen': 'DK',
    'Lando Norris': 'GB',
    'Esteban Ocon': 'FR',
    'Sergio Pérez': 'MX',
    'Oscar Piastri': 'AU',
    'Daniel Ricciardo': 'AU',
    'George Russell': 'GB',
    'Carlos Sainz': 'ES',
    'Logan Sargeant': 'US',
    'Lance Stroll': 'BE',
    'Yuki Tsunoda': 'JP',
    'Guanyu Zhou': 'CN'
};

export function displayDriverFlag(driverName) {
    var image = document.querySelector('#driverFlag');
    image.src = `https://flagsapi.com/${nameToNationality[driverName]}/flat/64.png`;
}



var driverDisplayElements = [];

export function displayDriverStandings(points, position, wins, pointsOverTime) {

    if (driverDisplayElements.length == 0) {
        
        driverDisplayElements.push(new CountUp('driverPoints', points));
        driverDisplayElements.push(new CountUp('driverPosition', position, { suffix: "/22" }));
        driverDisplayElements.push(new CountUp('driverWins', wins));


        let driverHistoryChartOptions = {
            maintainAspectRatio: false,
            events: [],
            plugins: { legend: false },
            scales: { 
                y: { display: false },
                x: {display: false }
            }   
        };

        driverDisplayElements.push(
            new Chart(document.getElementById('driverPointsHistory').getContext('2d'), {
                type: 'line',
                data: {
                    labels: pointsOverTime,
                    datasets: [{ 
                        data: pointsOverTime,
                        label: "Total",
                        borderColor: "#FF1801",
                        backgroundColor: "#FF1801",
                        fill: false,
                        }
                    ]
                },
                options: driverHistoryChartOptions
            })
        )
    }
    
    driverDisplayElements[0].update(points);
    driverDisplayElements[1].update(position);
    driverDisplayElements[2].update(wins);

    driverDisplayElements[3].data.datasets[0].data = pointsOverTime;

    driverDisplayElements[3].update();
    
}



export function populateDriverSelect(options) {
    let selectElement = document.querySelector('#Driver');

    options.forEach((opt) => {
        let option = document.createElement('option');
        option.setAttribute('value', opt);
        option.innerHTML = opt;
        selectElement.appendChild(option);
    });

}