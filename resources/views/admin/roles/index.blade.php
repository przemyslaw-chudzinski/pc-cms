@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Roles'
    ])

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Role name</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($roles) > 0)
                        @foreach($roles as $role)
                            <tr>
                                <td>{{ $role->display_name }}</td>
                                <td>{{ $role->created_at }}</td>
                                <td>{{ $role->updated_at }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="{{ route('admin.users.roles.setPermissions', ['role' => $role->id]) }}">Set permissions</a></li>
                                            <li><a href="{{ url(config('admin.admin_path') . '/users/roles/' . $role->id . '/edit') }}">Edit</a></li>
                                            <li>
                                                    {!! Form::open(['method' => 'delete', 'route' => ['admin.users.roles.destroy', $role->id], 'id' => 'roleRemoveForm-' . $role->id, 'style' => 'position: absolute']) !!}
                                                    {!! Form::close() !!}
                                                <a href="#" class="pc-cms-remove-item" data-form="#roleRemoveForm-{{$role->id}}">Remove</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
            {{ $roles->links() }}
        </div>
    </div>
@endsection