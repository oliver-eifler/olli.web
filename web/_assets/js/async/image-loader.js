/**
 * Created by darkwolf on 26.03.2016.
 */
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
                }
            }
    };
    this.loadImage = loadImage;
}(this));