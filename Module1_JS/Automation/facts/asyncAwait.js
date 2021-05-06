// Async Await

//1. async keyword makes a functions async
//2. async functions returns a Pending Promise 
//3. Await keyword => it can only be used inside async function !!!


// return new Promise(function(resolve , reject){
// })


// Promise initially => Pending
let fs = require("fs");


// It is a async function
async function callMe(){
    let f1KaPromise = await fs.promises.readFile("./f1.txt");  
    let f2KaPromise = await fs.promises.readFile("./f2.txt");
    let allFilesKaPromise = Promise.all([ f1KaPromise , f2KaPromise ] );
    let allFilesKaData = await allFilesKaPromise;
    console.log(allFilesKaData);
    // PRomise<Pending> => Promise<data>;
}

callMe();
// millions of lines

// let f1KaPromise = fs.promises.readFile("./f1.txt");
// console.log(f1KaPromise);

// f1KaPromise.then(function(data){
//     console.log(f1KaPromise);
// })