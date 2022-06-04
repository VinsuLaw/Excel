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
}

export function $(selector) {
    return new DOM(selector)
}