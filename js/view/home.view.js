var ViewHome = function( cfg ) {
	var self = this;

	this.cfg = $.extend({}, cfg);

	this.template = function( o ) {
		var html = '';

		html += 'template home';

		return html;
	};

	this.cacheElements = function() {
		
	};

	this.update = function( data ) {
		
	};

	this.render = function( data ) {
		
	};

	this.getHTML = function( data ) {
		return this.template( data );
	};
};