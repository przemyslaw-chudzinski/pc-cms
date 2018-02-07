@extends('admin.material_theme.layout')

@section('module_name')
    Themes
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    <div class="row">
        @if (count($themes) > 0)
            @foreach($themes as $key => $theme)
                <div class="col-xs-12 col-md-3">
                    <div class="card {{ $theme['dir'] === $currentTheme ? 'card-blue' : null}}">
                        <header class="card-heading">
                            <h2 class="card-title">{{ $theme['meta']->name }}</h2>
                            <p class="m-0">{{ $theme['meta']->description }}</p>
                            <p class="m-0"><strong>Author:</strong> {{ $theme['meta']->author }}</p>
                            <p class="m-b"><strong>Version:</strong> {{ $theme['meta']->version }}</p>
                        </header>
                        {{--<div class="card-body">--}}
                            {{--<div class="theme-screenshot">--}}
                                {{--<img class="img-responsive" src="http://placehold.it/400x300" alt="">--}}
                            {{--</div>--}}
                        {{--</div>--}}
                        <div class="card-footer border-top">
                            {!! Form::open([
                                'method' => 'put',
                                'route' => getRouteName('themes', 'update'),
                                'id' => 'updateThemeForm-' . $key
                            ]) !!}
                                {!! Form::hidden('value', $theme['dir']) !!}
                            {!! Form::close() !!}
                            <ul class="card-actions left-bottom">
                                <li>
                                    <a href="#" class="btn btn-default btn-flat pc-cms-send-form" data-form="#updateThemeForm-{{ $key }}">
                                        Set theme
                                    </a>
                                </li>
                            </ul>
                            <ul class="card-actions icons right-bottom">
                                {{--<li>--}}
                                    {{--<a href="javascript:void(0)">--}}
                                        {{--<i class="zmdi zmdi-delete"></i>--}}
                                    {{--</a>--}}
                                {{--</li>--}}
                            </ul>
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
@endsection