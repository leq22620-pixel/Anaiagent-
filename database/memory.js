import { openDatabase } from "./db.js";

export async function saveMemory(key, value) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction("memory", "readwrite");

        const request = tx.objectStore("memory").put({
            key,
            value
        });

        request.onsuccess = () => resolve();

        request.onerror = () => reject(request.error);

    });

}

export async function getMemory(key) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction("memory", "readonly");

        const request = tx.objectStore("memory").get(key);

        request.onsuccess = () => {
            resolve(request.result?.value || null);
        };

        request.onerror = () => reject(request.error);

    });

}