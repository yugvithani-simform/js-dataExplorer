import { showNextPage, showPrevPage, showPageAtPageNo, changeOffset } from "./features/pagination.js";
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