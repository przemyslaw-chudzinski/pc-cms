(function () {

    const $btn = $('.pc-cms-loader-btn');

    $btn.on('click', function () {

        const formId = $(this).data('form');
        const $form = $(formId);
        const defaultLabel = $(this).text();
        const that = $(this);

        that.text('Loading...');

        if ($form.length) {
            $form.on('invalid-form', function () {
                that.text(defaultLabel);
            });
        }

    });


})();