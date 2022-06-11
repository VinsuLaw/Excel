import { TABLE_RESIZE, TOOL_ALIGN, TOOL_FORMATS, TOOL_COLOR, TOOL_FONT } from "./types"

export function rootReducer(state, action) {
    let prevState
    let field

    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState' 
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState}
        case TOOL_FORMATS:
            field = 'formatTypes'
            prevState = state[field] || {}
            if (action.data.action === 'add') {
                if (prevState[action.data.id] === undefined) {
                    prevState[action.data.id] = []
                }
                prevState[action.data.id].push(action.data.formatType)
            } else {
                prevState[action.data.id] = prevState[action.data.id].filter(format => format !== action.data.formatType)
            }
            return {...state, [field]: prevState}
        case TOOL_COLOR:
            field = action.data.type === 'fontColor' ? 'fontColor' : 'bgColor'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.color
            return {...state, [field]: prevState}
        case TOOL_ALIGN: 
            field = action.data.type === 'h_align' ? 'h_align' : 'v_align'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.align
            return {...state, [field]: prevState}
        case TOOL_FONT:
            field = action.data.type === 'font_size' ? 'size' : 'font'
            prevState = state[field] || {}
            if (field === 'size') {
                prevState[action.data.id] = action.data.size
            } else if (field === 'font') {
                prevState[action.data.id] = action.data.font
            }
            return {...state, [field]: prevState}
        default: return state
    }
}