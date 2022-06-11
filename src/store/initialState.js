import { storage } from "../core/utils"

const defaultState = {
    rowState: {},
    colState: {},
    formatType: {},
    fontColor: {},
    bgColor: {},
    h_align: {},
    v_align: {},
    size: {},
    font: {}
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState