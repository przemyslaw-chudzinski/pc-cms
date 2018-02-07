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
    @include('themes.PortfolioTheme.components.banner')
    <!-- Welcome section -->
    <section class="pc-section pc-welcome-front-page">
        <div class="container">
            <h2 class="text-uppercase pc-section-header">Witam serdeczenie</h2>
            <div class="row">
                <div class="wow slideInLeft col-lg-9">
                    <div class="pc-about-front-page-content">
                        {!! Segment::get('welcome') !!}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- About front page -->
    <section class="pc-section pc-about-front-page">
        <div class="container">
            <h2 class="text-uppercase pc-section-header">Kim jestem</h2>
            <div class="row">
                <div class="wow slideInRight col-lg-9 offset-lg-3">
                    <div class="pc-about-front-page-content">
                        {!! Segment::get('about-me') !!}
                    </div>
                </div>
            </div>
        </div>
    </section>
    @include('themes.PortfolioTheme.components.blog')
    @include('themes.PortfolioTheme.components.portfolio')
@endsection