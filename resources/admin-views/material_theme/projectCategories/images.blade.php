@php
    $module_name = ProjectCategory::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Project Categories - Images
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
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Images</h2>
                </header>
                <div class="card-body">
                    @if ($category->images)
                        <div class="row">
                            @foreach($category->images as $image)
                                {!! Form::open([
                                            'id' => 'remove-image-form-' . $category->id,
                                            'method' => 'put',
                                            'route' => [getRouteName($module_name, 'images_destroy'), $category->id]
                                        ]) !!}
                                {!! Form::hidden('imageID', $image->_id) !!}
                                {!! Form::close() !!}
                                <div class="col-xs-4 m-b-10">
                                    <div class="card image-over-card m-t-30">
                                        <div class="card-image">
                                            <a href="javascript:void(0)">
                                                <img src="{{ $image->sizes->admin_prev_medium->url }}" alt="">
                                            </a>
                                        </div>
                                        <div class="card-body">
                                            <div class="text-center">
                                                <a href="javascript:void(0)" class="btn btn-danger btn-xs pc-cms-send-form" data-form="#remove-image-form-{{ $category->id }}">Remove</a>
                                            </div>
                                            <h4 class="card-title text-center">{{ $image->file_name }}</h4>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-4">
            <div class="card">
                <div class="card-body">

                    {!! Form::open([
                        'files' => true,
                        'route' => [getRouteName($module_name, 'images_add'), $category->id],
                        'method' => 'put'
                    ]) !!}
                    <div class="form-group">
                        @include('admin::components.forms.uploadImage', [
                            'filedName' => 'images',
                            'id' => 'categoryImage',
                            'label' => 'Add new image',
                            'placeholder' => 'Choose category additional image',
                            'previewContainerId' => 'categoryImagePreview',
                            'multiple' => false,
                            'editState' => false
                        ])
                    </div>
                    <button type="submit" class="btn btn-primary pc-cms-loader-btn">Save</button>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
