/* Change async status plugin */
import toastr from "toastr";
import loaderAsync from './loaderAsyncPlugin';

(function () {
    const $changeStatusBtn = $('.pc-cms-toggle-status-btn');

    $changeStatusBtn.on('click', function (e) {
        onClickToggleStatusBtn(e, $(this));
    });

    function onClickToggleStatusBtn(e, $btn) {
        e.preventDefault();
        loaderAsync.show({
            title: 'Data processing is in progress',
        });

        const url = $btn.data('url');
        const trueLabel = $btn.data('true-label');
        const falseLabel = $btn.data('false-label');
        const trueClasses = $btn.data('true-classes');
        const falseClasses = $btn.data('false-classes');

        sendRequest(url, null, 'post', function (response) {
            prepareBtn($btn, response, trueLabel, falseLabel, trueClasses, falseClasses);
            toastr.success(response.message);
            loaderAsync.hide();
        }, function () {
            toastr.error('Something went wrong!');
            loaderAsync.hide();
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

    function prepareBtn($btn, response, trueLabel = 'Published', falseLabel = 'Draft', trueClasses = 'btn-success', falseClasses = 'btn-warning') {
        const _trueClasses = 'btn '+ trueClasses +' btn-xs pc-cms-status-btn pc-cms-toggle-status-btn';
        const _falseClasses = 'btn '+ falseClasses +' btn-xs pc-cms-status-btn pc-cms-toggle-status-btn';
        $btn.removeClass();
        if (!response.newStatus) {
            $btn.addClass(_falseClasses);
            $btn.text(falseLabel);
        } else {
            $btn.addClass(_trueClasses);
            $btn.text(trueLabel);
        }
    }
})();