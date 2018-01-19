@extends('admin.layout')

@section('content')


    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new article'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/articles') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="articleTitle">Article title</label>
                    <input type="text" class="form-control" name="title" id="articleTitle" autocomplete="off">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="articleSlug">Article slug</label>
                    <input type="text" class="form-control" name="slug" id="articleSlug" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>


                @include('admin.components.forms.richEditor', [
                    'id' => 'articleContent',
                    'fieldName' => 'content',
                    'editState' => false,
                    'label' => 'Article content'
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'articleThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'blogThumbnailPreview',
                    'multiple' => false,
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

                @include('admin.components.forms.saveAndPublish', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => true
                ])
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection