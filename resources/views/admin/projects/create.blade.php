@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Create new project</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/projects') }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="projectTitle">Project title</label>
                    <input type="text" class="form-control" name="title" id="projectTitle" autocomplete="off">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="projectSlug">Project slug</label>
                    <input type="text" class="form-control" name="slug" id="projectSlug" autocomplete="off">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'projectContent',
                    'fieldName' => 'content',
                    'editState' => false,
                    'label' => 'Project content'
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectThumbnailPreview',
                    'multiple' => false,
                    'editState' => false
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'additionalImages',
                    'id' => 'projectImages',
                    'label' => 'Images',
                    'previewContainerId' => 'projectImagesPreview',
                    'multiple' => true,
                    'editState' => false
                ])


                @include('admin.components.forms.selection', [
                    'label' => 'Categories',
                    'multiple' => true,
                    'fieldName' => 'category_ids',
                    'id' => 'projectCategoryIds',
                    'editState' => false,
                    'selections' => $categories,
                    'selectionName' => 'name',
                    'excludeIds' => []
                ])

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