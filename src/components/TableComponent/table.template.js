const CODES_ASCII = {
    A: 65,
    Z: 90
}

// Getting char symbol from ascii code (A-Z)
function toChar(_, index) {
    return String.fromCharCode(CODES_ASCII.A + index)
}

function toColumn(col, index) {
    return `
        <div class="table_col" data-col="${index}" data-type="resizable">
            ${col} 
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(idx, content) {
    return `
        <div class="table_row" data-type="resizable">
            <div class="row-info">
                ${idx || ''}
                ${idx > 0 ? '<div class="row-resize" data-resize="row"></div>' : ''}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toCell(row, col) {
    return `
        <div class="cell" contenteditable="true" data-col="${col}"></div>
    `
}

export function createTable(rowsCount = 20) {
    const colsCount = CODES_ASCII.Z - CODES_ASCII.A + 1
    const rows = []

    // Getting all headering columns
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols)) // Creating row with a headering columns

    // Creating rows with editable cells
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map((_, col) => toCell(row, col))
            .join('')
        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}