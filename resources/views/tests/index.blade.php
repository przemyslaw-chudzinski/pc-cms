<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Feature tests</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>

<div class="container">
    <h2>Segments</h2>
    <hr>
    <div class="card mb-4">
        <div class="card-body">
            {!! Segment::getContent('text-1') !!}
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-body">
            {!! Segment::getDescription('text-1') !!}
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-body">
            {!! Segment::getImage('text-1', 'admin_prev_medium', 'http://placehold.it/400x300') !!}
        </div>
    </div>
    <h2>Settings</h2>
    <hr>
    <div class="card mb-4">
        <div class="card-body">
            {!! Setting::get('site_title') !!}
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-body">
            {!! Setting::get('site_description', 'default value') !!}
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-body">
            {!! Setting::get('maintenance_mode', 'default value') !!}
        </div>
    </div>
    <h2>Menu</h2>
    <div class="card">
        <div class="card-body">
            {!! Menu::render('main-menu', 'tests.menu') !!}
        </div>
    </div>
</div>



</body>
</html>
