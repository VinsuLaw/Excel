import { storage } from "../core/utils"
import { DEFAULT_TITLE } from "../index"

const defaultState = {
    appTitle: DEFAULT_TITLE,
    favorite: false,
    rowState: {},
    colState: {},
    formatTypes: {},
    fontColor: {},
    bgColor: {},
    h_align: {},
    v_align: {},
    size: {},
    font: {},
    dataState: {},
    currentText: ''
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState