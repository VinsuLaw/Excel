import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable, shouldResize } from "./table.resize";
import { mouseSelection, nextCell, onClickSelect, selectByKeys, shouldSelect } from "./table.selection";
import { $ } from "../../core/DOM";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input', 'mousedown', 'mouseup', 'scroll', 'keydown']
        })
        this.$root = $root
        this.rowsCount = 20
    }

    render() {
        return createTable(this.rowsCount)
    }

    onClick(event) {
        event.target.dataset.cell ? onClickSelect(event, this.$root) : null
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.isMouseDown = true
            resizeTable(this.$root, event, this.rowsCount)
        }

        if (shouldSelect(event)) {
            mouseSelection(this.$root, event)
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
            selectByKeys(event, this.$root)
        }
    }

    onScroll(event) {
        this.$root.leftScrolled = event.target.scrollLeft
    }
}