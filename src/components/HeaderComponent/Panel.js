import { $ } from "../../core/DOM"
import { Modal } from "../../core/Modal"
import { ActiveRoute } from "../../core/routes/ActiveRoute"
import { clone, storage, storageName } from "../../core/utils"
import { ExcelComponent } from "../ExcelComponent"

export class Panel extends ExcelComponent {
    constructor($root, id, dataSelect, options) {
        super($root, options)
        this.options = options
        this.$root = $root
        this.id = $(this.$root.findElement(id))
        this.type = dataSelect
        this.dataSelect = $(this.$root.findElement(`[data-select="${dataSelect}"]`))
        this.label = $(this.id.getChildByClass('panel_item'))
        this.ul = $(this.id.getChildByTagName('UL'))
        this.ul_formatText = null
        this.ul_formatAligns = null
        this.unfold = false
        this.unfold_formatUl = false
        this.allowClose = false
        this.setTimeToHide_text = null
        this.setTimeToHide_aligns = null
        this.dropTextUnfold = false
        this.dropAlignsUnfold = false

        if (this.type === 'format') {
            this.ul_formatText = $(this.id.findElement('[data-format="text"]'))
            this.ul_formatAligns = $(this.id.findElement('[data-format="aligns"]'))
        }

        this.boldBtn = $(document.querySelector(`[data-format="bold"]`))
        this.italicBtn = $(document.querySelector(`[data-format="italic"]`))
        this.strikeBtn = $(document.querySelector(`[data-format="strike"]`))
        this.alignH = $($(document.querySelector(`[data-select="alignH"]`)).getChildByTagName('SPAN'))
        this.alignV = $($(document.querySelector(`[data-select="alignA"]`)).getChildByTagName('SPAN'))
    
        this.modalLink = null

        if (this.type === 'insert') {
            this.init()
        }
    }

    init() {
        super.init()

        this.modalLink = new Modal('#modal-link')
    }

    formatListener() {
        if (this.type === 'format') {
            const onmousemove = (event) => {
                const $target = $(event.target)
                if ($target.dataset('panel') === 'text') {
                    if (this.dropAlignsUnfold) {
                        this.closeFormatUl(this.ul_formatAligns)
                        this.dropAlignsUnfold = false
                    }
                    this.openFormatUl(this.ul_formatText)
                    this.dropTextUnfold = true
                } else if ($target.dataset('panel') === 'aligns') {
                    if (this.dropTextUnfold) {
                        this.closeFormatUl(this.ul_formatText)
                        this.dropTextUnfold = false
                    }
                    this.openFormatUl(this.ul_formatAligns)
                    this.dropAlignsUnfold = true
                } else {
                    if (this.dropTextUnfold) {
                        setTimeout(() => {
                            if (this.setTimeToHide_text !== null) {
                                this.closeFormatUl(this.ul_formatText)
                                this.dropTextUnfold = false
                            }
                        }, 500)
                    } else if (this.dropAlignsUnfold) {
                        setTimeout(() => {
                            if (this.setTimeToHide_aligns !== null) {
                                this.closeFormatUl(this.ul_formatAligns)
                                this.dropAlignsUnfold = false
                            }
                        }, 500)
                    }
                }
            }

            this.ul_formatText.$el.onmouseover = (e) => {
                if (this.setTimeToHide_text) {
                    clearTimeout(this.setTimeToHide_text)
                    this.setTimeToHide_text = null
                    if (this.dropAlignsUnfold) {
                        this.closeFormatUl(this.ul_formatAligns)
                        this.dropAlignsUnfold = false
                    }
                }
            }
            this.ul_formatText.$el.onmouseout = (e) => {
                this.setTimeToHide_text = setTimeout(() => {
                    this.closeFormatUl(this.ul_formatText)
                    this.dropTextUnfold = false
                }, 500)
            }

            this.ul_formatAligns.$el.onmouseover = (e) => {
                if (this.setTimeToHide_aligns) {
                    clearTimeout(this.setTimeToHide_aligns)
                    this.setTimeToHide_aligns = null
                    if (this.dropTextUnfold) {
                        this.closeFormatUl(this.ul_formatText)
                        this.dropTextUnfold = false
                    }
                }
            }
            this.ul_formatAligns.$el.onmouseout = (e) => {
                this.setTimeToHide_aligns = setTimeout(() => {
                    this.closeFormatUl(this.ul_formatAligns)
                    this.dropAlignsUnfold = false
                }, 500)
            }

            document.onmousemove = onmousemove
        }
    }

