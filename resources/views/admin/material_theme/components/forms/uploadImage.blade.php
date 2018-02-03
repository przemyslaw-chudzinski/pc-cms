<div class="pc-cms-image-preview-container is-fileinput" id="{{ $previewContainerId }}">
    @if ($editState)
        @if ($image)
            <a href="#" class="pc-cms-clear-files">Clear selected files</a>
            @if($multiple)
                @foreach(json_decode($image, true) as $img)
                    <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                        <img src="{{ getImageUrl($img, 'admin_prev_medium') }}" class="img-responsive img-thumbnail">
                    </div>
                @endforeach
            @else
                <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                    <img src="{{ getImageUrl(json_decode($image, true), 'admin_prev_medium') }}" class="img-responsive img-thumbnail">
                </div>
            @endif
        @endif
            <input type="hidden" class="pc-cms-no-image" name="{{ $noImageInputName }}" value="yes">
    @endif
</div>
<div class="form-group">

    <label for="{{ $id }}">{{ $label }}</label>
    <input
            name="{{ $multiple ? $filedName.'[]' : $filedName }}"
            @if($multiple)
                    multiple
            @endif
            type="file"
            class="form-control pc-cms-upload-files-input"
            id="{{ $id }}"
            data-preview-container="#{{ $previewContainerId }}">

    <div class="input-group">
        <input type="text" readonly="" class="form-control" placeholder="{{ $placeholder }}">
        <span class="input-group-btn input-group-sm">
            <button type="button" class="btn btn-info btn-fab btn-fab-sm">
                <i class="zmdi zmdi-attachment-alt"></i>
            </button>
        </span>
    </div>

</div>