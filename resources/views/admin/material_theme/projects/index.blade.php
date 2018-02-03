@extends('admin.material_theme.layout')

@section('module_name')
    Projects
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Projects list</h2>
                    <ul class="card-actions icons right-top">
                        <li class="dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                <i class="zmdi zmdi-more-vert"></i>
                            </a>
                            <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                <li><a href="{{ route(config('admin.modules.projects.actions.create.route_name')) }}">Create new</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox"></label></div></th>
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
                                    <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
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
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ url(config('admin.admin_path') . '/projects/' . $project->id . '/edit') }}">Edit</a></li>
                                                <li>
                                                    {!! Form::open([
                                                        'method' => 'delete',
                                                        'route' => [config('admin.modules.projects.actions.destroy.route_name'), $project->id],
                                                        'id' => 'projectRemoveForm-' . $project->id
                                                    ]) !!}
                                                    {!! Form::close() !!}
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
                    {{ $projects->links('admin.material_theme.partials.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection