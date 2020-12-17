$(document).ready(function(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    initCarousel($(".helpful-tips-guides"));

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