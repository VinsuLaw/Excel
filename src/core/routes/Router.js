import { $ } from "../DOM"
import { ActiveRoute } from "./ActiveRoute"

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is required!')
        }

        this.$placeholder = $(selector)
        this.routes = routes
        this.changePageHandler = this.changePageHandler.bind(this)
        this.page = null

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear()

        let Page
        ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
        if (ActiveRoute.path.includes('excel')) {
            Page = this.routes.excel
        } else if (ActiveRoute.path.includes('dump')) {
            Page = this.routes.dump
        } else {
            Page = this.routes.dashboard
        }
        
        this.page = new Page(ActiveRoute.param)
        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}