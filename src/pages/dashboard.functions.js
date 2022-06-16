import { storage } from "../core/utils"

function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.appTitle}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>You doesn't created no one table</p>`
    }
    
    return `
        <div class="db__list-header">
            <span>Name</span>
            <span>Opening date</span>
        </div>

        <ul class="db__list">
            ${ keys.map(toHTML).join('') }
        </ul>
    `
}