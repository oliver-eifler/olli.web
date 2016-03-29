/**
 * Created by darkwolf on 29.03.2016.
 */
export default function(node,search) {
    if (node.getElementsByClassName)
        return node.getElementsByClassName(search);
    if (node.querySelectorAll) { // IE8
        return node.querySelectorAll("." + search);
    }
    var elements, pattern, i, results = [];
    if (node.evaluate) { // IE6, IE7
        pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
        elements = node.evaluate(pattern, node, null, 0, null);
        while ((i = elements.iterateNext())) {
            results.push(i);
        }
    } else {
        elements = node.getElementsByTagName("*");
        pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
        for (i = 0; i < elements.length; i++) {
            if (pattern.test(elements[i].className)) {
                results.push(elements[i]);
            }
        }
    }
    return results;
}
