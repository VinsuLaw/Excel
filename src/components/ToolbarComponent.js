import { $ } from "../core/DOM";
import { Select } from "../core/Select";
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
        this.selects = null
    }

    init() {
        super.init()
        this.formatBtns = this.$root.findAll(`[data-format]`)
        this.select_fontSize = new Select('#fontSize-select', 'input', {
            label: 10,
            items: [5, 10, 14, 18, 20, 24, 30, 40, 50, 60]
        })
        this.select_font = new Select('#fonts-select', 'normal', {
            label: 'Roboto',
            items: [
                'Arial',
                'Caveat CaveatCaveat',
                'Roboto',
                'Comfortaa',
                'Impact',
                'Lora',
                'Verdana'
            ]
        })
        this.select_scale = new Select('#scale-select', 'normal', {
            label: '100%',
            items: [
                '50%',
                '75%',
                '90%',
                '100%',
                '125%',
                '150%',
                '200%'
            ]
        })

        this.select_fontSize.renderInputSelect()
        this.select_font.renderNormalSelect()
        this.select_scale.renderNormalSelect()

        this.selects = [this.select_fontSize, this.select_font, this.select_scale]

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

    render() {
        return `
        <div class="row">
            <div class="file">
                <span class="material-icons">undo</span>
                <span class="material-icons">redo</span>
                <span class="material-icons">print</span>
                <span class="material-icons">format_paint</span>
            </div>
            <div class="scale">
                <div class="select" id="scale-select">
                    <div class="select-label" data-select="scale">
                        <span class="selected border-right" data-select="scale">100%</span>
                        <span class="material-icons" data-select="scale" data-tap="true">expand_more</span>
                    </div>
                    <ul class="selection hide">
                        <li>50%</li>
                        <li>75%</li>
                        <li>90%</li>
                        <li>100%</li>
                        <li>125%</li>
                        <li>150%</li>
                        <li>200%</li>
                    </ul>
                </div>
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
                <div class="select_color">
                    <span class="material-icons parent">format_color_text</span>
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
                <div class="select_color">
                    <span class="material-icons btn parent">format_color_fill</span>
                    <div class="selection hide">
                        <div class="palette">
                            <div class="black"></div>
                            <div class="dark-grey-1"></div>
                            <div class="vinous"></div>
                            <div class="red"></div>
                        </div>
                    </div>
                </div>
                <div class="select">
                    <div class="select-label_icon">
                        <span class="material-icons selected">format_align_left</span>
                        <span class="material-icons">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide">
                        <li><span class="material-icons">format_align_left</span></li>
                        <li><span class="material-icons">format_align_center</span></li>
                        <li><span class="material-icons">format_align_right</span></li>
                    </ul>
                </div>
                <div class="select">
                    <div class="select-label_icon">
                        <span class="material-icons selected">vertical_align_bottom</span>
                        <span class="material-icons">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide">
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
        selectProcessing(this.$targetTool, [this.select_fontSize, this.select_font, this.select_scale], this.selects)
    }

    onKeydown(event) {
        if (this.select_fontSize.UNFOLD && event.key === 'Enter') {
            this.select_fontSize.choiceSelectInput(+this.select_fontSize.input.value, true)
        }
    }
}

function selectProcessing($targetTool, selectors, selects) {
    const selectFontSize = selectors[0]
    const selectFont = selectors[1]
    const selectScale = selectors[2]

    // Choise from select for fonts-size
    if (selectFontSize.UNFOLD && $targetTool.dataset('id')) {
        selectFontSize.choiceSelectInput(+$targetTool.dataset('id'))
    }
   
    // Choise from select for fonts
    if (selectFont.UNFOLD && $targetTool.dataset('id')) {
        selectFont.choiceSelect(+$targetTool.dataset('id'))
    }

    // Choise from select for scale
    if (selectScale.UNFOLD && $targetTool.dataset('id')) {
        selectScale.choiceSelect(+$targetTool.dataset('id'))
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

    if (selectScale.UNFOLD && selectionTap) {
        selectScale.close()
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
            case 'scale':
                selectScale.unfold()
                break
            default:
                break
        }
    } else if (selectFontSize.UNFOLD) {
        closeAllSelects(selects)
    }
}

function closeAllSelects(selects) {
    selects.forEach(select => {
        if (select.UNFOLD) {
            select.close()
        }
    })
}