import { parse } from "../../core/parse"

const CODES_ASCII = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

// Getting char symbol from ascii code (A-Z)
function toChar(_, index) {
    return String.fromCharCode(CODES_ASCII.A + index)
}

function toColumn({col, index, width}) {
    return `
        <div class="table_col" data-col="${index}" data-type="resizable" style="width: ${width}">
            ${col} 
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(idx, content, state) {
    return `
        <div class="table_row" data-type="resizable" data-row="${idx}" style="height: ${getHeight(state, idx)}">
            <div class="row-info">
                ${idx || ''}
                ${idx > 0 ? '<div class="row-resize" data-resize="row"></div>' : ''}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toCell(state, row, dataState) {
    return function(_, col) {
        const id = `${row}:${col}`
        return `
            <div class="cell" 
            contenteditable="true"  
            data-col="${id}" 
            data-cell="true"
            data-value="${getDataStateText(id, dataState)}"
            ${getDataStateLink(id, dataState)}
            style="width: ${getWidth(state, col)}; text-decoration: ${getTextDecor(id, dataState)};"
            >${parse(getDataStateText(id, dataState))}</div>
        `
    }
}

export function createTable(rowsCount = 20, state) {
    const colsCount = CODES_ASCII.Z - CODES_ASCII.A + 1
    const rows = []

    // Getting all headering columns
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols, {})) // Creating row with a headering columns

    // Creating rows with editable cells
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state.colState, row, state.dataState))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}

function widthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getDataStateText(id, dataState) {
    let keys = Object.keys(dataState)
    let result = null
    keys.forEach(Lid => {
        if (Lid === id) {
            result = dataState[Lid].text
        }
    })
    if (result === null) {
        return ''
    } else {
        return result
    }
}

function getDataStateLink(id, dataState) {
    let keys = Object.keys(dataState)
    let link = null
    keys.forEach(Lid => {
        if (Lid === id) {
            if (dataState[Lid].link != null) {
                link = dataState[Lid].link
            }
        }
    })
    if (link != null) {
        return `data-link="${link}"`
    } else {
        return ''
    }
}

function getTextDecor(id, dataState) {
    let keys = Object.keys(dataState)
    let decoration = null
    keys.forEach(Lid => {
        if (Lid === id) {
            if (dataState[Lid].link != null) {
                decoration = 'underline'
            }
        }
    })
    if (decoration != null) {
        return decoration
    } else {
        return ''
    }
}