/**
 * If the dataurl is undefined, then the function returns null
 * Else, the function shall return the File
 */

export default function convertDataURLtoFile(dataurl: string, filename: string) {
    if (dataurl === undefined) return null;
    let arr = dataurl.split(',');
    let mime;
    if (arr && arr[0]) {
        let _mime = arr[0].match(/:(.*?);/);
        if (_mime && _mime[1]) mime = _mime[1];
    }
    let bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
}
