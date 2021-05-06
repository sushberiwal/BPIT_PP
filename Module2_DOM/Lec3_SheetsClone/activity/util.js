function solveFormula(formula){
    // ( A1 + A2 ) => ( 10 + 20 );
    let formulaComps = formula.split(" ");
    // ["(" , "A1" , "+" , "A2" , ")"];
    for(let i=0 ; i<formulaComps.length ; i++){
        let fComp = formulaComps[i];
        if( fComp[0] >= "A" && fComp[0] <= "Z" ){
            // inside valid fComponent
            let {rowId , colId} = getRowIdColIdFromAddress(fComp);
            let cellObject = db[rowId][colId];
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