$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accordionName = urlParams.get('year')

    if(accordionName) {
        $('#' + accordionName).collapse('show');
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $('#' + accordionName).offset().top - 150
            }, 500);
        },300);
    }
});