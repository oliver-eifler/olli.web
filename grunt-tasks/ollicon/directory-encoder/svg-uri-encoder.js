/*global require:true*/
/*global module:true*/
(function(){
	"use strict";

	var fs = require( 'fs' );
	var DataURIEncoder = require( './data-uri-encoder' );
	var SVGO = require('svgo'),
		svgo = new SVGO({plugins:[{removeDimensions:true},{removeMetadata:true},{removeComments:true},{removeUselessStrokeAndFill: false}]});

	function SvgURIEncoder(path) {
		DataURIEncoder.call( this, path );
	}

	SvgURIEncoder.prefix = "data:image/svg+xml;charset=US-ASCII,";

	SvgURIEncoder.prototype.stats = function(){
		var data  = DataURIEncoder.prototype.stats.call( this );
		data.svg = true;
		return data;
	};

	SvgURIEncoder.prototype.encode = function() {
		var fileData = fs.readFileSync( this.path),svg = "";
		svgo.optimize(fileData.toString('utf-8'),function(result) {
			svg = result.data;
		});
		return SvgURIEncoder.prefix + encodeURIComponent(svg
				//fileData.toString('utf-8')
				//strip newlines and tabs
						//.replace( /[\n\r]/gmi, "" )
						//.replace( /\t/gmi, " " )
						//strip comments
						//.replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "")
						//replace
						.replace(/'/gmi, "\\i") )
				//encode brackets
						.replace(/\(/g, "%28").replace(/\)/g, "%29");
	};

	module.exports = SvgURIEncoder;
}());
