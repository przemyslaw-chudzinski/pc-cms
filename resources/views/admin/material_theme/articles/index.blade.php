@extends('admin.material_theme.layout')

@section('module_name')
    Articles
@endsection

@section('content')

    @include('admin.material_theme.components.alert')


    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Articles list</h2>
                    <ul class="card-actions icons right-top">
                        <li class="dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                <i class="zmdi zmdi-more-vert"></i>
                            </a>
                            <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                <li><a href="{{ route(config('admin.modules.blog.actions.create.route_name')) }}">Create new</a></li>
                            </ul>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox"></label></div></th>
                            <th>Article title</th>
                            <th>Status</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if (count($articles) > 0)
                            @foreach($articles as $article)
                                <tr>
                                    <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                                    <td>{{ $article->title }}</td>
                                    <td>
                                        @if ($article->published)
                                            <button class="btn btn-success btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/articles/' .$article->id. '/togglePublished') }}">Published</button>
                                        @else
                                            <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-url="{{ url('api/articles/' .$article->id. '/togglePublished') }}">Draft</button>
                                        @endif
                                    </td>
                                    <td>{{ $article->created_at }}</td>
                                    <td>{{ $article->updated_at }}</td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ url(config('admin.admin_path') . '/articles/' . $article->id . '/edit') }}">Edit</a></li>
                                                <li>
                                                    <form action="{{ url(config('admin.admin_path') . '/articles/' . $article->id) }}" id="articleRemoveForm-{{$article->id}}" method="post">
                                                        {{ csrf_field() }}
                                                        {{ method_field('delete') }}
                                                    </form>
                                                    <a href="#" class="pc-cms-remove-item" data-form="#articleRemoveForm-{{$article->id}}">Remove</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                        </tbody>
                    </table>
                    {{ $articles->links('admin.material_theme.partials.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection