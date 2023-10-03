/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

class Album {
    constructor(name, artist, genre, priority) {
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.priority = priority;
    }
}

class Subject {
    constructor() {
        this.handlers = [];
    }
    subscribe(func) {
        this.handlers.push(func);
    }
    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item !== func);
    }
    publish(msg, obj) {
        let scope = obj || window;
        for (let f of this.handlers) {
            f(scope, msg);
        }
    }
}

class AlbumListeningList extends Subject {
    constructor() {
        super();
    }

    add(album) {
        this.albums.push(album);
        this.publish(`Album "${album.name}" has been added`, this);
        this.save();
    }

    removeIndex(index) { 
        this.albums.splice(index, 1);
        this.publish(`Album at index ${index} has been removed`, this);
        this.save();
    }

    clear() {
        this.albums = [];
        this.publish("Album list has been cleared", this);
        this.save();
    }

    save() {
        localStorage.setItem("albums", JSON.stringify(this.albums));
    }

    retrieve() {
        this.albums = JSON.parse(localStorage.getItem("albums") ?? "[]");
        this.publish("Album list has loaded", this);
    }

    [Symbol.iterator]() {
        let idx = -1;
        return {
            next: () => ({ value: this.albums[++idx], done: !(idx in this.albums) })
        };
    }
}
