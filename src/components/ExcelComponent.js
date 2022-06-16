import { DOMListener } from "../core/DOMListener";
import * as actions from "../store/actions"

// $root: Objected root node of the component
// options: Object with listeners and emitter instance

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.store = options.store
        this.ENABLE = true
        this.DISABLE = false
        this.unsubs = []
        this.storeSub = null
    }

    // Dispatch event
    $emit(event, ...args) { 
        this.emitter.emit(event, ...args)
    }

    // Listen event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    updateTextWithFormulaEx(text, link, $cell) {
        this.$dispatch(actions.changeText({
            id: $cell.id(),
            all: {text, link}
        }))
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    init() {
        this.initListeners()
    }

    destroy() {
        this.removeListeners()
        this.unsubs.forEach(unsub => unsub())
        try {
            this.storeSub.unsubscribe()
        } catch (e) {
            //
        }
    }
}