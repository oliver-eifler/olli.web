!function(a,b,c){function d(a){return b.body?a():void setTimeout(function(){d(a)})}function e(){clearTimeout(f);var a=b.createElement("link");a.rel="stylesheet",a.href=ref.getAttribute("data-fb"),a.media="all",ref.parentNode.insertBefore(a,ref.nextSibling),d(function(){function a(a){var c,d,e,f=b.getElementsByTagName(a);for(c=0,d=f.length;d>c;c++)e=f[c],e.attributes&&"undefined"!=typeof e.attributes[g]&&(e.setAttribute("scr",e.getAttribute(g)),e.removeAttribute(g),e.className=e.className)}a("iframe"),a("img")})}var f=null,g="data-src";ref=b.getElementById("kickstart"),script=b.createElement("script"),script.src=ref.getAttribute("data-js"),script.async=!0,script.onload=function(){clearTimeout(f)},script.onerror=e,ref.parentNode.insertBefore(script,ref.nextSibling),f=setTimeout(e,8e3)}(this,document);