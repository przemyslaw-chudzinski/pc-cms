<aside id="app_sidebar-left">
    <nav id="app_main-menu-wrapper" class="scrollbar">
        <div class="sidebar-inner sidebar-push">
            <div class="card profile-menu" id="profile-menu">
                <header class="card-heading card-img alt-heading">
                    <div class="profile">
                        <header class="card-heading card-background" id="card_img_02">
                            <img src="{{ asset('admin/material_theme/dist/img/profiles/18.jpg') }}" alt="" class="img-circle max-w-75 mCS_img_loaded">
                        </header>
                        <a href="javascript:void(0)" class="info" data-profile="open-menu"><span>{{ Auth::user()->email }}</span></a>
                    </div>
                </header>
                <ul class="submenu">
                    <li>
                        <a href="{{ route('admin.account_settings.index') }}"><i class="zmdi zmdi-settings"></i> Account Settings</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.logout') }}"><i class="zmdi zmdi-sign-in"></i> Sign Out</a>
                    </li>
                </ul>
            </div>
            <ul class="nav nav-pills nav-stacked">
                <li class="sidebar-header">NAVIGATION</li>
                <li class="active"><a href="{{ route(config('admin.modules.dashboard.actions.index.route_name')) }}"><i class="zmdi zmdi-view-dashboard"></i>Dashboard</a></li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Segments</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.segments.actions.index.route_name')) }}">All segments</a></li>
                        <li><a href="{{ route(config('admin.modules.segments.actions.create.route_name')) }}">New segment</a></li>
                    </ul>
                </li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Users</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.users.actions.index.route_name')) }}">All users</a></li>
                        <li><a href="{{ route(config('admin.modules.users.actions.create.route_name')) }}">New user</a></li>
                        <li><a href="{{ route(config('admin.modules.roles.actions.index.route_name')) }}">All roles</a></li>
                        <li><a href="{{ route(config('admin.modules.roles.actions.create.route_name')) }}">New role</a></li>
                    </ul>
                </li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Articles</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.blog.actions.index.route_name')) }}">All articles</a></li>
                        <li><a href="{{ route(config('admin.modules.blog.actions.create.route_name')) }}">New article</a></li>
                        <li><a href="{{ route(config('admin.modules.blog_categories.actions.index.route_name')) }}">All categories</a></li>
                        <li><a href="{{ route(config('admin.modules.blog_categories.actions.create.route_name')) }}">New category</a></li>
                    </ul>
                </li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Projects</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.projects.actions.index.route_name')) }}">All projects</a></li>
                        <li><a href="{{ route(config('admin.modules.projects.actions.create.route_name')) }}">New project</a></li>
                        <li><a href="{{ route(config('admin.modules.project_categories.actions.index.route_name')) }}">All categories</a></li>
                        <li><a href="{{ route(config('admin.modules.project_categories.actions.create.route_name')) }}">New category</a></li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route(config('admin.modules.settings.actions.index.route_name')) }}"><i class="zmdi zmdi-widgets"></i>Settings</a>
                </li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Menus</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.menus.actions.index.route_name')) }}">All menus</a></li>
                        <li><a href="{{ route(config('admin.modules.menus.actions.create.route_name')) }}">New menu</a></li>
                    </ul>
                </li>
                <li class="nav-dropdown"><a href="#"><i class="zmdi zmdi-widgets"></i>Pages</a>
                    <ul class="nav-sub">
                        <li><a href="{{ route(config('admin.modules.pages.actions.index.route_name')) }}">All pages</a></li>
                        <li><a href="{{ route(config('admin.modules.pages.actions.create.route_name')) }}">New page</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</aside>