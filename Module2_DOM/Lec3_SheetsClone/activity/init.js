// dynamically append 2600 cell into DOM
let cellsContent = document.querySelector(".cells-content");

let cells = "";
for(let i=0 ; i<100 ; i++){
    cells += `<div class="row">`;
    for(let j=0 ; j<26 ; j++){
        cells += `<div class="cell" contentEditable="true"></div>`
    }
    cells+= `</div>`;
}

cellsContent.innerHTML = cells;