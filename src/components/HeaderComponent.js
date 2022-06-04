import { ExcelComponent } from "../components/ExcelComponent";
import img from "../img/sheets_doc.png"

export class HeaderComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__header'

    constructor($root) {
        super($root, {
            name: 'Header',
            listeners: ['click']
        })
    }

    render() {
        return `
            <div class="row">
                <a href="#" class="logo">
                    <img src="${img}" alt="">
                </a>
                    
                <div class="column">
                    <div class="row">
                        <div class="input" contenteditable="true">Table name</div>
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
    }
}