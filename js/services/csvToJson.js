import state from "../state.js";

export function csvToJson(fileText){
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
    state.typeOfData = setTypeOfData(structuredClone(jsonData[0]))
    return jsonData;
}

function setTypeOfData(row){
    for(const [key, val] of Object.entries(row)){
        let type;
        if(val === '')
            type = 'string'
        else if(!isNaN(val))
            type = 'number'
        else if(!isNaN(Date.parse(val)))
            type = 'object'
        else
            type = 'string'
        row[key] = type;
    }
    return row;
}