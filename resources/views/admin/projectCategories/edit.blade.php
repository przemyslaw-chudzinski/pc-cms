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

                @include('admin.components.forms.richEditor', [
                    'id' => 'projectCategoryDescription',
                    'fieldName' => 'description',
                    'editState' => true,
                    'label' => 'Description',
                    'value' => $category->description
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectCategoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectCategoryThumbnailPreview',
                    'multiple' => false,
                    'editState' => true,
                    'image' => $category->thumbnail,
                    'dir' => 'projectCategories',
                    'noImageInputName' => 'noImage'
                ])
                @include('admin.components.forms.saveAndPublish', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => $category->published
                ])
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
@endsection