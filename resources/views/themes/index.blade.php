@extends('themes.layout')

@section('content')
    @include('themes.components.banner')
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
    @include('themes.components.blog')
    @include('themes.components.portfolio')
@endsection