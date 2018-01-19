@extends('admin.layout')

@section('content')
    <div class="pc-cms-header">
        <h2>Edit blog category - {{ $category->name }}</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/articles/categories/' . $category->id) }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="categoryName">Category name</label>
                    <input id="categoryName" name="name" type="text" class="form-control" autocomplete="off" value="{{ $category->name }}">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="categorySlug">Category slug</label>
                    <input id="categorySlug" name="slug" type="text" class="form-control" autocomplete="off" value="{{ $category->slug }}">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on category name?
                    </label>
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'categoryContent',
                    'fieldName' => 'description',
                    'editState' => true,
                    'label' => 'Description',
                    'value' => $category->description
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'categoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'categoryThumbnailPreview',
                    'multiple' => false,
                    'editState' => true,
                    'image' => $category->thumbnail,
                    'dir' => 'blogCategories',
                    'noImageInputName' => 'noImage'
                ])


                @include('admin.components.forms.selection', [
                    'label' => 'Parent category',
                    'multiple' => false,
                    'fieldName' => 'parent_id',
                    'id' => 'categoryIds',
                    'editState' => true,
                    'selections' => $categories,
                    'selectionName' => 'name',
                    'idsAttribute' => [$category->parent_id],
                    'excludeIds' => [$category->id]
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