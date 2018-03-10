@extends('themes.PortfolioTheme.layout')

@section('meta_title')
    {!! Theme::getMetaTitle($article->meta_title) !!}
@endsection

@section('meta_description')
    {!! Theme::getMetaDescription($article->meta_description) !!}
@endsection

@section('meta_robots')
    {!! Theme::getMetaRobots($article->allow_indexed) !!}
@endsection

@section('content')
    @include('themes.PortfolioTheme.components.page-banner', ['page' => $article])
    @include('themes.PortfolioTheme.components.blog-categories-list')

    <section class="pc-section pc-contact-page">
        <div class="container">
            @include('themes.PortfolioTheme.components.article-categories', ['categories' => $article->categories->all()])
            {!! $article->content !!}
        </div>
    </section>

@endsection