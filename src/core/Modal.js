import { $ } from "./DOM";

export class Modal {
    constructor($selector, options) {
        this.$modalOverlay = $(document.querySelector($selector))
        this.$modal = $(this.$modalOverlay.getChildByClass('modal-window'))
        this.opened = false
        this.link = $(this.$modal.findElement('[data-input="link"]'))
        this.text = $(this.$modal.findElement('[data-input="text"]'))
        this.ok = null
        this.no = null
        this.messages = []
        this.error = $(this.$modal.findElement('#error'))

        this.init()
    }

    init() {
        const btns = this.$modal.findAll(`[data-btn]`)
        this.ok = $(btns[0])
        this.no = $(btns[1])
    }

    open() {
        this.$modalOverlay.addClass(['open'])
        this.$modal.addClass(['open'])
        this.opened = true
    }

    close() {
        this.$modal.removeClass(['open'])
        this.$modalOverlay.removeClass(['open'])
        this.link.value('')
        this.text.value('')
        this.error.text('')
        this.opened = false
    }

    operation(event) {
        this.messages = []

        const link = this.link.value().trim()
        const text = this.text.value().trim()

        if (link === '' || link === null || link.length <= 10) {
            this.messages.push('Link is required.')
            this.link.css({borderColor: 'red'})
        }

        if (text === '' || text === null) {
            this.messages.push('Text is required.')
            this.text.css({borderColor: 'red'})
        }
    
        if (this.messages.length > 0) {
            //this.error.text(this.messages.join(' '))
        } else {
            event.preventDefault()
            this.link.css({border: '1px solid rgb(217, 217, 217)'})
            this.close()
            return {'link': link, 'text': text}
        }

        event.preventDefault()
    }
}