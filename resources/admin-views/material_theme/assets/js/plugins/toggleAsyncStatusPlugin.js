/*
 * Change async status plugin
 * Author: Przemysław Chudziński
  * */
import toastr from "toastr";
import loaderAsync from './loaderAsyncPlugin';

(function ($) {
    const $changeStatusBtn = $('.pc-cms-toggle-status-btn');

    $changeStatusBtn.on('click', e => onClickToggleStatusBtn(e));

    function onClickToggleStatusBtn(e) {
        e.preventDefault();
        const $target = $(e.target);

        loaderAsync.show({
            title: 'Data processing is in progress',
        });

        const url = $target.data('url');
        const trueLabel = $target.data('true-label');
        const falseLabel = $target.data('false-label');
        const trueClasses = $target.data('true-classes');
        const falseClasses = $target.data('false-classes');

        sendRequest(url, null, 'post', response => {
            prepareBtn($target, response, trueLabel, falseLabel, trueClasses, falseClasses);
            toastr.success(response.message);
            loaderAsync.hide();
        }, () => {
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
})(jQuery);