    operation($cell, item) {
        if (item === 'format_bold') {
            if (this.boldBtn.hasClass('active')) {
                this.boldBtn.removeClass(['active'])
                this.$emit('toolbar:format', this.boldBtn, this.DISABLE)
            } else {
                this.boldBtn.addClass(['active'])
                this.$emit('toolbar:format', this.boldBtn, this.ENABLE)
            }
        } else if (item === 'format_italic') {
            if (this.italicBtn.hasClass('active')) {
                this.italicBtn.removeClass(['active'])
                this.$emit('toolbar:format', this.italicBtn, this.DISABLE)
            } else {
                this.italicBtn.addClass(['active'])
                this.$emit('toolbar:format', this.italicBtn, this.ENABLE)
            }
        } else if (item === 'strikethrough_s') {
            if (this.strikeBtn.hasClass('active')) {
                this.strikeBtn.removeClass(['active'])
                this.$emit('toolbar:format', this.strikeBtn, this.DISABLE)
            } else {
                this.strikeBtn.addClass(['active'])
                this.$emit('toolbar:format', this.strikeBtn, this.ENABLE)
            }
        }

        if (item === 'format_align_left') {
            this.alignH.text('format_align_left')
            this.$emit('h_align', 'format_align_left')
        } else if (item === 'format_align_center') {
            this.alignH.text('format_align_center')
            this.$emit('h_align', 'format_align_center')
        } else if (item === 'format_align_right') {
            this.alignH.text('format_align_right')
            this.$emit('h_align', 'format_align_right')
        } else if (item === 'align_vertical_top') {
            this.alignV.text('vertical_align_top')
            this.$emit('v_align', 'vertical_align_top')
        } else if (item === 'align_vertical_center') {
            this.alignV.text('vertical_align_center')
            this.$emit('v_align', 'vertical_align_center')
        } else if (item === 'align_vertical_bottom') {
            this.alignV.text('vertical_align_bottom')
            this.$emit('v_align', 'vertical_align_bottom')
        }

        if (item === 'link') {
            this.modalLink.open()
        }

        document.onclick = event => {
            const target = $(event.target)
            if (target.dataset('close')) {
                this.modalLink.close()
                document.onclick = null
            } else {
                if (target.dataset('btn')) {
                    if (target.dataset('btn') === this.modalLink.ok.dataset('btn')) {
                        let inputs = {}
                        inputs = this.modalLink.operation(event)
                        if (inputs != undefined) {
                            this.$emit('modal:link', inputs)
                            document.onclick = null
                        }
                    } else {
                        this.modalLink.close()
                        document.onclick = null
                    }
                }
            }
        }

        if (item === 'cut_content') {
            const CutTheRope = $cell.text()
            $cell.clear().attr('data-value', '')
            this.updateTextWithFormulaEx($cell.text(), null, $cell)
            navigator.clipboard.writeText(CutTheRope)
        } else if (item === 'copy_content') {
            navigator.clipboard.writeText($cell.text())
        } else if (item === 'paste_content') {
            navigator.clipboard.readText().then(GetTheRope => {
                $cell.attr('data-value', GetTheRope).text(GetTheRope)
            })
        } else if (item === 'delete_content') {
            $cell.clear().attr('data-value', '')
            this.updateTextWithFormulaEx($cell.text(), null, $cell)
        }

        if (item === 'create_file') {
            const now = Date.now().toString()
            ActiveRoute.navigate(`#excel/${now}`)
        } else if (item === 'open_file') {
            ActiveRoute.navigate('')
        } else if (item === 'copie_file') {
            let stateCopie = clone(this.store.getState())
            stateCopie.appTitle = stateCopie.appTitle + '(1)'
            const now = Date.now().toString()
            ActiveRoute.navigate(`#excel/${now}`)
            const params = this.params ? this.params : now
            storage(storageName(params), stateCopie)
        } else if (item === 'download') {
            const state = this.store.getState()
            const params = ActiveRoute.param
            ActiveRoute.navigate(`#dump/${params}`)
            storage(storageName(params), state)
        } else if (item === 'rename') {
            const input = $(this.$root.findElement('.input'))
            input.focus()
        } else if (item === 'delete_file') {
            const decision = confirm('Do you really want to delete this table?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        }

        this.close()
    }

    open() {
        if (!this.unfold) {
            this.ul.removeClass(['hide'])
            this.label.css({backgroundColor: '#d9ead3'})
            this.unfold = true
            if (this.type === 'format') {
                this.formatListener()
            }
        }
    }

    close() {
        if (this.dropTextUnfold) {
            this.closeFormatUl(this.ul_formatText)
            this.dropTextUnfold = false
        }

        if (this.dropAlignsUnfold) {
            this.closeFormatUl(this.ul_formatAligns)
            this.dropAlignsUnfold = false
        }

        if (this.unfold) {
            this.ul.addClass(['hide'])
            this.label.removeAttribute('style')
            this.unfold = false
            if (this.type === 'format') {
                document.onmousemove = null
                this.ul_formatText.$el.onmouseover = null
                this.ul_formatText.$el.onmouseout = null
                this.ul_formatAligns.$el.onmouseover = null
                this.ul_formatAligns.$el.onmouseout = null
            }
        }
    }

    openFormatUl(ul) {
        if (!this.unfold_formatUl) {
            ul.removeClass(['hide'])
            this.unfold_formatUl = true
        }
    }

    closeFormatUl(ul) {
        if (this.unfold_formatUl) {
            ul.addClass(['hide'])
            this.unfold_formatUl = false
        }
    }
}