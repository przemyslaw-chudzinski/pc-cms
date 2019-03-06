@extends('admin::layout')

@section('module_name')
    Users
@endsection

@section('content')

    <?php
        $module_name = 'users';
        $count_items = count($users);
    ?>

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
                                <li><a href="{{ route(getRouteName($module_name, 'create')) }}">Create new</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <div>
                        <div>
                            <?php
//                            $args = [
//                                'delete' => [
//                                    'button_label' => 'Remove selected items',
//                                    'button_class' => 'btn-danger',
//                                ]
//                            ];
                                $args = [
                                    'remove' => []
                                ];
                            ?>
                            {!! MassActions::setHeaderActions($module_name, null, $args) !!}
                            {{--{!! MassActions::setMassActions($module_name, NULL, $args) !!}--}}
                        </div>
                        {{-- Search --}}
                        <div></div>
                    </div>
                    <table class="table table-hover pc-cms-table">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox" @if($count_items === 0) disabled @endif class="pc-selectable-input-all"></label></div></th>
                            <th><a href="{{ getSortUrl('first_name', NULL, $module_name) }}">First name</a></th>
                            <th><a href="{{ getSortUrl('last_name', NULL, $module_name) }}">Last name</a></th>
                            <th><a href="{{ getSortUrl('email', NULL, $module_name) }}">Email</a></th>
                            <th><a href="{{ getSortUrl('role_id', NULL, $module_name) }}">Role</a></th>
                            <th><a href="{{ getSortUrl('created_at', NULL, $module_name) }}">Created at</a></th>
                            <th><a href="{{ getSortUrl('updated_at', NULL, $module_name) }}">Updated at</a></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if ($count_items > 0)
                            @foreach($users as $user)
                                <tr class="pc-selectable-row">
                                    <td><div class="checkbox"><label><input class="pc-selectable-input" type="checkbox" data-item-id="{{ $user->id }}"></label></div></td>
                                    <td>{{ $user->first_name }}</td>
                                    <td>{{ $user->last_name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>
                                        @if ($user->role_id)
                                            <button class="btn btn-xs btn-primary" data-toggle="modal" data-target="#changeUserRole-{{ $user->id }}">{{ $user->role->display_name }}</button>
                                        @else
                                            <button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#changeUserRole-{{ $user->id }}">User has not any role</button>
                                        @endif

                                        @include('admin::components.forms.changeUserRoleModal')

                                    </td>
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
                                                    {!! Form::open(['method' => 'delete', 'route' => [getRouteName($module_name, 'destroy'), $user->id], 'id' => 'userRemoveForm-' . $user->id]) !!}
                                                    {!! Form::close() !!}
                                                    <a href="#" class="pc-cms-remove-item" data-form="#userRemoveForm-{{$user->id}}">Remove</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    {{ $users->links('admin::partials.pagination') }}
                </div>
            </div>
        </div>
    </div>


@endsection
