/**
 * Remove Item Plugin
 * Author: Przemysław Chudziński
 */
(function ($) {
    const $removeBtn = $('.pc-cms-remove-item');
    $removeBtn.on('click', onRemove);

    function onRemove(e) {
        e.preventDefault();
        e.stopPropagation();
        const $form = $($(e.target).data('form'));
        if(!$form.length) throw new Error('Brak targetu - nie mogę usunąć elementu');
        let agreement = confirm('Are you sure to remove this item?');
        agreement ? $form.submit() : null;
    }
})(jQuery);