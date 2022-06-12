import { storage } from "../core/utils"

const defaultState = {
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