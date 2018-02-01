@extends('admin.bootstrap_theme.layout')

@section('content')

    <div class="pc-cms-header">
        <h2>Articles</h2>
        <hr>
    </div>

    @include('admin.components.alert')

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <table class="table">
                <thead>
                    <tr>
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
                                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            {{ $articles->links() }}
        </div>
    </div>
@endsection