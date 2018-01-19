@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Edit segment - ' . $segment->name
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <form method="post" action="{{ url(config('admin.admin_path') . '/segments/' . $segment->id) }}">
                {{ csrf_field() }}
                {{ method_field('put') }}
                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="segmentName">Segment name</label>
                    <input id="segmentName" name="name" type="text" class="form-control" autocomplete="off" value="{{ $segment->name }}">
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                @include('admin.components.forms.richEditor', [
                    'id' => 'segmentContent',
                    'fieldName' => 'content',
                    'editState' => true,
                    'label' => 'Content',
                    'value' => $segment->content
                ])


                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection