@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new menu'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
                {!! Form::open(['method' => 'post', 'url' => url(config('admin.admin_path') . '/menus')]) !!}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Menu name') !!}
                    {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group{{ $errors->has('slug') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Menu slug') !!}
                    {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    @if ($errors->has('slug'))
                        <span class="help-block">
                                <strong>{{ $errors->first('slug') }}</strong>
                            </span>
                    @endif
                </div>

                <div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
                    {!! Form::label(null, 'Description') !!}
                    {!! Form::textarea('description', null, ['class' => 'form-control', 'rows' => 5]) !!}
                    @if ($errors->has('description'))
                        <span class="help-block">
                            <strong>{{ $errors->first('description') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.checkbox', [
                    'fieldName' => 'published',
                    'checked' => true,
                    'label' => 'Save and published'
                ])

                <button type="submit" class="btn btn-primary">Save</button>
                {!! Form::close() !!}
        </div>
    </div>

@endsection