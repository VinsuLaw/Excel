import { $ } from "../../core/DOM";

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function resizeTable($root, event, rowsCount) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.$el.dataset.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({opacity: 1, [sideProp]: '-5000px'})

    document.onmousemove = e => {
        if (type === 'col') {
            const delta = Math.floor(e.pageX - coords.right)
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = Math.floor(e.pageY - coords.bottom)
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        const rows = 20

        if (type === 'col') {
            $parent.css({width: value + 'px'})
            for (let row = 0; row < rowsCount; row++) {
                const cell = $root.findElement(`[data-col="${row}:${$parent.$el.dataset.col}"]`)
                cell.style.width = value + 'px'
            }
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
}