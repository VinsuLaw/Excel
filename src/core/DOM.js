class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
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

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
}

export function $(selector) {
    return new DOM(selector)
}