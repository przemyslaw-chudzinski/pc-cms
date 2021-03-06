@php
    $module_name = Segment::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Segments
@endsection

@section('extra-navigation')
    <div class="tabpanel">
        <ul class="nav nav-tabs">
            <li class="{{ setActiveClass([getRouteName($module_name, 'edit')]) }}"><a href="{{ getRouteUrl($module_name, 'edit', ['id' => $segment]) }}">Edit</a></li>
            <li class="{{ setActiveClass([getRouteName($module_name, 'images')]) }}"><a href="{{ getRouteUrl($module_name, 'images', ['id' => $segment]) }}">Images</a></li>
        </ul>
    </div>
@endsection

@section('edit-content')

    <div class="row">
        {!! Form::open([
        'route' => [getRouteName($module_name, 'update'), $segment->id],
        'method' => 'put',
        'id' => 'editSegmentForm',
        'novalidate' => 'novalidate',
        'files' => true
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading ">
                    <h2 class="card-title">Edit - {{ $segment->key }}</h2>
                </header>
                <div class="card-body">

                    <div class="form-group">
                        {!! Form::label(null, 'Segment key') !!}
                        {!! Form::text('key', $segment->key, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Segment content') !!}
                        {!! Form::textarea('content', $segment->content, ['class' => 'form-control pc-cms-editor']) !!}
                    </div>

                </div>
            </div>
        </div>

        <div class="col-xs-12 col-md-4">
            <div class="card">
                <div class="card-body">

                    <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#editSegmentForm">Save</button>

                    <div class="form-group">
                        {!! Form::label(null, 'Description') !!}
                        {!! Form::textarea('description', $segment->description, ['class' => 'form-control', 'placeholder' => 'Write description about this segment']) !!}
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

            $('#editSegmentForm').validate();
        })();
    </script>

@endpush
