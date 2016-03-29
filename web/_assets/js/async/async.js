/**
 * Created by darkwolf on 12.03.2016.
 */
(function (doc) {
    grunticon(["css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css"]);
    function hasAttrib(element, attributeName) {
        return (typeof element.attributes[attributeName] == 'undefined') ? 'no' : 'yes';
        //return (typeof element.attributes[attributeName] != 'undefined');
    }

    //ElementyByClassName function
    function elementsByClassName(search) {
        if (doc.getElementsByClassName)
            return doc.getElementsByClassName(search);
        if (doc.querySelectorAll) { // IE8
            return doc.querySelectorAll("." + search);
        }
        var elements, pattern, i, results = [];
        if (doc.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = doc.evaluate(pattern, doc, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = doc.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    }
    //LayLoad Images on Scroll using Sloth (Faultier)
    var i,
        images = elementsByClassName('sloth');
    for (i = 0; i < images.length; i++) {
        var image = images[i];
        if (!image.getAttribute("data-sloth")) {
            image.setAttribute("data-sloth","true")
            Sloth(image, loadImage);
        }
    }
})(document);

