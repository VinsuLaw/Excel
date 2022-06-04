import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./TableTemplate";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input']
        })
        this.$root = $root
    }

    render() {
        return createTable(20)
    }

    onClick() {
        console.log('Table component click');
    }

    onInput() {
        console.log('Table component input');
    }
}