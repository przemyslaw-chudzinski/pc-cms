@extends('admin.bootstrap_theme.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Edit menu - ' . $menu->name
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
                {!! Form::open(['method' => 'put', 'url' => url(config('admin.admin_path') . '/menus/' . $menu->id)]) !!}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Menu name') !!}
                    {!! Form::text('name', $menu->name, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Menu slug') !!}
                    {!! Form::text('slug', $menu->slug, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    @if ($errors->has('slug'))
                        <span class="help-block">
                            <strong>{{ $errors->first('slug') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.checkbox', [
                    'label' => 'Do you want to generate new slug based on menu name?',
                    'fieldName' => 'generateSlug',
                    'checked' => false
                ])

                <div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Description') !!}
                    {!! Form::textarea('description', $menu->description, ['class' => 'form-control', 'rows' => 5]) !!}
                    @if ($errors->has('description'))
                        <span class="help-block">
                            <strong>{{ $errors->first('description') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.checkbox', [
                    'fieldName' => 'saveAndPublished',
                    'checked' => $menu->published,
                    'label' => 'Save and published'
                ])

                <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#">Save</button>
                {!! Form::close() !!}
        </div>
    </div>

@endsection