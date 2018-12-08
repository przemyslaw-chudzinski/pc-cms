/* Preview image before upload files */
(function () {

    const $uploadFilesInput = $('.pc-cms-upload-files-input');
    const $clearFilesBtns = $('.pc-cms-clear-files');
    const $noImageInputs = $('.pc-cms-no-image');
    const $editFilesBtn = $('.pc-cms-edit-files');

    $noImageInputs.val('no');

    if ($clearFilesBtns.length) {
        $clearFilesBtns.on('click', function (e) {
            onClickClearFilesInit(e, $(this), $editFilesBtn);
        });
    }



    $uploadFilesInput.on('change', onChangeUploadFilesInput);


    function onChangeUploadFilesInput(e) {

        const $uploadInput = $(e.target);
        const $previewContainerId = $uploadInput.data('preview-container');
        const $previewContainer = $($previewContainerId);
        const $currentPreviewImages = $previewContainer.find('.pc-cms-single-preview-image');
        const $clearFilesBtn = $('<a href="#" class="btn btn-xs btn-danger pc-cms-clear-files">Clear selected files</a>');
        const $currentClearFilesBtn = $previewContainer.find('.pc-cms-clear-files');
        const $noImageInput = $previewContainer.find('.pc-cms-no-image');
        const $previewRow = $previewContainer.find('.pc-cms-preview-row');
        const $previewActions = $previewContainer.find('.pc-cms-files-actions');

        $noImageInput.val('no');

        if (!$currentClearFilesBtn.length) {
            $previewActions.append($clearFilesBtn);
        } else {
            $currentClearFilesBtn.on('click', function (e) {
                onClickClearFilesBtn(e, $uploadInput, $(this), $previewContainer, $noImageInput, $editFilesBtn);
            });
        }

        $clearFilesBtn.on('click', function (e) {
            onClickClearFilesBtn(e, $uploadInput, $(this), $previewContainer, $noImageInput, $editFilesBtn);
        });

        if ($currentPreviewImages.length) {
            $currentPreviewImages.remove();
        }

        if ($uploadInput[0].files.length) {
            [].forEach.call($uploadInput[0].files, function (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    createPreviewThumbnail(e, $previewRow);
                };
                reader.readAsDataURL(file);
            });
        }
    }

    function createPreviewThumbnail(e, $previewContainer) {
        const $imageWrapper = $('<div class="col-xs-6 col-md-4 pc-cms-single-preview-image"></div>');
        const $img = $('<img class="img-responsive img-thumbnail">');
        $img.attr('src', e.target.result);
        $imageWrapper.append($img);
        $previewContainer.append($imageWrapper);
    }

    function onClickClearFilesBtn(e, $uploadInput, $clearFilesBtn, $previewContainer, $noImageInput, $editFilesBtn) {
        e.preventDefault();
        e.stopPropagation();
        $uploadInput.val('');
        const $currentPreviewImages = $previewContainer.find('.pc-cms-single-preview-image');
        $currentPreviewImages.remove();
        $clearFilesBtn.remove();
        $editFilesBtn.remove();
        $noImageInput.val('yes');
    }

    function onClickClearFilesInit(e, $clearBtn, $editFilesBtn) {
        e.preventDefault();
        e.stopPropagation();
        const $previewContainer = $clearBtn.closest('.pc-cms-image-preview-container');
        const $currentPreviewImages = $previewContainer.find('.pc-cms-single-preview-image');
        const $noImageInput = $previewContainer.find('.pc-cms-no-image');
        $noImageInput.val('yes');
        $currentPreviewImages.remove();
        $editFilesBtn.remove();
        $clearBtn.remove();
    }

})();