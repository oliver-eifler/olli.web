/*! olli.web - v0.0.2 - 2016-10-24
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


/** @const */var DEBUG = true;
(function() {
    "use strict";
    var win = window;
    var doc = win.document;
    var html = doc.documentElement;
    var olli = win.olli || {};
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
    var XHR = function(window, CONTENT_TYPE, MIME_JSON, HTTP_METHODS) {
        "use strict";
        var Promise = window.Promise, toString = Object.prototype.toString, isSimpleObject = function(o) {
            return toString.call(o) === "[object Object]";
        }, toQueryString = function(params) {
            return params.join("&").replace(/%20/g, "+");
        }, mimeTypeShortcuts = {
            json: MIME_JSON
        }, mimeTypeStrategies = {};
        mimeTypeStrategies[MIME_JSON] = function(text) {
            return JSON.parse(text);
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
            if (isSimpleObject(config.json)) {
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
                        mimeType = mimeType || xhr.getResponseHeader(CONTENT_TYPE) || "";
                        var status = xhr.status, response = xhr.responseText, parseResponse = mimeTypeStrategies[mimeType.split(";")[0]];
                        if (parseResponse) {
                            try {
                                response = parseResponse(response);
                            } catch (err) {
                                return reject(err);
                            }
                        }
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
                    ;
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
            $D$0 = $D$1 = void 0;
            return result;
        };
        XHR.defaults = {
            timeout: 15e3,
            cacheBurst: "_",
            charset: "UTF-8",
            headers: {}
        };
        if (Promise) {
            return XHR;
        } else {
            throw new Error("In order to use XHR you have to include a Promise polyfill");
        }
    }(window, "Content-Type", "application/json", [ "GET", "POST" ]);
    function setHTML(target, html$$1) {
        var node = target.cloneNode(false), fragment = doc.createDocumentFragment();
        fragment.appendChild(node);
        node.innerHTML = html$$1;
        target.parentNode.replaceChild(fragment, target);
    }
    ActionObserver.bind("ajax", function(event, element) {
        event.stopPropagation();
        event.preventDefault();
        var url = this.href, error = false;
        console.log("Ajax: " + url);
        olli.sloth.reset();
        var xhr = XHR.get(url, {
            data: {
                json: 1
            }
        }).then(function(pagedata) {
            console.log("ajax " + url + " loaded");
            var page = doc.getElementById("page");
            setHTML(page, pagedata.content);
            doc.title = pagedata.title;
        }).catch(function(err) {
            console.log("ajax " + url + " error: " + err.message);
        }).then(function() {
            console.log("ajax " + url + " finished");
        });
    });
})();