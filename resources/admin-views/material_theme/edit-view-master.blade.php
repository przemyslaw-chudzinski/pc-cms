@extends('admin::layout')

@section('content')

    {{--@include('admin::partials.edit-navigation')--}}
    @yield('extra-navigation')

    <div class="divider"></div>

    @yield('edit-content')

@endsection
