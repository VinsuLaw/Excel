import { DOMListener } from "../core/DOMListener";

// $root: Objected root node of the component
// options: Object with listeners and emitter instance

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubs = []
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

    init() {
        this.initListeners()
    }

    destroy() {
        this.removeListeners()
        this.unsubs.forEach(unsub => unsub())
    }
}