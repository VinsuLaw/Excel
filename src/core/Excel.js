import { $ } from "./DOM"
import { Emitter } from "./Emitter"

export class Excel {
    constructor($selector, options) {
        this.$el = $($selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    register() {
        const excel = document.createElement('div')
        excel.classList.add('excel')
        this.$el.$el.append(excel)

        const componentOptions = {
            emitter: this.emitter
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
    }

    // Register, rendering and starting each component
    initial() {
        this.register()
        this.components.forEach(component => component.init())
    }

    // Destroying each component
    destroy() {
        this.components.forEach(component => component.destroy())
    }
}