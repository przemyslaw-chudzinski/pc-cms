<header id="app_topnavbar-wrapper">
    <nav role="navigation" class="navbar topnavbar">
        <div class="nav-wrapper">
            <div id="logo_wrapper" class="nav navbar-nav">
                <ul>
                    <li class="logo-icon">
                        <a href="index.html">
                            <div class="logo">
                                <img src="{{ asset('admin/material_theme/dist/img/logo/logo-icon.png') }}" alt="Logo">
                            </div>
                            <h1 class="brand-text">PC.CMS - 1.0</h1>
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="nav navbar-nav left-menu ">
                <li class="menu-icon">
                    <a href="javascript:void(0)" role="button" data-toggle-state="app_sidebar-menu-collapsed" data-key="leftSideBar">
                        <i class="mdi mdi-backburger"></i>
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav left-menu">
                <li>
                    <a href="javascript:void(0)" class="nav-link" data-toggle-profile="profile-open">
                        <i class="zmdi zmdi-account"></i>
                    </a>
                </li>
                @include('admin.material_theme.partials.top-navbar-boxed-menu')
            </ul>
            <ul class="nav navbar-nav pull-right">

                @include('admin.material_theme.partials.top-navbar-languages')

                @include('admin.material_theme.partials.top-navbar-notifications')
            </ul>
        </div>
    </nav>
</header>