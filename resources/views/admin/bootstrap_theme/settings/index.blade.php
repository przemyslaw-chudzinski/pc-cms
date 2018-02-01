@extends('admin.bootstrap_theme.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Settings'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">

            @if (count($settings) > 0)
                @foreach($settings as $setting)
                    @include('admin.components.forms.settingsForm', [
                        'setting' => $setting
                    ])
                @endforeach
            @endif

        </div>
        <div class="col-xs-12 col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Create new setting</h4>
                </div>
                <div class="panel-body">
                    {!! Form::open() !!}
                    <div class="form-group{{ $errors->has('key') ? ' has-error' : '' }}">
                        {!! Form::label(null, 'Key') !!}
                        {!! Form::text('key', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        @if ($errors->has('key'))
                            <span class="help-block">
                            <strong>{{ $errors->first('key') }}</strong>
                        </span>
                        @endif
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Description') !!}
                        {!! Form::textarea('description', null, ['class' => 'form-control', 'rows' => 5]) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Type') !!}
                        <?php $types = config('admin.form_types'); ?>
                        <select name="type" class="form-control pc-cms-select2-base">
                            @if(count($types) > 0)
                                @foreach($types as $type)
                                    <option value="{{ $type['type'] }}">{{ $type['name'] }}</option>
                                @endforeach
                            @endif
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Save</button>

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection