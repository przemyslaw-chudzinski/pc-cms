<?php
    $module_name = 'settings';
?>
{!! Form::open([
     'method' => 'put',
     'route' => [getRouteName($module_name, 'update'), $setting->id],
     'id' => 'saveSettingForm-' . $setting->id
     ]) !!}

{!! Form::hidden('field_type', $setting->type) !!}

<div class="form-group">
    <label><code>{{ $setting->key }}</code></label>
    @switch($setting->type)


        @case('input_text')
            {!! Form::text('value', $setting->value, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
        @break


        @case('textarea')
            {!! Form::textarea('value', $setting->value, ['class' => 'form-control', 'rows' => 5]) !!}
        @break

        @case('checkbox')
            <div class="checkbox">
                <label>
                    <input name="value" type="checkbox" @if ($setting->value) checked @endif> {{ $setting->description }}
                </label>
            </div>
        @break


    @endswitch

</div>

{!! Form::hidden('key', $setting->key) !!}
    <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#saveSettingForm-{{ $setting->id }}">Save</button>
{!! Form::close() !!}

{!! Form::open([
     'route' => [getRouteName($module_name, 'destroy'), $setting->id],
     'method' => 'delete',
     'id' => 'removeSetting-' . $setting->id]
     ) !!}
{!! Form::close() !!}