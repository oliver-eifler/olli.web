var olli=function(){"use strict";var a=window,b=a.document,c=b.documentElement,d=a.olli||{},e="data-status",f="data-src",g=function(a,c){if(a&&a.attributes[e]==c){a.setAttribute(e,"loading");var d=a.getAttribute(f),g=function(){a.removeAttribute(f),a.setAttribute(e,"loaded"),b.documentMode&&b.documentMode<9&&(a.className=a.className)};d&&(a.onload=g,a.src=d)}},h=function(c){function d(b,c){return o+=1,m[o]={elem:b,onready:c},!1===k&&(p(h,v,a),k=!0),!1===l&&(r(),p(g,u,a),l=!0),u(),b}function e(){n=o=0,q(g,u,a),q(h,v,a),l=!1,k=!1,cancelTimeout(j),i=j=null,m={}}var f,g=c.userAgent.match(/webkit/i)&&c.userAgent.match(/mobile/i)?"touchmove":"scroll",h="resize",i=null,j=null,k=!1,l=!1,m={},n=0,o=0,p=function(){var b;return a.addEventListener?b=function(a,b,c){c.addEventListener(a,b,!1)}:a.attachEvent&&(b=function(a,b,c){c.attachEvent("on"+a,b)}),b}(),q=function(){var b;return a.removeEventListener?b=function(a,b,c){c.removeEventListener(a,b,!1)}:a.detachEvent&&(b=function(a,b,c){c.detachEvent("on"+a,b)}),b}(),r=function(){f=a.innerHeight||b.documentElement.clientHeight},s=function(a){var b=a.getBoundingClientRect();return b.bottom>=0&&b.top<=f},t=function(){if(!(o<1)){var b,c;for(b in m)m.hasOwnProperty(b)&&(c=m[b],!c.handled&&s(c.elem)&&(n+=1,c.handled=!0,c.onready(c.elem),c=null));n===o&&(q(g,u,a),q(h,v,a),l=!1,k=!1,o=0),j=null}},u=function(){null===j&&(j=a.setTimeout(function(){t()},50))},v=function(){r(),u()};return{add:d,reset:e}}(a.navigator);return!function(a){var d=(b.body||c).style,e=["js"];d.msFlexWrap===a&&d.flexWrap===a||e.push("flexwrap"),c.className=e.join(" ")}(),a.lazy=function(a){a.onload=a.onerror=function(){},setTimeout(function(){h.add(a,g)},0)},d.sloth=h,d}();