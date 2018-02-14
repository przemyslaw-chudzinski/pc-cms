<!-- Blog  -->
<section class="pc-section pc-blog-front-page">
    <div class="wow fadeIn container text-center pc-section-header-2-wrapper">
        <h3 class="text-uppercase pc-section-header-2">{!! Segment::get('front-blog-header') !!}</h3>
        <div class="row">
            <div class="col-lg-7">
                <span class="d-block text-xs-center text-lg-right pc-section-header-2-subheader">{!! Segment::get('front-blog-subheader') !!}</span>
            </div>
            <div class="col-lg-5 text-xs-center text-lg-left">
                <a href="#" class="btn pc-button-primary"><span>Zobacz więcej</span></a>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row pc-blog-front-page-row">
            @if (count($articles) > 0)
                @foreach($articles as $article)
                    <div class="col-md-6 col-lg-3 pc-blog-single">
                        <div class="pc-blog-single-inner">
                            <a href="{{ url('blog/' . $article->slug) }}">
                                @if ($article->thumbnail)
                                    <img class="img-fluid" src="{{ getImageUrl(json_decode($article->thumbnail, true), 'blog_thumbnail') }}" alt="">
                                @endif
                                <div class="pc-blog-single-inner-overlay">
                                    <div class="d-flex justify-content-center align-items-center text-center pc-blog-single-inner-overlay-inner">
                                        <div>
                                            <h4>{{ $article->title }}</h4>
                                            <time>{{ $article->created_at }}</time>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>
</section>