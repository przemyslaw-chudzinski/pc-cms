import toastr from "toastr";

(function ($) {

    const $selectTriggers = $('[data-image-select]');
    $selectTriggers.on('click', e => handleClick(e, $selectTriggers));

    $selectTriggers.each((index, trigger) => typeof $(trigger).data('image-select-selected') !== "undefined" ? markAsSelected($(trigger)) : null);

    function handleClick(e, $triggers) {

        e.preventDefault();
        e.stopPropagation();

        let $target = $(e.target);
        if (e.target.nodeName !== 'BUTTON') $target = $(e.target.parentNode);

        const url = $target.data('image-select-url');
        const imageID = $target.data('image-select-id');

        if (!url || !imageID) return;

        $.ajax({
            'method': 'post',
            url,
            data: {
                imageID
            },
            success: response => handleAjaxSuccess($target, response, $triggers),
            error: err => handleAjaxError($target, err)
        });

    }

    function handleAjaxSuccess ($target, {message}, $triggers) {
        resetSelection($triggers);
        markAsSelected($target);
        toastr.success(message, 'Success!');
    }

    function handleAjaxError($target, {responseJSON: {message}, statusCode}) {
        if (+statusCode === 422) return toastr.error(message, 'Try again');
        toastr.error('Internal Server Error', 'Error!');
    }

    function resetSelection($triggers) {
        $triggers.find('i').removeClass('zmdi-star');
    }

    function markAsSelected($target) {
        $target.find('i').addClass('zmdi-star');
    }

})(jQuery);
