@extends('admin::layout')

@section('module_name')
    Blog categories
@endsection

@section('content')

    <?php
        $module_name = 'blog_categories';
        $count_items = count($categories);
    ?>

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Blog categories list</h2>
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
                                    'remove' => [
                                        'can' => true
                                    ],
                                    'change_status' => [
                                        'can' => true
                                    ]
                                ];
                            ?>
                            {!! MassActions::setHeaderActions($module_name, NULL, $args) !!}
                            {{--{!! MassActions::setMassActions($module_name, NULL, $args) !!}--}}
                        </div>
                        {{-- Search --}}
                        <div></div>
                    </div>
                    <table class="table table-hover pc-cms-table">
                        <thead>
                        <tr>
                            <th><div class="checkbox"><label><input type="checkbox" @if($count_items === 0) disabled @endif class="pc-selectable-input-all"></label></div></th>
                            <th><a href="{{ getSortUrl('name', NULL, $module_name) }}">Category name</a></th>
                            <th><a href="{{ getSortUrl('published', NULL, $module_name) }}">Status</a></th>
                            <th><a href="{{ getSortUrl('created_at', NULL, $module_name) }}">Created at</a></th>
                            <th><a href="{{ getSortUrl('updated_at', NULL, $module_name) }}">Updated at</a></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @if ($count_items > 0)
                            @foreach($categories as $category)
                                <tr class="pc-selectable-row">
                                    <td><div class="checkbox"><label><input type="checkbox" class="pc-selectable-input" data-item-id="{{ $category->id }}"></label></div></td>
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
                                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Actions
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a href="{{ url(route(getRouteName('blog_categories', 'edit'), $category->id)) }}">Edit</a></li>
                                                <li>
                                                    {!! Form::open([
                                                        'method' => 'delete',
                                                        'route' => [getRouteName($module_name, 'destroy'), $category->id],
                                                        'id' => 'blogCategoryRemoveForm-' . $category->id
                                                    ]) !!}
                                                    {!! Form::close() !!}
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
        </div>
    </div>

@endsection
