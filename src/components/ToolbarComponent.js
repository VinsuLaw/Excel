import { ExcelComponent } from "./ExcelComponent";

export class ToolbarComponent extends ExcelComponent {
    static PARENT_NODE = 'excel__toolbar'

    constructor($root) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click']
        })
    }

    render() {
        return `
        <div class="row">
            <div class="file">
                <span class="material-icons">undo</span>
                <span class="material-icons">redo</span>
                <span class="material-icons">print</span>
                <span class="material-icons">format_paint</span>
            </div>
            <div class="scale">
                <div class="select">
                    <div class="select-label">
                        <span class="selected border-right">100%</span>
                        <span class="material-icons">expand_more</span>
                    </div>
                    <ul class="selection hide">
                        <li>50%</li>
                        <li>75%</li>
                        <li>90%</li>
                        <li>100%</li>
                        <li>125%</li>
                        <li>150%</li>
                        <li>200%</li>
                    </ul>
                </div>
            </div>
            <div class="font-types row">
                <div class="fonts">
                    <div class="select">
                        <div class="select-label">
                            <span class="selected">Roboto</span>
                            <span class="material-icons">expand_more</span>
                        </div>
                        <ul class="selection w150 hide">
                            <li>Arial</li>
                            <li>Caveat CaveatCaveat</li>
                            <li>Roboto</li>
                            <li>Comfortaa</li>
                            <li>Impact</li>
                            <li>Lora</li>
                            <li>Verdana</li>
                        </ul>
                    </div>
                </div>
                <div class="sizes">
                    <div class="select">
                        <div class="select-label">
                            <input class="selected_input" value="10" />
                            <span class="material-icons">expand_more</span>
                        </div>
                        <ul class="selection hide">
                            <li>5</li>
                            <li>10</li>
                            <li>14</li>
                            <li>18</li>
                            <li>24</li>
                            <li>30</li>
                            <li>60</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="file">
                <span class="material-icons">format_bold</span>
                <span class="material-icons">format_italic</span>
                <span class="material-icons">strikethrough_s</span>
                <div class="select_color">
                    <span class="material-icons parent">format_color_text</span>
                    <div class="selection hide">
                        <div class="palette">
                            <div class="black"></div>
                            <div class="dark-grey-1"></div>
                            <div class="dark-grey-2"></div>
                            <div class="dark-grey-3"></div>
                            <div class="dark-grey-4"></div>
                            <div class="grey"></div>
                            <div class="light-grey-1"></div>
                            <div class="light-grey-2"></div>
                            <div class="light-grey-3"></div>
                            <div class="white"></div>

                            <div class="vinous"></div>
                            <div class="red"></div>
                            <div class="orange"></div>
                            <div class="yellow"></div>
                            <div class="light-green"></div>
                            <div class="turquoise"></div>
                            <div class="blue"></div>
                            <div class="dark-blue"></div>
                            <div class="purple"></div>
                            <div class="light-purple"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-format row">
                <div class="select_color">
                    <span class="material-icons btn parent">format_color_fill</span>
                    <div class="selection hide">
                        <div class="palette">
                            <div class="black"></div>
                            <div class="dark-grey-1"></div>
                            <div class="vinous"></div>
                            <div class="red"></div>
                        </div>
                    </div>
                </div>
                <div class="select">
                    <div class="select-label_icon">
                        <span class="material-icons selected">format_align_left</span>
                        <span class="material-icons">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide">
                        <li><span class="material-icons">format_align_left</span></li>
                        <li><span class="material-icons">format_align_center</span></li>
                        <li><span class="material-icons">format_align_right</span></li>
                    </ul>
                </div>
                <div class="select">
                    <div class="select-label_icon">
                        <span class="material-icons selected">vertical_align_bottom</span>
                        <span class="material-icons">expand_more</span>
                    </div>
                    <ul class="selection_icon row hide">
                        <li><span class="material-icons">vertical_align_bottom</span></li>
                        <li><span class="material-icons">vertical_align_center</span></li>
                        <li><span class="material-icons">vertical_align_top</span></li>
                    </ul>
                </div>
                <span class="material-icons btn">link</span>
                
            </div>
        </div>
        `
    }

    onClick() {
        console.log('Toolbar component click');
    }
}