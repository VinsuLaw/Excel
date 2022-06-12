import { TABLE_RESIZE, TOOL_ALIGN, TOOL_FORMATS, TOOL_COLOR, TOOL_FONT, CHANGE_TEXT } from "./types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function toolFormats(data) {
    return {
        type: TOOL_FORMATS,
        data
    }
}

export function toolColors(data) {
    return {
        type: TOOL_COLOR,
        data
    }
}

export function toolAligns(data) {
    return {
        type: TOOL_ALIGN,
        data
    }
}

export function toolFont(data) {
    return {
        type: TOOL_FONT,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}