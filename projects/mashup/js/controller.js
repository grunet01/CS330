/* jshint esversion: 8 */
/* jshint browser: true */
'use strict';

import * as query from './query.js';
import * as display from './display.js';


var driverIds;

window.onload = async function() {
    driverIds = await query.queryDriverList(display.populateDriverSelect);

    var driverName = localStorage.getItem('lastViewed');

    if (driverName != null)
        setSelectedDriver(driverName);
}


async function setSelectedDriver(driverName) {
    var driverSelect = document.querySelector("#Driver");
    driverSelect.value = driverName;

    await updateDriver(driverName);
}



async function updateDriver(driverName) {
    await query.queryDriverImage(driverName, display.displayDriverImage);
    await query.queryDriverInfo(driverName, display.displayDriverInfo);
    await query.queryDriverStandings(driverIds[driverName], display.displayDriverStandings);

    display.displayDriverFlag(driverName);
    display.displayDriverName(driverName);
    display.unhideDriverPanel();

    localStorage.setItem('lastViewed', driverName);
}

document.querySelector('#Driver').addEventListener(
    'change', 
    (event) => updateDriver(event.target.value)
);
