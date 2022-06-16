import { Page } from "../core/Page";
import { Excel } from '../core/Excel'
import { createStore } from '../core/createStore'
import { rootReducer } from '../store/rootReducer'
import { storage, debounce } from '../core/utils'
import { initialState, normalizeInitialState } from '../store/initialState'
import { HeaderComponent } from '../components/HeaderComponent/HeaderComponent'
import { ToolbarComponent } from '../components/ToolbarComponent'
import { FormulaComponent } from '../components/FormulaComponent'
import { TableComponent } from '../components/TableComponent/TableComponent'

function storageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(params))
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)

        const stateListener = debounce(state => {
            storage(storageName(params), state)
        }, 500)

        store.subscribe(stateListener)

        this.excel = new Excel('#app', {
            components: [HeaderComponent, ToolbarComponent, FormulaComponent, TableComponent],
            store
        })
    
        return this.excel.register()
    }

    afterRender() {
        this.excel.initial()
    }

    destroy() {
        this.excel.destroy()
    }
}