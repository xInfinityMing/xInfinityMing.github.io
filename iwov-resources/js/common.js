$(document).ready(function(){
    var scrollPyNavTop = $('#pd-scrollpy-nav') && $('#pd-scrollpy-nav').offset() && $('#pd-scrollpy-nav').offset().top;
    var prevScrollTop = 0;
    $(window).scroll(function(e){ 
        var documentTop = $(document).scrollTop();
        var offsetTop = $(window).scrollTop();
        var mastheadTop = $(".masthead ") && $(".masthead ").position() && $(".masthead ").position().top;
    
        if(offsetTop < prevScrollTop) {

            displayStickyMegaBar();
            // scroll up detail page scrollspy top auto
            $("#pd-scrollpy-nav") &&  $("#pd-scrollpy-nav").removeClass("top0");
            
            //to the page top
            if(offsetTop == 0) {
                hideStickyMegaBar();
            }

        } else {
            if(isHomePage()) {
                if(offsetTop >= mastheadTop) {
                    hideStickyMegaBar();
                    hideStickyBarWithAnimate();
                }
            } else {
                hideStickyMegaBar();
                hideStickyBarWithAnimate();
            }
            
            //scroll down detail page scrollspy top = 0
            $("#pd-scrollpy-nav") &&  $("#pd-scrollpy-nav").addClass("top0");
        }

        prevScrollTop = offsetTop;
        
        // scrollspy sticky
        if(documentTop > scrollPyNavTop) {
            displayScrollSpyStickyBar();
            removeHeaderShadow();
            tabUnderLine();
        } else {
            hideScrollSpyStickyBar();
            addHeaderShadow();
            // add default active when scrollspy display in page center
            $("#pd-scrollpy-nav ul").children("li:first-child").children(".nav-link").addClass("default-active");
            tabUnderLine();
        }  
    }); 
    //click nav
    $(".uob-scrollpy .nav-item").on('click', function() {
        $(".uob-scrollpy .nav-item").find('.nav-link').removeClass("default-active");
        // $(this).addClass('active');
        
        setTimeout(function() {
            tabUnderLine();
        }, 100)
    })

    //close notice bar
    $(".close-notice-bar").click(function(){
        $(this).closest(".notice-bar").addClass('d-none');
    })

    //scrollspy event 
    $(window).on('activate.bs.scrollspy', function (e, obj) {
        var _targetText = $("." + obj.relatedTarget.slice(1)).text();
        $("#pd-scrollpy-nav ul .nav-link").removeClass("default-active");
        $("#pd-anchor-link .dropdown-toggle-lable").text(_targetText);
        tabUnderLine();
        // help support detail page
        if($("hsd-page-body")) {
            var $first = $(".uob-item-scrollspy").find("#scrollspy-list").children('.list-group-item:first-child');
            if(obj.relatedTarget != $first.attr('href')) {
                $first.removeClass('default-active');
            } else {
                $first.addClass('default-active');
            }
            return;
        }
    })

    function isHomePage() {
        return $(".masthead ").length !== 0;
    }

    function tabUnderLine() {
        var underline = $("#tab-underline");
        var activePill = $("#pills-tab .default-active");
        if($("#pills-tab .active").length > 0) {
            activePill = $("#pills-tab .active");
        }
        var activeLeft = activePill && activePill.position() && activePill.position().left + 10;
        var activeWidth = activePill && activePill.width();

        if ($(window).width() >= 768) {
            underline.css({
                left: activeLeft,
                width: activeWidth,
                opacity: 1,
            });
        }
    }

    function removeHeaderShadow(){
        $("#pd-mega-menu .mega-menu-lg-container").removeClass("shadow");
        $(".lg-down-header .mega-menu-lg-down-container").removeClass("shadow");
    }

    function addHeaderShadow() {
        $("#pd-mega-menu .mega-menu-lg-container").addClass("shadow");
        $(".lg-down-header .mega-menu-lg-down-container").addClass("shadow");
    }

    function displayScrollSpyStickyBar() {
        $('#pd-scrollpy-nav').addClass('sticky-scrollpy-nav');
        $('#pd-scrollpy-nav ul.nav').removeClass("justify-content-center").addClass("justify-content-start");
    }

    function hideScrollSpyStickyBar() {
        $('#pd-scrollpy-nav').removeClass('sticky-scrollpy-nav');
        $('#pd-scrollpy-nav ul.nav').removeClass("justify-content-start").addClass("justify-content-center");
    }

    // show sticky bar login button at sticky bar
    function displayStickyMegaBar() {
        $(".header-mega-menu .mega-menu-lg-container").addClass('sticky-show');
        $(".lg-down-header .mega-menu-lg-down-container").addClass('sticky-show');
        $(".header .lg-navbar .login-button").removeClass("d-block").addClass("d-none");
        $(".header-mega-menu .login-button-sticky").removeClass("d-none").addClass("d-block");
        $(".sticky-navbar").removeClass("login-button-sticky-none").addClass("login-button-sticky-block");
        displayStickyBarWithAnimate();
        addTopAtCompareTable();
    }

    function addTopAtCompareTable() {
        var topHeight = 0
        if($(window).width() >= 992) {
            topHeight = $(".header-mega-menu .mega-menu-lg-container.sticky-show").outerHeight();
        } else {
            topHeight = $(".lg-down-header .mega-menu-lg-down-container.sticky-show").outerHeight();
        }

        $("#compare-compare-tables") && $("#compare-compare-tables").find(".table .table-header-title th") && $("#compare-compare-tables").find(".table .table-header-title th").css('top', topHeight);
    }

    function addTop0AtCompareTable() {
        $("#compare-compare-tables") && $("#compare-compare-tables").find(".table .table-header-title th") && $("#compare-compare-tables").find(".table .table-header-title th").css('top', 0);
    }

    function hideStickyBarWithAnimate() {
        $(".header-mega-menu .mega-menu-lg-container").addClass("hide-with-translate");
        $(".lg-down-header .mega-menu-lg-down-container").addClass("hide-with-translate");
    }

    function displayStickyBarWithAnimate() {
        $(".header-mega-menu .mega-menu-lg-container").removeClass("hide-with-translate");
        $(".lg-down-header .mega-menu-lg-down-container").removeClass("hide-with-translate");
    }

   //hide sticky bar and login button display in header
    function hideStickyMegaBar() {
        $(".header-mega-menu .mega-menu-lg-container").removeClass('sticky-show');
        $(".lg-down-header .mega-menu-lg-down-container").removeClass('sticky-show');
        $(".header .lg-navbar .login-button").removeClass("d-none").addClass("d-block");
        $(".header-mega-menu .login-button-sticky").removeClass("d-block").addClass("d-none");
        $(".sticky-navbar").removeClass("login-button-sticky-block").addClass("login-button-sticky-none");
        addTop0AtCompareTable();
    }
    //uob accordion toggle event
    $(".uob-accordion").find(".card .card-header .icon-toggle").click(function() {
        var $header = $(this).closest('.card-header');
        var $card = $(this).closest('.card-header').closest('.card');
        if($header.attr('aria-expanded') == 'false') {
            // open
            $header.addClass('border-grey');
            $card.removeClass('border-grey').addClass('border-bottom-0');
        } else {
            $header.removeClass('border-grey');
            $card.removeClass('border-bottom-0').addClass('border-grey');
        }
    })
    

})

