@php
    $module_name = Project::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Projects
@endsection

@section('extra-navigation')
    <div class="tabpanel">
        <ul class="nav nav-tabs">
            <li class="{{ setActiveClass([getRouteName($module_name, 'edit')]) }}"><a href="{{ getRouteUrl($module_name, 'edit', ['id' => $project]) }}">Edit</a></li>
            <li class="{{ setActiveClass([getRouteName($module_name, 'images')]) }}"><a href="{{ getRouteUrl($module_name, 'images', ['id' => $project]) }}">Images</a></li>
            <li role="presentation"><a href="#tab-3" data-toggle="tab" aria-expanded="true">Comments</a></li>
        </ul>
    </div>
@endsection

@section('edit-content')

    <div class="row">
        {!! Form::open([
            'method' => 'put',
            'route' => [getRouteName($module_name, 'update'), $project->id],
            'id' => 'editProjectForm',
            'novalidate' => 'novalidate',
            'files' => true
        ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Edit - {{ $project->title }}</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Project title') !!}
                        {!! Form::text('title', $project->title, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        @include('admin::components.forms.slugField', ['route' => url(route('ajax.projects.updateSlug', $project->id)), 'value' => $project->slug])
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Project content') !!}
                        {!! Form::textarea('content', $project->content, ['class' => 'form-control pc-cms-editor']) !!}
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
                                        <input type="checkbox" name="saveAndPublish" @if($project->published) checked @endif> Save and publish
                                    </label>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#editProjectForm">Save</button>
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
                                            <option
                                                    value="{{ $category->id }}"
                                                    @if (count($project->getCategoryIdsAttribute()) > 0)
                                                        @foreach($project->getCategoryIdsAttribute() as $category_id)
                                                            @if ($category->id === $category_id)
                                                                selected
                                                            @endif
                                                        @endforeach
                                                    @endif
                                            >{{ $category->name }}</option>
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
                    @include('admin::components.forms.seo', ['allow' => $project->allow_indexed, 'meta_title' => $project->meta_title, 'meta_description' => $project->meta_description])
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

            $('#editProjectForm').validate();
        })();
    </script>

@endpush
