/*! olli.web - v0.0.1 - 2016-03-29
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


(function () {
    'use strict';

    /**
     * Created by darkwolf on 29.03.2016.
     */
    var win = window;
    var doc = win.document;
    var lib = win.Olli||{};

    function loadCSS (href, media) {
        // Arguments explained:
        // `href` [REQUIRED] is the URL for your CSS file.
        // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
        // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
        // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
        var refs = (doc.body||doc.getElementsByTagName("head")[0] ).childNodes;
        var ref = refs[refs.length - 1];
        var ss = doc.createElement("link");

        var sheets = doc.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        ss.media = "only x";

        // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
        var onloadcssdefined = function (cb) {
            var resolvedHref = ss.href;
            var i = sheets.length;
            while (i--) {
                if (sheets[i].href === resolvedHref) {
                    return cb();
                }
            }
            setTimeout(function () {
                onloadcssdefined(cb);
            });
        };

        function loadCB() {
            if (ss.addEventListener) {
                ss.removeEventListener("load", loadCB);
            }
            ss.media = media || "all";
        }

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if (ss.addEventListener) {
            ss.addEventListener("load", loadCB);
        }
        ss.onloadcssdefined = onloadcssdefined;
        onloadcssdefined(loadCB);

        ref.parentNode.insertBefore(ss, ref.nextSibling);
        return ss;
    }

    /*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
    /* global navigator */
    /* exported onloadCSS */
    function onloadCSS (ss, callback) {
        var called;

        function newcb() {
            if (!called && callback) {
                called = true;
                callback.call(ss);
            }
        }

        if (ss.addEventListener) {
            ss.addEventListener("load", newcb);
        }
        if (ss.attachEvent) {
            ss.attachEvent("onload", newcb);
        }

        // This code is for browsers that don’t support onload
        // No support for onload (it'll bind but never fire):
        //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
        //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
        //	* Android 2.3 (Pantech Burst P9070)

        // Weak inference targets Android < 4.4
        if ("isApplicationInstalled" in navigator && "onloadcssdefined" in ss) {
            ss.onloadcssdefined(newcb);
        }
    }

    var grunticon = function (css, onload) {
        // expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
        if (!css || css.length !== 3) {
            return;
        }

        var navigator = win.navigator;
        var Image = win.Image;

        onload = onload || function () {
            };

        // Thanks Modernizr & Erik Dahlstrom
        var svg = !!doc.createElementNS && !!doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(win.opera && navigator.userAgent.indexOf('Chrome') === -1) && navigator.userAgent.indexOf('Series40') === -1;

        var img = new Image();

        img.onerror = function () {
            /* Images disabled */
            //grunticon.method = "png";
            //grunticon.href = css[2];
            loadCSS(css[2]);
            onload();
        };

        img.onload = function () {
            var data = img.width === 1 && img.height === 1,
                href = css[data && svg ? 0 : data ? 1 : 2],
                method = "png";

            if (data && svg) {
                method = "svg";
            } else if (data) {
                method = "datapng";
            } /*else {
                grunticon.method = "png";
            }*/

            //grunticon.href = href;
            onloadCSS(loadCSS(href), function () {
                doc.documentElement.className += " oi oi-" + method;
                onload();
            });
        };

        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    };

    /**
     * Created by darkwolf on 29.03.2016.
     */
    var dataAttr="data-";
    function hasDataAttribute(node,name) {
        return (typeof node.attributes[dataAttr+name] != 'undefined');
    }
    function setDataAttribute(node,name,value) {
        return node.setAttribute(dataAttr+name,value);
    }
    function getDataAttribute(node,name) {
        return node.getAttribute(dataAttr+name);
    }
    function removeDataAttribute(node,name) {
        return node.removeAttribute(dataAttr+name);
    }

    function loadImage (imageContainer) {

        //var imageVersion = getImageVersion();

        if (!imageContainer || !imageContainer.children || hasDataAttribute(imageContainer,"img")) {
            return;
        }

        setDataAttribute(imageContainer,"img", "loading");
        var img = imageContainer.children[0];
        if (img) {
            var imgSRC = getDataAttribute(img,"src");
            if (imgSRC) {
                var imageElement = new Image();
                setDataAttribute(imageElement,"src","");
                imageContainer.appendChild(imageElement);
                imageElement.onload = function () {
                    removeDataAttribute(imageElement,"src");
                    setDataAttribute(imageContainer,"img", "loaded");
                };
                imageElement.src = imgSRC;
            }
        }
    }

    var Sloth = (function (navigator) {
        var windowHeight = win.innerHeight || doc.documentElement.clientHeight,
        // When resizing or scrolling, hundreds to thousands events can be send.
        // Instead of executing the listeners on every single event, we only
        // execute the logic every X miliseconds the configured values are
        // determined based on the research results from Ph.D. Steven C. Seow.
            resizeTimeout = null,
            scrollTimeout = null,
            resizeHandlerSet = false,
            scrollHandlerSet = false,
            listeners = {},
            listenersDone = 0,
            listenerCount = 0,

            addEventListener = (function () {
                var overwrite;
                if (win.addEventListener) {
                    overwrite = function (type, listener, element) {
                        element.addEventListener(type, listener, false);
                    };
                } else if (win.attachEvent) {
                    overwrite = function (type, listener, element) {
                        element.attachEvent('on' + type, listener);
                    };
                }

                return overwrite;
            })(),

            removeEventListener = (function () {
                var overwrite;
                if (win.removeEventListener) {
                    overwrite = function (type, listener, element) {
                        element.removeEventListener(type, listener, false);
                    };
                } else if (win.detachEvent) {
                    overwrite = function (type, listener, element) {
                        element.detachEvent('on' + type, listener);
                    };
                }

                return overwrite;
            })(),

            isInViewport = function (el) {
                var rect = el.getBoundingClientRect();
                return !(rect.bottom < 0 || rect.top > windowHeight);
            },
        /*
         function isElementOutViewport (el) {
         var rect = el.getBoundingClientRect();
         return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
         }
         */
            updateListeners = function () {
                if (listenerCount < 1) {
                    return;
                }

                var listenerIndex,
                    listener;

                for (listenerIndex in listeners) {
                    if (listeners.hasOwnProperty(listenerIndex)) {
                        listener = listeners[listenerIndex];

                        if (!listener.handled && isInViewport(listener.elem)) {
                            listenersDone += 1;
                            listener.handled = true;

                            listener.onready(listener.elem);
                        }
                    }
                }

                if (listenersDone === listenerCount) {
                    removeEventListener('scroll', onScrollHandler, win);
                    removeEventListener('resize', resetWindowHeight, win);
                    scrollHandlerSet = false;
                    resizeHandlerSet = false;
                    listenerCount = 0;
                }

                scrollTimeout = null;
            },

            onScrollHandler = function () {
                // Prevent massive js execution on fast/long scrolling.
                if (null === scrollTimeout) {
                    scrollTimeout = win.setTimeout(function () {
                        updateListeners();
                    }, 50);// Fairly unnoticable number.
                }
            },

            resetWindowHeight = function () {
                if (null === resizeTimeout) {
                    resizeTimeout = win.setTimeout(function () {
                        windowHeight = win.innerHeight || doc.documentElement.clientHeight;
                        resizeTimeout = null;
                        // Check if something became visible after the resize.
                        onScrollHandler();
                    }, 100);
                }
            };

        return function (element, listener) {
            listenerCount += 1;
            listeners[listenerCount] = {
                elem: element,
                onready: listener
            };

            if (false === resizeHandlerSet) {
                addEventListener('resize', resetWindowHeight, win);
                resizeHandlerSet = true;
            }

            if (false === scrollHandlerSet) {
                if (navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i)) {
                    // iPad, iPhone, Android etc.
                    addEventListener('touchmove', onScrollHandler, win);
                } else {
                    addEventListener('scroll', onScrollHandler, win);
                }

                scrollHandlerSet = true;
            }

            // Directly check if the element is visible once added.
            onScrollHandler();

            return element;
        };

    })(win.navigator);

    function loadJS (src, cb) {
        var refs = (doc.body||doc.getElementsByTagName("head")[0] ).childNodes;
        var ref = refs[refs.length - 1];
        var script = doc.createElement("script");
        script.src = src;
        script.async = true;
        if (cb && typeof(cb) === "function") {
            script.onload = cb;
        }
        ref.parentNode.insertBefore(script, ref.nextSibling);
        return script;
    };

    /**
     * Created by darkwolf on 29.03.2016.
     */
    function findByClassName(node,search) {
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

    //LayzLoad Images on Scroll using Sloth (Faultier)
    function updateSloth() {
        var i,
            images = findByClassName(doc,'sloth');
        for (i = 0; i < images.length; i++) {
            var image = images[i];
            if (!hasDataAttribute(image,"sloth")) {
                setDataAttribute(image,"sloth", "true");
                Sloth(image, loadImage);
            }
        }
    }

    lib.grunticon = grunticon;
    lib.updateSloth = updateSloth;
    win["olli"] = lib;

    // wait until body is defined before injecting links/scripts. This ensures a non-blocking load in IE11.
    function ready( cb ){
        if( doc.body ){
            return cb();
        }
        setTimeout(function(){
            ready( cb );
        });
    }

    ready(function() {
        grunticon(["css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css"], updateSloth);
        if (win.history && win.history.pushState) {
            loadJS("js/page.js");
        }
    });

}());