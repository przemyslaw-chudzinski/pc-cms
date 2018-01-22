@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Edit project - {{ $project->title }}</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/projects/' . $project->id) }}" enctype="multipart/form-data">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="projectTitle">Project title</label>
                    <input type="text" class="form-control" name="title" id="projectTitle" autocomplete="off" value="{{ $project->title }}">
                    @if ($errors->has('title'))
                        <span class="help-block">
                            <strong>{{ $errors->first('title') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    <label for="projectSlug">Project slug</label>
                    <input type="text" class="form-control" name="slug" id="projectSlug" autocomplete="off" value="{{ $project->slug }}">
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="generateSlug"> Do you want to generate new slug based on project title?
                    </label>
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'projectContent',
                    'fieldName' => 'content',
                    'editState' => true,
                    'label' => 'Project content',
                    'value' => $project->content
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'imageThumbnail',
                    'id' => 'projectThumbnail',
                    'label' => 'Thumbnail',
                    'previewContainerId' => 'projectThumbnailPreview',
                    'multiple' => false,
                    'editState' => true,
                    'image' => $project->thumbnail,
                    'dir' => 'projects',
                    'noImageInputName' => 'noImage'
                ])

                @include('admin.components.forms.uploadImage', [
                    'filedName' => 'additionalImages',
                    'id' => 'projectImages',
                    'label' => 'Images',
                    'previewContainerId' => 'projectImagesPreview',
                    'multiple' => true,
                    'editState' => true,
                    'image' => $project->images,
                    'dir' => 'projects',
                    'noImageInputName' => 'noImages'
                ])

                @include('admin.components.forms.selection', [
                    'label' => 'Categories',
                    'multiple' => true,
                    'fieldName' => 'category_ids',
                    'id' => 'projectCategoryIds',
                    'editState' => true,
                    'selections' => $categories,
                    'selectionName' => 'name',
                    'excludeIds' => [],
                    'idsAttribute' => $project->getCategoryIdsAttribute()
                ])


                @include('admin.components.forms.seo', ['allow' => $project->allow_indexed, 'meta_title' => $project->meta_title, 'meta_description' => $project->meta_description])
                @include('admin.components.forms.checkbox', [
                    'label' => 'Save and publish',
                    'fieldName' => 'saveAndPublished',
                    'checked' => $project->published
                ])
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection