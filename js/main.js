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
        const jsonData = csvToJson(fileText)
        makeTable(jsonData)
    }

    reader.onloadend = function () {
        loader.className = "hidden"; 
    };

    reader.readAsText(file);
    
}

function csvToJson(fileText){
    const rows = fileText.split('\n');
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1);
    let jsonData = []

    for(let dataRow of dataRows){
        let data = dataRow.split(',');
        let jsonObj = {}
        for(let j=0; j<headers.length; j++){
            jsonObj[headers[j]] = data[j];
        }
        jsonData.push(jsonObj)
    }

    return jsonData;
}

function makeTable(jsonData){
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');
    
    const headers = Object.keys(jsonData[0])
    let headerRow = '<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase">';
    headers.map(header => headerRow += `<td>${header}</td>`)
    headerRow += '</th>'

    tableHead.innerHTML += headerRow;
    let dataRows = ''
    jsonData.map((dataObj) => {
        let dataRow = '<tr class="hover:bg-gray-50">';
        headers.forEach(h => dataRow += `<td class="px-4 py-3 text-sm text-gray-600">${dataObj[h]}</td>`);
        dataRow += '</tr>'
        dataRows += dataRow;
    })
    tableBody.innerHTML += dataRows;
}