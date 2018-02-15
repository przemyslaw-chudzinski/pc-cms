@extends('themes.PortfolioTheme.layout')

@section('meta_title')
    {!! Theme::getMetaTitle() !!}
@endsection

@section('meta_description')
    {!! Theme::getMetaDescription() !!}
@endsection

@section('meta_robots')
    {!! Theme::getMetaRobots() !!}
@endsection

@section('content')
    <!-- Banner -->
    <section class="pc-banner pc-banner-page" data-image-src="{{ getImageUrl(json_decode($category->thumbnail, true), 'blog_thumbnail') }}">
        <div class="pc-banner-content">
            <div class="container">
                <h3 class="text-uppercase text-center pc-banner-content-header animated slideInRight">
                    Artykuły dla {{ $category->name }}
                </h3>
            </div>
        </div>
    </section>

    <section class="pc-section pc-contact-page">
        <div class="container">
            <div class="row">
                @if (count($category->articles) > 0)
                    @foreach($category->articles as $article)
                        <div class="col-md-6 col-lg-4 mb-4 pc-blog-single">
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
@endsection