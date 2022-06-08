import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable, shouldResize } from "./table.resize";
import { $ } from "../../core/DOM";
import { TableSelection } from "./TableSelection";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input', 'mousedown', 'mouseup', 'scroll', 'keydown'],
            ...options
        })
        this.$root = $root
        this.rowsCount = 20
        this.selection = new TableSelection(this.$root, this.rowsCount, options)
        this.usageFormats = []
    }

    init() {
        super.init()

        const $cell = $(this.$root.findElement(`[data-col="0:0"]`))
        this.selection.select($cell)
        
        this.$on('formula:input', (text) => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:format', ($target, condition) => {
            const formatType = $target.dataset('format')
            const selection = this.selection.current.id()

            if (formatType && condition) {
                let alredyHas = false
                this.selection.current.addClass([formatType])
                if (this.usageFormats.length > 0) {
                    this.usageFormats.forEach(cell => {
                        for (let key in cell) {
                            if (cell.hasOwnProperty(key)) {
                                if (cell[key] === selection) {
                                    cell['textFormats'].push(formatType)
                                    alredyHas = true
                                }
                            }
                        }
                    })
                    if (!alredyHas) {
                        this.usageFormats.push({
                            'selection': selection, 
                            'textFormats': [formatType]
                        })
                    }
                } else {
                    this.usageFormats.push({
                        'selection': selection, 
                        'textFormats': [formatType]
                    })
                }
            } else if (formatType && !condition) {
                this.selection.current.removeClass([formatType])
                if (this.usageFormats.length > 0) {
                    this.usageFormats.forEach(cell => {
                        for (let key in cell) {
                            if (cell.hasOwnProperty(key)) {
                                if (cell[key] === selection) {
                                    cell['textFormats'] = cell['textFormats'].filter(el => el !== formatType)
                                    if (cell['textFormats'].length === 0) {
                                        this.usageFormats = this.usageFormats.filter(el => el.selection !== cell['selection'])
                                    }
                                }
                            }
                        }
                    })
                }
            }

            console.log(this.usageFormats);
        })
    }

    render() {
        return createTable(this.rowsCount)
    }

    onClick(event) {
        event.target.dataset.cell ? this.selection.onClickSelect(event) : null
        this.$emit('table:click')
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.isMouseDown = true
            resizeTable(this.$root, event, this.rowsCount)
        }

        if (this.selection.shouldSelect(event)) {
            this.selection.mouseSelection(event)
        }
    }

    onMousemove(event) {
        console.log('mousemove');
    }

    onMouseup(event) {
        this.$root.off('mousemove', this.onMousemove)
    }

    onInput(event) {
        this.$emit('table:input', $(event.target).text())
    }

    onKeydown(event) {
        const keysEvents = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        if (keysEvents.includes(event.key) && event.shiftKey) {
            event.preventDefault()
            if (this.selection.current != null) {
                this.selection.selectByKeys(event, true)
            }
        } else if (keysEvents.includes(event.key) && event.ctrlKey) {
            event.preventDefault()
            if (this.selection.current != null) {
                this.selection.selectByKeys(event, false)
            }
        }
    }

    onScroll(event) {
        this.$root.leftScrolled = event.target.scrollLeft
    }
}