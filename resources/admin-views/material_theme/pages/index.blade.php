@extends('admin::layout')

@section('module_name')
    Pages
@endsection

@section('content')

    <?php
        $module_name = 'pages';
        $count_items = count($pages);
    ?>

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Pages list</h2>
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
//                                ],
//                                'change_status_on_true' => [
//                                    'button_label' => 'Set on published',
//                                    'button_class' => 'btn-primary'
//                                ],
//                                'change_status_on_false' => [
//                                    'button_label' => 'Set on draft',
//                                    'button_class' => 'btn-primary'
//                                ]
//                            ];
                                $args = [
                                    'remove' => [],

                                    'change_status' => []
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
                            <th><a href="{{ getSortUrl('title', NULL, $module_name) }}">Page title</a></th>
                            <th>Slug</th>
                            <th><a href="{{ getSortUrl('published', NULL, $module_name) }}">Status</a></th>
                            <th><a href="{{ getSortUrl('created_at', NULL, $module_name) }}">Created at</a></th>
                            <th><a href="{{ getSortUrl('updated_at', NULL, $module_name) }}">Updated at</a></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if ($count_items > 0)
                            @foreach($pages as $page)
                                <tr class="pc-selectable-row">
                                    <td><div class="checkbox"><label><input type="checkbox" class="pc-selectable-input" data-item-id="{{ $page->id }}"></label></div></td>
                                    <td>{{ $page->title }}</td>
                                    <td>{{ $page->slug }}</td>
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
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ route(getRouteName($module_name, 'edit'), ['page' => $page->id]) }}">Edit</a></li>
                                                <li>
                                                    {!! Form::open([
                                                        'method' => 'delete',
                                                        'route' => [getRouteName($module_name, 'destroy'), $page->id],
                                                        'id' => 'pageRemoveForm-' . $page->id
                                                    ]) !!}
                                                    {!! Form::close() !!}
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
                    {{ $pages->links('admin::partials.pagination') }}
                </div>
            </div>
        </div>
    </div>
@endsection
