import { $ } from "../../core/DOM"
import { ExcelComponent } from "../ExcelComponent"

export class TableSelection extends ExcelComponent {
    static className = 'selected'

    constructor($root, rowsCount, options) {
        super($root, {
            ...options
        })
        this.$root = $root
        this.rowsCount = rowsCount
        this.group = []
        this.current = null
    }

    // Select cell
    select($cell) {
        $cell.addClass([TableSelection.className])
        this.group.push($cell.id())
        this.current = $cell
    }

    focus() {
        this.current.focus()
        this.$emit('table:select', this.current)
        this.$dispatch({type: '__TEST__'})
    }

    // Selection by one mouse click
    onClickSelect(event) {
        document.onmouseup = null

        // Just disabling all selected cells
        if (!event.shiftKey) {
            if (this.group.length > 0) {
                this.group.forEach((dataset, index) => {
                    const cell = $(this.$root.findElement(`[data-col="${dataset}"]`))
                    cell.removeClass([TableSelection.className])
                    this.group = []
                })
            }
        }

        // Disable selected cell if clicked on active cell with hold shift
        if (event.shiftKey) {
            const targetCell = $(event.target)
            if (targetCell.hasClass('selected')) {
                targetCell.removeClass([TableSelection.className])
                this.group.forEach((element, index) => {
                    if (targetCell.$el.dataset.col === element) {
                        this.group.splice(index, 1)
                    }
                })
                this.current = null
                return 
            }
        }

        const $cell = $(this.$root.findElement(`[data-col="${event.target.dataset.col}"]`))
        this.select($cell)
        this.focus()
    }

    // Table selection by keybord
    selectByKeys(event, shift) {
        const targetCell = this.group.at(-1)
        const id = this.parseToID(targetCell)
        if (!shift) {
            const $cell = $(this.$root.findElement(`[data-col="${targetCell}"]`))
            $cell.removeClass([TableSelection.className])
            this.group = []
        } 

        const $next = $(this.$root.findElement(nextCell(event.key, id, this.rowsCount)))
        this.select($next)
        this.focus()
    }

    // Get the parsed cell.dataset
    parseToID(targetCell) {
        const parsed = targetCell.split(':')
        return { row: +parsed[0], col: +parsed[1] }
    }

    shouldSelect(event) {
        return event.shiftKey
    }

    // Mouse frame-selection
    mouseSelection(event) {
        const leftScrolled = this.$root.leftScrolled
        let mousedown = true
        const $selectionFrame = creatSelectionFrame(this.$root)
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
    
            this.doSelection(msxUp, msyUp, msx, msy, leftScrolled)
    
            const visible = mousedown ? 'visible' : 'hidden'
    
            $selectionFrame.css({
                visibility: visible
            })
    
            $selectionFrame.destroy()
        }
    }

    // Do selection by frame-selection
    doSelection(x1, y1, x2, y2, leftScrolled) {
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
    
        const cells = document.getElementsByClassName('cell')
    
        for (let cell in cells) {
            if (cells.hasOwnProperty(cell)) {
                let item = cells[cell]
                if (
                    item.offsetLeft >= leftScrolled + x1 && 
                    item.offsetLeft <= leftScrolled + x2 &&
                    item.offsetTop >= y1 && item.offsetTop <= y2
                    ) {
                        let $cell = $(this.$root.findElement(`[data-col="${item.dataset.col}"]`))
                        this.select($cell)
                    }
            }
        }

        this.focus()
    }
}

// Get the next cell in `[data-col="${row}:${col}"]` format
function nextCell(key, {col, row}, rowsCount) {
    const MIN_VALUE = 0
    const MAX_Y_VALUE = rowsCount - 1
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

// Creating selection frame
function creatSelectionFrame($root) {
    const selectionFrame = $($root.create('div'))
    selectionFrame.addID('selectFrame')
    $root.insertElement('beforeend', selectionFrame.$el)
    return selectionFrame
}

// Get mouse coords
function getCoords(e) { 
    return [e.pageX, e.pageY]
}