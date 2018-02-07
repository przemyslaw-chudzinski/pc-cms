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

    <section class="pc-section pc-contact-page">
        <div class="wow fadeIn container text-center pc-section-header-2-wrapper">
            <h3 class="text-uppercase pc-section-header-2">{{ $page->title }}</h3>
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <span class="d-block text-center pc-section-header-2-subheader">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br> Temporibus, repudiandae.</span>
                </div>
            </div>
        </div>
        <div class="container">
            {!! $page->content !!}
        </div>
    </section>

    {{--@include('themes.components.blog')--}}
    {{--@include('themes.components.portfolio')--}}
@endsection