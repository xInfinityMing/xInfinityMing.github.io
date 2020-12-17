$(document).ready(function(){
    //init tooltips
    $('[data-toggle="tooltip"]').tooltip();

    displayTableCol();

    $(window).resize(function() {
        displayTableCol();
    })

    function displayTableCol() {
        if($(window).width() < 768) {
            $(".compare-tables table").addClass('two-cols');
        } else {
            $(".compare-tables table").removeClass('two-cols');
        }
    }
})