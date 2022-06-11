import { Excel } from './core/Excel'
import { HeaderComponent } from './components/HeaderComponent'
import { ToolbarComponent } from './components/ToolbarComponent'
import { FormulaComponent } from './components/FormulaComponent'
import { TableComponent } from './components/TableComponent/TableComponent'
import './scss/index.scss'
import { createStore } from './core/createStore'
import { rootReducer } from './store/rootReducer'
import { storage } from './core/utils'
import { initialState } from './store/initialState'

const store = createStore(rootReducer, initialState)

store.subscribe(state => {
    storage('excel-state', state)
})

const excel = new Excel('#app', {
    components: [HeaderComponent, ToolbarComponent, FormulaComponent, TableComponent],
    store
})
excel.initial()