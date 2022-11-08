export function getRowsToUpdate(data) {
    return Object.keys(data).map((key, index) => `${key} = $${index + 1}`)
}