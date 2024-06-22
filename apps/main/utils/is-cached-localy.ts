import isValidURL from "./is-valid-url";

const isCachedLocally = (url: string) => {
    if(!isValidURL(url)) return
}

export default isCachedLocally;