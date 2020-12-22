function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}
function rebate_calc() {
    item_p = $('#item-petrol').val();
    item_p = parseFloat(item_p) || 0;
    item_g = $('#item-groceries').val();
    item_g = parseFloat(item_g) || 0;
    item_d = $('#item-dining').val();
    item_d = parseFloat(item_d) || 0;
    item_r = $('#item-bill-payment').val();
    item_r = parseFloat(item_r) || 0;
    item_o = $('#item-other-spend').val();
    item_o = parseFloat(item_o) || 0;

    total = item_p + item_g + item_d + item_r + item_o;

    if (total >= 2000) {
        rebate = 1200;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else if (total >= 1000) {
        rebate = 400;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else if (total >= 500) {
        rebate = 200;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else {
        rebate = 0;
        interest = '';
    }

    $('#total-spend').html('S$' + commaSeparateNumber(total));
    $('#cash-rebate').html('S$' + commaSeparateNumber(rebate));
    $('#interest').html(interest);
}
$(document).ready(function(){
    var underline = $("#tab-underline");
    var activePill = $("#pills-tab .default-active");
    if($("#pills-tab .active").length > 0) {
        activePill = $("#pills-tab .active");
    }
	var activeLeft = activePill && activePill.position() && activePill.position().left + 10;
	var activeWidth = activePill && activePill.width();

	initCarousel($(".bank-beyond-save"));

	if ($(window).width() >= 768) {
		underline.css({
			left: activeLeft,
			width: activeWidth,
			opacity: 1,
		});
  }
  
  setTimeout(function() {
    if($('#uob-calculator-tab').length > 0) {
      var calculatorUnderline = $("#uob-calculator-tab");
      var activeCalculator = $(".uob-calculator-cont .nav-link.active");
      var activeCalculatorLeft = activeCalculator && activeCalculator.position() && activeCalculator.position().left + 15;
      var activeCalculatorWidth = activeCalculator && activeCalculator.width();
      calculatorUnderline.css({
        left: activeCalculatorLeft,
        width: activeCalculatorWidth,
        opacity: 1,
      });
      $(".uob-calculator-cont .nav-item").hover(
        function () {
          calculatorUnderline.css({
            left: $(this).find(".nav-link").position().left + 15,
            width: $(this).find(".nav-link").width(),
          });
        },
        function () {
          var _activeCalculator = $(".uob-calculator-cont .nav-link.active");
    
          if (!$(this).find(".active").length) {
            calculatorUnderline.css({
              left: _activeCalculator && _activeCalculator.position && _activeCalculator.position().left + 15,
              width: _activeCalculator && _activeCalculator.width(),
            });
          }
        }
      );
    }
  },300)

	// lg screen start
	$("#pills-tab li.nav-item").hover(
		function () {
			if ($(window).width() >= 768) {
				underline.css({
					left: $(this).position().left + 10,
					width: $(this).find(".nav-link").width(),
				});
			}
		},
		function () {
            var _pillActive = $("#pills-tab .default-active");

            if($("#pills-tab .active").length > 0) {
                _pillActive = $("#pills-tab .active")
            }

			if ($(window).width() >= 768) {
				if (!$(this).find(".active").length) {
					underline.css({
						left: _pillActive && _pillActive.position && _pillActive.position().left + 10,
						width: _pillActive && _pillActive.width(),
					});
				}
			}
		}
	);


	function initCarousel($element) {
        // slide carousel 
        // - 2 becasue i add a empty carousel-item at the last for the last item style
        var carouselLength = $element.find('.tile-card-slide .carousel-item').length - 2;
        // If there is more than one item
        if (carouselLength) {
            $element.find('.tile-card-slide .carousel-control-next').removeClass('d-none');
        }

        $element.find('.tile-card-slide .carousel').carousel({
            interval: false,
            wrap: false
        }).on('slide.bs.carousel', function (e) {
            // First one
            if (e.to == 0) {
                $element.find('.carousel-control-prev').addClass('d-none');
                $element.find('.carousel-control-next').removeClass('d-none');
            } // Last one
            else if (e.to == carouselLength) {
                $element.find('.carousel-control-prev').removeClass('d-none');
                $element.find('.carousel-control-next').addClass('d-none');
            } // The rest
            else {
                $element.find('.carousel-control-prev').removeClass('d-none');
                $element.find('.carousel-control-next').removeClass('d-none');
            }
        });
   }

   $('#calculate-btn').on('click', function (e) {
        var el = $(this),
            recalText = el.data('retext'),
            curText = el.text(),
            totalPart = $('#calculate-cash-rebate .total'),
            display = $('#calculate-cash-rebate .total').css('display');

        e.preventDefault();

        if (display == 'inline-block' || display == 'block') {
            totalPart.slideUp();
            $(".item-input").prop('disabled', false);
        } else {
            totalPart.slideDown();
            $(".item-input").prop('disabled', true);
        }
        el.text(recalText).attr('title', recalText);
        el.data('retext', curText);

        rebate_calc();
    });
})