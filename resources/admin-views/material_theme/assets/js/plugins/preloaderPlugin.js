/*
* Preloader plugin
* Author: Przemysław Chudziński
* */
(function ($) {
    const $preloader = $('.pc-cms-preloader');
    $(window).on('load', () => {
        $preloader.addClass('hiding');
        $preloader.on('transitionend', () => $preloader.css('display', 'none'));
    });
})(jQuery);