@php
    $module_name = Role::getModuleName();
@endphp

@extends('admin::layout')

@section('module_name')
    Roles
@endsection

@section('content')

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading ">
                    <h2 class="card-title">Set permissions for {{ $role->display_name }}</h2>
                </header>
                <div class="card-body">
                    @if (count(config('admin.modules')) > 0)
                        @foreach(config('admin.modules') as $key => $module)
                            <h4>{{ isset($module['name']) ? $module['name'] : 'No module title' }}</h4>
                            <hr>
                            @if (count($module['actions']) > 0)
                                @foreach($module['actions'] as $name => $action)
                                    <div>
                                        <div class="checkbox">
                                            <label>
                                                {!! Form::checkbox('', null, null, [
                                                    'class' => 'pc-cms-permission-checkbox',
                                                    'data-module-name' => $key,
                                                    'data-route' => $action['route_name']])
                                                !!} {{ $action['display_name'] }}
                                            </label>
                                        </div>
                                    </div>
                                @endforeach
                            @endif
                        @endforeach
                    @endif
                        {!! Form::open([
                         'method' => 'put',
                         'route' => [getRouteName($module_name, 'permission_update_permission'), $role->id],
                         'id' => 'savePermissionsForm'
                         ]) !!}
                        {!! Form::text('permissions', $role->permissions, ['class' => 'hidden pc-cms-permissions']) !!}
                        <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#savePermissionsForm">Save</button>
                        {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>

@endsection
