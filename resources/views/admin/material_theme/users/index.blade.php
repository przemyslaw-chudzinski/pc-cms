@extends('admin.material_theme.layout')

@section('module_name')
    Users
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Users list</h2>
                </header>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Users name</th>
                            <th>Role</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if (count($users) > 0)
                            @foreach($users as $user)
                                @if (Auth::id() !== $user->id)
                                    <tr>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->role->display_name }}</td>
                                        <td>{{ $user->created_at }}</td>
                                        <td>{{ $user->updated_at }}</td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Actions
                                                    <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="{{ url(config('admin.admin_path') . '/users/' . $user->id . '/edit') }}">Edit</a></li>
                                                    <li>
                                                        {!! Form::open(['method' => 'delete', 'route' => [config('admin.modules.users.actions.destroy.route_name'), $user->id], 'id' => 'userRemoveForm-' . $user->id]) !!}
                                                        {!! Form::close() !!}
                                                        <a href="#" class="pc-cms-remove-item" data-form="#userRemoveForm-{{$user->id}}">Remove</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                @endif
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    {{ $users->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection