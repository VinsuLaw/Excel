import { clone, storage } from "../core/utils"

const defaultState = {
    appTitle: 'My table',
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
    currentText: '',
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentText: ''
})

/*
export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
*/

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}