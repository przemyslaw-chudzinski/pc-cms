@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Create new segment</h2>
        <hr>
    </div>

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
                <div class="form-group">
                    <label for="segmentContent">Content</label>
                    <textarea id="segmentContent" name="content" class="form-control pc-cms-editor"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

@endsection