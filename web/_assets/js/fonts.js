/**
 * Created by darkwolf on 04.06.2016.
 */
import "./components/fontfaceobserver.js";
(function(win,doc){
    Promise.all([
        new FontFaceObserver('myfont', {}).load(),
        new FontFaceObserver('myfont', {weight:'bold'}).load(),
        new FontFaceObserver('myfont', {style:'italic'}).load(),
        new FontFaceObserver('myfont', {weight:'bold',style:'italic'}).load()
    ]).then(function () {
        doc.documentElement.className += " myfont";
    });


}(window,document));
