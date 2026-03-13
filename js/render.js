import state from "./state.js";

export function calculateColumnWidths(jsonData) {
    const headers = Object.keys(jsonData[0]);
    
    headers.forEach(header => {
        let maxLength = header.length;
        
        jsonData.forEach(row => {
            const cellValue = String(row[header] || '').length;
            maxLength = Math.max(maxLength, cellValue);
        });
        
        // Add padding for better reading
        state.columnWidths[header] = maxLength + 7;
    });
}

export function render(filteredData){
    document.getElementById('totalPage').innerHTML = `/ ${state.totalPage}`;
    document.getElementById('pageNo').value = state.pageNo;
    document.getElementById('pageOffset').value = state.pageOffset;
    makeTable(filteredData)
}

function makeTable(jsonData){
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');

    const headers = Object.keys(state.typeOfData)
    let headerRow = '<tr id="headers" class="px-3 py-3 text-center text-sm font-semibold text-gray-700 uppercase">';
    headers.map(header => {
        const width = state.columnWidths[header] || 20;
        headerRow += 
            `<th id='${header}' class="group cursor-pointer px-3 py-2 text-left" style="min-width: ${width}ch; word-break: break-word;">
                ${header.replaceAll('_', ' ')}
                <i class="fa-solid ${(state.sortColumn === header && state.sortOrder === 'desc') ? 'fa-caret-up' : 'fa-caret-down'} ml-1 ${state.sortColumn === header ? 'opacity-100' : 'opacity-0'} group-hover:opacity-80 transition"></i>
            </th>`
    })
    headerRow += '</tr>'
    tableHead.innerHTML = headerRow;

    let dataRows = ''
    jsonData.map((dataObj) => {
        let dataRow = `<tr id="${(state.pageNo-1)*state.pageOffset + jsonData.indexOf(dataObj)}" class="data hover:bg-gray-50">`;
        headers.forEach(h => {
            const width = state.columnWidths[h] || 20;
            let highlightedText = dataObj[h]

            // highlight the filter query text
            if(state.filterQuery && (state.filterColumn === h || state.filterColumn === 'all')){
                // RegExp : g->global → find all matches, i-> ignore case so use for match the case-insensetive
                // $& -> the exact matched substring
                highlightedText = highlightedText.replaceAll(new RegExp(state.filterQuery, "gi"), `<span class="bg-yellow-300">$&</span>`)
            }

            dataRow += `<td class="px-3 py-3 text-sm text-gray-600" style="min-width: ${width}ch; word-break: break-word;">${highlightedText}</td>`;
        });
        dataRow += '</tr>'
        dataRows += dataRow;
    })
    tableBody.innerHTML = dataRows;
}