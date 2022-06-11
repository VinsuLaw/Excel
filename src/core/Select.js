import { ExcelComponent } from "../components/ExcelComponent"
import { $ } from "./DOM"

export class Select {
    static HIDE = 'hide'

    constructor($select, type, options) {
        this.UNFOLD = false
        this.$select = $(document.querySelector($select))
        this.type = type
        this.ul = null
        this.label = options.label
        this.items = options.items
        this.selectLabel = null
        this.selectLabel_span = null
        this.input = null
        this.selected = null
        this.selectedIcon = null
    }

    renderSelect() {
        if (this.type === 'input') {
            this.renderInputSelect()
        } else if (this.type === 'normal') {
            this.renderNormalSelect()
        } else if (this.type === 'btn') {
            this.renderBtnSelect()
        } else if (this.type === 'align') {
            this.renderAlignSelect()
        }
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

        this.selectLabel = $(this.selectLabel)
    
        this.getSelectList().forEach(item => this.ul.insertHTML('beforeend', item))
    }

    renderNormalSelect() {
        let childnodes = Array.from(this.$select.$el.children)
        childnodes = childnodes.filter(node => node.tagName === 'UL' || node.classList.contains('select-label'))

        this.selectLabel = childnodes[0]
        this.selectLabel_span = this.selectLabel.querySelector('.selected')
        this.ul = $(childnodes[1])
        this.ul.innerHTML('')

        this.selectLabel = $(this.selectLabel)
    
        this.getSelectList().forEach(item => this.ul.insertHTML('beforeend', item))
    }

    renderBtnSelect() {
        let palette = null
        let childnodes = Array.from(this.$select.$el.children)
        childnodes = childnodes
            .filter(node => node.classList.contains('selection') || node.tagName === 'SPAN')
        this.selectLabel = $(childnodes[0])
        this.ul = $(childnodes[1])

        if (this.label === 'color') { 
            childnodes = childnodes.map(childnode => childnode.children)
            palette = $(childnodes[1][0])
            palette.innerHTML('')

            this.getColorsList().forEach(item => palette.insertHTML('beforeend', item))
        }
    }

    renderAlignSelect() {
        let childnodes = Array.from(this.$select.$el.children)
        childnodes = childnodes.filter(node => node.dataset.select)
        this.selectLabel = $(childnodes[0])
        let selectedIcon = Array.from(childnodes[0].children)
        selectedIcon = selectedIcon.filter(node => node.dataset.selected)

        this.selectedIcon = $(selectedIcon[0])
        this.ul = $(childnodes[1])

        this.ul.innerHTML('')

        this.getAlignsList().forEach(item => this.ul.insertHTML('beforeend', item))
    }

    getSelectList() {
        return this.items.map((item, index) => `<li data-id="${index}">${item}</li>`)
    }

    getColorsList() {
        return this.items.map((item, index) => `<div class="${item}" data-id="${index}"></div>`)
    }

    getAlignsList() {
        return this.items.map((item, index) => `<li><span class="material-icons" data-id="${index}">${item}</span></li>`)
    }

    unfold() {
        this.selectLabel.addClass(['active'])
        this.ul.removeClass([Select.HIDE])
        this.UNFOLD = true
    }

    close() {
        this.selectLabel.removeClass(['active'])
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
        if (this.type === 'btn') {
            this.selected = this.items[data]
            this.close()
            return
        } else if (this.type === 'align') {
            this.selected = this.items[data]
            this.selectedIcon.text(this.selected)
            this.close()
            return
        }
        this.selected = this.items[data]
        this.selectLabel_span.textContent = this.items[data]

        this.close()
    }
}