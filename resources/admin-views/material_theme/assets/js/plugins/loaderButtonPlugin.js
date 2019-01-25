/**
 * Loader button plugin
 * Author: Przemysław Chudziński
 */
(function ($) {
    const $btn = $('.pc-cms-loader-btn');

    $btn.on('click', function (e) {
        const $target = $(e.target);
        const formId = $target.data('form');
        const $form = $(formId);
        const defaultLabel = $target.text();

        $target.text('Loading...');
        $form.length ? $form.on('invalid-form', () => $target.text(defaultLabel)) : null;
    });
})(jQuery);
