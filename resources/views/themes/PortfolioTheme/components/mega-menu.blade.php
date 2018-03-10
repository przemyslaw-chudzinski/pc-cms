<!-- Mega menu -->
<div class="pc-megaMenu">
    <a href="#" class="pc-close-megaMenu-btn"><span class="fa fa-times"></span></a>
    <div class="row">
        <div class="d-none d-lg-block col pl-0 pr-0 pc-megaMenu-left">
            <div class="pc-megaMenu-left-inner">
                {!! Theme::menu('themes.PortfolioTheme.components.menu-items-bg', 'main-menu') !!}
            </div>
        </div>
        <div class="col pl-0 pr-0 pc-megaMenu-right">
            <div class="d-flex justify-content-center align-items-center pc-megaMenu-right-inner">
                {!! Theme::menu('themes.PortfolioTheme.components.main-menu', 'main-menu') !!}
            </div>
        </div>
    </div>
</div>