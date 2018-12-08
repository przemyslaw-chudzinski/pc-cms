(function ($) {

    const $preloader = $('.pc-cms-preloader');

    $(window).on('load', function () {

        $preloader.addClass('hiding');

        $preloader.on('transitionend', function (e) {
            $(this).css('display', 'none');
        });

    });


})(jQuery);