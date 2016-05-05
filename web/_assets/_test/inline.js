/**
 * Created by darkwolf on 02.05.2016.
 * simple Javascript no depencies,no modules
 */
!(function(win,html) {
        var slice = Array.prototype.slice;
        function li(img) {
            var windowHeight = win.innerHeight || html.clientHeight,
                rect = img.getBoundingClientRect(),
                imgSRC = img.getAttribute("data-src");
            if (!(rect.bottom < 0 || rect.top > windowHeight) && imgSRC) {
                img.parentNode.setAttribute("data-img", "loaded");
                img.onload = function () {
                    img.removeAttribute("data-src");
                };
                img.src = imgSRC;
            }
        };
        if (win.MutationObserver) {
            //yay, setup callback for mutations
            observer = new MutationObserver(function (mutations) {
                //for every mutation
                mutations.forEach(function (mutation) {
                    //for every added element
                    slice.call(mutation.addedNodes).forEach(function (node) {
                        // Check if we appended a node type that isn't
                        // an element that we can search for images inside,
                        // like a text node.
                        if (typeof node.getElementsByTagName !== 'function') {
                            return;
                        }
                        //for every new image
                        slice.call(node.getElementsByTagName('img')).forEach(function (img) {
                            li(img);
                        });
                    });
                });
            });

            //bind mutation observer to a specific element (probably a div somewhere)
            observer.observe(html, {childList: true, subtree: true});
        }
    })(this,document.documentElement);
