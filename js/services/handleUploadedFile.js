import { csvToJson } from "./csvToJson.js";
import state from '../state.js'
import { pagination } from "../features/pagination.js";
import { calculateColumnWidths } from "../render.js";

export function handleUploadedFile(e) {
    const loader = document.getElementById('loader')
    const paginationSection = document.getElementById('paginationSection')
    const file = e.target.files[0];

    const reader = new FileReader()

    reader.onloadstart = function(){
        loader.className = 'block';
    }
    
    reader.onload = function(e){
        const fileText = e.target.result;
        state.jsonData = csvToJson(fileText)
        calculateColumnWidths(state.jsonData);
        pagination();
    }

    reader.onloadend = function () {
        loader.className = "hidden";
        paginationSection.classList.remove('hidden')
        paginationSection.classList.add('flex');
    };

    reader.readAsText(file);
}