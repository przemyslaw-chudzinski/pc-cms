<?php

$filedName = isset($filedName) ? $filedName : '';
$id = isset($id) ? $id : '';
$label = isset($label) ? $label : '';
$placeholder = isset($placeholder) ? $placeholder : '';
$previewContainerId = isset($previewContainerId) ? $previewContainerId : '';
$multiple = isset($multiple) ? $multiple : false;
$editState = isset($editState) ? $editState : false;
$files = isset($files) ? $files : [];
//$dir = isset($dir) ? $dir : null;
$noFileInputName = isset($noFileInputName) ? $noFileInputName : '';
//$route = isset($route) ? $route : '';
?>

<div class="pc-cms-image-preview-container is-fileinput" id="{{ $previewContainerId }}">
    @if ($editState)
        <div class="row pc-cms-files-actions">
            @if (count($files) > 0)
                <a href="#" class="btn btn-xs btn-danger pc-cms-clear-files">Clear all files</a>
                @if ($multiple)
{{--                    <a href="{{ url(route($routeName, [$routeParam => $recordId])) }}" class="btn btn-xs btn-info pc-cms-edit-files">Edit images</a>--}}
                @endif
            @endif
        </div>
            {{-- Single image preview --}}
            <div class="row pc-cms-preview-row">
                @if (count($files) > 0)
                    @foreach($files as $file)
                    <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                        @if (preg_match('/image/', $file->mime_type))
                        <img src="{{ $file->sizes->admin_prev_medium->url }}" class="img-responsive img-thumbnail">
                        @else
                            preview file which is not image
                        @endif
                    </div>
                    @endforeach
                @endif
            </div>
            <input type="hidden" class="pc-cms-no-image" name="{{ $noFileInputName }}" value="yes">
    @else
        <div class="row pc-cms-files-actions"></div>
        <div class="row pc-cms-preview-row"></div>
    @endif
</div>
<div class="form-group">

    <label for="{{ $id }}">{{ $label }}</label>
    <input
            name="{{ $filedName.'[]' }}"
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