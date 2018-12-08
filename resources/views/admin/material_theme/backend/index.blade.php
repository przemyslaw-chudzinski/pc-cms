@extends('admin.material_theme.layout')

@section('module_name')
    Dashboard
@endsection

@section('content')

    <div class="row">
        @include('admin.material_theme.components.widgets.hello-wgt')
        @include('admin.material_theme.components.widgets.last-registered-users-wgt')
        @include('admin.material_theme.components.widgets.last-login-wgt')
    </div>

@endsection