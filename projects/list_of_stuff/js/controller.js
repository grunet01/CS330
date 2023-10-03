/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

var myModel = new AlbumListeningList();
var myView = new AlbumListeningListView(myModel);

function addAlbum() {    
    myModel.add(new Album(
        document.querySelector("#name").value,
        document.querySelector("#artist").value,
        document.querySelector("#genre").value,
        document.querySelector("#priority").value,
    ));
}

// Flag to prevent multiple albums from being removed in a short time, 
// which causes confusing visuals when multiple animations are playing
var currentlyRemovingAlbum = false;

async function removeAlbum(caller) {
    if (currentlyRemovingAlbum) { 
        caller.checked = false;
        return; 
    }
    currentlyRemovingAlbum = true;

    let row = caller.closest("tr");
    const albumIndex = row.rowIndex - 1;

    await new Promise(r => setTimeout(r, 350));
    caller.closest("tbody").removeChild(row);

    myModel.removeIndex(albumIndex);
    currentlyRemovingAlbum = false;
}

async function removeAll() {
    // Inline expression to check every checkbox
    [...document.getElementsByClassName("form-check-input")].forEach(cb => cb.checked = true);

    await new Promise(r => setTimeout(r, 750));

    myModel.clear();
}

// Method taken from MVC notes
function populateSelect(selectElementId, options) {
    let selectElement = document.querySelector(selectElementId);
    for (let opt of options) {
        let optElem = document.createElement("option");
        optElem.setAttribute("value", opt);
        optElem.innerHTML = opt;
        selectElement.appendChild(optElem);
    }
}

window.onload = function (params) {
    populateSelect("#priority", ["Low", "Medium", "High"]);

    let form = document.querySelector("#album_details");

    // Custom event listener to prevent extra submits when bootstrap validation fails
    form.addEventListener('submit', event => {

        // Prevent the page from reloading on submit
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            form.classList.remove('was-validated');
            addAlbum();
            form.reset();
        }
      }, false)
}