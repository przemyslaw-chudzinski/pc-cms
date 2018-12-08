@extends('admin.material_theme.layout')

@section('module_name')
    Project categories
@endsection

@section('content')

    <?php
    $module_name = 'project_categories';
    ?>

    <div class="row">
        {!! Form::open([
                        'method' => 'put',
                        'route' => [getRouteName($module_name, 'update'), $category->id],
                        'id' => 'editProjectCategoryForm',
                        'novalidate' => 'novalidate',
                        'files' => true
                    ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New project category</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Category name') !!}
                        {!! Form::text('name', $category->name, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Category slug') !!}
                        {!! Form::text('slug', $category->slug, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Description') !!}
                        {!! Form::textarea('description', $category->description, ['class' => 'form-control pc-cms-editor']) !!}
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

                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#editProjectCategoryForm">Save</button>
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
                                    'id' => 'projectCategoryThumbnail',
                                    'label' => 'Thumbnail',
                                    'placeholder' => 'Choose category image',
                                    'previewContainerId' => 'projectCategoryThumbnailPreview',
                                    'multiple' => false,
                                    'editState' => true,
                                    'image' => $category->thumbnail,
                                    'dir' => 'projectCategories',
                                    'noImageInputName' => 'noImage'
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

            $('#editProjectCategoryForm').validate();
        })();
    </script>

@endpush
