@if(isset($image))
<div class="col-xs-4 m-b-10" id="image-{{ $image->_id }}">
    <div class="card image-over-card m-t-30">
        <div class="card-image">
            <a href="javascript:void(0)">
                <img src="{{ $image->sizes->admin_prev_medium->url }}" alt="">
            </a>
        </div>
        <div class="card-body">
            <div class="text-center">
                <button data-image-select
                        data-image-select-id="{{ $image->_id }}"
                        data-image-select-url="{{ url($selectRoute) }}"
                        {{ isset($image->selected) && (bool) $image->selected ? 'data-image-select-selected ' : null }}
                        class="btn btn-flat btn-xs btn-info"><i class="zmdi zmdi-star-outline"></i></button>

                <button class="btn btn-danger btn-xs pc-cms-send-form"
                        data-image-remove
                        data-image-remove-id="{{ $image->_id }}"
                        data-image-remove-target="#image-{{ $image->_id }}"
                        data-image-remove-url="{{ url($removeRoute) }}">Remove</button>
            </div>
            <h4 class="card-title text-center">{{ $image->file_name }}</h4>
        </div>
    </div>
</div>
@endif
