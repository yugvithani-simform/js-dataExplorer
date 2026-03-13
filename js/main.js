import { fetchRecord } from "./features/fetchRecord.js";
import { filtering } from "./features/filtering.js";
import { showNextPage, showPrevPage, showPageAtPageNo, changeOffset, pagination } from "./features/pagination.js";
import { resetState } from "./features/resetState.js";
import { sorting } from "./features/sorting.js";
import { handleUploadedFile } from "./services/handleUploadedFile.js";
import state from "./state.js";

//when upload the file
document.getElementById('uploadFile').addEventListener("change", (e) => {
    document.getElementById('fileName').innerText = e.target.files[0].name
    handleUploadedFile(e)
})

// to download the file
document.getElementById('downloadCSV').addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += Object.keys(state.filteredData[0]).join(",") + "\n";
    csvContent += state.filteredData.map(row => Object.values(row).join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

// previous and next page button
document.getElementById('prevPage').addEventListener("click", showPrevPage)
document.getElementById('nextPage').addEventListener("click", showNextPage)

// change Page Number by giving input 
let pageNo = document.getElementById('pageNo')
pageNo.addEventListener("change", (e) => {
    pageNo.value = Math.floor(e.target.value)
    showPageAtPageNo(pageNo.value)
})

// change Offset Value
document.getElementById('pageOffset').addEventListener("change", changeOffset)

// for sorting, use event delegation
document.getElementById('table-head').addEventListener("click", (e) => {
    if(e.target.tagName === 'I' || e.target.tagName === 'TH'){
        sorting(e.target.closest('th').id)
        pagination()
    }
})

// column name which is used to filter
let queryToFilter = document.getElementById('filterQuery')
let filterColumn = document.getElementById('filterColumn')

queryToFilter.addEventListener("input", () => {
    filtering(queryToFilter.value, filterColumn.value)
    pagination()
})

filterColumn.addEventListener("change", () => {
    if(queryToFilter.value !== '')
        filtering(queryToFilter.value, filterColumn.value)
        pagination()
})

// view record by pop up
document.getElementById('table-body').addEventListener("click" ,(e) => {
    if(!e.target.closest('tr').id || e.target.closest('tr').id === 'headers')
        return;
    let id = e.target.closest('tr').id;
    let record = fetchRecord(id);

    let popup = document.getElementById('recordPopup')
    popup.innerHTML = ''
    let div = document.createElement('div')
    popup.classList.replace('hidden', 'flex')
    div.id='popupBox'
    div.classList.add('bg-white', 'w-100', 'rounded-lg', 'shadow-xl', 'p-6')
    div.innerHTML = ''
    for(let [key, val] of Object.entries(record)){
        let formatedKey = key.replaceAll('_', ' ');
        formatedKey = formatedKey.charAt(0).toUpperCase() + formatedKey.slice(1);
        div.innerHTML += `<div><strong>${formatedKey}</strong>: ${val} </div>`
    }

    popup.appendChild(div)
})

document.getElementById('recordPopup').addEventListener("click", (e)=> {
    let popup = document.getElementById('popupBox')
    if(!popup.contains(e.target)){
        e.target.classList.replace('flex', 'hidden')
    }
})

// reset button
document.getElementById('resetButton').addEventListener("click", () => {
    queryToFilter.value = ''
    filterColumn.value = 'all'
    resetState()
})