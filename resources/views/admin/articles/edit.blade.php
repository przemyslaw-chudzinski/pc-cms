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
                <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                    <label for="articleContent">Article content</label>
                    <textarea class="form-control pc-cms-editor" name="content" id="articleContent">{{ $article->content }}</textarea>
                    @if ($errors->has('content'))
                        <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group clearfix pc-cms-image-preview-container" id="blogThumbnailPreview">
                    @if ($article->thumbnail)
                        <a href="#" class="pc-cms-clear-files">Clear selected files</a>
                        <div class="col-xs-6 col-md-4 pc-cms-single-preview-image">
                            <img src="{{ Storage::url('blog/' . $article->thumbnail) }}" class="img-responsive img-thumbnail">
                        </div>
                    @endif
                        <input type="hidden" class="pc-cms-no-image" name="noImage" value="yes">
                </div>
                <div class="form-group{{ $errors->has('imageThumbnail') ? ' has-error' : '' }}">

                    <label for="articleThumbnail">Thumbnail</label>
                    <input name="imageThumbnail" type="file" class="form-control pc-cms-upload-files-input" id="articleThumbnail" data-preview-container="#blogThumbnailPreview">

                    @if ($errors->has('imageThumbnail'))
                            <span class="help-block">
                                <strong>{{ $errors->first('imageThumbnail') }}</strong>
                            </span>
                    @endif
                </div>
                <div class="form-group">
                    <label for="">Categories</label>
                    <select multiple name="category_ids[]" class="form-control pc-cms-select2-base">
                        @if (count($categories) > 0)
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}"
                                        @if (count($article->getCategoryIdsAttribute()) > 0)
                                            @foreach($article->getCategoryIdsAttribute() as $id)
                                                @if ($id === $category->id)
                                                    selected
                                                @endif
                                            @endforeach
                                        @endif
                                >{{ $category->name }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>
                @include('admin.components.forms.seo', [
                    'allow' => $article->allow_indexed,
                    'meta_title' => $article->meta_title,
                    'meta_description' => $article->meta_description
                  ])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" @if ($article->published) checked @else null @endif> Save and publish
                    </label>
                </div>
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection