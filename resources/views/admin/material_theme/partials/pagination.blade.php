@if ($paginator->hasPages())

    <div class="pagination">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <a class="mdl-button previous disabled" disabled="disabled">Previous</a>
        @else
            <a href="{{ $paginator->previousPageUrl() }}" class="mdl-button previous">Previous</a>
        @endif
        @foreach ($elements as $element)
            {{-- "Three Dots" Separator --}}
            @if (is_string($element))
                <a class="icon item disabled">{{ $element }}</a>
            @endif

            {{-- Array Of Links --}}
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <a href="{{ $url }}" class="mdl-button  mdl-button--raised mdl-button--colored">{{ $page }}</a>
                    @else
                        <a href="{{ $url }}" class="mdl-button">{{ $page }}</a>
                    @endif
                @endforeach
            @endif
        @endforeach

        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" class="mdl-button next">Next</a>
        @else
            <a class="icon item disabled"> <i class="right chevron icon"></i> </a>
            <a class="mdl-button next disabled" disabled="disabled">Next</a>
        @endif
    </div>
@endif