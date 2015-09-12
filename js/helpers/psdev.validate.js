/*
	var validate = psdevValidate.run([
		{
			name: 'validation01',
			method: 'empty',
			$errorEl: $(..),
			data: $(..).val(),
			errorText: 'Это поле не может быть пустым'
		},
		{
			name: 'validation02',
			method: function( o ) {
				// моя функция валидации
				o.success = true / false;
				
				return o;
			},
			$errorEl: $(..),
			data: $(..).val(),
			errorText: 'Какой-то текст ошибки'
		}
	]);
*/
var psdevValidate = { 
	lib: {
		email: function( o ) {
			if (o.data == '') {
				o.success = true;
			} else {
				var checkEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

				o.success = checkEmail.test( o.data )

				if (!o.hasOwnProperty( 'errorText' ))
					o.errorText = 'Введите правильный email';
			}
			
			return o;
		},
		required: function( o ) {
			o.success = (o.data !== '');
			
			if (!o.hasOwnProperty( 'errorText' ))
				o.errorText = 'Это поле не может быть пустым';

			return o;
		},
		number: function( o ) {
			if (o.data == '') {
				o.success = true;
			} else {
				o.data = o.data.replace(',', '.');
				o.success = (! isNaN(o.data));
			
				if (!o.hasOwnProperty( 'errorText' ))
					o.errorText = 'Введите число';
			}

			return o;
		}
	},
	getItemsByName: function( arr, name ) {
		var r = [];
		
		for (var i=0; i < arr.length; i++) {
			if (arr[i].name === name) r.push( arr[i] );
		}
		
		return r;
	},
	run: function( arr ) {
		var r = {
				success: true,
				data: []
			},
			items = {},
			data,
			method;

		// Validate
		for (var i=0; i < arr.length; i++) {
			method = arr[i].method;

			if (typeof method === 'function') {
				data = method( arr[i] );
			} else {
				if (this.lib.hasOwnProperty( arr[i].method )) 
					data = this.lib[ arr[i].method ]( arr[i] );
				else
					console.log( 'psdevValidate', '[ERROR] Validation method "'+ arr[i].method +'" does not exist.', arr[i] );
			}
				
			if (items.hasOwnProperty( arr[i].name )) {
				if (data.success == false)
					items[ arr[i].name ] = false;
			} else {
				items[ arr[i].name ] = data.success;
			}

			if (! data.success) r.success = false;

			r.data.push( data );
		}
		
		// Show errors
		var iArr, iErr;
		for (var name in items) {
			iArr = this.getItemsByName( r.data, name );

			// Success, hide errors for current name
			if (items[ name ] === true) {
				for (var i=0; i < iArr.length; i++) {
					if (iArr[i].hasOwnProperty( '$errorEl' )) {
						iArr[i].$errorEl.html( '' ).removeClass( 'active' );
					}
				}
			// Error
			} else {

				for (var i=0, elHasErrorText = false; i < iArr.length; i++) {
					if (iArr[i].success == false) {
						iArr[i].$errorEl.html( iArr[i].errorText ).addClass( 'active' );
						elHasErrorText = true;
						
						if (iArr[i].hasOwnProperty( 'scrollToError' ) && iArr[i].scrollToError == true) {
							var scroll = { $el: iArr[i].$errorEl, time: 800 };
							
							if (iArr[i].hasOwnProperty( 'scrollOffset' ))
								scroll.offset = iArr[i].scrollOffset;
								
							wScrollTo( scroll );
						}
					} else {
						if (! elHasErrorText)
							iArr[i].$errorEl.html( '' ).removeClass( 'active' );
					}
				}
				
				/* DELETE
				iErr = iArr.filter(function( el ) {
					return el.success === false;
				});
				
				console.log( 'ierr', iErr );
				
				// Show error for current name (first el)
				if ((iErr[0].hasOwnProperty( '$errorEl' ) && iErr[0].hasOwnProperty( 'errorText' )))
					iErr[0].$errorEl.html( iErr[0].errorText ).addClass( 'active' );
					
				// Hide errors for other elements with same name
				if (iErr.length > 1) {
					for (var i=1; i < iErr.length; i++) {
						iErr[i].$errorEl.html( '' ).removeClass( 'active' );
					}
				}
				*/
			}
		}

		return r;
	}
};