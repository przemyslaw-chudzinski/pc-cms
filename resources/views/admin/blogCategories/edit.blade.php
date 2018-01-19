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
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on category title?
                    </label>
                </div>
                <div class="form-group">
                    <label for="categoryContent">Description</label>
                    <textarea id="categoryContent" name="description" class="form-control pc-cms-editor">{{ $category->description }}</textarea>
                </div>
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
                <div class="form-group">
                    <label for="categoryParentId">Parent category</label>
                    <select id="categoryParentId" class="form-control pc-cms-select2-base" name="parent_id">
                        @if (count($categories) > 0)
                            <option></option>
                            @foreach($categories as $blogCategory)
                                @if ($blogCategory->id !== $category->id)
                                    <option value="{{ $blogCategory->id }}" @if($category->parent_id === $blogCategory->id) selected @endif>{{ $blogCategory->name }}</option>
                                @endif
                            @endforeach
                        @endif
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" @if ($category->published) checked @endif> Save and publish
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
@endsection