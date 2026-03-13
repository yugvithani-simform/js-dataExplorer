import { csvToJson } from "./csvToJson.js";
import state from '../state.js'
import { pagination } from "../features/pagination.js";
import { calculateColumnWidths } from "../render.js";
import { resetState } from "../features/resetState.js";

export function handleUploadedFile(e) {
    const loader = document.getElementById('loader')
    const features = document.getElementById('features')
    const downloadCSV = document.getElementById('downloadCSV')
    const file = e.target.files[0];

    const reader = new FileReader()

    reader.onloadstart = function(){
        loader.className = 'block';
    }
    
    reader.onload = function(e){
        const fileText = e.target.result;
        state.jsonData = csvToJson(fileText)
        state.filteredData = structuredClone(state.jsonData)
        calculateColumnWidths(state.filteredData);
        addFilterColumn(Object.keys(state.filteredData[0]))
        resetState();
        pagination();
    }

    reader.onloadend = function () {
        loader.className = "hidden";

        features.classList.remove('hidden')
        features.classList.add('flex');

        downloadCSV.classList.remove('hidden')
        downloadCSV.classList.add('block')
    };

    reader.readAsText(file);
}

function addFilterColumn(headers){
    let filterColumn = document.getElementById('filterColumn')
    filterColumn.innerHTML = `<option value="all">All Columns</option>`
    for(let header of headers){
        let formatedHeader = header.replaceAll('_', ' ');
        formatedHeader = formatedHeader.charAt(0).toUpperCase() + formatedHeader.slice(1);
        filterColumn.innerHTML += `<option value="${header}"> ${formatedHeader} </option>`
    }
}