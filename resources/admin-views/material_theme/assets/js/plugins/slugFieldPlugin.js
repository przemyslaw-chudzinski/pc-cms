import toastr from 'toastr';

(function ($) {

    const $slugFields = $('.pc-slug-field');

    $slugFields.length && $slugFields.each((index, slugField) => {

        const $slugField = $(slugField);

        $slugField
            .find('.pc-slug-field-link')
            .on('click', e => _handleEdit(e, $slugField))
            .end()
            .find('.pc-slug-field-edit-state')
            .hide()
            .find('.pc-slug-field-cancel')
            .on('click', e => _handleCancel(e, $slugField))
            .end()
            .find('.pc-slug-field-save')
            .on('click', e => _handleConfirm(e, $slugField));
    });


    const _handleCancel = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();
        $slugField.find('.pc-slug-field-link').show();
        $slugField.find('.pc-slug-field-edit-state').hide();
    };

    const _handleConfirm = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();

        const $input = $('.pc-slug-field-input');
        const $newSlug = $input.val();
        const url = $slugField.attr('data-url');

        url && $.ajax({
            method: 'POST',
            data: {slug: $newSlug},
            url,
            success: res => _handleSuccess(res, $slugField, $input),
            error: _handleError
        });

    };

    const _handleSuccess = (response, $slugField, $input) => {
        if (response && !response.error) {
            $slugField
                .find('.pc-slug-field-link')
                .show()
                .html('<strong>' + response.newSlug  + '</strong>');
            $slugField.find('.pc-slug-field-edit-state').hide();
            $input.val(response.newSlug);
            $input.css('border-color', 'inherit');
        } else {
            $input.css('border-color', 'red');
        }

        response && toastr[response.type](response.message);
    };

    const _handleError = response => toastr.error('Something went wrong', 'Error!');

    const _handleEdit = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();
        const $link = $slugField.find('.pc-slug-field-link');
        $link.hide();
        $slugField.find('.pc-slug-field-edit-state').show();
        $('.pc-slug-field-input').val($link.find('strong').text());
    };


})(jQuery);
