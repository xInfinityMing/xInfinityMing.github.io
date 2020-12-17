$(document).ready(function(){
    var _scrollTop = 0;
    // lg screen start   
    $(".megamenu-li").hover(function() {
        if($(this).hasClass('dropdown') && !$(this).hasClass('login-button')) {
            $(this).find(".megamenu").css({'transition': 'all 0.2s'});
            $(this).addClass('show').addClass('megamenu-li-active');
            $(this).find(".dropdown-toggle").attr('aria-expanded',true);
            $(this).find(".megamenu").addClass('show');
        }
    } , function () {
        if($(this).hasClass('dropdown') && !$(this).hasClass('login-button')) {
            // $(this).find(".megamenu").css({'transition': 'none'});
            $(this).removeClass('show').removeClass('megamenu-li-active');
            $(this).find(".dropdown-toggle").attr('aria-expanded',false);
            $(this).find(".megamenu").removeClass('show');
        }
    })
    $(".megamenu-li").click(function(e){
        var _target = $(e.target).attr('href');
        window.location.href = _target;
        return false;
    })


    
    //lg down screen start
    $(".lg-down-header .menu-open").click(function() {
        _scrollTop = $(window).scrollTop();
        hideMain();
        $(".lg-down-mega-menu").addClass("show");
        $(".lg-down-mega-menu #collapsibleNavbar").addClass("d-flex flex-column");
        $(window).scrollTop(0);
    })

    $(".lg-down-header .menu-close").click(function(){
        showMain();
        setTimeout(function(){
            $(".lg-down-mega-menu").removeClass("show");
            $(".lg-down-mega-menu #collapsibleNavbar").removeClass("d-flex flex-column");
            $(window).scrollTop(_scrollTop);
        }, 100)
    })

    $(".lg-down-header .login-item").click(function() {
        hideMegaMenu();
    })

    // Search 
    $(".uob-search-box").on('input',function() {
        if($(this).val().length > 0) {
            $("#uob-search-box").siblings(".icon-close").show();
            $(".uob-search-suggest-content").removeClass('d-none').addClass('d-block');
            $(".search-trigger-btn").removeClass('d-none').addClass('d-block');
            $(".uob-search-popular-content").removeClass('d-block').addClass('d-none');
        } else {
            $("#uob-search-box").siblings(".icon-close").hide();
            $(".uob-search-suggest-content").removeClass('d-block').addClass('d-none');
            $(".search-trigger-btn").removeClass('d-block').addClass('d-none');
            $(".uob-search-popular-content").removeClass('d-none').addClass('d-block');
        }
    })

     // clear search
     $("#uob-search-box").siblings(".icon-close").click(function(){
        $("#uob-search-box").val("");
        $(this).hide();
    })

    $(".lg-down-header .search-item").click(function() {
        hideMegaMenu();
    })

    $(".lg-down-mega-menu .collapse-block .collapse-title").click(function() {
        if($(this).attr('aria-expanded') === 'true') {
            //collapse
            $(this).closest('.collapse-block').removeClass('show');
        } else {
            //open
            $(this).closest('.collapse-block').addClass('show');
        }
    })

    function hideMegaMenu() {
        $(".lg-down-mega-menu").removeClass("show");
        $(".lg-down-mega-menu #collapsibleNavbar").removeClass("show");
        $(".lg-down-header .navbar-toggler").attr("aria-expanded",false);
        $(".lg-down-header .navbar-toggler").addClass("collapsed")
    }

    function hideMain() {
        $("#main").hide();
        $(".page-footer").hide();
    }

    function showMain() {
        $("#main").show();
        $(".page-footer").show();
    }

    //masthead click
    $(".masthead .select-selected").on('click', function(e) {
        e.stopPropagation();
        if($(".masthead .select-items").hasClass("select-hide")) {
            continueAnimation();
        } else {
            $(".masthead .select-selected-fake").removeClass("opacity-1").addClass("opacity-0");
            $(".masthead .select-selected").removeClass("opacity-0").addClass("opacity-1");
        }
    })

    $(".masthead .select-items").on('click', 'div', function(e) {
        e.stopPropagation();
        $(".masthead .overlay").addClass("overlay-darker");
        $(".masthead .select-selected-fake").removeClass("opacity-1").addClass("opacity-0");
        $(".masthead .select-selected").removeClass("opacity-0").addClass("opacity-1");
        $(".masthead .go-btn").removeClass('d-none').addClass("d-block");
    })

    $(".masthead .overlay").click(function() {
        if(!$(".masthead .select-items").hasClass("select-hide")) {
            continueAnimation();
        }
    })

    //masthead trigger button click

    $(".masthead .go-btn").click(function(){
        var _href = $(".masthead .custom-select .select-items").find(".same-as-selected").attr("data-href");
        window.location.href = _href || "#";
    })
    
    function continueAnimation() {
        if($(".masthead .select-items").find("div.same-as-selected").length < 1) {
            $(".masthead .select-selected-fake").removeClass("opacity-0").addClass("opacity-1");
            $(".masthead .select-selected").removeClass("opacity-1").addClass("opacity-0");
        }
    }

    //life stage advice
    $(".content-left-item").hover(function(){
        var _index = $(this).index();
        $(".content-left-item").removeClass("active");
        $(".content-item-block").removeClass("active");
        $(this).addClass("active");      
        $(".content-block-right .content-item-block").eq(_index).addClass("active");
        resetContentBlockMinHeight();
    })

    $(".life-stage .select-items").on('click', 'div', function() {
        var _index = $(this).index();
        $(".content-item-block").removeClass("active");
        $(".content-block-right .content-item-block").eq(_index).addClass("active");
    })

    $( window ).resize(function() {
        if(window.innerWidth >= 780) {
            resetContentBlockMinHeight();
        }
        
    })

    function resetContentBlockMinHeight() {
        var _height = $(".life-stage .content-item-block.active").height();
        $(".life-stage .content-block").css('minHeight', _height);
    }

   
})
