/*! olli.web - v0.0.1 - 2016-04-25
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */

(function() {
    "use strict";
    var win = window;
    var doc = win.document;
    var lib = win["olli"] || {};
    function loadCSS(href, cb, media) {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes, ref = refs[refs.length - 1];
        if (!href || href == "") return;
        cb = cb || function() {};
        function addcss(css) {
            var ss = doc.createElement("style");
            ss.setAttribute("type", "text/css");
            ss.setAttribute("media", media || "all");
            ss.setAttribute("data-src", href);
            if (ss.styleSheet) {
                ss.styleSheet.cssText = css;
            } else {
                ss.appendChild(document.createTextNode(css));
            }
            ref.parentNode.insertBefore(ss, ref.nextSibling);
            cb();
        }
        var req = new XMLHttpRequest();
        req.open("GET", href);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                var status = req.status === 1223 ? 204 : req.status;
                if (status >= 200 && status < 300 || status === 304) {
                    addcss(req.responseText);
                }
            }
        };
        req.send();
    }
    var grunticon = function(css, onload) {
        if (!css || css.length !== 3) {
            return;
        }
        var navigator = win.navigator;
        var Image = win.Image;
        onload = onload || function() {};
        var svg = !!doc.createElementNS && !!doc.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && !!doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(win.opera && navigator.userAgent.indexOf("Chrome") === -1) && navigator.userAgent.indexOf("Series40") === -1;
        var img = new Image();
        img.onerror = function() {
            loadCSS("bundle/" + css[2], onload);
        };
        img.onload = function() {
            var data = img.width === 1 && img.height === 1, href = css[data && svg ? 0 : data ? 1 : 2], method = "png";
            if (data && svg) {
                method = "svg";
            } else if (data) {
                method = "datapng";
            }
            loadCSS("bundle/" + href, function() {
                doc.documentElement.className += " oi oi-" + method;
                onload();
            });
        };
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    };
    var dataAttr = "data-";
    function hasDataAttribute(node, name) {
        return typeof node.attributes[dataAttr + name] != "undefined";
    }
    function setDataAttribute(node, name, value) {
        return node.setAttribute(dataAttr + name, value);
    }
    function getDataAttribute(node, name) {
        return node.getAttribute(dataAttr + name);
    }
    function removeDataAttribute(node, name) {
        return node.removeAttribute(dataAttr + name);
    }
    function loadImage(imageContainer) {
        if (!imageContainer || !imageContainer.children || hasDataAttribute(imageContainer, "img")) {
            return;
        }
        setDataAttribute(imageContainer, "img", "loading");
        var img = imageContainer.children[0];
        if (img) {
            var imgSRC = getDataAttribute(img, "src");
            if (imgSRC) {
                var imageElement = new Image();
                setDataAttribute(imageElement, "src", "");
                imageContainer.appendChild(imageElement);
                imageElement.onload = function() {
                    removeDataAttribute(imageElement, "src");
                    setDataAttribute(imageContainer, "img", "loaded");
                };
                imageElement.src = imgSRC;
            }
        }
    }
    var Sloth = function(navigator) {
        var windowHeight = win.innerHeight || doc.documentElement.clientHeight, resizeTimeout = null, scrollTimeout = null, resizeHandlerSet = false, scrollHandlerSet = false, listeners = {}, listenersDone = 0, listenerCount = 0, addEventListener = function() {
            var overwrite;
            if (win.addEventListener) {
                overwrite = function(type, listener, element) {
                    element.addEventListener(type, listener, false);
                };
            } else if (win.attachEvent) {
                overwrite = function(type, listener, element) {
                    element.attachEvent("on" + type, listener);
                };
            }
            return overwrite;
        }(), removeEventListener = function() {
            var overwrite;
            if (win.removeEventListener) {
                overwrite = function(type, listener, element) {
                    element.removeEventListener(type, listener, false);
                };
            } else if (win.detachEvent) {
                overwrite = function(type, listener, element) {
                    element.detachEvent("on" + type, listener);
                };
            }
            return overwrite;
        }(), isInViewport = function(el) {
            var rect = el.getBoundingClientRect();
            return !(rect.bottom < 0 || rect.top > windowHeight);
        }, updateListeners = function() {
            if (listenerCount < 1) {
                return;
            }
            var listenerIndex, listener;
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
                removeEventListener("scroll", onScrollHandler, win);
                removeEventListener("resize", resetWindowHeight, win);
                scrollHandlerSet = false;
                resizeHandlerSet = false;
                listenerCount = 0;
            }
            scrollTimeout = null;
        }, onScrollHandler = function() {
            if (null === scrollTimeout) {
                scrollTimeout = win.setTimeout(function() {
                    updateListeners();
                }, 50);
            }
        }, resetWindowHeight = function() {
            if (null === resizeTimeout) {
                resizeTimeout = win.setTimeout(function() {
                    windowHeight = win.innerHeight || doc.documentElement.clientHeight;
                    resizeTimeout = null;
                    onScrollHandler();
                }, 100);
            }
        };
        return function(element, listener) {
            listenerCount += 1;
            listeners[listenerCount] = {
                elem: element,
                onready: listener
            };
            if (false === resizeHandlerSet) {
                addEventListener("resize", resetWindowHeight, win);
                resizeHandlerSet = true;
            }
            if (false === scrollHandlerSet) {
                if (navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i)) {
                    addEventListener("touchmove", onScrollHandler, win);
                } else {
                    addEventListener("scroll", onScrollHandler, win);
                }
                scrollHandlerSet = true;
            }
            onScrollHandler();
            return element;
        };
    }(win.navigator);
    function loadJS(src, cb) {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
        var ref = refs[refs.length - 1];
        var script = doc.createElement("script");
        script.src = src;
        script.async = true;
        if (cb && typeof cb === "function") {
            script.onload = cb;
        }
        ref.parentNode.insertBefore(script, ref.nextSibling);
        return script;
    }
    function findByClassName(node, search) {
        if (node.getElementsByClassName) return node.getElementsByClassName(search);
        if (node.querySelectorAll) {
            return node.querySelectorAll("." + search);
        }
        var elements, pattern, i, results = [];
        if (node.evaluate) {
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = node.evaluate(pattern, node, null, 0, null);
            while (i = elements.iterateNext()) {
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
    function updateSloth() {
        var i, images = findByClassName(doc, "sloth");
        for (i = 0; i < images.length; i++) {
            var image = images[i];
            if (!hasDataAttribute(image, "sloth")) {
                setDataAttribute(image, "sloth", "true");
                Sloth(image, loadImage);
            }
        }
    }
    lib.grunticon = grunticon;
    lib.updateSloth = updateSloth;
    win["olli"] = lib;
    function ready(cb) {
        if (doc.body) {
            return cb();
        }
        setTimeout(function() {
            ready(cb);
        });
    }
    ready(function() {
        grunticon([ "css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css" ], updateSloth);
        if (win.history && win.history.pushState) {
            var js = [];
            if (!win.Promise) js.push("js/promise.min.js");
            js.push("js/page.min.js");
            loadJS("bundle/" + js.join(","));
        }
    });
})();