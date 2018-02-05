@extends('admin.material_theme.layout')

@section('module_name')
    Pages
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        {!! Form::open([
            'method' => 'post',
            'route' => config('admin.modules.pages.actions.store.route_name'),
            'id' => 'newPageForm',
            'files' => true
        ]) !!}
            <div class="col-xs-12 col-md-8">
                <div class="card">
                    <header class="card-heading">
                        <h2 class="card-title">New page</h2>
                    </header>
                    <div class="card-body">

                        <div class="form-group">
                            {!! Form::label(null, 'Page title') !!}
                            {!! Form::text('title', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Page slug') !!}
                            {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Page content') !!}
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
                                <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#newPageForm">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="card">
                            <div class="card-body">
                                @include('admin.material_theme.components.forms.uploadImage', [
                                    'filedName' => 'imageThumbnail',
                                    'id' => 'pageThumbnail',
                                    'label' => 'Thumbnail',
                                    'placeholder' => 'Choose page image',
                                    'previewContainerId' => 'pageThumbnailPreview',
                                    'multiple' => false,
                                    'editState' => false
                                ])
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Choose page template</label>
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

            $('#newPageForm').validate({
                rules: {
                    title: "required"
                }
            });
        })();
    </script>

@endpush