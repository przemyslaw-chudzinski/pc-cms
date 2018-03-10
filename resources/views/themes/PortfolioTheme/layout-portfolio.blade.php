<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    @yield('meta_title')
    @yield('meta_description')
    @yield('meta_robots')
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('themes/css/main.css') }}">
    @stack('head')
</head>
<body>

@yield('content')





<!-- Scripts -->
<script src="{{ asset('themes/js/dist/app.js') }}"></script>
@stack('footer')
</body>
</html>
