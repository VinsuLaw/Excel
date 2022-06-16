import { DEFAULT_TITLE } from "../..";
import { ExcelComponent } from "../ExcelComponent";
import { $ } from "../../core/DOM";
import { debounce } from "../../core/utils";
import img from "../../img/sheets_doc.png"
import { changeTitle, favorite } from "../../store/actions";
import { Panel } from "./Panel";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class HeaderComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['click', 'input'],
            ...options
        })
        this.options = options
        this.panelFile = null
        this.panelEdit = null
        this.panelInsert = null
        this.panelFormat = null 

        this.selected = null

        this.prepare()
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    init() {
        super.init()

        this.panelFile = new Panel(this.$root, '#header-file', 'file', this.options)
        this.panelEdit = new Panel(this.$root, '#header-edit', 'edit', this.options)
        this.panelInsert = new Panel(this.$root, '#header-insert', 'insert', this.options)
        this.panelFormat = new Panel(this.$root, '#header-format', 'format', this.options)

        this.$on('toolbar:tap', () => {
            this.closeAllPanels()
        })

        this.$on('formula:click', () => {
            this.closeAllPanels()
        })

        this.$on('table:click', () => {
            this.closeAllPanels()
        })

        this.$on('table:init', ($cell) => {
            this.selected = $cell
        })

        this.$on('table:select', ($cell) => {
            this.selected = $cell
        })
    }

    render() {
        const title = this.store.getState().appTitle || 'Table'
        const favorite = this.store.getState().favorite
        const favoriteContent = favorite ? 'star' : 'star_border'
        const favoriteStyles = favorite ? 'color: orange;' : 'color: rgba(0,0,0,.7);'
        return `
            <div class="row">
                <a href="#" class="logo">
                    <img src="${img}" alt="">
                </a>
                    
                <div class="column">
                    <div class="row">
                        <div class="input" contenteditable="true">${title}</div>
                        <span class="material-icons star" data-favorites="true" style="${favoriteStyles}">${favoriteContent}</span>
                    </div>
                    <ul class="panel_items">
                        <li id="header-file">
                            <span class="panel_item" data-select="file">File</span>   
                            <ul class="panel_menu hide">
                                <li class="row" data-panel="create_file">
                                    <span class="material-icons" data-panel="create_file">create_new_folder</span>
                                    <span class="panel_menu-item" data-panel="create_file">Create new</span> 
                                </li>
                                <li class="row" data-panel="open_file">
                                    <span class="material-icons" data-panel="open_file">folder_open</span>
                                    <span class="panel_menu-item" data-panel="open_file">Open file</span> 
                                </li>
                                <li class="row" data-panel="copie_file">
                                    <span class="material-icons" data-panel="copie_file">file_copy</span>
                                    <span class="panel_menu-item" data-panel="copie_file">Create copie</span> 
                                </li>
                                <div class="border"></div>
                                <li class="row" data-panel="download">
                                    <span class="material-icons" data-panel="download">download</span>
                                    <span class="panel_menu-item" data-panel="download">Download</span> 
                                </li>
                                <div class="border"></div>
                                <li class="row" data-panel="rename">
                                    <span class="material-icons" data-panel="rename">drive_file_rename_outline</span>
                                    <span class="panel_menu-item" data-panel="rename">Rename</span> 
                                </li>
                                <li class="row" data-panel="delete_file">
                                    <span class="material-icons" data-panel="delete_file">delete</span>
                                    <span class="panel_menu-item" data-panel="delete_file">Delete</span> 
                                </li>
                            </ul>
                        </li>
                        <li id="header-edit">
                            <span class="panel_item" data-select="edit">Edit</span>   
                            <ul class="panel_menu hide">
                                <li class="row" data-panel="cut_content">
                                    <span class="material-icons" data-panel="cut_content">content_cut</span>
                                    <span class="panel_menu-item" data-panel="cut_content">Cut</span> 
                                </li>
                                <li class="row" data-panel="copy_content">
                                    <span class="material-icons" data-panel="copy_content">content_copy</span>
                                    <span class="panel_menu-item" data-panel="copy_content">Content copy</span> 
                                </li>
                                <li class="row" data-panel="paste_content">
                                    <span class="material-icons" data-panel="paste_content">content_paste</span>
                                    <span class="panel_menu-item" data-panel="paste_content">Paste</span> 
                                </li>
                                <div class="border"></div>
                                <li class="row" data-panel="delete_content">
                                    <span class="material-icons" data-panel="delete_content">delete</span>
                                    <span class="panel_menu-item" data-panel="delete_content">Delete</span> 
                                </li>
                            </ul>
                        </li>
                        <li id="header-insert">
                            <span class="panel_item" data-select="insert">Insert</span>   
                            <ul class="panel_menu hide">
                                <li class="row" data-panel="link">
                                    <span class="material-icons" data-panel="link">link</span>
                                    <span class="panel_menu-item" data-panel="link">Link</span> 
                                </li>
                            </ul>
                        </li>
                        <li id="header-format">
                            <span class="panel_item" data-select="format">Format</span>   
                            <ul class="panel_menu hide">
                                <li class="row" data-panel="text">
                                    <span class="material-icons" data-panel="text">format_bold</span>
                                    <span class="panel_menu-item" data-panel="text">Text</span> 
                                    <span class="material-icons arrow" data-panel="text">arrow_right</span>
                                    <div class="panel__format hide" data-format="text" >
                                        <div data-format="text">
                                            <span class="material-icons" data-format="text">format_bold</span>
                                            <span class="panel_menu-item" data-format="text">Bold</span> 
                                        </div>
                                        <div data-format="text">
                                            <span class="material-icons" data-format="text">format_italic</span>
                                            <span class="panel_menu-item" data-format="text">Italic</span> 
                                        </div>
                                        <div data-format="text">
                                            <span class="material-icons" data-format="text">strikethrough_s</span>
                                            <span class="panel_menu-item" data-format="text">Strikethough</span> 
                                        </div>
                                    </div>
                                </li>
                                
                                <li class="row" data-panel="aligns">
                                    <span class="material-icons" data-panel="aligns">format_align_left</span>
                                    <span class="panel_menu-item" data-panel="aligns">Align</span> 
                                    <span class="material-icons arrow" data-panel="aligns">arrow_right</span>
                                    <div class="panel__format hide" data-format="aligns">
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">format_align_left</span>
                                            <span class="panel_menu-item" data-format="aligns">On the left edge</span> 
                                        </div>
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">format_align_center</span>
                                            <span class="panel_menu-item" data-format="aligns">On the center</span> 
                                        </div>
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">format_align_right</span>
                                            <span class="panel_menu-item" data-format="aligns">On the right edge</span> 
                                        </div>
                                        <div class="border-format" data-format="aligns"></div>
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">align_vertical_top</span>
                                            <span class="panel_menu-item" data-format="aligns">On the upper edge</span> 
                                        </div>
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">align_vertical_center</span>
                                            <span class="panel_menu-item" data-format="aligns">On the center</span> 
                                        </div>
                                        <div data-format="aligns">
                                            <span class="material-icons" data-format="aligns">align_vertical_bottom</span>
                                            <span class="panel_menu-item" data-format="aligns">On the bottom edge</span> 
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>    
                
            <div class="row">
                <span class="material-icons events" data-button="delete">delete</span>
                <span class="material-icons events" data-button="exit">exit_to_app</span>
            </div>
        `
    }

    onClick(event) {
        const $target = $(event.target)
        this.$emit('header:click')

        if ($target.dataset('favorites')) {
            if ($target.text() === 'star_border') {
                $target.text('star')
                $target.css({color: 'orange'})
                this.$dispatch(favorite(true))
            } else {
                $target.text('star_border')
                $target.css({color: 'rgba(0,0,0,.7)'})
                this.$dispatch(favorite(false))
            }
        }

        if (this.panelFile.unfold) {
            if ($target.dataset('panel')) {
                this.panelFile.operation(this.selected, $target.dataset('panel'))
            }
        } else if (this.panelEdit.unfold) {
            if ($target.dataset('panel')) {
                this.panelEdit.operation(this.selected, $target.dataset('panel'))
            }
        } else if (this.panelInsert.unfold) {
            if ($target.dataset('panel')) {
                this.panelInsert.operation(this.selected, $target.dataset('panel'))
            }
        } else if (this.panelFormat.unfold_formatUl) {
            if ($target.dataset('format')) {
                let item = null
                item = $target.getChildByClass('material-icons')
                if (!item) {
                    const parent = $target.closest('div')
                    item = parent.getChildByClass('material-icons')
                }
                this.panelFormat.operation(this.selected, item.textContent)
            }
        }

        if ($target.dataset('select')) {
            if ($target.dataset('select') === 'file') {
                if (!this.panelFile.unfold) {
                    this.closeAllPanels()
                    this.panelFile.open()
                } else {
                    this.panelFile.close()
                }
            } else if ($target.dataset('select') === 'edit') {
                if (!this.panelEdit.unfold) {
                    this.closeAllPanels()
                    this.panelEdit.open()
                } else {
                    this.panelEdit.close()
                }
            } else if ($target.dataset('select') === 'insert') {
                if (!this.panelInsert.unfold) {
                    this.closeAllPanels()
                    this.panelInsert.open()
                } else {
                    this.panelInsert.close()
                }
            } else if ($target.dataset('select') === 'format') {
                if (!this.panelFormat.unfold) {
                    this.closeAllPanels()
                    this.panelFormat.open()
                } else {
                    this.panelFormat.close()
                }
            }
        } else {
            this.closeAllPanels()
        }

        if ($target.dataset('button') === 'delete') {
            const decision = confirm('Do you really want to delete this table?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.dataset('button') === 'exit') {
            ActiveRoute.navigate('')
        } 
    }

    onInput(event) {
        console.log('oninput');
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    closeAllPanels() {
        this.panelFile.close()
        this.panelEdit.close()
        this.panelInsert.close()
        this.panelFormat.close()
    }
}