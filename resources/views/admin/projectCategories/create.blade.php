@extends('admin.layout')

@section('content')
    <div class="pc-cms-header">
        <h2>Create new project category</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/projects/categories') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="projectCategoryName">Category name</label>
                    <input id="projectCategoryName" name="name" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="projectCategorySlug">Category slug</label>
                    <input id="projectCategorySlug" name="slug" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label for="projectCategoryDescription">Description</label>
                    <textarea id="projectCategoryDescription" name="description" class="form-control pc-cms-editor"></textarea>
                </div>
                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectCategoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectCategoryThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" checked> Save and publish
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
@endsection