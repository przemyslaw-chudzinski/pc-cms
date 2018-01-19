<div class="form-group">
    <label>
        <input name="{{ $fieldName }}" type="checkbox" @if($checked) checked @endif> {{ $label ? $label : '' }}
    </label>
</div>