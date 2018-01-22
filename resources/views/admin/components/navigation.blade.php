<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">PC.CMS - 1.0</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Dashboard <span class="sr-only">(current)</span></a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Segments <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url(config('admin.admin_path') . '/segments') }}">All segments</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/segments/create') }}">New segment</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Articles <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url(config('admin.admin_path') . '/articles') }}">All articles</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/articles/create') }}">New article</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/articles/categories') }}">Categories</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/articles/categories/create') }}">New category</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Projects <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url(config('admin.admin_path') . '/projects') }}">All projects</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/projects/create') }}">New project</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/projects/categories') }}">Categories</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/projects/categories/create') }}">New Category</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="{{ url(config('admin.admin_path') . '/pages') }}">All pages</a></li>
                        <li><a href="{{ url(config('admin.admin_path') . '/pages/create') }}">New page</a></li>
                    </ul>
                </li>
                <li><a href="{{ url(config('admin.admin_path') . '/settings') }}">Settings</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Przemysław Chudziński <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Settings</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Log out</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>