<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="generator" content="PC.CMS - 1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PC.CMS - 1.0</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    {{--<script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script> --}}{{-- Tmp --}}
</head>
<body>

@include('admin.components.navigation')

<section class="pc-cms-content-wrapper">
    <div class="container">
        @yield('content')
    </div>
</section>

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>