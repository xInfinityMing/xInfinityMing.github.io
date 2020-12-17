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
})