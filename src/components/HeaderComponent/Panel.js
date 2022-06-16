import { $ } from "../../core/DOM"

export class Panel {
    constructor($root, id, dataSelect) {
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

    operation(item) {
        console.log(item);
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