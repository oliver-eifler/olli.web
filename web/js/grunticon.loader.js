/*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */

!function(){function e(e,n,t){"use strict";var o=window.document.createElement("link"),i=n||window.document.getElementsByTagName("script")[0],a=window.document.styleSheets;return o.rel="stylesheet",o.href=e,o.media="only x",i.parentNode.insertBefore(o,i),o.onloadcssdefined=function(e){for(var n,t=0;t<a.length;t++)a[t].href&&a[t].href===o.href&&(n=!0);n?e():setTimeout(function(){o.onloadcssdefined(e)})},o.onloadcssdefined(function(){o.media=t||"all"}),o}function n(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}!function(t){var o=function(i,a){"use strict";if(i&&3===i.length){var d=t.navigator,r=t.document,c=t.Image;a=a||function(){};var s=!(!r.createElementNS||!r.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!r.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||t.opera&&-1===d.userAgent.indexOf("Chrome")||-1!==d.userAgent.indexOf("Series40")),l=new c;l.onerror=function(){o.method="png",o.href=i[2],e(i[2])},l.onload=function(){var t=1===l.width&&1===l.height,d=i[t&&s?0:t?1:2];t&&s?o.method="svg":t?o.method="datapng":o.method="png",o.href=d,n(e(d),function(){r.documentElement.className+=" oi oi-"+o.method,a()})},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};o.loadCSS=e,o.onloadCSS=n,t.grunticon=o}(this)}();