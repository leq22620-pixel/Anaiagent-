import {openDatabase} from "./db.js";

export async function saveChat(role,text){

const db=await openDatabase();

const tx=db.transaction("chat","readwrite");

tx.objectStore("chat").add({

role,

text,

time:new Date().toISOString()

});

}

export async function loadChat(){

const db=await openDatabase();

return new Promise((resolve)=>{

const tx=db.transaction("chat","readonly");

const request=tx.objectStore("chat").getAll();

request.onsuccess=()=>resolve(request.result);

});

}