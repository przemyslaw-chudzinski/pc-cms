@extends('admin.material_theme.layout')

@section('module_name')
    Segments
@endsection

@section('content')

    @include('admin.material_theme.components.alert')


    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Segments list</h2>
                    <ul class="card-actions icons right-top">
                        <li class="dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                <i class="zmdi zmdi-more-vert"></i>
                            </a>
                            <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                <li>
                                    <a href="javascript:void(0)">Option One</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">Option Two</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">Option Three</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <div class="table-responsive">
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
                                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            </div>
        </div>
    </div>


@endsection