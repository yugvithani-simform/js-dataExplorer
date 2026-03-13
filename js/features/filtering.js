import state from "../state.js";
import { sorting } from "./sorting.js";

export function filtering(query, columnName = state.filterColumn){
    state.filterQuery = query
    state.filterColumn = state.filterColumn
    state.filteredData = state.jsonData

    query = query.toLowerCase()
    state.filteredData = state.filteredData.filter((ele)=> {
        let flag = false;
        if(columnName === 'all'){
            for(let val of Object.values(ele)){
                let lcVal = val.toLowerCase()
                flag = lcVal.includes(query)
                if(flag) break;
            }
        }
        else{
            let lcVal = ele[columnName].toLowerCase()
            flag = lcVal.includes(query)
        }
        return flag;
    })
    state.pageNo = 1
    if(state.sortColumn){
        state.sortOrder = (state.sortOrder === 'asc') ? 'desc' : 'asc';
        sorting()
    }
}