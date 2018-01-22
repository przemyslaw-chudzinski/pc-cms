{!! Form::open(['method' => 'put', 'url' => url(config('admin.admin_path') . '/settings/' . $setting->id)]) !!}
    @switch($setting->type)


        @case('input_text')
        <div class="form-group">
            <label>{{ $setting->description }}</label>
            {!! Form::text('value', $setting->value, ['class' => 'form-control']) !!}
        </div>
        @break


        @case('textarea')
        <div class="form-group">
            <label>{{ $setting->description }}</label>
            {!! Form::textarea('value', $setting->value, ['class' => 'form-control', 'rows' => 5]) !!}
        </div>
        @break


    @endswitch
{!! Form::hidden('key', $setting->key) !!}
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-danger pc-cms-remove-item" data-form="#removeSetting-{{ $setting->id }}">Remove</button>
{!! Form::close() !!}

{!! Form::open(['url' => url(config('admin.admin_path') . '/settings/' . $setting->id), 'method' => 'delete', 'id' => 'removeSetting-' . $setting->id]) !!}
{!! Form::close() !!}
<hr>