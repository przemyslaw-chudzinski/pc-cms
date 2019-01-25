@extends('themes.PortfolioTheme.layout')

@section('meta_title')
    {!! Theme::getMetaTitle($page->meta_title) !!}
@endsection

@section('meta_description')
    {!! Theme::getMetaDescription($page->meta_description) !!}
@endsection

@section('meta_robots')
    {!! Theme::getMetaRobots($page->allow_indexed) !!}
@endsection

@section('content')
    @include('themes.PortfolioTheme.components.page-banner')
    @include('themes.PortfolioTheme.components.blog-categories-list')
    <section class="pc-section pc-contact-page">
        <div class="container">
            <div class="row">
                @if (count($articles) > 0)
                    @foreach($articles as $article)
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
