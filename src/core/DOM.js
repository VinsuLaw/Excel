class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
        this.leftScrolled = 0
    }

    on(event, callBack) {
        this.$el.addEventListener(event, callBack)
    }

    off(event, callBack) {
        this.$el.removeEventListener(event, callBack)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getChildByClass(selector) {
        return Array.from(this.$el.childNodes).filter(node => node.className === selector)[0]
    }

    getChildByTagName(tag) {
        return Array.from(this.$el.childNodes).filter(node => node.tagName === tag)[0]
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    getStyle(type) {
        return this.$el.style[type]
    }

    getComputedStyleM(type) {
        return document.defaultView.getComputedStyle(this.$el)[type]
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    findElement(element) {
        return this.$el.querySelector(element)
    }

    addClass(classList = []) {
        classList.forEach(element => this.$el.classList.add(element))
        return this
    }

    classLists() {
        return Array.from(this.$el.classList)
    }

    addID(ID) {
        this.$el.setAttribute('id', ID)
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.$el.dataset.col
    }

    dataset(type) {
        return this.$el.dataset[type]
    }

    attr(name, value) {
        if (value || value === '') {
            this.$el.setAttribute(name, value)
            return this
        } else {
            return this.$el.getAttribute(name)
        }
    }

    removeDataset(type) {
        this.$el.removeAttribute(`data-${type}`)
        return this
    }

    removeAttribute(type) {
        this.$el.removeAttribute(type)
        return this
    }

    removeClass(classList = []) {
        classList.forEach(element => this.$el.classList.remove(element))
    }

    hasClass(selfClass) {
        return this.$el.classList.contains(selfClass)
    }

    create(tagName) {
        return document.createElement(tagName)
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    destroy() {
        this.$el.remove()
    }

    insertHTML(position, html) {
        this.$el.insertAdjacentHTML(position, html)
    }

    insertElement(position, html) {
        this.$el.insertAdjacentElement(position, html)
    }

    innerHTML(content) {
        this.$el.innerHTML = content
        return this.$el
    }

    clear() {
        this.innerHTML('')
        return this
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }

        return this.$el.textContent.trim()
    }

    textForParse(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
        }
    }

    value(text) {
        if (typeof text === 'string') {
            this.$el.value = text
            return this
        }

        return this.$el.value.trim()
    }

    focus() {
        this.$el.focus()
        return this
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}