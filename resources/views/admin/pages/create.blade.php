@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Create new page</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/pages') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="pageTitle">Page title</label>
                    <input type="text" class="form-control" name="title" id="pageTitle" autocomplete="off">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="pageSlug">Page slug</label>
                    <input type="text" class="form-control" name="slug" id="pageSlug" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                    <label for="pageContent">Page content</label>
                    <textarea class="form-control pc-cms-editor" name="content" id="pageContent"></textarea>
                    @if ($errors->has('content'))
                        <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                        </span>
                    @endif
                </div>
                {{--<div class="form-group clearfix pc-cms-image-preview-container" id="pageThumbnailPreview"></div>--}}
                {{--<div class="form-group{{ $errors->has('imageThumbnail') ? ' has-error' : '' }}">--}}

                    {{--<label for="pageThumbnail">Thumbnail</label>--}}
                    {{--<input name="imageThumbnail" type="file" class="form-control pc-cms-upload-files-input" id="pageThumbnail" data-preview-container="#pageThumbnailPreview">--}}

                    {{--@if ($errors->has('imageThumbnail'))--}}
                        {{--<span class="help-block">--}}
                            {{--<strong>{{ $errors->first('imageThumbnail') }}</strong>--}}
                        {{--</span>--}}
                    {{--@endif--}}
                {{--</div>--}}
                @include('admin.components.forms.uploadFile', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'pageThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'pageThumbnailPreview',
                    'editState' => false
                ])
                @include('admin.components.forms.seo', ['allow' => true, 'meta_title' => null, 'meta_description' => null])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" checked> Save and publish
                    </label>
                </div>
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection