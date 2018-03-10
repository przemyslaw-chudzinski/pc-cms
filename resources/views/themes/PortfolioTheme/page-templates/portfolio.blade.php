@extends('themes.PortfolioTheme.layout-portfolio')

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

    lista projetków z mojego portfolio

@endsection