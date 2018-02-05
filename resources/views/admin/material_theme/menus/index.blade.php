@extends('admin.material_theme.layout')

@section('module_name')
    Menus
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.loader-async')

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New menu</h2>
                    <ul class="card-actions icons right-top">
                        <li class="dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                <i class="zmdi zmdi-more-vert"></i>
                            </a>
                            <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                <li><a href="{{ route(getRouteName('menus', 'create')) }}">Create new</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <table class="table table-hover pc-cms-table">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox"></label></div></th>
                            <th>Menu name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if (count($menus) > 0)
                            @foreach($menus as $menu)
                                <tr>
                                    <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                                    <td>{{ $menu->name }}</td>
                                    <td>{{ $menu->description }}</td>
                                    <td>
                                        @if ($menu->published)
                                            <button class="btn btn-success btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/menus/' .$menu->id. '/togglePublished') }}">Published</button>
                                        @else
                                            <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/menus/' .$menu->id. '/togglePublished') }}">Draft</button>
                                        @endif
                                    </td>
                                    <td>{{ $menu->created_at }}</td>
                                    <td>{{ $menu->updated_at }}</td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ url(config('admin.admin_path') . '/menus/' . $menu->id . '/builder' ) }}">Menu builder</a></li>
                                                <li><a href="{{ url(config('admin.admin_path') . '/menus/' . $menu->id . '/edit') }}">Edit</a></li>
                                                <li>
                                                    {!! Form::open([
                                                        'method' => 'delete',
                                                        'route' => [config('admin.modules.menus.actions.destroy.route_name'), $menu->id],
                                                        'id' => 'menuRemoveForm-' . $menu->id
                                                    ]) !!}
                                                    {!! Form::close() !!}
                                                    <a href="#" class="pc-cms-remove-item" data-form="#menuRemoveForm-{{$menu->id}}">Remove</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    {{ $menus->links('admin.material_theme.partials.pagination') }}
                </div>
            </div>
        </div>
    </div>

@endsection