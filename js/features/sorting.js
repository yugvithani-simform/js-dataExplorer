import state from "../state.js";

export function sorting(columnName = state.sortColumn){
    const typeOfColumn = state.typeOfData[columnName]
    if(state.sortColumn === columnName){
        state.sortOrder = (state.sortOrder === 'asc') ? 'desc' : 'asc';
    }
    else {
        state.sortOrder = 'asc'
        state.sortColumn = columnName
    }
    state.sortedData = structuredClone(state.jsonData)
    state.sortedData.sort( (x,y) => {
        if(state.sortOrder === 'desc')
            [x, y] = [y, x]

        if(typeOfColumn === 'number')
            return Number(x[columnName]) - Number(y[columnName])
        else if(typeOfColumn === 'object')
            return new Date(x[columnName]) - new Date(y[columnName]);
        return x[columnName].localeCompare(y[columnName])
    })
    state.pageNo = 1;
}