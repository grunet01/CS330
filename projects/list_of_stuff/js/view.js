/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

class AlbumListeningListView {
    constructor(model) {
        model.subscribe(this.redrawView.bind(this));
        model.retrieve();
    }

    redrawView(albumListeningList, msg) {

        // Hide table if model is empty
        let table = document.querySelector("#albumList");
        if (albumListeningList.albums.length == 0) {
            table.style.display = "none";
            return;
        } else {
            table.style.display = "table";
        }

        let tableBody = document.querySelector("#albumList > tbody");
        tableBody.innerHTML = "";

        let index = 0;
        for (let album of albumListeningList) {
            let row = document.createElement("tr");
            row.classList.add(album.priority);
            
            // IDs are added to manage collapsing animation
            row.innerHTML = `
                <th scope="row" class="text-center">
                    <div id="row${index}" class="collapse show">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#row${index}" 
                            aria-expanded="false" 
                            aria-controls="row${index}"
                            onClick={removeAlbum(this)} />
                    </div>
                </th>
                <td>
                    <div id="row${index}" class="collapse show">${album.name}</div>
                </td>
                <td>
                    <div id="row${index}" class="collapse show">${album.artist}</div>
                </td>
                <td>
                    <div id="row${index}" class="collapse show">${album.genre}</div>
                </td>`

            tableBody.appendChild(row);

            index++;
        }
    }
}
