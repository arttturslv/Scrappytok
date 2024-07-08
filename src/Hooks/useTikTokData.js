export function useShowData(option) {
    const fileData = useLocalStorageFile('ScrappyTok').data;
    const dataByOption = firstObjValue(fileData[option])

    return firstObjValue(dataByOption)
} 

export function useLocalStorageFile(fileName) {
    const JSONFile = JSON.parse(localStorage.getItem(fileName));
        return JSONFile;
}

/**
 * Receives a obj an return the first value.
 * -> To add: verify if is an array
 */
function firstObjValue(obj) {
    const objectValue = Object.values(obj);
    return objectValue;
}