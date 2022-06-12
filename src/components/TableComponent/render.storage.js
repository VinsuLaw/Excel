import { $ } from "../../core/DOM";

export function renderFromStorage($root, store) {
    renderFormats($root, store)
    renderColors($root, store)
    renderAligns($root, store)
    renderFonts($root, store)
}

function renderFormats($root, store) {
    const formatTypes = store.formatTypes
    for (let id in formatTypes) {
        if (formatTypes.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            const formatsArr = Array.from(formatTypes[id])
            if (formatsArr.length > 0) {
                formatsArr.forEach(format => $cell.addClass([format]))
            }
        }
    }
}

function renderColors($root, store) {
    const bgColor = store.bgColor
    const fontColor = store.fontColor

    for (let id in bgColor) {
        if (bgColor.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            $cell.css({backgroundColor: bgColor[id]})
        }
    }

    for (let id in fontColor) {
        if (fontColor.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            $cell.css({color: fontColor[id]})
        }
    }
}

function renderAligns($root, store) {
    const h_align = store.h_align
    const v_align = store.v_align

    for (let id in h_align) {
        if (h_align.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            if (h_align[id] === 'format_align_left') {
                $cell.css({textAlign: 'left'})
            } else if (h_align[id] === 'format_align_center') {
                $cell.css({textAlign: 'center'})
            } else if (h_align[id] === 'format_align_right') {
                $cell.css({textAlign: 'right'})
            }
        }
    }

    for (let id in v_align) {
        if (v_align.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            if (v_align[id] === 'vertical_align_bottom') {
                $cell.css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'flex-end'
                })
            } else if (v_align[id] === 'vertical_align_center') {
                $cell.css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center'
                })
            } else if (v_align[id] === 'vertical_align_top') {
                $cell.css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'flex-start'
                })
            }
        }
    }
}

function renderFonts($root, store) {
    const size = store.size
    const font = store.font

    for (let id in size) {
        if (size.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            $cell.css({fontSize: size[id] + 'px'})
        }
    }

    for (let id in font) {
        if (font.hasOwnProperty(id)) {
            const $cell = $($root.findElement(`[data-col="${id}"]`))
            $cell.css({fontFamily: font[id]})
        }
    }
}