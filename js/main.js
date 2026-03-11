import { csvToJson } from "./services/csvToJson.js";
import state from './state.js'
import { makeTable } from "./table.js"

document.getElementById('uploadFile').addEventListener("change", handleFileSelection)

async function handleFileSelection(e) {
    const loader = document.getElementById('loader')
    const file = e.target.files[0];

    const reader = new FileReader()

    reader.onloadstart = function(){
        loader.className = 'block';
    }
    
    reader.onload = function(e){
        const fileText = e.target.result;
        state.jsonData = csvToJson(fileText)
        makeTable(state.jsonData)
    }

    reader.onloadend = function () {
        loader.className = "hidden";
    };

    reader.readAsText(file);
}