// Ex: getMethodName(click) => 'onClick'
export function getMethodName(listner) {
    return ('on' + listner[0].toUpperCase() + listner.substring(1))
}

export function getColorCode(color) {
    const COLORS_CODES = {
        'black': '#000000',
        'dark-grey-1': '#434343',
        'dark-grey-2': '#666666',
        'dark-grey-3': '#999999',
        'dark-grey-4': '#b7b7b7',
        'grey': '#cccccc',
        'light-grey-1': '#d9d9d9',
        'light-grey-2': '#efefef',
        'light-grey-3': '#f3f3f3',
        'white': '#ffffff',
        'vinous': '#980000',
        'red': '#ff0000',
        'orange': '#ff9900',
        'yellow': '#ffff00',
        'light-green': '#00ff00',
        'turquoise': '#00ffff',
        'blue': '#4a86e8',
        'dark-blue': '#0000ff',
        'purple': '#9900ff',
        'light-purple': '#ff00ff',
    }

    return COLORS_CODES[color]
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}