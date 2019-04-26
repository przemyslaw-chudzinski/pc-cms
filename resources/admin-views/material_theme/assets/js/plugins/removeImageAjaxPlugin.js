import toastr from "toastr";

(function ($) {

    const $triggers = $('[data-image-remove]');

    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm('Are you sure that you want to remove this image?')) return;

        const $target = $(e.target);

        const url = $target.data('image-remove-url');
        const imageID = +$target.data('image-remove-id');

        if (!url || !imageID) return;

        $.ajax({
            url,
            method: 'delete',
            data: {imageID},
            success: response => handleAjaxSuccess($target, response),
            error: err => handleAjaxError($target, err)
        });
    }

    $triggers.on('click', e => handleClick(e));

    function handleAjaxError($target, {responseJSON: {message}, statusCode}) {
        if (+statusCode === 422) return toastr.error(message, 'Try again');
        toastr.error('Internal Server Error', 'Error!');
    }

    function handleAjaxSuccess($target, {message}) {
        const $imageTarget = $($target.data('image-remove-target'));
        $imageTarget.remove();
        toastr.success(message, 'Success!');
    }

})(jQuery);
