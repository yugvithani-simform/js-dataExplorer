import state from "../state.js";
import { pagination } from "./pagination.js";

export function resetState(){
    state.filteredData = structuredClone(state.jsonData);
    state.pageNo = 1;
    state.pageOffset = 10;
    state.startIndex = 0;
    state.sortColumn = null;
    state.sortOrder = 'asc';
    state.filterColumn = 'all';
    state.filterQuery = '';
    pagination()
}