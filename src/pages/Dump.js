import { createTable } from "../components/TableComponent/table.template";
import { TableComponent } from "../components/TableComponent/TableComponent";
import { createStore } from "../core/createStore";
import { $ } from "../core/DOM";
import { Excel } from "../core/Excel";
import { Page } from "../core/Page";
import { storage, storageName } from "../core/utils";
import { rootReducer } from "../store/rootReducer";

export class DumpPage extends Page {
    getRoot() {
        this.$root = $(document.querySelector('#app'))
        const params = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(params))
        const store = createStore(rootReducer, state)

        this.dump = new Excel('#app', {components: [TableComponent], store})

        return this.dump.register()
    }

    afterRender() {
        this.dump.initial()
    }

    destroy() {
        //
    }
}