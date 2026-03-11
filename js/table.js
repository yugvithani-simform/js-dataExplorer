export function makeTable(jsonData){
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