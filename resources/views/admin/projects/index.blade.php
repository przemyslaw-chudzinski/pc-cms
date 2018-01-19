@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Projects</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Project title</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($projects) > 0)
                        @foreach($projects as $project)
                            <tr>
                                <td>{{ $project->title }}</td>
                                <td>
                                    @if ($project->published)
                                        <button class="btn btn-success btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/projects/' .$project->id. '/togglePublished') }}">Published</button>
                                    @else
                                        <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/projects/' .$project->id. '/togglePublished') }}">Draft</button>
                                    @endif
                                </td>
                                <td>{{ $project->created_at }}</td>
                                <td>{{ $project->updated_at }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="{{ url(config('admin.admin_path') . '/projects/' . $project->id . '/edit') }}">Edit</a></li>
                                            <li>
                                                <form action="{{ url(config('admin.admin_path') . '/projects/' . $project->id) }}" id="projectRemoveForm-{{$project->id}}" method="post">
                                                    {{ csrf_field() }}
                                                    {{ method_field('delete') }}
                                                </form>
                                                <a href="#" class="pc-cms-remove-item" data-form="#projectRemoveForm-{{$project->id}}">Remove</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
            {{ $projects->links() }}
        </div>
    </div>
@endsection