import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable, shouldResize } from "./table.resize";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input', 'mousedown', 'mousemove', 'mouseup']
        })
        this.$root = $root
    }

    render() {
        return createTable(20)
    }

    onClick(event) {
        
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeTable(this.$root, event)
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
}