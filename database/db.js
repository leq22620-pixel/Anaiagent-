const DB_NAME="AnOS";

const DB_VERSION=1;

export async function openDatabase(){

return new Promise((resolve,reject)=>{

const request=indexedDB.open(DB_NAME,DB_VERSION);

request.onerror=()=>reject(request.error);

request.onsuccess=()=>resolve(request.result);

request.onupgradeneeded=(event)=>{

const db=event.target.result;

if(!db.objectStoreNames.contains("chat")){

db.createObjectStore("chat",{

keyPath:"id",

autoIncrement:true

});

}

if(!db.objectStoreNames.contains("task")){

db.createObjectStore("task",{

keyPath:"id",

autoIncrement:true

});

}

if(!db.objectStoreNames.contains("memory")){

db.createObjectStore("memory",{

keyPath:"id",

autoIncrement:true

});

}

if(!db.objectStoreNames.contains("goal")){

db.createObjectStore("goal",{

keyPath:"id",

autoIncrement:true

});

}

};

});

}