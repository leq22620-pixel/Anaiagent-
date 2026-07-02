import { getDB } from "../database/indexeddb.js";

export function saveChat(role, text) {

    const db = getDB();

    const tx = db.transaction("chat", "readwrite");

    tx.objectStore("chat").add({

        role,

        text,

        time: Date.now()

    });

}

export function loadChat() {

    return new Promise((resolve) => {

        const db = getDB();

        const tx = db.transaction("chat", "readonly");

        const request = tx.objectStore("chat").getAll();

        request.onsuccess = () => {

            resolve(request.result);

        };

    });

}