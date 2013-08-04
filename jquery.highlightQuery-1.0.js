;(function($) {
	jQuery.fn.highlightQuery = function(arg) {
		var options = $.extend(
			{},
			$.fn.highlightQuery.defaults,
			arg
		);
		
		return this.each(function() {
			// determine referrer
			var referrer = document.referrer || "http://www.google.de/?q=venenatis vestibulum";
			// extract query string
			var query = referrer.substring(referrer.indexOf("?")+1);
			// split arguments
			var args = query.split("&");
			// init container for parsed arguments
			var parsedArgs = {};
			// iterate over arguments and split name and value
			for (i in args) {
				var b = args[i].split("=");
				parsedArgs[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
			}
			// get "q" value (google and co. use this GET parameter for search)
			var needle = parsedArgs["q"];

			// check whether to split search string and highlight each result seperately
			if (options.split) {
				needle = needle.split(" ");
			} else {
				needle = new Array(needle);
			}


			for (n in needle) {
				console.log(needle[n]);
				// wrap occurences with unobstrusive span element
				var $thisText = $(this).html();
				var needleRegExp = new RegExp("\\b(" + needle[n] + ")", "g");
				$(this).html($thisText.replace(needleRegExp, '<span class="highlightQuery">$1</span>'));
			}

		});
	};
	
	$.fn.highlightQuery.defaults ={
		split: false, // should search string be splitted?
	};
})(jQuery);