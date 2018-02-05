{!! Form::open([
     'method' => 'put',
     'route' => [config('admin.modules.settings.actions.update.route_name'), $setting->id]
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
    <button type="submit" class="btn btn-primary">Save</button>
{!! Form::close() !!}

{!! Form::open([
     'route' => [config('admin.modules.settings.actions.destroy.route_name'), $setting->id],
     'method' => 'delete',
     'id' => 'removeSetting-' . $setting->id]
     ) !!}
{!! Form::close() !!}
<hr>