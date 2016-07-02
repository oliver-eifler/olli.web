/**
 * Created by darkwolf on 16.05.2016.
 */
var webgen = require('olli.webgen');
var doc = new webgen("web/_assets/pages/test.olli.html", {
    cheerio: {decodeEntities: false},
    plugins: {"minify": {}, "image": {forceFrame:true,imagePath: "web/"}}
});
doc.process();
doc.save("web/pages/home.php");

doc = new webgen("web/_assets/pages/404.html", {
    cheerio: {decodeEntities: false},
    plugins: {"minify": {}}
});
doc.process();
doc.save("web/pages/404.php");