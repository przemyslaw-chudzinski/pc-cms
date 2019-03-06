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
            .on('click', e => _handleConfirm(e, $slugField))
            .end()
            .append('<div class="pc-slug-field__layer"></div>');
    });


    /**
     *
     * @param event
     * @param $slugField
     * @private
     */
    const _handleCancel = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();
        $slugField.find('.pc-slug-field-link').show();
        $slugField.find('.pc-slug-field-edit-state').hide();
    };
    /**
     *
     * @param event
     * @param $slugField
     * @private
     */
    const _handleConfirm = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();

        const $input = $('.pc-slug-field-input');
        const $newSlug = $input.val();
        const url = $slugField.attr('data-url');

        _showLayer($slugField);

        url && $.ajax({
            method: 'POST',
            data: {slug: $newSlug},
            url,
            success: res => _handleSuccess(res, $slugField, $input),
            error: err => _handleError(err, $slugField)
        });

    };
    /**
     *
     * @param response
     * @param $slugField
     * @param $input
     * @private
     */
    const _handleSuccess = (response, $slugField, $input) => {

        setTimeout(() => {
            _hideLayer($slugField);

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
        }, 400);
    };

    /**
     *
     * @param response
     * @returns {*}
     * @private
     */
    const _handleError = (err, $slugField = null) => {
        _hideLayer($slugField);
        toastr.error('Something went wrong', 'Error!');
    };

    /**
     *
     * @param event
     * @param $slugField
     * @private
     */
    const _handleEdit = (event, $slugField) => {
        event.preventDefault();
        event.stopPropagation();
        const $link = $slugField.find('.pc-slug-field-link');
        $link.hide();
        $slugField.find('.pc-slug-field-edit-state').show();
        $('.pc-slug-field-input').val($link.find('strong').text());
    };

    /**
     *
     * @param $slugField
     * @returns {*}
     * @private
     */
    const _getLayer = $slugField => $slugField.find('.pc-slug-field__layer');

    /**
     *
     * @param $slugField
     * @returns {*}
     * @private
     */
    const _showLayer = $slugField => _getLayer($slugField).addClass('visible');

    /**
     *
     * @param $slugField
     * @returns {*}
     * @private
     */
    const _hideLayer = $slugField => _getLayer($slugField).removeClass('visible');


})(jQuery);
