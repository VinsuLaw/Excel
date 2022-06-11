import { $ } from "../core/DOM";
import { Select } from "../core/Select";
import { getColorCode, toCssColor } from "../core/utils";
import { ExcelComponent } from "./ExcelComponent";

export class ToolbarComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click', 'keydown'],
            ...options
        })
        this.options = options
        this.formats = ['bold', 'italic', 'strike']
        this.$targetTool = null
        this.formatBtns = null
        this.select_fontSize = null
        this.select_font = null
        this.select_scale = null
        this.select_fontColor = null
        this.select_bgColor = null
        this.select_hAlign = null
        this.select_aAlign = null
        this.selects = null
    }

    init() {
        super.init()
        this.formatBtns = this.$root.findAll(`[data-format]`)
        this.initSelectInstances()

        for (let i = 0; i < this.selects.length; i++) {
            this.selects[i].renderSelect()
        }

        this.$on('header:click', () => {
            closeAllSelects(this.selects)
        })

        this.$on('formula:click', () => {
            closeAllSelects(this.selects)
        })
        
        this.$on('table:click', () => {
            closeAllSelects(this.selects)
        })

        this.$on('table:select', $cell => {
            this.setColors($cell)
            this.setAligns($cell)
            this.setSize($cell)
            this.setFont($cell)

            if ($cell.hasClass('bold')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'bold') {
                        $(btn).addClass(['active'])
                    }
                })
            }

            if ($cell.hasClass('italic')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'italic') {
                        $(btn).addClass(['active'])
                    }
                })
            }

            if ($cell.hasClass('strike')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'strike') {
                        $(btn).addClass(['active'])
                    }
                })
            }
            
            if (!$cell.hasClass('bold')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'bold') {
                        $(btn).removeClass(['active'])
                    }
                })
            }

            if (!$cell.hasClass('italic')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'italic') {
                        $(btn).removeClass(['active'])
                    }
                })
            }

            if (!$cell.hasClass('strike')) {
                this.formatBtns.forEach(btn => {
                    if ($(btn).dataset('format') === 'strike') {
                        $(btn).removeClass(['active'])
                    }
                })
            }
        })
    }

    initSelectInstances() {
        this.select_fontSize = new Select('#fontSize-select', 'input', {
            label: 10,
            items: [5, 10, 14, 18, 20, 24, 30, 40, 50, 60]
        })

        this.select_font = new Select('#fonts-select', 'normal', {
            label: 'Roboto',
            items: [
                'Caveat',
                'Comfortaa',
                'Roboto',
                'Kanit',
                'Libre Bodoni',
                'Lora',
            ]
        })

        this.select_fontColor = new Select('#fontColor-select', 'btn', {
            label: 'color',
            items: [
                'black',
                'dark-grey-1',
                'dark-grey-2',
                'dark-grey-3',
                'dark-grey-4',
                'grey',
                'light-grey-1',
                'light-grey-2',
                'light-grey-3',
                'white',
                'vinous',
                'red',
                'orange',
                'yellow',
                'light-green',
                'turquoise',
                'blue',
                'dark-blue',
                'purple',
                'light-purple'
            ]
        })

        this.select_bgColor = new Select('#bgColor-select', 'btn', {
            label: 'color',
            items: [
                'black',
                'dark-grey-1',
                'dark-grey-2',
                'dark-grey-3',
                'dark-grey-4',
                'grey',
                'light-grey-1',
                'light-grey-2',
                'light-grey-3',
                'white',
                'vinous',
                'red',
                'orange',
                'yellow',
                'light-green',
                'turquoise',
                'blue',
                'dark-blue',
                'purple',
                'light-purple'
            ]
        })

        this.select_hAlign = new Select('#alignH-select', 'align', {
            label: 'format_align_left',
            items: [
                'format_align_left',
                'format_align_center',
                'format_align_right'
            ]
        })

        this.select_aAlign = new Select('#alignA-select', 'align', {
            label: 'vertical_align_top',
            items: [
                'vertical_align_bottom',
                'vertical_align_center',
                'vertical_align_top'
            ]
        })

        this.selects = [
            this.select_fontSize, 
            this.select_font,  
            this.select_fontColor, 
            this.select_bgColor,
            this.select_hAlign,
            this.select_aAlign
        ]
    }

    render() {
        return `
        <div class="row">
            <div class="file">
                <span class="material-icons">undo</span>
                <span class="material-icons">redo</span>
                <span class="material-icons">print</span>
            </div>
            <div class="font-types row">
                <div class="fonts">
                    <div class="select" id="fonts-select">
                        <div class="select-label" data-select="fonts">
                            <span class="selected" data-select="fonts">Roboto</span>
                            <span class="material-icons" data-select="fonts" data-tap="true">expand_more</span>
                        </div>
                        <ul class="selection w150 hide">
                            <li>Arial</li>
                            <li>Caveat CaveatCaveat</li>
                            <li>Roboto</li>
                            <li>Comfortaa</li>
                            <li>Impact</li>
                            <li>Lora</li>
                            <li>Verdana</li>
                        </ul>
                    </div>
                </div>
                <div class="sizes">
                    <div class="select" id="fontSize-select">
                        <div class="select-label" data-select="fontSize">
                            <input class="selected_input" data-select="fontSize" value="10" />
                            <span class="material-icons" data-select="fontSize" data-tap="true">expand_more</span>
                        </div>
                        <ul class="selection hide">
                            <li>5</li>
                            <li>10</li>
                            <li>14</li>
                            <li>18</li>
                            <li>24</li>
                            <li>30</li>
                            <li>60</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="file">
                <span class="material-icons" data-format="bold">format_bold</span>
                <span class="material-icons" data-format="italic">format_italic</span>
                <span class="material-icons" data-format="strike">strikethrough_s</span>
                <div class="select_color" id="fontColor-select">
                    <span class="material-icons parent" data-select="fontColor" data-tap="true">format_color_text</span>
                    <div class="selection hide">
                        <div class="palette">
                            <div class="black"></div>
                            <div class="dark-grey-1"></div>
                            <div class="dark-grey-2"></div>
                            <div class="dark-grey-3"></div>
                            <div class="dark-grey-4"></div>
                            <div class="grey"></div>
                            <div class="light-grey-1"></div>
                            <div class="light-grey-2"></div>
                            <div class="light-grey-3"></div>
                            <div class="white"></div>

                            <div class="vinous"></div>
                            <div class="red"></div>
                            <div class="orange"></div>
                            <div class="yellow"></div>
                            <div class="light-green"></div>
                            <div class="turquoise"></div>
                            <div class="blue"></div>
                            <div class="dark-blue"></div>
                            <div class="purple"></div>
                            <div class="light-purple"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-format row">
                <div class="select_color" id="bgColor-select">
                    <span class="material-icons btn parent" data-select="bgColor" data-tap="true">format_color_fill</span>
                    <div class="selection hide">
                        <div class="palette">
                            <div class="black"></div>
                            <div class="dark-grey-1"></div>
                            <div class="vinous"></div>
                            <div class="red"></div>
                        </div>
                    </div>
                </div>
                <div class="select" id="alignH-select">
                    <div class="select-label_icon" data-select="alignH">
                        <span class="material-icons selected" data-select="alignH" data-selected="true" data-tap="true">format_align_left</span>
                        <span class="material-icons" data-select="alignH" data-tap="true">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide" data-select="alignH">
                        <li><span class="material-icons">format_align_left</span></li>
                        <li><span class="material-icons">format_align_center</span></li>
                        <li><span class="material-icons">format_align_right</span></li>
                    </ul>
                </div>
                <div class="select" id="alignA-select">
                    <div class="select-label_icon" data-select="alignA">
                        <span class="material-icons selected" data-select="alignA" data-selected="true" data-tap="true">vertical_align_bottom</span>
                        <span class="material-icons" data-select="alignA" data-tap="true">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide" data-select="alignA">
                        <li><span class="material-icons">vertical_align_bottom</span></li>
                        <li><span class="material-icons">vertical_align_center</span></li>
                        <li><span class="material-icons">vertical_align_top</span></li>
                    </ul>
                </div>
                <span class="material-icons btn">link</span>
                
            </div>
        </div>
        `
    }

    onClick(event) {
        this.$targetTool = $(event.target)

        if (this.$targetTool.dataset('format')) {
            if (this.$targetTool.hasClass('active')) {
                this.$targetTool.removeClass(['active'])
                this.$emit('toolbar:format', this.$targetTool, this.DISABLE)
            } else {
                this.$targetTool.addClass(['active'])
                this.$emit('toolbar:format', this.$targetTool, this.ENABLE)
            }
        }

        // Select processing
        this.selectProcessing(this.$targetTool)
    }

    onKeydown(event) {
        if (this.select_fontSize.UNFOLD && event.key === 'Enter') {
            this.select_fontSize.choiceSelectInput(+this.select_fontSize.input.value, true)
            this.$emit('font:size', this.select_fontSize.selected)
        }
    }

    selectProcessing($targetTool) {
        const selectFontSize = this.selects[0]
        const selectFont = this.selects[1]
        const selectFontColor = this.selects[2]
        const selectBgColor = this.selects[3]
        const selectAlignH = this.selects[4]
        const selectAlignA = this.selects[5]
    
        // Choise from select for fonts-size
        if (selectFontSize.UNFOLD && $targetTool.dataset('id')) {
            selectFontSize.choiceSelectInput(+$targetTool.dataset('id'))
            this.$emit('font:size', selectFontSize.selected)
        }
       
        // Choise from select for fonts
        if (selectFont.UNFOLD && $targetTool.dataset('id')) {
            selectFont.choiceSelect(+$targetTool.dataset('id'))
            this.$emit('font:font', selectFont.selected)
        }
        
        // Choise from select for font color
        if (selectFontColor.UNFOLD && $targetTool.dataset('id')) {
            selectFontColor.choiceSelect(+$targetTool.dataset('id'))
    
            const color = getColorCode(selectFontColor.selected)
            
            selectFontColor.selectLabel.css({color: color})
    
            this.$emit('color:font', color)
        }
    
        // Choise from select for bg color
        if (selectBgColor.UNFOLD && $targetTool.dataset('id')) {
            selectBgColor.choiceSelect(+$targetTool.dataset('id'))
    
            const color = getColorCode(selectBgColor.selected)

            selectBgColor.selectLabel.css({color: color})

            this.$emit('color:bg', color)
        }
    
        // Choice from select for horizontal align
        if (selectAlignH.UNFOLD && $targetTool.dataset('id')) {
            selectAlignH.choiceSelect(+$targetTool.dataset('id'))

            this.$emit('h_align', selectAlignH.selected)
        }
    
        // Choice from select for vertical align
        if (selectAlignA.UNFOLD && $targetTool.dataset('id')) {
            selectAlignA.choiceSelect(+$targetTool.dataset('id'))

            this.$emit('v_align', selectAlignA.selected)
        }
    
    
        const selectionDataset = $targetTool.dataset('select')
        const selectionTap = $targetTool.dataset('tap')
    
    
        if (selectFontSize.UNFOLD && selectionTap) {
            selectFontSize.close()
            return
        }
    
        if (selectFont.UNFOLD && selectionTap) {
            selectFont.close()
            return
        }
    
        if (selectFontColor.UNFOLD && selectionTap) {
            selectFontColor.close()
            return
        }
    
        if (selectBgColor.UNFOLD && selectionTap) {
            selectBgColor.close()
            return
        }
    
        if (selectAlignH.UNFOLD && selectionTap) {
            selectAlignH.close()
            return
        }
    
        if (selectAlignA.UNFOLD && selectionTap) {
            selectAlignA.close()
            return
        }
        
        if (selectionDataset) {
            switch (selectionDataset) {
                case 'fontSize':
                    selectFontSize.unfold()
                    break
                case 'fonts':
                    selectFont.unfold()
                    break
                case 'fontColor':
                    selectFontColor.unfold()
                    break
                case 'bgColor':
                    selectBgColor.unfold()
                    break
                case 'alignH':
                    selectAlignH.unfold()
                    break
                case 'alignA':
                    selectAlignA.unfold()
                    break
                default:
                    break
            }
        } else if (selectFontSize.UNFOLD) {
            closeAllSelects(this.selects)
        }
    }

    setColors($cell) {
        const color = $cell.getStyle('color')
        const bgColor = $cell.getStyle('backgroundColor')
        this.select_fontColor.selectLabel.css({color: color})
        this.select_bgColor.selectLabel.css({color: bgColor})
    }

    setAligns($cell) {
        const h_align = $cell.getStyle('textAlign')
        const v_align = $cell.getStyle('justifyContent')

        if (h_align === 'center') {
            this.select_hAlign.selectedIcon.innerHTML('format_align_center')
        } else if (h_align === 'left') {
            this.select_hAlign.selectedIcon.innerHTML('format_align_left')
        } else if (h_align === 'right') {
            this.select_hAlign.selectedIcon.innerHTML('format_align_right')
        } else {
            this.select_hAlign.selectedIcon.innerHTML(this.select_hAlign.label)
        }

        if (v_align === 'center') {
            this.select_aAlign.selectedIcon.innerHTML('vertical_align_center')
        } else if (v_align === 'flex-end') {
            this.select_aAlign.selectedIcon.innerHTML('vertical_align_bottom')
        } else if (v_align === 'flex-start') {
            this.select_aAlign.selectedIcon.innerHTML('vertical_align_top')
        } else {
            this.select_aAlign.selectedIcon.innerHTML(this.select_aAlign.label)
        }
    }

    setSize($cell) {
        const size = $cell.getStyle('fontSize')
        if (!size) {
            this.select_fontSize.input.value = 13
        } else {
            this.select_fontSize.input.value = size
        }
    }

    setFont($cell) {
        const font = $cell.getStyle('fontFamily')
        if (!font) {
            this.select_font.selectLabel_span.textContent = 'Roboto'
            return
        }
        this.select_font.selectLabel_span.textContent = font
    }
}

function closeAllSelects(selects) {
    selects.forEach(select => {
        if (select.UNFOLD) {
            select.close()
        }
    })
}