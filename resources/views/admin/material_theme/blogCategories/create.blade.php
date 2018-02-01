@extends('admin.material_theme.layout')

@section('module_name')
    Blog categories
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        {!! Form::open([
            'method' => 'post',
            'route' => config('admin.modules.blog_categories.actions.store.route_name'),
            'files' => true,
            'id' => 'createBlogCategoryForm',
            'novalidate' => 'novalidate'
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New category</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Category name') !!}
                        {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Category slug') !!}
                        {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Description') !!}
                        {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
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
                                        <input name="saveAndPublish" type="checkbox" checked> Save and publish
                                    </label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                {!! Form::label(null, 'Parent category') !!}
                                <select name="parent_id" class="select form-control">
                                    <option></option>
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
                                    'id' => 'categoryThumbnail',
                                    'label' => 'Thumbnail',
                                    'placeholder' => 'Choose category image',
                                    'previewContainerId' => 'categoryThumbnailPreview',
                                    'multiple' => false,
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

            $('#createBlogCategoryForm').validate();
        })();
    </script>

@endpush