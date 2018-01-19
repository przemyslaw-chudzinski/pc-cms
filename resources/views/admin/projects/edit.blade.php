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
                <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                    <label for="projectContent">Project content</label>
                    <textarea class="form-control pc-cms-editor" name="content" id="projectContent">{{ $project->content }}</textarea>
                    @if ($errors->has('content'))
                        <span class="help-block">
                            <strong>{{ $errors->first('content') }}</strong>
                        </span>
                    @endif
                </div>

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
                <div class="form-group">
                    <label for="">Categories</label>
                    <select multiple name="category_ids[]" class="form-control pc-cms-select2-base">
                        @if (count($categories) > 0)
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}"
                                        @if (count($project->getCategoryIdsAttribute()) > 0)
                                            @foreach($project->getCategoryIdsAttribute() as $id)
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
                @include('admin.components.forms.seo', ['allow' => $project->allow_indexed, 'meta_title' => $project->meta_title, 'meta_description' => $project->meta_description])
                <div class="form-group">
                    <label>
                        <input name="saveAndPublished" type="checkbox" @if($project->published) checked @endif> Save and publish
                    </label>
                </div>
                <button class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection