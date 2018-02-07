<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    {{--<title>Przemysław Chudziński | Portfolio</title>--}}
    @yield('meta_title')
    @yield('meta_description')
    @yield('meta_robots')
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('themes/css/main.min.css') }}">
    @stack('head')
</head>
<body>
@include('themes.PortfolioTheme.components.navigation')

@yield('content')


@include('themes.PortfolioTheme.components.contact-form')
@include('themes.PortfolioTheme.components.footer')

@include('themes.PortfolioTheme.components.mega-menu')

<!-- Scripts -->
<script src="{{ asset('themes/js/dist/app.js') }}"></script>
@stack('footer')
</body>
</html>
