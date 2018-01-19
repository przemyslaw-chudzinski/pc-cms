@extends('admin.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Blog categories</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                <tr>
                    <th>Category name</th>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @if (count($categories) > 0)
                    @foreach($categories as $category)
                        <tr>
                            <td>{{ $category->name }}</td>
                            <td>
                                @if ($category->published)
                                    <button class="btn btn-success btn-xs pc-cms-status-btn pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/articles/categories/' . $category->id . '/togglePublished') }}">Published</button>
                                @else
                                    <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/articles/categories/' . $category->id . '/togglePublished') }}">Draft</button>
                                @endif
                            </td>
                            <td>{{ $category->created_at }}</td>
                            <td>{{ $category->updated_at }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="{{ url(config('admin.admin_path') . '/articles/categories/' . $category->id . '/edit') }}">Edit</a></li>
                                        <li>
                                            <form action="{{ url(config('admin.admin_path') . '/articles/categories/' . $category->id) }}" id="blogCategoryRemoveForm-{{$category->id}}" method="post">
                                                {{ csrf_field() }}
                                                {{ method_field('delete') }}
                                            </form>
                                            <a href="#" class="pc-cms-remove-item" data-form="#blogCategoryRemoveForm-{{$category->id}}">Remove</a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                @endif
                </tbody>
            </table>
            {{ $categories->links() }}
        </div>
    </div>
@endsection