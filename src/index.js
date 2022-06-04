import { Excel } from './core/Excel'
import { HeaderComponent } from './components/HeaderComponent'
import { ToolbarComponent } from './components/ToolbarComponent'
import { FormulaComponent } from './components/FormulaComponent'
import { TableComponent } from './components/TableComponent/TableComponent'
import './scss/index.scss'

const excel = new Excel('#app', {
    components: [HeaderComponent, ToolbarComponent, FormulaComponent, TableComponent]
})
excel.initial()