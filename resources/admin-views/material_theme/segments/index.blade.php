@extends('admin::layout')

@section('module_name')
    Segments
@endsection

@section('content')

    <?php
        $module_name = 'segments';
        $count_items = count($segments);
    ?>

    <div class="row">
        <div class="col-xs-12">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Segments list</h2>
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
                        <?php
                        $args = [
                            'delete' => [
                                'button_label' => 'Remove selected items',
                                'button_class' => 'btn-danger',
                            ]
                        ];
                        ?>
                        {!! MassActions::setMassActions($module_name, NULL, $args) !!}
                            {{-- Search --}}
                        <div></div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover pc-cms-table">
                            <thead>
                            <tr>
                                <th>
                                    <div class="checkbox"><label><input @if($count_items === 0) disabled @endif class="pc-selectable-input-all" type="checkbox"></label></div>
                                </th>
                                <th>
                                    <a href="{{ getSortUrl('name', null, $module_name) }}">Segment key</a>
                                </th>
                                <th>
                                    <a href="{{ getSortUrl('created_at', null, $module_name) }}">Created at</a>
                                </th>
                                <th>
                                    <a href="{{ getSortUrl('updated_at', null, $module_name) }}">Updated at</a>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            @if ($count_items > 0)
                                @foreach($segments as $segment)
                                    <tr class="pc-selectable-row">
                                        <td><div class="checkbox"><label><input class="pc-selectable-input" type="checkbox" data-item-id="{{ $segment->id }}"></label></div></td>
                                        <td>{{ $segment->key }}</td>
                                        <td>{{ $segment->created_at }}</td>
                                        <td>{{ $segment->updated_at }}</td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Actions
                                                    <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="{{ url(config('admin.admin_path') . '/segments/' . $segment->id . '/edit') }}">Edit</a></li>
                                                    <li>
                                                        <form action="{{ url(config('admin.admin_path') . '/segments/' . $segment->id) }}" id="segmentRemoveForm-{{$segment->id}}" method="post">
                                                            {{ csrf_field() }}
                                                            {{ method_field('delete') }}
                                                        </form>
                                                        <a href="#" class="pc-cms-remove-item" data-form="#segmentRemoveForm-{{$segment->id}}">Remove</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            @endif
                            </tbody>
                        </table>
                        {{ $segments->links('admin::partials.pagination') }}
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection