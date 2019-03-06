@extends('admin::layout')

@section('module_name')
    Articles
@endsection

@section('content')

    <?php
        $module_name = 'blog';
        $count_items = count($articles);
    ?>


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
                                <li><a href="{{ route(getRouteName('blog', 'create')) }}">Create new</a></li>
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
//                                ],
//                                'change_status_on_true' => [
//                                    'button_label' => 'Set on published',
//                                    'button_class' => 'btn-primary'
//                                ],
//                                'change_status_on_false' => [
//                                    'button_label' => 'Set on draft',
//                                    'button_class' => 'btn-primary'
//                                ],
//                                'change_comment_status_true' => [
//                                    'button_label' => 'Enable comments',
//                                    'button_class' => 'btn-primary'
//                                ],
//                                'change_comment_status_false' => [
//                                    'button_label' => 'Disable comments',
//                                    'button_class' => 'btn-primary'
//                                ],

//                            ];
                            $args = [
                                'remove' => [],

                                'change_status' => [],

                                'change_comments_status' => []
                            ];
                            ?>
                            {!! MassActions::setHeaderActions($module_name, null, $args) !!}
{{--                            {!! MassActions::setMassActions($module_name, NULL, $args) !!}--}}
                        </div>
                        {{-- Search --}}
                        <div></div>
                    </div>
                    <table class="table table-hover pc-cms-table">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox" @if($count_items === 0) disabled @endif class="pc-selectable-input-all"></label></div></th>
                            <th><a href="{{ getSortUrl('title', NULL, $module_name) }}">Article title</a></th>
                            <th><a href="{{ getSortUrl('published', NULL, $module_name) }}">Status</a></th>
                            <th><a href="{{ getSortUrl('created_at', NULL, $module_name) }}">Created at</a></th>
                            <th><a href="{{ getSortUrl('updated_at', NULL, $module_name) }}">Updated at</a></th>
                            <th><a href="{{ getSortUrl('allow_comments', NULL, $module_name) }}">Comments</a></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if ($count_items > 0)
                            @foreach($articles as $article)
                                <tr class="pc-selectable-row">
                                    <td><div class="checkbox"><label><input type="checkbox" class="pc-selectable-input" data-item-id="{{ $article->id }}"></label></div></td>
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
                                        @if($article->allow_comments)
                                            <button class="btn btn-primary btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-true-classes="btn-primary" data-true-label="Enabled" data-false-label="Disabled" data-url="{{ url('api/articles/' . $article->id . '/toggleCommentsStatus') }}">Enabled</button>
                                        @else
                                            <button class="btn btn-warning btn-xs pc-cms-status-btn pc-cms-toggle-status-btn" data-true-classes="btn-primary" data-true-label="Enabled" data-false-label="Disabled" data-url="{{ url('api/articles/' . $article->id . '/toggleCommentsStatus') }}">Disabled</button>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ url(route(getRouteName('blog', 'edit'), $article->id)) }}">Edit</a></li>
                                                <li>
                                                    {!! Form::open([
                                                        'method' => 'delete',
                                                        'route' => [getRouteName($module_name, 'destroy'), $article->id],
                                                        'id' => 'articleRemoveForm-' . $article->id
                                                    ]) !!}
                                                    {!! Form::close() !!}
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
                    {{ $articles->links('admin::partials.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection
