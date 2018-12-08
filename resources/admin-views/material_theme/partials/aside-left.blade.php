<aside id="app_sidebar-left">
    <nav id="app_main-menu-wrapper" class="scrollbar">
        <div class="sidebar-inner sidebar-push">
            <div class="card profile-menu {{ setActiveClass(['admin.account_settings.index'], 'open') }}" id="profile-menu">
                <header class="card-heading card-img alt-heading">
                    <div class="profile">
                        <header class="card-heading card-background" id="card_img_02"></header>
                        <a href="javascript:void(0)" class="info" data-profile="open-menu"><span>{{ $user->email }}</span></a>
                    </div>
                </header>
                <ul class="submenu" style="display: {{ setActiveClass(['admin.account_settings.index'], 'block') }}">
                    <li class="{{ setActiveClass(['admin.account_settings.index'], 'active') }}">
                        <a href="{{ route('admin.account_settings.index') }}"><i class="zmdi zmdi-settings"></i> Account Settings</a>
                    </li>
                    <li>
                        <a href="{{ route('admin.logout') }}"><i class="zmdi zmdi-sign-in"></i> Sign Out</a>
                    </li>
                </ul>
            </div>
            <ul class="nav nav-pills nav-stacked">
                <li class="sidebar-header">NAVIGATION</li>
                <li class="{{ setActiveClass([getRouteName('dashboard', 'index')], 'active') }}"><a href="{{ route(getRouteName('dashboard', 'index')) }}"><i class="zmdi zmdi-view-dashboard"></i>Dashboard</a></li>
                {{-- Segments --}}
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('segments')], 'active open') }}"><a href="#"><i class="zmdi zmdi-widgets"></i>Segments</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('segments', 'index')], 'active') }}"><a href="{{ route(getRouteName('segments', 'index')) }}">All segments</a></li>
                        <li class="{{ setActiveClass([getRouteName('segments', 'create')], 'active') }}"><a href="{{ route(getRouteName('segments', 'create')) }}">New segment</a></li>
                    </ul>
                </li>
                {{-- Users --}}
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('users'), getModuleActions('roles')], 'active open') }}"><a href="#"><i class="zmdi zmdi-accounts"></i>Users</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('users', 'index')], 'active') }}"><a href="{{ route(getRouteName('users', 'index')) }}">All users</a></li>
                        <li class="{{ setActiveClass([getRouteName('users', 'create')], 'active') }}"><a href="{{ route(getRouteName('users', 'create')) }}">New user</a></li>
                        <li class="{{ setActiveClass([getRouteName('roles', 'index')], 'active') }}"><a href="{{ route(getRouteName('roles', 'index')) }}">All roles</a></li>
                        <li class="{{ setActiveClass([getRouteName('roles', 'create')], 'active') }}"><a href="{{ route(getRouteName('roles', 'create')) }}">New role</a></li>
                    </ul>
                </li>
                {{-- Blog --}}
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('blog'), getModuleActions('blog_categories')], 'active open') }}"><a href="#"><i class="zmdi zmdi-labels"></i>Articles</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('blog', 'index')], 'active') }}"><a href="{{ route(getRouteName('blog', 'index')) }}">All articles</a></li>
                        <li class="{{ setActiveClass([getRouteName('blog', 'create')], 'active') }}"><a href="{{ route(getRouteName('blog', 'create')) }}">New article</a></li>
                        <li class="{{ setActiveClass([getRouteName('blog_categories', 'index')], 'active') }}"><a href="{{ route(getRouteName('blog_categories', 'index')) }}">All categories</a></li>
                        <li class="{{ setActiveClass([getRouteName('blog_categories', 'create')], 'active') }}"><a href="{{ route(getRouteName('blog_categories', 'create')) }}">New category</a></li>
                    </ul>
                </li>
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('projects'), getModuleActions('project_categories')], 'active open') }}"><a href="#"><i class="zmdi zmdi-widgets"></i>Projects</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('projects', 'index')], 'active') }}"><a href="{{ route(getRouteName('projects', 'index')) }}">All projects</a></li>
                        <li class="{{ setActiveClass([getRouteName('projects', 'create')], 'active') }}"><a href="{{ route(getRouteName('projects', 'create')) }}">New project</a></li>
                        <li class="{{ setActiveClass([getRouteName('project_categories', 'index')], 'active') }}"><a href="{{ route(getRouteName('project_categories', 'index')) }}">All categories</a></li>
                        <li class="{{ setActiveClass([getRouteName('project_categories', 'create')]) }}"><a href="{{ route(getRouteName('project_categories', 'create')) }}">New category</a></li>
                    </ul>
                </li>
                {{-- Settings --}}
                <li class="{{ setActiveClassByActions([getModuleActions('settings')], 'active') }}"><a href="{{ route(getRouteName('settings', 'index')) }}"><i class="zmdi zmdi-settings"></i>Settings</a></li>
                {{-- Menus --}}
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('menus')], 'active open') }}"><a href="#"><i class="zmdi zmdi-menu"></i>Menus</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('menus', 'index')], 'active') }}"><a href="{{ route(getRouteName('menus', 'index')) }}">All menus</a></li>
                        <li class="{{ setActiveClass([getRouteName('menus', 'create')], 'active') }}"><a href="{{ route(getRouteName('menus', 'create')) }}">New menu</a></li>
                    </ul>
                </li>
                {{-- Pages --}}
                <li class="nav-dropdown {{ setActiveClassByActions([getModuleActions('pages')], 'active open') }}"><a href="#"><i class="zmdi zmdi-file"></i>Pages</a>
                    <ul class="nav-sub">
                        <li class="{{ setActiveClass([getRouteName('pages', 'index')], 'active') }}"><a href="{{ route(getRouteName('pages', 'index')) }}">All pages</a></li>
                        <li class="{{ setActiveClass([getRouteName('pages', 'create')], 'active') }}"><a href="{{ route(getRouteName('pages', 'create')) }}">New page</a></li>
                    </ul>
                </li>
                {{-- Themes --}}
                <li class="{{ setActiveClassByActions([getModuleActions('themes')], 'active open') }}"><a href="{{ route(getRouteName('themes', 'index')) }}"><i class="zmdi zmdi-file"></i>Themes</a></li>            </ul>
        </div>
    </nav>
</aside>