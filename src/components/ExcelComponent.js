import { DOMListener } from "../core/DOMListener";

// $root: Objected root node of the component
// options: Object with name of the component and him listeners

export class ExcelComponent extends DOMListener {
    constructor($root, options) {
        super($root, options.listeners)
        this.name = options.name

        this.prepare()
    }

    prepare() {}

    init() {
        this.initListeners()
    }

    destroy() {
        this.removeListeners()
    }
}