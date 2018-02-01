@extends('admin.bootstrap_theme.layout')

@section('content')
    <div class="pc-cms-header">
        <h2>Create new article category</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/articles/categories') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="categoryName">Category name</label>
                    <input id="categoryName" name="name" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="categorySlug">Category slug</label>
                    <input id="categorySlug" name="slug" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'categoryContent',
                    'fieldName' => 'description',
                    'editState' => false,
                    'label' => 'Description'
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'categoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'categoryThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])

                @include('admin.components.forms.selection', [
                    'label' => 'Parent category',
                    'multiple' => false,
                    'fieldName' => 'parent_id',
                    'id' => 'categoryIds',
                    'editState' => false,
                    'selections' => $categories,
                    'selectionName' => 'name',
                    'excludeIds' => []
                ])

                @include('admin.components.forms.checkbox', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => true
                ])
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
@endsection