import { ExcelComponent } from "./ExcelComponent";

export class FormulaComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
        })
    }

    render() {
        return `
            <span>fx</span>
            <div class="fx_input" contenteditable="true"></div>
        `
    }

    onInput() {
        console.log('input');
    }
}