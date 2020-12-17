$(document).ready(function(){
    initCarousel($(".helpful-tips-guides"));
    // Search 
    $("#inpage-search-box").on('input',function() {
        if($(this).val().length > 0) {
            $("#inpage-search-box").siblings(".icon-close").show();
            $(".search-result-block").removeClass("d-none").addClass("d-block");
        } else {
            $("#inpage-search-box").siblings(".icon-close").hide();
            $(".search-result-block").removeClass("d-block").addClass("d-none");
        }
    })

    // clear search
    $("#inpage-search-box").siblings(".icon-close").click(function(){
        $("#inpage-search-box").val("");
        $(this).hide();
        $(".search-result-block").removeClass("d-block").addClass("d-none");
    })
    // load next 3 results
    $(".search-result .load-more button").click(function() {
        $(".search-result .card-col").removeClass("d-none");
    })


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