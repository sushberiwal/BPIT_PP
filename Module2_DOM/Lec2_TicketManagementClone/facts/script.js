// set data in localStorage
// localStorage.setItem("name" , "steve");

// get Data from localStorage
// console.log(localStorage.getItem("name"));


// clear localStorage
// localStorage.clear();


// tickets save localStorage

// ticket id ,  ticket text , ticket filter
// let ticketObject = {
//     "ticketId":"1239812813",
//     "ticketText":"Fix my css !!",
//     "ticketFilter":"blue"
// }

// let ticketsArray = []


localStorage.setItem("allTickets" , JSON.stringify([{
    "ticketId":"1239812813",
    "ticketText":"Fix my css !!",
    "ticketFilter":"blue"
}]));

