let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

let fontSize = document.querySelector("#font-size");

bold.addEventListener("click" , function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.fontStyle.bold){
        lastSelectedCell.style.fontWeight = "normal";
        bold.classList.remove("active-menu");
    }
    else{
        lastSelectedCell.style.fontWeight = "bold";
        bold.classList.add("active-menu");
    }
    cellObject.fontStyle.bold = !cellObject.fontStyle.bold;
})

underline.addEventListener("click" , function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.fontStyle.underline){
        lastSelectedCell.style.textDecoration = "none";
        underline.classList.remove("active-menu");
    }
    else{
        lastSelectedCell.style.textDecoration = "underline";
        underline.classList.add("active-menu");
    }
    cellObject.fontStyle.underline = !cellObject.fontStyle.underline;
})

italic.addEventListener("click" , function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.fontStyle.italic){
        lastSelectedCell.style.fontStyle = "normal";
        italic.classList.remove("active-menu");
    }
    else{
        lastSelectedCell.style.fontStyle = "italic";
        italic.classList.add("active-menu");
    }
    cellObject.fontStyle.italic = !cellObject.fontStyle.italic;
})

left.addEventListener("click" ,function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.textAlign == "left"){
        return;
    }
    // cell => text align
    lastSelectedCell.style.textAlign = "left";
    cellObject.textAlign = "left";
    setMenu(cellObject);
})
center.addEventListener("click" , function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.textAlign == "center"){
        return;
    }
    // cell => text align
    lastSelectedCell.style.textAlign = "center";
    cellObject.textAlign = "center";
    setMenu(cellObject);
})
right.addEventListener("click" , function(e){
    let cellObject = db[rowId][colId];
    if(cellObject.textAlign == "right"){
        return;
    }
    // cell => text align
    lastSelectedCell.style.textAlign = "right";
    cellObject.textAlign = "right";
    setMenu(cellObject);
})

fontSize.addEventListener("change" , function(e){
    console.log(fontSize.value);
})


function setMenu(cellObject){
    // bold underline italic
    cellObject.fontStyle.bold ? bold.classList.add("active-menu") : bold.classList.remove("active-menu");
    cellObject.fontStyle.italic ? italic.classList.add("active-menu") : italic.classList.remove("active-menu");
    cellObject.fontStyle.underline ? underline.classList.add("active-menu") : underline.classList.remove("active-menu");

    // alignment
    let alignment = cellObject.textAlign; //left center right
    if(document.querySelector(".font-alignment .active-menu")){
        document.querySelector(".font-alignment .active-menu").classList.remove("active-menu");
    }
    if(alignment == "left"){
        left.classList.add("active-menu");
    }
    else if(alignment == "center"){
        center.classList.add("active-menu");
    }
    else{
        right.classList.add("active-menu");
    }

}

function initMenu(){
    bold.classList.remove("active-menu");
    underline.classList.remove("active-menu");
    italic.classList.remove("active-menu");
    left.classList.remove("active-menu");
    center.classList.remove("active-menu");
    right.classList.remove("active-menu");
}
