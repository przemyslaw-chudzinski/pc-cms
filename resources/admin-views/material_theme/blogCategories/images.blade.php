@php
    $module_name = BlogCategory::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Blog Categories - Images
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
                                @include('admin::components.image', [
                                'image' => $image,
                                'removeRoute' => route('ajax.articles.categories.removeImage', $category->id),
                                'selectRoute' => route('ajax.articles.categories.selectImage', $category->id),
                                ])
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
