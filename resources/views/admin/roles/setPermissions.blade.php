@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Set permissions for - ' . $role->display_name
    ])

    @include('admin.components.alert')

    @if (count(config('admin.modules')) > 0)
        @foreach(config('admin.modules') as $key => $module)
            <h4>{{ isset($module['name']) ? $module['name'] : 'No module title' }}</h4>
            <hr>
            @if (count($module['actions']) > 0)
                @foreach($module['actions'] as $name => $action)
                    <div class="form-group">
                        <label>
                            {!! Form::checkbox('', null, null, [
                            'class' => 'pc-cms-permission-checkbox',
                            'data-module-name' => $key,
                            'data-route' => $action['route_name']
                            ]) !!} {{ $action['display_name'] }}
                        </label>
                    </div>
                @endforeach
            @endif
        @endforeach
    @endif

    {!! Form::open(['method' => 'put', 'route' => ['admin.users.roles.updatePermissions', $role->id]]) !!}
    {!! Form::text('permissions', $role->permissions, ['class' => 'hidden pc-cms-permissions']) !!}
    <button type="submit" class="btn btn-primary">Save</button>
    {!! Form::close() !!}

@endsection