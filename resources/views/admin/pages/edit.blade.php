@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Edit page - {{ $page->title }}</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/pages/' . $page->id) }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="pageTitle">Page title</label>
                    <input type="text" class="form-control" name="title" id="pageTitle" autocomplete="off" value="{{ $page->title }}">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="pageSlug">Page slug</label>
                    <input type="text" class="form-control" name="slug" id="pageSlug" autocomplete="off" value="{{ $page->slug }}">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on page title?
                    </label>
                </div>
                <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                    <label for="pageContent">Page content</label>
                    <textarea class="form-control pc-cms-editor" name="content" id="pageContent">{{ $page->content }}</textarea>
                    @if ($errors->has('content'))
                        <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                        </span>
                    @endif
                </div>
                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'pageThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'pageThumbnailPreview',
                    'multiple' => false,
                    'editState' => true,
                    'image' => $page->thumbnail,
                    'dir' => 'pages',
                    'noImageInputName' => 'noImage'
                ])
                @include('admin.components.forms.seo', ['allow' => $page->allow_indexed, 'meta_title' => $page->meta_title, 'meta_description' => $page->meta_description])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" @if($page->published) checked @endif> Save and publish
                    </label>
                </div>
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection