@extends('admin::layout')

@section('module_name')
    Dashboard
@endsection

@section('content')

    <div class="row">
        @include('admin::components.widgets.hello-wgt')
        @include('admin::components.widgets.last-registered-users-wgt')
        @include('admin::components.widgets.last-login-wgt')
    </div>

@endsection