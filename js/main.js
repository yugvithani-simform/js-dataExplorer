import CsvDataExplorer from "./csvDataExplorer.js";

const csvDataExplorer = new CsvDataExplorer()
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
        csvDataExplorer.csvToJson(fileText)
        makeTable(csvDataExplorer.jsonData)
    }

    reader.onloadend = function () {
        loader.className = "hidden";
    };

    reader.readAsText(file);
}

function makeTable(jsonData){
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');
    
    const headers = Object.keys(jsonData[0])
    let headerRow = '<tr class="px-3 py-3 text-center text-sm font-semibold text-gray-700 uppercase">';
    headers.map(header => headerRow += `<th>${header.replace('_', ' ')}</th>`)
    headerRow += '</tr>'
    tableHead.innerHTML += headerRow;

    let dataRows = ''
    jsonData.map((dataObj) => {
        let dataRow = '<tr class="hover:bg-gray-50">';
        headers.forEach(h => dataRow += `<td class="px-3 py-3 text-sm text-gray-600">${dataObj[h]}</td>`);
        dataRow += '</tr>'
        dataRows += dataRow;
    })
    tableBody.innerHTML += dataRows;
}