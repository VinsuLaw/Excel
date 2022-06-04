import * as utils from "./utils";

export class DOMListener {
    // $root: Objected root node of the component
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided in DOMListener!')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initListeners() {
        this.listeners.forEach(listener => {
            const method = utils.getMethodName(listener) // Ex: getMethodName(click) => 'onClick'
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeListeners() {
        this.listeners.forEach(listener => {
            const method = utils.getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}