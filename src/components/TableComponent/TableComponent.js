import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable, shouldResize } from "./table.resize";
import { $ } from "../../core/DOM";
import { TableSelection } from "./TableSelection";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input', 'mousedown', 'mouseup', 'scroll', 'keydown']
        })
        this.$root = $root
        this.rowsCount = 20
        this.selection = new TableSelection(this.$root, this.rowsCount)
    }

    prepare() {}

    init() {
        super.init()

        console.log('init');


        const cell = $(this.$root.findElement(`[data-col="0:0"]`))
        this.selection.select(cell)
    }

    render() {
        return createTable(this.rowsCount)
    }

    onClick(event) {
        event.target.dataset.cell ? this.selection.onClickSelect(event) : null
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

    onInput() {
        console.log('Table component input');
    }

    onKeydown(event) {
        const keysEvents = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        if (keysEvents.includes(event.key) && event.shiftKey) {
            event.preventDefault()
            if (this.selection.current != null) {
                this.selection.selectByKeys(event)
            }
        }
    }

    onScroll(event) {
        this.$root.leftScrolled = event.target.scrollLeft
    }
}