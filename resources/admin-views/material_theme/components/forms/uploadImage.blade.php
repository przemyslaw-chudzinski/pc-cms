<div class="pc-cms-image-preview-container is-fileinput" id="{{ $previewContainerId }}">
    @if ($editState)
        <div class="row pc-cms-files-actions">
            @if (count(json_decode($image, true)) > 0)
                <a href="#" class="btn btn-xs btn-danger pc-cms-clear-files">Clear all files</a>
                @if ($multiple)
                    <a href="{{ url(route($routeName, [$routeParam => $recordId])) }}" class="btn btn-xs btn-info pc-cms-edit-files">Edit images</a>
                @endif
            @endif
        </div>
        @if($multiple)
            {{-- Multiple images preview --}}
            <div class="row pc-cms-preview-row">
                @if(count(json_decode($image, true)) > 0)
                    @foreach(json_decode($image, true) as $img)
                        <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                            <img src="{{ getImageUrl($img, 'admin_prev_medium') }}" class="img-responsive img-thumbnail">
                        </div>
                    @endforeach
                @endif
            </div>
        @else
            {{-- Single image preview --}}
            <div class="row pc-cms-preview-row">
                @if (count(json_decode($image, true)) > 0)
                    <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                        <img src="{{ getImageUrl(json_decode($image, true), 'admin_prev_medium') }}" class="img-responsive img-thumbnail">
                    </div>
                @endif
            </div>
        @endif
            <input type="hidden" class="pc-cms-no-image" name="{{ $noImageInputName }}" value="yes">
    @else
        <div class="row pc-cms-files-actions"></div>
        <div class="row pc-cms-preview-row"></div>
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