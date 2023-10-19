/* jshint esversion: 8 */
/* jshint browser: true */
'use strict';


// 
// Functions to access external APIs
//


export async function queryDriverList(renderCallback) {
    let responseJSON = await fetch('https://ergast.com/api/f1/2023/drivers.json')
        .then(response => response.json())
        .catch(error => console.log(error));

    let drivers = responseJSON.MRData.DriverTable.Drivers;

    let driverNames = [];
    let driverIds = {};

    for (let driver of drivers) {
        let fullName = `${driver.givenName} ${driver.familyName}`;
        driverNames.push(fullName);
        driverIds[fullName] = driver.driverId;
    }

    renderCallback(driverNames);

    return driverIds;

}



export async function queryDriverImage(driverName, renderCallback) {

    var xhr = new XMLHttpRequest();

    // Handle special cases where wikipedia page doesn't match exact name
    switch(driverName) {
        case "Alexander Albon":
            driverName = "Alex Albon";
            break;
        case "George Russell":
            driverName = "George Russell (racing driver)";
            break;
        case "Carlos Sainz":
            driverName = "Carlos Sainz Jr.";
            break;
        case "Guanyu Zhou":
            driverName = "Zhou Guanyu";
            break;
        default:
            break;
    }

    var queryURL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&pithumbsize=200&prop=pageimages&titles=${driverName}&format=json`;

    xhr.open('GET', queryURL, true);

    xhr.onload = function() {
        var data = JSON.parse(this.response);
        var pages = data.query.pages;
        var pageKey = Object.keys(pages)[0];

        var imageURL = pages[pageKey].thumbnail.source;

        renderCallback(imageURL);
    }

    xhr.send();

}



var driverStandings = {};
var driverPointsHistory = {};

export async function queryDriverStandings(driverId, renderCallback) {

    if (driverStandings[driverId] == null) {

        let responseJSON = await fetch(`http://ergast.com/api/f1/current/driverStandings.json`)
            .then(response => response.json())
            .catch(error => console.log(error));
    
        let standings = responseJSON.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        standings.forEach(element => {
            driverStandings[element.Driver.driverId] = {
                points: element.points,
                position: element.position,
                wins: element.wins
            }
        });
    }

    if (driverPointsHistory[driverId] == null) {

        let responseJSON = await fetch(`https://ergast.com/api/f1/current/results.json?limit=700`)
            .then(response => response.json())
            .catch(error => console.log(error));

        console.log(responseJSON);

        let raceTable = responseJSON.MRData.RaceTable.Races

        for (let raceIndex = 0; raceIndex < raceTable.length; raceIndex++) {

            let results = raceTable[raceIndex].Results;

            results.forEach(result => {

                let driverId = result.Driver.driverId;

                if (driverPointsHistory[driverId] == null) {
                    driverPointsHistory[driverId] = [];
                }

                driverPointsHistory[driverId].push(result.points);
            });
        }
    }
    
    renderCallback(
        driverStandings[driverId].points, 
        driverStandings[driverId].position, 
        driverStandings[driverId].wins,
        driverPointsHistory[driverId],
    );

}



export async function queryDriverInfo(driverName, renderCallback){
    let driverId = '';
    if (driverName === 'Alexander Albon'){
        driverId = 'albon';
    } else if (driverName === 'Fernando Alonso') {
        driverId = 'alonso';
    } else if (driverName === 'Valtteri Bottas') {
        driverId = 'bottas';
    } else if (driverName === 'Nyck de Vries') {
        driverId = 'de_vries';
    } else if (driverName === 'Pierre Gasly') {
        driverId = 'gasly';
    } else if (driverName === 'Lewis Hamilton') {
        driverId = 'hamilton';
    } else if (driverName === 'Nico Hülkenberg') {
        driverId = 'hülkenberg';
    } else if (driverName === 'Liam Lawson') {
        driverId = 'lawson';
    } else if (driverName === 'Charles Leclerc') {
        driverId = 'leclerc';
    } else if (driverName === 'Kevin Magnussen') {
        driverId = 'magnussen';
    } else if (driverName === 'Lando Norris') {
        driverId = 'norris';
    } else if (driverName === 'Esteban Ocon') {
        driverId = 'ocon';
    } else if (driverName === 'Sergio Perez') {
        driverId = 'perez';
    } else if (driverName === 'Oscar Piastri') {
        driverId = 'piastri';
    } else if (driverName === 'Daniel Ricciardo') {
        driverId= 'ricciardo';
    } else if (driverName === 'George Russell') {
        driverId = 'russell';
    } else if (driverName === 'Carlos Sainz') {
        driverId = 'sainz';
    } else if (driverName === 'Logan Sargeant') {
        driverId = 'sargeant';
    } else if (driverName === 'Lance Stroll') {
        driverId = 'stroll';
    } else if (driverName === 'Yuki Tsunoda') {
        driverId = 'tsunoda';
    } else if (driverName === 'Max Verstappen') {
        driverId = 'max_verstappen';
    } else if (driverName === 'Guanyu Zhou') {
        driverId = 'zhou';
    }

    let responseJSON = await fetch(`http://ergast.com/api/f1/drivers/${driverId}.json`)
        .then(response => response.json())
        .catch(error => console.log(error));
    let driver = responseJSON.MRData.DriverTable.Drivers;
    
    let driverBook = [];

    for (let info of driver) {
        driverBook.push(`${info.givenName},${info.familyName},${info.permanentNumber},${info.dateOfBirth}, ${info.nationality}`);
    }


    renderCallback(driverBook);
    
}