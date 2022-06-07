// Ex: getMethodName(click) => 'onClick'
export function getMethodName(listner) {
    return ('on' + listner[0].toUpperCase() + listner.substring(1))
}