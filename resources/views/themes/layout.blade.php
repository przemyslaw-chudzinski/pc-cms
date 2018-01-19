<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Przemysław Chudziński | Portfolio</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('themes/css/main.min.css') }}">
</head>
<body>
@include('themes.components.navigation')

@yield('content')


@include('themes.components.contact-form')
@include('themes.components.footer')

@include('themes.components.mega-menu')

<!-- Scripts -->
<script src="{{ asset('themes/js/dist/app.js') }}"></script>
</body>
</html>
