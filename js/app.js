$(function() {
	app.currentPage = 'calculator';

	// Methods
	app.setPage = function( name, data ) {
		this.currentPage = name;

		for (var key in this.page) {
			if (key !== name) 
				this.page[ key ].hide();
		}

		this.page[ name ].show( data );
	};

	app.initRouter = function() {
		$(document).on( 'click', '.js-app-link', function() {
			var target = $(this).attr( 'data-target' );

			app.setPage( target );
		});
	};

	app.initWidgets = function() {
		if (! this.hasOwnProperty( 'widget' )) return;

		for (var key in this.widget) {
			if (this.widget[ key ].hasOwnProperty( 'init' ))
				this.widget[ key ].init();
		}
	};

	app.init = function() {
		this.initWidgets();
		this.initRouter();

		this.setPage( this.currentPage );
	};

	app.init();
});