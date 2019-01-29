/**
 * Preview Image and files Plugin
 * Author: Przemysław Chudziński
 */
(function ($) {

    const $uploadFilesInput = $('.pc-cms-upload-files-input');
    const $clearFilesBtns = $('.pc-cms-clear-files');
    const $noImageInputs = $('.pc-cms-no-image');
    const $editFilesBtn = $('.pc-cms-edit-files');

    $noImageInputs.val('no');
    $clearFilesBtns.length ? $clearFilesBtns.on('click', e =>  onClickClearFilesInit(e, $editFilesBtn)) : null;
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

        !$currentClearFilesBtn.length ?  $previewActions.append($clearFilesBtn) :
            $currentClearFilesBtn.on('click', e => onClickClearFilesBtn(e, $uploadInput, $currentClearFilesBtn, $previewContainer, $noImageInput, $editFilesBtn));

        $clearFilesBtn.on('click', e => onClickClearFilesBtn(e, $uploadInput, $clearFilesBtn, $previewContainer, $noImageInput, $editFilesBtn));

        $currentPreviewImages.length ? $currentPreviewImages.remove() : null;

        $uploadInput[0].files.length ? [].forEach.call($uploadInput[0].files, file => {
            let reader = new FileReader();
            reader.onload = e => createPreviewThumbnail(e, $previewRow);
            reader.readAsDataURL(file);
        }) : null
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

    function onClickClearFilesInit(e, $editFilesBtn) {
        e.preventDefault();
        e.stopPropagation();
        const $target = $(e.target);
        const $previewContainer = $target.closest('.pc-cms-image-preview-container');
        const $currentPreviewImages = $previewContainer.find('.pc-cms-single-preview-image');
        const $noImageInput = $previewContainer.find('.pc-cms-no-image');
        $noImageInput.val('yes');
        $currentPreviewImages.remove();
        $editFilesBtn.remove();
        $target.remove();
    }

})(jQuery);
