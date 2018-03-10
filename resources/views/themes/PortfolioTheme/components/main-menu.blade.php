@if (count($items) > 0)
        <ul class="list-unstyled text-uppercase pc-megaMenu-menu">
                @foreach($items->sortBy('order') as $item)
                        <li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#target-{{ $item->id }}" href="{{ url($item->url) }}">{{ $item->title }}</a>
                        </li>
                @endforeach
        </ul>
@endif