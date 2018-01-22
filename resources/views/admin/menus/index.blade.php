@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Menus</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Menu name</th>
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
                                <td>{{ $menu->name }}</td>
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
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="{{ url(config('admin.admin_path') . '/menus/' . $menu->id . '/builder' ) }}">Menu builder</a></li>
                                            <li><a href="{{ url(config('admin.admin_path') . '/menus/' . $menu->id . '/edit') }}">Edit</a></li>
                                            <li>
                                                <form action="{{ url(config('admin.admin_path') . '/menus/' . $menu->id) }}" id="menuRemoveForm-{{$menu->id}}" method="post">
                                                    {{ csrf_field() }}
                                                    {{ method_field('delete') }}
                                                </form>
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
            {{ $menus->links() }}
        </div>
    </div>
@endsection