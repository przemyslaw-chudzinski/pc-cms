@extends('admin::layout')

@section('module_name')
    Segments
@endsection

@section('content')

    <?php
        $module_name = 'segments';
    ?>

    <div class="row">
        {!! Form::open([
        'route' => getRouteName($module_name, 'store'),
        'method' => 'post',
        'id' => 'createNewSegmentForm',
        'novalidate' => 'novalidate',
        'files' => true
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New segment</h2>
                </header>
                <div class="card-body">

                        <div class="form-group">
                            {!! Form::label(null, 'Segment name') !!}
                            {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Segment content') !!}
                            {!! Form::textarea('content', null, ['class' => 'form-control pc-cms-editor']) !!}
                        </div>

                        <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createNewSegmentForm">Save</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    @include('admin::components.forms.uploadImage', [
                                    'filedName' => 'segmentImage',
                                    'id' => 'segmentImage',
                                    'label' => 'Image',
                                    'previewContainerId' => 'segmentImagePreview',
                                    'placeholder' => 'Choose additional image',
                                    'multiple' => false,
                                    'editState' => false
                                ])
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

            $('#createNewSegmentForm').validate();
        })();
    </script>

@endpush