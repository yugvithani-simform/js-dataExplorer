import { filtering } from "./features/filtering.js";
import { showNextPage, showPrevPage, showPageAtPageNo, changeOffset, pagination } from "./features/pagination.js";
import { sorting } from "./features/sorting.js";
import { handleUploadedFile } from "./services/handleUploadedFile.js";

document.getElementById('uploadFile').addEventListener("change", handleUploadedFile)

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
    filtering(queryToFilter.value, filterColumn.value)
    if(queryToFilter.value !== ''){
        pagination()
    }
})