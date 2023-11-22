export function GetSrc(imgElement){
    const str = imgElement.src;
    return str.substring(str.indexOf("icons/"));
}