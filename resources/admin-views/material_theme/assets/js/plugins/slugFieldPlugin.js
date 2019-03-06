import toastr from 'toastr';

(function ($) {

    const $slugFields = $('.pc-slug-field');

    $slugFields.length && $slugFields.each((index, slugField) => {

        const $slugField = $(slugField);

        _getLink($slugField)
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
        _getLink($slugField).show();
        _getEditState($slugField).hide();
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

        const $input = _getInput($slugField);
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
                _getLink($slugField)
                    .show()
                    .html('<strong>' + response.newSlug  + '</strong>');
                _getEditState($slugField).hide();
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
     * @returns {*}
     * @private
     * @param err
     * @param $slugField
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
        const $link = _getLink($slugField);
        $link.hide();
        _getEditState($slugField).show();
        _getInput($slugField).val($link.find('strong').text());
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

    /**
     *
     * @param $slugField
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    const _getInput = $slugField => $slugField.find('.pc-slug-field-input');

    /**
     *
     * @param $slugFields
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    const _getEditState = $slugField => $slugField.find('.pc-slug-field-edit-state');

    /**
     *
     * @param $slugField
     * @returns {*}
     * @private
     */
    function _getLink($slugField) {
        return $slugField.find('.pc-slug-field-link');
    }


})(jQuery);
