/*! olli.web - v0.0.1 - 2016-04-03
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


(function () {
    'use strict';

    /**
     * Created by darkwolf on 29.03.2016.
     */
    var win = window;
    var doc = win.document;
    var html = doc.documentElement;

    var ActionObserver = (function(){
        'use strict';
        
        var ActionObserver = {}, 
        has = {}.hasOwnProperty,
        listeners = {};

        /**
         * Map a callback function to the element 
         * in which you would like to observe action 
         * events on
         * 
         * @param {String} key
         * @param {Function} fn
         * @api public
         */
        ActionObserver.bind = function(key, fn){
            listeners[key] = {
                triggered: false,
                fn: fn
            };
        };

        /**
         * Remove a callback function bound to an 
         * element being observed
         * 
         * @param {String} key
         * @api public
         */
        ActionObserver.unbind = function(key){
            if(has.call(listeners, key)){
                delete listeners[key];
            }
        };

        /**
         * Was an action event triggered on the 
         * element corresponding to the provided key
         * 
         * @param {String} key
         * @return {Boolean}
         * @api public
         */
        ActionObserver.isTriggered = function(key){
            return has.call(listeners, key) && listeners[key].triggered;
        };
        
        /**
         * Disable ActionObserver functionality and 
         * remove the event listeners from the 
         * document element
         *
         * @api public
         */
        ActionObserver.disable = function(){
            html.removeEventListener('click', onEvent, false);
            html.removeEventListener('submit', onEvent, false);
        };
        
        /**
         * Handle action events (click, submit) on 
         * the document
         *
         * @param {Event} evt
         * @api private
         */
        function onEvent(evt){
            var el = find(evt.target), key, fn;
            if(el){
                // If the element is a form and it is 
                // not a submit event, return
                if(el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit'){
                    return;
                }
                // Get the value of the data-observe 
                // attribute used to find the callback 
                // function
                key = el.getAttribute('data-observe');
                // Create map if it doesn't exist
                if(!has.call(listeners, key)){
                    listeners[key] = {};
                }
                // Mark the element as triggered
                listeners[key].triggered = true;
                // If a callback exists, invoke the 
                // function passing the element and event 
                // object
                fn = listeners[key].fn;
                if(fn){
                    fn.call(el, evt, el);
                }
            }
        }
        
        /**
         * Climb up the DOM tree to find the element 
         * containing the `data-observe` attribute 
         * based on an event's target
         *
         * @param {Element} el
         * @return {Element|Null}
         * @api private
         */
        function find(el){
            if('closest' in el){
                return el.closest('[data-observe]');
            }
            while(el && el !== html){
                if(el.hasAttribute('data-observe')){
                    return el;  
                }
                el = el.parentNode;
            }
            return null;
        }

        // Listen for click and submit events on the 
        // document when they bubble up
        html.addEventListener('click', onEvent, false);
        html.addEventListener('submit', onEvent, false);

        /**
         * Expose 'ActionObserver'
         */
        return ActionObserver;

    })();

    (function (CONTENT_TYPE, MIME_JSON, HTTP_METHODS) {

        var Promise = window.Promise,
            toString = Object.prototype.toString,
            isSimpleObject = function (o) {
                return o && toString.call(o) === "[object Object]"
            },
            toQueryString = function (params) {
                return params.join("&").replace(/%20/g, "+")
            },
            mimeTypeShortcuts = {
                json: MIME_JSON
            };

        function XHR(method, url) {
            var config = arguments[2];
            if (config === void 0)config = {};
            method = method.toUpperCase();

            var charset = "charset" in config ? config.charset : XHR.defaults.charset,
                cacheBurst = "cacheBurst" in config ? config.cacheBurst : XHR.defaults.cacheBurst,
                mimeType = "mimeType" in config ? config.mimeType : XHR.defaults.mimeType,
                data = config.data,
                extraArgs = [],
                headers = {};

            // read default headers first
            Object.keys(XHR.defaults.headers).forEach(function (key) {
                headers[key] = XHR.defaults.headers[key];
            });

            // apply request specific headers
            Object.keys(config.headers || {}).forEach(function (key) {
                headers[key] = config.headers[key];
            });

            if (isSimpleObject(data)) {
                Object.keys(data).forEach(function (key) {
                    var name = encodeURIComponent(key),
                        value = data[key];

                    if (Array.isArray(value)) {
                        value.forEach(function (value) {
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
            var promise = new Promise(function (resolve, reject) {
                var handleErrorResponse = function (message) {
                    return function () {
                        reject(new Error(message))
                    }
                };

                xhr.onabort = handleErrorResponse("abort");
                xhr.onerror = handleErrorResponse("error");
                xhr.ontimeout = handleErrorResponse("timeout");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var status = (xhr.status === 1223 ? 204 : xhr.status),
                            response = xhr.responseText;

                        if (status >= 200 && status < 300 || status === 304) {
                            resolve(response);
                        } else {
                            reject(new Error(xhr.statusText));
                        }
                    }
                };

                xhr.open(method, url, true);
                xhr.timeout = config.timeout || XHR.defaults.timeout;
                // set request headers
                Object.keys(headers).forEach(function (key) {
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

        // define shortcuts
        HTTP_METHODS.forEach(function (method) {
            XHR[method.toLowerCase()] = function (url, config) {
                return XHR(method, url, config)
            };
        });

        XHR.serialize = function (node) {
            var $D$0;
            var $D$1;
            var $D$2;
            var $D$3;
            var $D$4;
            var result = {};

            if ("form" in node) {
                node = [node];
            } else if ("elements" in node) {
                node = node.elements;
            } else {
                node = [];
            }

            $D$0 = 0;
            $D$1 = node.length;
            for (var el; $D$0 < $D$1;) {
                el = (node[$D$0++]);
                var name = el.name;

                if (el.disabled || !name) continue;

                switch (el.type) {
                    case "select-multiple":
                        result[name] = [];
                    /* falls through */
                    case "select-one":
                        $D$4 = (el.options);
                        $D$2 = 0;
                        $D$3 = $D$4.length;
                        for (var option; $D$2 < $D$3;) {
                            option = ($D$4[$D$2++]);
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
                    case "fieldset": // fieldset
                    case "file": // file input
                    case "submit": // submit button
                    case "reset": // reset button
                    case "button": // custom button
                        break;

                    case "checkbox": // checkbox
                        if (el.checked && result[name]) {
                            if (typeof result[name] === "string") {
                                result[name] = [result[name]];
                            }

                            result[name].push(el.value);

                            break;
                        }
                    /* falls through */
                    case "radio": // radio button
                        if (!el.checked) break;
                    /* falls through */
                    default:
                        result[name] = el.value;
                }
            }

            //$D$0 = $D$1 = void 0;

            return result;
        };

        // useful defaults
        XHR.defaults = {
            timeout: 15000,
            cacheBurst: "_",
            charset: "UTF-8",
            headers: {"X-Requested-With": "XMLHttpRequest"}
        };
        if (Promise) {
            // expose namespace globally
            return XHR;
        } else {
            throw new Error("In order to use XHR you have to include a Promise polyfill");
        }
    })("Content-Type", "application/json", ["GET", "POST"]);

    /*
    var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
    var p2=XHR.get("images/pult.jpg");p2.then(function(s){console.log("2 Loaded")}).catch(function(err){console.log("2 Error: "+err.message);}).then(function() {console.log("2 finished")});
    p2[0].abort();
    var p3=XHR.get("images/welpe.jpg").then(function(s){console.log("3 Loaded")}).catch(function(err){console.log("4 Error: "+err.message);}).then(function() {console.log("3 finished")});
    */
    ActionObserver.bind("ajax",function(event,element) {
        event.stopPropagation();
        event.preventDefault();

        console.log("Ajax: "+this.href);
    });

}());