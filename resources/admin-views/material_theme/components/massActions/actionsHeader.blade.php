@php

$args = isset($args) ? $args : [];
$default_js_callback = 'return confirm("Are you sure to do this action?")';

@endphp

<div id="header_action_bar" class="pc-action-header">
    <div class="row">
        <div class="col-xs-6 col-sm-3">
            <div class="action-left">
                <a href="javascript:void(0)" data-action="close">
                    <i class="zmdi zmdi-arrow-left pull-left"></i>
                    <h3>Back</h3>
                </a>
                <div id="selected_items">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-sm-9">
            <div class="action-right">
                <ul class="card-actions icons right-top">
                    @if(array_has($args, 'remove'))
                        {!! Form::open([
                            'id' => 'mass-actions-remove',
                            'onsubmit' => array_has($args, 'remove.js_callback') ? array_get($args, 'remove.js_callback') : $default_js_callback,
                            'route' => getRouteName($module_name, $action_route_name),
                            'style' => 'position: absolute;'
                        ]) !!}
                            {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
                            {!! Form::hidden('action_name', 'delete') !!}
                        {!! Form::close() !!}
                        <li>
                            <a href="javascript:void(0)" class="pc-cms-send-form" data-form="#mass-actions-remove"> <i class="zmdi zmdi-delete"></i> </a>
                        </li>
                    @endif
                    @if(array_has($args, 'change_status') || array_has($args, 'change_comments_status'))
                        <li class="dropdown">
                        <a href="javascript:void(0)" data-toggle="dropdown"> <i class="zmdi zmdi-more-vert"></i> </a>
                        <ul class="dropdown-menu btn-primary dropdown-menu-right">
                            <li class="title">Actions</li>
                            @if(array_has($args, 'change_status'))
                                {!! Form::open([
                                    'id' => 'mass-actions-change-status-on-draft',
                                    'onsubmit' => array_has($args, 'change_status.js_callback') ? array_get($args, 'change_status.js_callback') : $default_js_callback,
                                    'route' => getRouteName($module_name, $action_route_name),
                                    'style' => 'position: absolute;'
                                ]) !!}
                                {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
                                {!! Form::hidden('action_name', 'change_status_on_false') !!}
                                {!! Form::close() !!}
                                <li>
                                    <a href="javascript:void(0)" class="text-gray pc-cms-send-form" data-form="#mass-actions-change-status-on-draft">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Set as draft
                                    </a>
                                </li>
                                {!! Form::open([
                                        'id' => 'mass-actions-change-status-on-published',
                                        'onsubmit' => array_has($args, 'change_status.js_callback') ? array_get($args, 'change_status.js_callback') : $default_js_callback,
                                        'route' => getRouteName($module_name, $action_route_name),
                                        'style' => 'position: absolute;'
                                    ]) !!}
                                {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
                                {!! Form::hidden('action_name', 'change_status_on_true') !!}
                                {!! Form::close() !!}
                                <li>
                                    <a href="javascript:void(0)" class="text-gray pc-cms-send-form" data-form="#mass-actions-change-status-on-published">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Set as published
                                    </a>
                                </li>
                            @endif
                            @if(array_has($args, 'change_comments_status'))
                                {!! Form::open([
                                        'id' => 'mass-actions-change-comments-status-true',
                                        'onsubmit' => array_has($args, 'change_comments_status.js_callback') ? array_get($args, 'change_comments_status.js_callback') : $default_js_callback,
                                        'route' => getRouteName($module_name, $action_route_name),
                                        'style' => 'position: absolute;'
                                    ]) !!}
                                {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
                                {!! Form::hidden('action_name', 'change_comment_status_true') !!}
                                {!! Form::close() !!}
                                <li>
                                    <a href="javascript:void(0)" class="text-gray pc-cms-send-form" data-form="#mass-actions-change-comments-status-true">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Enable comments
                                    </a>
                                </li>
                                {!! Form::open([
                                            'id' => 'mass-actions-change-comments-status-false',
                                            'onsubmit' => array_has($args, 'change_comments_status.js_callback') ? array_get($args, 'change_comments_status.js_callback') : $default_js_callback,
                                            'route' => getRouteName($module_name, $action_route_name),
                                            'style' => 'position: absolute;'
                                        ]) !!}
                                {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
                                {!! Form::hidden('action_name', 'change_comment_status_false') !!}
                                {!! Form::close() !!}
                                <li>
                                    <a href="javascript:void(0)" class="text-gray pc-cms-send-form" data-form="#mass-actions-change-comments-status-false">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Disable comments
                                    </a>
                                </li>
                            @endif
                        </ul>
                    </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</div>
