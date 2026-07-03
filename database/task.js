import { openDatabase } from "./db.js";

export async function saveTask(task) {

    const db = await openDatabase();

    const tx = db.transaction("task", "readwrite");

    tx.objectStore("task").add({
        text: task,
        done: false,
        time: new Date().toISOString()
    });

}

export async function getTasks() {

    const db = await openDatabase();

    return new Promise(resolve => {

        const tx = db.transaction("task", "readonly");

        const request = tx.objectStore("task").getAll();

        request.onsuccess = () => resolve(request.result);

    });

}