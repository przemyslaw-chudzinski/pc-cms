@if(count($items) > 0)
    @foreach($items as $key => $item)
        <div class="pc-megaMenu-left-inner-item pc-megaMenu-left-inner-item-home {{ $key === 0 ? 'active' : null }}" data-bg="{{ getImageUrl(json_decode($item->image, true), null) }}" id="target-{{ $item->id }}"></div>
    @endforeach
@endif