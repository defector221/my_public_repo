jQuery(document).ready(function() {
    $("#preloader").remove();
});

jQuery(window).load(function() { // makes sure the whole site is loaded
    $('body').delay(100).css({
        'overflow-x': 'hidden'
    });
})