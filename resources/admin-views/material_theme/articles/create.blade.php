@extends('admin.material_theme.layout')

@section('module_name')
    Articles
@endsection

@section('content')

    <?php
        $module_name = 'blog';
    ?>

    <div class="row">
        {!! Form::open([
          'method' => 'post',
          'route' => getRouteName($module_name, 'store'),
          'files' => true,
          'id' => 'createNewArticleForm',
          'novalidate' => 'novalidate'
          ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New article</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Article title') !!}
                        {!! Form::text('title', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Article slug') !!}
                        {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Article content') !!}
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
                                        <input name="saveAndPublish" type="checkbox" checked> Save and publish
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="allowComments" type="checkbox" checked> Allow comments
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createNewArticleForm">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                {!! Form::label(null, 'Choose categories') !!}
                                <select class="selectpicker form-control" multiple name="category_ids[]">
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
                                    'id' => 'articleThumbnail',
                                    'label' => 'Thumbnail',
                                    'previewContainerId' => 'blogThumbnailPreview',
                                    'placeholder' => 'Choose article thumbnail',
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

            $('#createNewArticleForm').validate();
        })();
    </script>

@endpush