@php

$args = isset($args) ? $args : [];

@endphp

<div id="header_action_bar" class="pc-action-header">
    <div class="row">
        <div class="col-xs-6 col-sm-3">
            <div class="action-left">
                <a href="javascript:void(0)">
                    <i class="zmdi zmdi-arrow-left pull-left"></i>
                    <h3 data-action="close">Back</h3>
                </a>
                <div id="selected_items">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="col-xs-6 col-sm-9">
            <div class="action-right">
                <ul class="card-actions icons right-top">
                    @if(array_has($args, 'can_remove') && array_get($args, 'can_remove'))
                        <li>
                            <a href="javascript:void(0)"> <i class="zmdi zmdi-delete"></i> </a>
                        </li>
                    @endif
                    @if(array_has($args, 'can_set_status') || array_has($args, 'can_set_comments'))
                        <li class="dropdown">
                        <a href="javascript:void(0)" data-toggle="dropdown"> <i class="zmdi zmdi-more-vert"></i> </a>
                        <ul class="dropdown-menu btn-primary ropdown-menu-right">
                            <li class="title">Actions</li>
                            @if(array_has($args, 'can_set_status') && array_get($args, 'can_set_status'))
                                <li>
                                    <a href="javascript:void(0)" class="text-gray">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Set as draft
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Set as published
                                    </a>
                                </li>
                            @endif
                            @if(array_has($args, 'can_set_comments') && array_get($args, 'can_set_comments'))
                                <li>
                                    <a href="javascript:void(0)" class="text-gray">
                                        <i class="zmdi zmdi-comment-alert m-r-15"></i> Enable comments
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="text-gray">
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
