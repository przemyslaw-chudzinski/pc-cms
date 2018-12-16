@extends('admin::layout')

@section('module_name')
    Pages
@endsection

@section('content')

    <?php
    $module_name = 'pages';
    ?>

    <div class="row">
        {!! Form::open([
            'method' => 'put',
            'route' => [getRouteName($module_name, 'update'), $page->id],
            'id' => 'editPageForm',
            'files' => true
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Edit - {{ $page->title }}</h2>
                </header>
                <div class="card-body">

                    <div class="form-group">
                        {!! Form::label(null, 'Page title') !!}
                        {!! Form::text('title', $page->title, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Page slug') !!}
                        {!! Form::text('slug', $page->slug, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    {{--<div class="form-group">--}}
                        {{--<div class="checkbox">--}}
                            {{--<label>--}}
                                {{--<input type="checkbox" name="generateSlug"> Do you want to generate new slug based on page title?--}}
                            {{--</label>--}}
                        {{--</div>--}}
                    {{--</div>--}}

                    <div class="form-group">
                        {!! Form::label(null, 'Page content') !!}
                        {!! Form::textarea('content', $page->content, ['class' => 'form-control pc-cms-editor']) !!}
                    </div>

                    <div class="form-group">
                        @include('admin::components.forms.seo', ['allow' => $page->allow_indexed, 'meta_title' => $page->meta_title, 'meta_description' => $page->meta_description])
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
                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#editPageForm">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            @include('admin::components.forms.uploadImage', [
                                'filedName' => 'imageThumbnail',
                                'id' => 'pageThumbnail',
                                'label' => 'Thumbnail',
                                'placeholder' => 'Choose page image',
                                'previewContainerId' => 'pageThumbnailPreview',
                                'editState' => true,
                                'files' => $page->getFilesFrom('thumbnail'),
                                'dir' => 'pages',
                                'noFileInputName' => 'noImage'
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
                                {!! Form::label(null, 'Choose page template') !!}
                                <select name="template" class="form-control select">
                                    @if (count($pageTemplates) > 0)
                                        <option></option>
                                        @foreach($pageTemplates as $template)
                                            @if ($template !== 'default')
                                                <option
                                                        value="{{ $template }}"
                                                        @if ($page->template === $template)
                                                            selected
                                                        @endif
                                                >{{ $template }}</option>
                                            @endif
                                        @endforeach
                                    @endif
                                </select>
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

            $('#editPageForm').validate({
                rules: {
                    title: "required"
                }
            });
        })();
    </script>

@endpush