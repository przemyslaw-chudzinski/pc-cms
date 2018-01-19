@extends('admin.layout')

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
                <div class="form-group">
                    <label for="categoryContent">Description</label>
                    <textarea id="categoryContent" name="description" class="form-control pc-cms-editor"></textarea>
                </div>
                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'categoryThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'categoryThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])
                <div class="form-group">
                    <label for="categoryParentId">Parent category</label>
                    <select id="categoryParentId" class="form-control pc-cms-select2-base" name="parent_id">
                        @if (count($categories) > 0)
                            <option></option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>
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