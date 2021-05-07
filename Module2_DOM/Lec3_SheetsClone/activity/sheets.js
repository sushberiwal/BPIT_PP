let addSheet = document.querySelector(".add-sheet");
let sheetsList = document.querySelector(".sheets-list");
let sheetId = 0;

addSheet.addEventListener("click" , handleAddSheet);
sheetsList.addEventListener("click" , handleSheetSwitch)

function handleAddSheet(e){
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");

    let sheet = document.createElement("div");
    sheet.classList.add("sheet");
    sheet.classList.add("active-sheet");
    sheet.setAttribute("sid" , sheetId);
    sheet.textContent = `Sheet ${sheetId+1}`;

    sheetsList.append(sheet);

    // init DB
    initDB();

    // initUI
    initUI();
}
function handleSheetSwitch(e){
    let selectedSheet = e.target;
    if(selectedSheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedSheet.classList.add("active-sheet");

    // db set
    let selectedSheetId = selectedSheet.getAttribute("sid");
    db = sheetsDB[selectedSheetId];

    // ui set
    setUI();
}

function initUI(){
    for(let i=0 ; i<allCells.length ; i++){
        allCells[i].textContent = "";
    }
}

function setUI(){
    for(let i=0 ; i<allCells.length ; i++){
        let rowId = allCells[i].getAttribute("rowid");
        let colId = allCells[i].getAttribute("colid"); 
        allCells[i].textContent = db[rowId][colId].value;
    }
} 