const DB_NAME = "AnOS_DB";
const DB_VERSION = 1;

let db = null;

export async function openDB() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {

            db = request.result;

            resolve(db);

        };

        request.onupgradeneeded = (event) => {

            const database = event.target.result;

            if (!database.objectStoreNames.contains("memory")) {

                database.createObjectStore("memory", {

                    keyPath: "id",
                    autoIncrement: true

                });

            }

            if (!database.objectStoreNames.contains("chat")) {

                database.createObjectStore("chat", {

                    keyPath: "id",
                    autoIncrement: true

                });

            }

            if (!database.objectStoreNames.contains("task")) {

                database.createObjectStore("task", {

                    keyPath: "id",
                    autoIncrement: true

                });

            }

        };

    });

}

export function getDB() {

    return db;

}