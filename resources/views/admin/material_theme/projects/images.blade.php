@extends('admin.material_theme.layout')

@section('module_name')
    Projects
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    @include('admin.material_theme.components.loader-async')

    <div class="row">
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Images</h2>
                </header>
                <div class="card-body">
                    @if ($project->images)
                        <div class="row">
                            @foreach(json_decode($project->images, true) as $key => $img)
                                <div class="col-xs-4 m-b-10">
                                    <img class="img-responsive img-thumbnail" src="{{ getImageUrl($img, 'admin_prev_medium') }}" alt="">
                                    <div>
                                        {!! Form::open([
                                            'id' => 'remove-image-form-' .$key,
                                            'method' => 'put',
                                            'route' => [getRouteName('projects', 'images_destroy'), $project->id]
                                        ]) !!}
                                        {!! Form::hidden('image', $img['original']) !!}
                                        {!! Form::close() !!}
                                        <a href="#" class="btn btn-danger btn-xs pc-cms-send-form" data-form="#remove-image-form-{{ $key }}">Remove</a>
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
                        'route' => [getRouteName('projects', 'images_add'), $project->id],
                        'method' => 'put'
                    ]) !!}
                    <div class="form-group">
                        @include('admin.material_theme.components.forms.uploadImage', [
                            'filedName' => 'image',
                            'id' => 'projectImage',
                            'label' => 'Add new image',
                            'placeholder' => 'Choose project additional image',
                            'previewContainerId' => 'projectImagePreview',
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