@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Create new page</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/pages') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="pageTitle">Page title</label>
                    <input type="text" class="form-control" name="title" id="pageTitle" autocomplete="off">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="pageSlug">Page slug</label>
                    <input type="text" class="form-control" name="slug" id="pageSlug" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'pageContent',
                    'fieldName' => 'content',
                    'editState' => false,
                    'label' => 'Page content'
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'pageThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'pageThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])
                @include('admin.components.forms.seo', ['allow' => true, 'meta_title' => null, 'meta_description' => null])
                @include('admin.components.forms.checkbox', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => true
                ])
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection