/**
 * Created by darkwolf on 26.03.2016.
 */
(function(window) {
    function loadImage(imageContainer) {

            //var imageVersion = getImageVersion();

            if (!imageContainer || !imageContainer.children) {
                return;
            }
            var img = imageContainer.children[0];

            if (img) {
                /*
                var imgSRC = img.getAttribute("data-src-" + imageVersion);
                var altTxt = img.getAttribute("data-alt");
                */
                var imgSRC = img.getAttribute("data-src"),
                    altTxt = img.getAttribute("data-alt");
                if (imgSRC) {
                    var imageElement = new Image();
                    imageElement.setAttribute("alt", altTxt ? altTxt : "");
                    imageElement.setAttribute("data-src", "");

                    imageContainer.appendChild(imageElement);
                    imageContainer.setAttribute("data-olli", "");
                    imageElement.onload = function() {
                        imageElement.removeAttribute("data-src");
                    };
                    imageElement.src = imgSRC;
                }
            }
    };
    var lazyload = function(images) {
        for (var i = 0; i < images.length; i++) {
            loadImage(images[i]);
        }
    };
    window.lazyload = lazyload;
}(this));