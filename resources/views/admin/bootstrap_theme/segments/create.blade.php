@extends('admin.bootstrap_theme.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Create new segment'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/segments') }}">
                {{ csrf_field() }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="segmentName">Segment name</label>
                    <input id="segmentName" name="name" type="text" class="form-control" autocomplete="off">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'segmentContent',
                    'fieldName' => 'content',
                    'editState' => false,
                    'label' => 'Content'
                ])

                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection