
!function($) {
	function TableToggle($container) {
		this.init($container);
	}

	TableToggle.prototype = {

		row: 0,
		maxed: false,

		_createColumn: function() {

			if (this.$clone) {
				this.$clone.remove();
			}

			this.$table = this.$container.find('table'),
			this.$clone = this.$table.clone();
			
			this.$clone.addClass('table-floater');
			this.$clone.width(this.$table.find('thead th:first').outerWidth());
			var _that  = this;
			this.$table.find('tr').each(function(i,$tr){
				var _td = "td";
				if($($tr).find("th").length > 0) {
					_td = "th";
				}

				var tdWidth = $($tr).find(_td + ":first").outerWidth();
				var tdHeight = $($tr).find(_td + ":first").outerHeight();
 
				_that.$clone.find('tr').each(function(j,$tr1) {
					if(i == j) {
						var _tdStr = "td";

						if($($tr1).find("th").length > 0) {
							_tdStr = "th";
						}
						
						$($tr1).find(_tdStr).width(tdWidth);
						$($tr1).find(_tdStr).height(tdHeight);
						
					}
				})
			})

			this.$clone.find('thead tr').each(function() {
				$(this).find('th:not(:first)').remove();
			});

			this.$clone.find('tbody tr').each(function() {
				$(this).find('td:not(:first)').remove();
			});

			this.$table.css({ left: 0 });
			this.$clone.css({ left: 0 });

			this.$wrapper.append(this.$clone);
		},

		_createIndicators: function () {
			this.$controls.find("ul li.indicator").remove();
			var indicatorCount = this._getIndicatorCount();
			if (indicatorCount > 1) {
				var _appendIndicator = "";
				for (var i = 0; i < indicatorCount; i++) {
					var indicatorLi = "<li class='indicator rounded-circle'></li>";
					if (i == 0) {
						indicatorLi = "<li class='indicator rounded-circle active'></li>";
					}
					_appendIndicator += indicatorLi;
				}
				this.$controls.find("ul li").eq(0).after(_appendIndicator);
			}
		},

		_getIndicatorCount: function() {
			var _rowCount = this._rowcount();
			var indicatorNum = 0;
			var _columnWidth = this.$table.find('thead th').width();
			if(this.$table.width() > this.$wrapper.width()) {
				indicatorNum = _rowCount - Math.floor(this.$wrapper.width() / _columnWidth) + 2;
			} 
			return indicatorNum;
		},

		_rowcount: function() {
			return this.$table.find('thead th').length - 1;
		},

		_adjust: function(l) {

			var w = this.$wrapper.width(),
				mw = this.$table.width();

			if (l + w > mw) {
				this.maxed = true;
				return mw - w;
			}
			this.maxed = false;
			return l;
		},

		_step: function(step) {

			if (step == -1 && this.row == 1) return;
			if (step ==  1 && (this.row == this._rowcount() || this.maxed)) return;

			var $rows = this.$table.find('thead th'),
				r = this.row + step,
				w = 0;

			if (r > 1) {

				$rows.each(function(i) {

					if (i == 0) return;
					if (i == 1) w -= 1;	//border
					if (i < r) {
						w += $(this).outerWidth();
					}
				});
			}

			this.$controls.find("ul li.indicator").removeClass("active");
			this.$controls.find("ul li.indicator").eq(r - 1).addClass('active');

			var indicatorNum = this.$controls.find("ul li.indicator").length;

			var first = this.$controls.find("ul li.indicator").eq(0).hasClass("active");
			var last = this.$controls.find("ul li.indicator").eq(indicatorNum - 1).hasClass("active");
			
			this.$controls.find("ul .carousel-control-prev-icon").removeClass("invisible").addClass("visible");
			this.$controls.find("ul .carousel-control-next-icon").removeClass("invisible").addClass("visible");
			this.$controls.find(".trigger-btn").removeClass("invisible").addClass("visible");

			if(first) {
				this.$controls.find("ul .carousel-control-prev-icon").removeClass("visible").addClass("invisible");
			}

			if(last) {
				this.$controls.find("ul .carousel-control-next-icon").removeClass("visible").addClass("invisible");
				this.$controls.find(".trigger-btn").removeClass("visible").addClass("invisible");
			}
			
			
			this.row = r;
			w = this._adjust(w);

			var l = parseInt(this.$table.css('left')) || 0,
				z = w * -1;

			if (z == l) {
				return this._step(step);
			}
			this.$clone.toggleClass('overflow', this.row > 1);
			this.$wrapper.toggleClass('overflow', !this.maxed);
			this.$table.css('left', w * -1);
		},

		_getPageStep: function(reverse) {

			var $rows = this.$table.find('thead th'),
				width = this.$wrapper.width(),
				steps = 0, w = 0;

			if (reverse === true) {
				for(var i = this.row; i > 0; i--) {
					if (w <= width) {
						w += $($rows[i]).outerWidth();
						steps++;
					}
				}
				return (steps - 1) * -1;
			}

			for (var i = 0, l = $rows.length; i < l; i++) {
				if (i >= this.row) {
					w += $($rows[i]).outerWidth();
					if (w <= width) steps++;
				}
			}
			return steps - 1;
		},

		_page: function(dir) {

			if (dir == -2 && this.row == 1) return;
			if (dir ==  2 && (this.row == this._rowcount() || this.maxed)) return;

			
			var steps = this._getPageStep(dir == -2);

			this.row += steps;
			this._step(0);
		},

		init: function($container) {
			var me = this;

			this.$container = $($container);
			this.$wrapper = this.$container.find('.table-toggle-container');
			this.$controls = this.$container.find('.table-toggle-controls');

			this.row = 1;
			setTimeout(() => {
				me.build();
				me._createIndicators();
				me.bind();
			}, 500);
		},

		build: function() {

			this._createColumn();
			
			if (this.$table.width() > this.$wrapper.width() && this._getIndicatorCount() > 1) {
				this.$wrapper.addClass('overflow');
				this.$controls.show();
				// init trigger btn
				this.$controls.find(".trigger-btn").css({width: this.$table.height()});
				// hide left arrow
				this.$controls.find("ul .carousel-control-prev-icon").addClass("invisible");
			}

			else {
				this.$controls.hide();
			}
		},

		update: function() {

			this.row = 1;
			this.build();
		},

		bind: function() {

			var me = this;

			this.$controls.on('click.table-toggle', 'a', function(e) {
				e.preventDefault();
				me.move($(this).attr('data-moveto'));
			});

			var t;

			$(window).on('resize.table-toggle', function() {
				if (t) {
					clearTimeout(t);
					t = null;
				}
				t = setTimeout(function() { me._createIndicators(); me.build(); }, 500);
			});
		},

		move: function(dir) {

			var d = parseInt(dir) || 0;

			switch(d) {

				case -2:
				case  2: 
					this._page(d);
					break;

				case -1:
				case  1:
					this._step(d);
					break;
			}
		}
	};
  
  $.FED = $.FED || {};
  $.FED.TableToggle = TableToggle;

	$.fn.tabletoggle = function() {

		return this.each(function() {
			var $el = $(this);

			$el.data('table-toggle', 
				$el.data('table-toggle') || new TableToggle(this));
		});
	};

	$(function() {
		$('.table-toggle').tabletoggle();
	});

}(window.jQuery);