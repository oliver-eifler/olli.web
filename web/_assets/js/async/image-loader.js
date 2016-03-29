/**
 * Created by darkwolf on 26.03.2016.
 */
(function(window) {
    var loadImage=function(imageContainer) {

            //var imageVersion = getImageVersion();

            if (!imageContainer || !imageContainer.children || imageContainer.getAttribute("data-img")) {
                return;
            }

            imageContainer.setAttribute("data-img","loading");
            var img = imageContainer.children[0];
            if (img) {
                var imgSRC = img.getAttribute("data-src");
                    //altTxt = imageContainer.getAttribute("data-alt") || img.getAttribute("data-alt");
                if (imgSRC) {
                    var imageElement = new Image();
                    //imageElement.setAttribute("alt", altTxt ? altTxt : "");
                    imageElement.setAttribute("data-src", "");
                    imageContainer.appendChild(imageElement);
                    imageElement.onload = function() {
                        imageElement.removeAttribute("data-src");
                        imageContainer.setAttribute("data-img","loaded");
                    };
                    imageElement.src = imgSRC;
                }
            }
    };
    this.loadImage = loadImage;
}(this));