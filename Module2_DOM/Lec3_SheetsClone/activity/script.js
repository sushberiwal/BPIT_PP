let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");

cellsContent.addEventListener("scroll" , function(e){
    let top = e.target.scrollTop ;
    let left =  e.target.scrollLeft;

    topRow.style.top = top+"px";
    leftCol.style.left = left+"px";
    topLeftCell.style.top = top+"px";
    topLeftCell.style.left = left+"px";
})

