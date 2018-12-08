(function () {

    const $btn = $('.pc-cms-send-form');

    $btn.on('click', function (e) {
        e.preventDefault();
        const formId = $(this).data('form');
        const $form = $(formId);
        if ($form.length) {
            $form.submit();
        }
    });

})();