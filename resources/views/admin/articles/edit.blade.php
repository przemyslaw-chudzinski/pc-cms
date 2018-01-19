@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Edit article - {{ $article->title }}</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/articles/' . $article->id) }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="articleTitle">Article title</label>
                    <input type="text" class="form-control" name="title" id="articleTitle" autocomplete="off" value="{{ $article->title }}">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="articleSlug">Article slug</label>
                    <input type="text" class="form-control" name="slug" id="articleSlug" autocomplete="off" value="{{ $article->slug }}">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on article title?
                    </label>
                </div>


                @include('admin.components.forms.richEditor', [
                    'id' => 'articleContent',
                    'fieldName' => 'content',
                    'editState' => true,
                    'label' => 'Article content',
                    'value' => $article->content
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'articleThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'blogThumbnailPreview',
                    'multiple' => false,
                    'editState' => true,
                    'image' => $article->thumbnail,
                    'dir' => 'blog',
                    'noImageInputName' => 'noImage'
                ])


                @include('admin.components.forms.selection', [
                    'label' => 'Categories',
                    'multiple' => true,
                    'fieldName' => 'category_ids',
                    'id' => 'categoryIds',
                    'editState' => true,
                    'selections' => $categories,
                    'selectionName' => 'name',
                    'idsAttribute' => $article->getCategoryIdsAttribute(),
                    'excludeIds' => []
                ])

                @include('admin.components.forms.seo', [
                    'allow' => $article->allow_indexed,
                    'meta_title' => $article->meta_title,
                    'meta_description' => $article->meta_description
                 ])

                @include('admin.components.forms.saveAndPublish', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => $article->published
                ])
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection