<!-- Mega menu -->
<div class="pc-megaMenu">
    <a href="#" class="pc-close-megaMenu-btn"><span class="fa fa-times"></span></a>
    <div class="row">
        <div class="d-none d-lg-block col pl-0 pr-0 pc-megaMenu-left">
            <div class="pc-megaMenu-left-inner">
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-home active" data-bg="{{ asset('themes/images/banner-bg.jpg') }}" id="home"></div>
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-about" data-bg="{{ asset('themes/images/about-bg.jpg') }}" id="about"></div>
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-portfolio" data-bg="{{ asset('themes/images/portfolio-bg.jpg') }}" id="portfolio"></div>
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-blog" data-bg="{{ asset('themes/images/blog-bg.jpg') }}" id="blog"></div>
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-cooperation" data-bg="{{ asset('themes/images/cooperate-bg.jpg') }}" id="cooperation"></div>
                <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-contact" data-bg="{{ asset('themes/images/contact-bg.jpg') }}" id="contact">contact</div>
            </div>
        </div>
        <div class="col pl-0 pr-0 pc-megaMenu-right">
            <div class="d-flex justify-content-center align-items-center pc-megaMenu-right-inner">
                {!! Theme::menu('themes.PortfolioTheme.components.main-menu', 'main-menu') !!}
            </div>
        </div>
    </div>
</div>