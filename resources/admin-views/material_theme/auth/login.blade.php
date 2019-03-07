<!DOCTYPE html>
<html lang="{{ App::getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="generator" content="{{ env('APP_NAME') }}">
    <title>{{ env('APP_NAME') }}</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Poppins:300,400,500,600" rel="stylesheet">
    <link rel="icon" href="{{ asset('admin/material_theme/img/favicon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ adminAssets('css/vendor.bundle.css') }}">
    <link rel="stylesheet" href="{{ adminAssets('css/app.bundle.css') }}">
</head>
<body id="auth_wrapper" >
<div id="login_wrapper">

    <div id="login_content">
        <div class="logo">
            <img src="{{ adminAssets('img/logo/ml-logo.png') }}" alt="logo {{ env('APP_NAME') }}" class="logo-img">
        </div>
        <h1 class="login-title">@lang('auth.login_form_header')</h1>
        @if ($errors->count())
            <div class="alert alert-danger">{{ $errors->first() }}</div>
        @endif
        <div class="login-body">
            {!! Form::open(['route' => 'admin.login', 'method' => 'post']) !!}
                <div class="form-group label-floating">
                    <label class="control-label">Email</label>
                    {!! Form::text('email', null, ['class' => 'form-control']) !!}
                </div>
                <div class="form-group label-floating is-empty">
                    <label class="control-label">@lang('auth.login_form_password_label')</label>
                    {!! Form::password('password', ['class' => 'form-control']) !!}
                </div>
                <div class="checkbox inline-block">
                    <label>
                        <input type="checkbox" class="checkbox-inline" name="remember">
                        @lang('auth.login_form_checkbox_label')
                    </label>
                </div>
                <button type="submit" class="btn btn-info btn-block m-t-40">@lang('auth.login_form_submit_button')</button>
            {!! Form::close() !!}
        </div>
    </div>
</div>
{{-- Scripts --}}
<script src="{{ adminAssets('js/vendor.bundle.js') }}"></script>
<script src="{{ adminAssets('js/app.bundle.js') }}"></script>
</body>
</html>
