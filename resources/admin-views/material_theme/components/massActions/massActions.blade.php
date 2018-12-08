<?php

    $action_length = count($args);
    $default_js_callback = 'return confirm("Are you sure to do this action?")';
    $default_button_class = 'btn-default';

?>


<div class="pc-cms-mass-actions" style="display: none;">
    <div class="form-group">
        <span class="pc-selectable-counter label label-info text-white">2 items selected</span>
    </div>
@if($action_length > 0)
    <div>
        @foreach($args as $action_name => $options)
            <?php
            $formId = $action_name.'-'.time()
            ?>
            {!! Form::open([
                'id' => $formId,
                'onsubmit' => isset($options['js_callback']) ? $options['js_callback'] : $default_js_callback,
                'route' => getRouteName($module_name, $action_route_name),
                'style' => 'position: absolute;'
            ]) !!}
            {!! Form::hidden('selected_values', null, ['class' => 'pc-cms-selected-values-input']) !!}
            {!! Form::hidden('action_name', $action_name) !!}
            {!! Form::close() !!}
            <button class="btn btn-xs pc-cms-send-form {{
                isset($options['button_class']) ? $options['button_class'] : $default_button_class
             }}" data-form="#{{ $formId }}">{{ $options['button_label'] }}</button>
        @endforeach
    </div>
@endif
</div>
