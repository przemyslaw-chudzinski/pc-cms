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
                    <ul class="card-actions icons right-top">
                        <li class="dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                <i class="zmdi zmdi-more-vert"></i>
                            </a>
                            <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                <li><a href="{{ route(config('admin.modules.users.actions.create.route_name')) }}">Create new</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <table class="table table-hover pc-cms-table">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox"></label></div></th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
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
                                        <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                                        <td>{{ $user->first_name }}</td>
                                        <td>{{ $user->last_name }}</td>
                                        <td>{{ $user->email }}</td>
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
                                                        {!! Form::open(['method' => 'delete', 'route' => [getRouteName('users', 'destroy'), $user->id], 'id' => 'userRemoveForm-' . $user->id]) !!}
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
                    {{ $users->links('admin.material_theme.partials.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection