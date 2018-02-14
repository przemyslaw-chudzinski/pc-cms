@if (count($items) > 0)
        <ul class="list-unstyled text-uppercase pc-megaMenu-menu">
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#home" href="#">Home</a></li>--}}
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#about" href="#">O mnie</a></li>--}}
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#portfolio" href="#">Portfolio</a></li>--}}
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#blog" href="#">Blog</a></li>--}}
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#cooperation" href="#">Współpraca</a></li>--}}
                {{--<li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#contact" href="#">Kontakt</a></li>--}}
                @foreach($items->sortBy('order') as $item)
                        <li class="pc-megaMenu-menu-item"><a class="pc-megaMenu-menu-item-link" data-target="#{{ $item->hook }}" href="{{ url($item->url) }}">{{ $item->title }}</a></li>
                @endforeach
        </ul>
@endif