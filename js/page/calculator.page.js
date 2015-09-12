(function() {

	var formHandler = new (function( $el ){
		var self = this;
		
		this.el = {};
		
		this.currency = '';
		
		this.flags = {
			validateOnTheFly: false
		};
		
		this.validate = function() {
			var error = false;
			
			if (isNaN( this.el.$distance.val() )) 
				error = true;
			
		};
		
		this.calc = function() {
			var distance 	= this.el.$distance.val(),
				consumption = this.el.$consumption.val(),
				fuelPrice 	= this.el.$fuelPrice.val();
			
			literPerKm 	= consumption / 100;
			fuelNeeded 	= literPerKm * distance;
			tripPrice 	= (fuelNeeded * fuelPrice).toFixed(1);
			
			this.el.$tripPrice.html(  tripPrice +' '+ this.currency );
		};
		
		this.validate = function() {
			return psdevValidate.run([
				{
					name:		'distance',
					method:		'required',
					$errorEl:	this.el.$distance.parent().find( '.g-error' ),
					data:		this.el.$distance.val(),
					errorText: 'Дистанция: заполните поле'
				},{
					name:		'distance',
					method:		'number',
					$errorEl:	this.el.$distance.parent().find( '.g-error' ),
					data:		this.el.$distance.val(),
					errorText: 'Дистанция: значение должно быть числом'
				},{
					name:		'consumption',
					method:		'required',
					$errorEl:	this.el.$consumption.parent().find( '.g-error' ),
					data:		this.el.$consumption.val(),
					errorText: 'Расход: заполните поле'
				},{
					name:		'consumption',
					method:		'number',
					$errorEl:	this.el.$consumption.parent().find( '.g-error' ),
					data:		this.el.$consumption.val(),
					errorText: 'Расход: значение должно быть числом'
				},{
					name:		'fuelPrice',
					method:		'required',
					$errorEl:	this.el.$fuelPrice.parent().find( '.g-error' ),
					data:		this.el.$fuelPrice.val(),
					errorText: 'Цена: заполните поле'
				},{
					name:		'fuelPrice',
					method:		'number',
					$errorEl:	this.el.$fuelPrice.parent().find( '.g-error' ),
					data:		this.el.$fuelPrice.val(),
					errorText: 'Цена: значение должно быть числом'
				},
			]);
		};
		
		this.handleSubmit = function() {
			var v = this.validate();
			
			if (v.success) {
				var distance 	= this.el.$distance.val().replace(',', '.'),
					consumption = this.el.$consumption.val().replace(',', '.'),
					fuelPrice 	= this.el.$fuelPrice.val().replace(',', '.'),
					literPerKm 	= consumption / 100,
					fuelNeeded 	= literPerKm * distance,
					tripPrice 	= (fuelNeeded * fuelPrice).toFixed(2);
				
				this.el.$tripPrice.html( tripPrice +' '+ this.currency );
			}
			
			this.flags.validateOnTheFly = true;
		};

		this.cacheElements = function( $el ) {
			this.el.$form 			= $el;
		
			this.el.$distance 		= this.el.$form.find( '[name="distance"]' );
			this.el.$consumption 	= this.el.$form.find( '[name="consumption"]' );
			this.el.$fuelPrice 		= this.el.$form.find( '[name="price"]' );
			
			this.el.$tripPrice 		= this.el.$form.find( '.result' );
			this.el.$btnCalc 		= this.el.$form.find( '.btn-calc' );
		};
		
		this.init = function( $el ) {
			this.cacheElements( $el );

			var $inputs = $([]);
			
			$inputs = $inputs.add( this.el.$distance );
			$inputs = $inputs.add( this.el.$consumption );
			$inputs = $inputs.add( this.el.$fuelPrice );
			
			$inputs.on( 'input', function() {
				if (self.flags.validateOnTheFly)
					self.handleSubmit();
			});

			$inputs.on( 'keypress', function(e) {
				var code = (e.keyCode ? e.keyCode : e.which);

				if (code == 13) {
					e.preventDefault();
				}
			});

			
			this.el.$btnCalc.on( 'click', this.handleSubmit.bind(this) );
		};
	});

	app.page.calculator = new Page({
		el: {},
		view: null,

		// Methods
		onShow: function( e ) {
			this.el.$page.addClass( 'active' );
		},
		onHide: function() {
			this.el.$page.removeClass( 'active' );
		},

		render: function( data ) {
			//this.view.render( data.streams );
		},

		cacheElements: function() {
			this.el.$page = $( '#page-calculator' );
		},

		init: function() {
			this.view = new ViewCalculator({
				$page: $( '#page-calculator' )
			});

			this.cacheElements();

			formHandler.init( this.el.$page );

			this.el.$page.find( 'form' ).on( 'submit', function(e) {
				alert('yo');
				e.preventDefault();
				return false;
			});

			this.el.$page.find( 'input' ).on( 'submit', function(e) {
				e.preventDefault();
				return false;
			});
		}
	});

})();