@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new role'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            {!! Form::open(['method' => 'put', 'route' => ['admin.users.roles.update', $role->id]]) !!}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="segmentName">Role name</label>
                    <input id="segmentName" name="name" type="text" class="form-control" autocomplete="off" value="{{ $role->name }}">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Display name') !!}
                    {!! Form::text('display_name', $role->display_name, ['class' => 'form-control']) !!}
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'segmentContent',
                    'fieldName' => 'description',
                    'editState' => true,
                    'label' => 'Description',
                    'value' => $role->description
                ])

                <button type="submit" class="btn btn-primary">Save</button>
            {!! Form::close() !!}
        </div>
    </div>

@endsection