@php
    $module_name = Blog::getModuleName();
@endphp

@extends('admin::edit-view-master')

@section('module_name')
    Articles
@endsection

@section('extra-navigation')
    <div class="tabpanel">
        <ul class="nav nav-tabs">
            <li class="{{ setActiveClass([getRouteName($module_name, 'edit')]) }}"><a href="{{ getRouteUrl($module_name, 'edit', ['id' => $article]) }}">Edit</a></li>
            <li class="{{ setActiveClass([getRouteName($module_name, 'images')]) }}"><a href="{{ getRouteUrl($module_name, 'images', ['id' => $article]) }}">Images</a></li>
            <li role="presentation"><a href="#tab-3" data-toggle="tab" aria-expanded="true">Comments</a></li>
        </ul>
    </div>
@endsection

@section('edit-content')

    <div class="row">
        {!! Form::open([
          'method' => 'put',
          'route' => [getRouteName($module_name, 'update'), $article->id],
          'files' => true,
          'id' => 'editArticleForm',
          'novalidate' => 'novalidate'
          ]) !!}
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Edit - {{ $article->title }}</h2>
                </header>
                <div class="card-body">
                    <div class="form-group">
                        {!! Form::label(null, 'Article title') !!}
                        {!! Form::text('title', $article->title, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                       @include('admin::components.forms.slugField', ['route' => url(route('ajax.articles.updateSlug', $article->id)), 'value' => $article->slug])
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Article content') !!}
                        {!! Form::textarea('content', $article->content, ['class' => 'form-control pc-cms-editor']) !!}
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
                                        <input name="saveAndPublish" type="checkbox" @if($article->published) checked @endif> Save and publish
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="allowComments" type="checkbox" @if($article->allow_comments) checked @endif> Allow comments
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#editArticleForm">Save</button>
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
                                <select class="form-control selectpicker" data-has-chips multiple name="category_ids[]">
                                    @if (count($categories) > 0)
                                        @foreach($categories as $category)
                                            <option
                                                    value="{{ $category->id }}"
                                                    @if (count($article->getCategoryIdsAttribute()) > 0)
                                                        @foreach($article->getCategoryIdsAttribute() as $category_id)
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
                    @include('admin::components.forms.seo', ['allow' => $article->allow_indexed, 'meta_title' => $article->meta_title, 'meta_description' => $article->meta_description])
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

            $('#editArticleForm').validate();
        })();
    </script>

@endpush
