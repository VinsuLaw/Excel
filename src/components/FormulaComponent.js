import { $ } from "../core/DOM";
import { ExcelComponent } from "./ExcelComponent";

export class FormulaComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown', 'click'],
            ...options
        })
    }

    init() {
        super.init()

        this.$formula = this.$root.findElement('#formula')

        this.$subscribe((state) => {
            this.$formula.textContent = state.currentText
        })

        this.$on('table:select', ($cell) => {
            this.$formula.textContent = $cell.text()
        })
    } 

    render() {
        return `
            <span>fx</span>
            <div id="formula" class="fx_input" contenteditable="true"></div>
        `
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keyEvents = ['Enter', 'Tab']
        if (keyEvents.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }

    onClick() {
        this.$emit('formula:click')
    }
}