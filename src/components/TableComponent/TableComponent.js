import { ExcelComponent } from "../ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable, shouldResize } from "./table.resize";
import { $ } from "../../core/DOM";
import { TableSelection } from "./TableSelection";
import * as actions from "../../store/actions"
import { renderFromStorage } from "./render.storage";
import { parse } from "../../core/parse";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class TableComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'input', 'mousedown', 'mouseup', 'scroll', 'keydown'],
            ...options
        })
        this.$root = $root
        this.state = this.store.getState()
        this.rowsCount = 25
        this.usageFormats = []
        this.selection = new TableSelection(this.$root, this.rowsCount, options)
    }

    init() {
        if (ActiveRoute.path.includes('dump')) {
            this.$root.css({
                top: 0,
            })
            renderFromStorage(this.$root, this.state)
            return
        }

        super.init()

        const $cell = $(this.$root.findElement(`[data-col="0:0"]`))
        this.selection.select($cell)
        this.$emit('table:init', $cell)
        this.updateTextWithFormula(this.selection.current.text(), null)
 
        renderFromStorage(this.$root, this.state)

        this.$on('modal:link', (inputs) => {
            this.selection.current.text(inputs.text)
            this.selection.current.css({textDecoration: 'underline'})
            this.selection.current.$el.dataset.link = inputs.link
            this.updateTextWithFormula(inputs.text, inputs.link)
        })
        
        this.$on('formula:input', (text) => {
            this.selection.current.attr('data-value', text)
            if (text.startsWith('=')) {
                this.selection.current.textForParse(parse(text))
            } else {
                this.selection.current.text(text)
            }
            this.updateTextWithFormula(text, null)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:format', ($target, condition) => {
            const formatType = $target.dataset('format')
            const selection = this.selection.current.id()
            let data = {}

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

                                    data = {
                                        action: 'add',
                                        formatType,
                                        id: selection
                                    }
                                }
                            }
                        }
                    })
                    if (!alredyHas) {
                        this.usageFormats.push({
                            'selection': selection, 
                            'textFormats': [formatType]
                        })

                        data = {
                            action: 'add',
                            formatType,
                            id: selection
                        }
                    }
                } else {
                    this.usageFormats.push({
                        'selection': selection, 
                        'textFormats': [formatType]
                    })

                    data = {
                        action: 'add',
                        formatType,
                        id: selection
                    }
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
                                    data = {
                                        action: 'remove',
                                        formatType,
                                        id: selection
                                    }
                                }
                            }
                        }
                    })
                } else {
                    data = {
                        action: 'remove',
                        formatType,
                        id: selection
                    }
                }
            }

            this.$dispatch(actions.toolFormats(data))
        })

        this.$on('color:font', (color) => {
            this.selection.current.css({color: color})
            
            const selection = this.selection.current.id()

            let data = {
                type: 'fontColor',
                color,
                id: selection
            }         
            
            this.$dispatch(actions.toolColors(data))
        })

        this.$on('color:bg', (color) => {
            this.selection.current.css({backgroundColor: color})
            const selection = this.selection.current.id()

            let data = {
                type: 'bgColor',
                color,
                id: selection
            }         
            
            this.$dispatch(actions.toolColors(data))
        })

        this.$on('h_align', (align) => {
            if (align === 'format_align_center') {
                this.selection.current.css({textAlign: 'center'})
            } else if (align === 'format_align_left') {
                this.selection.current.css({textAlign: 'left'})
            } else if (align === 'format_align_right') {
                this.selection.current.css({textAlign: 'right'})
            }

            const selection = this.selection.current.id()

            let data = {
                type: 'h_align',
                align,
                id: selection
            }

            this.$dispatch(actions.toolAligns(data))
        })

        this.$on('v_align', (align) => {
            if (align === 'vertical_align_bottom') {
                this.selection.current.css({display: 'flex', justifyContent: 'flex-end', alignContent: 'center', flexDirection: 'column'})
            } else if (align === 'vertical_align_center') {
                this.selection.current.css({display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'})
            } else if (align === 'vertical_align_top') {
                this.selection.current.css({display: 'flex', justifyContent: 'flex-start', alignContent: 'center', flexDirection: 'column'})
            }

            const selection = this.selection.current.id()

            let data = {
                type: 'v_align',
                align,
                id: selection
            }

            this.$dispatch(actions.toolAligns(data))
        })

        this.$on('font:size', (size) => {
            this.selection.current.css({fontSize: size + 'px'})

            const selection = this.selection.current.id()

            let data = {
                type: 'font_size',
                size,
                id: selection
            }

            this.$dispatch(actions.toolFont(data))
        })

        this.$on('font:font', (font) => {
            this.selection.current.css({fontFamily: font})

            const selection = this.selection.current.id()

            let data = {
                type: 'font_font',
                font,
                id: selection
            }

            this.$dispatch(actions.toolFont(data))
        })
    }

    render() {
        return createTable(this.rowsCount, this.state)
    }

    onClick(event) {
        event.target.dataset.cell ? this.selection.onClickSelect(event) : null
        this.$emit('table:click')

        if ($(event.target).dataset('link')) {
            if (event.altKey) {
                window.open($(event.target).dataset('link'), '_blank')
            }
        }
    }

    async resizeHandler(event) {
        try {
            const data = await resizeTable(this.$root, event, this.rowsCount)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn(e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.isMouseDown = true
            this.resizeHandler(event)
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

    updateTextWithFormula(text, link) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            all: {text, link}
        }))
    } 

    onInput(event) {
        if (this.selection.current.dataset('link')) {
            this.selection.current.removeAttribute('style')
            this.selection.current.removeDataset('link')
        }
        this.selection.current.attr('data-value', this.selection.current.text())
        this.updateTextWithFormula($(event.target).text(), null)
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