/*! olli.web - v0.0.1 - 2016-03-27
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */

/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
		var ref = refs[ refs.length - 1];

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss,ref.nextSibling);
		});
		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	w.loadCSS = loadCSS;
}(this));

/*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
/* global navigator */
/* exported onloadCSS */
function onloadCSS( ss, callback ) {
	var called;
	function newcb(){
			if( !called && callback ){
				called = true;
				callback.call( ss );
			}
	}
	if( ss.addEventListener ){
		ss.addEventListener( "load", newcb );
	}
	if( ss.attachEvent ){
		ss.attachEvent( "onload", newcb );
	}

	// This code is for browsers that don’t support onload
	// No support for onload (it'll bind but never fire):
	//	* Android 4.3 (Samsung Galaxy S4, Browserstack)
	//	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
	//	* Android 2.3 (Pantech Burst P9070)

	// Weak inference targets Android < 4.4
 	if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
		ss.onloadcssdefined( newcb );
	}
}

/*global onloadCSS:true*/

(function(window){
	var grunticon = function( css, onload ){
		"use strict";
		// expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
		if( !css || css.length !== 3 ){
			return;
		}

		var navigator = window.navigator;
		var document = window.document;
		var Image = window.Image;

		onload = onload || function() {};

		// Thanks Modernizr & Erik Dahlstrom
		var svg = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(window.opera && navigator.userAgent.indexOf('Chrome') === -1) && navigator.userAgent.indexOf('Series40') === -1;

		var img = new Image();

		img.onerror = function(){
			/* Images disabled */
			grunticon.method = "png";
			grunticon.href = css[2];
			loadCSS( css[2] );
		};

		img.onload = function(){
			var data = img.width === 1 && img.height === 1,
				href = css[ data && svg ? 0 : data ? 1 : 2 ];

			if( data && svg ){
				grunticon.method = "svg";
			} else if( data ){
				grunticon.method = "datapng";
			} else {
				grunticon.method = "png";
			}

			grunticon.href = href;
			onloadCSS( loadCSS( href ), function() {
				document.documentElement.className += " oi oi-"+grunticon.method;
				onload();
			} );
		};

		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	};
	grunticon.loadCSS = loadCSS;
	grunticon.onloadCSS = onloadCSS;
	window.grunticon = grunticon;
}(this));

(function(window) {
    var loadImage=function(imageContainer) {

            //var imageVersion = getImageVersion();

            if (!imageContainer || !imageContainer.children || imageContainer.$loaded === true) {
                return;
            }
            imageContainer.$loaded = true;
            var img = imageContainer.children[0];
            if (img) {
                var imgSRC = img.getAttribute("data-src"),
                    altTxt = img.getAttribute("data-alt");
                if (imgSRC) {
                    var imageElement = new Image();
                    imageElement.setAttribute("alt", altTxt ? altTxt : "");
                    imageElement.setAttribute("data-src", "");

                    imageContainer.appendChild(imageElement);
                    imageElement.onload = function() {
                        imageElement.removeAttribute("data-src");
                    };
                    imageElement.src = imgSRC;
                    console.log("loading"+imageElement.src);
                }
            }
    };
    this.loadImage = loadImage;
}(this));
(function (w, d, n) {
  'use strict';


  var Sloth=(function() {
    var windowHeight = w.innerHeight || d.documentElement.clientHeight,
        // When resizing or scrolling, hundreds to thousands events can be send.
        // Instead of executing the listeners on every single event, we only
        // execute the logic every X miliseconds the configured values are
        // determined based on the research results from Ph.D. Steven C. Seow.
        resizeTimeout    = null,
        scrollTimeout    = null,
        resizeHandlerSet = false,
        scrollHandlerSet = false,
        listeners = {},
        listenersDone = 0,
        listenerCount = 0,

        addEventListener = (function () {
          var overwrite;
          if (w.addEventListener) {
            overwrite = function(type, listener, element) {
              element.addEventListener(type, listener, false);
            };
          } else if (w.attachEvent) {
            overwrite = function(type, listener, element) {
              element.attachEvent('on' + type, listener);
            };
          }

          return overwrite;
        })(),

        removeEventListener = (function () {
          var overwrite;
          if (w.removeEventListener) {
            overwrite = function(type, listener, element) {
              element.removeEventListener(type, listener, false);
            };
          } else if (w.detachEvent) {
            overwrite = function(type, listener, element) {
              element.detachEvent('on' + type, listener);
            };
          }

          return overwrite;
        })(),

        isInViewport = function(el) {
          var rect = el.getBoundingClientRect();
          return !(rect.bottom+20 < 0 || rect.top-20 > windowHeight);
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

          var scrollTop = w.pageYOffset || d.documentElement.scrollTop,
              listenerIndex,
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
            removeEventListener('scroll', onScrollHandler, w);
            removeEventListener('resize', resetWindowHeight, w);
            scrollHandlerSet = false;
            resizeHandlerSet = false;
            listenerCount = 0;
          }

          scrollTimeout = null;
        },

        onScrollHandler = function () {
          // Prevent massive js execution on fast/long scrolling.
          if (null === scrollTimeout) {
            scrollTimeout = w.setTimeout(function () {
              updateListeners();
            }, 50);// Fairly unnoticable number.
          }
        },

        resetWindowHeight = function () {
          if (null === resizeTimeout) {
            resizeTimeout = w.setTimeout(function () {
              windowHeight = w.innerHeight || d.documentElement.clientHeight;
              resizeTimeout = null;
              // Check if something became visible after the resize.
              onScrollHandler();
            }, 100);
          }
        },

        addScrollListener = function (element, listener) {
          listenerCount += 1;
          listeners[listenerCount] = {
            elem: element,
            onready: listener
          };

          if (false === resizeHandlerSet) {
            addEventListener('resize', resetWindowHeight, w);
            resizeHandlerSet = true;
          }

          if (false === scrollHandlerSet) {
            if (n.userAgent.match(/webkit/i) && n.userAgent.match(/mobile/i)) {
              // iPad, iPhone, Android etc.
              addEventListener('touchmove', onScrollHandler, w);
            } else {
              addEventListener('scroll', onScrollHandler, w);
            }

            scrollHandlerSet = true;
          }

          // Directly check if the element is visible once added.
          onScrollHandler();

          return element;
        };

    return addScrollListener;

  })();
  w.Sloth = Sloth;

})(window, window.document, window.navigator);

(function (doc) {
    grunticon(["css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css"]);
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
        images = elementsByClassName('lazy');
    for (i = 0; i < images.length; i++) {
        var image = images[i];
        if (!image.$sloth) {
            image.$sloth = true;
            Sloth(image, loadImage);
        }
    }
})(document);

