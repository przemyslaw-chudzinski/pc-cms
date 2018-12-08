@extends('admin.material_theme.layout')

@section('module_name')
    Projects
@endsection

@section('content')

    <?php
        $module_name = 'projects';
    ?>

    <div class="row">
        {!! Form::open([
            'method' => 'post',
            'route' => getRouteName($module_name, 'store'),
            'id' => 'createNewProjectForm',
            'novalidate' => 'novalidate',
            'files' => true
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New project</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Project title') !!}
                        {!! Form::text('title', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Project slug') !!}
                        {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Project content') !!}
                        {!! Form::textarea('content', null, ['class' => 'form-control pc-cms-editor']) !!}
                    </div>

                    <div class="form-group">
                        @include('admin.material_theme.components.forms.seo', ['allow' => true, 'meta_title' => null, 'meta_description' => null])
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-4">
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="saveAndPublish" checked> Save and publish
                                    </label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createNewProjectForm">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                {!! Form::label(null, 'Project categories') !!}
                                <select name="category_ids[]" class="selectpicker form-control" multiple>
                                    @if (count($categories) > 0)
                                        @foreach($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                @include('admin.material_theme.components.forms.uploadImage', [
                                    'filedName' => 'imageThumbnail',
                                    'id' => 'projectThumbnail',
                                    'label' => 'Thumbnail',
                                    'placeholder' => 'Choose project image',
                                    'previewContainerId' => 'projectThumbnailPreview',
                                    'multiple' => false,
                                    'editState' => false
                                ])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                @include('admin.material_theme.components.forms.uploadImage', [
                                    'filedName' => 'additionalImages',
                                    'id' => 'projectImages',
                                    'label' => 'Images',
                                    'placeholder' => 'Choose project additional images',
                                    'previewContainerId' => 'projectImagesPreview',
                                    'multiple' => true,
                                    'editState' => false
                                ])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {!! Form::close() !!}
    </div>


@endsection

@push('admin.footer')

    <script>
        (function () {

            $.validator.setDefaults({
                errorClass: 'help-block',
                highlight: function (elem) {
                    $(elem)
                        .closest('.form-group')
                        .addClass('has-error');
                },
                unhighlight: function (elem) {
                    $(elem)
                        .closest('.form-group')
                        .removeClass('has-error')
                }
            });

            $('#createNewProjectForm').validate();
        })();
    </script>

@endpush