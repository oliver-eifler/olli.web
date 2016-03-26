/**
 * Created by darkwolf on 12.03.2016.
 */
(function( doc ) {
    grunticon(["css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css"],
        function() {lazyload(doc.getElementsByClassName("lazy"));});
})( document );
