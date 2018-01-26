@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new role'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            {!! Form::open(['method' => 'post', 'route' => 'admin.users.roles.store']) !!}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="segmentName">Role name</label>
                    <input id="segmentName" name="name" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Display name') !!}
                    {!! Form::text('display_name', null, ['class' => 'form-control']) !!}
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'segmentContent',
                    'fieldName' => 'description',
                    'editState' => false,
                    'label' => 'Description'
                ])

                <button type="submit" class="btn btn-primary">Save</button>
            {!! Form::close() !!}
        </div>
    </div>

@endsection