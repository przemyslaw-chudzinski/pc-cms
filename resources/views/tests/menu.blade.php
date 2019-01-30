@if(count($items))
    <ul>
        @foreach($items->sortBy('order') as $item)
            <li>
                <a href="#">{{ $item->title }}</a>
                @if($item->children->count())
                    @include('tests.menu', ['items' => $item->children])
                @endif
            </li>
        @endforeach
    </ul>
@endif
