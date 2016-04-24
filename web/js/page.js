/*! olli.web - v0.0.1 - 2016-04-24
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
  var VENDOR_PREFIXES = ["Webkit", "Moz", "ms", "O"];

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

  var FontSizeObserver = (function () {
      'use strict';
      var FontSizeObserver = {},
          listeners = {},
          fontnode,
          eventType,
          transitionStyle,
          fontSize;
      //Find prefixed transitionend event and transition style
      var transitions = {
          'transition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd',
          'MozTransition': 'transitionend',
          'OTransition': 'otransitionend'
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
              if (transitionStyle)
                  fontnode.style[transitionStyle] = "font-size 1ms linear";
              html.getElementsByTagName("body")[0].appendChild(fontnode);
          }
          return fontnode;
      }

      function getSize() {
          //return getNode().clientHeight;
          var rect = getNode().getBoundingClientRect();
          return rect.bottom - rect.top;
      }

      FontSizeObserver.bind = function (key, fn) {
          listeners[key] = {
              fn: fn
          };
      };
      FontSizeObserver.unbind = function (key) {
          if (listeners.hasOwnProperty(key)) {
              delete listeners[key];
          }
      };
      FontSizeObserver.disable = function () {
          eventType && fontnode && fontnode.removeEventListener(eventType, onEvent, false);
      };
      FontSizeObserver.enable = function () {
          eventType && fontnode && fontnode.addEventListener(eventType, onEvent, false);
      };
      FontSizeObserver.fontSize = function() {return fontSize;};

      function onEvent(event) {
          //if (event.target !== fontnode)
          //    return;
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
      //Init
      fontSize = getSize();
      eventType && getNode().addEventListener(eventType, onEvent, false);
      /**
       * Expose 'FontSizeObserver'
       */
      return FontSizeObserver;

  })();

  var raf = win.requestAnimationFrame;
  var caf = win.cancelAnimationFrame;
  if (!(raf && caf))
      {
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
          return win.setTimeout(function() {callback(currTime + timeToCall);}, timeToCall);
        };
        caf = function(id) {
          win.clearTimeout(id);
        };
      }

  var ResizeObserver = (function () {
      'use strict';
      var ResizeObserver = {},
          listeners = {},
          eventType = "resize",
          width = win.innerWidth,
          height = win.innerHeight,
          orientation = getOrientation(),
          timeoutid = null;

      function getOrientation() {
          return (win.orientation && win.orientation !== undefined) ? Math.abs(+win.orientation) % 180 : 0;
      }

      ResizeObserver.bind = function (key, fn) {
          listeners[key] = {
              fn: fn
          };
      };
      ResizeObserver.unbind = function (key) {
          if (listeners.hasOwnProperty(key)) {
              delete listeners[key];
          }
      };
      ResizeObserver.disable = function () {
          win.removeEventListener(eventType, onEvent, false);
      };
      ResizeObserver.enable = function () {
          win.addEventListener(eventType, onEvent, false);
      };
      ResizeObserver.size = function () {
          return {
              width: win.innerWidth,
              height: win.innerHeight
          }
      };
      function callbacks() {
          var key,fn;
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
          var curWidth = win.innerWidth,
              curHeight = win.innerHeight;
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
          //caf(timeoutid);
          //return timeoutid = raf(callbacks);
          clearTimeout(timeoutid);
          return timeoutid = setTimeout(callbacks,100)
      }

      win.addEventListener(eventType, callbacks, false);

      return ResizeObserver;
  })();

  var fastdom = (function() {

  /**
   * FastDom
   *
   * Eliminates layout thrashing
   * by batching DOM read/write
   * interactions.
   *
   * @author Wilson Page <wilsonpage@me.com>
   * @author Kornel Lesinski <kornel.lesinski@ft.com>
   */

  'use strict';

  /**
   * Mini logger
   *
   * @return {Function}
   */
  var debug = function() {};

  /**
   * Initialize a `FastDom`.
   *
   * @constructor
   */
  function FastDom() {
    var self = this;
    self.reads = [];
    self.writes = [];
    self.raf = raf.bind(win); // test hook
    debug('initialized', self);
  }

  FastDom.prototype = {
    constructor: FastDom,

    /**
     * Adds a job to the read batch and
     * schedules a new frame if need be.
     *
     * @param  {Function} fn
     * @public
     */
    measure: function(fn, ctx) {
      debug('measure');
      var task = { fn: fn, ctx: ctx };
      this.reads.push(task);
      scheduleFlush(this);
      return task;
    },

    /**
     * Adds a job to the
     * write batch and schedules
     * a new frame if need be.
     *
     * @param  {Function} fn
     * @public
     */
    mutate: function(fn, ctx) {
      debug('mutate');
      var task = { fn: fn, ctx: ctx };
      this.writes.push(task);
      scheduleFlush(this);
      return task;
    },

    /**
     * Clears a scheduled 'read' or 'write' task.
     *
     * @param {Object} task
     * @return {Boolean} success
     * @public
     */
    clear: function(task) {
      debug('clear', task);
      return remove(this.reads, task) || remove(this.writes, task);
    },

    /**
     * Extend this FastDom with some
     * custom functionality.
     *
     * Because fastdom must *always* be a
     * singleton, we're actually extending
     * the fastdom instance. This means tasks
     * scheduled by an extension still enter
     * fastdom's global task queue.
     *
     * The 'super' instance can be accessed
     * from `this.fastdom`.
     *
     * @example
     *
     * var myFastdom = fastdom.extend({
     *   initialize: function() {
     *     // runs on creation
     *   },
     *
     *   // override a method
     *   measure: function(fn) {
     *     // do extra stuff ...
     *
     *     // then call the original
     *     return this.fastdom.measure(fn);
     *   },
     *
     *   ...
     * });
     *
     * @param  {Object} props  properties to mixin
     * @return {FastDom}
     */
    extend: function(props) {
      debug('extend', props);
      if (typeof props != 'object') throw new Error('expected object');

      var child = Object.create(this);
      mixin(child, props);
      child.fastdom = this;

      // run optional creation hook
      if (child.initialize) child.initialize();

      return child;
    },

    // override this with a function
    // to prevent Errors in console
    // when tasks throw
    catch: null
  };

  /**
   * Schedules a new read/write
   * batch if one isn't pending.
   *
   * @private
   */
  function scheduleFlush(fastdom) {
    if (!fastdom.scheduled) {
      fastdom.scheduled = true;
      fastdom.raf(flush.bind(null, fastdom));
      debug('flush scheduled');
    }
  }

  /**
   * Runs queued `read` and `write` tasks.
   *
   * Errors are caught and thrown by default.
   * If a `.catch` function has been defined
   * it is called instead.
   *
   * @private
   */
  function flush(fastdom) {
    debug('flush');

    var writes = fastdom.writes;
    var reads = fastdom.reads;
    var error;

    try {
      debug('flushing reads', reads.length);
      runTasks(reads);
      debug('flushing writes', writes.length);
      runTasks(writes);
    } catch (e) { error = e; }

    fastdom.scheduled = false;

    // If the batch errored we may still have tasks queued
    if (reads.length || writes.length) scheduleFlush(fastdom);

    if (error) {
      debug('task errored', error.message);
      if (fastdom.catch) fastdom.catch(error);
      else throw error;
    }
  }

  /**
   * We run this inside a try catch
   * so that if any jobs error, we
   * are able to recover and continue
   * to flush the batch until it's empty.
   *
   * @private
   */
  function runTasks(tasks) {
    debug('run tasks');
    var task; while (task = tasks.shift()) task.fn.call(task.ctx);
  }

  /**
   * Remove an item from an Array.
   *
   * @param  {Array} array
   * @param  {*} item
   * @return {Boolean}
   */
  function remove(array, item) {
    var index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1);
  }

  /**
   * Mixin own properties of source
   * object into the target.
   *
   * @param  {Object} target
   * @param  {Object} source
   */
  function mixin(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) target[key] = source[key];
    }
  }

  // There should never be more than
  // one instance of `FastDom` in an app
  var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line
  return exports;
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

  function gaussRound(num, decimalPlaces) {
      var d = decimalPlaces || 0,
          m = Math.pow(10, d),
          n = +(d ? num * m : num).toFixed(8),
          i = Math.floor(n), f = n - i,
          e = 1e-8,
          r = (f > 0.5 - e && f < 0.5 + e) ?
              ((i % 2 == 0) ? i : i + 1) : Math.round(n);
      return d ? r / m : r;
  }
  function _$(selector, el) {
      if (!el) {
          el = document;
      }
      return el.querySelector(selector);
  };
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
              , height = rect.bottom - rect.top
              , leftover = gaussRound(height % lineHeight,4)
          /* add siblings top margin to avoid margin collapse */
              , m = leftover ? (lineHeight - leftover) + nextTopMargin(element) : 0;
          fastdom.mutate(function () {
              element.style.marginBottom = (m) ? "" + m + "px" : "";
          });
      })
  };
  function adjustVerticalRythmn(parent) {
          var lineHeight = parseFloat(win.getComputedStyle(parent,':after').height) || 24,
              childs = parent.children,
              i, node;
          for (i = 0; i < childs.length, node = childs[i]; i++) {
              if (node.hasAttribute("data-reflow")) {
                  rythmnMargin(node,lineHeight);
              }
          }
  };

  /* Start Page */
  /*PAGE SETUP*/
  var content = _$(".content");
  var contentWidth = content.clientWidth;

  adjustVerticalRythmn(content);

  /*
   var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
   var p2=XHR.get("images/pult.jpg");p2.then(function(s){console.log("2 Loaded")}).catch(function(err){console.log("2 Error: "+err.message);}).then(function() {console.log("2 finished")});
   p2[0].abort();
   var p3=XHR.get("images/welpe.jpg").then(function(s){console.log("3 Loaded")}).catch(function(err){console.log("4 Error: "+err.message);}).then(function() {console.log("3 finished")});
   */
  ActionObserver.bind("ajax", function (event, element) {
      event.stopPropagation();
      event.preventDefault();
      console.log("Ajax: " + this.href);
  });
  FontSizeObserver.bind("page", function () {
      adjustVerticalRythmn(content);
  });
  ResizeObserver.bind("rythmn", function () {

      fastdom.measure(function () {
          var width = content.clientWidth;
          if (width != contentWidth) {
              adjustVerticalRythmn(content);
              contentWidth = width;
          }
      });
  });

}());