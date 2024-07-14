/**
 * Gets in the file from localStorage, then enters in "data" to acess only the
 * original JSON file & acesses the first value to acess the option
 * @param paramsId is the option that want to acess.
 * @returns the data from the option
 */
export function useShowData(paramsId) {
    const fileData = useLocalStorageFile('ScrappyTok').data;
    const dataByOption = firstObjValue(fileData[paramsId])
    return firstObjValue(dataByOption)
}
/**
 * Receives a obj an return the first value.
 * -> To add: verify if is an array
 */
function firstObjValue(obj) {
    const objectValue = Object.values(obj);
    return objectValue;
}

/**
 * Receives an paramsId, an option, then returns all favorites saved on localStorage
 * @param {} paramsId 
 * @returns 
 */
export function useLocalFavorites(paramsId) { //favorite effects...
    var localFavs = useLocalStorageFile('ScrappyTok')[paramsId];
    return localFavs;
}

/**
 * Receives a file name (ScrappyTok) then returns the entire object as JSON
 * @param {} fileName File name;
 * @returns JSON object
 */
export function useLocalStorageFile(fileName) {
    const File = JSON.parse(localStorage.getItem(fileName));
    return File;
}

/**
 * Receives a file name then clear the localStorage associated with that name.
 * @param {} fileName File Name 
 */
export function clearData(fileName) {
    console.log("limpando ->", fileName)
    localStorage.removeItem(fileName)
}


/**
 * By the type option, returns the link of the item.
 * @param {*} item Object 
 * @param {*} type Type of option
 * @returns 
 */
export function returnLink(item, type) {
    switch (type) {
        case 'Favorite Effects':
            return item.EffectLink;
        case 'Favorite Hashtags':
            return item.Link;
        case 'Favorite Sounds':
            return item.Link;
        case 'Favorite Videos':
            return item.Link;
        case 'Follower List':
            return ("https://www.tiktok.com/@" + item.UserName);
        case 'Following List':
            return ("https://www.tiktok.com/@" + item.UserName);
        case 'Hashtag':
            return item.HashtagLink;
        case 'Like List':
            return item.Link;
        case 'Share History':
            return item.Link;
        default:
            break;
    }
}