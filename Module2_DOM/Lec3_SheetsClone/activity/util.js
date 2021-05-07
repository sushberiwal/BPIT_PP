function solveFormula(formula , selfCellObject){
    // ( A1 + A2 ) => ( 10 + 20 );
    let formulaComps = formula.split(" ");
    // ["(" , "A1" , "+" , "A2" , ")"];
    for(let i=0 ; i<formulaComps.length ; i++){
        let fComp = formulaComps[i];
        if( fComp[0] >= "A" && fComp[0] <= "Z" ){
            // inside valid fComponent
            let {rowId , colId} = getRowIdColIdFromAddress(fComp);
            let cellObject = db[rowId][colId];

            if(selfCellObject){
                // add yourself in the childrens of your parent
                cellObject.childrens.push(selfCellObject.name);
                //add formula Components in your parents
                selfCellObject.parents.push(fComp);
            }

            let value = cellObject.value;
            formula = formula.replace(fComp , value);
        }
    }

    // stack infix evaluation => ( 10 + 20 );
    let value = eval(formula);
    return value;
}
function getRowIdColIdFromAddress(address){
    // C1 => 
    // C => colId => 2 
    // 1 => rowId => 0

    let colId = address.charCodeAt(0) - 65;
    let rowId = Number(address.substring(1)) - 1;
    return {rowId , colId};
}
function updateChildrens(cellObject){
    // {
    //     name:"A1",
    //     value:100,
    //     childrens:["B1"]
    // }
    for(let i=0 ; i<cellObject.childrens.length ; i++){
        let childName = cellObject.childrens[i];
        let {rowId , colId} = getRowIdColIdFromAddress(childName);
        let childrenCellObject = db[rowId][colId];
        let newValue = solveFormula(childrenCellObject.formula);
        // B1 => db update
        childrenCellObject.value = newValue;
        // B1 => UI update
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).textContent = newValue;
        updateChildrens(childrenCellObject);
    }
}
function deleteFormula(cellObject){
    cellObject.formula="";
    for(let i = 0 ;i<cellObject.parents.length ; i++){
        // A1 , A2
        let parentName = cellObject.parents[i];
        let {rowId , colId}= getRowIdColIdFromAddress(parentName);
        let parentCellObject = db[rowId][colId];
        let filteredChildrens = parentCellObject.childrens.filter( child =>{
            return child != cellObject.name;
        });
        parentCellObject.childrens = filteredChildrens;
    }
    cellObject.parents = [];
}
