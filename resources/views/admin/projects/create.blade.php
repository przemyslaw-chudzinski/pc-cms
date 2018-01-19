@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Create new project</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/projects') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="projectTitle">Project title</label>
                    <input type="text" class="form-control" name="title" id="projectTitle" autocomplete="off">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="projectSlug">Project slug</label>
                    <input type="text" class="form-control" name="slug" id="projectSlug" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                    <label for="projectContent">Project content</label>
                    <textarea class="form-control pc-cms-editor" name="content" id="projectContent"></textarea>
                    @if ($errors->has('content'))
                        <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                        </span>
                    @endif
                </div>
                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])
                {{--<div class="form-group clearfix pc-cms-image-preview-container" id="projectImagesPreview"></div>--}}
                {{--<div class="form-group{{ $errors->has('additionalImages') ? ' has-error' : '' }}">--}}

                    {{--<label for="projectImages">Images</label>--}}
                    {{--<input name="additionalImages[]" type="file" multiple class="form-control pc-cms-upload-files-input" id="projectImages" data-preview-container="#projectImagesPreview">--}}

                    {{--@if ($errors->has('additionalImages'))--}}
                        {{--<span class="help-block">--}}
                            {{--<strong>{{ $errors->first('additionalImages') }}</strong>--}}
                        {{--</span>--}}
                    {{--@endif--}}
                {{--</div>--}}
                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'additionalImages',
                    'id' => 'projectImages',
                    'label' => 'Images',
                    'previewContainerId' => 'projectImagesPreview',
                    'multiple' => true,
                    'editState' => false
                ])
                <div class="form-group">
                    <label for="">Categories</label>
                    <select multiple name="category_ids[]" class="form-control pc-cms-select2-base">
                        @if (count($categories) > 0)
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>
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