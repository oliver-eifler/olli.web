import {win} from '../globals'
import fastdom from "../page/fastdom.js";

function nextTopMargin(element) {
    var node = element.nextElementSibling,
        top = 0;
    if (node) {
        var styles = win.getComputedStyle(node);
        top = parseFloat(styles.marginTop) || 0;
    }
    return top;

}
function rythmnMargin(element, lineHeight) {
    fastdom.measure(function () {
        var rect = element.getBoundingClientRect()
            ,height = rect.bottom - rect.top
            ,leftover = height % lineHeight
        /* add siblings top margin to avoid margin collapse */
            ,m = leftover >= 0.05 ? (lineHeight - leftover) + nextTopMargin(element) : 0;
        fastdom.mutate(function () {
            element.style.marginBottom = "" + m + "px";
        });
    })
};
export default function(parent) {
    var lineHeight = parseFloat(win.getComputedStyle(parent, ':after').height) || 24,
        childs = parent.children,
        i, node;
    for (i = 0; i < childs.length, node = childs[i]; i++) {
        if (node.hasAttribute("data-reflow")) {
            rythmnMargin(node, lineHeight);
        }
    }
};
