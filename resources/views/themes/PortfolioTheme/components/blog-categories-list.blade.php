@php
    $slug = Route::current()->parameters['slug'];
    $routeName = Route::currentRouteName();
@endphp
<div class="pc-blog-categories-wrapper d-none d-lg-block">
    @if(count($categories) > 0)
        <ul class="list-unstyled d-flex pc-blog-categories">
                <li><a class="{{ $routeName === 'theme.show_page' && $slug === 'blog' ? 'active' : null }}" href="{{ url(route('theme.show_page', ['slug' => 'blog'])) }}">Wszystkie wpisy</a></li>
            @foreach($categories as $category)
                <li><a class="{{ $routeName === 'theme.show_articles_by_category' && $slug === $category->slug ? 'active' : null }}" href="{{ url(route('theme.show_articles_by_category', ['slug' => $category->slug])) }}">{{ $category->name }}</a></li>
            @endforeach
        </ul>
    @endif
</div>