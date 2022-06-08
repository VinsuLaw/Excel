import { ExcelComponent } from "../components/ExcelComponent"
import { $ } from "./DOM"

export class Select {
    static HIDE = 'hide'

    constructor($select, type, options) {
        this.UNFOLD = false
        this.$select = $(document.querySelector($select))
        this.ul = null
        this.label = options.label
        this.items = options.items
        this.selectLabel = null
        this.selectLabel_span = null
        this.input = null
        this.selected = null
    }

    renderInputSelect() { 
        let childnodes = Array.from(this.$select.$el.children)
        childnodes = childnodes.filter(node => node.tagName === 'UL' || node.classList.contains('select-label'))
        
        this.selectLabel = childnodes[0]
        let label = Array.from(this.selectLabel.children)
        this.input = label.filter(node => node.tagName === 'INPUT')[0]
        this.input.value = ''
        this.input.value = this.label

        this.ul = $(childnodes[1])
        this.ul.innerHTML('')
    
        this.getSelectList().forEach(item => this.ul.insertHTML('beforeend', item))
    }

    renderNormalSelect() {
        let childnodes = Array.from(this.$select.$el.children)
        childnodes = childnodes.filter(node => node.tagName === 'UL' || node.classList.contains('select-label'))

        this.selectLabel = childnodes[0]
        this.selectLabel_span = this.selectLabel.querySelector('.selected')
        this.ul = $(childnodes[1])
        this.ul.innerHTML('')
    
        this.getSelectList().forEach(item => this.ul.insertHTML('beforeend', item))
    }

    getSelectList() {
        return this.items.map((item, index) => `<li data-id="${index}">${item}</li>`)
    }

    unfold() {
        const $selectLabel = $(this.selectLabel)
        $selectLabel.addClass(['active'])
        this.ul.removeClass([Select.HIDE])
        this.UNFOLD = true
    }

    close() {
        const $selectLabel = $(this.selectLabel)
        $selectLabel.removeClass(['active'])
        this.ul.addClass([Select.HIDE])
        this.UNFOLD = false
    }

    choiceSelectInput(data = 10, input = false) {
        if (input && data < 100) {
            this.input.value = data
            this.selected = data
        } else if (data >= 100) {
            this.input.value = 10
        } else if (!input) {
            this.input.value = this.items[data]
            this.selected = this.items[data]
        }
        
        this.close()
        this.input.blur()
    }

    choiceSelect(data) {
        this.selected = this.items[data]
        this.selectLabel_span.textContent = this.items[data]

        this.close()
    }
}