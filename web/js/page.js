/*! olli.web - v0.0.1 - 2016-04-25
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */

(function() {
    "use strict";
    var win = window;
    var doc = win.document;
    var html = doc.documentElement;
    var VENDOR_PREFIXES = [ "Webkit", "Moz", "ms", "O" ];
    var ActionObserver = function() {
        "use strict";
        var ActionObserver = {}, has = {}.hasOwnProperty, listeners = {};
        ActionObserver.bind = function(key, fn) {
            listeners[key] = {
                triggered: false,
                fn: fn
            };
        };
        ActionObserver.unbind = function(key) {
            if (has.call(listeners, key)) {
                delete listeners[key];
            }
        };
        ActionObserver.isTriggered = function(key) {
            return has.call(listeners, key) && listeners[key].triggered;
        };
        ActionObserver.disable = function() {
            html.removeEventListener("click", onEvent, false);
            html.removeEventListener("submit", onEvent, false);
        };
        function onEvent(evt) {
            var el = find(evt.target), key, fn;
            if (el) {
                if (el.nodeName.toLowerCase() === "form" && evt.type !== "submit") {
                    return;
                }
                key = el.getAttribute("data-observe");
                if (!has.call(listeners, key)) {
                    listeners[key] = {};
                }
                listeners[key].triggered = true;
                fn = listeners[key].fn;
                if (fn) {
                    fn.call(el, evt, el);
                }
            }
        }
        function find(el) {
            if ("closest" in el) {
                return el.closest("[data-observe]");
            }
            while (el && el !== html) {
                if (el.hasAttribute("data-observe")) {
                    return el;
                }
                el = el.parentNode;
            }
            return null;
        }
        html.addEventListener("click", onEvent, false);
        html.addEventListener("submit", onEvent, false);
        return ActionObserver;
    }();
    var FontSizeObserver = function() {
        "use strict";
        var FontSizeObserver = {}, listeners = {}, fontnode, eventType, transitionStyle, fontSize;
        var transitions = {
            transition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend"
        };
        for (var t in transitions) {
            if (html.style[t] !== undefined) {
                eventType = transitions[t];
                transitionStyle = t;
                break;
            }
        }
        function getNode() {
            if (!fontnode) {
                fontnode = doc.createElement("div");
                fontnode.style.cssText = "position:absolute;width:1rem;height:1rem;left;-1rem;top:-1rem;";
                if (transitionStyle) fontnode.style[transitionStyle] = "font-size 1ms linear";
                html.getElementsByTagName("body")[0].appendChild(fontnode);
            }
            return fontnode;
        }
        function getSize() {
            var rect = getNode().getBoundingClientRect();
            return rect.bottom - rect.top;
        }
        FontSizeObserver.bind = function(key, fn) {
            listeners[key] = {
                fn: fn
            };
        };
        FontSizeObserver.unbind = function(key) {
            if (listeners.hasOwnProperty(key)) {
                delete listeners[key];
            }
        };
        FontSizeObserver.disable = function() {
            eventType && fontnode && fontnode.removeEventListener(eventType, onEvent, false);
        };
        FontSizeObserver.enable = function() {
            eventType && fontnode && fontnode.addEventListener(eventType, onEvent, false);
        };
        FontSizeObserver.fontSize = function() {
            return fontSize;
        };
        function onEvent(event) {
            fontSize = getSize();
            var fn, key;
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    fn = listeners[key].fn;
                    if (fn) {
                        fn.call(null, fontSize);
                    }
                }
            }
        }
        fontSize = getSize();
        eventType && getNode().addEventListener(eventType, onEvent, false);
        return FontSizeObserver;
    }();
    var raf = win.requestAnimationFrame;
    var caf = win.cancelAnimationFrame;
    if (!(raf && caf)) {
        VENDOR_PREFIXES.forEach(function(prefix) {
            prefix = prefix.toLowerCase();
            raf = raf || win[prefix + "RequestAnimationFrame"];
            caf = caf || win[prefix + "CancelAnimationFrame"] || win[prefix + "CancelRequestAnimationFrame"];
        });
    }
    if (!raf || !caf) {
        raf = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var lastTime = currTime + timeToCall;
            return win.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
        };
        caf = function(id) {
            win.clearTimeout(id);
        };
    }
    var ResizeObserver = function() {
        "use strict";
        var ResizeObserver = {}, listeners = {}, eventType = "resize", width = win.innerWidth, height = win.innerHeight, orientation = getOrientation(), timeoutid = null;
        function getOrientation() {
            return win.orientation && win.orientation !== undefined ? Math.abs(+win.orientation) % 180 : 0;
        }
        ResizeObserver.bind = function(key, fn) {
            listeners[key] = {
                fn: fn
            };
        };
        ResizeObserver.unbind = function(key) {
            if (listeners.hasOwnProperty(key)) {
                delete listeners[key];
            }
        };
        ResizeObserver.disable = function() {
            win.removeEventListener(eventType, onEvent, false);
        };
        ResizeObserver.enable = function() {
            win.addEventListener(eventType, onEvent, false);
        };
        ResizeObserver.size = function() {
            return {
                width: win.innerWidth,
                height: win.innerHeight
            };
        };
        function callbacks() {
            var key, fn;
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    fn = listeners[key].fn;
                    if (fn) {
                        fn.call(null, width, height);
                    }
                }
            }
        }
        function onEvent(event) {
            var curWidth = win.innerWidth, curHeight = win.innerHeight;
            if (curWidth == width && curHeight == height) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return;
            }
            width = curWidth;
            height = curHeight;
            var curOrientation = getOrientation();
            if (curOrientation !== orientation) {
                clearTimeout(timeoutid);
                callbacks();
                return orientation = curOrientation;
            }
            clearTimeout(timeoutid);
            return timeoutid = setTimeout(callbacks, 100);
        }
        win.addEventListener(eventType, callbacks, false);
        return ResizeObserver;
    }();
    var fastdom = function() {
        "use strict";
        var debug = function() {};
        function FastDom() {
            var self = this;
            self.reads = [];
            self.writes = [];
            self.raf = raf.bind(win);
            debug("initialized", self);
        }
        FastDom.prototype = {
            constructor: FastDom,
            measure: function(fn, ctx) {
                debug("measure");
                var task = {
                    fn: fn,
                    ctx: ctx
                };
                this.reads.push(task);
                scheduleFlush(this);
                return task;
            },
            mutate: function(fn, ctx) {
                debug("mutate");
                var task = {
                    fn: fn,
                    ctx: ctx
                };
                this.writes.push(task);
                scheduleFlush(this);
                return task;
            },
            clear: function(task) {
                debug("clear", task);
                return remove(this.reads, task) || remove(this.writes, task);
            },
            extend: function(props) {
                debug("extend", props);
                if (typeof props != "object") throw new Error("expected object");
                var child = Object.create(this);
                mixin(child, props);
                child.fastdom = this;
                if (child.initialize) child.initialize();
                return child;
            },
            "catch": null
        };
        function scheduleFlush(fastdom) {
            if (!fastdom.scheduled) {
                fastdom.scheduled = true;
                fastdom.raf(flush.bind(null, fastdom));
                debug("flush scheduled");
            }
        }
        function flush(fastdom) {
            debug("flush");
            var writes = fastdom.writes;
            var reads = fastdom.reads;
            var error;
            try {
                debug("flushing reads", reads.length);
                runTasks(reads);
                debug("flushing writes", writes.length);
                runTasks(writes);
            } catch (e) {
                error = e;
            }
            fastdom.scheduled = false;
            if (reads.length || writes.length) scheduleFlush(fastdom);
            if (error) {
                debug("task errored", error.message);
                if (fastdom.catch) fastdom.catch(error); else throw error;
            }
        }
        function runTasks(tasks) {
            debug("run tasks");
            var task;
            while (task = tasks.shift()) task.fn.call(task.ctx);
        }
        function remove(array, item) {
            var index = array.indexOf(item);
            return !!~index && !!array.splice(index, 1);
        }
        function mixin(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) target[key] = source[key];
            }
        }
        var exports = win.fastdom = win.fastdom || new FastDom();
        return exports;
    }();
    (function(CONTENT_TYPE, MIME_JSON, HTTP_METHODS) {
        var Promise = window.Promise, toString = Object.prototype.toString, isSimpleObject = function(o) {
            return o && toString.call(o) === "[object Object]";
        }, toQueryString = function(params) {
            return params.join("&").replace(/%20/g, "+");
        }, mimeTypeShortcuts = {
            json: MIME_JSON
        };
        function XHR(method, url) {
            var config = arguments[2];
            if (config === void 0) config = {};
            method = method.toUpperCase();
            var charset = "charset" in config ? config.charset : XHR.defaults.charset, cacheBurst = "cacheBurst" in config ? config.cacheBurst : XHR.defaults.cacheBurst, mimeType = "mimeType" in config ? config.mimeType : XHR.defaults.mimeType, data = config.data, extraArgs = [], headers = {};
            Object.keys(XHR.defaults.headers).forEach(function(key) {
                headers[key] = XHR.defaults.headers[key];
            });
            Object.keys(config.headers || {}).forEach(function(key) {
                headers[key] = config.headers[key];
            });
            if (isSimpleObject(data)) {
                Object.keys(data).forEach(function(key) {
                    var name = encodeURIComponent(key), value = data[key];
                    if (Array.isArray(value)) {
                        value.forEach(function(value) {
                            extraArgs.push(name + "=" + encodeURIComponent(value));
                        });
                    } else {
                        extraArgs.push(name + "=" + encodeURIComponent(value));
                    }
                });
                if (method === "GET") {
                    data = null;
                } else {
                    data = toQueryString(extraArgs);
                    extraArgs = [];
                }
            }
            if (typeof data === "string") {
                if (method === "GET") {
                    extraArgs.push(data);
                    data = null;
                } else {
                    headers[CONTENT_TYPE] = "application/x-www-form-urlencoded";
                }
            }
            if (config.json && isSimpleObject(config.json)) {
                data = JSON.stringify(config.json);
                headers[CONTENT_TYPE] = MIME_JSON;
            }
            if (CONTENT_TYPE in headers) {
                headers[CONTENT_TYPE] += "; charset=" + charset;
            }
            if (cacheBurst && method === "GET") {
                extraArgs.push(cacheBurst + "=" + Date.now());
            }
            if (config.emulateHTTP && HTTP_METHODS.indexOf(method) > 1) {
                extraArgs.push(config.emulateHTTP + "=" + method);
                headers["X-Http-Method-Override"] = method;
                method = "POST";
            }
            if (extraArgs.length) {
                url += (~url.indexOf("?") ? "&" : "?") + toQueryString(extraArgs);
            }
            var xhr = new XMLHttpRequest();
            var promise = new Promise(function(resolve, reject) {
                var handleErrorResponse = function(message) {
                    return function() {
                        reject(new Error(message));
                    };
                };
                xhr.onabort = handleErrorResponse("abort");
                xhr.onerror = handleErrorResponse("error");
                xhr.ontimeout = handleErrorResponse("timeout");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        var status = xhr.status === 1223 ? 204 : xhr.status, response = xhr.responseText;
                        if (status >= 200 && status < 300 || status === 304) {
                            resolve(response);
                        } else {
                            reject(new Error(xhr.statusText));
                        }
                    }
                };
                xhr.open(method, url, true);
                xhr.timeout = config.timeout || XHR.defaults.timeout;
                Object.keys(headers).forEach(function(key) {
                    var headerValue = headers[key];
                    if (headerValue != null) {
                        xhr.setRequestHeader(key, String(headerValue));
                    }
                });
                if (mimeType) {
                    if (mimeType in mimeTypeShortcuts) {
                        xhr.responseType = mimeType;
                        mimeType = mimeTypeShortcuts[mimeType];
                    } else if (xhr.overrideMimeType) {
                        xhr.overrideMimeType(mimeType);
                    }
                }
                xhr.send(data);
            });
            promise[0] = xhr;
            return promise;
        }
        HTTP_METHODS.forEach(function(method) {
            XHR[method.toLowerCase()] = function(url, config) {
                return XHR(method, url, config);
            };
        });
        XHR.serialize = function(node) {
            var $D$0;
            var $D$1;
            var $D$2;
            var $D$3;
            var $D$4;
            var result = {};
            if ("form" in node) {
                node = [ node ];
            } else if ("elements" in node) {
                node = node.elements;
            } else {
                node = [];
            }
            $D$0 = 0;
            $D$1 = node.length;
            for (var el; $D$0 < $D$1; ) {
                el = node[$D$0++];
                var name = el.name;
                if (el.disabled || !name) continue;
                switch (el.type) {
                  case "select-multiple":
                    result[name] = [];

                  case "select-one":
                    $D$4 = el.options;
                    $D$2 = 0;
                    $D$3 = $D$4.length;
                    for (var option; $D$2 < $D$3; ) {
                        option = $D$4[$D$2++];
                        if (option.selected) {
                            if (name in result) {
                                result[name].push(option.value);
                            } else {
                                result[name] = option.value;
                            }
                        }
                    }
                    $D$2 = $D$3 = $D$4 = void 0;
                    break;

                  case undefined:
                  case "fieldset":
                  case "file":
                  case "submit":
                  case "reset":
                  case "button":
                    break;

                  case "checkbox":
                    if (el.checked && result[name]) {
                        if (typeof result[name] === "string") {
                            result[name] = [ result[name] ];
                        }
                        result[name].push(el.value);
                        break;
                    }

                  case "radio":
                    if (!el.checked) break;

                  default:
                    result[name] = el.value;
                }
            }
            return result;
        };
        XHR.defaults = {
            timeout: 15e3,
            cacheBurst: "_",
            charset: "UTF-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        };
        if (Promise) {
            return XHR;
        } else {
            throw new Error("In order to use XHR you have to include a Promise polyfill");
        }
    })("Content-Type", "application/json", [ "GET", "POST" ]);
    function _$(selector, el) {
        if (!el) {
            el = document;
        }
        return el.querySelector(selector);
    }
    function nextTopMargin(element) {
        var node = element.nextElementSibling, top = 0;
        if (node) {
            var styles = win.getComputedStyle(node);
            top = parseFloat(styles.marginTop) || 0;
        }
        return top;
    }
    function rythmnMargin(element, lineHeight) {
        fastdom.measure(function() {
            var rect = element.getBoundingClientRect(), height = rect.bottom - rect.top, leftover = height % lineHeight, m = leftover >= .05 ? lineHeight - leftover + nextTopMargin(element) : 0;
            fastdom.mutate(function() {
                element.style.marginBottom = "" + m + "px";
            });
        });
    }
    function adjustVerticalRythmn(parent) {
        var lineHeight = parseFloat(win.getComputedStyle(parent, ":after").height) || 24, childs = parent.children, i, node;
        for (i = 0; i < childs.length, node = childs[i]; i++) {
            if (node.hasAttribute("data-reflow")) {
                rythmnMargin(node, lineHeight);
            }
        }
    }
    var content = _$(".content");
    var contentWidth = content.clientWidth;
    adjustVerticalRythmn(content);
    ActionObserver.bind("ajax", function(event, element) {
        event.stopPropagation();
        event.preventDefault();
        console.log("Ajax: " + this.href);
    });
    FontSizeObserver.bind("page", function() {
        adjustVerticalRythmn(content);
    });
    ResizeObserver.bind("rythmn", function() {
        fastdom.measure(function() {
            var width = content.clientWidth;
            if (width != contentWidth) {
                adjustVerticalRythmn(content);
                contentWidth = width;
            }
        });
    });
})();