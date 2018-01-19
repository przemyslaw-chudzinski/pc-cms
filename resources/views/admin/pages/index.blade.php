@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Pages</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Page title</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if (count($pages) > 0)
                        @foreach($pages as $page)
                            <tr>
                                <td>{{ $page->title }}</td>
                                <td>
                                    @if ($page->published)
                                        <button class="btn btn-success btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/pages/' .$page->id. '/togglePublished') }}">Published</button>
                                    @else
                                        <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/pages/' .$page->id. '/togglePublished') }}">Draft</button>
                                    @endif
                                </td>
                                <td>{{ $page->created_at }}</td>
                                <td>{{ $page->updated_at }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Actions
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="{{ url(config('admin.admin_path') . '/pages/' . $page->id . '/edit') }}">Edit</a></li>
                                            <li>
                                                <form action="{{ url(config('admin.admin_path') . '/pages/' . $page->id) }}" id="pageRemoveForm-{{$page->id}}" method="post">
                                                    {{ csrf_field() }}
                                                    {{ method_field('delete') }}
                                                </form>
                                                <a href="#" class="pc-cms-remove-item" data-form="#pageRemoveForm-{{$page->id}}">Remove</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
            {{ $pages->links() }}
        </div>
    </div>
@endsection