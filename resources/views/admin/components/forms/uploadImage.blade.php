<div class="form-group clearfix pc-cms-image-preview-container" id="{{ $previewContainerId }}">
    @if ($editState)
        @if ($image)
            <a href="#" class="pc-cms-clear-files">Clear selected files</a>
            @if($multiple)
                @foreach(unserialize($image) as $img)
                    <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                        <img src="{{ Storage::url($dir . '/' . $img) }}" class="img-responsive img-thumbnail">
                    </div>
                @endforeach
            @else
                <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                    <img src="{{ Storage::url($dir . '/' . $image) }}" class="img-responsive img-thumbnail">
                </div>
            @endif
        @endif
            <input type="hidden" class="pc-cms-no-image" name="{{ $noImageInputName }}" value="yes">
    @endif
</div>
<div class="form-group{{ $errors->has($filedName) ? ' has-error' : '' }}">

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

    @if ($errors->has($filedName))
        <span class="help-block">
            <strong>{{ $errors->first($filedName) }}</strong>
        </span>
    @endif
</div>