/* Change async status plugin */
import toastr from "toastr";

(function () {
    const $changeStatusBtn = $('.pc-cms-toggle-status-btn');

    $changeStatusBtn.on('click', function (e) {
        onClickToggleStatusBtn(e, $(this));
    });

    function onClickToggleStatusBtn(e, $btn) {
        e.preventDefault();
        const url = $btn.data('url');
        const trueLabel = $btn.data('true-label');
        const falseLabel = $btn.data('false-label');
        sendRequest(url, null, 'post', function (response) {
            prepareBtn($btn, response, trueLabel, falseLabel);
            toastr.success(response.message);
        }, function () {
            toastr.error('Something went wrong!');
        });
    }

    function sendRequest(url, data, method = 'post', success, error) {
        success = success || function(){};
        error = error || function(){};
        $.ajax({
            method: method,
            url: url,
            success: success,
            error: error
        });
    }

    function prepareBtn($btn, response, trueLabel = 'Published', falseLabel = 'Draft') {
        const trueClassess = 'btn btn-success btn-xs pc-cms-status-btn pc-cms-toggle-status-btn';
        const falseClassess = 'btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn';
        $btn.removeClass();
        if (!response.newStatus) {
            $btn.addClass(falseClassess);
            $btn.text(falseLabel);
        } else {
            $btn.addClass(trueClassess);
            $btn.text(trueLabel);
        }
    }
})();