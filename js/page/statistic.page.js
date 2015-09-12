(function() {
	app.page.statistic = new Page({
		view: null,

		el: {},

		// Methods
		onShow: function( e ) {
			this.el.$page.addClass( 'active' );
		},
		onHide: function() {
			this.el.$page.removeClass( 'active' );
		},

		cacheElements: function() {
			this.el.$page = $( '#page-statistic' );
		},

		init: function() {
			var self = this;

			//this.view = new ViewStatistic({
			//	$page: $( '#page-statistic' )
			//});

			this.cacheElements();
		}
	});

})();
