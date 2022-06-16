import { updateDate } from "../store/actions"
import { $ } from "./DOM"
import { Emitter } from "./Emitter"
import { preventDefault } from "./utils"

export class Excel {
    constructor(selector, options) {
        this.$el = $(document.querySelector(selector))
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
    }

    register() {
        const excel = document.createElement('div')
        excel.classList.add('excel')
        this.$el.append(excel)

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        // Register components and render it to html
        this.components = this.components.map(Component => {
            const componentNode = document.createElement('div')
            componentNode.classList.add(Component.PARENT_NODE)
            excel.append(componentNode)

            const component = new Component($(componentNode), componentOptions)

            componentNode.insertAdjacentHTML('afterbegin', component.render()) 

            return component
        })

        return excel
    }

    // Register, rendering and starting each component
    initial() {
        this.store.dispatch(updateDate())
        this.components.forEach(component => component.init())
    }

    // Destroying each component
    destroy() {
        this.components.forEach(component => component.destroy())
    }
}