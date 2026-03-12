const state = {
    jsonData: [],
    typeOfData: {},
    filteredData: [],
    isSorted: false,
    isFiltered: false,
    pageNo: 1,
    totalPage: 1,
    startIndex: 0,
    pageOffset: 10,
    sortColumn: null,
    sortOrder: 'asc',
    filterColumn: 'all',
    filterQuery: '',
    columnWidths: {}
}

export default state;