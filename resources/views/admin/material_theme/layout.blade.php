<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PC.CMS - 1.0</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Poppins:300,400,500,600" rel="stylesheet">
    <link rel="icon" href="{{ asset('admin/material_theme/dist/img/favicon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ asset('admin/material_theme/dist/css/vendor.bundle.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/material_theme/dist/css/app.bundle.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/material_theme/dist/css/theme-h.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @stack('admin.head')
</head>

<body>
@include('admin.material_theme.components.preloader')
<div id="app_wrapper">
    @include('admin.material_theme.partials.top-navbar')
    @include('admin.material_theme.partials.aside-left')
    <section id="content_outer_wrapper">
        <div id="content_wrapper">
            <div id="header_wrapper" class="header-sm">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <header id="header">
                                <h1>@yield('module_name')</h1>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content" class="container-fluid">
                <div class="content-body">
                    @include('admin.material_theme.components.alert')
                    @include('admin.material_theme.components.forms.validation')
                    @include('admin.material_theme.components.loader-async')
                    @yield('content')
                    <!-- ENDS $dashboard_content -->
                </div>
            </div>
            <!-- ENDS $content -->
        </div>
        @include('admin.material_theme.partials.footer')
    </section>
</div>
<script src="{{ asset('tinymce/js/tinymce/tinymce.min.js') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('admin/material_theme/dist/js/vendor.bundle.js') }}"></script>
<script src="{{ asset('admin/material_theme/dist/js/app.bundle.js') }}"></script>
@stack('admin.footer')
</body>

</html>

