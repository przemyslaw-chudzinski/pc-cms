@extends('admin.bootstrap_theme.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Segments'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Segment name</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($segments) > 0)
                        @foreach($segments as $segment)
                            <tr>
                                <td>{{ $segment->name }}</td>
                                <td>{{ $segment->created_at }}</td>
                                <td>{{ $segment->updated_at }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="{{ url(config('admin.admin_path') . '/segments/' . $segment->id . '/edit') }}">Edit</a></li>
                                            <li>
                                                <form action="{{ url(config('admin.admin_path') . '/segments/' . $segment->id) }}" id="segmentRemoveForm-{{$segment->id}}" method="post">
                                                    {{ csrf_field() }}
                                                    {{ method_field('delete') }}
                                                </form>
                                                <a href="#" class="pc-cms-remove-item" data-form="#segmentRemoveForm-{{$segment->id}}">Remove</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
            {{ $segments->links() }}
        </div>
    </div>
@endsection