import {doc} from '../globals.js';

	var selectorPlaceholder = "grunticon:";

	// get the SVG link
	// this function can rip the svg markup from the css so we can embed it anywhere
	export function getIcons(stylesheet){
		// get grunticon stylesheet by its href
		var icons = {},
			svgss,
			rules, cssText,
			iconClass, iconSVGEncoded, iconSVGRaw;
		svgss = stylesheet.sheet;

		if( !svgss ){ return icons; }

		rules = svgss.cssRules ? svgss.cssRules : svgss.rules;
		if( !rules ){ return icons; }

		for( var i = 0; i < rules.length; i++ ){
			cssText = rules[ i ].cssText;
			iconClass = selectorPlaceholder + rules[ i ].selectorText;
			iconSVGEncoded = cssText.split( ");" )[ 0 ].match( /US\-ASCII\,([^"']+)/ );
			if( iconSVGEncoded && iconSVGEncoded[ 1 ] ){
				iconSVGRaw = decodeURIComponent( iconSVGEncoded[ 1 ] );
				icons[ iconClass ] = iconSVGRaw;

			}
		}
		return icons;
	};

	// embed an icon of a particular name ("icon-foo") in all elements with that icon class
	// and remove its background image
	export function embedIcons(icons){
		var selectedElems, filteredElems, embedAttr, selector;

		// attr to specify svg embedding
		embedAttr = "data-icon-embed";

		for( var iconName in icons ){
			selector = iconName.slice(selectorPlaceholder.length);

			try {
				// get ALL of the elements matching the selector
				selectedElems = doc.querySelectorAll( selector );
			} catch (er) {
				// continue further with embeds even though it failed for this icon
				continue;
			}


			filteredElems = [];

			// keep only those elements with the embed attribute
			for( var i = 0; i < selectedElems.length; i++ ){
				if( selectedElems[i].getAttribute( embedAttr ) !== null ){
					filteredElems.push(selectedElems[i]);
				}
			}

			// continue if there are no elements left after filtering
			if( !filteredElems.length ){ continue; }

			// for all the elements matching the selector with the embed attribute
			// take the svg markup and embed it into the selected elements
			for( i = 0; i < filteredElems.length; i++ ){
				filteredElems[ i ].innerHTML = icons[ iconName ];
				filteredElems[ i ].style.backgroundImage = "none";
				filteredElems[ i ].removeAttribute( embedAttr );
				/* Make Users with deactivated styles happy and hide svg icons*/
				var svg=filteredElems[i].firstChild;
				if (svg.viewBox) {
					//var box = svg.viewBox.baseVal || {width:0};
					//svg.setAttribute("width", ""+(box.width)+"");
					svg.setAttribute("width", "0");
				}
			}
		}

		return filteredElems;
	};

