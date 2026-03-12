import state from "../state.js";
import { render } from "../render.js";

function pagination () {
    state.startIndex = (state.pageNo-1) * state.pageOffset;
    let end = state.startIndex + state.pageOffset;

    state.totalPage = Math.ceil(state.filteredData.length / state.pageOffset)
    if(end > state.totalPage * state.pageOffset)
        end = state.totalPage;
    render(state.filteredData.slice(state.startIndex, end))
}

function showPrevPage(){
    if(state.pageNo === 1)
        return;
    state.pageNo--;
    pagination()
}

function showNextPage(){
    if(state.pageNo === state.totalPage)
        return;
    state.pageNo++;
    pagination()
}

function showPageAtPageNo(pageNo){
    if(pageNo < 1){
        state.pageNo = 1
    }
    else if(pageNo > state.totalPage){
        state.pageNo = state.totalPage
    }
    else{
        state.pageNo = pageNo;
    }
    pagination()
}

function changeOffset(e){
    state.pageOffset = Number(e.target.value)
    state.pageNo = Math.ceil((state.startIndex+1) / state.pageOffset)
    showPageAtPageNo(state.pageNo)
}

export {pagination, showPrevPage, showNextPage, showPageAtPageNo, changeOffset}