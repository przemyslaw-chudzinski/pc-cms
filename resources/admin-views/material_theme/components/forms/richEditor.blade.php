<div class="form-group{{ $errors->has($fieldName) ? ' has-error' : '' }}">
    @if ($label)
        <label for="{{ $id }}">{{ $label }}</label>
    @endif
    <textarea class="form-control pc-cms-editor" name="{{ $fieldName }}" id="{{ $id }}">
        @if($editState)
            {{ $value }}
        @endif
    </textarea>
    @if ($errors->has($fieldName))
        <span class="help-block">
            <strong>{{ $errors->first($fieldName) }}</strong>
        </span>
    @endif
</div>