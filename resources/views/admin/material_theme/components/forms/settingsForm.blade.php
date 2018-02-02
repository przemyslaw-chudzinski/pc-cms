{!! Form::open([
     'method' => 'put',
     'route' => [config('admin.modules.settings.actions.update.route_name'), $setting->id]
     ]) !!}

<div class="form-group">
    <label><code>{{ $setting->key }}</code></label>
    @switch($setting->type)


        @case('input_text')
            {!! Form::text('value', $setting->value, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
        @break


        @case('textarea')
            {!! Form::textarea('value', $setting->value, ['class' => 'form-control', 'rows' => 5]) !!}
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