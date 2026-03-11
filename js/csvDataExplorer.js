export default class CsvDataExplorer{
    #jsonData = []
    #dataTypeOfData = {}

    constructor(){}

    get jsonData(){
        return this.#jsonData;
    }

    get dataTypeOfData(){
        return this.#dataTypeOfData;
    }

    csvToJson(fileText){
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
        this.#jsonData = structuredClone(jsonData);
        this.setDataTypeOfData(jsonData[0])
    }

    setDataTypeOfData(row){
        for(const [key, val] of Object.entries(row)){
            let type;
            if(val === '')
                type = 'string'
            else if(!isNaN(val))
                type = 'number'
            else if(val === 'true' || val === 'false')
                type = 'boolean'
            else if(!isNaN(Date.parse(val)))
                type = 'object'
            else
                type = 'string'
            row[key] = type;
        }
        this.#dataTypeOfData = row;
    }
}