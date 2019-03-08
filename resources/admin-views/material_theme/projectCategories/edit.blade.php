@php
    $module_name = ProjectCategory::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Project categories
@endsection

@section('extra-navigation')
    <div class="tabpanel">
        <ul class="nav nav-tabs">
            <li class="{{ setActiveClass([getRouteName($module_name, 'edit')]) }}"><a href="{{ getRouteUrl($module_name, 'edit', ['id' => $category->id]) }}">Edit</a></li>
            <li class="{{ setActiveClass([getRouteName($module_name, 'images')]) }}"><a href="{{ getRouteUrl($module_name, 'images', ['id' => $category->id]) }}">Images</a></li>
        </ul>
    </div>
@endsection

@section('edit-content')

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
                        @include('admin::components.forms.slugField', ['route' => url(route('ajax.projects.categories.updateSlug', $category->id)), 'value' => $category->slug])
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
