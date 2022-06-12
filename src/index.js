import { Excel } from './core/Excel'
import { HeaderComponent } from './components/HeaderComponent'
import { ToolbarComponent } from './components/ToolbarComponent'
import { FormulaComponent } from './components/FormulaComponent'
import { TableComponent } from './components/TableComponent/TableComponent'
import './scss/index.scss'
import { createStore } from './core/createStore'
import { rootReducer } from './store/rootReducer'
import { storage, debounce } from './core/utils'
import { initialState } from './store/initialState'

export const DEFAULT_TITLE = 'New table'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    console.log(state)
    storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [HeaderComponent, ToolbarComponent, FormulaComponent, TableComponent],
    store
})
excel.initial()