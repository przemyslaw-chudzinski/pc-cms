/**
 * Loader button plugin
 * Author: Przemysław Chudziński
 */
(function ($) {
    const $btn = $('.pc-cms-loader-btn');

    $btn.on('click', function () {

        const formId = $(this).data('form');
        const $form = $(formId);
        const defaultLabel = $(this).text();
        const that = $(this);

        that.text('Loading...');
        $form.length ? $form.on('invalid-form', () => that.text(defaultLabel)) : null;
    });
})(jQuery);