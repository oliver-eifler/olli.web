import {win,html} from '../globals'
import fastdom from "../page/fastdom.js";

var curFontSize = 100; /*fontsize in percent 100%=16px*/
export default function() {
    var fontSize=16,width = win.innerWidth;
    if (width > 1600)
        fontSize = width/100;
    else if (width < 480) {
        fontSize = width/25;
        if (fontSize < 12)
            fontSize = 12;
    }
        
    fontSize = parseInt(fontSize*6.25/*/16*100*/);
    if (fontSize != curFontSize) {
        curFontSize = fontSize; 
        fastdom.mutate(function () {
            html.style.fontSize = "" + fontSize+ "%";
        });
        return true;
    }
    return false;
}
