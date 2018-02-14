<!-- Banner -->
<section class="pc-banner pc-banner-page" data-image-src="{{ getImageUrl(json_decode($page->thumbnail, true), null) }}">
    <div class="pc-banner-content">
        <div class="container">
            <h3 class="text-uppercase text-center pc-banner-content-header animated slideInRight">{{ $page->title }}</h3>
        </div>
    </div>
</section>