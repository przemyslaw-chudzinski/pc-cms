@php

$route = isset($route) ? $route : null;
$value = isset($value) ? $value : null;
$label = isset($label) ? $label : 'Current slug: '
@endphp


<div class="pc-slug-field" data-url="{{ $route }}" >

    <span>{{ $label }}</span><a href="#" class="pc-slug-field-link"><strong>{{ $value }}</strong></a>

    <div class="pc-slug-field-edit-state">
        <input class="pc-slug-field-input" type="text" value="{{ $value }}">
        <button type="button" class="pc-slug-field-save btn btn-primary btn-sm">Save</button>
        <button type="button" class="pc-slug-field-cancel btn btn-danger btn-sm">Cancel</button>
    </div>

</div>
