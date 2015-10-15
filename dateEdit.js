/**
 * 年月日を表示させる。(日本語専用)
 * Created by uu083597 on 15/10/15.
 */
(function() {
	dateEdit = function(options) {
		this.options = options || null;

		for(var i=0; i < this.options.length; i++) {
			if(this.valid(this.options[i])) {
				this.execute(this.options[i]);
			}
		}
	},
	dateEdit.prototype = {
		valid : function(params) {
			if(params.format == 'undefined') {
				return false;
			}

			if(params.element == 'undefined') {
				return false;
			}
			return true;
		},
		execute : function(params) {
			switch (params.format) {
				case 'Y' :
					this.y(params.element, params.isFocus);
					break;
				case 'M' :
					this.m(params.element, params.isFocus);
					break;
				case 'D' :
					this.d(params.element, params.isFocus);
					break;
				default :
					break;
			}
		},

		y : function(element, isFocus) {
			var val = element.val();
			if(val) {
				if (isFocus) {
					var parse = parseInt(val);
					if(parse) {
						element.val(parse);
					}
				} else {
					if(jQuery.isNumeric(val)) {
						element.val(val + '年');
					}
				}
			}
		},

		// 未実装なので使いそうな時に実装して下さい。
		m : function(element, isFocus) {

		},

		// 未実装なので使いそうな時に実装して下さい。
		d : function(element, isFocus) {

		}
	};

	return dateEdit;
})();

/**
 *
 * new dateEdit(
 *  [
 * 		{format : 'Y', element : $('#entryReminderTimeY')},
 * 	 	{format : 'm', element : $('#entryReminderTimeM')},
 *  ]
 * );
 */
