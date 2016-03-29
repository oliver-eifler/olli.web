/**
 * Created by darkwolf on 29.03.2016.
 */
var dataAttr="data-";
export function hasDataAttribute(node,name) {
    return (typeof node.attributes[dataAttr+name] != 'undefined');
}
export function setDataAttribute(node,name,value) {
    return node.setAttribute(dataAttr+name,value);
}
export function getDataAttribute(node,name) {
    return node.getAttribute(dataAttr+name);
}
export function removeDataAttribute(node,name) {
    return node.removeAttribute(dataAttr+name);
}
