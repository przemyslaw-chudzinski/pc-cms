@php
    $module_name = Blog::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Articles - images
@endsection

@section('extra-navigation')
    <div class="tabpanel">
        <ul class="nav nav-tabs">
            <li class="{{ setActiveClass([getRouteName($module_name, 'edit')]) }}"><a href="{{ getRouteUrl($module_name, 'edit', [$article]) }}">Edit</a></li>
            <li class="{{ setActiveClass([getRouteName($module_name, 'images')]) }}"><a href="{{ getRouteUrl($module_name, 'images', [$article]) }}">Images</a></li>
            <li><a href="#tab-3">Comments</a></li>
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
                    @if ($article->images)
                        <div class="row">
                            @foreach($article->images as $image)
                                @include('admin::components.image', [
                               'image' => $image,
                               'removeRoute' => route('ajax.articles.removeImage', $article->id),
                               'selectRoute' => route('ajax.articles.selectImage', $article->id),
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
                        'route' => [getRouteName($module_name, 'images_add'), $article->id],
                        'method' => 'put'
                    ]) !!}
                    <div class="form-group">
                        @include('admin::components.forms.uploadImage', [
                            'filedName' => 'images',
                            'id' => 'articleImage',
                            'label' => 'Add new image',
                            'placeholder' => 'Choose article additional image',
                            'previewContainerId' => 'articleImagePreview',
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
