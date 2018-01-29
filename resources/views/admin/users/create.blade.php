@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new user'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            {!! Form::open(['method' => 'post', 'route' => 'admin.users.store']) !!}
            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                {!! Form::label(null, 'User name') !!}
                {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                @if ($errors->has('name'))
                    <span class="help-block">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                {!! Form::label(null, 'User email') !!}
                {!! Form::text('email', null, ['class' => 'form-control']) !!}
                @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                {!! Form::label(null, 'User password') !!}
                {!! Form::password('password', ['class' => 'form-control']) !!}
                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>

            <div class="{{ $errors->has('role_id') ? ' has-error' : '' }}">
                @include('admin.components.forms.selection', [
                    'label' => 'Role',
                    'multiple' => false,
                    'fieldName' => 'role_id',
                    'id' => 'roleId',
                    'editState' => false,
                    'selections' => $roles,
    'selectionName' => 'name',
    'excludeIds' => []
    ])
    @if ($errors->has('role_id'))
        <span class="help-block">
                    <strong>{{ $errors->first('role_id') }}</strong>
                </span>
        @endif
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        {!! Form::close() !!}
        </div>
        </div>

@endsection