import state from "../state.js";

export function fetchRecord(recordId){
    return state.filteredData[recordId];
}