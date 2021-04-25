let filterCodes = {
    "blue":"#00a8ff",
    "yellow":"#fbc531",
    "green":"#4cd137",
    "black":"#2f3640"
}

let allFilters = document.querySelectorAll(".filter");
let ticketsContent = document.querySelector(".tickets-content");

for(let i=0;i<allFilters.length ; i++){
    allFilters[i].addEventListener("click" , function(e){
        let filterSelected = e.target.classList[1];
        // if clicked on already active filter element then return !!
        if(e.target.classList.contains("active-filter")){
            e.target.classList.remove("active-filter");
            ticketsContent.style.background = '#dcdde1';
            return;
        }

        // if active filter class is already on some element then delte class froim that element
        if( document.querySelector(".active-filter") ){
            document.querySelector(".active-filter").classList.remove("active-filter");
        }
        e.target.classList.add("active-filter");
        // it will change tickets content ka background !!
        
        ticketsContent.style.background = filterCodes[filterSelected];
    })
}