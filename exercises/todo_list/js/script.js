/* jshint esversion: 8 */
/* jshint browser: true */
"use strict;";

var team = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var priority = ["Low", "Normal", "Important", "Critical"];

/**
 * Add a new task to the list
 * 
 * Validate form, collect input values, and add call `addRow` to add a new row to the table
 */
function addTask() {
    let rowcolids = ["title", "assignedTo", "priority", "dueDate"];
    let rowData = {};

    rowcolids.forEach(id => rowData[id] = document.getElementById(id).value );

    if (Object.values(rowData).includes("")) {
        document.getElementById("feedbackMessage").hidden = false;
    } else {
        document.getElementById("feedbackMessage").hidden = true;
        addRow(rowData, document.getElementById("taskList"));
    }
}

/**
 * Add a new row to the table
 * 
 * @param {Object} rowData list of task attributes
 * @param {Node} parent DOM node to append to
 */
function addRow(rowData, parent) {
    let row = document.createElement("tr");
    row.className = rowData.priority.toLowerCase();

    row.innerHTML = `<th scope="row" class="text-center">
                        <input type="checkbox" class="form-check-input" onchange="removeRow(this)"/>
                    </th>
                    <td>${rowData.title}</td>
                    <td>${rowData.assignedTo}</td>
                    <td>${rowData.priority}</td>
                    <td>${rowData.dueDate}</td>`

    parent.querySelector('tbody').appendChild(row);
}

/**
 * Remove a table row corresponding to the selected checkbox
 * 
 *  @param {Node} caller DOM node calling removeRow
 * https://stackoverflow.com/questions/26512386/remove-current-row-tr-when-checkbox-is-checked
 */
async function removeRow(caller) {
    await new Promise(r => setTimeout(r, 1000));
    caller.closest("tbody").removeChild(caller.closest("tr"));
}

/**
 * Remove all table rows
 * 
 */
async function selectAll() {
    checkboxes = document.getElementsByClassName("form-check-input");
    for (const checkbox of checkboxes) {
        checkbox.checked = true;
        removeRow(checkbox);
    }
}

/**
 * Add options to the specified element
 * 
 * @param {string} selectId `select` element to populate
 * @param {string[]} sList array of options
 */
function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId, sList);
    for (const s of sList) {
        let option = document.createElement("option");
        option.text = s;
        sel.add(option);
    }
}

window.onload = function () {
    populateSelect("assignedTo", team);
    populateSelect("priority", priority);
};
