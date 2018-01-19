@extends('admin.layout')

@section('content')
    <div class="pc-cms-header">
        <h2>Edit project category - {{ $category->name }}</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/projects/categories/' . $category->id) }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="projectCategoryName">Category name</label>
                    <input id="projectCategoryName" name="name" type="text" class="form-control" autocomplete="off" value="{{ $category->name }}">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="projectCategorySlug">Category slug</label>
                    <input id="projectCategorySlug" name="slug" type="text" class="form-control" autocomplete="off" value="{{ $category->slug }}">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on category title?
                    </label>
                </div>
                <div class="form-group">
                    <label for="projectCategoryDescription">Description</label>
                    <textarea id="projectCategoryDescription" name="description" class="form-control pc-cms-editor">{{ $category->description }}</textarea>
                </div>
                {{--<div class="form-group clearfix pc-cms-image-preview-container" id="projectCategoryThumbnailPreview">--}}
                    {{--@if ($category->thumbnail)--}}
                        {{--<a href="#" class="pc-cms-clear-files">Clear selected files</a>--}}
                        {{--<div class="col-xs-6 col-md-4 pc-cms-single-preview-image">--}}
                            {{--<img src="{{ Storage::url('projectCategories/' . $category->thumbnail) }}" class="img-responsive img-thumbnail">--}}
                        {{--</div>--}}
                    {{--@endif--}}
                    {{--<input type="hidden" class="pc-cms-no-image" name="noImage" value="yes">--}}
                {{--</div>--}}
                {{--<div class="form-group{{ $errors->has('imageThumbnail') ? ' has-error' : '' }}">--}}

                    {{--<label for="projectCategoryThumbnail">Thumbnail</label>--}}
                    {{--<input name="imageThumbnail" type="file" class="form-control pc-cms-upload-files-input" id="projectCategoryThumbnail" data-preview-container="#projectCategoryThumbnailPreview">--}}

                    {{--@if ($errors->has('imageThumbnail'))--}}
                        {{--<span class="help-block">--}}
                            {{--<strong>{{ $errors->first('imageThumbnail') }}</strong>--}}
                        {{--</span>--}}
                    {{--@endif--}}
                {{--</div>--}}
                @include('admin.components.forms.uploadFile', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectCategoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectCategoryThumbnailPreview',
                    'editState' => true,
                    'image' => $category->thumbnail,
                    'dir' => 'projectCategories',
                    'noImageInputName' => 'noImage'
                ])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" @if($category->published) checked @endif> Save and publish
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
@endsection