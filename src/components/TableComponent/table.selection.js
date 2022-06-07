import { $ } from "../../core/DOM";

let selected = []
let selectedItems = []

export function shouldSelect(event) {
    return event.shiftKey
}

function creatSelectionFrame($root) {
    const selectionFrame = $($root.create('div'))
    selectionFrame.addID('selectFrame')
    $root.insertHTML('beforeend', selectionFrame.$el)
    return selectionFrame
}

function getCoords(e) { 
    return [e.pageX, e.pageY]
}

function doSelection(x1, y1, x2, y2, leftScrolled, $root) {
    y1 = y1 - 140
    x1 = x1 - 100
    x2 = x2 - 100
    y2 = y2 - 140
    if (x1 == x2) {
        return
    }
    if (y1 == y2) {
        return
    }
    if (x1 > x2) {
        x1 = x1 + x2
        x2 = x1 - x2
        x1 = x1 - x2
    }
    if (y1 > y2) {
        y1 = y1 + y2
        y2 = y1 - y2
        y1 = y1 - y2
    }

    let cells = document.getElementsByClassName('cell')

    for (let cell in cells) {
        if (cells.hasOwnProperty(cell)) {
            let item = cells[cell]
            if (
                item.offsetLeft >= leftScrolled + x1 && 
                item.offsetLeft <= leftScrolled + x2 &&
                item.offsetTop >= y1 &&
                item.offsetTop <= y2
                ) {
                    selectedItems.push(item.dataset.col)
                }
        }
    }

    selectedItems.forEach(dataset => {
        const cell = $root.findElement(`[data-col="${dataset}"]`)
        $(cell).addClass(['selected'])
    })
}

export function mouseSelection($root, event) {
    const leftScrolled = $root.leftScrolled
    let mousedown = true
    const $selectionFrame = creatSelectionFrame($root)
    let [msx, msy] = getCoords(event)

    document.onmousemove = e => {
        let x1 = 0
        let x2 = 0
        let y1 = 0
        let y2 = 0

        x1 = msx
        y1 = msy

        let [mousex, mousey] = getCoords(e)

        x2 = mousex
        y2 = mousey

        if (x1 == x2) { 
            return
        }
        if (y1 == y2) {
            return
        }

        if (x1 > x2) {
            x1 = x1 + x2
            x2 = x1 - x2
            x1 = x1 - x2
        }

        if (y1 > y2) {
            y1 = y1 + y2
            y2 = y1 - y2
            y1 = y1 - y2
        }

        const visible = mousedown ? 'visible' : 'hidden'

        $selectionFrame.css({
            top: y1 - 140 + 'px',
            left: leftScrolled + x1 + 'px',
            width: x2 - x1 + 'px',
            height: y2 - y1 + 'px',
            visibility: visible
        })
    }

    document.onmouseup = (e) => {
        document.onmousemove = null
        mousedown = false

        let msxUp = e.pageX;
        let msyUp = e.pageY;

        doSelection(msxUp, msyUp, msx, msy, leftScrolled, $root)

        const visible = mousedown ? 'visible' : 'hidden'

        $selectionFrame.css({
            visibility: visible
        })

        $selectionFrame.destroy()
    }
}

export function onClickSelect(event, $root, selection) {
    document.onmouseup = null

    if (!event.shiftKey) {
        if (selectedItems.length > 0) {
            selectedItems.forEach((dataset, index) => {
                const cell = $root.findElement(`[data-col="${dataset}"]`)
                $(cell).removeClass(['selected'])
                selectedItems = []
            })
        }
    }

    if (event.shiftKey) {
        const targetCell = $(event.target)
        if (targetCell.hasClass('selected')) {
            targetCell.removeClass(['selected'])
            selectedItems.forEach((element, index) => {
                if (element === targetCell.$el.dataset.col) {
                    selectedItems.splice(index, 1)
                }
            })
            return
        }
    }

    const cell = $root.findElement(`[data-col="${event.target.dataset.col}"]`)
    selectedItems.push(event.target.dataset.col)
    $(cell).addClass(['selected'])
    selection.select($(cell))
}

function nextCell(key, {col, row}) {
    const MIN_VALUE = 0
    const MAX_Y_VALUE = 19
    const MAX_X_VALUE = 25
    switch (key) {
        case 'Enter':
        case 'ArrowDown': 
            row >= MAX_Y_VALUE ? row+=0 : row++
            break;
        case 'Tab':
        case 'ArrowRight':
            col >= MAX_X_VALUE ? col+=0 : col++
            break;
        case 'ArrowLeft':
            col <= MIN_VALUE ? col-=0 : col-- 
            break;
        case 'ArrowUp':
            row <= MIN_VALUE ? row-=0 : row--
            break;
    }

    return `[data-col="${row}:${col}"]`
}

export function selectByKeys(event, $root) {
    const targetCell = selectedItems.at(-1)
    let parsed = targetCell.split(':')
    const id = {
        row: +parsed[0],
        col: +parsed[1]
    }
    
    let $next = $root.findElement(nextCell(event.key, id))
    $($next).addClass(['selected'])
    selectedItems.push($next.dataset.col)
}