$(document).ready(function(){

    initCarousel($(".apply-now"), '.tile-card-slide-large');
    initCarousel($(".apply-now"), '.tile-card-slide-small');
    initCarousel($(".check-more-deals"), '.tile-card-slide');

    carouselNormalization($(".apply-now .tile-card-slide-large"));
    carouselNormalization($(".apply-now .tile-card-slide-small"));
    carouselNormalization($(".check-more-deals .tile-card-slide"));
    
    function initCarousel($element, className) {
            // slide carousel 
            // - 2 becasue i add a empty carousel-item at the last for the last item style
            var carouselLength = $element.find(className + ' .carousel-item').length - 2;
            // If there is more than one item
            if (carouselLength) {
                $element.find(className + ' .carousel-control-next').removeClass('invisible');
            }

            $element.find(className + ' .carousel').carousel({
                interval: false,
                wrap: false
            }).on('slide.bs.carousel', function (e) {
                // First one
                if (e.to == 0) {
                    $element.find('.carousel-control-prev').addClass('invisible');
                    $element.find('.carousel-control-next').removeClass('invisible');
                } // Last one
                else if (e.to == carouselLength) {
                    $element.find('.carousel-control-prev').removeClass('invisible');
                    $element.find('.carousel-control-next').addClass('invisible');
                } // The rest
                else {
                    $element.find('.carousel-control-prev').removeClass('invisible');
                    $element.find('.carousel-control-next').removeClass('invisible');
                }
            });
    }

    function carouselNormalization($element) {
        var items = $element.find(".carousel-inner .carousel-item"), //grab all slides
          heights = [], //create empty array to store height values
          tallest; //create variable to make note of the tallest slide
      
        if (items.length) {
          function normalizeHeights() {
            items.each(function() { //add heights to array
              heights.push($(this).height());
            });
            tallest = Math.max.apply(null, heights); //cache largest value
            items.each(function() {
              $(this).css('min-height', tallest + 'px');
            });
          };
          normalizeHeights();
      
          $(window).on('resize orientationchange', function() {
            tallest = 0, heights.length = 0; //reset vars
            items.each(function() {
              $(this).css('min-height', '0'); //reset min-height
            });
            normalizeHeights(); //run it again 
          });
        }
      }

})
