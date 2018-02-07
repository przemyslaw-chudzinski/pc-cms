<!-- Banner -->
<section class="pc-banner" data-image-src="{{ asset('themes/images/banner-bg.jpg') }}">
    <div class="pc-banner-content">
        <div class="container">
            <span class="d-block text-uppercase text-center pc-banner-content-subheader animated slideInLeft">{!! Segment::get('banner-subheader') !!}</span>
            <h3 class="text-uppercase text-center pc-banner-content-header animated slideInRight">{!! Segment::get('banner-header') !!}</h3>
        </div>
    </div>
    <div class="pc-arrow-down">
        <span class="fa fa-angle-double-down"></span>
    </div>
</section>