import { openDatabase } from "./db.js";

export async function saveMemory(key, value) {

    const db = await openDatabase();

    const tx = db.transaction("memory", "readwrite");

    tx.objectStore("memory").put({
        key,
        value
    });

}

export async function getMemory(key) {

    const db = await openDatabase();

    return new Promise(resolve => {

        const tx = db.transaction("memory", "readonly");

        const request = tx.objectStore("memory").get(key);

        request.onsuccess = () => {

            resolve(request.result?.value || null);

        };

    });

}