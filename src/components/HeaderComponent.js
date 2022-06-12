import { DEFAULT_TITLE } from "..";
import { ExcelComponent } from "../components/ExcelComponent";
import { $ } from "../core/DOM";
import { debounce } from "../core/utils";
import img from "../img/sheets_doc.png"
import { changeTitle } from "../store/actions";

export class HeaderComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['click', 'input'],
            ...options
        })

        this.prepare()
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    render() {
        const title = this.store.getState().appTitle || DEFAULT_TITLE
        return `
            <div class="row">
                <a href="#" class="logo">
                    <img src="${img}" alt="">
                </a>
                    
                <div class="column">
                    <div class="row">
                        <div class="input" contenteditable="true">${title}</div>
                        <span class="material-icons star">star_border</span>
                    </div>
                    <ul class="panel_items">
                        <li>
                            <span class="panel_item">File</span>   
                            <ul class="panel_menu hide">
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">New file</span> 
                                </li>
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">Open file</span> 
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span class="panel_item">Edit</span>   
                            <ul class="panel_menu hide">
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">New file</span> 
                                </li>
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">Open file</span> 
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span class="panel_item">View</span>   
                            <ul class="panel_menu hide">
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">New file</span> 
                                </li>
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">Open file</span> 
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span class="panel_item">Insert</span>   
                            <ul class="panel_menu hide">
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">New file</span> 
                                </li>
                                <li class="row">
                                    <span class="material-icons">folder_open</span>                                        <span class="panel_menu-item">Open file</span> 
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span class="panel_item">Format</span>   
                            <ul class="panel_menu hide">
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">New file</span> 
                                </li>
                                <li class="row">
                                    <span class="material-icons">folder_open</span>
                                    <span class="panel_menu-item">Open file</span> 
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span class="panel_item">Help</span>   
                        </li>
                    </ul>
                </div>
            </div>    
                
            <div class="row">
                <span class="material-icons events">save</span>
                <span class="material-icons events">exit_to_app</span>
            </div>
        `
    }

    onClick() {
        console.log('Header component click');
        this.$emit('header:click')
    }

    onInput(event) {
        console.log('oninput');
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}